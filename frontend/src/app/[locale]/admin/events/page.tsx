/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { redirect } from '@/i18n/navigation';
import { getCurrentUser } from '@/lib/auth-helpers';
import { createWriteDirectusClient, Schema } from '@/lib/directus';
import { createDirectus, rest, readItems } from '@directus/sdk';
import { cookies } from 'next/headers';
import { getDirectusUrl } from '@/lib/directus-runtime.mjs';
import { EventsAdminClient } from '@/components/admin/events-client';
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

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function AdminEventsPage({ params }: PageProps) {
  const { locale } = await params;

  const user = await getCurrentUser();
  if (!user) {
    redirect({ href: '/login', locale });
  }

  let events: any[] = [];
  let error: string | undefined;
  try {
    const client = await getSessionClient();
    const res = await client.request(
      readItems('events' as any, {
        filter: { status: { _in: ['published', 'draft'] } },
        sort: ['-id'],
        limit: -1
      } as any)
    );
    events = res || [];
  } catch (err: any) {
    console.error('Failed to load events:', err);
    error = extractErrorMessage(err);
  }

  return <EventsAdminClient initialEvents={events} error={error} />;
}
