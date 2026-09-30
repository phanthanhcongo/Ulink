import React from 'react';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect } from '@/i18n/navigation';
import { getCurrentUser } from '@/lib/auth-helpers';
import { createWriteDirectusClient, Schema } from '@/lib/directus';
import { createDirectus, rest, readItems } from '@directus/sdk';
import { cookies } from 'next/headers';
import { getDirectusUrl } from '@/lib/directus-runtime.mjs';
import { JobsClient } from '@/components/admin/jobs-client';
import { extractErrorMessage } from '@/lib/api-error';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getSessionClient() {
  const store = await cookies();
  const sessionToken = store.get('directus_session_token')?.value;
  const refreshToken = store.get('directus_refresh_token')?.value;

  if (sessionToken) {
    const cookieHeader = [
      `directus_session_token=${sessionToken}`,
      refreshToken ? `directus_refresh_token=${refreshToken}` : null
    ]
      .filter(Boolean)
      .join('; ');

    const cookieFetch: typeof globalThis.fetch = (input, init) => {
      const headers = new Headers(init?.headers);
      headers.set('cookie', cookieHeader);
      return globalThis.fetch(input, { ...init, headers, cache: 'no-store' });
    };

    const url = getDirectusUrl();
    return createDirectus<Schema>(url, { globals: { fetch: cookieFetch } }).with(rest());
  }

  return createWriteDirectusClient();
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function AdminJobsPage({ params }: PageProps) {
  const { locale } = await params;

  const user = await getCurrentUser();
  if (!user) {
    redirect({ href: '/login', locale });
  }

  let jobs: any[] = [];
  let error: string | undefined;
  try {
    const client = await getSessionClient();
    const res = await client.request(
      readItems('job_openings' as any, {
        filter: { status: { _in: ['published', 'draft'] } },
        fields: [
          'id',
          'status',
          'slug',
          'code',
          'department',
          'location',
          'employment_type',
          'salary_range',
          'is_urgent',
          'deadline',
          'sort',
          'translations.id',
          'translations.languages_code',
          'translations.title',
          'translations.summary',
          'translations.description',
          'translations.requirements',
          'translations.benefits'
        ],
        sort: ['sort', 'id'],
        limit: -1
      } as any)
    );
    jobs = (res as any[]) || [];
  } catch (err) {
    console.error('Failed to load job openings in admin dashboard:', err);
    error = extractErrorMessage(err);
  }

  return <JobsClient initialJobs={jobs} locale={locale} error={error} />;
}
