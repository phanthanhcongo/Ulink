'use client';

/* eslint-disable @next/next/no-img-element, @typescript-eslint/no-explicit-any */

import React, { useState, useTransition, useRef, useCallback } from 'react';
import toast from 'react-hot-toast';
import {
  Plus, Search, Edit, Trash, CalendarDays, X, AlertTriangle,
  MapPin, Clock, Home, Users, Upload, Image as ImageIcon
} from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { ConfirmModal } from './confirm-modal';
import { saveEvent, deleteEvent } from '@/app/[locale]/admin/events/actions';
import { uploadImage } from '@/app/[locale]/admin/articles/actions';
import { resolveImageUrl } from '@/lib/image-url';

interface EventRecord {
  id: number;
  status: string;
  slug: string;
  title: string;
  summary: string | null;
  image: string | null;
  date: string | null;
  time: string | null;
  start_time: string | null;
  end_time: string | null;
  location: string | null;
  location_name: string | null;
  address: string | null;
  registration_status: string | null;
  price: string | null;
  overview: string | null;
  highlights: string[];
  agenda: any[];
  speakers: any[];
  hosts: any[];
  sponsors: string[];
  benefits: string[];
  organizer_name: string | null;
  organizer_description: string | null;
  organizer_contact: string | null;
  organizer_role: string | null;
  organizer_logo: string | null;
}

interface Props {
  initialEvents: EventRecord[];
  error?: string;
}

type FormTab = 'basic' | 'content' | 'people';

