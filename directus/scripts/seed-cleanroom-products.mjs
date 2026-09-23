/**
 * Seed thêm sản phẩm Vật tư Phòng sạch (idempotent).
 *
 * Bổ sung sản phẩm cho các subcategory phòng sạch còn trống
 * (quần áo, khẩu trang, dụng cụ vệ sinh) và thêm vào găng tay / vải lau / thảm.
 *
 * - Idempotent theo slug (product) và sku_code (SKU): chạy lại không tạo trùng.
 * - hero lưu path frontend dạng /images/... theo đúng ràng buộc dự án.
 * - Tạo bản dịch vi/en/ja và link M2M industries.
 *
 * Run: cd directus && node scripts/seed-cleanroom-products.mjs
 */

import { readItems, createItem } from '@directus/sdk';
import { createDirectusClient, loginAdmin } from '../lib/config.mjs';
import { createEnsureHelpers } from '../lib/ensure-helpers.mjs';

const IMG = '/images/solutions/product/phongSach';

// Industries liên quan phòng sạch (link nếu tồn tại)
const CLEANROOM_INDUSTRIES = ['duoc-pham', 'dien-tu', 'thuc-pham'];

/**
 * Mỗi product:
 *  categorySlug, slug, vi{...}, en{...}, ja{...}, imagePath,
 *  specifications, sku{ sku_code, unit, pack_size, price, moq, moq_unit, stock_status }
 */
