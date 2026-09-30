import { translations } from './translation_data.mjs';

async function seedTranslations(helpers, collection, sourceId, key) {
  const data = translations[collection]?.[key];
  if (!data) return;
  if (data.vi) {
    await helpers.ensureTranslation(collection, sourceId, 'vi', data.vi);
  }
  if (data.en) {
    await helpers.ensureTranslation(collection, sourceId, 'en', data.en);
  }
  if (data.ja) {
    await helpers.ensureTranslation(collection, sourceId, 'ja', data.ja);
  }
}

export async function seedAdditionalContent(helpers, ids, geography) {
  // Partners
  await helpers.ensureItem('partners', 'name', {
    name: '3M',
    url: 'https://www.3m.com',
    sort: 1,
    status: 'published'
  });

  await helpers.ensureItem('partners', 'name', {
    name: 'Kimberly-Clark Professional',
    url: 'https://www.kcprofessional.com',
    sort: 2,
    status: 'published'
  });

  await helpers.ensureItem('partners', 'name', {
    name: 'Ansell',
    url: 'https://www.ansell.com',
    sort: 3,
    status: 'published'
  });

  await helpers.ensureItem('partners', 'name', {
    name: 'Contec',
    url: 'https://www.contecinc.com',
    sort: 4,
    status: 'published'
  });

  // Pages
  await helpers.ensureItem('pages', 'slug', {
    title: 'Về chúng tôi',
    slug: 'about-us',
    body: '<p>ULink là nền tảng phân phối vật tư phòng sạch và bao bì công nghiệp hàng đầu cho doanh nghiệp FDI tại Việt Nam. Chúng tôi kết nối nhà sản xuất với nguồn cung ứng chất lượng cao thông qua hệ thống logistics thông minh và đội ngũ kỹ thuật chuyên sâu.</p>',
    meta_title: 'Về ULink — Nền tảng cung ứng B2B',
    meta_description: 'Tìm hiểu về ULink, đối tác phân phối vật tư phòng sạch và bao bì công nghiệp cho FDI tại Việt Nam.',
    status: 'published'
  });

  await helpers.ensureItem('pages', 'slug', {
    title: 'Chính sách bảo mật',
    slug: 'privacy-policy',
    body: '<p>ULink cam kết bảo vệ thông tin cá nhân của khách hàng theo quy định pháp luật Việt Nam và tiêu chuẩn quốc tế.</p>',
    meta_title: 'Chính sách bảo mật | ULink',
    meta_description: 'Chính sách bảo mật và xử lý dữ liệu cá nhân của ULink B2B Platform.',
    status: 'published'
  });

  await helpers.ensureItem('pages', 'slug', {
    title: 'Điều khoản sử dụng',
    slug: 'terms-of-service',
    body: '<p>Bằng việc sử dụng nền tảng ULink, bạn đồng ý tuân thủ các điều khoản và điều kiện sau đây.</p>',
    meta_title: 'Điều khoản sử dụng | ULink',
    meta_description: 'Điều khoản và điều kiện sử dụng nền tảng ULink B2B.',
    status: 'published'
  });

  // RFQ assignment rules
  await helpers.ensureItem('rfq_assignment_rules', 'id', {
    id: 1,
    hub: ids.hubId,
    industry: null,
    assigned_sales: null,
    priority: 0,
    is_default: true
  });

  // Job openings / Careers
  const jobSeeds = [
    {
      slug: 'bd-01',
      code: 'BD-01',
      department: 'kinh-doanh',
      location: 'Hà Nam',
      employment_type: 'full_time',
      salary_range: '15 - 20 triệu',
      is_urgent: true,
      deadline: '2026-10-31',
      sort: 1,
      status: 'published',
      title: 'Chuyên viên Phát triển Kinh doanh',
      summary: 'Tìm kiếm và phát triển khách hàng doanh nghiệp B2B trong lĩnh vực vật tư công nghiệp.',
      description: '<p>Phát triển thị trường và chăm sóc khách hàng doanh nghiệp tại khu vực Hà Nam và lân cận.</p>',
      requirements: '<ul><li>Tối thiểu 1 năm kinh nghiệm bán hàng B2B.</li><li>Kỹ năng giao tiếp và đàm phán tốt.</li></ul>',
      benefits: '<ul><li>Lương cứng + hoa hồng hấp dẫn.</li><li>Bảo hiểm đầy đủ theo luật.</li></ul>'
    },
    {
      slug: 'pe-03',
      code: 'PE-03',
      department: 'ky-thuat',
      location: 'Hà Nam',
      employment_type: 'full_time',
      salary_range: '18 - 25 triệu',
      is_urgent: false,
      deadline: '2026-10-29',
      sort: 2,
      status: 'published',
      title: 'Kỹ sư Dự án (Project Engineer)',
      summary: 'Quản lý và triển khai các dự án cung ứng vật tư cho khách hàng công nghiệp.',
      description: '<p>Chịu trách nhiệm khảo sát, tư vấn giải pháp kỹ thuật và triển khai dự án.</p>',
      requirements: '<ul><li>Tốt nghiệp chuyên ngành kỹ thuật.</li><li>Kinh nghiệm quản lý dự án là lợi thế.</li></ul>',
      benefits: '<ul><li>Cơ hội đào tạo và phát triển chuyên môn.</li><li>Môi trường làm việc chuyên nghiệp.</li></ul>'
    },
    {
      slug: 'sce-02',
      code: 'SCE-02',
      department: 'chuoi-cung-ung',
      location: 'Hà Nội',
      employment_type: 'full_time',
      salary_range: '12 - 18 triệu',
      is_urgent: false,
      deadline: '2026-11-05',
      sort: 3,
      status: 'published',
      title: 'Chuyên viên Chuỗi cung ứng (Supply Chain Executive)',
      summary: 'Điều phối và tối ưu hoạt động chuỗi cung ứng, tồn kho và logistics.',
      description: '<p>Lập kế hoạch cung ứng, quản lý tồn kho và phối hợp với các hub khu vực.</p>',
      requirements: '<ul><li>Kinh nghiệm về logistics / supply chain.</li><li>Thành thạo Excel và các công cụ phân tích.</li></ul>',
      benefits: '<ul><li>Chế độ phúc lợi toàn diện.</li><li>Lộ trình thăng tiến rõ ràng.</li></ul>'
    }
  ];

  for (const job of jobSeeds) {
    const { title, summary, description, requirements, benefits, ...base } = job;
    const jobId = await helpers.ensureItem('job_openings', 'slug', { ...base, title });
    await helpers.ensureTranslation('job_openings', jobId, 'vi', {
      title,
      summary,
      description,
      requirements,
      benefits
    });
  }
}
