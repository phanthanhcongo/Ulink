'use server';

import { createItem, deleteItem, readItem, readItems, updateItem } from '@directus/sdk';
import { revalidatePath } from 'next/cache';
import { createAuthenticatedDirectusClient } from '@/lib/directus';
import { getCurrentUser } from '@/lib/auth-helpers';

type MovementInput = { stockId: number; movementType: 'inbound' | 'adjustment' | 'return'; quantity: number; note?: string };
type StockInput = { sku: number; hub: number; quantityOnHand: number; reorderLevel: number };

async function requireClient() {
  if (!(await getCurrentUser())) throw new Error('Unauthorized');
  return createAuthenticatedDirectusClient();
}

export async function createInventoryStock(input: StockInput) {
  const client = await requireClient();
  if (!Number.isInteger(input.sku) || !Number.isInteger(input.hub) || input.quantityOnHand < 0 || input.reorderLevel < 0) throw new Error('Dữ liệu tồn kho không hợp lệ');
  await client.request(createItem('inventory_stock' as any, { sku: input.sku, hub: input.hub, quantity_on_hand: input.quantityOnHand, reorder_level: input.reorderLevel } as any));
  revalidatePath('/[locale]/admin/inventory', 'page');
}

export async function updateInventoryStock(id: number, input: Pick<StockInput, 'quantityOnHand' | 'reorderLevel'>) {
  const client = await requireClient();
  if (!Number.isInteger(id) || input.quantityOnHand < 0 || input.reorderLevel < 0) throw new Error('Dữ liệu tồn kho không hợp lệ');
  const stock: any = await client.request(readItem('inventory_stock' as any, id, { fields: ['id', 'sku', 'hub', 'quantity_on_hand'] } as any));
  const before = Number(stock.quantity_on_hand || 0); const after = Number(input.quantityOnHand);
  await client.request(updateItem('inventory_stock' as any, id, { quantity_on_hand: after, reorder_level: input.reorderLevel } as any));
  if (before !== after) await client.request(createItem('inventory_movements' as any, { sku: stock.sku, hub: stock.hub, movement_type: 'adjustment', quantity_delta: after - before, quantity_before: before, quantity_after: after, note: 'Cập nhật trực tiếp từ quản lý tồn kho' } as any));
  revalidatePath('/[locale]/admin/inventory', 'page');
}

export async function deleteInventoryStock(id: number) {
  const client = await requireClient();
  await client.request(deleteItem('inventory_stock' as any, id));
  revalidatePath('/[locale]/admin/inventory', 'page');
}

export async function createInventoryMovement(input: MovementInput) {
  const user = await getCurrentUser();
  if (!user) throw new Error('Unauthorized');
  if (!Number.isInteger(input.stockId) || !['inbound', 'adjustment', 'return'].includes(input.movementType)) throw new Error('Dữ liệu movement không hợp lệ');
  const quantity = Number(input.quantity);
  if (!Number.isFinite(quantity) || quantity === 0 || (input.movementType !== 'adjustment' && quantity < 0)) throw new Error('Số lượng không hợp lệ');
  const client = await createAuthenticatedDirectusClient();
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
