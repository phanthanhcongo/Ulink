export type OrderItemInput = { sku: string; productName: string; quantity: number; unitPrice: number; lineTotal: number };
export type OrderInput = {
  userId: string | number | null;
  buyer: { fullName: string; email: string; phone: string; address: string; province?: string; district?: string; ward?: string; note?: string };
  paymentMethod: string; shippingMethod: string; subtotal: number; tax: number; total: number; items: OrderItemInput[];
};
export type OrderSubmitDeps = {
  create: (collection: 'orders' | 'order_items', data: Record<string, unknown>) => Promise<{ id: string | number; code?: string }>;
  findSkuId: (sku: string) => Promise<string | number | null>;
};

export async function submitOrder(input: OrderInput, deps: OrderSubmitDeps) {
  if (!input.items?.length) throw new Error('Cart cannot be empty');
  for (const field of ['fullName', 'email', 'phone', 'address'] as const) {
    if (!input.buyer?.[field]?.trim()) throw new Error(`${field} is required`);
  }
  const skuIds = await Promise.all(input.items.map(async (item) => {
    const id = await deps.findSkuId(item.sku);
    if (id == null) throw new Error(`Unknown SKU: ${item.sku}`);
    return id;
  }));
  const code = `UL-${Date.now().toString(36).toUpperCase()}`;
  const order = await deps.create('orders', {
    code, status: 'confirmed', customer: input.userId || null, order_date: new Date().toISOString(),
    subtotal: input.subtotal, tax: input.tax, total: input.total,
    notes: JSON.stringify({ buyer: input.buyer, paymentMethod: input.paymentMethod, shippingMethod: input.shippingMethod, simulatedPayment: true })
  });
  for (const [index, item] of input.items.entries()) {
    const skuId = skuIds[index];
    await deps.create('order_items', { order: order.id, sku: skuId, description: item.productName, qty: item.quantity, unit_price: item.unitPrice, line_total: item.lineTotal });
  }
  return { id: order.id, code };
}
