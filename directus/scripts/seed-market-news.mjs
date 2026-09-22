/**
 * Seed dedicated "Market News" (Tin tức thị trường) blog_posts so the
 * ResourcesNews section ("Cập nhật xu hướng và diễn biến mới nhất") on the
 * home + /industries hub pages is DB-backed instead of hardcoded i18n text.
 *
 * Each seeded post is marked with:
 *   - category = 'market-news'   → the filter the frontend uses to pull ONLY
 *                                  these items into the news section.
 *   - badge    = localized label ("Tin thị trường" / "Market News" / "市場ニュース")
 *                                → the visible "nhãn để phân biệt" on each card.
 *
 * Bodies carry 4 localized <h2> sections so the detail page renders a TOC.
 *
 * Safe & idempotent: matches by slug; existing rows are patched, missing ones
 * are created. Re-running does not duplicate.
 *
 * Run: cd directus && node scripts/seed-market-news.mjs
 */
import { readItems, createItem, updateItem } from '@directus/sdk';
import { createDirectusClient, loginAdmin } from '../lib/config.mjs';

const LOCALES = ['vi', 'en', 'ja'];

const BADGE = { vi: 'Tin thị trường', en: 'Market News', ja: '市場ニュース' };

// Reusable local cover/avatar assets already shipped in the frontend.
const COVERS = [
  '/images/home/news/image (9).png',
  '/images/home/news/image (10).png',
  '/images/home/news/image (11).png',
  '/images/home/news/news4_eco.jpg'
];
const AVATARS = [
  '/images/home/section5/image (2).png',
  '/images/home/section5/image (4).png',
  '/images/home/section5/image (1).png',
  '/images/home/section5/image (3).png'
];

