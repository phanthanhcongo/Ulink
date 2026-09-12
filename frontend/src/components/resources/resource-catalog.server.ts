import { readItems } from '@directus/sdk';
import { publicDirectus } from '@/lib/directus';
import { MOCK_RESOURCES, MOST_VIEWED_ARTICLES } from './mock-data';
import { ResourceItem } from './types';

const CASE_STUDIES_MAP: Record<string, ResourceItem> = {
  'hvac-office-building': {
    id: 'hvac-office-building',
    category: 'case-study',
    badge: { vi: 'Tòa nhà thương mại', en: 'Commercial Building', ja: '商業ビル' },
    title: {
      vi: 'Hệ thống HVAC tòa nhà văn phòng cao cấp',
      en: 'High-End Office Building HVAC System',
      ja: '高級オフィスビルHVACシステム'
    },
    description: {
      vi: 'Ứng dụng băng dính nhôm lưới gia cường bọc cách nhiệt hệ chiller, đảm bảo tuổi thọ đường ống trên 15 năm mà không bong tróc.',
      en: 'Applying mesh-reinforced aluminum tape to chiller insulation, ensuring pipe lifespan over 15 years without peeling.',
      ja: 'チラーシステム断熱に補強アルミテープを使用し、剥がれることなく15年以上の耐久性を確保。'
    },
    date: 'Tháng 12, 2025',
    image: '/images/industries/construction/usecase_1.png',
    author: {
      name: { vi: 'ULINK M&E Engineering', en: 'ULINK M&E Engineering', ja: 'ULINK M&E Engineering' },
      role: { vi: 'Chuyên gia HVAC', en: 'HVAC Specialist', ja: 'HVAC専門家' },
      avatar: '/images/about/op-team.webp'
    },
    readTime: { vi: '6 phút đọc', en: '6 min read', ja: '6分' },
    sections: [
      {
        id: 'sec-hvac-1',
        num: '1.',
        title: {
          vi: 'Bối cảnh dự án & Yêu cầu cách nhiệt hệ thống Chiller',
          en: 'Project Context & Chiller Insulation Requirements',
          ja: 'プロジェクトの背景とチラー断熱の要件'
        },
        content: {
          vi: 'Các tòa nhà văn phòng hạng A đòi hỏi hệ thống điều hòa trung tâm Chiller hoạt động liên tục 24/7 với áp suất lớn và chênh lệch nhiệt độ cao.\n\nViệc đọng sương (condensation) hoặc bong tróc lớp bảo ôn tại các mối nối đường ống tôn mạ kẽm sẽ gây hư hỏng hệ thống trần thạch cao và thất thoát năng lượng nghiêm trọng.',
          en: 'Grade-A office buildings require 24/7 Chiller operations with high pressure differential.\n\nCondensation or tape peeling at duct joints can severely damage ceiling structures and cause significant energy loss.',
          ja: 'グレードAオフィスビルは24時間365日の高圧・高温度差でのチラー運用を必要とします。\n\nダクト接続部での結露やテープの剥がれは、天井構造を損ない、重大なエネルギー損失を引き起こします。'
        }
      },
      {
        id: 'sec-hvac-2',
        num: '2.',
        title: {
          vi: 'Giải pháp Băng keo nhôm lưới gia cường FSK ULINK',
          en: 'ULINK FSK Reinforced Aluminum Tape Solution',
          ja: 'ULINK FSK補強アルミテープソリューション'
        },
        content: {
          vi: 'ULINK đã tư vấn sử dụng băng keo nhôm FSK gia cường sợi thủy tinh với lớp keo acrylic chịu nhiệt từ -30°C đến +120°C.\n\nMàng nhôm nguyên chất kết hợp lưới sợi gia cường giúp tăng khả năng chịu lực kéo, chống xé rách và bám dính tuyệt đối trên bề mặt bông cách nhiệt Glasswool.',
          en: 'ULINK recommended fiberglass-reinforced FSK aluminum tape with high-tack acrylic adhesive rated from -30°C to +120°C.\n\nPure aluminum foil combined with reinforcing mesh increases tensile strength and eliminates tearing on Glasswool insulation.',
          ja: 'ULINKは、-30°Cから+120°Cに対応するアクリル粘着剤付きグラスファイバー補強FSKアルミテープを提案しました。\n\n補強メッシュ付き純アルミ箔が引張強度を高め、グラスウール断熱材への優れた bám dính を củng cố します。'
        },
        alertText: {
          vi: 'Kết quả: Tiết kiệm 12% điện năng tiêu thụ cho hệ Chiller và bảo hành độ bền màng dính trên 15 năm.',
          en: 'Result: 12% energy saving for Chiller system and 15+ years adhesive warranty.',
          ja: '成果：チラーシステムの消費電力を12%削減し、15年以上の粘着耐久性を保証。'
        }
      }
    ]
  },
  'fdi-electronics-plant': {
    id: 'fdi-electronics-plant',
    category: 'case-study',
    badge: { vi: 'Khu công nghiệp', en: 'Industrial Park', ja: '工業団地' },
    title: {
      vi: 'Nhà máy sản xuất điện tử FDI quy mô lớn tại Việt Nam',
      en: 'Large-Scale FDI Electronics Manufacturing Plant',
      ja: 'ベトナムの大規模FDI電子製造工場'
    },
    description: {
      vi: 'Cung ứng đồng bộ băng keo nhôm FSK ngăn ẩm tuyệt đối cho hệ thống ống cấp gió sạch phòng máy, vượt qua các đợt kiểm tra chất lượng FDI nghiêm ngặt.',
      en: 'Synchronized supply of 100% moisture-barrier FSK aluminum tape for cleanroom supply ducts, passing strict FDI quality audits.',
      ja: 'クリーンルーム送風ダクト用に完全防湿FSKアルミテープを同期供給し、厳格なFDI品質検査に合格。'
    },
    date: 'Tháng 01, 2026',
    image: '/images/industries/construction/usecase_2.png',
    author: {
      name: { vi: 'ULINK Technical Advisory', en: 'ULINK Technical Advisory', ja: 'ULINK Technical Advisory' },
      role: { vi: 'Kỹ sư dự án FDI', en: 'FDI Project Engineer', ja: 'FDIプロジェクトエンジニア' },
      avatar: '/images/about/op-team.webp'
    },
    readTime: { vi: '7 phút đọc', en: '7 min read', ja: '7分' },
    sections: [
      {
        id: 'sec-fdi-1',
        num: '1.',
        title: {
          vi: 'Yêu cầu kiểm soát độ ẩm & Cấp sạch sản xuất linh kiện',
          en: 'Moisture Control & Cleanliness for Electronics Fabs',
          ja: '電子部品製造における湿度管理と清浄度要件'
        },
        content: {
          vi: 'Dây chuyền lắp ráp bán dẫn và mạch điện tử đòi hỏi môi trường phòng sạch ISO Class 5 với độ ẩm kiểm soát nghiêm ngặt dưới 45% RH.\n\nBất kỳ sự rò rỉ hơi ẩm nào từ ống gió HVAC cũng có thể gây oxy hóa vi mạch và đe dọa tỷ lệ sản phẩm lỗi (Yield rate).',
          en: 'Semiconductor assembly lines require ISO Class 5 cleanrooms with humidity strictly below 45% RH.\n\nAny moisture leakage from HVAC ducts risks microchip oxidation and damages yield rates.',
          ja: '半導体実装ラインは、湿度45% RH以下に厳格管理されたISOクラス5クリーンルームを必要とします。\n\nHVACダクトからのわずかな湿気漏れもマイクロチップの酸化を引き起こします。'
        }
      },
      {
        id: 'sec-fdi-2',
        num: '2.',
        title: {
          vi: 'Giải pháp cấp hàng hỏa tốc & Kiểm định chứng nhận CO/CQ',
          en: 'Express Supply & Full CO/CQ Quality Certification',
          ja: '特急供給とCO/CQ品質認証の完全対応'
        },
        content: {
          vi: 'ULINK đã giao 20.000 cuộn băng keo nhôm FSK trong 48h từ Tổng kho Hà Nam, kèm đầy đủ chứng nhận RoHS và báo cáo test bám dính quốc tế.\n\nHệ thống ống gió được nghiệm thu 100% đạt chuẩn không rò rỉ khí.',
          en: 'ULINK delivered 20,000 FSK tape rolls within 48 hours from Ha Nam Hub, accompanied by RoHS and test reports.\n\n100% duct air-tightness verification passed.',
          ja: 'ULINKはハナムハブから48時間以内に20,000巻のFSKテープを納品し、RoHSおよび品質テストレポートを添付しました。'
        }
      }
    ]
  },
  'hospital-cleanroom': {
    id: 'hospital-cleanroom',
    category: 'case-study',
    badge: { vi: 'Bệnh viện & Lab', en: 'Hospital & Lab', ja: '病院＆ラボ' },
    title: {
      vi: 'Bệnh viện quốc tế & Phòng sạch vô trùng',
      en: 'International Hospital & Cleanroom',
      ja: '国際病院＆無菌クリーンルーム'
    },
    description: {
      vi: 'Bịt kín ống thông gió phòng mổ áp lực âm bằng băng keo nhôm chuẩn chống khuẩn RoHS, tuyệt đối không tạo bụi bẩn, không mùi dung môi hữu cơ.',
      en: 'Sealing negative pressure operating room ventilation ducts with RoHS antibacterial aluminum tape, zero dust and solvent odor.',
      ja: 'RoHS抗菌アルミテープで陰圧手術室の換気ダクトを密閉し、粉塵や有機溶剤臭の発生をゼロに抑制。'
    },
    date: 'Tháng 02, 2026',
    image: '/images/industries/construction/usecase_3.png',
    author: {
      name: { vi: 'ULINK Medical Solutions', en: 'ULINK Medical Solutions', ja: 'ULINK Medical Solutions' },
      role: { vi: 'Chuyên gia Y tế & Vi sinh', en: 'Biomedical Specialist', ja: '生物医療専門家' },
      avatar: '/images/about/op-team.webp'
    },
    readTime: { vi: '5 phút đọc', en: '5 min read', ja: '5分' },
    sections: [
      {
        id: 'sec-hosp-1',
        num: '1.',
        title: {
          vi: 'Yêu cầu vô trùng tuyệt đối trong phòng mổ áp lực âm',
          en: 'Sterility Standards in Negative Pressure Operating Rooms',
          ja: '陰圧手術室における絶対的な無菌基準'
        },
        content: {
          vi: 'Phòng mổ áp lực âm tiêu chuẩn quốc tế cần đảm bảo hệ thống thông khí HEPA khép kín hoàn toàn, ngăn chặn chéo vi khuẩn và bào tử nấm.\n\nVật tư băng keo dán phải tuyệt đối không phát sinh VOC (hợp chất hữu cơ bay hơi) ảnh hưởng sức khỏe bệnh nhân.',
          en: 'Negative pressure operating rooms demand 100% sealed HEPA air ducts to prevent bacterial cross-contamination.\n\nTape materials must emit zero VOCs.',
          ja: '陰圧手術室は細菌の交差汚染を防ぐため100%密閉されたHEPAダクトを必要とします。テープ資材はVOC発生ゼロでなければなりません。'
        }
      },
      {
        id: 'sec-hosp-2',
        num: '2.',
        title: {
          vi: 'Ứng dụng Băng keo nhôm y tế ULINK đạt chuẩn RoHS',
          en: 'Application of ULINK RoHS Medical Aluminum Tape',
          ja: 'RoHS適合ULINK医療用アルミテープの応用'
        },
        content: {
          vi: 'Sản phẩm băng keo nhôm ULINK đáp ứng chứng nhận an toàn y tế, màng nhôm không gỉ sét, keo không mùi và bề mặt nhẵn mịn chống bám vi khuẩn.',
          en: 'ULINK aluminum tape complies with medical safety standards, rust-proof foil, odorless adhesive, and antibacterial smooth surface.',
          ja: 'ULINKアルミテープは医療安全規格に適合し、防錆アルミ箔、無臭粘着剤、抗菌滑らかな表面を備えています。'
        }
      }
    ]
  }
};

