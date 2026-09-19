import { readItem, readItems, createItem, updateItem } from '@directus/sdk';
import { createWriteDirectusClient } from '@/lib/directus';
import { createPaymentUrl } from '@/lib/vnpay';

export async function POST(req: Request) {
  try {
    const { orderId, locale } = await req.json();
    if (!orderId) return Response.json({ error: { code: 'PAYMENT_MISSING_PARAMS', message: 'orderId is required' } }, { status: 400 });

    const client = createWriteDirectusClient();

    const order = await client.request(readItem('orders' as any, orderId, { fields: ['id', 'code', 'total', 'status', 'payment_status', 'notes'] } as any)) as any;
    if (!order) return Response.json({ error: { code: 'PAYMENT_ORDER_NOT_FOUND', message: 'Order not found' } }, { status: 404 });

    if (order.status === 'confirmed' && order.payment_status === 'success') {
      return Response.json({ error: { code: 'PAYMENT_ALREADY_PROCESSED', message: 'Order already paid' } }, { status: 409 });
    }

    const amount = Number(order.total);
    if (amount < 100 || amount > 999_999_999) {
      return Response.json({ error: { code: 'PAYMENT_INVALID_AMOUNT', message: 'Amount must be between 100 and 999,999,999 VND' } }, { status: 400 });
    }

    // Check for existing pending payment to prevent duplicates
    const existingPayments = await client.request(readItems('payments' as any, {
      filter: { order: { _eq: orderId }, status: { _eq: 'pending' } },
      limit: 1, fields: ['id', 'vnp_txn_ref', 'date_created']
    } as any)) as any[];

    let txnRef: string;
    if (existingPayments.length > 0) {
      const existing = existingPayments[0];
      const createdAt = new Date(existing.date_created).getTime();
      if (Date.now() - createdAt < 1000) {
        txnRef = existing.vnp_txn_ref;
      } else {
        txnRef = `ORD_${orderId}_${Date.now()}`;
      }
    } else {
      txnRef = `ORD_${orderId}_${Date.now()}`;
    }

    const existingRef = existingPayments.find((p: any) => p.vnp_txn_ref === txnRef);
    if (!existingRef) {
      await client.request((createItem as any)('payments', {
        order: orderId,
        amount,
        currency: 'VND',
        payment_method: 'vnpay',
        vnp_txn_ref: txnRef,
        status: 'pending',
        metadata: { locale: locale || 'vn' }
      } as any));
    }

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1';

    const paymentUrl = createPaymentUrl(
      {
        tmnCode: process.env.VNPAY_TMN_CODE || '',
        hashSecret: process.env.VNPAY_HASH_SECRET || '',
        vnpayUrl: process.env.VNPAY_URL || 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
        returnUrl: process.env.VNPAY_RETURN_URL || `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/payment-return`
      },
      {
        amount,
        txnRef,
        orderInfo: `Thanh toan don hang ${order.code}`,
        ipAddr: ip,
        locale: locale || 'vn'
      }
    );

    await client.request(updateItem('orders' as any, orderId, { status: 'payment_required', payment_status: 'pending' } as any));

    return Response.json({
      data: {
        paymentUrl,
        txnRef,
        expiredAt: new Date(Date.now() + 10 * 60 * 1000).toISOString()
      }
    });
  } catch (error) {
    console.error('[create-payment-url]', error);
    const message = error instanceof Error ? error.message : 'Failed to create payment URL';
    return Response.json({ error: { code: 'PAYMENT_ERROR', message } }, { status: 500 });
  }
}
