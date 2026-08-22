'use client';

import React, { useMemo, useState } from 'react';
import { Search, Mail, CalendarClock, ArrowRight, X } from 'lucide-react';
import { useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import type { ContactRequest } from '@/lib/directus';

interface ContactRequestsClientProps {
  initialRequests: ContactRequest[];
  error?: string;
}

export function ContactRequestsClient({ initialRequests, error }: ContactRequestsClientProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<ContactRequest | null>(null);

  const filteredRequests = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return initialRequests;

    return initialRequests.filter((request) => {
      const haystack = [
        request.full_name,
        request.email,
        request.phone,
        request.subject,
        request.message
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [initialRequests, searchQuery]);

  const openDetail = (id: number | string | undefined) => {
    if (id === undefined || id === null) return;
    router.push(`/admin/contact-requests/${id}`);
  };

  const getStatusMeta = (status?: ContactRequest['status']) => {
    if (status === 'read') {
      return { label: 'Đã đọc', classes: 'bg-emerald-50 text-emerald-700' };
    }
    return { label: 'Chưa đọc', classes: 'bg-amber-50 text-amber-700' };
  };

  return (
    <div className="admin-page">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-6 mb-8">
        <div>
          <span className="text-xs uppercase text-slate-400 font-extrabold tracking-wider">
            Hộp thư chăm sóc khách hàng
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight mt-1">
            Liên hệ gửi về
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1 leading-relaxed">
            Xem toàn bộ thông tin khách hàng gửi từ form liên hệ trên website.
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-[5px] text-rose-800 text-xs sm:text-sm font-semibold flex items-start gap-2.5 shadow-sm">
          <div className="flex-1">
            <span className="font-extrabold text-rose-900 block mb-1">
              Đã xảy ra lỗi khi tải danh sách liên hệ
            </span>
            <pre className="font-mono text-[11px] bg-white/60 p-2.5 rounded-[5px] mt-2 overflow-x-auto border border-rose-100/50 max-h-40 whitespace-pre-wrap select-all">
              {error}
            </pre>
          </div>
        </div>
      )}

      <div className="admin-panel admin-panel-pad mb-8 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tên, email, số điện thoại, chủ đề..."
            className="w-full pl-10 pr-4 py-2.5 rounded-[5px] border border-slate-200 text-xs sm:text-sm font-medium focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
          />
        </div>

        <div className="text-xs font-semibold text-slate-500">
          {filteredRequests.length} liên hệ
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-[5px] shadow-sm overflow-hidden">
        {filteredRequests.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Mail className="h-12 w-12 text-slate-300 mb-3" />
            <span className="text-sm font-extrabold text-primary">Chưa có liên hệ nào</span>
            <span className="text-xs text-slate-400 mt-1">
              Hệ thống sẽ hiển thị các tin nhắn khách gửi về tại đây.
            </span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left min-w-[1000px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <th className="px-4 py-2.5 sticky left-0 bg-slate-50 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.05)]">Người gửi</th>
                  <th className="px-4 py-2.5">Liên hệ</th>
                  <th className="px-4 py-2.5">Chủ đề</th>
                  <th className="px-4 py-2.5">Trạng thái</th>
                  <th className="px-4 py-2.5">Thời gian</th>
                  <th className="px-4 py-2.5 text-right sticky right-0 bg-slate-50 z-10 shadow-[-2px_0_5px_rgba(0,0,0,0.05)]">Xem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm text-slate-700">
                {filteredRequests.map((request) => (
                  <tr
                    key={request.id}
                    onClick={() => setSelectedRequest(request)}
                    className="cursor-pointer hover:bg-slate-50/30 transition-colors group"
                  >
                    {/* Name (Sticky) */}
                    <td className="px-4 py-3 sticky left-0 bg-white group-hover:bg-slate-50/80 transition-colors shadow-[2px_0_5px_rgba(0,0,0,0.03)] z-10">
                      <div className="flex flex-col">
                        <span className="font-extrabold text-primary leading-tight">
                          {request.full_name}
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold mt-1">
                          #{request.id}
                        </span>
                      </div>
                    </td>

                    {/* Email / Phone */}
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-slate-650 font-medium max-w-[200px] truncate select-all block font-mono" title={request.email}>
                          {request.email}
                        </span>
                        <span className="text-slate-400 font-medium text-[11px] font-mono">
                          {request.phone}
                        </span>
                      </div>
                    </td>

                    {/* Subject */}
                    <td className="px-4 py-3">
                      <span className="inline-flex max-w-[260px] rounded-[5px] bg-cyan-50 px-2.5 py-0.5 text-[10px] font-bold text-cyan-700">
                        {request.subject}
                      </span>
                    </td>

                    {/* Status with pulsing dot */}
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[5px] text-[10px] font-bold border shadow-sm select-none',
                          request.status === 'read'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                            : 'bg-amber-50 text-amber-800 border-amber-100'
                        )}
                      >
                        <span
                          className={cn(
                            'h-1.5 w-1.5 rounded-[5px] shrink-0',
                            request.status === 'read' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'
                          )}
                        />
                        <span>{request.status === 'read' ? 'Đã đọc' : 'Chưa đọc'}</span>
                      </span>
                    </td>

                    {/* Time */}
                    <td className="px-4 py-3 text-slate-550 font-medium tabular-nums font-mono">
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarClock className="h-3.5 w-3.5 text-slate-400" />
                        {request.created_at
                          ? new Date(request.created_at).toLocaleDateString('vi-VN', {
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit'
                            })
                          : '---'}
                      </span>
                    </td>

                    {/* View details (Sticky) */}
                    <td className="px-4 py-3 text-right sticky right-0 bg-white group-hover:bg-slate-50/80 transition-colors shadow-[-2px_0_5px_rgba(0,0,0,0.03)] z-10">
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-600">
                        Xem nhanh
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-xl bg-white rounded-[5px] shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-slate-100">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white">
              <div>
                <span className="text-[10px] uppercase text-slate-400 font-extrabold tracking-wider">
                  Xem nhanh liên hệ #{selectedRequest.id}
                </span>
                <h2 className="text-base sm:text-lg font-extrabold text-primary flex items-center gap-2 mt-0.5">
                  <Mail className="h-5 w-5 text-blue-500" />
                  {selectedRequest.full_name}
                </h2>
              </div>
              <button
                onClick={() => setSelectedRequest(null)}
                className="p-1.5 rounded-[5px] hover:bg-slate-100 text-slate-400 hover:text-slate-650"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 flex flex-col gap-5 bg-white">
              {/* Contact Info block */}
              <div className="grid grid-cols-2 gap-4 bg-slate-50/50 p-4 rounded-[5px] border border-slate-100">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] font-extrabold text-slate-400 uppercase">Điện thoại</span>
                  <span className="text-xs font-bold text-slate-700 select-all font-mono">{selectedRequest.phone}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] font-extrabold text-slate-450 uppercase">Email</span>
                  <span className="text-xs font-bold text-slate-700 select-all font-mono">{selectedRequest.email}</span>
                </div>
                <div className="flex flex-col gap-0.5 col-span-2">
                  <span className="text-[9px] font-extrabold text-slate-450 uppercase">Thời gian gửi</span>
                  <span className="text-xs font-bold text-slate-600 font-mono">
                    {selectedRequest.created_at ? new Date(selectedRequest.created_at).toLocaleString('vi-VN') : '---'}
                  </span>
                </div>
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-extrabold text-slate-450 uppercase">Chủ đề</span>
                <span className="inline-flex w-fit rounded-[5px] bg-cyan-50 px-2.5 py-0.5 text-xs font-bold text-cyan-700">
                  {selectedRequest.subject}
                </span>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[9px] font-extrabold text-slate-455 uppercase">Nội dung tin nhắn</span>
                <div className="text-xs text-slate-650 bg-slate-50/30 p-4 rounded-[5px] border border-slate-200/80 whitespace-pre-wrap leading-relaxed max-h-[30vh] overflow-y-auto font-medium">
                  {selectedRequest.message || <span className="italic text-slate-400">Không có nội dung tin nhắn.</span>}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/50">
              <button
                type="button"
                onClick={() => {
                  setSelectedRequest(null);
                  router.push(`/admin/contact-requests/${selectedRequest.id}`);
                }}
                className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700"
              >
                Trang chi tiết đầy đủ
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setSelectedRequest(null)}
                className="px-5 py-2 rounded-[5px] border border-slate-200 text-xs font-bold text-slate-550 hover:bg-slate-100 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

