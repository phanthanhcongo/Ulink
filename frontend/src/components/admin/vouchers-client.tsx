'use client';

import React, { useState, useTransition } from 'react';
import toast from 'react-hot-toast';
import {
  Search,
  Tag,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  X,
  AlertTriangle,
  Percent,
  DollarSign,
  History,
  Users,
  Calendar,
  FileText
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ConfirmModal } from './confirm-modal';
import type { Voucher, VoucherUsageLog } from '@/lib/vouchers';
import { saveVoucherAction, deleteVoucherAction, toggleVoucherStatusAction } from '@/app/[locale]/admin/vouchers/actions';

interface VouchersClientProps {
  initialVouchers: Voucher[];
  error?: string;
}

export function VouchersClient({ initialVouchers, error }: VouchersClientProps) {
  const [vouchers, setVouchers] = useState<Voucher[]>(initialVouchers);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [isPending, startTransition] = useTransition();

  // CRUD Form State
  const [formOpen, setFormOpen] = useState(false);
  const [activeVoucher, setActiveVoucher] = useState<Partial<Voucher> | null>(null);
  const [formError, setFormError] = useState('');

  // History Modal State
  const [historyVoucher, setHistoryVoucher] = useState<Voucher | null>(null);

  const [confirmState, setConfirmState] = useState<{
    isOpen: boolean;
    title?: string;
    message: string;
    onConfirm: () => void;
    type?: 'danger' | 'warning' | 'info';
  }>({
    isOpen: false,
    message: '',
    onConfirm: () => {}
  });

  const formatPrice = (amount?: number) => {
    if (!amount || amount === 0) return '0đ';
    return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
  };

  // Filter vouchers
  const filteredVouchers = vouchers.filter((v) => {
    const codeStr = v.code.toLowerCase();
    const nameStr = v.name.toLowerCase();
    const q = searchQuery.toLowerCase();

    const matchesSearch = codeStr.includes(q) || nameStr.includes(q);
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && v.is_active) ||
      (statusFilter === 'inactive' && !v.is_active);
    const matchesType = typeFilter === 'all' || v.discount_type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  // KPI Statistics
  const totalCount = vouchers.length;
  const activeCount = vouchers.filter((v) => v.is_active).length;
  const percentCount = vouchers.filter((v) => v.discount_type === 'percent').length;
  const totalRedemptions = vouchers.reduce((sum, v) => sum + (v.usage_count || 0), 0);

  const handleOpenCreateForm = () => {
    setActiveVoucher({
      code: '',
      name: '',
      description: '',
      discount_type: 'percent',
      discount_value: 10,
      min_order_amount: 0,
      max_discount_amount: 50000000,
      usage_limit: 100,
      usage_count: 0,
      is_active: true
    });
    setFormOpen(true);
    setFormError('');
  };

  const handleOpenEditForm = (v: Voucher) => {
    setActiveVoucher({ ...v });
    setFormOpen(true);
    setFormError('');
  };

  const handleToggleStatus = (v: Voucher) => {
    startTransition(async () => {
      const res = await toggleVoucherStatusAction(v.code, !v.is_active);
      if (res.success) {
        setVouchers((prev) =>
          prev.map((item) => (item.code === v.code ? { ...item, is_active: !v.is_active } : item))
        );
        toast.success(`Đã ${!v.is_active ? 'kích hoạt' : 'tạm dừng'} mã "${v.code}".`);
      } else {
        toast.error('Không thể cập nhật trạng thái: ' + res.error);
      }
    });
  };

  const handleDeleteVoucher = (v: Voucher) => {
    setConfirmState({
      isOpen: true,
      title: 'Xóa mã giảm giá',
      message: `Bạn có chắc chắn muốn xóa mã "${v.code}" không? Hành động này không thể hoàn tác.`,
      type: 'danger',
      onConfirm: () => {
        setConfirmState((prev) => ({ ...prev, isOpen: false }));
        startTransition(async () => {
          const res = await deleteVoucherAction(v.code);
          if (res.success) {
            setVouchers((prev) => prev.filter((item) => item.code !== v.code));
            toast.success(`Đã xóa mã giảm giá "${v.code}".`);
          } else {
            toast.error('Không thể xóa mã giảm giá: ' + res.error);
          }
        });
      }
    });
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeVoucher?.code?.trim() || !activeVoucher?.name?.trim()) {
      setFormError('Vui lòng nhập đầy đủ Mã giảm giá và Tên khuyến mãi.');
      return;
    }

    startTransition(async () => {
      const res = await saveVoucherAction(activeVoucher as Voucher);
      if (res.success && res.data) {
        const saved = res.data;
        setVouchers((prev) => {
          const idx = prev.findIndex((item) => item.code.toUpperCase() === saved.code.toUpperCase());
          if (idx > -1) {
            const updated = [...prev];
            updated[idx] = saved;
            return updated;
          }
          return [saved, ...prev];
        });
        toast.success(`Đã lưu thành công mã giảm giá "${saved.code}".`);
        setFormOpen(false);
      } else {
        setFormError(res.error || 'Lỗi khi lưu thông tin mã giảm giá.');
      }
    });
  };

  return (
    <div className="admin-page font-sans space-y-6">
      {/* Header */}
      <div className="admin-header">
        <div className="admin-header-content">
          <span className="admin-page-eyebrow">Khuyến mãi & Ưu đãi B2B</span>
          <h1 className="admin-page-title flex items-center gap-2.5">
            <Tag className="h-7 w-7 text-sky-600" />
            <span>Quản lý Mã giảm giá (Vouchers)</span>
          </h1>
          <p className="admin-page-lead">
            Tạo, cấu hình hạn mức và xem lịch sử khách hàng đã sử dụng voucher.
          </p>
        </div>
        <div className="admin-header-actions">
          <button
            onClick={handleOpenCreateForm}
            className="admin-button admin-button-primary"
          >
            <Plus className="h-4 w-4" />
            <span>Tạo Voucher mới</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-[6px] bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-500 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* KPI Cards */}
      <div className="admin-kpi-grid">
        <div className="admin-panel admin-panel-pad space-y-1">
          <span className="text-caption-responsive font-medium text-slate-500">Tổng số Voucher</span>
          <p className="text-stat-value font-bold text-slate-900">{totalCount}</p>
        </div>
        <div className="admin-panel admin-panel-pad space-y-1">
          <span className="text-caption-responsive font-medium text-slate-500">Đang hoạt động</span>
          <p className="text-stat-value font-bold text-emerald-600">{activeCount}</p>
        </div>
        <div className="admin-panel admin-panel-pad space-y-1">
          <span className="text-caption-responsive font-medium text-slate-500">Giảm theo %</span>
          <p className="text-stat-value font-bold text-sky-600">{percentCount}</p>
        </div>
        <div className="admin-panel admin-panel-pad space-y-1">
          <span className="text-caption-responsive font-medium text-slate-500">Lượt đã sử dụng</span>
          <p className="text-stat-value font-bold text-indigo-600">{totalRedemptions} lượt</p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="admin-panel admin-panel-pad">
        <div className="admin-filter-bar">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm mã voucher, tên chương trình..."
              className="admin-input pl-9"
            />
          </div>

          <div className="admin-filter-group">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="admin-select"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Đang hoạt động</option>
              <option value="inactive">Đã tạm dừng</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="admin-select"
            >
              <option value="all">Tất cả loại ưu đãi</option>
              <option value="percent">Giảm theo phần trăm (%)</option>
              <option value="fixed">Giảm số tiền cố định (đ)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Vouchers Data Table */}
      <div className="admin-panel">
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead className="admin-table-head">
              <tr>
                <th className="px-4 py-3">Mã Voucher</th>
                <th className="px-4 py-3">Tên khuyến mãi</th>
                <th className="px-4 py-3 text-center">Loại & Mức giảm</th>
                <th className="px-4 py-3 text-center">Lượt sử dụng</th>
                <th className="px-4 py-3 text-right">Đơn tối thiểu</th>
                <th className="px-4 py-3 text-center">Trạng thái</th>
                <th className="px-4 py-3 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredVouchers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-slate-400">
                    Chưa có mã giảm giá nào phù hợp với bộ lọc.
                  </td>
                </tr>
              ) : (
                filteredVouchers.map((v) => {
                  const used = v.usage_count || 0;
                  const limit = v.usage_limit ? `${v.usage_limit} lượt` : '∞';
                  const isMaxedOut = v.usage_limit && used >= v.usage_limit;

                  return (
                    <tr key={v.code} className="admin-table-row">
                      {/* Code */}
                      <td className="px-4 py-4 font-mono font-bold text-sky-700">
                        <span className="bg-sky-50 border border-sky-200 px-2.5 py-1 rounded-[3px] text-xs">
                          {v.code}
                        </span>
                      </td>

                      {/* Name & Desc */}
                      <td className="px-4 py-4">
                        <p className="font-bold text-slate-900 text-sm">{v.name}</p>
                        {v.description && (
                          <p className="text-xs text-slate-500 line-clamp-1">{v.description}</p>
                        )}
                      </td>

                      {/* Value */}
                      <td className="px-4 py-4 text-center font-bold">
                        {v.discount_type === 'percent' ? (
                          <span className="inline-flex items-center gap-1 text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full text-xs">
                            <Percent className="h-3 w-3" />
                            Giảm {v.discount_value}%
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-indigo-600 bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-full text-xs">
                            <DollarSign className="h-3 w-3" />
                            Giảm {formatPrice(v.discount_value)}
                          </span>
                        )}
                      </td>

                      {/* Usage Count / Limit */}
                      <td className="px-4 py-4 text-center">
                        <div className="flex flex-col items-center">
                          <span
                            className={cn(
                              'text-xs font-bold px-2 py-0.5 rounded-full border',
                              isMaxedOut
                                ? 'bg-red-50 text-red-600 border-red-200'
                                : 'bg-slate-100 text-slate-700 border-slate-200'
                            )}
                          >
                            {used} / {limit}
                          </span>
                          {isMaxedOut && (
                            <span className="text-[10px] text-red-500 font-semibold mt-0.5">
                              Đã hết lượt
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Min Order */}
                      <td className="px-4 py-4 text-right text-xs font-semibold text-slate-700">
                        {v.min_order_amount && v.min_order_amount > 0
                          ? formatPrice(v.min_order_amount)
                          : 'Không giới hạn'}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-4 text-center">
                        <button
                          onClick={() => handleToggleStatus(v)}
                          disabled={isPending}
                          className={cn(
                            'inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border transition-colors cursor-pointer',
                            v.is_active
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                              : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                          )}
                        >
                          {v.is_active ? (
                            <>
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                              Đang hoạt động
                            </>
                          ) : (
                            <>
                              <XCircle className="h-3.5 w-3.5 text-slate-400" />
                              Tạm dừng
                            </>
                          )}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Lịch sử sử dụng */}
                          <button
                            onClick={() => setHistoryVoucher(v)}
                            className="p-1.5 rounded-[3px] border border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors flex items-center gap-1 text-xs font-semibold"
                            title="Xem lịch sử sử dụng"
                          >
                            <History className="h-3.5 w-3.5" />
                            <span className="hidden sm:inline">Lịch sử</span>
                          </button>

                          <button
                            onClick={() => handleOpenEditForm(v)}
                            className="p-1.5 rounded-[3px] border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
                            title="Chỉnh sửa"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteVoucher(v)}
                            className="p-1.5 rounded-[3px] border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                            title="Xóa mã"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* HISTORY USAGE MODAL */}
      {historyVoucher && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-2xl overflow-hidden space-y-4 p-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="space-y-0.5">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <History className="h-5 w-5 text-blue-600" />
                  <span>Lịch sử sử dụng mã: <span className="font-mono text-sky-700">{historyVoucher.code}</span></span>
                </h3>
                <p className="text-xs text-slate-500">{historyVoucher.name}</p>
              </div>
              <button
                onClick={() => setHistoryVoucher(null)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Summary Row */}
            <div className="grid grid-cols-2 gap-4 bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs">
              <div>
                <span className="text-slate-500 font-medium block">Số lượt đã sử dụng:</span>
                <span className="font-bold text-slate-800 text-sm">
                  {historyVoucher.usage_count || 0} / {historyVoucher.usage_limit ? `${historyVoucher.usage_limit} lượt` : 'Không giới hạn'}
                </span>
              </div>
              <div>
                <span className="text-slate-500 font-medium block">Tổng tiền chiết khấu đã hỗ trợ:</span>
                <span className="font-bold text-emerald-600 text-sm">
                  {formatPrice(
                    (historyVoucher.usage_history || []).reduce((sum, item) => sum + item.discount_amount, 0)
                  )}
                </span>
              </div>
            </div>

            {/* Usage Log Table */}
            <div className="border border-slate-200 rounded-lg overflow-hidden max-h-[350px] overflow-y-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Mã đơn hàng</th>
                    <th className="p-3">Khách hàng / Doanh nghiệp</th>
                    <th className="p-3 text-right">Số tiền giảm</th>
                    <th className="p-3 text-right">Thời gian</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {!historyVoucher.usage_history || historyVoucher.usage_history.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="p-6 text-center text-slate-400 font-medium">
                        Chưa có khách hàng nào sử dụng mã voucher này.
                      </td>
                    </tr>
                  ) : (
                    historyVoucher.usage_history.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50/60">
                        <td className="p-3 font-mono font-bold text-sky-700">
                          {log.order_code}
                        </td>
                        <td className="p-3 space-y-0.5">
                          <p className="font-bold text-slate-800">{log.customer_name}</p>
                          <p className="text-[11px] text-slate-500">{log.customer_email} {log.customer_phone ? `• ${log.customer_phone}` : ''}</p>
                        </td>
                        <td className="p-3 text-right font-bold text-emerald-600">
                          -{formatPrice(log.discount_amount)}
                        </td>
                        <td className="p-3 text-right text-slate-500 font-medium">
                          {log.used_at}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button
                onClick={() => setHistoryVoucher(null)}
                className="px-4 py-2 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE / EDIT VOUCHER MODAL */}
      {formOpen && activeVoucher && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-lg overflow-hidden space-y-4 p-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Tag className="h-5 w-5 text-sky-600" />
                <span>{activeVoucher.id ? 'Chỉnh sửa Voucher' : 'Tạo Voucher mới'}</span>
              </h3>
              <button
                onClick={() => setFormOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="space-y-4 text-left">
              {formError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-xs font-semibold">
                  {formError}
                </div>
              )}

              {/* Code */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 uppercase">
                  Mã Voucher (Code) *
                </label>
                <input
                  type="text"
                  required
                  value={activeVoucher.code || ''}
                  onChange={(e) =>
                    setActiveVoucher({ ...activeVoucher, code: e.target.value.toUpperCase() })
                  }
                  placeholder="Ví dụ: ULINKB2B, ULINK10"
                  className="w-full px-3.5 py-2.5 rounded-md border border-slate-300 text-sm font-mono font-bold uppercase text-sky-700 focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600"
                />
              </div>

              {/* Name */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 uppercase">
                  Tên chương trình khuyến mãi *
                </label>
                <input
                  type="text"
                  required
                  value={activeVoucher.name || ''}
                  onChange={(e) => setActiveVoucher({ ...activeVoucher, name: e.target.value })}
                  placeholder="Ví dụ: Chiết khấu 10% cho đối tác B2B"
                  className="w-full px-3.5 py-2.5 rounded-md border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600"
                />
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 uppercase">
                  Mô tả ưu đãi
                </label>
                <input
                  type="text"
                  value={activeVoucher.description || ''}
                  onChange={(e) =>
                    setActiveVoucher({ ...activeVoucher, description: e.target.value })
                  }
                  placeholder="Ví dụ: Giảm trực tiếp 10% tổng giá trị đơn hàng"
                  className="w-full px-3.5 py-2.5 rounded-md border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600"
                />
              </div>

              {/* Row: Type & Value */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase">
                    Loại giảm giá *
                  </label>
                  <select
                    value={activeVoucher.discount_type || 'percent'}
                    onChange={(e) =>
                      setActiveVoucher({
                        ...activeVoucher,
                        discount_type: e.target.value as 'percent' | 'fixed'
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-md border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-sky-600"
                  >
                    <option value="percent">Phần trăm (%)</option>
                    <option value="fixed">Số tiền cố định (đ)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase">
                    Giá trị giảm *
                  </label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={activeVoucher.discount_value || 0}
                    onChange={(e) =>
                      setActiveVoucher({
                        ...activeVoucher,
                        discount_value: Number(e.target.value)
                      })
                    }
                    placeholder="10 hoặc 50000"
                    className="w-full px-3.5 py-2.5 rounded-md border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-sky-600"
                  />
                </div>
              </div>

              {/* Row: Min Order & Max Discount */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase">
                    Đơn hàng tối thiểu (đ)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={activeVoucher.min_order_amount || 0}
                    onChange={(e) =>
                      setActiveVoucher({
                        ...activeVoucher,
                        min_order_amount: Number(e.target.value)
                      })
                    }
                    placeholder="0"
                    className="w-full px-3.5 py-2.5 rounded-md border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-sky-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase">
                    Giới hạn số lượt sử dụng
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={activeVoucher.usage_limit || ''}
                    onChange={(e) =>
                      setActiveVoucher({
                        ...activeVoucher,
                        usage_limit: e.target.value ? Number(e.target.value) : null
                      })
                    }
                    placeholder="Ví dụ: 100 (Để trống = không giới hạn)"
                    className="w-full px-3.5 py-2.5 rounded-md border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-sky-600"
                  />
                </div>
              </div>

              {/* Active Toggle */}
              <div className="pt-1">
                <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={activeVoucher.is_active ?? true}
                    onChange={(e) =>
                      setActiveVoucher({ ...activeVoucher, is_active: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-sky-600 focus:ring-sky-600 accent-sky-600 border-slate-300 cursor-pointer"
                  />
                  <span className="text-xs font-bold text-slate-800">
                    Kích hoạt sử dụng voucher này ngay
                  </span>
                </label>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="px-4 py-2 rounded-md border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-5 py-2 rounded-md bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  {isPending ? 'Đang lưu...' : 'Lưu thông tin'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRM MODAL */}
      <ConfirmModal
        isOpen={confirmState.isOpen}
        title={confirmState.title}
        message={confirmState.message}
        type={confirmState.type}
        onConfirm={confirmState.onConfirm}
        onCancel={() => setConfirmState((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
