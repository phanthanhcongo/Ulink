'use client';

/* eslint-disable @next/next/no-img-element, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */

import React, { useState, useTransition, useRef, useCallback } from 'react';
import toast from 'react-hot-toast';
import {
  Plus,
  Search,
  Edit,
  Trash,
  FileText,
  X,
  AlertTriangle,
  Upload,
  Image as ImageIcon,
  Globe,
  Calendar,
  User,
  Home
} from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { ConfirmModal } from './confirm-modal';
import { RichTextEditor } from './rich-text-editor';
import { getDirectusUrlClient } from '@/lib/directus-runtime.mjs';
import { getTranslatedField } from '@/lib/i18n-content';
import { resolveImageUrl } from '@/lib/image-url';
import { saveArticle, deleteArticle, uploadImage } from '@/app/[locale]/admin/articles/actions';

interface Translation {
  id?: number;
  languages_code: string;
  title: string;
  description?: string | null;
  body?: string | null;
  badge?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
}

interface Article {
  id: number;
  status: 'published' | 'draft' | 'archived';
  slug: string;
  cover?: string | null;
  author?: string | null;
  author_role?: string | null;
  author_avatar?: string | null;
  category?: string | null;
  industry?: number | null;
  badge?: string | null;
  published_at?: string | null;
  is_featured?: boolean;
  translations?: Translation[];
}

interface IndustryTranslation {
  languages_code: string;
  name?: string | null;
}

interface Industry {
  id: number;
  slug: string;
  translations?: IndustryTranslation[];
}

const SUPPORTED_LANGS = [
  { code: 'vi', label: 'Tiếng Việt', flag: '\u{1F1FB}\u{1F1F3}' },
  { code: 'en', label: 'English', flag: '\u{1F1EC}\u{1F1E7}' },
  { code: 'ja', label: '日本語', flag: '\u{1F1EF}\u{1F1F5}' },
] as const;

interface TranslationDraft {
  title: string;
  description: string;
  body: string;
  badge: string;
  meta_title: string;
  meta_description: string;
}

const EMPTY_DRAFT: TranslationDraft = {
  title: '',
  description: '',
  body: '',
  badge: '',
  meta_title: '',
  meta_description: ''
};

interface ArticlesClientProps {
  initialArticles: Article[];
  industries?: Industry[];
  locale: string;
  directusUrl?: string;
  error?: string;
}

