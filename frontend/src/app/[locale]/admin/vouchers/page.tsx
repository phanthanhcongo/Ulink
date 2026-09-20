import { VouchersClient } from '@/components/admin/vouchers-client';
import { getVouchers } from './actions';

export const metadata = {
  title: 'Quản lý Mã giảm giá (Vouchers) | ULink Admin'
};

export default async function AdminVouchersPage() {
  const result = await getVouchers();

  return (
    <VouchersClient
      initialVouchers={result.data || []}
      error={result.error}
    />
  );
}
