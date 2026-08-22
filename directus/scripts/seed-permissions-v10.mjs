/**
 * Seeder to apply Directus 10 compatible permissions (role-based)
 * on a remote Directus 10 instance.
 *
 * Usage:
 *   node scripts/seed-permissions-v10.mjs <URL> <EMAIL> <PASSWORD>
 */
import { createDirectus, rest, authentication, customEndpoint } from '@directus/sdk';
import {
  VISITOR_ROLE_ID,
  EDITOR_ROLE_ID,
  SALES_ROLE_ID,
  CUSTOMER_ROLE_ID,
  FRONTEND_SERVICE_ROLE_ID,
  VISITOR_POLICY_ID,
  EDITOR_POLICY_ID,
  SALES_POLICY_ID,
  CUSTOMER_POLICY_ID,
  FRONTEND_SERVICE_POLICY_ID
} from '../lib/constants.mjs';
import { buildPermissionDefs } from '../rbac/permissions.mjs';

const [,, url, email, password] = process.argv;
if (!url || !email || !password) {
  console.error('Usage: node scripts/seed-permissions-v10.mjs <URL> <EMAIL> <PASSWORD>');
  process.exit(1);
}

console.log(`\n🔑 Seeding Directus 10 Permissions against: ${url}\n`);

const client = createDirectus(url).with(authentication('json')).with(rest());

async function main() {
  try {
    await client.login(email, password);
    console.log('✅ Authenticated successfully.');

    // 1. Fetch current permissions
    console.log('Fetching current permissions...');
    const currentPermissions = await client.request(
      customEndpoint({ path: '/permissions', method: 'GET', query: { limit: -1 } })
    );
    console.log(`Found ${currentPermissions.length} existing permission records.`);

    // 2. Clear all existing permissions
    if (currentPermissions.length > 0) {
      console.log(`Clearing ${currentPermissions.length} permissions one-by-one...`);
      for (const p of currentPermissions) {
        try {
          await client.request(
            customEndpoint({
              path: `/permissions/${p.id}`,
              method: 'DELETE'
            })
          );
          console.log(`- Deleted permission ID: ${p.id}`);
        } catch (delErr) {
          console.warn(`⚠️ Failed to delete permission ID ${p.id}:`, delErr.message);
        }
      }
      console.log('✅ Cleared old permissions.');
    }

    // 3. Map policies to roles (Directus 10 mapping)
    const policyToRoles = {
      [VISITOR_POLICY_ID]: [null, VISITOR_ROLE_ID, FRONTEND_SERVICE_ROLE_ID],
      [EDITOR_POLICY_ID]: [EDITOR_ROLE_ID],
      [SALES_POLICY_ID]: [SALES_ROLE_ID],
      [CUSTOMER_POLICY_ID]: [CUSTOMER_ROLE_ID],
      [FRONTEND_SERVICE_POLICY_ID]: [FRONTEND_SERVICE_ROLE_ID]
    };

    const permissionsToCreate = [];
    const permissionDefs = buildPermissionDefs();

    for (const def of permissionDefs) {
      const roles = policyToRoles[def.policy];
      if (!roles) {
        console.warn(`⚠️ No role mapping found for policy: ${def.policy}`);
        continue;
      }

      for (const role of roles) {
        permissionsToCreate.push({
          role: role,
          collection: def.collection,
          action: def.action,
          permissions: def.permissions || {},
          fields: def.fields || ['*'],
          validation: def.validation || null,
          presets: def.presets || null
        });
      }
    }

    // Uniquify target list to prevent duplicates
    const seen = new Set();
    const uniquePermissions = [];
    for (const p of permissionsToCreate) {
      const key = `${p.role}:${p.collection}:${p.action}`;
      if (!seen.has(key)) {
        seen.add(key);
        uniquePermissions.push(p);
      }
    }

    console.log(`Creating ${uniquePermissions.length} Directus 10 permissions...`);
    
    // Batch create permissions (Directus supports posting an array of items)
    await client.request(
      customEndpoint({
        path: '/permissions',
        method: 'POST',
        body: JSON.stringify(uniquePermissions),
        headers: { 'Content-Type': 'application/json' }
      })
    );

    console.log('🎉 Successfully seeded role-based permissions for Directus 10!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding permissions failed:', err?.errors?.[0]?.message || err?.message || err);
    process.exit(1);
  }
}

main();