export function ArticlesClient({
  initialArticles,
  industries = [],
  locale,
  directusUrl = getDirectusUrlClient(),
  error
}: ArticlesClientProps) {
  // Resolve an industry's display name for the current locale (fallback vi/en).
  const industryName = useCallback(
    (ind: Industry) => {
      const trs = ind.translations || [];
      const byLoc = (l: string) => trs.find((t) => t.languages_code === l)?.name;
      return byLoc(locale) || byLoc('vi') || byLoc('en') || ind.slug;
    },
    [locale]
  );
  const industryById = useCallback(
    (id?: number | null) => (id == null ? undefined : industries.find((i) => i.id === id)),
    [industries]
  );
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPending, startTransition] = useTransition();

  // Modals state
  const [modalOpen, setModalOpen] = useState(false);
  const [activeArticle, setActiveArticle] = useState<
    | (Partial<Article> & {
        title: string;
        description: string;
        body: string;
        meta_title: string;
        meta_description: string;
      })
    | null
  >(null);
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

  // Upload state
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isUploading, setIsUploading] = useState(false);
  const [activeFormTab, setActiveFormTab] = useState<'content' | 'seo'>('content');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [industryFilter, setIndustryFilter] = useState<'all' | number>('all');
  const [isDirty, setIsDirty] = useState(false);
  const initialArticleRef = useRef<string>('');

  const [editLocale, setEditLocale] = useState(locale);
  const [translationDrafts, setTranslationDrafts] = useState<Record<string, TranslationDraft>>({});

  const currentDraft = translationDrafts[editLocale] || EMPTY_DRAFT;
  const updateCurrentDraft = useCallback((patch: Partial<TranslationDraft>) => {
    setTranslationDrafts(prev => ({
      ...prev,
      [editLocale]: { ...(prev[editLocale] || EMPTY_DRAFT), ...patch }
    }));
    setIsDirty(true);
  }, [editLocale]);

  const handleCloseModal = useCallback(() => {
    if (isDirty) {
      const confirmed = window.confirm('Bạn có thay đổi chưa lưu. Bạn có chắc muốn đóng?');
      if (!confirmed) return;
    }
    setModalOpen(false);
    setActiveArticle(null);
    setFormError('');
    setIsDirty(false);
  }, [isDirty]);

  const trackChange = useCallback(() => {
    setIsDirty(true);
  }, []);

  // Filter articles by search query, status and industry
  const filteredArticles = articles.filter((art) => {
    if (statusFilter !== 'all' && art.status !== statusFilter) return false;
    if (industryFilter !== 'all' && art.industry !== industryFilter) return false;
    const title = getTranslatedField(art, 'title', locale).toLowerCase();
    const author = (art.author || '').toLowerCase();
    const q = searchQuery.toLowerCase();
    return title.includes(q) || author.includes(q);
  });

  // Handle upload cover image
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await uploadImage(formData);
      if (res.success && res.id) {
        setActiveArticle((prev) => (prev ? { ...prev, cover: res.id } : null));
        setFormError('');
      } else {
        setFormError('Upload ảnh thất bại: ' + res.error);
      }
    } catch (err) {
      setFormError('Đã xảy ra lỗi khi upload: ' + String(err));
    } finally {
      setIsUploading(false);
    }
  };

  // Submit Save Article — saves all non-empty translation drafts
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    const primaryDraft = translationDrafts[locale];
    if (!primaryDraft?.title?.trim() || !activeArticle?.slug) {
      setFormError('Vui lòng nhập tiêu đề bài viết (ngôn ngữ chính).');
      return;
    }

    startTransition(async () => {
      let lastError = '';
      let savedCount = 0;

      const localesToSave = Object.entries(translationDrafts).filter(
        ([, draft]) => draft.title.trim().length > 0
      );

      for (const [langCode, draft] of localesToSave) {
        const res = await saveArticle({
          id: activeArticle.id,
          title: draft.title,
          description: draft.description || '',
          slug: activeArticle.slug || '',
          body: draft.body || '',
          cover: activeArticle.cover,
          author: activeArticle.author || undefined,
          author_role: activeArticle.author_role || undefined,
          author_avatar: activeArticle.author_avatar || undefined,
          category: activeArticle.category || undefined,
          industry: activeArticle.industry ?? null,
          badge: draft.badge || '',
          published_at: activeArticle.published_at || null,
          status: activeArticle.status || 'draft',
          is_featured: !!activeArticle.is_featured,
          meta_title: draft.meta_title || '',
          meta_description: draft.meta_description || '',
          locale: langCode
        });

        if (res.success) {
          savedCount++;
        } else {
          lastError = res.error || '';
        }
      }

      if (savedCount > 0 && !lastError) {
        setModalOpen(false);
        setActiveArticle(null);
        setFormError('');
        setIsDirty(false);
        const langNames = localesToSave.map(([code]) => SUPPORTED_LANGS.find(l => l.code === code)?.label || code).join(', ');
        toast.success(
          activeArticle.id
            ? `Đã cập nhật bài viết thành công (${langNames}).`
            : `Đã tạo bài viết mới thành công (${langNames}).`
        );
        window.location.reload();
      } else {
        setFormError(lastError || 'Không thể lưu bài viết. Vui lòng thử lại.');
      }
    });
  };

  // Handle Archive Article (Soft Delete)
  const handleArchiveArticle = (id: number) => {
    setConfirmState({
      isOpen: true,
      title: 'Lưu trữ bài viết',
      message: 'Bạn có chắc chắn muốn lưu trữ bài viết này? Bài viết sẽ ẩn khỏi trang tài nguyên.',
      type: 'danger',
      onConfirm: () => {
        setConfirmState((prev) => ({ ...prev, isOpen: false }));
        startTransition(async () => {
          const res = await deleteArticle(id);
          if (res.success) {
            setArticles((prev) => prev.filter((a) => a.id !== id));
            toast.success('Đã lưu trữ bài viết thành công.');
          } else {
            toast.error('Không thể lưu trữ bài viết: ' + res.error);
          }
        });
      }
    });
  };

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="admin-header border-b border-slate-100 pb-6 mb-6 md:mb-8">
        <div>
          <span className="text-caption-responsive uppercase text-slate-400 font-bold tracking-wider">
            Hệ thống CMS
          </span>
          <h1 className="text-section-title font-bold text-primary tracking-tight mt-1">
            Quản lý Bài viết & Tin tức
          </h1>
          <p className="text-caption-responsive text-slate-500 font-medium mt-1 leading-relaxed">
            Viết và biên tập các bài blog chia sẻ kiến thức phòng sạch, cẩm nang tĩnh điện và tin
            tức thị trường B2B.
          </p>
        </div>

        <div className="admin-button-group">
          <Link
            href="/"
            className="admin-button admin-button-secondary"
          >
            <Home className="h-4 w-4 text-blue-600" />
            Về Trang chủ
          </Link>
          <button
            onClick={() => {
              setActiveArticle({
                status: 'draft',
                title: '',
                description: '',
                body: '',
                slug: '',
                author: '',
                author_role: '',
                author_avatar: null,
                category: '',
                industry: null,
                badge: '',
                published_at: new Date().toISOString().substring(0, 16),
                meta_title: '',
                meta_description: '',
                cover: null
              });
              setTranslationDrafts({ vi: { ...EMPTY_DRAFT }, en: { ...EMPTY_DRAFT }, ja: { ...EMPTY_DRAFT } });
              setEditLocale(locale);
              setModalOpen(true);
              setFormError('');
              setIsDirty(false);
              setActiveFormTab('content');
            }}
            className="admin-button admin-button-primary"
          >
            <Plus className="h-4 w-4" />
            Viết bài mới
          </button>
        </div>
      </div>

      {/* Error Alert Banner */}
      {error && (
        <div className="mb-6 p-3 sm:p-4 bg-rose-50 border border-rose-200 rounded-[3px] text-rose-800 text-caption-responsive font-semibold flex items-start gap-2.5 shadow-sm">
          <AlertTriangle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <span className="font-bold text-rose-900 block">
              Không thể tải dữ liệu bài viết
            </span>
            <span className="text-rose-700 text-caption-responsive mt-1 block">
              {error}
            </span>
          </div>
        </div>
      )}

      {/* Search & Filter */}
      <div className="bg-white border border-slate-100 rounded-[3px] p-4 sm:p-5 md:p-6 shadow-sm mb-6 md:mb-8">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm bài viết theo tiêu đề, tác giả..."
              className="w-full pl-10 pr-4 py-2.5 rounded-[3px] border border-slate-200 text-caption-responsive font-medium focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
            />
          </div>
          <div className="flex items-center gap-1 bg-slate-50 rounded-[3px] p-1 border border-slate-100">
            {([['all', 'Tất cả'], ['published', 'Công khai'], ['draft', 'Bản nháp']] as const).map(([val, label]) => (
              <button
                key={val}
                type="button"
                onClick={() => setStatusFilter(val)}
                className={cn(
                  'px-3 py-1.5 rounded-[3px] text-caption-responsive font-bold transition-all',
                  statusFilter === val
                    ? 'bg-white text-blue-600 shadow-sm border border-slate-200'
                    : 'text-slate-500 hover:text-slate-700'
                )}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Industry filter */}
          {industries.length > 0 && (
            <select
              value={industryFilter === 'all' ? 'all' : String(industryFilter)}
              onChange={(e) =>
                setIndustryFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))
              }
              className="px-3 py-2 rounded-[3px] border border-slate-200 bg-white text-caption-responsive font-bold text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-600 shadow-sm"
            >
              <option value="all">Tất cả ngành</option>
              {industries.map((ind) => (
                <option key={ind.id} value={String(ind.id)}>
                  {industryName(ind)}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Articles List */}
      <div className="bg-white border border-slate-100 rounded-[3px] shadow-sm overflow-hidden">
        {filteredArticles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 sm:py-16 px-4 text-center">
            <FileText className="h-12 w-12 text-slate-300 mb-3" />
            <span className="text-body-regular font-bold text-primary">Chưa có bài viết nào</span>
            <span className="text-caption-responsive text-slate-400 mt-1">
              Nhấp vào nút Viết bài mới ở trên để đăng tải nội dung đầu tiên.
            </span>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block admin-table-wrapper">
              <table className="admin-table min-w-[900px]">
                <thead>
                  <tr className="admin-table-head">
                    <th className="admin-table-cell admin-table-cell-sticky">Bài viết</th>
                    <th className="admin-table-cell">Tác giả</th>
                    <th className="admin-table-cell">Ngày xuất bản</th>
                    <th className="admin-table-cell">Trạng thái</th>
                    <th className="px-6 py-3.5 text-right sticky right-0 bg-slate-50 z-10 shadow-[-2px_0_5px_rgba(0,0,0,0.05)]">Hành động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-caption-responsive text-slate-700">
                  {filteredArticles.map((art) => {
                    const title = getTranslatedField(art, 'title', locale);
                    const coverUrl = art.cover
                      ? resolveImageUrl(art.cover)
                      : null;
                    const publishDate = art.published_at
                      ? new Date(art.published_at).toLocaleDateString(
                          locale === 'vi' ? 'vi-VN' : 'en-US',
                          {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          }
                        )
                      : 'Chưa đặt';

                    return (
                      <tr key={art.id} className="hover:bg-slate-50/30 transition-colors group">
                        {/* Cover & Title */}
                        <td className="px-6 py-4 sticky left-0 bg-white group-hover:bg-slate-50/80 transition-colors shadow-[2px_0_5px_rgba(0,0,0,0.03)] z-10">
                          <div className="flex items-center gap-3">
                            {coverUrl ? (
                              <img
                                src={coverUrl}
                                alt={title}
                                className="h-10 w-16 object-cover rounded-[3px] border border-slate-100 bg-slate-50 shrink-0"
                              />
                            ) : (
                              <div className="h-10 w-16 rounded-[3px] bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                                <ImageIcon className="h-4 w-4" />
                              </div>
                            )}
                            <div className="flex flex-col">
                              <span className="font-bold text-primary line-clamp-1 leading-tight">
                                {title}
                              </span>
                              <span className="text-caption-responsive text-slate-400 font-mono mt-1 select-all">
                                /{art.slug}
                              </span>
                              {(() => {
                                const ind = industryById(art.industry);
                                return ind ? (
                                  <span className="inline-flex w-fit items-center gap-1 mt-1.5 px-2 py-0.5 rounded-[3px] bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-100 uppercase tracking-wide">
                                    {industryName(ind)}
                                  </span>
                                ) : null;
                              })()}
                            </div>
                          </div>
                        </td>

                        {/* Author */}
                        <td className="px-6 py-4 text-slate-500 font-medium">
                          {art.author || 'ULink Team'}
                        </td>

                        {/* Published At */}
                        <td className="px-6 py-4 text-slate-500 font-medium">{publishDate}</td>

                        {/* Status */}
                        <td className="px-6 py-4">
                          <span
                            className={cn(
                              'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[3px] text-caption-responsive font-bold border shadow-sm select-none',
                              art.status === 'published'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                                : 'bg-amber-50 text-amber-700 border-amber-100'
                            )}
                          >
                            <span
                              className={cn(
                                'h-1.5 w-1.5 rounded-[3px] shrink-0',
                                art.status === 'published' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                              )}
                            />
                            <span>{art.status === 'published' ? 'Công khai' : 'Bản nháp'}</span>
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 text-right sticky right-0 bg-white group-hover:bg-slate-50/80 transition-colors shadow-[-2px_0_5px_rgba(0,0,0,0.03)] z-10">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => {
                                const drafts: Record<string, TranslationDraft> = {};
                                for (const lang of SUPPORTED_LANGS) {
                                  drafts[lang.code] = {
                                    title: getTranslatedField(art, 'title', lang.code),
                                    description: getTranslatedField(art, 'description', lang.code),
                                    body: getTranslatedField(art, 'body', lang.code),
                                    badge: getTranslatedField(art, 'badge', lang.code),
                                    meta_title: getTranslatedField(art, 'meta_title', lang.code),
                                    meta_description: getTranslatedField(art, 'meta_description', lang.code),
                                  };
                                }
                                const primary = drafts[locale];
                                setActiveArticle({
                                  id: art.id,
                                  slug: art.slug,
                                  status: art.status,
                                  cover: art.cover,
                                  author: art.author,
                                  author_role: art.author_role,
                                  author_avatar: art.author_avatar,
                                  category: art.category,
                                  industry: art.industry ?? null,
                                  badge: art.badge,
                                  is_featured: !!art.is_featured,
                                  published_at: art.published_at
                                    ? new Date(art.published_at).toISOString().substring(0, 16)
                                    : null,
                                  title: primary.title,
                                  description: primary.description,
                                  body: primary.body,
                                  meta_title: primary.meta_title,
                                  meta_description: primary.meta_description
                                });
                                setTranslationDrafts(drafts);
                                setEditLocale(locale);
                                setModalOpen(true);
                                setFormError('');
                                setIsDirty(false);
                              }}
                              className="p-1.5 rounded-[3px] hover:bg-slate-100 text-slate-400 hover:text-blue-600 transition-colors"
                              title="Sửa bài viết"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleArchiveArticle(art.id)}
                              className="p-1.5 rounded-[3px] hover:bg-slate-100 text-slate-400 hover:text-rose-600 transition-colors"
                              title="Lưu trữ (Xóa)"
                            >
                              <Trash className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Card Grid View */}
            <div className="md:hidden grid grid-cols-1 gap-4 p-4 bg-slate-50/30">
              {filteredArticles.map((art) => {
                const title = getTranslatedField(art, 'title', locale);
                const coverUrl = art.cover
                  ? resolveImageUrl(art.cover)
                  : null;
                const publishDate = art.published_at
                  ? new Date(art.published_at).toLocaleDateString(
                      locale === 'vi' ? 'vi-VN' : 'en-US',
                      {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      }
                    )
                  : 'Chưa đặt';

                return (
                  <div key={art.id} className="border border-slate-100 rounded-[3px] overflow-hidden shadow-sm bg-white hover:border-slate-200 transition-colors flex flex-col">
                    {coverUrl ? (
                      <img src={coverUrl} alt={title} className="w-full h-36 object-cover bg-slate-50 border-b border-slate-100" />
                    ) : (
                      <div className="w-full h-36 bg-slate-50 flex items-center justify-center border-b border-slate-100 text-slate-400">
                        <ImageIcon className="h-6 w-6" />
                      </div>
                    )}
                    <div className="p-4 flex-1 flex flex-col gap-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className={cn(
                          'inline-flex items-center gap-1 px-2 py-0.5 rounded-[3px] text-caption-responsive font-bold border shadow-sm select-none',
                          art.status === 'published'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                            : 'bg-amber-50 text-amber-700 border-amber-100'
                        )}>
                          <span className={cn('h-1 w-1 rounded-[3px]', art.status === 'published' ? 'bg-emerald-500' : 'bg-amber-500')} />
                          {art.status === 'published' ? 'Công khai' : 'Nháp'}
                        </span>
                        <span className="text-caption-responsive text-slate-400 font-mono select-all">/{art.slug}</span>
                      </div>
                      <h3 className="font-bold text-primary text-body-regular line-clamp-2 leading-snug mt-1">
                        {title}
                      </h3>
                      {(() => {
                        const ind = industryById(art.industry);
                        return ind ? (
                          <span className="inline-flex w-fit items-center gap-1 px-2 py-0.5 rounded-[3px] bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-100 uppercase tracking-wide">
                            {industryName(ind)}
                          </span>
                        ) : null;
                      })()}
                      <div className="flex items-center justify-between gap-4 mt-auto pt-3 border-t border-slate-50 text-caption-responsive text-slate-500 font-medium">
                        <span className="flex items-center gap-1">
                          <User className="h-3.5 w-3.5 text-slate-400" />
                          {art.author || 'ULink Team'}
                        </span>
                        <span className="flex items-center gap-1 font-mono">
                          <Calendar className="h-3.5 w-3.5 text-slate-400" />
                          {publishDate}
                        </span>
                      </div>
                      <div className="flex justify-end gap-1.5 mt-3 pt-2 border-t border-slate-100">
                        <button
                          onClick={() => {
                            const drafts: Record<string, TranslationDraft> = {};
                            for (const lang of SUPPORTED_LANGS) {
                              drafts[lang.code] = {
                                title: getTranslatedField(art, 'title', lang.code),
                                description: getTranslatedField(art, 'description', lang.code),
                                body: getTranslatedField(art, 'body', lang.code),
                                badge: getTranslatedField(art, 'badge', lang.code),
                                meta_title: getTranslatedField(art, 'meta_title', lang.code),
                                meta_description: getTranslatedField(art, 'meta_description', lang.code),
                              };
                            }
                            const primary = drafts[locale];
                            setActiveArticle({
                              id: art.id,
                              slug: art.slug,
                              status: art.status,
                              cover: art.cover,
                              author: art.author,
                              author_role: art.author_role,
                              author_avatar: art.author_avatar,
                              category: art.category,
                              industry: art.industry ?? null,
                              badge: art.badge,
                              published_at: art.published_at
                                ? new Date(art.published_at).toISOString().substring(0, 16)
                                : null,
                              title: primary.title,
                              description: primary.description,
                              body: primary.body,
                              meta_title: primary.meta_title,
                              meta_description: primary.meta_description
                            });
                            setTranslationDrafts(drafts);
                            setEditLocale(locale);
                            setModalOpen(true);
                            setFormError('');
                            setIsDirty(false);
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-[3px] hover:bg-slate-50 text-slate-655 text-caption-responsive font-bold transition-colors border border-slate-200"
                        >
                          <Edit className="h-3.5 w-3.5" />
                          Sửa
                        </button>
                        <button
                          onClick={() => handleArchiveArticle(art.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-[3px] hover:bg-rose-50 text-rose-600 text-caption-responsive font-bold transition-colors border border-rose-100/50"
                        >
                          <Trash className="h-3.5 w-3.5" />
                          Lưu trữ
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Modal: Write or Edit Article */}
      {modalOpen && activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm overflow-y-auto animate-fade-in">
          <div className="my-8 w-full max-w-4xl bg-white rounded-[3px] shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-250 border border-slate-100">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div>
                <h2 className="text-body-regular font-bold text-primary flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-500" />
                  {activeArticle.id ? 'Cập nhật bài viết' : 'Soạn bài viết mới'}
                </h2>
                <p className="text-caption-responsive text-slate-400 font-medium mt-0.5">
                  Viết nội dung bài viết, thêm ảnh bìa và tùy chỉnh hiển thị trên Google.
                </p>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-1.5 rounded-[3px] hover:bg-slate-150 text-slate-400 hover:text-slate-650 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center gap-2 px-6 py-2.5 bg-slate-50 border-b border-slate-100">
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
                    {hasContent && editLocale !== lang.code && (
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    )}
                    {!hasContent && editLocale !== lang.code && (
                      <span className="text-[10px] text-slate-300">trống</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-slate-100 px-6 bg-slate-50/50 gap-4">
              <button
                type="button"
                onClick={() => setActiveFormTab('content')}
                className={cn(
                  'px-4 py-3 text-caption-responsive font-bold border-b-2 transition-all flex items-center gap-1.5 focus:outline-none',
                  activeFormTab === 'content'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                )}
              >
                <FileText className="h-4 w-4" />
                Nội dung bài viết
              </button>
              <button
                type="button"
                onClick={() => setActiveFormTab('seo')}
                className={cn(
                  'px-4 py-3 text-caption-responsive font-bold border-b-2 transition-all flex items-center gap-1.5 focus:outline-none',
                  activeFormTab === 'seo'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                )}
              >
                <Globe className="h-4 w-4" />
                Ảnh bìa & Tìm kiếm Google
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col max-h-[70vh] overflow-hidden">
              <div className="p-6 overflow-y-auto flex-1 bg-white">
                {formError && (
                  <div className="p-3 bg-rose-50 border border-rose-100 rounded-[3px] text-caption-responsive font-bold text-rose-600 flex items-center gap-2 animate-in fade-in duration-200 mb-5">
                    <AlertTriangle className="h-4 w-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}
                {/* Tab 1: Content fields */}
                {activeFormTab === 'content' && (
                  <div className="flex flex-col gap-5">
                    {/* Title */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-caption-responsive font-bold text-slate-450 uppercase tracking-wider">
                        Tiêu đề bài viết *
                      </label>
                      <input
                        type="text"
                        required
                        value={currentDraft.title}
                        onChange={(e) => {
                          const title = e.target.value;
                          updateCurrentDraft({ title });
                          if (!activeArticle.id && editLocale === locale) {
                            const slug = title
                                .toLowerCase()
                                .normalize('NFD')
                                .replace(/[̀-ͯ]/g, '')
                                .replace(/[đĐ]/g, 'd')
                                .replace(/[^a-z0-9\s-]/g, '')
                                .replace(/\s+/g, '-')
                                .replace(/-+/g, '-')
                                .replace(/^-+|-+$/g, '');
                            setActiveArticle((prev) => prev ? { ...prev, slug } : null);
                          }
                        }}
                        placeholder="Nhập tiêu đề bài viết..."
                        className="w-full px-4 py-2.5 rounded-[3px] border border-slate-200 text-body-regular font-bold text-primary focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand shadow-sm"
                      />
                    </div>

                    {/* Grid: Slug, Author */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Slug */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-caption-responsive font-bold text-slate-450 uppercase tracking-wider">
                          Đường dẫn bài viết *
                        </label>
                        <input
                          type="text"
                          required
                          value={activeArticle.slug || ''}
                          onChange={(e) => setActiveArticle((prev) => prev ? { ...prev, slug: e.target.value } : null)}
                          placeholder="Tự động tạo từ tiêu đề..."
                          className="w-full px-4 py-2 rounded-[3px] border border-slate-200 text-caption-responsive font-mono text-slate-600 focus:outline-none focus:ring-1 focus:ring-brand"
                        />
                      </div>

                      {/* Author */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-caption-responsive font-bold text-slate-450 uppercase tracking-wider flex items-center gap-1">
                          <User className="h-3 w-3 text-slate-400" />
                          Tác giả
                        </label>
                        <input
                          type="text"
                          value={activeArticle.author || ''}
                          onChange={(e) =>
                            setActiveArticle({ ...activeArticle, author: e.target.value })
                          }
                          placeholder="ULink Team"
                          className="w-full px-4 py-2 rounded-[3px] border border-slate-200 text-caption-responsive font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand"
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-caption-responsive font-bold text-slate-450 uppercase tracking-wider">
                        Mô tả ngắn (Hiển thị dưới tiêu đề)
                      </label>
                      <textarea
                        rows={2}
                        value={currentDraft.description}
                        onChange={(e) => updateCurrentDraft({ description: e.target.value })}
                        placeholder="Mô tả ngắn gọn nội dung bài viết, hiển thị ở trang chi tiết..."
                        className="w-full px-4 py-2 rounded-[3px] border border-slate-200 text-caption-responsive font-medium focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand leading-relaxed"
                      />
                    </div>

                    {/* Industry link + Badge (for /industries case cards) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Industry */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-caption-responsive font-bold text-slate-450 uppercase tracking-wider">
                          Ngành áp dụng
                        </label>
                        <select
                          value={activeArticle.industry != null ? String(activeArticle.industry) : ''}
                          onChange={(e) => {
                            setActiveArticle({
                              ...activeArticle,
                              industry: e.target.value ? Number(e.target.value) : null
                            });
                            trackChange();
                          }}
                          className="w-full px-4 py-2 rounded-[3px] border border-slate-200 text-caption-responsive font-bold text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand bg-white shadow-sm"
                        >
                          <option value="">— Không gắn ngành —</option>
                          {industries.map((ind) => (
                            <option key={ind.id} value={String(ind.id)}>
                              {industryName(ind)}
                            </option>
                          ))}
                        </select>
                        <span className="text-[10px] text-slate-400 font-medium">
                          Gắn ngành để bài hiện thành thẻ &quot;Trường hợp áp dụng&quot; trên trang ngành.
                        </span>
                      </div>

                      {/* Badge (per-language) */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-caption-responsive font-bold text-slate-450 uppercase tracking-wider flex items-center gap-1.5">
                          Nhãn nổi bật (Badge)
                          <span className="text-[10px] text-blue-500 normal-case">{editLocale.toUpperCase()}</span>
                        </label>
                        <input
                          type="text"
                          value={currentDraft.badge}
                          onChange={(e) => updateCurrentDraft({ badge: e.target.value })}
                          placeholder="VD: Giảm 32% lỗi, Xuất khẩu EU..."
                          className="w-full px-4 py-2 rounded-[3px] border border-slate-200 text-caption-responsive font-bold text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand"
                        />
                        <span className="text-[10px] text-slate-400 font-medium">
                          Hiển thị trên thẻ case; nhập riêng cho từng ngôn ngữ.
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Category */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-caption-responsive font-bold text-slate-450 uppercase tracking-wider">
                          Danh mục
                        </label>
                        <input
                          type="text"
                          list="article-category-list"
                          value={activeArticle.category || ''}
                          onChange={(e) =>
                            setActiveArticle({ ...activeArticle, category: e.target.value })
                          }
                          placeholder="Chọn hoặc nhập danh mục..."
                          className="w-full px-4 py-2 rounded-[3px] border border-slate-200 text-caption-responsive font-bold text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand bg-white shadow-sm"
                        />
                        <datalist id="article-category-list">
                          <option value="Tin tức" />
                          <option value="Catalogue" />
                          <option value="Tài liệu kỹ thuật" />
                          <option value="Hướng dẫn" />
                          <option value="Nghiên cứu điển hình" />
                          <option value="Sự kiện" />
                          <option value="Khu công nghiệp" />
                        </datalist>
                      </div>

                      {/* Author Role */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-caption-responsive font-bold text-slate-450 uppercase tracking-wider">
                          Chức vụ tác giả
                        </label>
                        <input
                          type="text"
                          value={activeArticle.author_role || ''}
                          onChange={(e) =>
                            setActiveArticle({ ...activeArticle, author_role: e.target.value })
                          }
                          placeholder="VD: Trưởng phòng Đóng gói"
                          className="w-full px-4 py-2 rounded-[3px] border border-slate-200 text-caption-responsive font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand"
                        />
                      </div>

                      {/* Author Avatar */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-caption-responsive font-bold text-slate-450 uppercase tracking-wider">
                          Ảnh tác giả
                        </label>
                        <div className="flex items-center gap-2">
                          {activeArticle.author_avatar && (
                            <img
                              src={resolveImageUrl(activeArticle.author_avatar) || ''}
                              alt="Avatar"
                              className="h-8 w-8 rounded-full object-cover border border-slate-200"
                            />
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              const formData = new FormData();
                              formData.append('file', file);
                              const res = await uploadImage(formData);
                              if (res.success && res.id) {
                                setActiveArticle((prev) => prev ? { ...prev, author_avatar: res.id } : null);
                              }
                            }}
                            className="w-full text-caption-responsive file:mr-2 file:py-1 file:px-3 file:rounded-[3px] file:border file:border-slate-200 file:text-caption-responsive file:font-bold file:bg-white file:text-slate-600 hover:file:bg-slate-50"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Status */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-caption-responsive font-bold text-slate-450 uppercase tracking-wider">
                          Trạng thái phát hành
                        </label>
                        <select
                          value={activeArticle.status || 'draft'}
                          onChange={(e) =>
                            setActiveArticle({
                              ...activeArticle,
                              status: e.target.value as 'draft' | 'published'
                            })
                          }
                          className="w-full px-4 py-2 rounded-[3px] border border-slate-200 text-caption-responsive font-bold text-slate-700 focus:outline-none bg-white shadow-sm"
                        >
                          <option value="draft">Bản nháp</option>
                          <option value="published">Công khai</option>
                        </select>
                      </div>

                      {/* Published At */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-caption-responsive font-bold text-slate-450 uppercase tracking-wider flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-slate-400" />
                          Ngày hiển thị
                        </label>
                        <input
                          type="datetime-local"
                          value={activeArticle.published_at || ''}
                          onChange={(e) =>
                            setActiveArticle({ ...activeArticle, published_at: e.target.value })
                          }
                          className="w-full px-4 py-2 rounded-[3px] border border-slate-200 text-caption-responsive font-semibold text-slate-650 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand bg-white"
                        />
                      </div>
                    </div>

                    {/* Featured */}
                    <div className="flex items-start gap-2.5 p-3 rounded-[3px] border border-slate-200 bg-slate-50/50">
                      <input
                        type="checkbox"
                        id="is_featured"
                        checked={!!activeArticle.is_featured}
                        onChange={(e) =>
                          setActiveArticle({ ...activeArticle, is_featured: e.target.checked })
                        }
                        className="mt-0.5 h-4 w-4 accent-brand rounded-[3px] cursor-pointer"
                      />
                      <label htmlFor="is_featured" className="cursor-pointer">
                        <span className="text-caption-responsive font-bold text-slate-700 block">
                          Bài xem nhiều
                        </span>
                        <span className="text-caption-responsive text-slate-500 block mt-0.5">
                          Tick để hiển thị ở section &quot;Bài xem nhiều&quot; ở trang Resources.
                        </span>
                      </label>
                    </div>

                    {/* Body — Rich Text Editor */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-caption-responsive font-bold text-slate-450 uppercase tracking-wider">
                        Nội dung bài viết
                      </label>
                      <RichTextEditor
                        value={currentDraft.body}
                        onChange={(html) => updateCurrentDraft({ body: html })}
                        placeholder="Soạn thảo nội dung bài viết..."
                      />
                    </div>
                  </div>
                )}

                {/* Tab 2: Image & SEO fields */}
                {activeFormTab === 'seo' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    {/* Left side: Cover Image upload */}
                    <div className="flex flex-col gap-4">
                      <label className="text-caption-responsive font-bold text-slate-450 uppercase tracking-wider">
                        Ảnh bìa bài viết
                      </label>

                      <div className="border-2 border-dashed border-slate-200 rounded-[3px] p-6 flex flex-col items-center justify-center text-center bg-slate-50/20 hover:bg-slate-50/50 transition-colors">
                        {activeArticle.cover ? (
                          <div className="relative w-full aspect-[16/10] rounded-[3px] overflow-hidden border border-slate-100 shadow-md bg-slate-100 mb-4 animate-fade-in">
                            <img
                              src={resolveImageUrl(activeArticle.cover) || '/images/banners/login-hero.webp'}
                              alt="Cover preview"
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => setActiveArticle({ ...activeArticle, cover: null })}
                              className="absolute top-3 right-3 p-1.5 rounded-[3px] bg-black/70 hover:bg-black/90 text-white transition-colors shadow"
                              title="Xóa ảnh"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="py-8">
                            <div className="h-12 w-12 rounded-[3px] bg-slate-100 flex items-center justify-center mx-auto mb-3">
                              <ImageIcon className="h-6 w-6 text-slate-400" />
                            </div>
                            <span className="text-caption-responsive font-bold text-primary">
                              Tải lên hình ảnh đại diện
                            </span>
                            <span className="text-caption-responsive text-slate-400 block mt-1">
                              Khuyến nghị kích thước tỷ lệ 16:9 (ví dụ: 1200x675px)
                            </span>
                          </div>
                        )}

                        <input
                          type="file"
                          accept="image/*"
                          ref={fileInputRef}
                          onChange={handleFileUpload}
                          className="hidden"
                        />

                        <button
                          type="button"
                          disabled={isUploading}
                          onClick={() => fileInputRef.current?.click()}
                          className="inline-flex h-9 items-center justify-center gap-1.5 px-4 rounded-[3px] border border-slate-200 text-caption-responsive font-bold text-primary hover:bg-slate-50 transition-all shadow-sm bg-white hover:border-slate-350 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Upload className="h-3.5 w-3.5 text-slate-400" />
                          {isUploading
                            ? 'Đang tải lên...'
                            : activeArticle.cover
                              ? 'Thay đổi hình ảnh'
                              : 'Chọn hình ảnh từ máy'}
                        </button>
                      </div>
                    </div>

                    {/* Right side: Meta settings */}
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-1.5 pb-2 border-b border-slate-100 mb-2">
                        <Globe className="h-4 w-4 text-blue-500" />
                        <h3 className="text-caption-responsive font-bold text-primary uppercase tracking-wider">
                          Hiển thị trên Google
                        </h3>
                      </div>

                      {/* Meta Title */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-caption-responsive font-bold text-slate-450 uppercase tracking-wider">
                          Tiêu đề hiển thị trên Google
                        </label>
                        <input
                          type="text"
                          value={currentDraft.meta_title}
                          onChange={(e) => updateCurrentDraft({ meta_title: e.target.value })}
                          placeholder="Tiêu đề người dùng thấy khi tìm trên Google (50-60 ký tự)..."
                          className="w-full px-4 py-2.5 rounded-[3px] border border-slate-200 text-caption-responsive font-semibold focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand"
                        />
                      </div>

                      {/* Meta Description */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-caption-responsive font-bold text-slate-450 uppercase tracking-wider">
                          Mô tả hiển thị trên Google
                        </label>
                        <textarea
                          rows={4}
                          value={currentDraft.meta_description}
                          onChange={(e) => updateCurrentDraft({ meta_description: e.target.value })}
                          placeholder="Mô tả ngắn hiển thị dưới tiêu đề trên Google (150-160 ký tự)..."
                          className="w-full px-4 py-2.5 rounded-[3px] border border-slate-200 text-caption-responsive font-semibold focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand leading-relaxed"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50/50">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-5 py-2.5 rounded-[3px] border border-slate-200 text-caption-responsive font-bold text-slate-550 hover:bg-slate-100 transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={isPending || isUploading}
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-[3px] bg-blue-600 text-caption-responsive font-bold text-white shadow-sm hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isPending ? 'Đang lưu...' : 'Lưu bài viết'}
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
