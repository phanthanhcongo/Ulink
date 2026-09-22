'use client';

/* eslint-disable @next/next/no-img-element, @typescript-eslint/no-explicit-any */

import React, { useState, useTransition, useCallback } from 'react';
import toast from 'react-hot-toast';
import {
  Plus, Search, Edit, Trash, CalendarDays, X, AlertTriangle,
  MapPin, Clock, Home, Users
} from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { ConfirmModal } from './confirm-modal';
import { saveEvent, deleteEvent, uploadEventImage } from '@/app/[locale]/admin/events/actions';
import { resolveImageUrl } from '@/lib/image-url';
import { getTranslatedField } from '@/lib/i18n-content';

interface EventTranslation {
  id?: number;
  languages_code: string;
  title?: string | null;
  summary?: string | null;
  overview?: string | null;
  location_name?: string | null;
  address?: string | null;
  price?: string | null;
  organizer_description?: string | null;
  organizer_role?: string | null;
  organizer_name?: string | null;
  highlights?: string[] | null;
  agenda?: any[] | null;
  speakers?: any[] | null;
  hosts?: any[] | null;
  benefits?: string[] | null;
}

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
  translations?: EventTranslation[];
}

interface Props {
  initialEvents: EventRecord[];
  error?: string;
  locale: string;
}

type FormTab = 'basic' | 'content' | 'people';

const SUPPORTED_LANGS = [
  { code: 'vi', label: 'Tiếng Việt', flag: '\u{1F1FB}\u{1F1F3}' },
  { code: 'en', label: 'English', flag: '\u{1F1EC}\u{1F1E7}' },
  { code: 'ja', label: '日本語', flag: '\u{1F1EF}\u{1F1F5}' },
] as const;

interface TranslationDraft {
  title: string;
  summary: string;
  overview: string;
  location_name: string;
  address: string;
  price: string;
  organizer_description: string;
  organizer_role: string;
  organizer_name: string;
  highlights: string[];
  agenda: any[];
  speakers: any[];
  hosts: any[];
  benefits: string[];
}

const emptyDraft = (): TranslationDraft => ({
  title: '', summary: '', overview: '',
  location_name: '', address: '', price: '',
  organizer_description: '', organizer_role: '',
  organizer_name: '',
  highlights: [], agenda: [], speakers: [], hosts: [], benefits: []
});