export function EventsAdminClient({ initialEvents, error }: Props) {
  const [events, setEvents] = useState<EventRecord[]>(initialEvents);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPending, startTransition] = useTransition();
  const [modalOpen, setModalOpen] = useState(false);
  const [activeEvent, setActiveEvent] = useState<Partial<EventRecord> | null>(null);
  const [formError, setFormError] = useState('');
  const [formTab, setFormTab] = useState<FormTab>('basic');
  const [isDirty, setIsDirty] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [confirmState, setConfirmState] = useState<{
    isOpen: boolean; title?: string; message: string; onConfirm: () => void; type?: 'danger' | 'warning' | 'info';
  }>({ isOpen: false, message: '', onConfirm: () => {} });

  const filtered = events.filter((ev) => {
    const q = searchQuery.toLowerCase();
    return (ev.title || '').toLowerCase().includes(q) || (ev.slug || '').toLowerCase().includes(q) || (ev.location || '').toLowerCase().includes(q);
  });

  const openNew = () => {
    setActiveEvent({
      status: 'draft', slug: '', title: '', summary: '', image: null,
      date: '', time: '', start_time: '', end_time: '',
      location: '', location_name: '', address: '',
      registration_status: 'UPCOMING', price: '',
      overview: '', highlights: [], agenda: [], speakers: [], hosts: [], sponsors: [], benefits: [],
      organizer_name: 'ULink Industries', organizer_description: '', organizer_contact: 'contact@ulinkindustries.com', organizer_role: 'Đơn vị tổ chức', organizer_logo: '/images/logo/image.png'
    });
    setModalOpen(true);
    setFormError('');
    setFormTab('basic');
    setIsDirty(false);
  };

  const openEdit = (ev: EventRecord) => {
    setActiveEvent({ ...ev });
    setModalOpen(true);
    setFormError('');
    setFormTab('basic');
    setIsDirty(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeEvent?.title || !activeEvent?.slug) {
      setFormError('Vui lòng nhập tiêu đề sự kiện.');
      return;
    }
    startTransition(async () => {
      const res = await saveEvent({
        id: activeEvent.id,
        title: activeEvent.title || '',
        slug: activeEvent.slug || '',
        summary: activeEvent.summary || '',
        image: activeEvent.image,
        date: activeEvent.date || '',
        time: activeEvent.time || '',
        start_time: activeEvent.start_time || '',
        end_time: activeEvent.end_time || '',
        location: activeEvent.location || '',
        location_name: activeEvent.location_name || '',
        address: activeEvent.address || '',
        registration_status: activeEvent.registration_status || 'UPCOMING',
        price: activeEvent.price || '',
        overview: activeEvent.overview || '',
        highlights: activeEvent.highlights || [],
        agenda: activeEvent.agenda || [],
        speakers: activeEvent.speakers || [],
        hosts: activeEvent.hosts || [],
        sponsors: activeEvent.sponsors || [],
        benefits: activeEvent.benefits || [],
        organizer_name: activeEvent.organizer_name || '',
        organizer_description: activeEvent.organizer_description || '',
        organizer_contact: activeEvent.organizer_contact || '',
        organizer_role: activeEvent.organizer_role || '',
        organizer_logo: activeEvent.organizer_logo || '',
        status: activeEvent.status || 'draft'
      });
      if (res.success) {
        setModalOpen(false);
        setActiveEvent(null);
        setIsDirty(false);
        toast.success(activeEvent.id ? 'Đã cập nhật sự kiện thành công.' : 'Đã tạo sự kiện mới thành công.');
        window.location.reload();
      } else {
        setFormError(res.error || 'Không thể lưu sự kiện.');
      }
    });
  };

  const handleArchive = (id: number) => {
    setConfirmState({
      isOpen: true, title: 'Lưu trữ sự kiện', type: 'danger',
      message: 'Bạn có chắc chắn muốn lưu trữ sự kiện này?',
      onConfirm: () => {
        setConfirmState((prev) => ({ ...prev, isOpen: false }));
        startTransition(async () => {
          const res = await deleteEvent(id);
          if (res.success) {
            setEvents((prev) => prev.filter((e) => e.id !== id));
            toast.success('Đã lưu trữ sự kiện.');
          } else {
            toast.error('Lỗi: ' + res.error);
          }
        });
      }
    });
  };

  const handleCloseModal = useCallback(() => {
    if (isDirty) {
      const confirmed = window.confirm('Bạn có thay đổi chưa lưu. Bạn có chắc muốn đóng?');
      if (!confirmed) return;
    }
    setModalOpen(false);
    setActiveEvent(null);
    setFormError('');
    setIsDirty(false);
  }, [isDirty]);

  const set = (key: string, value: any) => { setActiveEvent((prev) => prev ? { ...prev, [key]: value } : null); setIsDirty(true); };

  const inputCls = "w-full px-3 py-2 rounded-[3px] border border-slate-200 text-caption-responsive font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-colors";

  const renderJsonList = (label: string, items: string[], onChange: (v: string[]) => void, placeholder?: string) => (
    <div className="flex flex-col gap-2">
      <label className="text-caption-responsive font-bold text-slate-600 uppercase tracking-wider">{label}</label>
      {items.map((item, i) => (
        <div key={i} className="flex gap-2 items-center">
          <span className="text-caption-responsive text-slate-400 font-medium w-5 text-center shrink-0">{i + 1}.</span>
          <input type="text" value={item} onChange={(e) => { const n = [...items]; n[i] = e.target.value; onChange(n); }}
            placeholder={placeholder}
            className={cn(inputCls, 'flex-1')} />
          <button type="button" onClick={() => onChange(items.filter((_, j) => j !== i))}
            className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-[3px] transition-colors shrink-0" title="Xóa"><X className="h-3.5 w-3.5" /></button>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...items, ''])}
        className="self-start text-caption-responsive font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 mt-1 px-2 py-1 rounded-[3px] hover:bg-blue-50 transition-colors">
        <Plus className="h-3.5 w-3.5" /> Thêm mục
      </button>
    </div>
  );

  const renderSpeakers = (label: string, items: any[], onChange: (v: any[]) => void) => (
    <div className="flex flex-col gap-3">
      <label className="text-caption-responsive font-bold text-slate-600 uppercase tracking-wider">{label}</label>
      {items.length === 0 && (
        <p className="text-caption-responsive text-slate-400 italic py-3 text-center border border-dashed border-slate-200 rounded-[3px]">
          Chưa có {label.toLowerCase()} nào. Nhấn nút bên dưới để thêm.
        </p>
      )}
      {items.map((s, i) => (
        <div key={i} className="border border-slate-200 rounded-[3px] bg-white shadow-xs overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              {s.avatar ? (
                <div className="h-7 w-7 rounded-full border border-slate-200 overflow-hidden bg-white shrink-0">
                  <img src={resolveImageUrl(s.avatar) || s.avatar} alt="" className="h-full w-full object-cover" />
                </div>
              ) : (
                <div className="h-7 w-7 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                  <Users className="h-3.5 w-3.5 text-slate-400" />
                </div>
              )}
              <span className="text-caption-responsive font-bold text-slate-600">
                {s.name || `${label} ${i + 1}`}
                {s.title && <span className="font-normal text-slate-400 ml-1.5">— {s.title}</span>}
              </span>
            </div>
            <button type="button" onClick={() => onChange(items.filter((_, j) => j !== i))}
              className="p-1 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-[3px] transition-colors" title="Xóa">
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="p-4 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-slate-500">Họ và tên *</label>
                <input type="text" value={s.name || ''} placeholder="VD: Ông Nguyễn Văn A" onChange={(e) => { const n = [...items]; n[i] = { ...n[i], name: e.target.value }; onChange(n); }}
                  className={inputCls} />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-slate-500">Chức vụ</label>
                <input type="text" value={s.title || ''} placeholder="VD: Trưởng nhóm kỹ thuật" onChange={(e) => { const n = [...items]; n[i] = { ...n[i], title: e.target.value }; onChange(n); }}
                  className={inputCls} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-slate-500">Công ty / Tổ chức</label>
                <input type="text" value={s.company || ''} placeholder="VD: ULink Industries" onChange={(e) => { const n = [...items]; n[i] = { ...n[i], company: e.target.value }; onChange(n); }}
                  className={inputCls} />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-slate-500">Ảnh đại diện</label>
                <div className="flex items-center gap-2">
                  {s.avatar && (
                    <div className="relative h-10 w-10 rounded-full border border-slate-200 overflow-hidden bg-slate-100 shrink-0">
                      <img src={resolveImageUrl(s.avatar) || s.avatar} alt="" className="h-full w-full object-cover" />
                    </div>
                  )}
                  <input type="text" value={s.avatar || ''} placeholder="VD: /images/speakers/photo.png" onChange={(e) => { const n = [...items]; n[i] = { ...n[i], avatar: e.target.value }; onChange(n); }}
                    className={cn(inputCls, 'flex-1')} />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-semibold text-slate-500">Giới thiệu ngắn</label>
              <textarea rows={2} value={s.bio || ''} placeholder="Mô tả kinh nghiệm, chuyên môn..." onChange={(e) => { const n = [...items]; n[i] = { ...n[i], bio: e.target.value }; onChange(n); }}
                className={cn(inputCls, 'resize-none')} />
            </div>
          </div>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...items, { name: '', title: '', company: '', bio: '', avatar: '' }])}
        className="self-start text-caption-responsive font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 mt-1 px-3 py-1.5 rounded-[3px] hover:bg-blue-50 border border-blue-200 transition-colors">
        <Plus className="h-3.5 w-3.5" /> Thêm {label.toLowerCase()}
      </button>
    </div>
  );

  const renderAgenda = (items: any[], onChange: (v: any[]) => void) => (
    <div className="flex flex-col gap-3">
      <label className="text-caption-responsive font-bold text-slate-600 uppercase tracking-wider">Lịch trình chương trình</label>
      {items.length === 0 && (
        <p className="text-caption-responsive text-slate-400 italic py-3 text-center border border-dashed border-slate-200 rounded-[3px]">
          Chưa có mục lịch trình nào.
        </p>
      )}
      {items.map((a, i) => (
        <div key={i} className="border border-slate-200 rounded-[3px] bg-white shadow-xs overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-slate-50 border-b border-slate-100">
            <span className="text-caption-responsive font-bold text-slate-600">
              {a.time ? <span className="text-blue-600 font-mono">{a.time}</span> : `Mục ${i + 1}`}
              {a.title && <span className="font-normal text-slate-400 ml-2">— {a.title}</span>}
            </span>
            <button type="button" onClick={() => onChange(items.filter((_, j) => j !== i))}
              className="p-1 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-[3px] transition-colors" title="Xóa">
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="p-4 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-slate-500">Thời gian</label>
                <input type="text" value={a.time || ''} placeholder="VD: 09:00 - 09:30" onChange={(e) => { const n = [...items]; n[i] = { ...n[i], time: e.target.value }; onChange(n); }}
                  className={cn(inputCls, 'font-mono')} />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-slate-500">Tiêu đề phần trình bày</label>
                <input type="text" value={a.title || ''} placeholder="VD: Giới thiệu công nghệ phòng sạch" onChange={(e) => { const n = [...items]; n[i] = { ...n[i], title: e.target.value }; onChange(n); }}
                  className={inputCls} />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-semibold text-slate-500">Mô tả chi tiết</label>
              <textarea rows={2} value={a.description || ''} placeholder="Nội dung chính của phần này..." onChange={(e) => { const n = [...items]; n[i] = { ...n[i], description: e.target.value }; onChange(n); }}
                className={cn(inputCls, 'resize-none')} />
            </div>
          </div>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...items, { time: '', title: '', description: '' }])}
        className="self-start text-caption-responsive font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 mt-1 px-3 py-1.5 rounded-[3px] hover:bg-blue-50 border border-blue-200 transition-colors">
        <Plus className="h-3.5 w-3.5" /> Thêm mục lịch trình
      </button>
    </div>
  );

  return (
    <div className="admin-page">
      <div className="admin-header border-b border-slate-100 pb-6 mb-6 md:mb-8">
        <div>
          <span className="text-caption-responsive uppercase text-slate-400 font-bold tracking-wider">Hệ thống CMS</span>
          <h1 className="text-section-title font-bold text-primary tracking-tight mt-1">Quản lý Sự kiện</h1>
          <p className="text-caption-responsive text-slate-500 font-medium mt-1">Tạo và quản lý các sự kiện, hội thảo, workshop.</p>
        </div>
        <div className="admin-button-group">
          <Link href="/" className="admin-button admin-button-secondary"><Home className="h-4 w-4 text-blue-600" />Về Trang chủ</Link>
          <button onClick={openNew} className="admin-button admin-button-primary"><Plus className="h-4 w-4" />Tạo sự kiện mới</button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-3 bg-rose-50 border border-rose-200 rounded-[3px] text-rose-800 text-caption-responsive font-semibold flex items-start gap-2.5">
          <AlertTriangle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <div className="bg-white border border-slate-100 rounded-[3px] p-4 sm:p-5 shadow-sm mb-6">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm sự kiện..."
            className="w-full pl-10 pr-4 py-2.5 rounded-[3px] border border-slate-200 text-caption-responsive font-medium focus:outline-none focus:ring-1 focus:ring-blue-600" />
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-[3px] shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <CalendarDays className="h-12 w-12 text-slate-300 mb-3" />
            <span className="text-body-regular font-bold text-primary">Chưa có sự kiện nào</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {filtered.map((ev) => (
              <div key={ev.id} className="border border-slate-100 rounded-[3px] overflow-hidden shadow-sm bg-white hover:border-slate-200 transition-colors flex flex-col">
                {ev.image && <img src={resolveImageUrl(ev.image) || ev.image} alt={ev.title} className="w-full h-40 object-cover bg-slate-50 border-b border-slate-100" />}
                <div className="p-4 flex-1 flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-[3px] text-caption-responsive font-bold border shadow-sm',
                      ev.status === 'published' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100')}>
                      <span className={cn('h-1 w-1 rounded-[3px]', ev.status === 'published' ? 'bg-emerald-500' : 'bg-amber-500')} />
                      {ev.status === 'published' ? 'Công khai' : 'Nháp'}
                    </span>
                    <span className={cn('inline-flex items-center px-2 py-0.5 rounded-[3px] text-caption-responsive font-bold border',
                      ev.registration_status === 'UPCOMING' ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-slate-50 text-slate-600 border-slate-200')}>
                      {ev.registration_status === 'UPCOMING' ? 'Sắp diễn ra' : ev.registration_status === 'OPEN' ? 'Mở đăng ký' : ev.registration_status === 'CLOSED' ? 'Đã đóng' : ev.registration_status === 'COMPLETED' ? 'Đã kết thúc' : ev.registration_status}
                    </span>
                  </div>
                  <h3 className="font-bold text-primary text-body-regular line-clamp-2 leading-snug mt-1">{ev.title}</h3>
                  <div className="flex flex-col gap-1 mt-1 text-caption-responsive text-slate-500">
                    {ev.date && <span className="flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" />{ev.date} {ev.time}</span>}
                    {ev.location && <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{ev.location_name || ev.location}</span>}
                    {ev.speakers?.length > 0 && <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{ev.speakers.length} diễn giả</span>}
                  </div>
                  <div className="flex justify-end gap-1.5 mt-auto pt-3 border-t border-slate-100">
                    <button onClick={() => openEdit(ev)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-[3px] hover:bg-slate-50 text-slate-600 text-caption-responsive font-bold border border-slate-200">
                      <Edit className="h-3.5 w-3.5" />Sửa
                    </button>
                    <button onClick={() => handleArchive(ev.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-[3px] hover:bg-rose-50 text-rose-600 text-caption-responsive font-bold border border-rose-100/50">
                      <Trash className="h-3.5 w-3.5" />Lưu trữ
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {modalOpen && activeEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="my-8 w-full max-w-4xl bg-white rounded-[3px] shadow-xl overflow-hidden border border-slate-100">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="text-body-regular font-bold text-primary flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-blue-500" />
                {activeEvent.id ? 'Cập nhật sự kiện' : 'Tạo sự kiện mới'}
              </h2>
              <button onClick={handleCloseModal} className="p-1.5 rounded-[3px] hover:bg-slate-100 text-slate-400">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex border-b border-slate-100 px-6 bg-slate-50/50 gap-4">
              {(['basic', 'content', 'people'] as FormTab[]).map((tab) => (
                <button key={tab} type="button" onClick={() => setFormTab(tab)}
                  className={cn('px-4 py-3 text-caption-responsive font-bold border-b-2 transition-all flex items-center gap-1.5',
                    formTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700')}>
                  {tab === 'basic' && <><CalendarDays className="h-4 w-4" />Thông tin cơ bản</>}
                  {tab === 'content' && <><Clock className="h-4 w-4" />Nội dung & Lịch trình</>}
                  {tab === 'people' && <><Users className="h-4 w-4" />Diễn giả & Nhà tài trợ</>}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col max-h-[70vh] overflow-hidden">
              <div className="p-6 overflow-y-auto flex-1">
                {formError && (
                  <div className="p-3 bg-rose-50 border border-rose-100 rounded-[3px] text-caption-responsive font-bold text-rose-600 flex items-center gap-2 mb-5">
                    <AlertTriangle className="h-4 w-4" />{formError}
                  </div>
                )}

                {formTab === 'basic' && (
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-caption-responsive font-bold text-slate-450 uppercase tracking-wider">Tiêu đề sự kiện *</label>
                      <input type="text" required value={activeEvent.title || ''} onChange={(e) => {
                        const title = e.target.value;
                        const slug = activeEvent.id ? activeEvent.slug : title.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[đĐ]/g, 'd').replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '');
                        set('title', title); if (!activeEvent.id) set('slug', slug);
                      }} placeholder="Nhập tiêu đề sự kiện..."
                        className="w-full px-4 py-2.5 rounded-[3px] border border-slate-200 text-body-regular font-bold text-primary focus:outline-none focus:ring-1 focus:ring-brand" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-caption-responsive font-bold text-slate-450 uppercase tracking-wider">Đường dẫn sự kiện *</label>
                        <input type="text" required readOnly value={activeEvent.slug || ''} className="w-full px-4 py-2 rounded-[3px] border border-slate-200 text-caption-responsive font-mono text-slate-450 bg-slate-50 cursor-not-allowed" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-caption-responsive font-bold text-slate-450 uppercase tracking-wider">Trạng thái</label>
                        <select value={activeEvent.status || 'draft'} onChange={(e) => set('status', e.target.value)}
                          className="w-full px-4 py-2 rounded-[3px] border border-slate-200 text-caption-responsive font-bold bg-white">
                          <option value="draft">Bản nháp</option>
                          <option value="published">Công khai</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-caption-responsive font-bold text-slate-450 uppercase tracking-wider">Mô tả ngắn</label>
                      <textarea rows={2} value={activeEvent.summary || ''} onChange={(e) => set('summary', e.target.value)} placeholder="Mô tả ngắn về sự kiện..."
                        className="w-full px-4 py-2 rounded-[3px] border border-slate-200 text-caption-responsive font-medium focus:outline-none focus:ring-1 focus:ring-brand leading-relaxed" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-caption-responsive font-bold text-slate-450 uppercase tracking-wider">Ngày</label>
                        <input type="date" value={activeEvent.date || ''} onChange={(e) => set('date', e.target.value)} placeholder="Chọn ngày sự kiện"
                          className="w-full px-4 py-2 rounded-[3px] border border-slate-200 text-caption-responsive font-medium focus:outline-none focus:ring-1 focus:ring-brand" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-caption-responsive font-bold text-slate-450 uppercase tracking-wider">Thời gian hiển thị</label>
                        <input type="text" value={activeEvent.time || ''} onChange={(e) => set('time', e.target.value)} placeholder="VD: 09:00 - 17:00"
                          className="w-full px-4 py-2 rounded-[3px] border border-slate-200 text-caption-responsive font-medium focus:outline-none focus:ring-1 focus:ring-brand" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-caption-responsive font-bold text-slate-450 uppercase tracking-wider">Giờ bắt đầu</label>
                        <input type="time" value={activeEvent.start_time || ''} onChange={(e) => set('start_time', e.target.value)} placeholder="Chọn giờ"
                          className="w-full px-4 py-2 rounded-[3px] border border-slate-200 text-caption-responsive font-medium focus:outline-none focus:ring-1 focus:ring-brand" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-caption-responsive font-bold text-slate-450 uppercase tracking-wider">Giờ kết thúc</label>
                        <input type="time" value={activeEvent.end_time || ''} onChange={(e) => set('end_time', e.target.value)} placeholder="Chọn giờ"
                          className="w-full px-4 py-2 rounded-[3px] border border-slate-200 text-caption-responsive font-medium focus:outline-none focus:ring-1 focus:ring-brand" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-caption-responsive font-bold text-slate-450 uppercase tracking-wider">Tên địa điểm</label>
                        <input type="text" value={activeEvent.location_name || ''} onChange={(e) => set('location_name', e.target.value)} placeholder="VD: Khách sạn ABC"
                          className="w-full px-4 py-2 rounded-[3px] border border-slate-200 text-caption-responsive font-medium focus:outline-none focus:ring-1 focus:ring-brand" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-caption-responsive font-bold text-slate-450 uppercase tracking-wider">Địa chỉ</label>
                        <input type="text" value={activeEvent.address || ''} onChange={(e) => set('address', e.target.value)} placeholder="Địa chỉ chi tiết..."
                          className="w-full px-4 py-2 rounded-[3px] border border-slate-200 text-caption-responsive font-medium focus:outline-none focus:ring-1 focus:ring-brand" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-caption-responsive font-bold text-slate-450 uppercase tracking-wider">Trạng thái đăng ký</label>
                        <select value={activeEvent.registration_status || 'UPCOMING'} onChange={(e) => set('registration_status', e.target.value)}
                          className="w-full px-4 py-2 rounded-[3px] border border-slate-200 text-caption-responsive font-bold bg-white">
                          <option value="UPCOMING">Sắp diễn ra</option>
                          <option value="OPEN">Đang mở đăng ký</option>
                          <option value="CLOSED">Đã đóng</option>
                          <option value="COMPLETED">Đã kết thúc</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-caption-responsive font-bold text-slate-450 uppercase tracking-wider">Giá vé</label>
                        <input type="text" value={activeEvent.price || ''} onChange={(e) => set('price', e.target.value)} placeholder="VD: 500.000 VNĐ hoặc Miễn phí"
                          className="w-full px-4 py-2 rounded-[3px] border border-slate-200 text-caption-responsive font-medium focus:outline-none focus:ring-1 focus:ring-brand" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5 col-span-full">
                      <label className="text-caption-responsive font-bold text-slate-450 uppercase tracking-wider">Ảnh bìa sự kiện</label>
                      <div className="flex items-start gap-4">
                        {activeEvent.image && (
                          <div className="relative h-24 w-40 rounded-[3px] border border-slate-200 overflow-hidden bg-slate-50 shrink-0">
                            <img src={resolveImageUrl(activeEvent.image) || activeEvent.image} alt="Preview" className="h-full w-full object-cover" />
                            <button type="button" onClick={() => set('image', null)}
                              className="absolute top-1 right-1 p-1 rounded-[3px] bg-black/70 hover:bg-black/90 text-white" title="Xóa ảnh">
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        )}
                        <div className="flex flex-col gap-2">
                          <input type="file" accept="image/*" ref={fileInputRef} onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            setIsUploading(true);
                            try {
                              const formData = new FormData();
                              formData.append('file', file);
                              const res = await uploadImage(formData);
                              if (res.success && res.id) { set('image', res.id); }
                              else { setFormError('Upload ảnh thất bại: ' + res.error); }
                            } catch (err) { setFormError('Lỗi upload: ' + String(err)); }
                            finally { setIsUploading(false); }
                          }} className="hidden" />
                          <button type="button" disabled={isUploading} onClick={() => fileInputRef.current?.click()}
                            className="inline-flex h-9 items-center gap-1.5 px-4 rounded-[3px] border border-slate-200 text-caption-responsive font-bold text-primary hover:bg-slate-50 bg-white shadow-sm disabled:opacity-50">
                            <Upload className="h-3.5 w-3.5 text-slate-400" />
                            {isUploading ? 'Đang tải lên...' : activeEvent.image ? 'Thay đổi ảnh' : 'Chọn ảnh bìa'}
                          </button>
                          <span className="text-[11px] text-slate-400">Khuyến nghị tỷ lệ 16:9</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {formTab === 'content' && (
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-caption-responsive font-bold text-slate-450 uppercase tracking-wider">Tổng quan sự kiện</label>
                      <textarea rows={4} value={activeEvent.overview || ''} onChange={(e) => set('overview', e.target.value)} placeholder="Mô tả chi tiết về sự kiện..."
                        className="w-full px-4 py-2.5 rounded-[3px] border border-slate-200 text-caption-responsive font-medium focus:outline-none focus:ring-1 focus:ring-brand leading-relaxed" />
                    </div>

                    {renderJsonList('Điểm nổi bật', activeEvent.highlights || [], (v) => set('highlights', v), 'VD: Networking với 200+ doanh nghiệp')}
                    {renderAgenda(activeEvent.agenda || [], (v) => set('agenda', v))}
                    {renderJsonList('Quyền lợi tham dự', activeEvent.benefits || [], (v) => set('benefits', v), 'VD: Tài liệu chuyên ngành miễn phí')}

                    <div className="border-t border-slate-100 pt-5">
                      <label className="text-caption-responsive font-bold text-slate-600 uppercase tracking-wider mb-4 block">Thông tin Ban tổ chức</label>
                      <div className="border border-slate-200 rounded-[3px] bg-white shadow-xs p-4 space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="flex flex-col gap-1">
                            <label className="text-[11px] font-semibold text-slate-500">Tên đơn vị tổ chức *</label>
                            <input type="text" value={activeEvent.organizer_name || ''} onChange={(e) => set('organizer_name', e.target.value)} placeholder="VD: ULink Industries"
                              className={inputCls} />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-[11px] font-semibold text-slate-500">Email liên hệ</label>
                            <input type="text" value={activeEvent.organizer_contact || ''} onChange={(e) => set('organizer_contact', e.target.value)} placeholder="VD: events@ulink.com"
                              className={inputCls} />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="flex flex-col gap-1">
                            <label className="text-[11px] font-semibold text-slate-500">Vai trò</label>
                            <input type="text" value={activeEvent.organizer_role || ''} onChange={(e) => set('organizer_role', e.target.value)} placeholder="VD: Đơn vị tổ chức chính"
                              className={inputCls} />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-[11px] font-semibold text-slate-500">Logo đơn vị</label>
                            <div className="flex items-center gap-2">
                              {activeEvent.organizer_logo && (
                                <div className="relative h-10 w-10 rounded-[3px] border border-slate-200 overflow-hidden bg-white shrink-0 p-0.5">
                                  <img src={resolveImageUrl(activeEvent.organizer_logo) || activeEvent.organizer_logo} alt="" className="h-full w-full object-contain" />
                                </div>
                              )}
                              <input type="text" value={activeEvent.organizer_logo || ''} onChange={(e) => set('organizer_logo', e.target.value)} placeholder="VD: /images/logo/ulink.png"
                                className={cn(inputCls, 'flex-1')} />
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[11px] font-semibold text-slate-500">Mô tả đơn vị</label>
                          <textarea rows={2} value={activeEvent.organizer_description || ''} onChange={(e) => set('organizer_description', e.target.value)} placeholder="Giới thiệu ngắn về đơn vị tổ chức..."
                            className={cn(inputCls, 'resize-none')} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {formTab === 'people' && (
                  <div className="flex flex-col gap-5">
                    {renderSpeakers('Diễn giả', activeEvent.speakers || [], (v) => set('speakers', v))}
                    {renderSpeakers('Host / MC', activeEvent.hosts || [], (v) => set('hosts', v))}
                    {renderJsonList('Nhà tài trợ', activeEvent.sponsors || [], (v) => set('sponsors', v), 'VD: Công ty ABC')}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50/50">
                <button type="button" onClick={handleCloseModal}
                  className="px-5 py-2.5 rounded-[3px] border border-slate-200 text-caption-responsive font-bold text-slate-550 hover:bg-slate-100">Hủy bỏ</button>
                <button type="submit" disabled={isPending}
                  className="px-5 py-2.5 rounded-[3px] bg-blue-600 text-caption-responsive font-bold text-white shadow-sm hover:bg-blue-700 disabled:opacity-50">
                  {isPending ? 'Đang lưu...' : 'Lưu sự kiện'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal isOpen={confirmState.isOpen} title={confirmState.title} message={confirmState.message}
        type={confirmState.type} onConfirm={confirmState.onConfirm} onCancel={() => setConfirmState((prev) => ({ ...prev, isOpen: false }))} />
    </div>
  );
}
