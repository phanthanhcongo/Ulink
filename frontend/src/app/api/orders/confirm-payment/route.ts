import { readItems, updateItem, createItem } from '@directus/sdk';
import { createWriteDirectusClient } from '@/lib/directus';
import { verifyReturnData } from '@/lib/vnpay';

export async function POST(req: Request) {
  try {
    const query: Record<string, string> = await req.json();
    const hashSecret = process.env.VNPAY_HASH_SECRET || '';

    const result = verifyReturnData(hashSecret, query);

    if (!result.isValid) {
      return Response.json({ error: { code: 'PAYMENT_INVALID_SIGNATURE', message: 'Invalid signature' } }, { status: 400 });
    }

    const txnRef = result.vnp_TxnRef;
    if (!txnRef) {
      return Response.json({ error: { code: 'PAYMENT_MISSING_PARAMS', message: 'Missing txnRef' } }, { status: 400 });
    }

    const client = createWriteDirectusClient();

    const payments = await client.request(readItems('payments' as any, {
      filter: { vnp_txn_ref: { _eq: txnRef } },
      limit: 1,
      fields: ['id', 'order', 'status']
    } as any)) as any[];

    if (!payments.length) {
      return Response.json({ error: { code: 'PAYMENT_NOT_FOUND', message: 'Payment not found' } }, { status: 404 });
    }

    const payment = payments[0];

    if (payment.status === 'success') {
      return Response.json({ data: { status: 'already_confirmed', orderId: payment.order } });
    }

    const isSuccess = result.vnp_ResponseCode === '00';

    await client.request(updateItem('payments' as any, payment.id, {
      status: isSuccess ? 'success' : 'failed',
      response_code: result.vnp_ResponseCode,
      vnp_trans_id: result.vnp_TransactionNo,
      paid_at: isSuccess ? new Date().toISOString() : null,
      metadata: result.rawData
    } as any));

    await client.request(updateItem('orders' as any, payment.order, {
      status: isSuccess ? 'confirmed' : 'payment_failed',
      payment_status: isSuccess ? 'success' : 'failed'
    } as any));

    await client.request((createItem as any)('payment_audit_log', {
      payment: payment.id,
      event_type: isSuccess ? 'status_changed' : 'error',
      status_from: 'pending',
      status_to: isSuccess ? 'success' : 'failed',
      actor: 'system',
      details: { response_code: result.vnp_ResponseCode, bank_code: result.vnp_BankCode }
    }));

    return Response.json({
      data: {
        status: isSuccess ? 'confirmed' : 'failed',
        orderId: payment.order
      }
    });
  } catch (error) {
    console.error('[confirm-payment]', error);
    const message = error instanceof Error ? error.message : 'Failed to confirm payment';
    return Response.json({ error: { code: 'PAYMENT_ERROR', message } }, { status: 500 });
  }
}
