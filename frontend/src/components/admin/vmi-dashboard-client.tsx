'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useMemo } from 'react';
import {
  Package,
  Truck,
  Shield,
  Heart,
  TrendingUp,
  AlertTriangle,
  ShoppingCart,
  PieChart,
  FileText,
  FilePlus,
  CalendarPlus,
  ArrowRight,
  BarChart2,
  AlertCircle,
  ClipboardList
} from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

interface VMIDashboardProps {
  user?: {
    first_name?: string | null;
    last_name?: string | null;
    email?: string | null;
  } | null;
  orders?: any[];
  inventory?: any[];
  skus?: any[];
  hubs?: any[];
  rfqs?: any[];
}

const fmt = (n: number) => new Intl.NumberFormat('vi-VN').format(n);
const money = (n: number) => new Intl.NumberFormat('vi-VN').format(n) + 'đ';

const statusLabel: Record<string, string> = {
  pending: 'Chờ xử lý',
  confirmed: 'Đã xác nhận',
  processing: 'Đang xử lý',
  shipped: 'Đang giao',
  delivered: 'Hoàn thành',
  completed: 'Hoàn thành',
  cancelled: 'Đã hủy'
};

export function VMIDashboardClient({ user, orders = [], inventory = [], skus = [], hubs = [], rfqs = [] }: VMIDashboardProps) {
  const displayName = user?.first_name
    ? `${user.first_name} ${user.last_name || ''}`.trim()
    : user?.email?.split('@')[0] || 'Admin';

  const stats = useMemo(() => {
    const totalOnHand = inventory.reduce((s, i) => s + Number(i.quantity_on_hand || 0), 0);
    const totalReserved = inventory.reduce((s, i) => s + Number(i.quantity_reserved || 0), 0);
    const available = totalOnHand - totalReserved;

    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => ['pending', 'confirmed', 'processing'].includes(o.status)).length;
    const shippedOrders = orders.filter(o => o.status === 'shipped').length;
    const completedOrders = orders.filter(o => ['delivered', 'completed'].includes(o.status)).length;
    const cancelledOrders = orders.filter(o => o.status === 'cancelled').length;
    const totalRevenue = orders
      .filter(o => ['delivered', 'completed'].includes(o.status))
      .reduce((s, o) => s + Number(o.total || 0), 0);

    const totalSkus = skus.length;
    const inStockSkus = skus.filter((s: any) => s.stock_status === 'in_stock').length;
    const lowStockSkus = skus.filter((s: any) => s.stock_status === 'low_stock').length;
    const outOfStockSkus = skus.filter((s: any) => s.stock_status === 'out_of_stock').length;

    const pendingRfqs = rfqs.filter((r: any) => ['pending', 'new'].includes(r.status)).length;
    const totalRfqs = rfqs.length;

    const activeHubs = hubs.filter((h: any) => h.operating_status === 'active').length;

    const belowReorder = inventory.filter(
      (i: any) => i.reorder_level > 0 && i.quantity_on_hand <= i.reorder_level
    );

    return {
      totalOnHand, totalReserved, available,
      totalOrders, pendingOrders, shippedOrders, completedOrders, cancelledOrders, totalRevenue,
      totalSkus, inStockSkus, lowStockSkus, outOfStockSkus,
      pendingRfqs, totalRfqs,
      activeHubs, totalHubs: hubs.length,
      belowReorder
    };
  }, [orders, inventory, skus, hubs, rfqs]);

  // Inventory grouped by hub
  const inventoryByHub = useMemo(() => {
    const map: Record<string, { name: string; total: number }> = {};
    inventory.forEach((item: any) => {
      const hubName = item.hub?.name || 'Không xác định';
      const hubId = item.hub?.id || 'unknown';
      if (!map[hubId]) map[hubId] = { name: hubName, total: 0 };
      map[hubId].total += Number(item.quantity_on_hand || 0);
    });
    return Object.values(map).sort((a, b) => b.total - a.total);
  }, [inventory]);

  // SKU stock table data from inventory
  const skuInventoryRows = useMemo(() => {
    return inventory
      .filter((item: any) => item.sku)
      .map((item: any) => ({
        sku_code: item.sku?.sku_code || '---',
        product_name: item.sku?.product?.name || '---',
        hub_name: item.hub?.name || '---',
        on_hand: Number(item.quantity_on_hand || 0),
        reserved: Number(item.quantity_reserved || 0),
        available: Number(item.quantity_on_hand || 0) - Number(item.quantity_reserved || 0),
        reorder_level: Number(item.reorder_level || 0),
        status: item.quantity_on_hand <= 0
          ? 'out'
          : item.reorder_level > 0 && item.quantity_on_hand <= item.reorder_level
            ? 'low'
            : 'ok'
      }))
      .sort((a, b) => {
        const order: Record<string, number> = { out: 0, low: 1, ok: 2 };
        return (order[a.status] ?? 2) - (order[b.status] ?? 2);
      })
      .slice(0, 10);
  }, [inventory]);

  const recentOrders = orders.slice(0, 6);

  // Donut chart calculations
  const donutData = useMemo(() => {
    if (inventoryByHub.length === 0) return [];
    const total = inventoryByHub.reduce((s, h) => s + h.total, 0);
    if (total === 0) return [];
    const colors = ['#1769E2', '#62C5B4', '#F59E0B', '#8B5CF6', '#EC4899', '#10B981'];
    let offset = 0;
    return inventoryByHub.map((hub, i) => {
      const pct = (hub.total / total) * 100;
      const item = { ...hub, pct, color: colors[i % colors.length], offset };
      offset += pct;
      return item;
    });
  }, [inventoryByHub]);

  const totalDonut = donutData.reduce((s, d) => s + d.total, 0);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 bg-[#F8FAFC] min-h-screen text-[#162233] font-sans">

      {/* ── HEADER ── */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-[#162233] tracking-tight">Tổng quan vận hành</h1>
          <p className="text-sm text-[#617084] font-medium">Chào mừng trở lại, {displayName}</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#1769E2]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Hệ thống hoạt động bình thường</span>
        </div>
      </div>

      {/* ── KPI CARDS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        <KPICard icon={Package} iconBg="bg-[#E8F5E9]" iconColor="text-[#2E7D32]" label="Tồn kho khả dụng" value={fmt(stats.available)} unit="pcs" />
        <KPICard icon={ShoppingCart} iconBg="bg-[#E3F2FD]" iconColor="text-[#1565C0]" label="Tổng đơn hàng" value={fmt(stats.totalOrders)} sub={`${stats.pendingOrders} cần xử lý`} subColor="text-[#D97706]" />
        <KPICard icon={Truck} iconBg="bg-[#F3E5F5]" iconColor="text-[#7B1FA2]" label="Đang vận chuyển" value={fmt(stats.shippedOrders)} unit="đơn" />
        <KPICard icon={Shield} iconBg="bg-[#E8F5E9]" iconColor="text-[#2E7D32]" label="Tổng doanh thu" value={money(stats.totalRevenue)} />
        <KPICard icon={ClipboardList} iconBg="bg-[#FFF3E0]" iconColor="text-[#E65100]" label="Yêu cầu báo giá" value={fmt(stats.totalRfqs)} sub={`${stats.pendingRfqs} đang chờ`} subColor="text-[#E65100]" />
        <KPICard icon={Heart} iconBg="bg-[#E8F5E9]" iconColor="text-[#2E7D32]" label="SKU hoạt động" value={fmt(stats.totalSkus)} sub={stats.outOfStockSkus > 0 ? `${stats.outOfStockSkus} hết hàng` : `${stats.inStockSkus} còn hàng`} subColor={stats.outOfStockSkus > 0 ? 'text-[#DC2626]' : 'text-[#2E7D32]'} />
      </div>

      {/* ── MIDDLE: SKU Inventory Table + Warnings ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* SKU Inventory Table */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#162233]">Tồn kho theo SKU</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-[#F5F8FC] border-b border-slate-200 text-[#617084] font-semibold">
                  <th className="py-2.5 px-3 min-w-[100px]">Mã SKU</th>
                  <th className="py-2.5 px-3 min-w-[160px]">Sản phẩm</th>
                  <th className="py-2.5 px-3 min-w-[120px]">Kho</th>
                  <th className="py-2.5 px-3 text-center min-w-[80px]">Tồn kho</th>
                  <th className="py-2.5 px-3 text-center min-w-[80px]">Đã giữ</th>
                  <th className="py-2.5 px-3 text-center min-w-[80px]">Khả dụng</th>
                  <th className="py-2.5 px-3 text-center min-w-[90px]">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {skuInventoryRows.length === 0 && (
                  <tr><td colSpan={7} className="py-8 text-center text-sm text-slate-500">Chưa có dữ liệu tồn kho</td></tr>
                )}
                {skuInventoryRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 font-semibold text-[#1769E2]">{row.sku_code}</td>
                    <td className="py-3 px-3 font-medium text-[#162233]">{row.product_name}</td>
                    <td className="py-3 px-3 text-[#617084]">{row.hub_name}</td>
                    <td className="py-3 px-3 text-center font-bold text-[#162233]">{fmt(row.on_hand)}</td>
                    <td className="py-3 px-3 text-center text-[#617084]">{fmt(row.reserved)}</td>
                    <td className="py-3 px-3 text-center font-semibold text-[#162233]">{fmt(row.available)}</td>
                    <td className="py-3 px-3 text-center">
                      <span className={cn(
                        "px-2.5 py-0.5 rounded-full text-[11px] font-semibold inline-block",
                        row.status === 'ok' ? 'bg-[#D9F2DE] text-[#177333]' :
                        row.status === 'low' ? 'bg-[#FFF2D9] text-[#A6730D]' :
                        'bg-[#FFE0E0] text-[#B22626]'
                      )}>
                        {row.status === 'ok' ? 'Đủ hàng' : row.status === 'low' ? 'Sắp hết' : 'Hết hàng'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between pt-2 text-xs text-[#617084]">
            <span>Hiển thị {skuInventoryRows.length} / {inventory.length} dòng tồn kho</span>
            <Link href="/admin/skus" className="text-[#1769E2] font-semibold hover:underline flex items-center gap-1">
              <span>Xem chi tiết danh sách SKU</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Warnings Panel */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-[#162233] flex items-center gap-2">
              <span>Cảnh báo</span>
              {(stats.belowReorder.length + stats.outOfStockSkus) > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-red-100 text-[#DC2626] text-xs font-bold">
                  {stats.belowReorder.length + stats.outOfStockSkus}
                </span>
              )}
            </h2>
            <AlertTriangle className="w-5 h-5 text-[#DC2626]" />
          </div>

          <div className="space-y-3">
            {stats.outOfStockSkus > 0 && (
              <WarningCard
                icon={AlertCircle}
                iconColor="text-[#DC2626]"
                borderColor="border-[#FEE2E2]"
                dotColor="bg-[#DC2626]"
                title="SKU hết hàng"
                description={`Có ${stats.outOfStockSkus} SKU đang hết hàng hoàn toàn.`}
              />
            )}
            {stats.lowStockSkus > 0 && (
              <WarningCard
                icon={ShoppingCart}
                iconColor="text-[#D97706]"
                borderColor="border-slate-200"
                dotColor="bg-[#D97706]"
                title="SKU sắp hết hàng"
                description={`Có ${stats.lowStockSkus} SKU đang ở mức tồn kho thấp.`}
              />
            )}
            {stats.belowReorder.length > 0 && (
              <WarningCard
                icon={Package}
                iconColor="text-[#1769E2]"
                borderColor="border-slate-200"
                dotColor="bg-[#1769E2]"
                title="Dưới mức đặt hàng lại"
                description={`${stats.belowReorder.length} mặt hàng trong kho dưới mức reorder level.`}
              />
            )}
            {stats.pendingOrders > 0 && (
              <WarningCard
                icon={ShoppingCart}
                iconColor="text-[#D97706]"
                borderColor="border-slate-200"
                dotColor="bg-[#D97706]"
                title="Đơn hàng chờ xử lý"
                description={`${stats.pendingOrders} đơn hàng đang chờ xác nhận hoặc xử lý.`}
              />
            )}
            {stats.pendingRfqs > 0 && (
              <WarningCard
                icon={ClipboardList}
                iconColor="text-[#E65100]"
                borderColor="border-slate-200"
                dotColor="bg-[#E65100]"
                title="RFQ chờ phản hồi"
                description={`${stats.pendingRfqs} yêu cầu báo giá đang chờ xử lý.`}
              />
            )}
            {stats.outOfStockSkus === 0 && stats.lowStockSkus === 0 && stats.belowReorder.length === 0 && stats.pendingOrders === 0 && stats.pendingRfqs === 0 && (
              <div className="py-6 text-center text-sm text-slate-500">Không có cảnh báo nào</div>
            )}
          </div>
        </div>
      </div>

      {/* ── BOTTOM: Inventory by Hub + Recent Orders + Quick Actions ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">

        {/* Inventory by Hub - Donut */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center gap-2">
            <PieChart className="w-5 h-5 text-[#1769E2]" />
            <h2 className="text-base font-bold text-[#162233]">Tồn kho theo Hub</h2>
          </div>

          {donutData.length > 0 ? (
            <>
              <div className="flex flex-col items-center justify-center py-2">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path className="text-slate-100" strokeWidth="4" stroke="currentColor" fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    {donutData.map((seg, i) => (
                      <path key={i} stroke={seg.color} strokeDasharray={`${seg.pct}, 100`}
                        strokeDashoffset={`-${seg.offset}`} strokeWidth="4.5" fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    ))}
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-[11px] text-[#617084] block">Tổng kho</span>
                    <span className="text-sm font-bold text-[#162233]">{stats.activeHubs} Hub</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                {donutData.map((hub, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: hub.color }} />
                      <span className="font-semibold text-[#162233]">{hub.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#162233]">{hub.pct.toFixed(0)}%</span>
                      <span className="text-[#617084]">{fmt(hub.total)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="py-8 text-center text-sm text-slate-500">Chưa có dữ liệu tồn kho</div>
          )}
        </div>

        {/* Recent Orders */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#162233]">Đơn hàng gần đây</h2>
            <Link href="/admin/orders" className="text-xs font-semibold text-[#1769E2] hover:underline">Xem tất cả</Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-[#F5F8FC] border-b border-slate-200 text-[#617084] font-semibold">
                  <th className="py-2.5 px-3">Mã đơn</th>
                  <th className="py-2.5 px-3">Khách hàng</th>
                  <th className="py-2.5 px-3 text-right">Tổng tiền</th>
                  <th className="py-2.5 px-3 text-right">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentOrders.length === 0 && (
                  <tr><td colSpan={4} className="py-6 text-center text-sm text-slate-500">Chưa có đơn hàng</td></tr>
                )}
                {recentOrders.map((o: any) => (
                  <tr key={o.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 font-semibold text-[#1769E2]">{o.code || `#${o.id}`}</td>
                    <td className="py-3 px-3 font-medium text-[#617084]">{o.customer?.name || 'Khách vãng lai'}</td>
                    <td className="py-3 px-3 text-right font-semibold text-[#162233]">{money(o.total || 0)}</td>
                    <td className="py-3 px-3 text-right">
                      <span className={cn(
                        "px-2 py-0.5 rounded text-[11px] font-semibold inline-block",
                        ['delivered', 'completed'].includes(o.status) ? 'bg-[#D1FAE5] text-[#059669]' :
                        o.status === 'cancelled' ? 'bg-red-100 text-[#DC2626]' :
                        o.status === 'shipped' ? 'bg-[#FEF3C7] text-[#D97706]' :
                        'bg-[#DBEAFE] text-[#1769E2]'
                      )}>
                        {statusLabel[o.status] || o.status || '---'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <span className="w-1 h-4 rounded bg-[#1769E2]" />
            <h2 className="text-base font-bold text-[#162233]">Thao tác nhanh</h2>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            <QuickAction href="/admin/orders" icon={FilePlus} label="Quản lý đơn hàng" color="#1769E2" bg="bg-[#F0F9FF]" />
            <QuickAction href="/admin/rfqs" icon={FileText} label="Quản lý RFQ" color="#15803D" bg="bg-[#F0FDF4]" />
            <QuickAction href="/admin/products" icon={Package} label="Quản lý sản phẩm" color="#7C3AED" bg="bg-[#FAF5FF]" />
            <QuickAction href="/admin/skus" icon={BarChart2} label="Quản lý SKU" color="#059669" bg="bg-[#ECFDF5]" />
            <QuickAction href="/admin/orders" icon={CalendarPlus} label="Yêu cầu giao gấp" color="#DC2626" bg="bg-[#FEF2F2]" />
            <QuickAction href="/admin/orders" icon={Truck} label="Lịch giao hàng" color="#0284C7" bg="bg-[#F0F9FF]" />
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6B7280]">
        <div>ULink Industries | B2B Platform</div>
      </div>
    </div>
  );
}

function KPICard({ icon: Icon, iconBg, iconColor, label, value, unit, sub, subColor }: {
  icon: any; iconBg: string; iconColor: string; label: string; value: string; unit?: string; sub?: string; subColor?: string;
}) {
  return (
    <div className="bg-white border border-[#CAD5E2] rounded-lg p-4 shadow-xs flex flex-col justify-between space-y-3">
      <div className="flex items-center gap-3">
        <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0", iconBg)}>
          <Icon className={cn("w-5 h-5", iconColor)} />
        </div>
        <span className="text-xs font-semibold text-[#617084] leading-tight">{label}</span>
      </div>
      <div>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-[#1257C0]">{value}</span>
          {unit && <span className="text-xs text-[#617084]">{unit}</span>}
        </div>
        {sub && (
          <div className={cn("flex items-center gap-1 text-[11px] mt-1 font-medium", subColor || 'text-[#617084]')}>
            <TrendingUp className="w-3 h-3" />
            <span>{sub}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function WarningCard({ icon: Icon, iconColor, borderColor, dotColor, title, description }: {
  icon: any; iconColor: string; borderColor: string; dotColor: string; title: string; description: string;
}) {
  return (
    <div className={cn("p-3 bg-[#F5F8FC] border rounded-lg space-y-1", borderColor)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold text-xs text-[#162233]">
          <Icon className={cn("w-4 h-4", iconColor)} />
          <span>{title}</span>
        </div>
        <span className={cn("w-2 h-2 rounded-full", dotColor)} />
      </div>
      <p className="text-xs text-[#617084] pl-6 leading-relaxed">{description}</p>
    </div>
  );
}

function QuickAction({ href, icon: Icon, label, color, bg }: {
  href: string; icon: any; label: string; color: string; bg: string;
}) {
  return (
    <Link href={href} className={cn("flex items-center justify-between p-3 rounded-lg border text-[#162233] hover:opacity-80 transition-all group", bg)} style={{ borderColor: color }}>
      <div className="flex items-center gap-2.5">
        <Icon className="w-4 h-4" style={{ color }} />
        <span className="text-xs font-semibold">{label}</span>
      </div>
      <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" style={{ color }} />
    </Link>
  );
}
