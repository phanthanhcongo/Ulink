'use server';

import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, isAdminUser } from '@/lib/auth-helpers';

const DATABASE_URL =
  process.env.DATABASE_URL ??
  `postgresql://${process.env.POSTGRES_USER ?? 'ulink'}:${process.env.POSTGRES_PASSWORD ?? 'change-me-strong-password'}@${process.env.POSTGRES_HOST ?? 'localhost'}:${process.env.POSTGRES_PORT ?? '5460'}/${process.env.POSTGRES_DB ?? 'ulink'}`;

async function getDbClient() {
  const pg = await import('pg');
  const client = new pg.default.Client({ connectionString: DATABASE_URL });
  await client.connect();
  return client;
}

export async function GET() {
  const user = await getCurrentUser();
  if (!user || !isAdminUser(user)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const client = await getDbClient();
  try {
    const result = await client.query(
      'SELECT host, port, secure, username, mail_from, enabled FROM mail_settings WHERE id = 1'
    );
    if (result.rows.length === 0) {
      return NextResponse.json({
        data: { host: '', port: 587, secure: false, username: '', mail_from: '', enabled: false },
      });
    }
    return NextResponse.json({ data: result.rows[0] });
  } finally {
    await client.end();
  }
}

export async function PUT(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || !isAdminUser(user)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { host, port, secure, username, password, mail_from, enabled } = body;

  const client = await getDbClient();
  try {
    // Ensure table + row exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS mail_settings (
        id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
        host VARCHAR(255),
        port INTEGER,
        secure BOOLEAN DEFAULT false,
        username VARCHAR(255),
        password VARCHAR(255),
        mail_from VARCHAR(500),
        enabled BOOLEAN DEFAULT false,
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    await client.query(`
      INSERT INTO mail_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;
    `);

    // Build dynamic update
    const fields: string[] = [];
    const values: unknown[] = [];
    let idx = 1;

    if (host !== undefined) { fields.push(`host = $${idx++}`); values.push(host); }
    if (port !== undefined) { fields.push(`port = $${idx++}`); values.push(port); }
    if (secure !== undefined) { fields.push(`secure = $${idx++}`); values.push(secure); }
    if (username !== undefined) { fields.push(`username = $${idx++}`); values.push(username); }
    if (password !== undefined && password !== '') { fields.push(`password = $${idx++}`); values.push(password); }
    if (mail_from !== undefined) { fields.push(`mail_from = $${idx++}`); values.push(mail_from); }
    if (enabled !== undefined) { fields.push(`enabled = $${idx++}`); values.push(enabled); }
    fields.push(`updated_at = NOW()`);

    if (fields.length > 1) {
      await client.query(
        `UPDATE mail_settings SET ${fields.join(', ')} WHERE id = 1`,
        values
      );
    }

    return NextResponse.json({ success: true });
  } finally {
    await client.end();
  }
}
