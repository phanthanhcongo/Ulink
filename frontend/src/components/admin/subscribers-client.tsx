'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useTransition } from 'react';
import toast from 'react-hot-toast';
import { Search, Mail, Plus, Edit2, Trash2, Download, X, AlertTriangle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ConfirmModal } from './confirm-modal';
import { saveSubscriber, deleteSubscriber } from '@/app/[locale]/admin/subscribers/actions';

interface SubscriberItem {
  id: number;
  email: string;
  status: 'active' | 'inactive';
  created_at: string;
}

interface SubscriberFormState {
  id?: number;
  email: string;
  status: SubscriberItem['status'];
}

interface SubscribersClientProps {
  initialSubscribers: SubscriberItem[];
  error?: string;
}

export function SubscribersClient({ initialSubscribers, error }: SubscribersClientProps) {
  const [subscribers, setSubscribers] = useState<SubscriberItem[]>(initialSubscribers);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isPending, startTransition] = useTransition();

  // CRUD Form State
  const [formOpen, setFormOpen] = useState(false);
  const [activeSub, setActiveSub] = useState<SubscriberFormState | null>(null);
  const [formError, setFormError] = useState('');
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

  // Filter subscribers
  const filteredSubscribers = subscribers.filter((s) => {
    const email = s.email.toLowerCase();
    const q = searchQuery.toLowerCase();

    const matchesSearch = email.includes(q);
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleOpenCreateForm = () => {
    setActiveSub({
      email: '',
      status: 'active'
    });
    setFormOpen(true);
    setFormError('');
  };

  const handleOpenEditForm = (s: SubscriberItem) => {
    setActiveSub({
      id: s.id,
      email: s.email,
      status: s.status
    });
    setFormOpen(true);
    setFormError('');
  };

  const handleDeleteSub = (id: number) => {
    setConfirmState({
      isOpen: true,
      title: 'Xóa email đăng ký',
      message: 'Bạn có chắc chắn muốn xóa email đăng ký này không?',
      type: 'danger',
      onConfirm: () => {
        setConfirmState((prev) => ({ ...prev, isOpen: false }));
        startTransition(async () => {
          const res = await deleteSubscriber(id);
          if (res.success) {
            setSubscribers((prev) => prev.filter((s) => s.id !== id));
            toast.success('Đã xóa email đăng ký thành công.');
          } else {
            toast.error('Không thể xóa email đăng ký: ' + res.error);
          }
        });
      }
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSub) return;

    setFormError('');
    if (!activeSub.email) {
      setFormError('Vui lòng nhập địa chỉ email.');
      return;
    }

    startTransition(async () => {
      const res = await saveSubscriber({
        id: activeSub.id,
        email: activeSub.email,
        status: activeSub.status || 'active'
      });

      if (res.success) {
        setFormOpen(false);
        setActiveSub(null);
        setFormError('');
        window.location.reload();
      } else {
        setFormError(res.error || 'Thao tác thất bại. Vui lòng thử lại.');
      }
    });
  };

  // Export CSV Handler
  const handleExportCSV = () => {
    if (filteredSubscribers.length === 0) {
      toast.error('Không có dữ liệu để xuất.');
      return;
    }
    toast.success('Đang chuẩn bị tải xuống file CSV...');

    // CSV format headers and rows
    const headers = 'ID,Email,Trang thai,Ngay dang ky\n';
    const rows = filteredSubscribers
      .map((s) => {
        const dateStr = s.created_at
          ? new Date(s.created_at).toLocaleString('vi-VN').replace(/,/g, '')
          : '';
        return `${s.id},"${s.email}",${s.status === 'active' ? 'Active' : 'Inactive'},"${dateStr}"`;
      })
      .join('\n');

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + encodeURIComponent(headers + rows);

    // Create temporary download link
    const link = document.createElement('a');
    link.setAttribute('href', csvContent);
    link.setAttribute('download', `ulink_subscribers_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-6 mb-8">
        <div>
          <span className="text-xs uppercase text-slate-400 font-extrabold tracking-wider">
            Chiến dịch tiếp thị & Marketing
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight mt-1">
            Đăng ký bản tin (Newsletter Subscribers)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1 leading-relaxed">
            Xem danh sách khách hàng gửi email đăng ký nhận tin khuyến mãi, bảng giá ở chân trang
            web và xuất file CSV phục vụ Mailchimp.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExportCSV}
            className="inline-flex h-10 items-center justify-center gap-1.5 px-4 rounded-[3px] border border-slate-200 bg-white text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 shadow-sm transition-colors"
          >
            <Download className="h-4 w-4" />
            Xuất file CSV
          </button>

          <button
            type="button"
            onClick={handleOpenCreateForm}
            className="inline-flex h-10 items-center justify-center gap-1.5 px-4 rounded-[3px] bg-blue-600 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-blue-700 transition-colors shrink-0"
          >
            <Plus className="h-4 w-4" />
            Thêm email mới
          </button>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-[3px] text-rose-800 text-xs sm:text-sm font-semibold flex items-start gap-2.5 shadow-sm">
          <AlertTriangle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-extrabold text-rose-900 block mb-1">
              Đã xảy ra lỗi khi tải danh sách email đăng ký nhận tin
            </span>
            <pre className="font-mono text-[11px] bg-white/60 p-2.5 rounded-[3px] mt-2 overflow-x-auto border border-rose-100/50 max-h-40 whitespace-pre-wrap select-all">
              {error}
            </pre>
          </div>
        </div>
      )}

      {/* Filter and Table */}
      <div className="bg-white rounded-[3px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm kiếm email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-[3px] border border-slate-200 text-xs sm:text-sm font-bold text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-[3px] border border-slate-200 text-xs sm:text-sm font-bold text-slate-700 focus:outline-none bg-white"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {filteredSubscribers.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-sm font-medium bg-white">
            Không tìm thấy email đăng ký nào.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-slate-50 text-[10px] uppercase text-slate-400 tracking-wider font-extrabold border-b border-slate-100">
                  <th className="px-4 py-2.5 w-[65px] sticky left-0 bg-slate-50 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.05)]">ID</th>
                  <th className="px-4 py-2.5 sticky left-[65px] bg-slate-50 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.05)]">Địa chỉ Email</th>
                  <th className="px-4 py-2.5">Trạng thái</th>
                  <th className="px-4 py-2.5">Ngày đăng ký</th>
                  <th className="px-4 py-2.5 text-right sticky right-0 bg-slate-50 z-10 shadow-[-2px_0_5px_rgba(0,0,0,0.05)]">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm text-slate-700">
                {filteredSubscribers.map((sub) => {
                  return (
                    <tr key={sub.id} className="group hover:bg-slate-50/30 transition-colors">
                      <td className="px-4 py-3 w-[65px] sticky left-0 bg-white group-hover:bg-slate-50/80 transition-colors shadow-[2px_0_5px_rgba(0,0,0,0.03)] z-10 font-mono text-slate-400 text-xs">
                        #{sub.id}
                      </td>
                      <td className="px-4 py-3 sticky left-[65px] bg-white group-hover:bg-slate-50/80 transition-colors shadow-[2px_0_5px_rgba(0,0,0,0.03)] z-10">
                        <span className="font-extrabold text-primary leading-tight select-all font-mono">
                          {sub.email}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={cn(
                            'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[3px] text-[10px] font-bold border shadow-sm select-none',
                            sub.status === 'active'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                              : 'bg-slate-50 text-slate-550 border-slate-200'
                          )}
                        >
                          <span
                            className={cn(
                              'h-1.5 w-1.5 rounded-[3px] shrink-0',
                              sub.status === 'active' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'
                            )}
                          />
                          <span>{sub.status === 'active' ? 'Hoạt động' : 'Ngừng nhận'}</span>
                        </span>
                      </td>

                      <td className="px-4 py-3 text-slate-500 text-xs font-medium">
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-slate-400" />
                          {sub.created_at
                            ? new Date(sub.created_at).toLocaleDateString('vi-VN', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit'
                              })
                            : '---'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right sticky right-0 bg-white group-hover:bg-slate-50/80 transition-colors shadow-[-2px_0_5px_rgba(0,0,0,0.03)] z-10">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleOpenEditForm(sub)}
                            className="p-1 rounded-[3px] hover:bg-slate-100 text-slate-400 hover:text-blue-600 transition-colors"
                            title="Sửa email"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteSub(sub.id)}
                            className="p-1 rounded-[3px] hover:bg-slate-100 text-rose-500 hover:text-rose-700 transition-colors"
                            title="Xóa email"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal: Create or Edit Subscriber Form */}
      {formOpen && activeSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="my-8 w-full max-w-md bg-white rounded-[3px] shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-slate-100">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div>
                <h2 className="text-base sm:text-lg font-extrabold text-primary flex items-center gap-2">
                  <Mail className="h-5 w-5 text-blue-500" />
                  {activeSub.id ? `Cập nhật email: ${activeSub.email}` : 'Thêm email đăng ký mới'}
                </h2>
                <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
                  Nhập địa chỉ email và cấu hình trạng thái nhận bản tin.
                </p>
              </div>
              <button
                onClick={() => {
                  setFormOpen(false);
                  setActiveSub(null);
                  setFormError('');
                }}
                className="p-1.5 rounded-[3px] hover:bg-slate-100 text-slate-400 hover:text-slate-655"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleFormSubmit} className="flex flex-col">
              <div className="p-6 flex flex-col gap-4 bg-white">
                {formError && (
                  <div className="p-3 bg-rose-50 border border-rose-100 rounded-[3px] text-xs font-bold text-rose-600 flex items-center gap-2 animate-in fade-in duration-200">
                    <AlertTriangle className="h-4 w-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}
                {/* Email Address */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-extrabold text-slate-450 uppercase tracking-wider">
                    Địa chỉ Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={activeSub.email || ''}
                    onChange={(e) => setActiveSub({ ...activeSub, email: e.target.value })}
                    placeholder="customer@company.com"
                    className="px-3.5 py-2.5 rounded-[3px] border border-slate-200 text-xs sm:text-sm font-bold text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand shadow-sm"
                  />
                </div>

                {/* Status Dropdown */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-extrabold text-slate-450 uppercase tracking-wider">
                    Trạng thái đăng ký
                  </label>
                  <select
                    value={activeSub.status || 'active'}
                    onChange={(e) =>
                      setActiveSub({
                        ...activeSub,
                        status: e.target.value as SubscriberItem['status']
                      })
                    }
                    className="px-3.5 py-2.5 rounded-[3px] border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none bg-white shadow-sm"
                  >
                    <option value="active">Đang nhận bản tin (Active)</option>
                    <option value="inactive">Đã ngừng nhận tin (Inactive)</option>
                  </select>
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50/50">
                <button
                  type="button"
                  onClick={() => {
                    setFormOpen(false);
                    setActiveSub(null);
                  }}
                  className="px-5 py-2.5 rounded-[3px] border border-slate-200 text-xs sm:text-sm font-bold text-slate-550 hover:bg-slate-100 transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-[3px] bg-blue-600 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-blue-700 transition-colors"
                >
                  {isPending ? 'Đang lưu...' : 'Lưu thông tin'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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

