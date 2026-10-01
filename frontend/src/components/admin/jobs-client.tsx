'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useTransition } from 'react';
import toast from 'react-hot-toast';
import { Search, Plus, Edit2, Trash2, X, Briefcase, MapPin, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ConfirmModal } from './confirm-modal';
import { RichTextEditor } from './rich-text-editor';
import { saveJob, deleteJob, type JobFormData } from '@/app/[locale]/admin/jobs/actions';

interface JobTranslation {
  id?: number;
  languages_code: string;
  title?: string;
  summary?: string | null;
  description?: string | null;
  requirements?: string | null;
  benefits?: string | null;
}

interface JobItem {
  id: number;
  status: string;
  slug: string;
  code?: string | null;
  department?: string | null;
  location?: string | null;
  employment_type?: string | null;
  salary_range?: string | null;
  is_urgent?: boolean;
  deadline?: string | null;
  sort?: number | null;
  translations?: JobTranslation[];
}

interface JobsClientProps {
  initialJobs: JobItem[];
  locale: string;
  error?: string;
}

const DEPARTMENTS = [
  { value: 'kinh-doanh', label: 'Kinh doanh' },
  { value: 'ky-thuat', label: 'Kỹ thuật' },
  { value: 'chuoi-cung-ung', label: 'Chuỗi cung ứng' }
];

const EMPLOYMENT_TYPES = [
  { value: 'full_time', label: 'Toàn thời gian' },
  { value: 'part_time', label: 'Bán thời gian' },
  { value: 'internship', label: 'Thực tập' },
  { value: 'contract', label: 'Hợp đồng' }
];

const LOCATIONS = ['Hà Nội', 'Hà Nam'];

function labelOf(list: { value: string; label: string }[], v?: string | null) {
  return list.find((x) => x.value === v)?.label || v || '—';
}

type FormState = {
  id?: number;
  slug: string;
  code: string;
  department: string;
  location: string;
  employment_type: string;
  salary_range: string;
  is_urgent: boolean;
  deadline: string;
  sort: string;
  status: 'published' | 'draft' | 'archived';
  title: string;
  summary: string;
  description: string;
  requirements: string;
  benefits: string;
};

const EMPTY_FORM: FormState = {
  slug: '', code: '', department: DEPARTMENTS[0].value, location: LOCATIONS[0],
  employment_type: EMPLOYMENT_TYPES[0].value, salary_range: '', is_urgent: false,
  deadline: '', sort: '', status: 'published',
  title: '', summary: '', description: '', requirements: '', benefits: ''
};

