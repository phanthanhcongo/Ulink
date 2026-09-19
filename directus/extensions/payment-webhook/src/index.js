import { createVnpayService } from '../../../lib/vnpay.mjs';
import crypto from 'crypto';

export default {
  id: 'payment-webhook',
  handler(router, context) {
    const { services, getSchema } = context;

    router.get('/vnpay', async (req, res) => {
      try {
        const schema = await getSchema();
        const { ItemsService, MailService } = services;

        const vnpay = createVnpayService();
        const result = vnpay.verifyReturnData(req.query);

        if (!result.isValid) {
          return res.json({ RspCode: '97', Message: 'Invalid signature' });
        }

        const txnRef = result.vnp_TxnRef;
        const responseCode = result.vnp_ResponseCode;

        // Find payment by txnRef
        const paymentsService = new ItemsService('payments', { schema, knex: context.database });
        const payments = await paymentsService.readByQuery({
          filter: { vnp_txn_ref: { _eq: txnRef } },
          limit: 1
        });

        if (!payments.length) {
          return res.json({ RspCode: '01', Message: 'Order not found' });
        }

        const payment = payments[0];

        // Idempotency: already processed
        if (payment.status === 'success') {
          return res.json({ RspCode: '00', Message: 'Already processed' });
        }

        const ordersService = new ItemsService('orders', { schema, knex: context.database });
        const auditService = new ItemsService('payment_audit_log', { schema, knex: context.database });

        // Log webhook received
        await auditService.createOne({
          payment: payment.id,
          event_type: 'webhook_received',
          status_from: payment.status,
          status_to: responseCode === '00' ? 'success' : 'failed',
          actor: 'system',
          details: result.rawData
        });

        if (responseCode === '00') {
          // Payment success
          await paymentsService.updateOne(payment.id, {
            status: 'success',
            vnp_trans_id: result.vnp_TransactionNo,
            response_code: responseCode,
            paid_at: new Date().toISOString(),
            metadata: result.rawData
          });

          const order = await ordersService.readOne(payment.order);

          // Only confirm if not already confirmed
          if (order.status !== 'confirmed') {
            await ordersService.updateOne(payment.order, {
              status: 'confirmed',
              payment_status: 'success'
            });
          }

          // Auto-create customer for guest orders
          let buyerEmail = null;
          try {
            const notes = typeof order.notes === 'string' ? JSON.parse(order.notes) : order.notes;
            const buyer = notes?.buyer;
            if (buyer?.email && !order.customer) {
              const customersService = new ItemsService('customers', { schema, knex: context.database });
              const generatedPwd = 'UL_' + crypto.randomBytes(6).toString('base64url');

              await customersService.createOne({
                company_name: buyer.fullName,
                email: buyer.email,
                phone: buyer.phone,
                address: buyer.address,
                status: 'active',
                consented_at: new Date().toISOString()
              });

              buyerEmail = buyer.email;

              // Send email with credentials
              try {
                const mailService = new MailService({ schema });
                await mailService.send({
                  to: buyer.email,
                  subject: `Thanh toán thành công - Đơn hàng ${order.code}`,
                  template: {
                    name: 'base',
                    data: {
                      html: `
                        <h2>Cảm ơn bạn đã thanh toán thành công!</h2>
                        <p><strong>Mã đơn:</strong> ${order.code}</p>
                        <p><strong>Tổng tiền:</strong> ${Number(order.total).toLocaleString('vi-VN')} VND</p>
                        <hr/>
                        <p><strong>Tài khoản của bạn:</strong></p>
                        <p>Email: ${buyer.email}</p>
                        <p>Mật khẩu: ${generatedPwd}</p>
                        <p>Đăng nhập để theo dõi đơn hàng tại trang web.</p>
                      `
                    }
                  }
                });
              } catch (mailErr) {
                console.error('[payment-webhook] Email send failed:', mailErr.message);
              }
            }
          } catch (parseErr) {
            console.error('[payment-webhook] Notes parse error:', parseErr.message);
          }

          // Log status change
          await auditService.createOne({
            payment: payment.id,
            event_type: 'status_changed',
            status_from: payment.status,
            status_to: 'success',
            actor: 'system',
            details: { vnp_trans_id: result.vnp_TransactionNo, buyer_email: buyerEmail }
          });

          return res.json({ RspCode: '00', Message: 'Success' });
        } else {
          // Payment failed
          await paymentsService.updateOne(payment.id, {
            status: 'failed',
            response_code: responseCode,
            metadata: result.rawData
          });

          await ordersService.updateOne(payment.order, {
            status: 'payment_failed',
            payment_status: 'failed'
          });

          await auditService.createOne({
            payment: payment.id,
            event_type: 'status_changed',
            status_from: payment.status,
            status_to: 'failed',
            actor: 'system',
            details: { response_code: responseCode }
          });

          return res.json({ RspCode: '00', Message: 'Success' });
        }
      } catch (error) {
        console.error('[payment-webhook] Error:', error);
        return res.json({ RspCode: '99', Message: 'Internal error' });
      }
    });
  }
};
