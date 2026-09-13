'use server';
import { updateItem } from '@directus/sdk';
import { revalidatePath } from 'next/cache';
import { createWriteDirectusClient } from '@/lib/directus';
import { getCurrentUser } from '@/lib/auth-helpers';
export async function updateOrderStatus(id: number, status: string) {
  if (!(await getCurrentUser())) throw new Error('Unauthorized');
  const allowed = ['pending', 'confirmed', 'processing', 'shipped', 'completed', 'cancelled'];
  if (!allowed.includes(status)) throw new Error('Invalid status');
  await createWriteDirectusClient().request(updateItem('orders' as any, id, { status } as any));
  revalidatePath('/[locale]/admin/orders', 'page');
}