const PRODUCTS = [
  {
    categorySlug: 'quan-ao-phong-sach',
    slug: 'ao-lien-quan-phong-sach-class-1000',
    imagePath: `${IMG}/tham-phong-sach.png`,
    brand: 'ULink',
    specifications: { class: 'ISO Class 6 (Class 1000)', material: 'Polyester 99% + Carbon 1%', size: 'S–XXL', color: 'Trắng' },
    vi: {
      name: 'Áo liền quần phòng sạch Class 1000',
      short_description: 'Áo liền quần (coverall) vải polyester dệt lưới chống tĩnh điện, dùng cho phòng sạch ISO Class 6, có mũ trùm và bo tay chân.',
      meta_title: 'Áo liền quần phòng sạch Class 1000 | ULink',
      meta_description: 'Coverall phòng sạch ISO Class 6, vải polyester chống tĩnh điện, đủ size S–XXL.',
    },
    en: {
      name: 'Cleanroom Coverall Class 1000',
      short_description: 'Anti-static polyester mesh coverall for ISO Class 6 cleanrooms, with attached hood and elastic cuffs.',
      meta_title: 'Cleanroom Coverall Class 1000 | ULink',
      meta_description: 'ISO Class 6 cleanroom coverall, anti-static polyester, sizes S–XXL.',
    },
    ja: {
      name: 'クリーンルーム用カバーオール Class 1000',
      short_description: 'ISO Class 6 クリーンルーム向け帯電防止ポリエステルメッシュ製カバーオール。フード・袖口ゴム付き。',
      meta_title: 'クリーンルーム用カバーオール Class 1000 | ULink',
      meta_description: 'ISO Class 6 対応、帯電防止ポリエステル、S〜XXL サイズ。',
    },
    sku: { sku_code: 'PS-COVERALL-1000', unit: 'bộ', pack_size: '1 bộ', price: 95000, moq: 500, moq_unit: 'bộ', stock_status: 'in_stock' },
  },
  {
    categorySlug: 'quan-ao-phong-sach',
    slug: 'mu-trum-dau-phong-sach',
    imagePath: `${IMG}/khan-lau-phong-sach-wiper.png`,
    brand: 'ULink',
    specifications: { type: 'Bouffant', material: 'PP không dệt', color: 'Trắng / Xanh', usage: 'Dùng một lần' },
    vi: {
      name: 'Mũ trùm đầu phòng sạch (Bouffant)',
      short_description: 'Mũ trùm đầu vải không dệt PP, dùng một lần, ngăn tóc và bụi rơi vào khu vực sản xuất phòng sạch.',
      meta_title: 'Mũ trùm đầu phòng sạch Bouffant | ULink',
      meta_description: 'Mũ trùm đầu PP không dệt dùng một lần cho phòng sạch, ngăn bụi và tóc.',
    },
    en: {
      name: 'Cleanroom Bouffant Hood',
      short_description: 'Disposable PP non-woven bouffant hood preventing hair and particles from entering cleanroom areas.',
      meta_title: 'Cleanroom Bouffant Hood | ULink',
      meta_description: 'Disposable PP non-woven bouffant hood for cleanrooms.',
    },
    ja: {
      name: 'クリーンルーム用ブフーントキャップ',
      short_description: '使い捨て PP 不織布キャップ。毛髪や微粒子のクリーンルームへの混入を防止。',
      meta_title: 'クリーンルーム用キャップ | ULink',
      meta_description: 'クリーンルーム向け使い捨て PP 不織布キャップ。',
    },
    sku: { sku_code: 'PS-BOUFFANT-001', unit: 'cái', pack_size: '1 cái', price: 1500, moq: 20000, moq_unit: 'cái', stock_status: 'in_stock' },
  },
  {
    categorySlug: 'khau-trang-phong-sach',
    slug: 'khau-trang-phong-sach-3-lop',
    imagePath: `${IMG}/khan-lau-phong-sach-wiper.png`,
    brand: 'ULink',
    specifications: { layers: '3 lớp', filtration: 'BFE ≥ 95%', material: 'Non-woven + Meltblown', usage: 'Dùng một lần' },
    vi: {
      name: 'Khẩu trang phòng sạch 3 lớp',
      short_description: 'Khẩu trang 3 lớp lọc khuẩn BFE ≥ 95%, ít xơ bụi, phù hợp môi trường phòng sạch điện tử và dược phẩm.',
      meta_title: 'Khẩu trang phòng sạch 3 lớp | ULink',
      meta_description: 'Khẩu trang phòng sạch 3 lớp BFE ≥ 95%, ít xơ bụi cho phòng sạch.',
    },
    en: {
      name: '3-Ply Cleanroom Face Mask',
      short_description: 'Low-lint 3-ply mask with BFE ≥ 95% filtration, suitable for electronics and pharma cleanrooms.',
      meta_title: '3-Ply Cleanroom Face Mask | ULink',
      meta_description: 'Low-lint 3-ply cleanroom mask, BFE ≥ 95%.',
    },
    ja: {
      name: 'クリーンルーム用3層マスク',
      short_description: '低発塵の3層マスク、BFE ≥ 95%。電子・医薬品クリーンルームに最適。',
      meta_title: 'クリーンルーム用3層マスク | ULink',
      meta_description: '低発塵の3層クリーンルームマスク、BFE ≥ 95%。',
    },
    sku: { sku_code: 'PS-MASK3PLY-001', unit: 'cái', pack_size: 'Hộp 50 cái', price: 800, moq: 50000, moq_unit: 'cái', stock_status: 'in_stock' },
  },
  {
    categorySlug: 'khau-trang-phong-sach',
    slug: 'khau-trang-phong-sach-n95',
    imagePath: `${IMG}/khan-lau-phong-sach-wiper.png`,
    brand: 'ULink',
    specifications: { standard: 'N95 / NIOSH', filtration: '≥ 95% @ 0.3µm', shape: 'Cup', usage: 'Dùng một lần' },
    vi: {
      name: 'Khẩu trang phòng sạch N95',
      short_description: 'Khẩu trang N95 lọc ≥ 95% hạt 0.3µm, ôm khít khuôn mặt, dùng cho phòng sạch cấp cao và khu vực kiểm soát bụi mịn.',
      meta_title: 'Khẩu trang phòng sạch N95 | ULink',
      meta_description: 'Khẩu trang N95 lọc ≥ 95% hạt 0.3µm cho phòng sạch cấp cao.',
    },
    en: {
      name: 'N95 Cleanroom Respirator',
      short_description: 'N95 respirator filtering ≥ 95% of 0.3µm particles, snug fit, for high-grade cleanrooms and fine-dust control.',
      meta_title: 'N95 Cleanroom Respirator | ULink',
      meta_description: 'N95 respirator, ≥ 95% filtration at 0.3µm, for high-grade cleanrooms.',
    },
    ja: {
      name: 'クリーンルーム用 N95 マスク',
      short_description: '0.3µm 粒子を 95% 以上ろ過する N95 マスク。高グレードクリーンルーム・微粉塵管理に。',
      meta_title: 'クリーンルーム用 N95 マスク | ULink',
      meta_description: '0.3µm 粒子 95% 以上ろ過の N95 マスク。',
    },
    sku: { sku_code: 'PS-MASKN95-001', unit: 'cái', pack_size: 'Hộp 20 cái', price: 6500, moq: 10000, moq_unit: 'cái', stock_status: 'in_stock' },
  },
  {
    categorySlug: 'gang-tay-phong-sach',
    slug: 'gang-tay-nitrile-khong-bot-class-100',
    imagePath: `${IMG}/gang-tay-nitrile-class-1000.png`,
    brand: 'ULink',
    specifications: { class: 'ISO Class 5 (Class 100)', material: 'Nitrile không bột', length: '300mm', color: 'Trắng' },
    vi: {
      name: 'Găng tay nitrile không bột Class 100',
      short_description: 'Găng tay nitrile không bột, dài 300mm, độ sạch ISO Class 5, xử lý bề mặt ít ion cho phòng sạch điện tử và bán dẫn.',
      meta_title: 'Găng tay nitrile không bột Class 100 | ULink',
      meta_description: 'Găng tay nitrile không bột ISO Class 5 cho phòng sạch điện tử, bán dẫn.',
    },
    en: {
      name: 'Powder-Free Nitrile Gloves Class 100',
      short_description: 'Powder-free nitrile gloves, 300mm, ISO Class 5 cleanliness, low-ion treated for electronics and semiconductor cleanrooms.',
      meta_title: 'Powder-Free Nitrile Gloves Class 100 | ULink',
      meta_description: 'Powder-free ISO Class 5 nitrile gloves for electronics and semiconductor cleanrooms.',
    },
    ja: {
      name: 'パウダーフリーニトリル手袋 Class 100',
      short_description: 'パウダーフリーニトリル手袋、300mm、ISO Class 5。低イオン処理で電子・半導体クリーンルーム向け。',
      meta_title: 'パウダーフリーニトリル手袋 Class 100 | ULink',
      meta_description: '電子・半導体クリーンルーム向け ISO Class 5 パウダーフリーニトリル手袋。',
    },
    sku: { sku_code: 'PS-GTNCL100-001', unit: 'pcs', pack_size: '1 pcs', price: 2800, moq: 50000, moq_unit: 'pcs', stock_status: 'in_stock' },
  },
  {
    categorySlug: 'vai-lau-phong-sach',
    slug: 'giay-lau-phong-sach-microfiber',
    imagePath: `${IMG}/khan-lau-phong-sach-wiper.png`,
    brand: 'ULink',
    specifications: { material: 'Microfiber polyester 100%', size: '23x23cm', edge: 'Cắt laser', usage: 'Giặt tái sử dụng' },
    vi: {
      name: 'Giấy lau phòng sạch Microfiber',
      short_description: 'Khăn lau microfiber cắt laser không xơ, siêu thấm hút, dùng lau bề mặt và thiết bị trong phòng sạch.',
      meta_title: 'Giấy lau phòng sạch Microfiber | ULink',
      meta_description: 'Khăn microfiber cắt laser không xơ cho phòng sạch, siêu thấm hút.',
    },
    en: {
      name: 'Microfiber Cleanroom Wiper',
      short_description: 'Laser-cut, lint-free microfiber wiper with high absorbency for cleaning surfaces and equipment in cleanrooms.',
      meta_title: 'Microfiber Cleanroom Wiper | ULink',
      meta_description: 'Laser-cut lint-free microfiber cleanroom wiper, high absorbency.',
    },
    ja: {
      name: 'マイクロファイバークリーンルームワイパー',
      short_description: 'レーザーカットの低発塵マイクロファイバーワイパー。高吸水性で表面・機器の清掃に。',
      meta_title: 'マイクロファイバーワイパー | ULink',
      meta_description: 'レーザーカット低発塵マイクロファイバーワイパー、高吸水性。',
    },
    sku: { sku_code: 'PS-WIPERMF-001', unit: 'cái', pack_size: 'Túi 50 cái', price: 3200, moq: 20000, moq_unit: 'cái', stock_status: 'in_stock' },
  },
  {
    categorySlug: 'tham-dinh-bui',
    slug: 'tham-dinh-bui-24x36',
    imagePath: `${IMG}/tham-phong-sach.png`,
    brand: 'ULink',
    specifications: { size: '24" x 36"', layers: '30 lớp/tập', color: 'Trắng / Xanh', usage: 'Bóc từng lớp' },
    vi: {
      name: 'Thảm dính bụi 24" x 36"',
      short_description: 'Thảm dính bụi 30 lớp keo, kích thước 24x36 inch, đặt tại cửa ra vào phòng sạch để giữ bụi từ đế giày.',
      meta_title: 'Thảm dính bụi 24x36 | ULink',
      meta_description: 'Thảm dính bụi 30 lớp 24x36 inch cho cửa ra vào phòng sạch.',
    },
    en: {
      name: 'Sticky Mat 24" x 36"',
      short_description: '30-layer adhesive sticky mat, 24x36 inch, placed at cleanroom entrances to trap dust from shoe soles.',
      meta_title: 'Sticky Mat 24x36 | ULink',
      meta_description: '30-layer 24x36 inch sticky mat for cleanroom entrances.',
    },
    ja: {
      name: '粘着マット 24" x 36"',
      short_description: '30層粘着マット、24x36インチ。クリーンルーム入口に設置し靴底のホコリを捕集。',
      meta_title: '粘着マット 24x36 | ULink',
      meta_description: 'クリーンルーム入口用 30層粘着マット 24x36インチ。',
    },
    sku: { sku_code: 'PS-STICKY2436-001', unit: 'tập', pack_size: '1 tập 30 lớp', price: 180000, moq: 300, moq_unit: 'tập', stock_status: 'in_stock' },
  },
  {
    categorySlug: 'dung-cu-ve-sinh',
    slug: 'cay-lau-nha-phong-sach',
    imagePath: `${IMG}/tham-phong-sach.png`,
    brand: 'ULink',
    specifications: { head: 'Microfiber tháo rời', handle: 'Nhôm anod hóa', width: '40cm', usage: 'Giặt hấp tiệt trùng' },
    vi: {
      name: 'Cây lau nhà phòng sạch',
      short_description: 'Cây lau sàn phòng sạch đầu microfiber tháo rời, cán nhôm không gỉ, chịu được hóa chất khử trùng và hấp tiệt trùng.',
      meta_title: 'Cây lau nhà phòng sạch | ULink',
      meta_description: 'Cây lau sàn phòng sạch đầu microfiber, cán nhôm, chịu hóa chất khử trùng.',
    },
    en: {
      name: 'Cleanroom Floor Mop',
      short_description: 'Cleanroom floor mop with removable microfiber head and anodized aluminum handle, resistant to disinfectants and autoclaving.',
      meta_title: 'Cleanroom Floor Mop | ULink',
      meta_description: 'Cleanroom floor mop, removable microfiber head, disinfectant-resistant.',
    },
    ja: {
      name: 'クリーンルーム用モップ',
      short_description: '着脱式マイクロファイバーヘッドとアルマイトアルミ柄のクリーンルーム用モップ。消毒剤・オートクレーブ対応。',
      meta_title: 'クリーンルーム用モップ | ULink',
      meta_description: '着脱式マイクロファイバーヘッド、消毒剤対応のクリーンルームモップ。',
    },
    sku: { sku_code: 'PS-MOP-001', unit: 'bộ', pack_size: '1 bộ', price: 320000, moq: 100, moq_unit: 'bộ', stock_status: 'in_stock' },
  },
];

