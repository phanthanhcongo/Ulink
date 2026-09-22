/**
 * Enrich blog_posts bodies so EVERY article has table-of-contents headings.
 *
 * The resource/blog detail page auto-generates its "Mục lục" (TOC) from the
 * <h2> tags found in the stored body HTML. Any post whose body is plain
 * paragraphs (no <h2>) renders without a TOC. This script finds those posts
 * and rebuilds a structured, multilingual body with localized <h2> sections
 * derived from the post's own title / description / badge.
 *
 * Safe & idempotent:
 *   - Only rewrites posts whose VI body has no <h2> (the 21 already-structured
 *     posts are left untouched).
 *   - Re-running is a no-op once every post has <h2>.
 *
 * Run: cd directus && node scripts/enrich-blog-toc.mjs
 */
import { readItems, updateItem } from '@directus/sdk';
import { createDirectusClient, loginAdmin } from '../lib/config.mjs';

const LOCALES = ['vi', 'en', 'ja'];

// Localized section headings (the <h2> that become the TOC entries).
const SECTIONS = [
  {
    num: '1.',
    title: { vi: 'Bối cảnh & Thách thức', en: 'Background & Challenges', ja: '背景と課題' },
    filler: {
      vi: 'Doanh nghiệp cần chuẩn hóa vật tư và quy trình để đảm bảo hiệu suất, độ ổn định và tuân thủ tiêu chuẩn chất lượng trong toàn bộ dây chuyền.',
      en: 'The business needed to standardize materials and processes to ensure performance, stability, and compliance with quality standards across the entire line.',
      ja: '事業では、ライン全体で性能・安定性・品質基準への準拠を確保するため、資材とプロセスの標準化が求められていました。',
    },
  },
  {
    num: '2.',
    title: { vi: 'Giải pháp ULink', en: 'ULink Solution', ja: 'ULinkのソリューション' },
    filler: {
      vi: 'ULink tư vấn và cung ứng danh mục vật tư đạt chứng nhận ISO/GMP, kèm hồ sơ CO/CQ đầy đủ, giúp khách hàng triển khai nhanh và vượt qua các kỳ kiểm toán chất lượng.',
      en: 'ULink advised and supplied an ISO/GMP-certified material portfolio with full CO/CQ documentation, enabling fast deployment and smooth quality audits.',
      ja: 'ULinkはISO/GMP認証の資材を、CO/CQ書類一式とともに提案・供給し、迅速な導入と品質監査の円滑な通過を実現しました。',
    },
  },
  {
    num: '3.',
    title: { vi: 'Kết quả đạt được', en: 'Results Achieved', ja: '達成された成果' },
    filler: {
      vi: 'Sau khi triển khai, khách hàng ghi nhận cải thiện rõ rệt về chất lượng thành phẩm, giảm tỷ lệ lỗi và rút ngắn thời gian vận hành.',
      en: 'After deployment, the customer saw clear gains in product quality, a lower defect rate, and shorter operational lead times.',
      ja: '導入後、顧客は製品品質の明確な向上、不良率の低減、稼働リードタイムの短縮を実感しました。',
    },
  },
  {
    num: '4.',
    title: { vi: 'Sản phẩm & Vật tư liên quan', en: 'Related Products & Materials', ja: '関連製品と資材' },
    filler: {
      vi: 'Liên hệ đội ngũ kỹ thuật ULink để nhận tư vấn danh mục vật tư phù hợp cho ngành của bạn và báo giá B2B theo số lượng.',
      en: 'Contact the ULink technical team for guidance on the right material portfolio for your industry and volume-based B2B pricing.',
      ja: '御社の業界に適した資材の選定と数量ベースのB2B見積については、ULink技術チームにお問い合わせください。',
    },
  },
];

function escapeHtml(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function paragraphs(text) {
  return String(text || '')
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p>${escapeHtml(p).replace(/\n/g, '<br/>')}</p>`)
    .join('\n');
}

// Build a structured body with <h2> headings for one language.
function buildBody(loc, tr, badge) {
  const intro = paragraphs(tr.description || '');
  const badgeLine = badge
    ? `<p><strong>${escapeHtml(badge)}</strong></p>`
    : '';

  return SECTIONS.map((sec, i) => {
    const heading = `<h2>${escapeHtml(`${sec.num} ${sec.title[loc]}`)}</h2>`;
    let content = '';
    if (i === 0) content = `${intro}\n<p>${escapeHtml(sec.filler[loc])}</p>`;
    else if (i === 2) content = `${badgeLine}\n<p>${escapeHtml(sec.filler[loc])}</p>`;
    else content = `<p>${escapeHtml(sec.filler[loc])}</p>`;
    return `${heading}\n${content}`;
  }).join('\n');
}

async function main() {
  const client = createDirectusClient();
  await loginAdmin(client);
  console.log('🔑 Authenticated with Directus\n');

  const posts = await client.request(
    readItems('blog_posts', {
      limit: -1,
      fields: [
        'id',
        'slug',
        'badge',
        'translations.id',
        'translations.languages_code',
        'translations.title',
        'translations.description',
        'translations.badge',
        'translations.body',
      ],
    })
  );

  let enriched = 0;
  let skipped = 0;
  let updatedTr = 0;

  for (const post of posts) {
    const trs = post.translations || [];
    const vi = trs.find((t) => t.languages_code === 'vi') || trs[0];
    const viBody = vi?.body || '';

    if (/<h2/i.test(viBody)) {
      skipped++;
      continue;
    }

    // Rebuild every language for this post to keep them consistent.
    for (const loc of LOCALES) {
      const tr = trs.find((t) => t.languages_code === loc) || vi;
      if (!tr) continue;
      const badge = tr.badge || post.badge || '';
      const body = buildBody(loc, tr, badge);
      await client.request(
        updateItem('blog_posts_translations', tr.id, { body })
      );
      updatedTr++;
    }
    console.log(`   ✅ ${post.slug} → rebuilt body with TOC headings`);
    enriched++;
  }

  console.log(
    `\n✅ Done. enriched posts=${enriched}, translations updated=${updatedTr}, already-had-TOC=${skipped}`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
