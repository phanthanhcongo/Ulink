/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { redirect } from '@/i18n/navigation';
import { getCurrentUser } from '@/lib/auth-helpers';
import { createWriteDirectusClient, Schema } from '@/lib/directus';
import { createDirectus, rest, readItems } from '@directus/sdk';
import { cookies } from 'next/headers';
import { getDirectusUrl } from '@/lib/directus-runtime.mjs';
import { IndustrialZonesClient } from '@/components/admin/industrial-zones-client';

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

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function AdminIndustrialZonesPage({ params }: PageProps) {
  const { locale } = await params;

  // 1. Check Auth
  const user = await getCurrentUser();
  if (!user) {
    redirect({ href: '/login', locale });
  }

  let zones: any[] = [];
  let hubs: any[] = [];
  let error: string | undefined;

  try {
    const client = await getSessionClient();

    // 2. Fetch industrial zones and hubs
    const [zonesRes, hubsRes] = await Promise.all([
      client.request(
        readItems(
          'hub_industrial_zones' as any,
          {
            fields: ['id', 'name', 'image', 'hub.id', 'hub.name'] as any,
            sort: ['id'],
            limit: -1
          } as any
        )
      ),
      client.request(
        readItems(
          'regional_hubs' as any,
          {
            fields: ['id', 'name'] as any,
            sort: ['name'],
            limit: -1
          } as any
        )
      )
    ]);

    zones = zonesRes || [];
    hubs = hubsRes || [];
  } catch (err) {
    console.error('Failed to load industrial zones in admin panel:', err);
    try {
      error = JSON.stringify(err, null, 2);
    } catch {
      error = String(err);
    }
  }

  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-8 lg:px-12 xl:px-16">
      <IndustrialZonesClient initialZones={zones} hubs={hubs} error={error} />
    </div>
  );
}
