import type { ResourceItem, Section, TranslatedString } from './types';
import type { ResourceData } from './resource-detail-client';

export function getResourceSlug(resource: Pick<ResourceItem, 'id'> | string) {
  const id = typeof resource === 'string' ? resource : resource.id;
  return id.toLowerCase();
}

export function getResourceHref(resource: Pick<ResourceItem, 'id'> & { category?: string }) {
  if (resource.category === 'event') {
    return `/resources/events/${getResourceSlug(resource)}`;
  }
  return `/resources/${getResourceSlug(resource)}`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderParagraphs(value: string) {
  return escapeHtml(value).replace(/\n/g, '<br />');
}

function renderTranslatedText(item: TranslatedString, locale: 'vi' | 'en' | 'ja') {
  return item[locale];
}

function renderSection(section: Section, locale: 'vi' | 'en' | 'ja') {
  const content = renderParagraphs(section.content[locale]);
  const alert = section.alertText
    ? `
      <div class="mt-4 rounded-2xl border border-blue-100 bg-blue-50/60 p-4">
        <p class="text-body-regular leading-relaxed text-slate-700">${renderParagraphs(section.alertText[locale])}</p>
      </div>
    `
    : '';

  return `
    <section class="space-y-4">
      <h2 class="text-card-title font-bold text-slate-900">${escapeHtml(`${section.num} ${section.title[locale]}`)}</h2>
      <div class="prose prose-slate max-w-none text-body-regular leading-7 text-slate-600">
        <p>${content}</p>
      </div>
      ${alert}
    </section>
  `;
}

function getDefaultSections(resource: ResourceItem): Section[] {
  const d = resource.description;
  return [
    {
      id: 'sec-overview',
      num: '1.',
      title: {
        vi: 'Tổng quan & Khái niệm cơ bản',
        en: 'Overview & Fundamental Concepts',
        ja: '概要と基本概念'
      },
      content: {
        vi: `${d.vi}\n\nTrong bối cảnh sản xuất công nghiệp hiện đại, việc nắm vững quy chuẩn kỹ thuật và các yếu tố vận hành cốt lõi đóng vai trò tiên quyết đảm bảo hiệu suất và chất lượng thành phẩm.`,
        en: `${d.en}\n\nIn modern industrial manufacturing, mastering technical standards and core operational factors is essential to ensuring efficiency and product quality.`,
        ja: `${d.ja}\n\n現代の産業製造において、技術基準と中核となる運用要因を習得することは、効率性と製品品質を確保するために不可欠です。`
      }
    },
    {
      id: 'sec-standards',
      num: '2.',
      title: {
        vi: 'Quy chuẩn kỹ thuật & Tiêu chuẩn áp dụng',
        en: 'Technical Standards & Applicable Specifications',
        ja: '技術基準と適用規格'
      },
      content: {
        vi: `Các tiêu chuẩn quốc tế quy định nghiêm ngặt về độ sạch, giới hạn vi hạt và chất lượng vật tư đưa vào môi trường sản xuất.\n\nULink cung cấp danh mục sản phẩm đạt chứng nhận ISO và GMP quốc tế, giúp doanh nghiệp chuẩn hóa quy trình và vượt qua các kỳ kiểm toán chất lượng.`,
        en: `International standards strictly regulate cleanliness levels, particle limits, and material quality in production environments.\n\nULink provides ISO and GMP certified products, helping enterprises standardize workflows and pass quality audits smoothly.`,
        ja: `国際規格は、製造環境における清浄度、微粒子制限、および資材の品質を厳格に規定しています。\n\nULinkは国際的なISOおよびGMP認定製品を提供し、企業がプロセスを標準化し、品質監査をスムーズにクリアできるようサポートします。`
      },
      alertText: {
        vi: 'Lưu ý: Luôn kiểm tra chứng nhận CO/CQ và kết quả thử nghiệm trước khi áp dụng vật tư vào dây chuyền sản xuất chính.',
        en: 'Note: Always verify CO/CQ certifications and test reports before introducing materials into main production lines.',
        ja: '注意：資材をメインの生産ラインに導入する前に、常にCO/CQ認証および試験レポートを確認してください。'
      }
    },
    {
      id: 'sec-solutions',
      num: '3.',
      title: {
        vi: 'Tiêu chí lựa chọn & Giải pháp vận hành',
        en: 'Selection Criteria & Operational Solutions',
        ja: '選定基準と運用ソリューション'
      },
      content: {
        vi: `Khi lựa chọn trang thiết bị và vật tư, nhà quản lý cần xem xét tổng thể chi phí vòng đời, độ bền chống tĩnh điện và khả năng tương thích với quy trình sản xuất hiện tại.\n\nĐội ngũ kỹ sư ULink sẵn sàng khảo sát thực tế và tư vấn giải pháp tối ưu cho từng nhà máy.`,
        en: `When choosing equipment and supplies, managers must evaluate total lifecycle costs, ESD performance, and system compatibility.\n\nULink engineering team is ready to conduct field surveys and consult tailored solutions for your facility.`,
        ja: `機器や資材を選択する際、管理者はお手元のライフサイクルコスト、ESD耐性性能、および既存システムとの互換性を総合的に評価する必要があります。\n\nULinkエンジニアチームは現地調査を実施し、貴社工場に合わせた最適なソリューションを提案します。`
      }
    },
    {
      id: 'sec-recommendations',
      num: '4.',
      title: {
        vi: 'Ứng dụng thực tế & Khuyến nghị ULink',
        en: 'Practical Application & ULink Recommendations',
        ja: '実践的応用とULinkの推奨事項'
      },
      content: {
        vi: `Áp dụng quy trình vận hành chuẩn kết hợp bảo trì định kỳ giúp kéo dài tuổi thọ thiết bị, duy trì cấp độ sạch ổn định và tối ưu hóa ngân sách vận hành dài hạn.`,
        en: `Adopting standardized procedures and routine maintenance extends equipment lifespan, maintains stable cleanliness levels, and optimizes long-term operational budget.`,
        ja: `標準運用手順の適用と定期的なメンテナンスにより、機器の寿命が延び、安定した清浄度が維持され、長期的な運用予算が最適化されます。`
      }
    }
  ];
}

export function resourceToDetailData(
  resource: ResourceItem,
  locale: 'vi' | 'en' | 'ja'
): ResourceData {
  const summaryBullets = resource.aiSummary?.bullets ?? [];
  const fallbackIntro =
    locale === 'vi'
      ? 'Tài liệu này đang được cập nhật nội dung chi tiết. Vui lòng liên hệ đội ngũ ULink để nhận bản đầy đủ hoặc tài liệu liên quan.'
      : locale === 'ja'
        ? 'この資料は現在詳細コンテンツを更新中です。完全版または関連資料についてはULinkチームまでお問い合わせください。'
        : 'This document is being updated with more detailed content. Please contact the ULink team for the full version or related materials.';
  const intro =
    resource.aiSummary?.intro?.[locale] || resource.description[locale] || fallbackIntro;
  const highlights = summaryBullets.map((bullet) => bullet[locale]).filter(Boolean);

  const effectiveSections =
    resource.sections && resource.sections.length > 0
      ? resource.sections
      : getDefaultSections(resource);

  const sectionsHtml = effectiveSections.map((section) => renderSection(section, locale)).join('');

  const summaryHtml =
    intro || highlights.length > 0
      ? `
        <section class="space-y-4">
          <h2 class="text-card-title font-bold text-slate-900">${escapeHtml(
            locale === 'vi' ? 'Tóm tắt nhanh' : locale === 'ja' ? '要約' : 'Quick summary'
          )}</h2>
          ${intro ? `<p class="text-body-regular leading-7 text-slate-600">${renderParagraphs(intro)}</p>` : ''}
          ${
            highlights.length > 0
              ? `<ul class="space-y-2 text-body-regular leading-6 text-slate-600">${highlights
                  .map((item) => `<li>• ${escapeHtml(item)}</li>`)
                  .join('')}</ul>`
              : ''
          }
        </section>
      `
      : '';

  const metaHtml = `
    <section class="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <h2 class="text-card-title font-bold text-slate-900">${escapeHtml(
        locale === 'vi' ? 'Thông tin tài liệu' : locale === 'ja' ? '資料情報' : 'Document details'
      )}</h2>
      <dl class="grid grid-cols-1 gap-3 text-body-regular text-slate-600 sm:grid-cols-2">
        <div>
          <dt class="font-semibold text-slate-500">${escapeHtml(
            locale === 'vi' ? 'Ngày đăng' : locale === 'ja' ? '公開日' : 'Published'
          )}</dt>
          <dd>${escapeHtml(resource.date)}</dd>
        </div>
        <div>
          <dt class="font-semibold text-slate-500">${escapeHtml(
            locale === 'vi' ? 'Thời gian đọc' : locale === 'ja' ? '読了目安' : 'Read time'
          )}</dt>
          <dd>${escapeHtml(resource.readTime[locale])}</dd>
        </div>
        <div>
          <dt class="font-semibold text-slate-500">${escapeHtml(
            locale === 'vi' ? 'Tác giả' : locale === 'ja' ? '著者' : 'Author'
          )}</dt>
          <dd>${escapeHtml(resource.author.name[locale])}</dd>
        </div>
        <div>
          <dt class="font-semibold text-slate-500">${escapeHtml(
            locale === 'vi' ? 'Nhóm nội dung' : locale === 'ja' ? 'カテゴリ' : 'Category'
          )}</dt>
          <dd>${escapeHtml(resource.badge[locale])}</dd>
        </div>
      </dl>
    </section>
  `;

  return {
    slug: getResourceSlug(resource),
    type:
      resource.category === 'standard' || resource.contentType === 'certificate'
        ? 'doc'
        : resource.category === 'case-study'
          ? 'case-study'
          : 'news',
    category: renderTranslatedText(resource.badge, locale),
    title: renderTranslatedText(resource.title, locale),
    description: renderTranslatedText(resource.description, locale),
    date: resource.date,
    author: renderTranslatedText(resource.author.name, locale),
    readTime: renderTranslatedText(resource.readTime, locale),
    coverImage: resource.image,
    contentHtml: [metaHtml, summaryHtml, sectionsHtml].join(''),
    highlights,
    sections: effectiveSections.map((sec) => ({
      id: sec.id,
      num: sec.num,
      title: renderTranslatedText(sec.title, locale),
      content: renderTranslatedText(sec.content, locale),
      alertText: sec.alertText ? renderTranslatedText(sec.alertText, locale) : undefined
    })),
    aiSummary: resource.aiSummary
      ? {
          intro: renderTranslatedText(resource.aiSummary.intro, locale),
          bullets: resource.aiSummary.bullets.map((b) => renderTranslatedText(b, locale)).filter(Boolean)
        }
      : {
          intro: renderTranslatedText(
            {
              vi: `Bài viết "${resource.title.vi}" cung cấp cái nhìn toàn diện về ${resource.description.vi}`,
              en: `The article "${resource.title.en}" provides a comprehensive analysis of ${resource.description.en}`,
              ja: `記事「${resource.title.ja}」は${resource.description.ja}の包括的な分析を提供します`
            },
            locale
          ),
          bullets: [
            locale === 'vi' ? 'Phân tích chi tiết quy chuẩn & tiêu chuẩn áp dụng' : locale === 'ja' ? '適用規格と標準の詳細分析' : 'Detailed breakdown of standards & regulations',
            locale === 'vi' ? 'Hướng dẫn lựa chọn vật tư và thiết bị tối ưu' : locale === 'ja' ? '最適資材・機器選定ガイド' : 'Guide to selecting optimal supplies & equipment',
            locale === 'vi' ? 'Giải pháp phòng tránh sự cố và tối ưu hóa vận hành' : locale === 'ja' ? 'トラブル防止と運用最適化ソリューション' : 'Solutions for risk prevention & operational optimization'
          ]
        },
    audioDuration: resource.audioDuration || '3:45',
    audioSecs: resource.audioSecs || 225,
    pdfUrl: resource.downloadUrl,
    pdfSize: resource.size || '1.2 MB',
    authorRole: renderTranslatedText(resource.author.role, locale),
    authorAvatar: resource.author.avatar || '/images/about/op-team.webp'
  };
}