export async function loadResourceCatalog() {
  const caseStudiesList = Object.values(CASE_STUDIES_MAP);
  return [...caseStudiesList, ...MOCK_RESOURCES, ...MOST_VIEWED_ARTICLES];
}

export async function loadResourceBySlug(slug: string) {
  const lowerSlug = (slug || '').toLowerCase().trim();

  // Direct lookup from explicit case studies map
  if (CASE_STUDIES_MAP[lowerSlug]) {
    return CASE_STUDIES_MAP[lowerSlug];
  }

  // Keyword matchers for case studies
  if (lowerSlug.includes('hvac') || lowerSlug.includes('office') || lowerSlug.includes('văn-phòng') || lowerSlug.includes('van-phong')) {
    return CASE_STUDIES_MAP['hvac-office-building'];
  }
  if (lowerSlug.includes('fdi') || lowerSlug.includes('electronics') || lowerSlug.includes('điện-tử') || lowerSlug.includes('dien-tu')) {
    return CASE_STUDIES_MAP['fdi-electronics-plant'];
  }
  if (lowerSlug.includes('hospital') || lowerSlug.includes('cleanroom') || lowerSlug.includes('bệnh-viện') || lowerSlug.includes('benh-vien')) {
    return CASE_STUDIES_MAP['hospital-cleanroom'];
  }

  const catalog = await loadResourceCatalog();

  // Exact match by ID in full catalog
  let found = catalog.find((item) => item.id.toLowerCase() === lowerSlug);
  if (found) return found;

  // Fallback by index e.g. case-1 -> catalog[0]
  const numMatch = lowerSlug.match(/\d+/);
  if (numMatch) {
    const idx = parseInt(numMatch[0], 10) - 1;
    if (idx >= 0 && idx < catalog.length) {
      return catalog[idx];
    }
  }

  return catalog[0] || null;
}
