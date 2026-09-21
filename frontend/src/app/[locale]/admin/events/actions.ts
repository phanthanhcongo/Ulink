'use server';

/* eslint-disable @typescript-eslint/no-explicit-any */

import { createWriteDirectusClient, Schema } from '@/lib/directus';
import { createDirectus, rest, updateItem, createItem } from '@directus/sdk';
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
    ].filter(Boolean).join('; ');

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
  if (!user) throw new Error('Unauthorized');
}

export async function saveEvent(data: {
  id?: number;
  title: string;
  slug: string;
  summary?: string;
  image?: string | null;
  date?: string;
  time?: string;
  start_time?: string;
  end_time?: string;
  location?: string;
  location_name?: string;
  address?: string;
  registration_status?: string;
  price?: string;
  overview?: string;
  highlights?: string[];
  agenda?: any[];
  speakers?: any[];
  hosts?: any[];
  sponsors?: string[];
  benefits?: string[];
  organizer_name?: string;
  organizer_description?: string;
  organizer_contact?: string;
  organizer_role?: string;
  organizer_logo?: string;
  status?: string;
}) {
  await checkAuth();

  try {
    const client = await getSessionClient();
    const payload: any = {
      slug: data.slug,
      title: data.title,
      summary: data.summary || null,
      image: data.image || null,
      date: data.date || null,
      time: data.time || null,
      start_time: data.start_time || null,
      end_time: data.end_time || null,
      location: data.location || null,
      location_name: data.location_name || null,
      address: data.address || null,
      registration_status: data.registration_status || 'UPCOMING',
      price: data.price || null,
      overview: data.overview || null,
      highlights: data.highlights || [],
      agenda: data.agenda || [],
      speakers: data.speakers || [],
      hosts: data.hosts || [],
      sponsors: data.sponsors || [],
      benefits: data.benefits || [],
      organizer_name: data.organizer_name || null,
      organizer_description: data.organizer_description || null,
      organizer_contact: data.organizer_contact || null,
      organizer_role: data.organizer_role || null,
      organizer_logo: data.organizer_logo || null,
      status: data.status || 'draft'
    };

    if (data.id) {
      await client.request(updateItem('events' as any, data.id, payload));
    } else {
      await client.request(createItem('events' as any, payload));
    }

    revalidatePath('/[locale]/admin/events', 'layout');
    revalidatePath('/[locale]/resources/events', 'layout');
    return { success: true };
  } catch (err: any) {
    console.error('Failed to save event:', err);
    return { success: false, error: extractErrorMessage(err) };
  }
}

export async function uploadEventImage(formData: FormData) {
  await checkAuth();

  try {
    const store = await cookies();
    const sessionToken = store.get('directus_session_token')?.value;
    const refreshToken = store.get('directus_refresh_token')?.value;

    const cookieHeader = [
      sessionToken ? `directus_session_token=${sessionToken}` : null,
      refreshToken ? `directus_refresh_token=${refreshToken}` : null
    ]
      .filter(Boolean)
      .join('; ');

    const url = getDirectusUrl();
    const res = await fetch(`${url}/files`, {
      method: 'POST',
      headers: { cookie: cookieHeader },
      body: formData
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(errText || 'Upload failed');
    }

    const json = await res.json();
    return { success: true, id: json.data.id };
  } catch (err) {
    console.error('Failed to upload event image:', err);
    return { success: false, error: extractErrorMessage(err) };
  }
}

export async function deleteEvent(id: number) {
  await checkAuth();

  try {
    const client = await getSessionClient();
    await client.request(updateItem('events' as any, id, { status: 'archived' }));

    revalidatePath('/[locale]/admin/events', 'layout');
    revalidatePath('/[locale]/resources/events', 'layout');
    return { success: true };
  } catch (err: any) {
    console.error('Failed to delete event:', err);
    return { success: false, error: extractErrorMessage(err) };
  }
}
