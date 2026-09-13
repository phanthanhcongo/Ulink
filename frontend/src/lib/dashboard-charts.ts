export type DashboardOrder = { order_date?: string | null; total?: number | string | null; status?: string | null };
export type DashboardTrend = { label: string; orders: number; revenue: number };
const dayKey = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

export function aggregateDashboardOrders(orders: DashboardOrder[], now = new Date()) {
  const days: DashboardTrend[] = Array.from({ length: 30 }, (_, index) => {
    const date = new Date(now);
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - (29 - index));
    return { label: `${date.getDate()}/${date.getMonth() + 1}`, orders: 0, revenue: 0 };
  });
  const keys = days.map((_, index) => { const date = new Date(now); date.setHours(0, 0, 0, 0); date.setDate(date.getDate() - (29 - index)); return dayKey(date); });
  orders.forEach(order => { if (!order.order_date) return; const date = new Date(order.order_date); const key = dayKey(date); const index = keys.indexOf(key); if (index >= 0) { days[index].orders += 1; days[index].revenue += Number(order.total || 0); } });
  const statuses = orders.reduce<Record<string, number>>((result, order) => { const key = order.status || 'unknown'; result[key] = (result[key] || 0) + 1; return result; }, {});
  return { trend: days, statuses };
}

export function aggregateStockByHub(rows: Array<{ hub?: { name?: string } | null; quantity_on_hand?: number | string | null }>) {
  const result = new Map<string, number>();
  rows.forEach(row => { const name = row.hub?.name || 'Chưa phân bổ'; result.set(name, (result.get(name) || 0) + Number(row.quantity_on_hand || 0)); });
  return [...result].map(([name, quantity]) => ({ name, quantity }));
}
