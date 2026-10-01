import { getDirectusUrl } from './directus-runtime.mjs';

export interface JobOpeningTranslation {
  languages_code: string;
  title: string;
  summary: string | null;
  description: string | null;
  requirements: string | null;
  benefits: string | null;
}

export interface JobOpening {
  id: number;
  status: string;
  slug: string;
  code: string | null;
  department: string | null;
  location: string | null;
  employment_type: string | null;
  salary_range: string | null;
  is_urgent: boolean;
  deadline: string | null;
  sort: number | null;
  title: string;
  translations?: JobOpeningTranslation[];
}

const EMPLOYMENT_TYPE_LABELS: Record<string, string> = {
  full_time: 'Toàn thời gian',
  part_time: 'Bán thời gian',
  internship: 'Thực tập',
  contract: 'Hợp đồng'
};

const DEPARTMENT_LABELS: Record<string, string> = {
  'kinh-doanh': 'Kinh doanh',
  'ky-thuat': 'Kỹ thuật',
  'chuoi-cung-ung': 'Chuỗi cung ứng'
};

export function getDepartmentLabel(value: string | null): string {
  if (!value) return '';
  return DEPARTMENT_LABELS[value] || value;
}

/** Format an ISO date as dd/mm/yyyy (empty string when missing/invalid). */
export function formatJobDate(value: string | null): string {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  return `${dd}/${mm}/${d.getFullYear()}`;
}

/** Compact view-model consumed by the job detail components. */
export interface JobDetailVM {
  id: number;
  slug: string;
  code: string | null;
  title: string;
  summary: string | null;
  description: string | null;
  requirements: string | null;
  benefits: string | null;
  location: string | null;
  salaryRange: string | null;
  employmentTypeLabel: string;
  departmentLabel: string;
  deadline: string | null;
  deadlineDate: string;
  deadlineLabel: string;
  isUrgent: boolean;
}

export function buildJobDetailVM(job: JobOpening, locale: string): JobDetailVM {
  const t = getJobTranslation(job, locale);
  return {
    id: job.id,
    slug: job.slug,
    code: job.code,
    title: t.title || job.title,
    summary: t.summary,
    description: t.description,
    requirements: t.requirements,
    benefits: t.benefits,
    location: job.location,
    salaryRange: job.salary_range,
    employmentTypeLabel: getEmploymentTypeLabel(job.employment_type),
    departmentLabel: getDepartmentLabel(job.department),
    deadline: job.deadline,
    deadlineDate: formatJobDate(job.deadline),
    deadlineLabel: getDaysLeftLabel(job.deadline),
    isUrgent: !!job.is_urgent
  };
}

/** Summary shape for "similar / related" cards. */
export interface JobCardVM {
  slug: string;
  title: string;
  location: string | null;
  employmentTypeLabel: string;
  salaryRange: string | null;
}

export function toJobCardVM(job: JobOpening, locale: string): JobCardVM {
  const t = getJobTranslation(job, locale);
  return {
    slug: job.slug,
    title: t.title || job.title,
    location: job.location,
    employmentTypeLabel: getEmploymentTypeLabel(job.employment_type),
    salaryRange: job.salary_range
  };
}

const FIELDS = [
  'id', 'status', 'slug', 'code', 'department', 'location',
  'employment_type', 'salary_range', 'is_urgent', 'deadline', 'sort',
  'translations.languages_code', 'translations.title', 'translations.summary',
  'translations.description', 'translations.requirements', 'translations.benefits'
].join(',');

export function getJobTranslation(job: JobOpening, locale: string): JobOpeningTranslation {
  const t = job.translations?.find((t) => t.languages_code === locale)
    || job.translations?.[0];
  return t || {
    languages_code: locale,
    title: job.title,
    summary: null,
    description: null,
    requirements: null,
    benefits: null
  };
}

export function getEmploymentTypeLabel(value: string | null): string {
  if (!value) return '';
  return EMPLOYMENT_TYPE_LABELS[value] || value;
}

/** Human-readable "Còn N ngày" / "Hết hạn" from an ISO date. */
export function getDaysLeftLabel(deadline: string | null): string {
  if (!deadline) return '';
  const end = new Date(deadline);
  if (Number.isNaN(end.getTime())) return '';
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (diff < 0) return 'Hết hạn';
  if (diff === 0) return 'Hết hạn hôm nay';
  return `Còn ${diff} ngày`;
}

export async function fetchJobOpenings(): Promise<JobOpening[]> {
  const url = getDirectusUrl();
  const params = new URLSearchParams({
    'filter[status][_eq]': 'published',
    'fields[]': FIELDS,
    sort: 'sort',
    limit: '-1'
  });

  const res = await fetch(`${url}/items/job_openings?${params}`, { next: { revalidate: 60 } });
  if (!res.ok) return [];
  const json = await res.json();
  return json.data || [];
}

export async function fetchJobBySlug(slug: string): Promise<JobOpening | null> {
  const url = getDirectusUrl();
  const params = new URLSearchParams({
    'filter[slug][_eq]': slug,
    'filter[status][_eq]': 'published',
    'fields[]': FIELDS,
    limit: '1'
  });

  const res = await fetch(`${url}/items/job_openings?${params}`, { next: { revalidate: 60 } });
  if (!res.ok) return null;
  const json = await res.json();
  return json.data?.[0] || null;
}
