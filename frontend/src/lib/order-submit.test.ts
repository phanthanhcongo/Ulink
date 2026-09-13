import assert from 'node:assert/strict';
import test from 'node:test';
import { submitOrder, type OrderSubmitDeps, type OrderInput } from './order-submit';

const input: OrderInput = {
  userId: null,
  buyer: { fullName: 'Nguyen Van A', email: 'a@example.com', phone: '0900000000', address: 'Ha Nam' },
  paymentMethod: 'bank', shippingMethod: 'standard', subtotal: 1000, tax: 80, total: 1080,
  items: [{ sku: 'SKU-1', productName: 'Product 1', quantity: 2, unitPrice: 500, lineTotal: 1000 }]
};

test('creates a confirmed order and its order item for valid input', async () => {
  const calls: Array<{ collection: string; data: Record<string, unknown> }> = [];
  const deps: OrderSubmitDeps = {
    create: async (collection, data) => {
      calls.push({ collection, data });
      return collection === 'orders' ? { id: 42, code: String(data.code) } : { id: 7 };
    },
    findSkuId: async (sku) => sku === 'SKU-1' ? 9 : null
  };
  const result = await submitOrder(input, deps);
  assert.equal(result.id, 42);
  assert.equal(calls[0].data.status, 'confirmed');
  assert.equal(calls[1].data.order, 42);
  assert.equal(calls[1].data.sku, 9);
});

test('rejects empty cart and missing guest contact data', async () => {
  await assert.rejects(() => submitOrder({ ...input, items: [] }, {} as OrderSubmitDeps), /cart/i);
  await assert.rejects(() => submitOrder({ ...input, buyer: { ...input.buyer, phone: '' } }, {} as OrderSubmitDeps), /phone/i);
});
