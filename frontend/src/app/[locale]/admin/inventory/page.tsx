/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect } from '@/i18n/navigation';
import { getCurrentUser } from '@/lib/auth-helpers';
import { createWriteDirectusClient } from '@/lib/directus';
import { readItems } from '@directus/sdk';
import InventoryClient from '@/components/admin/inventory-client';

export default async function AdminInventoryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!(await getCurrentUser())) redirect({ href: '/login', locale });
  let stock: any[] = [], movements: any[] = [], error = '';
  try {
    const client = createWriteDirectusClient();
    [stock, movements] = await Promise.all([
      client.request(readItems('inventory_stock' as any, { fields: ['id', 'quantity_on_hand', 'quantity_reserved', 'reorder_level', 'sku.id', 'sku.sku_code', 'sku.product.name', 'hub.id', 'hub.name'], sort: ['hub.name', 'sku.sku_code'], limit: -1 } as any)) as Promise<any[]>,
      client.request(readItems('inventory_movements' as any, { fields: ['id', 'movement_type', 'quantity_delta', 'quantity_before', 'quantity_after', 'note', 'date_created', 'sku.sku_code', 'hub.name', 'order_id'], sort: ['-date_created'], limit: 100 } as any)) as Promise<any[]>
    ]);
  } catch (err) { error = err instanceof Error ? err.message : 'Không thể tải dữ liệu tồn kho'; }
  return <InventoryClient initialStock={stock} initialMovements={movements} error={error} />;
}
