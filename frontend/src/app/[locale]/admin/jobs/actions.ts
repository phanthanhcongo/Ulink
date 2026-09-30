'use server';

/* eslint-disable @typescript-eslint/no-explicit-any */

import { createWriteDirectusClient, Schema } from '@/lib/directus';
import { createDirectus, rest, updateItem, createItem, deleteItem, readItems } from '@directus/sdk';
import { revalidatePath } from 'next/cache';
import { getCurrentUser } from '@/lib/auth-helpers';
import { getDirectusUrl } from '@/lib/directus-runtime.mjs';
import { cookies } from 'next/headers';
import { extractErrorMessage } from '@/lib/api-error';

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
      return globalThis.fetch(input, { ...init, headers });
    };

    const url = getDirectusUrl();
    return createDirectus<Schema>(url, { globals: { fetch: cookieFetch } }).with(rest());
  }

  return createWriteDirectusClient();
}

async function checkAuth() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Unauthorized. You must log in first.');
  }
}

export interface JobFormData {
  id?: number;
  slug: string;
  code?: string;
  department?: string;
  location?: string;
  employment_type?: string;
  salary_range?: string;
  is_urgent?: boolean;
  deadline?: string | null;
  sort?: number | null;
  status?: 'published' | 'draft' | 'archived';
  // Translated fields (per-locale)
  title: string;
  summary?: string;
  description?: string;
  requirements?: string;
  benefits?: string;
  locale: string;
}

function baseFields(data: JobFormData) {
  return {
    slug: data.slug,
    code: data.code || null,
    department: data.department || null,
    location: data.location || null,
    employment_type: data.employment_type || 'full_time',
    salary_range: data.salary_range || null,
    is_urgent: !!data.is_urgent,
    deadline: data.deadline || null,
    sort: data.sort ?? null,
    status: data.status || 'draft',
    // Mirror the localized title onto the base row for fallback display.
    title: data.title
  };
}

/**
 * Action: Save (Create or Update) a Job Opening.
 */
export async function saveJob(data: JobFormData) {
  await checkAuth();

  try {
    const client = await getSessionClient();

    const translationFields = {
      title: data.title,
      summary: data.summary || null,
      description: data.description || null,
      requirements: data.requirements || null,
      benefits: data.benefits || null
    };

    if (data.id) {
      const existingTranslations = (await client.request(
        readItems('job_openings_translations' as any, {
          filter: { job_openings_id: { _eq: data.id } },
          fields: ['id', 'languages_code'],
          limit: -1
        } as any)
      )) as any[];

      const translationForLocale = existingTranslations.find(
        (t) => t.languages_code === data.locale
      );

      const translationsPayload = translationForLocale
        ? { update: [{ id: translationForLocale.id, ...translationFields }], create: [], delete: [] }
        : { create: [{ languages_code: data.locale, ...translationFields }], update: [], delete: [] };

      await client.request(
        updateItem('job_openings' as any, data.id, {
          ...baseFields(data),
          translations: translationsPayload
        })
      );
    } else {
      await client.request(
        createItem('job_openings' as any, {
          ...baseFields(data),
          translations: [{ languages_code: data.locale, ...translationFields }]
        })
      );
    }

    revalidatePath('/[locale]/admin/jobs', 'layout');
    revalidatePath('/[locale]/about/careers', 'layout');
    return { success: true };
  } catch (err) {
    console.error('Failed to save job opening:', err);
    return { success: false, error: extractErrorMessage(err) };
  }
}

/**
 * Action: Archive (soft delete) a Job Opening.
 */
export async function deleteJob(id: number) {
  await checkAuth();

  try {
    const client = await getSessionClient();
    await client.request(updateItem('job_openings' as any, id, { status: 'archived' }));
    revalidatePath('/[locale]/admin/jobs', 'layout');
    revalidatePath('/[locale]/about/careers', 'layout');
    return { success: true };
  } catch (err) {
    console.error('Failed to archive job opening:', err);
    return { success: false, error: extractErrorMessage(err) };
  }
}

/**
 * Action: Permanently delete a Job Opening (and its translations).
 */
export async function destroyJob(id: number) {
  await checkAuth();

  try {
    const client = await getSessionClient();
    await client.request(deleteItem('job_openings' as any, id));
    revalidatePath('/[locale]/admin/jobs', 'layout');
    revalidatePath('/[locale]/about/careers', 'layout');
    return { success: true };
  } catch (err) {
    console.error('Failed to delete job opening:', err);
    return { success: false, error: extractErrorMessage(err) };
  }
}
