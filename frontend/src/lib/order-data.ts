import { readItem, readItems } from '@directus/sdk';
import { createWriteDirectusClient } from '@/lib/directus';

export type DetailedOrderItem = {
  id: string | number;
  sku: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  hero?: string | null;
};

export type DetailedOrder = {
  id: string | number;
  code: string;
  status: string;
  payment_status: string;
  order_date: string;
  subtotal: number;
  tax: number;
  total: number;
  buyerName: string;
  taxCode?: string;
  phone: string;
  email: string;
  address: string;
  paymentMethod: string;
  shippingMethod: string;
  items: DetailedOrderItem[];
};

export async function fetchOrderById(rawId: string): Promise<DetailedOrder | null> {
  if (!rawId || typeof rawId !== 'string') return null;

  // Clean rawId if it's in format ORD_14_1789883794180
  let targetId: string | number = rawId;
  if (rawId.startsWith('ORD_')) {
    const parts = rawId.split('_');
    if (parts.length >= 2 && parts[1]) {
      targetId = parts[1];
    }
  }

  try {
    const client = createWriteDirectusClient();

    let order: any = null;

    // Check if targetId is numeric
    if (!isNaN(Number(targetId))) {
      try {
        order = await client.request(
          readItem('orders' as any, targetId as any, {
            fields: ['id', 'code', 'status', 'payment_status', 'order_date', 'subtotal', 'tax', 'total', 'notes']
          } as any)
        );
      } catch {
        order = null;
      }
    }

    if (!order) {
      // Query by code
      const list = (await client.request(
        readItems('orders' as any, {
          filter: { code: { _eq: String(rawId) } },
          limit: 1,
          fields: ['id', 'code', 'status', 'payment_status', 'order_date', 'subtotal', 'tax', 'total', 'notes']
        } as any)
      )) as any[];
      if (list && list.length > 0) {
        order = list[0];
      }
    }

    if (!order) return null;

    // Fetch order_items with relational SKU & Product fields
    let items: any[] = [];
    try {
      items = (await client.request(
        readItems('order_items' as any, {
          filter: { order: { _eq: order.id } },
          fields: [
            'id',
            'sku',
            'sku.id',
            'sku.sku_code',
            'sku.product.hero',
            'sku.product.name',
            'sku.product.slug',
            'description',
            'qty',
            'unit_price',
            'line_total'
          ]
        } as any)
      )) as any[];
    } catch {
      items = [];
    }

    // Parse notes JSON if available
    let notesData: any = {};
    if (order.notes) {
      try {
        notesData = typeof order.notes === 'string' ? JSON.parse(order.notes) : order.notes;
      } catch {
        notesData = {};
      }
    }

    const buyer = notesData.buyer || {};

    return {
      id: order.id,
      code: order.code || `ULK-${order.id}`,
      status: order.status || 'confirmed',
      payment_status: order.payment_status || 'pending',
      order_date: order.order_date
        ? new Date(order.order_date).toLocaleDateString('vi-VN')
        : '',
      subtotal: Number(order.subtotal) || 0,
      tax: Number(order.tax) || 0,
      total: Number(order.total) || 0,
      buyerName: buyer.fullName || buyer.companyName || '',
      taxCode: buyer.taxCode || '',
      phone: buyer.phone || '',
      email: buyer.email || '',
      address: buyer.address || '',
      paymentMethod: notesData.paymentMethod || 'Chuyển khoản tài khoản ngân hàng Doanh nghiệp',
      shippingMethod: notesData.shippingMethod || 'Giao hàng tiêu chuẩn ULink Fleet',
      items: items.map((item) => {
        const skuObj = typeof item.sku === 'object' && item.sku !== null ? item.sku : null;
        const prodObj = skuObj?.product || null;
        const skuCode = skuObj?.sku_code || (typeof item.sku === 'string' || typeof item.sku === 'number' ? String(item.sku) : '');
        const hero = prodObj?.hero || null;

        return {
          id: item.id,
          sku: skuCode,
          productName: item.description || prodObj?.name || skuCode || 'Sản phẩm B2B',
          quantity: Number(item.qty) || 1,
          unitPrice: Number(item.unit_price) || 0,
          lineTotal: Number(item.line_total) || 0,
          hero: hero
        };
      })
    };
  } catch (error) {
    console.error('Error fetching order by ID:', error);
    return null;
  }
}

export async function fetchAllOrders(limit = 20): Promise<DetailedOrder[]> {
  try {
    const client = createWriteDirectusClient();
    const list = (await client.request(
      readItems('orders' as any, {
        sort: ['-id'],
        limit,
        fields: ['id', 'code', 'status', 'payment_status', 'order_date', 'subtotal', 'tax', 'total', 'notes']
      } as any)
    )) as any[];

    if (!list || list.length === 0) return [];

    const orders: DetailedOrder[] = [];

    for (const order of list) {
      let items: any[] = [];
      try {
        items = (await client.request(
          readItems('order_items' as any, {
            filter: { order: { _eq: order.id } },
            fields: [
              'id',
              'sku',
              'sku.sku_code',
              'sku.product.hero',
              'sku.product.name',
              'description',
              'qty',
              'unit_price',
              'line_total'
            ]
          } as any)
        )) as any[];
      } catch {
        items = [];
      }

      let notesData: any = {};
      if (order.notes) {
        try {
          notesData = typeof order.notes === 'string' ? JSON.parse(order.notes) : order.notes;
        } catch {
          notesData = {};
        }
      }

      const buyer = notesData.buyer || {};

      orders.push({
        id: order.id,
        code: order.code || `ULK-${order.id}`,
        status: order.status || 'confirmed',
        payment_status: order.payment_status || 'pending',
        order_date: order.order_date
          ? new Date(order.order_date).toLocaleDateString('vi-VN')
          : '',
        subtotal: Number(order.subtotal) || 0,
        tax: Number(order.tax) || 0,
        total: Number(order.total) || 0,
        buyerName: buyer.fullName || buyer.companyName || '',
        taxCode: buyer.taxCode || '',
        phone: buyer.phone || '',
        email: buyer.email || '',
        address: buyer.address || '',
        paymentMethod: notesData.paymentMethod || 'Chuyển khoản tài khoản ngân hàng Doanh nghiệp',
        shippingMethod: notesData.shippingMethod || 'Giao hàng tiêu chuẩn ULink Fleet',
        items: items.map((item) => {
          const skuObj = typeof item.sku === 'object' && item.sku !== null ? item.sku : null;
          const prodObj = skuObj?.product || null;
          const skuCode = skuObj?.sku_code || (typeof item.sku === 'string' || typeof item.sku === 'number' ? String(item.sku) : '');
          const hero = prodObj?.hero || null;

          return {
            id: item.id,
            sku: skuCode,
            productName: item.description || prodObj?.name || skuCode || 'Sản phẩm B2B',
            quantity: Number(item.qty) || 1,
            unitPrice: Number(item.unit_price) || 0,
            lineTotal: Number(item.line_total) || 0,
            hero: hero
          };
        })
      });
    }

    return orders;
  } catch (error) {
    console.error('Error fetching all orders:', error);
    return [];
  }
}

