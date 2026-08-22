import { SALES_ROLE_ID } from '../lib/constants.mjs';

export async function seedDevUsers(helpers) {
  if (process.env.SEED_DEV_USERS !== 'true') {
    return;
  }

  const password = process.env.SEED_DEV_PASSWORD || 'DevPassword123!';
  console.log('Seeding dev users...');

  const users = [
    { email: 'sales-rbac@example.com', first_name: 'Default', last_name: 'Sales' },
    { email: 'sales-hn@example.com', first_name: 'Hà Nội', last_name: 'Sales' },
    { email: 'sales-hcm@example.com', first_name: 'Hồ Chí Minh', last_name: 'Sales' },
    { email: 'sales-dn@example.com', first_name: 'Đà Nẵng', last_name: 'Sales' }
  ];

  for (const u of users) {
    await helpers.ensureUser({
      ...u,
      password,
      role: SALES_ROLE_ID,
      status: 'active'
    });
  }

  console.log('Dev users seeded successfully.');
}
