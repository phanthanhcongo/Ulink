export type OrderItemInput = { sku: string; productName: string; quantity: number; unitPrice: number; lineTotal: number };
export type OrderInput = {
  userId: string | number | null;
  buyer: { fullName: string; email: string; phone: string; address: string; province?: string; district?: string; ward?: string; note?: string };
  paymentMethod: string; shippingMethod: string; carrierName?: string; subtotal: number; tax: number; total: number; items: OrderItemInput[];
};
export type OrderSubmitDeps = {
  create: (collection: 'orders' | 'order_items', data: Record<string, unknown>) => Promise<{ id: string | number; code?: string }>;
  findSkuId: (sku: string) => Promise<string | number | null>;
};

const SHIPPING_LABELS: Record<string, string> = {
  standard: 'Giao hàng tiêu chuẩn ULink Fleet',
  express: 'Giao hàng hỏa tốc trong 24h',
  '3pl': 'Vận chuyển 3PL',
};

const PAYMENT_LABELS: Record<string, string> = {
  vnpay: 'VNPay QR',
  cod: 'Thanh toán khi nhận hàng (COD)',
  bank_transfer: 'Chuyển khoản ngân hàng',
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
    code, status: input.paymentMethod === 'vnpay' ? 'payment_required' : 'confirmed',
    ...(input.paymentMethod === 'vnpay' ? { payment_status: 'pending' } : {}),
    customer: input.userId || null, order_date: new Date().toISOString(),
    subtotal: input.subtotal, tax: input.tax, total: input.total,
    notes: JSON.stringify({
      buyer: input.buyer,
      paymentMethod: PAYMENT_LABELS[input.paymentMethod] || input.paymentMethod,
      shippingMethod: input.shippingMethod === '3pl' && input.carrierName
        ? `Vận chuyển 3PL - ${input.carrierName}`
        : SHIPPING_LABELS[input.shippingMethod] || input.shippingMethod
    })
  });
  for (const [index, item] of input.items.entries()) {
    const skuId = skuIds[index];
    await deps.create('order_items', { order: order.id, sku: skuId, description: item.productName, qty: item.quantity, unit_price: item.unitPrice, line_total: item.lineTotal });
  }
  return { id: order.id, code };
}
