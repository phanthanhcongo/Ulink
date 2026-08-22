import IORedis from 'ioredis';

const REDIS_URL = process.env.REDIS_URL || process.env.REDIS || 'redis://localhost:6379';

let client = null;

/**
 * Returns a module-level ioredis singleton.
 *
 * All custom extensions share the same Node.js process inside
 * the Directus container, so a single connection is sufficient
 * and avoids exhausting Redis connection limits.
 *
 * Previously duplicated in:
 *   - extensions/otp-endpoint/src/service.js
 *   - extensions/customer-onboarding-endpoint/src/service.js
 *   - extensions/password-change-endpoint/src/index.js
 *   - extensions/password-reset-request-endpoint/src/index.js
 */
export function getRedis() {
  if (!client) {
    client = new IORedis(REDIS_URL, {
      maxRetriesPerRequest: 3,
      enableReadyCheck: true,
      lazyConnect: false,
    });
    client.on('error', (err) => {
      console.error('[redis] connection error:', err.message);
    });
  }
  return client;
}

/**
 * Gracefully close the Redis connection.
 *
 * Useful for CLI scripts (bootstrap, seed, verify) and tests
 * that need the process to exit cleanly after finishing work.
 */
export async function closeRedis() {
  if (client) {
    await client.quit().catch(() => {});
    client = null;
  }
}
