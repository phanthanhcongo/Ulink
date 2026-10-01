/**
 * Unit tests for the pure helpers in careers-data.ts.
 *
 * Framework: node:test (run via `node --import tsx`), matching the other
 * src/lib/*.test.ts files. These cover only the network-free transforms —
 * fetchJobOpenings / fetchJobBySlug hit Directus and are exercised by the
 * integration spec test/api/jobs-crud.spec.ts instead.
 *
 * Run:  npx tsx --test src/lib/careers-data.test.ts   (from frontend/)
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import {
  getEmploymentTypeLabel,
  getDepartmentLabel,
  formatJobDate,
  getDaysLeftLabel,
  getJobTranslation,
  buildJobDetailVM,
  toJobCardVM,
  type JobOpening
} from './careers-data';

function makeJob(overrides: Partial<JobOpening> = {}): JobOpening {
  return {
    id: 1,
    status: 'published',
    slug: 'bd-01',
    code: 'BD-01',
    department: 'kinh-doanh',
    location: 'Hà Nam',
    employment_type: 'full_time',
    salary_range: '15 - 20 triệu',
    is_urgent: true,
    deadline: '2026-10-31',
    sort: 1,
    title: 'Chuyên viên Phát triển Kinh doanh',
    translations: [
      {
        languages_code: 'vi',
        title: 'Chuyên viên Phát triển Kinh doanh',
        summary: 'Tóm tắt vi',
        description: '<p>Mô tả</p>',
        requirements: '<ul><li>Yêu cầu</li></ul>',
        benefits: '<ul><li>Quyền lợi</li></ul>'
      }
    ],
    ...overrides
  };
}

describe('getEmploymentTypeLabel', () => {
  it('maps known codes to Vietnamese labels', () => {
    assert.equal(getEmploymentTypeLabel('full_time'), 'Toàn thời gian');
    assert.equal(getEmploymentTypeLabel('part_time'), 'Bán thời gian');
    assert.equal(getEmploymentTypeLabel('internship'), 'Thực tập');
    assert.equal(getEmploymentTypeLabel('contract'), 'Hợp đồng');
  });

  it('returns the raw value for unknown codes and empty for null', () => {
    assert.equal(getEmploymentTypeLabel('freelance'), 'freelance');
    assert.equal(getEmploymentTypeLabel(null), '');
  });
});

describe('getDepartmentLabel', () => {
  it('maps known departments and falls back to raw/empty', () => {
    assert.equal(getDepartmentLabel('kinh-doanh'), 'Kinh doanh');
    assert.equal(getDepartmentLabel('ky-thuat'), 'Kỹ thuật');
    assert.equal(getDepartmentLabel('chuoi-cung-ung'), 'Chuỗi cung ứng');
    assert.equal(getDepartmentLabel('unknown-dept'), 'unknown-dept');
    assert.equal(getDepartmentLabel(null), '');
  });
});

describe('formatJobDate', () => {
  it('formats an ISO date as dd/mm/yyyy', () => {
    assert.equal(formatJobDate('2026-10-31'), '31/10/2026');
    assert.equal(formatJobDate('2026-01-05T00:00:00Z'), '05/01/2026');
  });

  it('returns empty string for null / invalid input', () => {
    assert.equal(formatJobDate(null), '');
    assert.equal(formatJobDate('not-a-date'), '');
  });
});

describe('getDaysLeftLabel', () => {
  it('reports expired for past deadlines', () => {
    assert.equal(getDaysLeftLabel('2000-01-01'), 'Hết hạn');
  });

  it('reports remaining days for a future deadline', () => {
    const future = new Date();
    future.setDate(future.getDate() + 10);
    const iso = future.toISOString().slice(0, 10);
    const label = getDaysLeftLabel(iso);
    const m = label.match(/^Còn (\d+) ngày$/);
    assert.ok(m, `unexpected label: ${label}`);
    // Allow ±1 to absorb the UTC-midnight vs local-midnight boundary.
    const days = Number(m![1]);
    assert.ok(days >= 9 && days <= 11, `expected ~10 days, got ${days}`);
  });

  it('returns empty string for null / invalid', () => {
    assert.equal(getDaysLeftLabel(null), '');
    assert.equal(getDaysLeftLabel('garbage'), '');
  });
});

describe('getJobTranslation', () => {
  it('returns the matching-locale translation', () => {
    const job = makeJob({
      translations: [
        { languages_code: 'vi', title: 'VI', summary: null, description: null, requirements: null, benefits: null },
        { languages_code: 'en', title: 'EN', summary: null, description: null, requirements: null, benefits: null }
      ]
    });
    assert.equal(getJobTranslation(job, 'en').title, 'EN');
    assert.equal(getJobTranslation(job, 'vi').title, 'VI');
  });

  it('falls back to the first translation when locale is missing', () => {
    const job = makeJob({
      translations: [
        { languages_code: 'vi', title: 'VI', summary: null, description: null, requirements: null, benefits: null }
      ]
    });
    assert.equal(getJobTranslation(job, 'ja').title, 'VI');
  });

  it('falls back to the base title when no translations exist', () => {
    const job = makeJob({ translations: [], title: 'Base title' });
    const t = getJobTranslation(job, 'vi');
    assert.equal(t.title, 'Base title');
    assert.equal(t.summary, null);
  });
});

describe('buildJobDetailVM', () => {
  it('maps base + translated fields with computed labels', () => {
    const vm = buildJobDetailVM(makeJob(), 'vi');
    assert.equal(vm.id, 1);
    assert.equal(vm.slug, 'bd-01');
    assert.equal(vm.code, 'BD-01');
    assert.equal(vm.title, 'Chuyên viên Phát triển Kinh doanh');
    assert.equal(vm.summary, 'Tóm tắt vi');
    assert.equal(vm.description, '<p>Mô tả</p>');
    assert.equal(vm.requirements, '<ul><li>Yêu cầu</li></ul>');
    assert.equal(vm.benefits, '<ul><li>Quyền lợi</li></ul>');
    assert.equal(vm.location, 'Hà Nam');
    assert.equal(vm.salaryRange, '15 - 20 triệu');
    assert.equal(vm.employmentTypeLabel, 'Toàn thời gian');
    assert.equal(vm.departmentLabel, 'Kinh doanh');
    assert.equal(vm.deadline, '2026-10-31');
    assert.equal(vm.deadlineDate, '31/10/2026');
    assert.equal(vm.isUrgent, true);
  });

  it('prefers the base title when the locale translation lacks one', () => {
    const job = makeJob({ title: 'Base', translations: [] });
    assert.equal(buildJobDetailVM(job, 'vi').title, 'Base');
  });
});

describe('toJobCardVM', () => {
  it('produces a compact card view-model', () => {
    const card = toJobCardVM(makeJob(), 'vi');
    assert.deepEqual(card, {
      slug: 'bd-01',
      title: 'Chuyên viên Phát triển Kinh doanh',
      location: 'Hà Nam',
      employmentTypeLabel: 'Toàn thời gian',
      salaryRange: '15 - 20 triệu'
    });
  });
});
