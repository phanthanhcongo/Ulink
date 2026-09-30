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
