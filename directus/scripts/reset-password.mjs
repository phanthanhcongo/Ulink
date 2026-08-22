import argon2 from 'argon2';
import pg from 'pg';

const connStr = process.argv[2];
const email = process.argv[3] || 'admin@ulink.com';
const password = process.argv[4] || 'change-me-admin-password';

if (!connStr) {
  console.error('Usage: node scripts/reset-password.mjs <DB_URL> [email] [password]');
  process.exit(1);
}

const hash = await argon2.hash(password);
console.log(`Resetting password for ${email}...`);

const db = new pg.Client({ connectionString: connStr, ssl: { rejectUnauthorized: false } });
await db.connect();

const result = await db.query(
  'UPDATE directus_users SET password = $1 WHERE email = $2',
  [hash, email]
);

console.log(`✅ Updated ${result.rowCount} row(s)`);
await db.end();