async function main() {
  const client = createDirectusClient();
  await loginAdmin(client);
  const helpers = createEnsureHelpers(client);

  // Lookup category id theo slug
  const cats = await client.request(readItems('product_categories', { fields: ['id', 'slug'], limit: -1 }));
  const catIdMap = Object.fromEntries(cats.map((c) => [c.slug, c.id]));

  // Lookup industry id theo slug
  const inds = await client.request(readItems('industries', { fields: ['id', 'slug'], limit: -1 }));
  const indIdMap = Object.fromEntries(inds.map((i) => [i.slug, i.id]));
  const industryIds = CLEANROOM_INDUSTRIES.map((s) => indIdMap[s]).filter(Boolean);

  let created = 0;
  let skipped = 0;

  for (const p of PRODUCTS) {
    const categoryId = catIdMap[p.categorySlug];
    if (!categoryId) {
      console.warn(`⚠  Missing category [${p.categorySlug}] — skip ${p.slug}`);
      continue;
    }

    // 1) Product (base = VI). hero lưu path /images/...
    const existingBefore = await client.request(
      readItems('products', { filter: { slug: { _eq: p.slug } }, fields: ['id'], limit: 1 })
    );
    const productId = await helpers.ensureItem('products', 'slug', {
      name: p.vi.name,
      slug: p.slug,
      status: 'published',
      brand: p.brand,
      category: categoryId,
      hero: p.imagePath,
      short_description: p.vi.short_description,
      specifications: p.specifications,
      meta_title: p.vi.meta_title,
      meta_description: p.vi.meta_description,
    });
    if (existingBefore.length > 0) skipped++; else created++;

    // 2) Translations en / ja (VI đã nằm trong product base)
    for (const lang of ['en', 'ja']) {
      const t = p[lang];
      await helpers.ensureTranslation('products', productId, lang, {
        name: t.name,
        short_description: t.short_description,
        meta_title: t.meta_title,
        meta_description: t.meta_description,
      });
    }

    // 3) SKU chính (idempotent theo sku_code)
    const s = p.sku;
    await helpers.ensureItem('product_skus', 'sku_code', {
      sku_code: s.sku_code,
      product: productId,
      status: 'published',
      unit: s.unit,
      pack_size: s.moq ? `MOQ: ${s.moq} ${s.moq_unit || s.unit || ''}`.trim() : s.pack_size,
      price: s.price ?? null,
      stock_status: s.stock_status || 'in_stock',
    });

    // 4) Link M2M industries (bỏ qua nếu đã có)
    for (const industriesId of industryIds) {
      const existLink = await client.request(
        readItems('products_industries', {
          filter: { products_id: { _eq: productId }, industries_id: { _eq: industriesId } },
          fields: ['id'],
          limit: 1,
        })
      );
      if (existLink.length === 0) {
        await client.request(createItem('products_industries', { products_id: productId, industries_id: industriesId }));
      }
    }
  }

  console.log(`\n✅ Done. products created=${created}, skipped=${skipped}, total processed=${PRODUCTS.length}`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('❌ Seed failed:', err?.errors ?? err);
    process.exit(1);
  });
