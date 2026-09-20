'use client';

import React, { useState } from 'react';
import {
  Package,
  Lock,
  Truck,
  Shield,
  Calendar,
  Heart,
  TrendingUp,
  AlertTriangle,
  ShoppingCart,
  Database,
  PieChart,
  FileText,
  FilePlus,
  PlusCircle,
  Clock,
  ArrowRight,
  Search,
  ChevronDown,
  Sparkles,
  Download,
  BarChart2,
  CalendarPlus,
  CheckCircle2,
  XCircle,
  AlertCircle
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
}

export function VMIDashboardClient({ user, orders = [], inventory = [] }: VMIDashboardProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'need_import'>('all');
  const [warehouseView, setWarehouseView] = useState<'by_wh' | 'by_sku'>('by_wh');

  const displayName = user?.first_name
    ? `${user.first_name} ${user.last_name || ''}`.trim()
    : user?.email?.split('@')[0] || 'Nguyễn Thanh Chí';

  // Sample SKU inventory data matching Figma node 1603:1717
  const skuList = [
    {
      sku: 'UL-PE-01',
      name: 'Màng co PE quấn Pallet 3.2kg',
      start: '50,000',
      in: '+20,000',
      out: '-15,000',
      end: '55,000',
      status: 'sufficient',
      statusLabel: 'Đủ hàng',
      statusClass: 'bg-[#D9F2DE] text-[#177333]'
    },
    {
      sku: 'UL-GT-N02',
      name: 'Găng tay Nitrile Blue chống dầu',
      start: '120,000',
      in: '+40,000',
      out: '-65,000',
      end: '95,000',
      status: 'sufficient',
      statusLabel: 'Đủ hàng',
      statusClass: 'bg-[#D9F2DE] text-[#177333]'
    },
    {
      sku: 'UL-TM-S03',
      name: 'Thảm dính phòng sạch Sticky Mat',
      start: '8,500',
      in: '+15,000',
      out: '-11,200',
      end: '12,300',
      status: 'low',
      statusLabel: 'Sắp hết',
      statusClass: 'bg-[#FFF2D9] text-[#A6730D]'
    },
    {
      sku: 'UL-KL-W04',
      name: 'Khăn lau Cleanroom Wiper 1009',
      start: '300,000',
      in: '+120,000',
      out: '-180,000',
      end: '240,000',
      status: 'sufficient',
      statusLabel: 'Đủ hàng',
      statusClass: 'bg-[#D9F2DE] text-[#177333]'
    },
    {
      sku: 'UL-KT-M05',
      name: 'Khẩu trang Y Tế 3 Lớp Kháng Khuẩn',
      start: '450,000',
      in: '+150,000',
      out: '-200,000',
      end: '400,000',
      status: 'sufficient',
      statusLabel: 'Đủ hàng',
      statusClass: 'bg-[#D9F2DE] text-[#177333]'
    },
    {
      sku: 'UL-QC-S06',
      name: 'Quần áo phòng sạch chống tĩnh điện',
      start: '12,000',
      in: '+5,000',
      out: '-3,500',
      end: '13,500',
      status: 'need_import',
      statusLabel: 'Cần nhập',
      statusClass: 'bg-[#FFE0E0] text-[#B22626]'
    }
  ];

  const filteredSkuList = activeTab === 'need_import'
    ? skuList.filter(item => item.status === 'need_import' || item.status === 'low')
    : skuList;

  // Delivery schedule data matching Figma node 1603:1957
  const deliverySchedules = [
    { code: 'PO-3850', supplier: 'ULink Logistics Bắc Ninh', date: '24/10/2024', status: 'Đang vận chuyển', badgeClass: 'bg-[#FEF3C7] text-[#D97706]' },
    { code: 'PO-3851', supplier: 'Kimberly-Clark VN', date: '25/10/2024', status: 'Đã giao hàng', badgeClass: 'bg-[#D1FAE5] text-[#059669]' },
    { code: 'PO-3852', supplier: 'Bao Bì Hải Phòng Co.', date: '26/10/2024', status: 'Chờ xác nhận', badgeClass: 'bg-[#DBEAFE] text-[#1769E2]' },
    { code: 'PO-3853', supplier: 'Sinopec Vina Poly', date: '28/10/2024', status: 'Chờ xác nhận', badgeClass: 'bg-[#DBEAFE] text-[#1769E2]' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 bg-[#F8FAFC] min-h-screen text-[#162233] font-sans">
      
      {/* ── HEADER BAR (Figma #1603:1718) ── */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-[#162233] tracking-tight">VMI Inventory Control</h1>
          <p className="text-sm text-[#617084] font-medium">Hệ Thống Quản Lý Xuất Nhập Tồn Kho</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search box */}
          <div className="relative min-w-[220px]">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#617084]" />
            <input
              type="text"
              placeholder="Tìm kiếm mã SKU, kho..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-[#CAD5E2] rounded-md focus:outline-none focus:ring-1 focus:ring-[#1769E2] text-[#162233]"
            />
          </div>

          {/* Plant Selector */}
          <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-[#CAD5E2] rounded-md text-xs font-semibold text-[#162233] hover:bg-slate-50 transition-colors">
            <span>P5: Samsung Electronics</span>
            <ChevronDown className="h-3.5 w-3.5 text-[#617084]" />
          </button>

          <div className="h-6 w-[1px] bg-[#CAD5E2] hidden sm:block" />

          {/* User Profile */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#1769E2] text-white flex items-center justify-center text-xs font-bold shadow-xs">
              {displayName.charAt(0).toUpperCase()}
            </div>
            <div className="text-xs">
              <div className="font-semibold text-[#162233]">{displayName}</div>
              <div className="text-[11px] text-[#617084]">VMI Manager</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SUB-HEADER / REAL-TIME STATUS BAR (Figma #1603:1735) ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 bg-white border border-[#E5E7EB] rounded-lg shadow-xs gap-2">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-[#111827]">Cập nhật</span>
          <span className="text-sm text-[#6B7280]">
            Theo thời gian thực - <strong className="text-[#2E7D32] font-bold">10:08:20</strong>
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#1769E2]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Hệ thống hoạt động bình thường</span>
        </div>
      </div>

      {/* ── KPI CARDS ROW (Figma #1603:1739 - 6 Cards Grid) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        {/* Card 1: Tồn kho khả dụng */}
        <div className="bg-white border border-[#CAD5E2] rounded-lg p-4 shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#E8F5E9] flex items-center justify-center shrink-0">
              <Package className="w-5 h-5 text-[#2E7D32]" />
            </div>
            <span className="text-xs font-semibold text-[#617084] leading-tight">Tồn kho khả dụng</span>
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-[#1257C0]">1,250,000</span>
              <span className="text-xs text-[#617084]">pcs</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-[#2E7D32] mt-1 font-medium">
              <TrendingUp className="w-3 h-3" />
              <span>12.5% so với tuần trước</span>
            </div>
          </div>
        </div>

        {/* Card 2: Tồn kho đã reserved */}
        <div className="bg-white border border-[#CAD5E2] rounded-lg p-4 shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#E3F2FD] flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5 text-[#1565C0]" />
            </div>
            <span className="text-xs font-semibold text-[#617084] leading-tight">Tồn kho đã reserved</span>
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-[#1257C0]">350,000</span>
              <span className="text-xs text-[#617084]">pcs</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-[#1565C0] mt-1 font-medium">
              <TrendingUp className="w-3 h-3" />
              <span>8.3% so với tuần trước</span>
            </div>
          </div>
        </div>

        {/* Card 3: Đang vận chuyển */}
        <div className="bg-white border border-[#CAD5E2] rounded-lg p-4 shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#F3E5F5] flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5 text-[#7B1FA2]" />
            </div>
            <span className="text-xs font-semibold text-[#617084] leading-tight">Đang vận chuyển</span>
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-[#1257C0]">420,000</span>
              <span className="text-xs text-[#617084]">pcs</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-[#7B1FA2] mt-1 font-medium">
              <TrendingUp className="w-3 h-3" />
              <span>15.2% so với tuần trước</span>
            </div>
          </div>
        </div>

        {/* Card 4: Safety Stock */}
        <div className="bg-white border border-[#CAD5E2] rounded-lg p-4 shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#E8F5E9] flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5 text-[#2E7D32]" />
            </div>
            <span className="text-xs font-semibold text-[#617084] leading-tight">Safety Stock</span>
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-[#1257C0]">500,000</span>
              <span className="text-xs text-[#617084]">pcs</span>
            </div>
            <span className="text-[11px] text-[#617084] mt-1 block">Đáp ứng nhu cầu dự phòng</span>
          </div>
        </div>

        {/* Card 5: Số ngày tồn (Coverage) */}
        <div className="bg-white border border-[#CAD5E2] rounded-lg p-4 shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FFF3E0] flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 text-[#E65100]" />
            </div>
            <span className="text-xs font-semibold text-[#617084] leading-tight">Số ngày tồn (Coverage)</span>
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-[#1257C0]">38</span>
              <span className="text-xs text-[#617084]">Days</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-[#E65100] mt-1 font-medium">
              <TrendingUp className="w-3 h-3" />
              <span>+5 ngày</span>
            </div>
          </div>
        </div>

        {/* Card 6: Stock Health */}
        <div className="bg-white border border-[#CAD5E2] rounded-lg p-4 shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#E8F5E9] flex items-center justify-center shrink-0">
              <Heart className="w-5 h-5 text-[#2E7D32]" />
            </div>
            <span className="text-xs font-semibold text-[#617084] leading-tight">Stock Health</span>
          </div>
          <div>
            <span className="inline-block px-2.5 py-1 rounded bg-[#D1FAE5] text-[#059669] text-xs font-bold tracking-wide">
              HEALTHY
            </span>
            <div className="flex items-center gap-1.5 text-[11px] text-[#2E7D32] mt-1 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32]" />
              <span>Rủi ro: Thấp</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── MIDDLE SECTION (Figma #1603:1814 - Table & Warnings) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* Left Column: SKU Inventory Table (9 cols) */}
        <div className="lg:col-span-8 bg-white border border-[#C89A955C] border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#162233]">Tồn Kho theo SKU (Inventory)</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('all')}
                className={cn(
                  "px-3 py-1 rounded text-xs font-semibold transition-colors",
                  activeTab === 'all'
                    ? "bg-[#D1FAE5] text-[#059669]"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                )}
              >
                Xem tất cả
              </button>
              <button
                onClick={() => setActiveTab('need_import')}
                className={cn(
                  "px-3 py-1 rounded text-xs font-semibold transition-colors",
                  activeTab === 'need_import'
                    ? "bg-[#DBEAFE] text-[#1769E2]"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                )}
              >
                SKU Cần Nhập
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-[#F5F8FC] border-b border-slate-200 text-[#617084] font-semibold">
                  <th className="py-2.5 px-3 min-w-[90px]">Mã SKU</th>
                  <th className="py-2.5 px-3 min-w-[180px]">Tên hàng hóa</th>
                  <th className="py-2.5 px-3 text-center min-w-[80px]">Đầu kỳ</th>
                  <th className="py-2.5 px-3 text-center min-w-[80px]">Nhập</th>
                  <th className="py-2.5 px-3 text-center min-w-[80px]">Xuất</th>
                  <th className="py-2.5 px-3 text-center min-w-[80px]">Cuối kỳ</th>
                  <th className="py-2.5 px-3 text-center min-w-[90px]">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredSkuList.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 font-semibold text-[#1769E2]">{row.sku}</td>
                    <td className="py-3 px-3 font-medium text-[#162233]">{row.name}</td>
                    <td className="py-3 px-3 text-center text-[#617084]">{row.start}</td>
                    <td className="py-3 px-3 text-center font-medium text-[#059669]">{row.in}</td>
                    <td className="py-3 px-3 text-center font-medium text-[#DC2626]">{row.out}</td>
                    <td className="py-3 px-3 text-center font-bold text-[#162233]">{row.end}</td>
                    <td className="py-3 px-3 text-center">
                      <span className={cn("px-2.5 py-0.5 rounded-full text-[11px] font-semibold inline-block", row.statusClass)}>
                        {row.statusLabel}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between pt-2 text-xs text-[#617084]">
            <span>Hiển thị 1-{filteredSkuList.length} trong số 120 SKU</span>
            <Link href="/admin/skus" className="text-[#1769E2] font-semibold hover:underline flex items-center gap-1">
              <span>Xem chi tiết danh sách SKU</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Right Column: Warnings Panel (4 cols) (Figma #1603:1894) */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-[#162233] flex items-center gap-2">
              <span>Cảnh Báo VMI</span>
              <span className="px-2 py-0.5 rounded-full bg-red-100 text-[#DC2626] text-xs font-bold">3</span>
            </h2>
            <AlertTriangle className="w-5 h-5 text-[#DC2626]" />
          </div>

          <div className="space-y-3">
            {/* Alert 1 */}
            <div className="p-3 bg-[#F5F8FC] border border-[#FEE2E2] rounded-lg space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-semibold text-xs text-[#162233]">
                  <AlertCircle className="w-4 h-4 text-[#DC2626]" />
                  <span>Dưới hạn mức an toàn</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-[#DC2626]" />
              </div>
              <p className="text-xs text-[#617084] pl-6 leading-relaxed">
                Màng co PE (PE-01) tại Kho phụ chỉ còn 2 ngày xuất hàng.
              </p>
            </div>

            {/* Alert 2 */}
            <div className="p-3 bg-[#F5F8FC] border border-slate-200 rounded-lg space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-semibold text-xs text-[#162233]">
                  <ShoppingCart className="w-4 h-4 text-[#D97706]" />
                  <span>Sắp chạm điểm đặt hàng</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-[#D97706]" />
              </div>
              <p className="text-xs text-[#617084] pl-6 leading-relaxed">
                Khăn lau Wiper 1009 (KL-W04) dự kiến chạm đáy sau 5 ngày nữa.
              </p>
            </div>

            {/* Alert 3 */}
            <div className="p-3 bg-[#F5F8FC] border border-slate-200 rounded-lg space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-semibold text-xs text-[#162233]">
                  <Database className="w-4 h-4 text-[#1769E2]" />
                  <span>Độ lệch tồn kho cao</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-[#1769E2]" />
              </div>
              <p className="text-xs text-[#617084] pl-6 leading-relaxed">
                Găng tay Nitrile (GT-N02) lệch thực tế 4% so với số liệu ERP.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM SECTION (Figma #1603:1917 - Warehouse & Schedule & Metrics) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* 1. Inventory by Warehouse (4 cols) (Figma #1603:1918) */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#162233] flex items-center gap-2">
              <PieChart className="w-5 h-5 text-[#1769E2]" />
              <span>Inventory theo Kho</span>
            </h2>
          </div>

          {/* View Toggle */}
          <div className="flex bg-[#F0F2F5] p-0.5 rounded-lg text-xs font-semibold">
            <button
              onClick={() => setWarehouseView('by_wh')}
              className={cn(
                "flex-1 py-1.5 rounded-md transition-all text-center",
                warehouseView === 'by_wh' ? "bg-white text-[#162233] shadow-xs" : "text-[#617084]"
              )}
            >
              Theo Kho
            </button>
            <button
              onClick={() => setWarehouseView('by_sku')}
              className={cn(
                "flex-1 py-1.5 rounded-md transition-all text-center",
                warehouseView === 'by_sku' ? "bg-white text-[#162233] shadow-xs" : "text-[#617084]"
              )}
            >
              Tổng cộng theo SKU
            </button>
          </div>

          {/* Donut Visual */}
          <div className="flex flex-col items-center justify-center py-2">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-100"
                  strokeWidth="4"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                {/* Segment 1: 60% Kho chính */}
                <path
                  className="text-[#1769E2]"
                  strokeDasharray="60, 100"
                  strokeWidth="4.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                {/* Segment 2: 25% Kho phụ */}
                <path
                  className="text-[#62C5B4]"
                  strokeDasharray="25, 100"
                  strokeDashoffset="-60"
                  strokeWidth="4.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                {/* Segment 3: 15% Transit */}
                <path
                  className="text-[#F59E0B]"
                  strokeDasharray="15, 100"
                  strokeDashoffset="-85"
                  strokeWidth="4.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-[11px] text-[#617084] block">Tổng kho</span>
                <span className="text-sm font-bold text-[#162233]">3 Kho</span>
              </div>
            </div>
          </div>

          {/* Warehouse Legend List */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1769E2]" />
                <span className="font-semibold text-[#162233]">Kho chính (Bắc Ninh)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#162233]">60%</span>
                <span className="text-[#617084]">750,000 pcs</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#62C5B4]" />
                <span className="font-semibold text-[#162233]">Kho phụ (Hà Nam)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#162233]">25%</span>
                <span className="text-[#617084]">312,500 pcs</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                <span className="font-semibold text-[#162233]">Transit (Đang vận chuyển)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#162233]">15%</span>
                <span className="text-[#617084]">187,500 pcs</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Delivery Schedule (5 cols) (Figma #1603:1957) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#162233]">Lịch Giao Hàng Dự Kiến</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-[#F5F8FC] border-b border-slate-200 text-[#617084] font-semibold">
                  <th className="py-2.5 px-3">Mã đơn</th>
                  <th className="py-2.5 px-3">Nhà cung cấp</th>
                  <th className="py-2.5 px-3">Ngày giao</th>
                  <th className="py-2.5 px-3 text-right">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {deliverySchedules.map((item, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 font-semibold text-[#162233]">{item.code}</td>
                    <td className="py-3 px-3 font-medium text-[#617084]">{item.supplier}</td>
                    <td className="py-3 px-3 text-[#617084]">{item.date}</td>
                    <td className="py-3 px-3 text-right">
                      <span className={cn("px-2 py-0.5 rounded text-[11px] font-semibold inline-block", item.badgeClass)}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. Performance Metrics (3 cols) (Figma #1603:1994) */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4 flex flex-col justify-between">
          <h2 className="text-base font-bold text-[#162233]">Chỉ Số Vận Hành (VMI)</h2>

          <div className="grid grid-cols-2 gap-3">
            {/* Metric 1 */}
            <div className="p-3 bg-[#F5F8FC] rounded-lg text-center flex flex-col items-center justify-center space-y-1">
              <span className="text-[11px] text-[#617084] font-medium leading-tight">Giao đúng hẹn (OTD)</span>
              <div className="w-12 h-12 rounded-full border-4 border-[#1769E2] flex items-center justify-center font-bold text-xs text-[#1769E2]">
                99.2%
              </div>
            </div>

            {/* Metric 2 */}
            <div className="p-3 bg-[#F5F8FC] rounded-lg text-center flex flex-col items-center justify-center space-y-1">
              <span className="text-[11px] text-[#617084] font-medium leading-tight">Độ chuẩn dự báo</span>
              <div className="w-12 h-12 rounded-full border-4 border-[#059669] flex items-center justify-center font-bold text-xs text-[#059669]">
                98.7%
              </div>
            </div>

            {/* Metric 3 */}
            <div className="p-3 bg-[#F5F8FC] rounded-lg text-center flex flex-col items-center justify-center space-y-1">
              <span className="text-[11px] text-[#617084] font-medium leading-tight">Fill Rate</span>
              <div className="w-12 h-12 rounded-full border-4 border-[#D97706] flex items-center justify-center font-bold text-xs text-[#D97706]">
                99.5%
              </div>
            </div>

            {/* Metric 4 */}
            <div className="p-3 bg-[#F5F8FC] rounded-lg text-center flex flex-col items-center justify-center space-y-1">
              <span className="text-[11px] text-[#617084] font-medium leading-tight">OFR Rate</span>
              <div className="w-12 h-12 rounded-full border-4 border-[#1769E2] flex items-center justify-center font-bold text-xs text-[#1769E2]">
                98.5%
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ── AI FORECAST & THAO TÁC NHANH SECTION (Figma #1603:2023) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* Left: AI Forecast Chart (7 cols) (Figma #1603:2024) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#1769E2]" />
              <h2 className="text-lg font-bold text-[#0F172A]">AI Forecast - 90 Ngày Tới</h2>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1769E2]" />
                <span className="text-[#64748B]">Thực tế</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                <span className="text-[#64748B]">Dự báo</span>
              </div>
            </div>
          </div>

          {/* Trend Chart Mock Graphic */}
          <div className="h-44 w-full relative pt-4">
            <svg viewBox="0 0 500 120" className="w-full h-full overflow-visible">
              {/* Grid Lines */}
              <line x1="0" y1="20" x2="500" y2="20" stroke="#F1F5F9" strokeWidth="1" />
              <line x1="0" y1="50" x2="500" y2="50" stroke="#F1F5F9" strokeWidth="1" />
              <line x1="0" y1="80" x2="500" y2="80" stroke="#F1F5F9" strokeWidth="1" />
              <line x1="0" y1="110" x2="500" y2="110" stroke="#F1F5F9" strokeWidth="1" />

              {/* Actual Line (Blue Solid) */}
              <path
                d="M 0 100 Q 120 75, 250 50 T 500 20"
                fill="none"
                stroke="#1769E2"
                strokeWidth="2.5"
              />

              {/* Forecast Line (Red Dashed) */}
              <path
                d="M 0 105 Q 120 85, 250 65 T 500 10"
                fill="none"
                stroke="#EF4444"
                strokeWidth="2.5"
                strokeDasharray="4 4"
              />

              {/* Points */}
              <circle cx="0" cy="100" r="3" fill="#1769E2" />
              <circle cx="125" cy="75" r="3" fill="#1769E2" />
              <circle cx="250" cy="50" r="3" fill="#1769E2" />
              <circle cx="375" cy="35" r="3" fill="#1769E2" />
              <circle cx="500" cy="20" r="3" fill="#1769E2" />

              <circle cx="0" cy="105" r="3" fill="#EF4444" />
              <circle cx="125" cy="85" r="3" fill="#EF4444" />
              <circle cx="250" cy="65" r="3" fill="#EF4444" />
              <circle cx="375" cy="38" r="3" fill="#EF4444" />
              <circle cx="500" cy="10" r="3" fill="#EF4444" />
            </svg>

            <div className="flex justify-between items-center text-xs text-[#64748B] pt-2">
              <span>T6</span>
              <span>T10</span>
              <span className="text-[#EF4444] font-semibold">T11 (Dự báo)</span>
            </div>
          </div>

          {/* Alert Banner */}
          <div className="p-3 bg-[#FEF3C7] border border-[#F59E0B]/30 rounded-lg flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-[#92400E] shrink-0" />
            <p className="text-xs text-[#92400E] font-medium leading-relaxed">
              Dự báo: Tháng tới cần nhập thêm 150,000 sản phẩm để đáp ứng nhu cầu tăng 22% trong Q4.
            </p>
          </div>
        </div>

        {/* Right: Thao tác nhanh (5 cols) (Figma #1603:2072) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-1 h-4 rounded bg-[#1769E2]" />
              <h2 className="text-lg font-bold text-[#162233]">Thao tác nhanh</h2>
            </div>
            <span className="px-2 py-0.5 rounded bg-[#E0F2FE] text-[#1769E2] text-[11px] font-bold tracking-wider uppercase">
              Procurement
            </span>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* Btn 1: Tạo PO */}
            <Link
              href="/admin/orders"
              className="flex items-center justify-between p-3 rounded-lg bg-[#F0F9FF] border border-[#1769E2] text-[#162233] hover:bg-blue-100 transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <FilePlus className="w-4 h-4 text-[#1769E2]" />
                <span className="text-xs font-semibold">Tạo PO</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#1769E2] opacity-60 group-hover:opacity-100 transition-opacity" />
            </Link>

            {/* Btn 2: Tạo RFQ */}
            <Link
              href="/admin/rfqs"
              className="flex items-center justify-between p-3 rounded-lg bg-[#F0FDF4] border border-[#15803D] text-[#162233] hover:bg-emerald-100 transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-[#15803D]" />
                <span className="text-xs font-semibold">Tạo RFQ</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#15803D] opacity-60 group-hover:opacity-100 transition-opacity" />
            </Link>

            {/* Btn 3: Yêu cầu giao gấp */}
            <Link
              href="/admin/orders"
              className="flex items-center justify-between p-3 rounded-lg bg-[#FEF2F2] border border-[#DC2626] text-[#162233] hover:bg-red-100 transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <CalendarPlus className="w-4 h-4 text-[#DC2626]" />
                <span className="text-xs font-semibold">Yêu cầu giao gấp</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#DC2626] opacity-60 group-hover:opacity-100 transition-opacity" />
            </Link>

            {/* Btn 4: Xuất báo cáo tồn kho */}
            <Link
              href="/admin/products"
              className="flex items-center justify-between p-3 rounded-lg bg-[#ECFDF5] border border-[#059669] text-[#162233] hover:bg-emerald-100 transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <BarChart2 className="w-4 h-4 text-[#059669]" />
                <span className="text-xs font-semibold">Xuất báo cáo tồn kho</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#059669] opacity-60 group-hover:opacity-100 transition-opacity" />
            </Link>

            {/* Btn 5: Báo cáo tiêu thụ */}
            <Link
              href="/admin/products"
              className="flex items-center justify-between p-3 rounded-lg bg-[#FAF5FF] border border-[#7C3AED] text-[#162233] hover:bg-purple-100 transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <PieChart className="w-4 h-4 text-[#7C3AED]" />
                <span className="text-xs font-semibold">Báo cáo tiêu thụ</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#7C3AED] opacity-60 group-hover:opacity-100 transition-opacity" />
            </Link>

            {/* Btn 6: Lịch giao hàng */}
            <Link
              href="/admin/orders"
              className="flex items-center justify-between p-3 rounded-lg bg-[#F0F9FF] border border-[#0284C7] text-[#162233] hover:bg-sky-100 transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-[#0284C7]" />
                <span className="text-xs font-semibold">Lịch giao hàng</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#0284C7] opacity-60 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>

          {/* Full Width Action */}
          <Link
            href="/admin/orders"
            className="flex items-center justify-between p-3 rounded-lg bg-[#FAF5FF] border border-[#7C3AED] text-[#162233] hover:bg-purple-100 transition-all group w-full"
          >
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-[#7C3AED]" />
              <span className="text-xs font-semibold">Xem Báo cáo Xuất Kho hôm nay</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-[#7C3AED] opacity-60 group-hover:opacity-100 transition-opacity" />
          </Link>
        </div>
      </div>

      {/* ── FOOTER CONTENT (Figma #1603:2133) ── */}
      <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6B7280]">
        <div>ULink Industries | VMI Platform</div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-[#1769E2] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[#1769E2] transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-[#1769E2] transition-colors">Support</a>
        </div>
      </div>

    </div>
  );
}
