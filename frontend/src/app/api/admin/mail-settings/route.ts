'use server';

import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, isAdminUser } from '@/lib/auth-helpers';
import { readItems, createItem, updateItem } from '@directus/sdk';
import { createWriteDirectusClient } from '@/lib/directus';

const DEFAULT_SETTINGS = {
  host: '',
  port: 587,
  secure: false,
  username: '',
  mail_from: '',
  enabled: false,
};

export async function GET() {
  const user = await getCurrentUser();
  if (!user || !isAdminUser(user)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const client = createWriteDirectusClient();
    const items = await client.request(
      readItems('mail_settings' as any, {
        limit: 1,
        fields: ['id', 'host', 'port', 'secure', 'username', 'mail_from', 'enabled'],
      } as any)
    ) as any[];

    if (!items || items.length === 0) {
      return NextResponse.json({ data: DEFAULT_SETTINGS });
    }

    return NextResponse.json({ data: items[0] });
  } catch (error) {
    console.error('[mail-settings GET]', error);
    // If collection doesn't exist yet, return defaults
    return NextResponse.json({ data: DEFAULT_SETTINGS });
  }
}

export async function PUT(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || !isAdminUser(user)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { host, port, secure, username, password, mail_from, enabled } = body;

  try {
    const client = createWriteDirectusClient();

    // Check if a record already exists
    const existing = await client.request(
      readItems('mail_settings' as any, { limit: 1, fields: ['id'] } as any)
    ) as any[];

    const updateData: Record<string, unknown> = {};
    if (host !== undefined) updateData.host = host;
    if (port !== undefined) updateData.port = port;
    if (secure !== undefined) updateData.secure = secure;
    if (username !== undefined) updateData.username = username;
    if (password !== undefined && password !== '') updateData.password = password;
    if (mail_from !== undefined) updateData.mail_from = mail_from;
    if (enabled !== undefined) updateData.enabled = enabled;

    if (existing && existing.length > 0) {
      await client.request(
        updateItem('mail_settings' as any, existing[0].id, updateData as any)
      );
    } else {
      await client.request(
        (createItem as any)('mail_settings', {
          host: host ?? '',
          port: port ?? 587,
          secure: secure ?? false,
          username: username ?? '',
          password: password ?? '',
          mail_from: mail_from ?? '',
          enabled: enabled ?? false,
          ...updateData,
        })
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[mail-settings PUT]', error);
    const message = error instanceof Error ? error.message : 'Failed to update mail settings';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
