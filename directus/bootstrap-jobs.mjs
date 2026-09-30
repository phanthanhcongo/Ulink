/**
 * Targeted registration for the `job_openings` collection.
 *
 * Registers ONLY job_openings (+ its translations collection, relations,
 * permissions) and seeds the 3 sample jobs. Does NOT run the destructive
 * full seed (products / images / commerce), so restored production data
 * is left untouched.
 *
 *   cd directus && node bootstrap-jobs.mjs
 */
import { createDirectusClient, loginAdmin, DIRECTUS_URL } from './lib/config.mjs';
import { createEnsureHelpers } from './lib/ensure-helpers.mjs';
import { COLLECTION_DEFS } from './schema/collections.mjs';
import { RELATION_DEFS } from './schema/relations.mjs';
import { ensurePermissions } from './rbac/permissions.mjs';

const TARGET = ['job_openings', 'job_openings_translations'];

const client = createDirectusClient();
const helpers = createEnsureHelpers(client);

const jobSeeds = [
  {
    slug: 'bd-01', code: 'BD-01', department: 'kinh-doanh', location: 'Hà Nam',
    employment_type: 'full_time', salary_range: '15 - 20 triệu', is_urgent: true,
    deadline: '2026-10-31', sort: 1, status: 'published',
    title: 'Chuyên viên Phát triển Kinh doanh',
    summary: 'Tìm kiếm và phát triển khách hàng doanh nghiệp B2B trong lĩnh vực vật tư công nghiệp.',
    description: '<p>Phát triển thị trường và chăm sóc khách hàng doanh nghiệp tại khu vực Hà Nam và lân cận.</p>',
    requirements: '<ul><li>Tối thiểu 1 năm kinh nghiệm bán hàng B2B.</li><li>Kỹ năng giao tiếp và đàm phán tốt.</li></ul>',
    benefits: '<ul><li>Lương cứng + hoa hồng hấp dẫn.</li><li>Bảo hiểm đầy đủ theo luật.</li></ul>'
  },
  {
    slug: 'pe-03', code: 'PE-03', department: 'ky-thuat', location: 'Hà Nam',
    employment_type: 'full_time', salary_range: '18 - 25 triệu', is_urgent: false,
    deadline: '2026-10-29', sort: 2, status: 'published',
    title: 'Kỹ sư Dự án (Project Engineer)',
    summary: 'Quản lý và triển khai các dự án cung ứng vật tư cho khách hàng công nghiệp.',
    description: '<p>Chịu trách nhiệm khảo sát, tư vấn giải pháp kỹ thuật và triển khai dự án.</p>',
    requirements: '<ul><li>Tốt nghiệp chuyên ngành kỹ thuật.</li><li>Kinh nghiệm quản lý dự án là lợi thế.</li></ul>',
    benefits: '<ul><li>Cơ hội đào tạo và phát triển chuyên môn.</li><li>Môi trường làm việc chuyên nghiệp.</li></ul>'
  },
  {
    slug: 'sce-02', code: 'SCE-02', department: 'chuoi-cung-ung', location: 'Hà Nội',
    employment_type: 'full_time', salary_range: '12 - 18 triệu', is_urgent: false,
    deadline: '2026-11-05', sort: 3, status: 'published',
    title: 'Chuyên viên Chuỗi cung ứng (Supply Chain Executive)',
    summary: 'Điều phối và tối ưu hoạt động chuỗi cung ứng, tồn kho và logistics.',
    description: '<p>Lập kế hoạch cung ứng, quản lý tồn kho và phối hợp với các hub khu vực.</p>',
    requirements: '<ul><li>Kinh nghiệm về logistics / supply chain.</li><li>Thành thạo Excel và các công cụ phân tích.</li></ul>',
    benefits: '<ul><li>Chế độ phúc lợi toàn diện.</li><li>Lộ trình thăng tiến rõ ràng.</li></ul>'
  }
];

async function main() {
  await loginAdmin(client);
  console.log(`Authenticated @ ${DIRECTUS_URL}`);

  for (const c of COLLECTION_DEFS) {
    if (TARGET.includes(c.collection)) {
      await helpers.ensureCollection(c);
      console.log(`collection: ${c.collection}`);
    }
  }

  for (const r of RELATION_DEFS) {
    if (TARGET.includes(r.collection)) {
      await helpers.ensureRelation(r);
      console.log(`relation: ${r.collection}.${r.field}`);
    }
  }

  const publicPolicyId = await helpers.getPublicPolicyId();
  await ensurePermissions(helpers, publicPolicyId);
  console.log('permissions applied');

  for (const job of jobSeeds) {
    const { title, summary, description, requirements, benefits, ...base } = job;
    const jobId = await helpers.ensureItem('job_openings', 'slug', { ...base, title });
    await helpers.ensureTranslation('job_openings', jobId, 'vi', {
      title, summary, description, requirements, benefits
    });
    console.log(`job: ${job.slug} -> id ${jobId}`);
  }

  console.log('\njob_openings registration complete.');
  process.exit(0);
}

main().catch((err) => {
  console.error('job registration failed:', err);
  process.exit(1);
});
