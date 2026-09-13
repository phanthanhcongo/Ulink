/* eslint-disable @typescript-eslint/no-explicit-any */
import { setRequestLocale } from 'next-intl/server';
import { getCurrentUser } from '@/lib/auth-helpers';
import { createWriteDirectusClient, Schema } from '@/lib/directus';
import { createDirectus, rest, readItems, readUsers } from '@directus/sdk';
import { cookies } from 'next/headers';
import { Link } from '@/i18n/navigation';
import DashboardCharts from '@/components/admin/dashboard-charts';

async function getSessionClient() {
  const store = await cookies(); const session = store.get('directus_session_token')?.value; const refresh = store.get('directus_refresh_token')?.value;
  if (!session) return createWriteDirectusClient();
  const cookieFetch: typeof globalThis.fetch = (input, init) => { const headers = new Headers(init?.headers); headers.set('cookie', `directus_session_token=${session}${refresh ? `; directus_refresh_token=${refresh}` : ''}`); return globalThis.fetch(input, { ...init, headers }); };
  return createDirectus<Schema>(process.env.DIRECTUS_PUBLIC_URL || 'http://localhost:8055', { globals: { fetch: cookieFetch } }).with(rest());
}
const money = (value: number) => new Intl.NumberFormat('vi-VN').format(Number(value || 0)) + 'đ';
const statusLabel: Record<string, string> = { pending: 'Chờ xử lý', confirmed: 'Đã xác nhận', processing: 'Đang xử lý', shipped: 'Đã giao', completed: 'Hoàn tất', cancelled: 'Đã hủy' };

export default async function AdminDashboardPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale); const user = await getCurrentUser(); let orders: any[] = []; let inventory: any[] = []; let stats = { orders: 0, pending: 0, stock: 0 }; let error = '';
  try {
    const client = await getSessionClient();
    const results = await Promise.allSettled([
      client.request(readItems('orders' as any, { fields: ['id', 'code', 'status', 'order_date', 'total', 'customer.name', 'customer.email'], sort: ['-order_date', '-id'], limit: -1 } as any)),
      client.request(readItems('inventory_stock' as any, { fields: ['quantity_on_hand', 'hub.name'], limit: -1 } as any))
    ]);
    if (results[0].status === 'fulfilled') orders = results[0].value || [];
    if (results[1].status === 'fulfilled') inventory = results[1].value || [];
    if (results.some(result => result.status === 'rejected')) error = 'Một số dữ liệu báo cáo chưa sẵn sàng';
    stats = { orders: orders.length, pending: orders.filter(o => ['pending', 'confirmed', 'processing'].includes(o.status)).length, stock: inventory.reduce((sum, x) => sum + Number(x.quantity_on_hand || 0), 0) };
  } catch (err) { error = err instanceof Error ? err.message : 'Không thể tải báo cáo'; }
  const recentOrders = orders.slice(0, 8);
  return <div className="admin-page space-y-5"><header className="flex items-end justify-between border-b border-[#E4E9F0] pb-4"><div><span className="admin-page-eyebrow">TỔNG QUAN VẬN HÀNH</span><h1 className="admin-page-title text-xl sm:text-2xl">Chào mừng trở lại, {user?.first_name || 'Admin'}</h1><p className="admin-page-lead text-sm">Theo dõi hiệu suất bán hàng và tồn kho.</p></div></header>{error && <div className="rounded-[6px] border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}<section className="grid gap-3 sm:grid-cols-3"><div className="admin-panel p-4"><p className="text-xs font-semibold text-slate-500">Tổng Order</p><p className="text-xl font-bold">{stats.orders}</p></div><div className="admin-panel p-4"><p className="text-xs font-semibold text-slate-500">Order cần xử lý</p><p className="text-xl font-bold">{stats.pending}</p></div><div className="admin-panel p-4"><p className="text-xs font-semibold text-slate-500">Tổng tồn thực tế</p><p className="text-xl font-bold">{stats.stock}</p></div></section><DashboardCharts orders={orders} inventory={inventory} /><section className="admin-panel overflow-hidden"><div className="flex items-center justify-between border-b border-[#E4E9F0] p-4"><h2 className="text-base font-bold text-[#162233]">Order gần đây</h2><Link href="/admin/orders" className="text-xs font-semibold text-[#2163F5]">Xem tất cả</Link></div><div className="overflow-x-auto"><table className="admin-table min-w-[700px]"><thead><tr className="admin-table-head"><th className="admin-table-cell">Mã order</th><th className="admin-table-cell">Khách hàng</th><th className="admin-table-cell">Tổng tiền</th><th className="admin-table-cell">Trạng thái</th></tr></thead><tbody>{recentOrders.map(o => <tr key={o.id} className="admin-table-row"><td className="admin-table-cell font-bold text-[#2163F5]">{o.code || `#${o.id}`}</td><td className="admin-table-cell">{o.customer?.name || 'Khách vãng lai'}<div className="text-xs text-slate-400">{o.customer?.email || '-'}</div></td><td className="admin-table-cell font-semibold">{money(o.total)}</td><td className="admin-table-cell">{statusLabel[o.status] || o.status || '-'}</td></tr>)}{!recentOrders.length && <tr><td colSpan={4} className="p-6 text-center text-sm text-slate-500">Chưa có order.</td></tr>}</tbody></table></div></section></div>;
}