export function JobsClient({ initialJobs, locale, error }: JobsClientProps) {
  const [jobs, setJobs] = useState<JobItem[]>(initialJobs);
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('all');
  const [isPending, startTransition] = useTransition();

  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [formError, setFormError] = useState('');

  const [confirmState, setConfirmState] = useState<{
    isOpen: boolean;
    message: string;
    onConfirm: () => void;
  }>({ isOpen: false, message: '', onConfirm: () => {} });

  const trOf = (j: JobItem): JobTranslation =>
    j.translations?.find((t) => t.languages_code === locale) || j.translations?.[0] || { languages_code: locale };

  const filteredJobs = jobs.filter((j) => {
    const t = trOf(j);
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      (t.title || '').toLowerCase().includes(q) || (j.code || '').toLowerCase().includes(q);
    const matchesDept = deptFilter === 'all' || j.department === deptFilter;
    return matchesSearch && matchesDept;
  });

  const openCreate = () => {
    setForm(EMPTY_FORM);
    setFormError('');
    setFormOpen(true);
  };

  const openEdit = (j: JobItem) => {
    const t = trOf(j);
    setForm({
      id: j.id,
      slug: j.slug || '',
      code: j.code || '',
      department: j.department || DEPARTMENTS[0].value,
      location: j.location || LOCATIONS[0],
      employment_type: j.employment_type || EMPLOYMENT_TYPES[0].value,
      salary_range: j.salary_range || '',
      is_urgent: !!j.is_urgent,
      deadline: j.deadline ? j.deadline.slice(0, 10) : '',
      sort: j.sort != null ? String(j.sort) : '',
      status: (j.status as any) || 'draft',
      title: t.title || '',
      summary: t.summary || '',
      description: t.description || '',
      requirements: t.requirements || '',
      benefits: t.benefits || ''
    });
    setFormError('');
    setFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.slug.trim()) {
      setFormError('Vui lòng nhập Tiêu đề và Slug.');
      return;
    }

    const payload: JobFormData = {
      id: form.id,
      slug: form.slug.trim(),
      code: form.code.trim(),
      department: form.department,
      location: form.location,
      employment_type: form.employment_type,
      salary_range: form.salary_range.trim(),
      is_urgent: form.is_urgent,
      deadline: form.deadline || null,
      sort: form.sort === '' ? null : Number(form.sort),
      status: form.status,
      title: form.title.trim(),
      summary: form.summary.trim(),
      description: form.description,
      requirements: form.requirements,
      benefits: form.benefits,
      locale
    };

    startTransition(async () => {
      const res = await saveJob(payload);
      if (res.success) {
        toast.success(form.id ? 'Đã cập nhật vị trí tuyển dụng.' : 'Đã tạo vị trí tuyển dụng.');
        setFormOpen(false);
        // Optimistic local merge; page will re-fetch on navigation.
        const newTr: JobTranslation = {
          languages_code: locale,
          title: payload.title,
          summary: payload.summary,
          description: payload.description,
          requirements: payload.requirements,
          benefits: payload.benefits
        };
        const base: JobItem = {
          id: form.id ?? Math.max(0, ...jobs.map((j) => j.id)) + 1,
          status: payload.status || 'draft',
          slug: payload.slug,
          code: payload.code,
          department: payload.department,
          location: payload.location,
          employment_type: payload.employment_type,
          salary_range: payload.salary_range,
          is_urgent: payload.is_urgent,
          deadline: payload.deadline || null,
          sort: payload.sort ?? null,
          translations: [newTr]
        };
        setJobs((prev) =>
          form.id ? prev.map((j) => (j.id === form.id ? { ...j, ...base, translations: mergeTr(j, newTr) } : j)) : [...prev, base]
        );
      } else {
        setFormError(res.error || 'Lưu thất bại.');
        toast.error(res.error || 'Lưu thất bại.');
      }
    });
  };

  const mergeTr = (j: JobItem, tr: JobTranslation): JobTranslation[] => {
    const others = (j.translations || []).filter((t) => t.languages_code !== locale);
    return [...others, tr];
  };

  const handleDelete = (j: JobItem) => {
    setConfirmState({
      isOpen: true,
      message: `Lưu trữ vị trí "${trOf(j).title || j.slug}"? Vị trí sẽ ẩn khỏi trang tuyển dụng.`,
      onConfirm: () => {
        startTransition(async () => {
          const res = await deleteJob(j.id);
          if (res.success) {
            toast.success('Đã lưu trữ vị trí.');
            setJobs((prev) => prev.filter((x) => x.id !== j.id));
          } else {
            toast.error(res.error || 'Thao tác thất bại.');
          }
          setConfirmState((s) => ({ ...s, isOpen: false }));
        });
      }
    });
  };

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Tuyển dụng</h1>
          <p className="text-sm text-slate-500">Quản lý các vị trí tuyển dụng hiển thị tại /about/careers.</p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-[3px] bg-[#1769E2] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1257BD]"
        >
          <Plus className="h-4 w-4" /> Thêm vị trí
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-[3px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tiêu đề hoặc mã..."
            className="w-full rounded-[3px] border border-slate-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-[#1769E2]"
          />
        </div>
        <select
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
          className="rounded-[3px] border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#1769E2]"
        >
          <option value="all">Tất cả phòng ban</option>
          {DEPARTMENTS.map((d) => (
            <option key={d.value} value={d.value}>{d.label}</option>
          ))}
        </select>
      </div>

      <div className="overflow-hidden rounded-[3px] border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-4 py-3">Vị trí</th>
              <th className="px-4 py-3">Phòng ban</th>
              <th className="px-4 py-3">Địa điểm</th>
              <th className="px-4 py-3">Loại hình</th>
              <th className="px-4 py-3">Hạn nộp</th>
              <th className="px-4 py-3">Trạng thái</th>
              <th className="px-4 py-3 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredJobs.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-slate-400">
                  Chưa có vị trí nào.
                </td>
              </tr>
            )}
            {filteredJobs.map((j) => {
              const t = trOf(j);
              return (
                <tr key={j.id} className="hover:bg-slate-50/60">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 font-medium text-slate-800">
                      {t.title || j.slug}
                      {j.is_urgent && (
                        <span className="inline-flex items-center gap-0.5 rounded bg-[#FEF3E6] px-1.5 py-0.5 text-[10px] font-semibold uppercase text-[#B25E00]">
                          <Zap className="h-3 w-3" /> Gấp
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400">{j.code || j.slug}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{labelOf(DEPARTMENTS, j.department)}</td>
                  <td className="px-4 py-3 text-slate-600">
                    <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-slate-400" />{j.location || '—'}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    <span className="inline-flex items-center gap-1"><Briefcase className="h-3.5 w-3.5 text-slate-400" />{labelOf(EMPLOYMENT_TYPES, j.employment_type)}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{j.deadline ? j.deadline.slice(0, 10) : '—'}</td>
                  <td className="px-4 py-3">
                    <span className={cn(
                      'rounded px-2 py-0.5 text-xs font-semibold',
                      j.status === 'published' ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-slate-500'
                    )}>
                      {j.status === 'published' ? 'Đăng' : 'Nháp'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openEdit(j)} className="rounded p-1.5 text-slate-500 hover:bg-slate-100 hover:text-[#1769E2]" title="Sửa">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDelete(j)} className="rounded p-1.5 text-slate-500 hover:bg-red-50 hover:text-red-600" title="Lưu trữ">
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

      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4">
          <form onSubmit={handleSubmit} className="my-8 w-full max-w-2xl rounded-[4px] bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <h3 className="text-lg font-bold text-slate-800">{form.id ? 'Sửa vị trí' : 'Thêm vị trí'}</h3>
              <button type="button" onClick={() => setFormOpen(false)} className="rounded p-1 text-slate-400 hover:bg-slate-100">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[70vh] space-y-4 overflow-y-auto px-5 py-4">
              {formError && (
                <div className="rounded-[3px] border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{formError}</div>
              )}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Tiêu đề *">
                  <input value={form.title} onChange={(e) => set('title', e.target.value)} className={inputCls} />
                </Field>
                <Field label="Slug *">
                  <input value={form.slug} onChange={(e) => set('slug', e.target.value)} placeholder="bd-01" className={inputCls} />
                </Field>
                <Field label="Mã vị trí">
                  <input value={form.code} onChange={(e) => set('code', e.target.value)} placeholder="BD-01" className={inputCls} />
                </Field>
                <Field label="Phòng ban">
                  <select value={form.department} onChange={(e) => set('department', e.target.value)} className={inputCls}>
                    {DEPARTMENTS.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
                  </select>
                </Field>
                <Field label="Địa điểm">
                  <select value={form.location} onChange={(e) => set('location', e.target.value)} className={inputCls}>
                    {LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
                  </select>
                </Field>
                <Field label="Loại hình">
                  <select value={form.employment_type} onChange={(e) => set('employment_type', e.target.value)} className={inputCls}>
                    {EMPLOYMENT_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                </Field>
                <Field label="Mức lương">
                  <input value={form.salary_range} onChange={(e) => set('salary_range', e.target.value)} placeholder="15 - 20 triệu" className={inputCls} />
                </Field>
                <Field label="Hạn nộp">
                  <input type="date" value={form.deadline} onChange={(e) => set('deadline', e.target.value)} className={inputCls} />
                </Field>
                <Field label="Thứ tự (sort)">
                  <input type="number" value={form.sort} onChange={(e) => set('sort', e.target.value)} className={inputCls} />
                </Field>
                <Field label="Trạng thái">
                  <select value={form.status} onChange={(e) => set('status', e.target.value as any)} className={inputCls}>
                    <option value="published">Đăng</option>
                    <option value="draft">Nháp</option>
                    <option value="archived">Lưu trữ</option>
                  </select>
                </Field>
              </div>

              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input type="checkbox" checked={form.is_urgent} onChange={(e) => set('is_urgent', e.target.checked)} />
                Tuyển gấp
              </label>

              <Field label="Tóm tắt">
                <textarea value={form.summary} onChange={(e) => set('summary', e.target.value)} rows={2} className={inputCls} />
              </Field>
              <Field label="Mô tả công việc">
                <RichTextEditor value={form.description} onChange={(html) => set('description', html)} placeholder="Nhập mô tả công việc..." />
              </Field>
              <Field label="Yêu cầu">
                <RichTextEditor value={form.requirements} onChange={(html) => set('requirements', html)} placeholder="Nhập yêu cầu ứng viên..." />
              </Field>
              <Field label="Quyền lợi">
                <RichTextEditor value={form.benefits} onChange={(html) => set('benefits', html)} placeholder="Nhập quyền lợi..." />
              </Field>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-100 px-5 py-4">
              <button type="button" onClick={() => setFormOpen(false)} className="rounded-[3px] border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">
                Hủy
              </button>
              <button type="submit" disabled={isPending} className="rounded-[3px] bg-[#1769E2] px-5 py-2 text-sm font-semibold text-white hover:bg-[#1257BD] disabled:opacity-60">
                {isPending ? 'Đang lưu...' : 'Lưu'}
              </button>
            </div>
          </form>
        </div>
      )}

      <ConfirmModal
        isOpen={confirmState.isOpen}
        title="Xác nhận"
        message={confirmState.message}
        type="danger"
        onConfirm={confirmState.onConfirm}
        onCancel={() => setConfirmState((s) => ({ ...s, isOpen: false }))}
      />
    </div>
  );
}

const inputCls =
  'w-full rounded-[3px] border border-slate-200 px-3 py-2 text-sm text-slate-800 outline-none focus:border-[#1769E2]';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</span>
      {children}
    </label>
  );
}