export function EventsAdminClient({ initialEvents, error, locale }: Props) {
  const [events, setEvents] = useState<EventRecord[]>(initialEvents);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPending, startTransition] = useTransition();
  const [modalOpen, setModalOpen] = useState(false);
  const [activeEvent, setActiveEvent] = useState<Partial<EventRecord> | null>(null);
  const [formError, setFormError] = useState('');
  const [formTab, setFormTab] = useState<FormTab>('basic');
  const [editLocale, setEditLocale] = useState(locale);
  const [translationDrafts, setTranslationDrafts] = useState<Record<string, TranslationDraft>>({});
  const [confirmState, setConfirmState] = useState<{
    isOpen: boolean; title?: string; message: string; onConfirm: () => void; type?: 'danger' | 'warning' | 'info';
  }>({ isOpen: false, message: '', onConfirm: () => {} });

  const currentDraft = translationDrafts[editLocale] || emptyDraft();
  const updateDraft = useCallback((patch: Partial<TranslationDraft>) => {
    setTranslationDrafts((prev) => ({
      ...prev,
      [editLocale]: { ...(prev[editLocale] || emptyDraft()), ...patch }
    }));
  }, [editLocale]);

  const filtered = events.filter((ev) => {
    const q = searchQuery.toLowerCase();
    const title = getTranslatedField(ev, 'title', locale) || ev.title || '';
    return title.toLowerCase().includes(q) || (ev.slug || '').toLowerCase().includes(q) || (ev.location || '').toLowerCase().includes(q);
  });

  const openNew = () => {
    setActiveEvent({
      status: 'draft', slug: '', image: null,
      date: '', time: '', start_time: '', end_time: '',
      location: '',
      registration_status: 'UPCOMING',
      sponsors: [],
      organizer_contact: 'contact@ulinkindustries.com', organizer_logo: '/images/logo/image.png'
    });
    const viDraft = emptyDraft();
    viDraft.organizer_name = 'ULink Industries';
    setTranslationDrafts({ vi: viDraft, en: emptyDraft(), ja: emptyDraft() });
    setEditLocale(locale);
    setModalOpen(true);
    setFormError('');
    setFormTab('basic');
  };

  const openEdit = (ev: EventRecord) => {
    setActiveEvent({ ...ev });
    const drafts: Record<string, TranslationDraft> = {};
    for (const lang of SUPPORTED_LANGS) {
      const row = ev.translations?.find((t) => t.languages_code === lang.code);
      drafts[lang.code] = {
        title: row?.title ?? (lang.code === 'vi' ? (ev.title || '') : ''),
        summary: row?.summary ?? (lang.code === 'vi' ? (ev.summary || '') : ''),
        overview: row?.overview ?? (lang.code === 'vi' ? (ev.overview || '') : ''),
        location_name: row?.location_name ?? (lang.code === 'vi' ? (ev.location_name || '') : ''),
        address: row?.address ?? (lang.code === 'vi' ? (ev.address || '') : ''),
        price: row?.price ?? (lang.code === 'vi' ? (ev.price || '') : ''),
        organizer_description: row?.organizer_description ?? (lang.code === 'vi' ? (ev.organizer_description || '') : ''),
        organizer_role: row?.organizer_role ?? (lang.code === 'vi' ? (ev.organizer_role || '') : ''),
        organizer_name: row?.organizer_name ?? (lang.code === 'vi' ? (ev.organizer_name || '') : ''),
        highlights: (row?.highlights as string[] | null) ?? (lang.code === 'vi' ? (ev.highlights || []) : []),
        agenda: (row?.agenda as any[] | null) ?? (lang.code === 'vi' ? (ev.agenda || []) : []),
        speakers: (row?.speakers as any[] | null) ?? (lang.code === 'vi' ? (ev.speakers || []) : []),
        hosts: (row?.hosts as any[] | null) ?? (lang.code === 'vi' ? (ev.hosts || []) : []),
        benefits: (row?.benefits as string[] | null) ?? (lang.code === 'vi' ? (ev.benefits || []) : []),
      };
    }
    setTranslationDrafts(drafts);
    setEditLocale(locale);
    setModalOpen(true);
    setFormError('');
    setFormTab('basic');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const primaryDraft = translationDrafts[locale];
    if (!primaryDraft?.title?.trim() || !activeEvent?.slug) {
      setFormError('Vui lòng nhập tiêu đề (ngôn ngữ chính) và slug.');
      return;
    }

    const localesToSave = Object.entries(translationDrafts).filter(([, d]) => d.title.trim().length > 0);

    startTransition(async () => {
      let lastError = '';
      let savedCount = 0;

      for (const [langCode, draft] of localesToSave) {
        const res = await saveEvent({
          id: activeEvent.id,
          title: draft.title,
          slug: activeEvent.slug || '',
          summary: draft.summary,
          image: activeEvent.image,
          date: activeEvent.date || '',
          time: activeEvent.time || '',
          start_time: activeEvent.start_time || '',
          end_time: activeEvent.end_time || '',
          location: activeEvent.location || '',
          location_name: draft.location_name,
          address: draft.address,
          registration_status: activeEvent.registration_status || 'UPCOMING',
          price: draft.price,
          overview: draft.overview,
          highlights: draft.highlights || [],
          agenda: draft.agenda || [],
          speakers: draft.speakers || [],
          hosts: draft.hosts || [],
          sponsors: activeEvent.sponsors || [],
          benefits: draft.benefits || [],
          organizer_name: draft.organizer_name || '',
          organizer_description: draft.organizer_description,
          organizer_contact: activeEvent.organizer_contact || '',
          organizer_role: draft.organizer_role,
          organizer_logo: activeEvent.organizer_logo || '',
          status: activeEvent.status || 'draft',
          locale: langCode,
        });
        if (res.success) savedCount++;
        else lastError = res.error || '';
      }

      if (savedCount > 0 && !lastError) {
        setModalOpen(false);
        setActiveEvent(null);
        const langNames = localesToSave.map(([c]) => SUPPORTED_LANGS.find((l) => l.code === c)?.label || c).join(', ');
        toast.success(`Đã lưu sự kiện (${langNames}).`);
        window.location.reload();
      } else {
        setFormError(lastError || 'Không thể lưu sự kiện.');
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

  const set = (key: string, value: any) => setActiveEvent((prev) => prev ? { ...prev, [key]: value } : null);

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
          Chưa có {label.toLowerCase()} nào.
        </p>
      )}
      {items.map((s, i) => (
        <div key={i} className="border border-slate-200 rounded-[3px] bg-white shadow-xs overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 border-b border-slate-100">
            <span className="text-caption-responsive font-bold text-slate-600">{s.name || `${label} ${i + 1}`}</span>
            <button type="button" onClick={() => onChange(items.filter((_, j) => j !== i))}
              className="p-1 text-slate-400 hover:text-rose-500 rounded-[3px]"><X className="h-3.5 w-3.5" /></button>
          </div>
          <div className="p-4 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input type="text" value={s.name || ''} placeholder="Họ và tên" onChange={(e) => { const n = [...items]; n[i] = { ...n[i], name: e.target.value }; onChange(n); }} className={inputCls} />
              <input type="text" value={s.title || ''} placeholder="Chức vụ" onChange={(e) => { const n = [...items]; n[i] = { ...n[i], title: e.target.value }; onChange(n); }} className={inputCls} />
              <input type="text" value={s.company || ''} placeholder="Công ty" onChange={(e) => { const n = [...items]; n[i] = { ...n[i], company: e.target.value }; onChange(n); }} className={inputCls} />
              <input type="text" value={s.avatar || ''} placeholder="Ảnh đại diện (URL)" onChange={(e) => { const n = [...items]; n[i] = { ...n[i], avatar: e.target.value }; onChange(n); }} className={inputCls} />
            </div>
            <textarea rows={2} value={s.bio || ''} placeholder="Giới thiệu" onChange={(e) => { const n = [...items]; n[i] = { ...n[i], bio: e.target.value }; onChange(n); }} className={cn(inputCls, 'resize-none')} />
          </div>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...items, { name: '', title: '', company: '', bio: '', avatar: '' }])}
        className="self-start text-caption-responsive font-bold text-blue-600 flex items-center gap-1.5 mt-1 px-3 py-1.5 rounded-[3px] hover:bg-blue-50 border border-blue-200">
        <Plus className="h-3.5 w-3.5" /> Thêm {label.toLowerCase()}
      </button>
    </div>
  );

  const renderAgenda = (items: any[], onChange: (v: any[]) => void) => (
    <div className="flex flex-col gap-3">
      <label className="text-caption-responsive font-bold text-slate-600 uppercase tracking-wider">Lịch trình chương trình</label>
      {items.map((a, i) => (
        <div key={i} className="border border-slate-200 rounded-[3px] bg-white p-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-3">
            <input type="text" value={a.time || ''} placeholder="09:00 - 09:30" onChange={(e) => { const n = [...items]; n[i] = { ...n[i], time: e.target.value }; onChange(n); }} className={cn(inputCls, 'font-mono')} />
            <input type="text" value={a.title || ''} placeholder="Tiêu đề phần" onChange={(e) => { const n = [...items]; n[i] = { ...n[i], title: e.target.value }; onChange(n); }} className={inputCls} />
          </div>
          <textarea rows={2} value={a.description || ''} placeholder="Mô tả" onChange={(e) => { const n = [...items]; n[i] = { ...n[i], description: e.target.value }; onChange(n); }} className={cn(inputCls, 'resize-none')} />
          <button type="button" onClick={() => onChange(items.filter((_, j) => j !== i))} className="text-caption-responsive text-rose-500 hover:text-rose-700">Xóa mục</button>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...items, { time: '', title: '', description: '' }])}
        className="self-start text-caption-responsive font-bold text-blue-600 flex items-center gap-1.5 mt-1 px-3 py-1.5 rounded-[3px] hover:bg-blue-50 border border-blue-200">
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
          <p className="text-caption-responsive text-slate-500 font-medium mt-1">Tạo và quản lý các sự kiện, hội thảo, workshop (đa ngôn ngữ).</p>
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
            {filtered.map((ev) => {
              const displayTitle = getTranslatedField(ev, 'title', locale) || ev.title;
              const displayLocName = getTranslatedField(ev, 'location_name', locale) || ev.location_name || '';
              return (
                <div key={ev.id} className="border border-slate-100 rounded-[3px] overflow-hidden shadow-sm bg-white hover:border-slate-200 transition-colors flex flex-col">
                  {ev.image && <img src={resolveImageUrl(ev.image) || ev.image} alt={displayTitle} className="w-full h-40 object-cover bg-slate-50 border-b border-slate-100" />}
                  <div className="p-4 flex-1 flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-[3px] text-caption-responsive font-bold border shadow-sm',
                        ev.status === 'published' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100')}>
                        <span className={cn('h-1 w-1 rounded-[3px]', ev.status === 'published' ? 'bg-emerald-500' : 'bg-amber-500')} />
                        {ev.status === 'published' ? 'Công khai' : 'Nháp'}
                      </span>
                      <div className="flex gap-1">
                        {SUPPORTED_LANGS.map((lang) => {
                          const has = ev.translations?.some((t) => t.languages_code === lang.code && (t.title || '').trim().length > 0);
                          return (
                            <span key={lang.code} title={lang.label} className={cn('text-[10px] px-1 rounded-[3px] font-bold border', has ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-slate-50 text-slate-300 border-slate-100')}>{lang.code.toUpperCase()}</span>
                          );
                        })}
                      </div>
                    </div>
                    <h3 className="font-bold text-primary text-body-regular line-clamp-2 leading-snug mt-1">{displayTitle}</h3>
                    <div className="flex flex-col gap-1 mt-1 text-caption-responsive text-slate-500">
                      {ev.date && <span className="flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" />{ev.date} {ev.time}</span>}
                      {(displayLocName || ev.location) && <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{displayLocName || ev.location}</span>}
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
              );
            })}
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
              <button onClick={() => { setModalOpen(false); setActiveEvent(null); }} className="p-1.5 rounded-[3px] hover:bg-slate-100 text-slate-400">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Language switcher */}
            <div className="flex items-center gap-2 px-6 py-2.5 bg-slate-50 border-b border-slate-100 flex-wrap">
              <span className="text-caption-responsive font-bold text-slate-400 uppercase tracking-wider mr-1">Ngôn ngữ:</span>
              {SUPPORTED_LANGS.map((lang) => {
                const draft = translationDrafts[lang.code];
                const hasContent = draft && draft.title.trim().length > 0;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => setEditLocale(lang.code)}
                    className={cn(
                      'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[3px] text-caption-responsive font-bold transition-all border',
                      editLocale === lang.code
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : hasContent
                          ? 'bg-white text-slate-700 border-slate-200 hover:border-blue-300'
                          : 'bg-white text-slate-400 border-dashed border-slate-200 hover:border-blue-300'
                    )}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                    {hasContent && editLocale !== lang.code && <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />}
                    {!hasContent && editLocale !== lang.code && <span className="text-[10px] text-slate-300">trống</span>}
                  </button>
                );
              })}
            </div>

            {editLocale !== 'vi' && (
              <div className="px-6 py-2 bg-blue-50/40 border-b border-blue-100 flex items-center justify-between gap-2">
                <span className="text-caption-responsive text-slate-500 font-medium">
                  Bạn có thể sao chép nội dung mảng (agenda, speakers, hosts, benefits, highlights, tên đơn vị) từ tiếng Việt làm điểm khởi đầu.
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const vi = translationDrafts['vi'];
                    if (!vi) return;
                    updateDraft({
                      highlights: [...(vi.highlights || [])],
                      agenda: JSON.parse(JSON.stringify(vi.agenda || [])),
                      speakers: JSON.parse(JSON.stringify(vi.speakers || [])),
                      hosts: JSON.parse(JSON.stringify(vi.hosts || [])),
                      benefits: [...(vi.benefits || [])],
                      organizer_name: vi.organizer_name || '',
                    });
                    toast.success('Đã sao chép từ tiếng Việt.');
                  }}
                  className="shrink-0 px-3 py-1.5 rounded-[3px] bg-white border border-blue-300 text-blue-600 text-caption-responsive font-bold hover:bg-blue-50"
                >
                  Sao chép từ tiếng Việt
                </button>
              </div>
            )}

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
                      <label className="text-caption-responsive font-bold text-slate-450 uppercase tracking-wider">Tiêu đề sự kiện * ({editLocale})</label>
                      <input type="text" required value={currentDraft.title} onChange={(e) => {
                        const title = e.target.value;
                        updateDraft({ title });
                        if (!activeEvent.id && editLocale === locale) {
                          const slug = title.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[đĐ]/g, 'd').replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '');
                          set('slug', slug);
                        }
                      }} placeholder="Nhập tiêu đề sự kiện..."
                        className="w-full px-4 py-2.5 rounded-[3px] border border-slate-200 text-body-regular font-bold text-primary focus:outline-none focus:ring-1 focus:ring-brand" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-caption-responsive font-bold text-slate-450 uppercase tracking-wider">Slug *</label>
                        <input type="text" required value={activeEvent.slug || ''} onChange={(e) => set('slug', e.target.value)} className="w-full px-4 py-2 rounded-[3px] border border-slate-200 text-caption-responsive font-mono text-slate-600" />
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
                      <label className="text-caption-responsive font-bold text-slate-450 uppercase tracking-wider">Mô tả ngắn ({editLocale})</label>
                      <textarea rows={2} value={currentDraft.summary} onChange={(e) => updateDraft({ summary: e.target.value })} placeholder="Mô tả ngắn..."
                        className="w-full px-4 py-2 rounded-[3px] border border-slate-200 text-caption-responsive font-medium focus:outline-none focus:ring-1 focus:ring-brand leading-relaxed" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-caption-responsive font-bold text-slate-450 uppercase tracking-wider">Ngày</label>
                        <input type="text" value={activeEvent.date || ''} onChange={(e) => set('date', e.target.value)} placeholder="VD: 15/08/2024" className="w-full px-4 py-2 rounded-[3px] border border-slate-200 text-caption-responsive font-medium" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-caption-responsive font-bold text-slate-450 uppercase tracking-wider">Thời gian hiển thị</label>
                        <input type="text" value={activeEvent.time || ''} onChange={(e) => set('time', e.target.value)} placeholder="VD: 09:00 - 17:00" className="w-full px-4 py-2 rounded-[3px] border border-slate-200 text-caption-responsive font-medium" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-caption-responsive font-bold text-slate-450 uppercase tracking-wider">Giờ bắt đầu</label>
                        <input type="text" value={activeEvent.start_time || ''} onChange={(e) => set('start_time', e.target.value)} placeholder="09:00 AM" className="w-full px-4 py-2 rounded-[3px] border border-slate-200 text-caption-responsive font-medium" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-caption-responsive font-bold text-slate-450 uppercase tracking-wider">Giờ kết thúc</label>
                        <input type="text" value={activeEvent.end_time || ''} onChange={(e) => set('end_time', e.target.value)} placeholder="17:00 PM" className="w-full px-4 py-2 rounded-[3px] border border-slate-200 text-caption-responsive font-medium" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-caption-responsive font-bold text-slate-450 uppercase tracking-wider">Tên địa điểm ({editLocale})</label>
                        <input type="text" value={currentDraft.location_name} onChange={(e) => updateDraft({ location_name: e.target.value })} placeholder="VD: Khách sạn ABC" className="w-full px-4 py-2 rounded-[3px] border border-slate-200 text-caption-responsive font-medium" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-caption-responsive font-bold text-slate-450 uppercase tracking-wider">Địa chỉ ({editLocale})</label>
                        <input type="text" value={currentDraft.address} onChange={(e) => updateDraft({ address: e.target.value })} placeholder="Địa chỉ chi tiết..." className="w-full px-4 py-2 rounded-[3px] border border-slate-200 text-caption-responsive font-medium" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                        <label className="text-caption-responsive font-bold text-slate-450 uppercase tracking-wider">Giá vé ({editLocale})</label>
                        <input type="text" value={currentDraft.price} onChange={(e) => updateDraft({ price: e.target.value })} placeholder="VD: 500.000 VNĐ hoặc Miễn phí" className="w-full px-4 py-2 rounded-[3px] border border-slate-200 text-caption-responsive font-medium" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-caption-responsive font-bold text-slate-450 uppercase tracking-wider">Ảnh bìa sự kiện</label>
                        <div className="flex items-start gap-3">
                          {activeEvent.image && (resolveImageUrl(activeEvent.image) || activeEvent.image) && (
                            <div className="relative h-20 w-32 rounded-[3px] border border-slate-200 overflow-hidden bg-slate-50 shrink-0 group">
                              <img src={resolveImageUrl(activeEvent.image) || activeEvent.image} alt="Preview" className="h-full w-full object-cover" />
                              <button type="button" onClick={() => set('image', '')} className="absolute top-1 right-1 h-5 w-5 rounded-full bg-red-500 text-white flex items-center justify-center">
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          )}
                          <input type="file" accept="image/*" onChange={async (e) => {
                            const file = e.target.files?.[0]; if (!file) return;
                            const formData = new FormData(); formData.append('file', file);
                            const res = await uploadEventImage(formData);
                            if (res.success && res.id) { set('image', res.id); toast.success('Tải ảnh lên thành công'); }
                            else toast.error(res.error || 'Tải ảnh thất bại');
                          }} className="flex-1 text-caption-responsive file:mr-2 file:py-1.5 file:px-3 file:rounded-[3px] file:border file:border-slate-200 file:text-caption-responsive file:font-bold file:bg-white file:text-slate-600 hover:file:bg-slate-50" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {formTab === 'content' && (
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-caption-responsive font-bold text-slate-450 uppercase tracking-wider">Tổng quan sự kiện ({editLocale})</label>
                      <textarea rows={6} value={currentDraft.overview} onChange={(e) => updateDraft({ overview: e.target.value })} placeholder="Mô tả chi tiết..."
                        className="w-full px-4 py-2.5 rounded-[3px] border border-slate-200 text-caption-responsive font-medium focus:outline-none focus:ring-1 focus:ring-brand leading-relaxed" />
                    </div>

                    {renderJsonList('Điểm nổi bật', currentDraft.highlights, (v) => updateDraft({ highlights: v }))}
                    {renderAgenda(currentDraft.agenda, (v) => updateDraft({ agenda: v }))}
                    {renderJsonList('Quyền lợi tham dự', currentDraft.benefits, (v) => updateDraft({ benefits: v }))}

                    <div className="border-t border-slate-100 pt-5">
                      <label className="text-caption-responsive font-bold text-slate-600 uppercase tracking-wider mb-4 block">Thông tin Ban tổ chức</label>
                      <div className="border border-slate-200 rounded-[3px] bg-white p-4 space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="flex flex-col gap-1">
                            <label className="text-[11px] font-semibold text-slate-500">Tên đơn vị * ({editLocale})</label>
                            <input type="text" value={currentDraft.organizer_name} onChange={(e) => updateDraft({ organizer_name: e.target.value })} className={inputCls} />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-[11px] font-semibold text-slate-500">Email liên hệ</label>
                            <input type="text" value={activeEvent.organizer_contact || ''} onChange={(e) => set('organizer_contact', e.target.value)} className={inputCls} />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="flex flex-col gap-1">
                            <label className="text-[11px] font-semibold text-slate-500">Vai trò ({editLocale})</label>
                            <input type="text" value={currentDraft.organizer_role} onChange={(e) => updateDraft({ organizer_role: e.target.value })} className={inputCls} />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-[11px] font-semibold text-slate-500">Logo (URL)</label>
                            <input type="text" value={activeEvent.organizer_logo || ''} onChange={(e) => set('organizer_logo', e.target.value)} className={inputCls} />
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[11px] font-semibold text-slate-500">Mô tả đơn vị ({editLocale})</label>
                          <textarea rows={2} value={currentDraft.organizer_description} onChange={(e) => updateDraft({ organizer_description: e.target.value })} className={cn(inputCls, 'resize-none')} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {formTab === 'people' && (
                  <div className="flex flex-col gap-5">
                    {renderSpeakers('Diễn giả', currentDraft.speakers, (v) => updateDraft({ speakers: v }))}
                    {renderSpeakers('Host / MC', currentDraft.hosts, (v) => updateDraft({ hosts: v }))}
                    {renderJsonList('Nhà tài trợ', activeEvent.sponsors || [], (v) => set('sponsors', v))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50/50">
                <button type="button" onClick={() => { setModalOpen(false); setActiveEvent(null); }}
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
