'use server';

import { revalidatePath } from 'next/cache';
import { SAMPLE_VOUCHERS, type Voucher } from '@/lib/vouchers';

// In-memory runtime storage fallback for vouchers
let voucherMemoryStore: Voucher[] = [...SAMPLE_VOUCHERS];

export async function getVouchers(): Promise<{ success: boolean; data: Voucher[]; error?: string }> {
  try {
    return { success: true, data: voucherMemoryStore };
  } catch {
    return { success: false, data: SAMPLE_VOUCHERS, error: 'Lỗi khi lấy danh sách Voucher.' };
  }
}

export async function saveVoucherAction(
  voucherData: Voucher
): Promise<{ success: boolean; data?: Voucher; error?: string }> {
  try {
    const codeUpper = voucherData.code.trim().toUpperCase();
    const idx = voucherMemoryStore.findIndex(
      (v) => v.code.toUpperCase() === codeUpper
    );

    const updatedItem: Voucher = {
      ...voucherData,
      code: codeUpper,
      id: voucherData.id || Date.now()
    };

    if (idx > -1) {
      voucherMemoryStore[idx] = updatedItem;
    } else {
      voucherMemoryStore = [updatedItem, ...voucherMemoryStore];
    }

    revalidatePath('/admin/vouchers');
    revalidatePath('/cart');
    revalidatePath('/checkout');
    return { success: true, data: updatedItem };
  } catch {
    return { success: false, error: 'Không thể lưu thông tin Voucher.' };
  }
}

export async function toggleVoucherStatusAction(
  code: string,
  isActive: boolean
): Promise<{ success: boolean; error?: string }> {
  try {
    const codeUpper = code.trim().toUpperCase();
    const idx = voucherMemoryStore.findIndex((v) => v.code.toUpperCase() === codeUpper);
    if (idx > -1) {
      voucherMemoryStore[idx].is_active = isActive;
      revalidatePath('/admin/vouchers');
      return { success: true };
    }
    return { success: false, error: 'Không tìm thấy Voucher.' };
  } catch {
    return { success: false, error: 'Không thể cập nhật trạng thái Voucher.' };
  }
}

export async function deleteVoucherAction(
  code: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const codeUpper = code.trim().toUpperCase();
    voucherMemoryStore = voucherMemoryStore.filter((v) => v.code.toUpperCase() !== codeUpper);
    revalidatePath('/admin/vouchers');
    return { success: true };
  } catch {
    return { success: false, error: 'Không thể xóa Voucher.' };
  }
}