function esc(s) {
  return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Build a structured, TOC-friendly body from a short description.
function buildBody(loc, desc) {
  const H = {
    vi: ['1. Bối cảnh thị trường', '2. Tác động tới doanh nghiệp', '3. Khuyến nghị từ ULink'],
    en: ['1. Market Context', '2. Impact on Businesses', '3. ULink Recommendations'],
    ja: ['1. 市場の背景', '2. 企業への影響', '3. ULinkからの提言']
  }[loc];
  const F = {
    vi: [
      'Diễn biến gần đây trên thị trường vật tư công nghiệp đang tạo ra những thay đổi đáng chú ý về giá, nguồn cung và tiêu chuẩn chất lượng.',
      'Các doanh nghiệp sản xuất và xuất khẩu cần chủ động điều chỉnh kế hoạch mua hàng, tồn kho và lựa chọn nhà cung ứng để giữ ổn định chi phí.',
      'ULink khuyến nghị chuẩn hóa danh mục vật tư đạt chứng nhận, ưu tiên nhà cung ứng có hồ sơ CO/CQ đầy đủ và năng lực giao hàng ổn định.'
    ],
    en: [
      'Recent movements in the industrial materials market are driving notable shifts in pricing, supply availability, and quality standards.',
      'Manufacturers and exporters should proactively adjust purchasing plans, inventory levels, and supplier selection to keep costs stable.',
      'ULink recommends standardizing a certified material portfolio and prioritizing suppliers with full CO/CQ documentation and reliable delivery.'
    ],
    ja: [
      '産業資材市場の最近の動きは、価格・供給・品質基準に顕著な変化をもたらしています。',
      'メーカーと輸出企業は、コスト安定のために調達計画・在庫・サプライヤー選定を積極的に見直す必要があります。',
      'ULinkは、認証済み資材の標準化と、CO/CQ書類が揃い安定供給できるサプライヤーの優先を推奨します。'
    ]
  }[loc];

  const intro = desc ? `<p>${esc(desc)}</p>\n` : '';
  const body = H.map((h, i) => `<h2>${esc(h)}</h2>\n<p>${esc(F[i])}</p>`).join('\n');
  return intro + body;
}

// 6 market-news items. published_at spaced a few days apart (newest first).
const ITEMS = [
  {
    slug: 'market-news-thep-cong-nghiep-q3-2026',
    author: 'Nguyễn Minh Hải',
    author_role: 'Chuyên gia Vật tư Công nghiệp',
    date: '2026-09-18',
    tr: {
      vi: { title: 'Giá thép & vật tư cơ khí biến động quý III/2026: doanh nghiệp ứng phó ra sao', description: 'Cập nhật xu hướng giá thép, inox và vật tư cơ khí HVAC trong quý III cùng khuyến nghị mua hàng cho nhà máy.' },
      en: { title: 'Steel & mechanical material prices in Q3/2026: how businesses respond', description: 'An update on steel, stainless and HVAC mechanical material price trends in Q3, with purchasing guidance for plants.' },
      ja: { title: '2026年第3四半期の鋼材・機械資材価格の変動と企業の対応', description: '第3四半期の鋼材・ステンレス・HVAC機械資材の価格動向と工場向け調達提言。' }
    }
  },
  {
    slug: 'market-news-tieu-chuan-xuat-khau-eu-2026',
    author: 'Trần Thu Hương',
    author_role: 'Cố vấn Tuân thủ & Chứng nhận',
    date: '2026-09-12',
    tr: {
      vi: { title: 'Siết tiêu chuẩn xuất khẩu EU 2026: yêu cầu mới về hồ sơ CO/CQ và truy xuất nguồn gốc', description: 'Những thay đổi về quy định nhập khẩu của EU và cách chuẩn bị hồ sơ vật tư để không bị gián đoạn đơn hàng.' },
      en: { title: 'Tighter EU export standards 2026: new CO/CQ and traceability requirements', description: 'Changes in EU import regulations and how to prepare material documentation to avoid order disruptions.' },
      ja: { title: '2026年EU輸出基準の強化：CO/CQ書類とトレーサビリティの新要件', description: 'EU輸入規制の変更と、受注の中断を避けるための資材書類の準備方法。' }
    }
  },
  {
    slug: 'market-news-nguon-cung-dien-tu-ban-dan-2026',
    author: 'Lê Quốc Anh',
    author_role: 'Chuyên gia Chuỗi cung ứng Điện tử',
    date: '2026-09-06',
    tr: {
      vi: { title: 'Nguồn cung linh kiện điện tử & bán dẫn 2026: tín hiệu phục hồi và rủi ro còn lại', description: 'Bức tranh cung – cầu linh kiện điện tử, tác động tới các nhà máy FDI và chiến lược đặt hàng an toàn.' },
      en: { title: 'Electronics & semiconductor supply 2026: recovery signals and remaining risks', description: 'The electronic component supply–demand picture, impact on FDI plants and safe ordering strategies.' },
      ja: { title: '2026年の電子部品・半導体供給：回復の兆しと残るリスク', description: '電子部品の需給状況、FDI工場への影響、安全な発注戦略。' }
    }
  },
  {
    slug: 'market-news-kho-lanh-logistics-2026',
    author: 'Phạm Ngọc Bích',
    author_role: 'Chuyên gia Kho vận & Chuỗi lạnh',
    date: '2026-08-30',
    tr: {
      vi: { title: 'Xu hướng kho lạnh & logistics 2026: đầu tư hạ tầng và tối ưu vật tư bảo ôn', description: 'Nhu cầu kho lạnh tăng cao thúc đẩy đầu tư panel, cách nhiệt và thiết bị – cơ hội cho nhà máy thực phẩm.' },
      en: { title: 'Cold storage & logistics trends 2026: infrastructure investment and insulation materials', description: 'Rising cold-storage demand drives panel, insulation and equipment investment — an opportunity for food plants.' },
      ja: { title: '2026年の冷蔵倉庫・物流トレンド：インフラ投資と断熱資材の最適化', description: '冷蔵需要の高まりがパネル・断熱・設備投資を促進、食品工場にとっての好機。' }
    }
  },
  {
    slug: 'market-news-vat-tu-gmp-duoc-pham-2026',
    author: 'Đỗ Hà Vy',
    author_role: 'Chuyên gia GMP & Phòng sạch',
    date: '2026-08-24',
    tr: {
      vi: { title: 'Vật tư đạt GMP cho dược phẩm & mỹ phẩm 2026: chuẩn phòng sạch ngày càng khắt khe', description: 'Cập nhật yêu cầu vật tư phòng sạch, tiêu chuẩn GMP mới và cách rút ngắn thời gian qua kiểm toán.' },
      en: { title: 'GMP-grade materials for pharma & cosmetics 2026: stricter cleanroom standards', description: 'An update on cleanroom material requirements, new GMP standards and how to shorten audit lead times.' },
      ja: { title: '2026年の医薬・化粧品向けGMP資材：厳格化するクリーンルーム基準', description: 'クリーンルーム資材要件、新GMP基準、監査時間短縮の方法を更新。' }
    }
  },
  {
    slug: 'market-news-noi-that-go-xuat-khau-2026',
    author: 'Vũ Thành Nam',
    author_role: 'Chuyên gia Ngành Gỗ & Nội thất',
    date: '2026-08-18',
    tr: {
      vi: { title: 'Ngành gỗ & nội thất xuất khẩu 2026: nguyên liệu bền vững và chứng chỉ FSC lên ngôi', description: 'Xu hướng nguyên vật liệu gỗ đạt chứng chỉ, yêu cầu bền vững từ thị trường Mỹ – EU và khuyến nghị cung ứng.' },
      en: { title: 'Wood & furniture exports 2026: sustainable materials and FSC certification rise', description: 'Trends in certified wood materials, sustainability requirements from US–EU markets and sourcing guidance.' },
      ja: { title: '2026年の木材・家具輸出：持続可能な資材とFSC認証の台頭', description: '認証木材資材の動向、米・EU市場の持続可能性要件、調達提言。' }
    }
  }
];

async function findBySlug(client, slug) {
  const rows = await client.request(
    readItems('blog_posts', {
      filter: { slug: { _eq: slug } },
      fields: ['id', 'category', 'translations.id', 'translations.languages_code'],
      limit: 1
    })
  );
  return rows?.[0] || null;
}

async function main() {
  const client = createDirectusClient();
  await loginAdmin(client);
  console.log('🔑 Authenticated with Directus\n');

  let created = 0;
  let patched = 0;

  for (let i = 0; i < ITEMS.length; i++) {
    const item = ITEMS[i];
    const cover = COVERS[i % COVERS.length];
    const avatar = AVATARS[i % AVATARS.length];
    const publishedAt = `${item.date}T09:00:00`;

    const translations = LOCALES.map((loc) => ({
      languages_code: loc,
      title: item.tr[loc].title,
      description: item.tr[loc].description,
      body: buildBody(loc, item.tr[loc].description),
      badge: BADGE[loc],
      meta_title: item.tr[loc].title,
      meta_description: item.tr[loc].description
    }));

    const existing = await findBySlug(client, item.slug);

    if (existing) {
      // Patch parent fields + upsert each language translation.
      const trById = new Map((existing.translations || []).map((t) => [t.languages_code, t.id]));
      const update = [];
      const create = [];
      for (const tr of translations) {
        const id = trById.get(tr.languages_code);
        if (id) update.push({ id, ...tr });
        else create.push(tr);
      }
      await client.request(
        updateItem('blog_posts', existing.id, {
          category: 'market-news',
          badge: BADGE.vi,
          cover,
          author: item.author,
          author_role: item.author_role,
          author_avatar: avatar,
          status: 'published',
          published_at: publishedAt,
          translations: { update, create, delete: [] }
        })
      );
      console.log(`   ♻  ${item.slug} → patched (market-news)`);
      patched++;
    } else {
      await client.request(
        createItem('blog_posts', {
          slug: item.slug,
          category: 'market-news',
          badge: BADGE.vi,
          cover,
          author: item.author,
          author_role: item.author_role,
          author_avatar: avatar,
          status: 'published',
          published_at: publishedAt,
          is_featured: false,
          translations
        })
      );
      console.log(`   ✅ ${item.slug} → created (market-news)`);
      created++;
    }
  }

  console.log(`\n✅ Done. created=${created}, patched=${patched}, total=${ITEMS.length}`);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e?.errors ?? e);
    process.exit(1);
  });
