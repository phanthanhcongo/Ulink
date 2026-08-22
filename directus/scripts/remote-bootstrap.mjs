/**
 * Run the full bootstrap against a remote Directus instance.
 * Bypasses .env dotenv loading by injecting env vars before importing bootstrap.
 *
 * Usage (CMD):
 *   node scripts/remote-bootstrap.mjs https://directus-production-8018.up.railway.app admin@ulink.com change-me-admin-password
 */

const [,, url, email, password] = process.argv;
if (!url || !email || !password) {
  console.error('Usage: node scripts/remote-bootstrap.mjs <URL> <EMAIL> <PASSWORD>');
  process.exit(1);
}

// Override env BEFORE dotenv loads in config.mjs
process.env.DIRECTUS_PUBLIC_URL = url;
process.env.DIRECTUS_ADMIN_EMAIL = email;
process.env.DIRECTUS_ADMIN_PASSWORD = password;

console.log(`\n🚀 Running bootstrap against: ${url}\n`);

// Now dynamically import the actual bootstrap
await import('../bootstrap.mjs');
