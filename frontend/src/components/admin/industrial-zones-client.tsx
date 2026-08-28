'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useTransition } from 'react';
import toast from 'react-hot-toast';
import { Search, Plus, Edit2, Trash2, X, AlertTriangle, Factory } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ConfirmModal } from './confirm-modal';
import { saveIndustrialZone, deleteIndustrialZone } from '@/app/[locale]/admin/industrial-zones/actions';

interface ZoneItem {
  id: number;
  name: string;
  image?: string | null;
  hub?: {
    id: number;
    name: string;
  } | null;
}

interface HubOption {
  id: number;
  name: string;
}

interface IndustrialZonesClientProps {
  initialZones: ZoneItem[];
  hubs: HubOption[];
  error?: string;
}

export function IndustrialZonesClient({ initialZones, hubs, error }: IndustrialZonesClientProps) {
  const [zones, setZones] = useState<ZoneItem[]>(initialZones);
  const [searchQuery, setSearchQuery] = useState('');
  const [hubFilter, setHubFilter] = useState<string>('all');
  const [isPending, startTransition] = useTransition();

  // CRUD Form State
  const [formOpen, setFormOpen] = useState(false);
  const [activeZone, setActiveZone] = useState<{
    id?: number;
    name: string;
    hubId: number;
    image?: string | null;
  } | null>(null);
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

  // Filter KCNs
  const filteredZones = zones.filter((z) => {
    const name = z.name.toLowerCase();
    const q = searchQuery.toLowerCase();

    const matchesSearch = name.includes(q);
    const matchesHub = hubFilter === 'all' || (z.hub && String(z.hub.id) === hubFilter);

    return matchesSearch && matchesHub;
  });

  const handleOpenCreateForm = () => {
    setActiveZone({
      name: '',
      hubId: hubs.length > 0 ? hubs[0].id : 0,
      image: ''
    });
    setFormOpen(true);
    setFormError('');
  };

  const handleOpenEditForm = (z: ZoneItem) => {
    setActiveZone({
      id: z.id,
      name: z.name,
      hubId: z.hub ? z.hub.id : (hubs.length > 0 ? hubs[0].id : 0),
      image: z.image || ''
    });
    setFormOpen(true);
    setFormError('');
  };

  const handleDeleteZone = (id: number) => {
    setConfirmState({
      isOpen: true,
      title: 'Xóa Khu công nghiệp',
      message: 'Bạn có chắc chắn muốn xóa Khu công nghiệp này khỏi cụm kho không?',
      type: 'danger',
      onConfirm: () => {
        setConfirmState((prev) => ({ ...prev, isOpen: false }));
        startTransition(async () => {
          const res = await deleteIndustrialZone(id);
          if (res.success) {
            setZones((prev) => prev.filter((z) => z.id !== id));
            toast.success('Đã xóa Khu công nghiệp thành công.');
          } else {
            toast.error('Không thể xóa Khu công nghiệp: ' + res.error);
          }
        });
      }
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeZone) return;

    setFormError('');
    if (!activeZone.name.trim()) {
      setFormError('Vui lòng nhập tên Khu công nghiệp.');
      return;
    }
    if (!activeZone.hubId) {
      setFormError('Vui lòng chọn Cụm kho (Hub) quản lý.');
      return;
    }

    startTransition(async () => {
      const res = await saveIndustrialZone({
        id: activeZone.id,
        name: activeZone.name,
        hubId: Number(activeZone.hubId),
        image: activeZone.image || null
      });

      if (res.success) {
        setFormOpen(false);
        setActiveZone(null);
        setFormError('');
        window.location.reload();
      } else {
        setFormError(res.error || 'Thao tác thất bại. Vui lòng thử lại.');
      }
    });
  };

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-6 mb-8">
        <div>
          <span className="text-xs uppercase text-slate-400 font-extrabold tracking-wider">
            Hạ tầng & Logistics
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight mt-1">
            Quản lý Khu công nghiệp (KCN)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1 leading-relaxed">
            Xem, thêm mới, cập nhật và xóa danh sách các Khu công nghiệp/Khu chế xuất thuộc quyền quản lý của các Cụm kho (Regional Hubs) ULink.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreateForm}
          className="inline-flex h-10 items-center justify-center gap-1.5 px-4 rounded-[3px] bg-blue-600 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-blue-700 transition-colors shrink-0"
        >
          <Plus className="h-4 w-4" />
          Thêm KCN mới
        </button>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-[3px] text-rose-800 text-xs sm:text-sm font-semibold flex items-start gap-2.5 shadow-sm">
          <AlertTriangle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-extrabold text-rose-900 block mb-1">
              Đã xảy ra lỗi khi tải danh sách Khu công nghiệp
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
              placeholder="Tìm kiếm KCN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-[3px] border border-slate-200 text-xs sm:text-sm font-bold text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={hubFilter}
              onChange={(e) => setHubFilter(e.target.value)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-[3px] border border-slate-200 text-xs sm:text-sm font-bold text-slate-700 focus:outline-none bg-white"
            >
              <option value="all">Tất cả Cụm kho / Hubs</option>
              {hubs.map((hub) => (
                <option key={hub.id} value={hub.id}>
                  {hub.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredZones.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-sm font-medium bg-white">
            Không tìm thấy Khu công nghiệp nào.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-slate-50 text-[10px] uppercase text-slate-400 tracking-wider font-extrabold border-b border-slate-100">
                  <th className="px-6 py-3 w-[80px]">ID</th>
                  <th className="px-6 py-3">Tên Khu công nghiệp</th>
                  <th className="px-6 py-3">Cụm kho (Hub) quản lý</th>
                  <th className="px-6 py-3 w-[150px] text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm font-medium text-slate-750">
                {filteredZones.map((z) => (
                  <tr key={z.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-slate-400">#{z.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-[3px] bg-blue-50 text-blue-600">
                          <Factory className="h-4 w-4" />
                        </div>
                        <span className="font-bold text-slate-800">{z.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {z.hub ? (
                        <span className="inline-flex items-center px-2 py-1 rounded bg-slate-100 text-xs font-bold text-slate-700">
                          {z.hub.name}
                        </span>
                      ) : (
                        <span className="text-slate-400 italic">Chưa gắn Hub</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenEditForm(z)}
                          className="p-1.5 rounded-[3px] text-slate-400 hover:text-blue-600 hover:bg-slate-100 transition-all"
                          title="Chỉnh sửa KCN"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteZone(z.id)}
                          className="p-1.5 rounded-[3px] text-slate-400 hover:text-rose-600 hover:bg-slate-100 transition-all"
                          title="Xóa KCN"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CRUD Form Modal */}
      {formOpen && activeZone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white rounded-[3px] border border-slate-100 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-base font-extrabold text-slate-800">
                {activeZone.id ? 'Cập nhật Khu công nghiệp' : 'Thêm mới Khu công nghiệp'}
              </h2>
              <button
                type="button"
                onClick={() => setFormOpen(false)}
                className="p-1 rounded-[3px] text-slate-400 hover:text-slate-650 hover:bg-slate-100 transition-all"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-5 space-y-4">
              {formError && (
                <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-[3px] text-rose-800 text-xs font-semibold flex items-start gap-2">
                  <AlertTriangle className="h-4.5 w-4.5 text-rose-500 shrink-0 mt-0.5" />
                  <span>{formError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-1.5">
                  Tên Khu công nghiệp <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={activeZone.name}
                  onChange={(e) => setActiveZone({ ...activeZone, name: e.target.value })}
                  placeholder="Ví dụ: KCN VSIP Bắc Ninh"
                  className="w-full px-4 py-2.5 rounded-[3px] border border-slate-200 text-sm font-bold text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-1.5">
                  Cụm kho (Hub) quản lý <span className="text-rose-500">*</span>
                </label>
                <select
                  value={activeZone.hubId}
                  onChange={(e) => setActiveZone({ ...activeZone, hubId: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 rounded-[3px] border border-slate-200 text-sm font-bold text-slate-700 focus:outline-none bg-white"
                  required
                >
                  <option value="">-- Chọn Cụm kho --</option>
                  {hubs.map((hub) => (
                    <option key={hub.id} value={hub.id}>
                      {hub.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-1.5">
                  Đường dẫn ảnh minh họa (Tùy chọn)
                </label>
                <input
                  type="text"
                  value={activeZone.image || ''}
                  onChange={(e) => setActiveZone({ ...activeZone, image: e.target.value })}
                  placeholder="Ví dụ: /images/kcn/vsip.jpg"
                  className="w-full px-4 py-2.5 rounded-[3px] border border-slate-200 text-sm font-bold text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand bg-white"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="inline-flex h-10 items-center justify-center px-4 rounded-[3px] border border-slate-200 bg-white text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex h-10 items-center justify-center px-4 rounded-[3px] bg-blue-600 text-xs sm:text-sm font-bold text-white hover:bg-blue-700 shadow-sm transition-colors disabled:opacity-50"
                >
                  {isPending ? 'Đang lưu...' : 'Lưu lại'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirm Action Dialog */}
      <ConfirmModal
        isOpen={confirmState.isOpen}
        title={confirmState.title}
        message={confirmState.message}
        type={confirmState.type}
        onCancel={() => setConfirmState((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={confirmState.onConfirm}
      />
    </div>
  );
}
