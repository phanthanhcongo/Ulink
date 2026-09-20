#!/usr/bin/env node
// Creates the mail_settings table and seeds a single row.
// Run: node directus/scripts/create-mail-settings.mjs

import pg from 'pg';

const DATABASE_URL = process.env.DATABASE_URL
  ?? `postgresql://${process.env.POSTGRES_USER ?? 'ulink'}:${process.env.POSTGRES_PASSWORD ?? 'change-me-strong-password'}@localhost:${process.env.POSTGRES_PORT ?? '5460'}/${process.env.POSTGRES_DB ?? 'ulink'}`;

const client = new pg.Client({ connectionString: DATABASE_URL });

await client.connect();

try {
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

  // Seed a single row if empty
  await client.query(`
    INSERT INTO mail_settings (id, host, port, secure, username, password, mail_from, enabled)
    VALUES (1, '', 587, false, '', '', '', false)
    ON CONFLICT (id) DO NOTHING;
  `);

  console.log('✅ mail_settings table created and seeded.');
} finally {
  await client.end();
}
