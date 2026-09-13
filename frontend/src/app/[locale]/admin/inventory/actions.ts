'use server';

import { createItem, readItem, readItems, updateItem } from '@directus/sdk';
import { revalidatePath } from 'next/cache';
import { createWriteDirectusClient } from '@/lib/directus';
import { getCurrentUser } from '@/lib/auth-helpers';

type MovementInput = { stockId: number; movementType: 'inbound' | 'adjustment' | 'return'; quantity: number; note?: string };

export async function createInventoryMovement(input: MovementInput) {
  const user = await getCurrentUser();
  if (!user) throw new Error('Unauthorized');
  if (!Number.isInteger(input.stockId) || !['inbound', 'adjustment', 'return'].includes(input.movementType)) throw new Error('Dữ liệu movement không hợp lệ');
  const quantity = Number(input.quantity);
  if (!Number.isFinite(quantity) || quantity === 0 || (input.movementType !== 'adjustment' && quantity < 0)) throw new Error('Số lượng không hợp lệ');
  const client = createWriteDirectusClient();
  const stock: any = await client.request(readItem('inventory_stock' as any, input.stockId, { fields: ['id', 'sku', 'hub', 'quantity_on_hand', 'quantity_reserved'] } as any));
  const delta = input.movementType === 'inbound' || input.movementType === 'return' ? Math.abs(quantity) : quantity;
  const before = Number(stock.quantity_on_hand || 0); const after = before + delta;
  if (after < 0) throw new Error('Không thể điều chỉnh tồn âm');
  await client.request(updateItem('inventory_stock' as any, input.stockId, { quantity_on_hand: after } as any));
  await client.request(createItem('inventory_movements' as any, { sku: stock.sku, hub: stock.hub, movement_type: input.movementType, quantity_delta: delta, quantity_before: before, quantity_after: after, performed_by: user.id, note: input.note || null } as any));
  revalidatePath('/[locale]/admin/inventory', 'page');
  revalidatePath('/[locale]/admin', 'page');
  return { success: true, quantity_after: after };
}
