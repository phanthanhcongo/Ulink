import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const LOCALES = ['vi', 'en', 'ja'] as const;
type Locale = typeof LOCALES[number];

function pick(obj: any, loc: Locale): string {
  if (!obj) return '';
  return (obj[loc] || obj.vi || obj.en || obj.ja || '').toString();
}

function sqlStr(str: any): string {
  if (str === null || str === undefined) return 'NULL';
  return `'${String(str).replace(/'/g, "''")}'`;
}

function sqlJson(obj: any): string {
  if (obj === null || obj === undefined) return `'[]'::jsonb`;
  return `'${JSON.stringify(obj).replace(/'/g, "''")}'::jsonb`;
}

interface SeedArticle {
  id: string;
  category: 'guide' | 'standard' | 'case-study' | 'market-news' | 'news' | 'event';
  badge: { vi: string; en: string; ja: string };
  title: { vi: string; en: string; ja: string };
  description: { vi: string; en: string; ja: string };
  date: string;
  image: string;
  author: {
    name: { vi: string; en: string; ja: string };
    role: { vi: string; en: string; ja: string };
    avatar: string;
  };
  sections?: Array<{
    title: { vi: string; en: string; ja: string };
    content: { vi: string; en: string; ja: string };
    alertText?: { vi: string; en: string; ja: string };
  }>;
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function buildBody(item: SeedArticle, loc: Locale): string {
  const desc = pick(item.description, loc);
  if (item.sections && item.sections.length > 0) {
    const parts: string[] = [];
    if (desc) parts.push(`<p>${escapeHtml(desc)}</p>`);
    for (const sec of item.sections) {
      const title = pick(sec.title, loc);
      const content = pick(sec.content, loc);
      if (title) parts.push(`<h2>${escapeHtml(title)}</h2>`);
      if (content) {
        for (const para of content.split(/\n\n+/)) {
          parts.push(`<p>${escapeHtml(para).replace(/\n/g, '<br/>')}</p>`);
        }
      }
      const alert = sec.alertText ? pick(sec.alertText, loc) : '';
      if (alert) parts.push(`<blockquote>${escapeHtml(alert)}</blockquote>`);
    }
    return parts.join('\n');
  }
  return desc ? `<p>${escapeHtml(desc)}</p>` : '';
}

// ============================================================================
// 1. CẨM NANG KỸ THUẬT (guide) - 6 bài
// ============================================================================
const GUIDES: SeedArticle[] = [
  {
    id: 'guide-esd-control-smt',
    category: 'guide',
    badge: { vi: 'Cẩm nang kỹ thuật', en: 'Technical Guide', ja: '技術ガイド' },
    title: {
      vi: 'Hướng dẫn kiểm soát phóng tĩnh điện (ESD) trong dây chuyền sản xuất SMT',
      en: 'Guide to Electrostatic Discharge (ESD) Control in SMT Assembly Lines',
      ja: 'SMT実装ラインにおける静電気放電（ESD）管理ガイド'
    },
    description: {
      vi: 'Quy trình toàn diện về tiếp địa phòng sạch, kiểm soát độ ẩm và lựa chọn găng tay, nhíp gắp, thảm bàn thao tác đạt chuẩn ANSI/ESD S20.20.',
      en: 'Comprehensive procedure for cleanroom grounding, humidity control, and selection of ESD-safe gloves, tweezers, and matting under ANSI/ESD S20.20.',
      ja: 'ANSI/ESD S20.20規格に基づくクリーンルーム接地、湿度管理、ESD対応手袋・ピンセット・作業マットの選定ガイド。'
    },
    date: '15/02/2026',
    image: '/images/resources/autohtml/thumb1.png',
    author: {
      name: { vi: 'Kỹ sư Đỗ Minh Tuấn', en: 'Tuấn Đỗ, Senior ESD Engineer', ja: 'トゥアン・ドー（ESD主任エンジニア）' },
      role: { vi: 'Chuyên gia ESD S20.20', en: 'ESD S20.20 Specialist', ja: 'ESD S20.20専門家' },
      avatar: '/images/about/op-team.webp'
    },
    sections: [
      {
        title: {
          vi: '1. Rủi ro tĩnh điện trong sản xuất vi mạch bán dẫn',
          en: '1. Electrostatic Risks in Semiconductor Manufacturing',
          ja: '1. 半導体製造における静電気リスク'
        },
        content: {
          vi: 'Sự phóng điện tĩnh dù chỉ vài chục Volt cũng có thể phá hủy cấu trúc cổng silicon của vi xử lý.\n\nThiệt hại do ESD thường không phát hiện được bằng mắt thường mà tạo ra các lỗi tiềm ẩn (latent defects) làm suy giảm tuổi thọ linh kiện.',
          en: 'Electrostatic discharge of just tens of volts can destroy microchip silicon gate structures.\n\nESD damages often remain invisible to optical inspection, creating latent defects that degrade product lifespan.',
          ja: 'わずか数十ボルトの静電気放電でもマイクロチップのシリコンゲート構造を破壊する可能性があります。'
        }
      },
      {
        title: {
          vi: '2. Các biện pháp bảo vệ và tiếp địa hiệu quả',
          en: '2. Protection Measures and Grounding Best Practices',
          ja: '2. 保護対策と効果的な接地手法'
        },
        content: {
          vi: 'Sử dụng thảm trải bàn cao su chống tĩnh điện 2 lớp với điện trở bề mặt 10^6 - 10^9 Ohm.\n\nMỗi vị trí thao tác phải trang bị dây đeo cổ tay tiếp đất liên tục có tích hợp điện trở an toàn 1 MegaOhm.',
          en: 'Use 2-layer ESD rubber table mats with surface resistivity of 10^6 - 10^9 Ohms.\n\nEach workstation must feature continuous grounding wrist straps with integrated 1 MegaOhm safety resistors.',
          ja: '表面抵抗率10^6〜10^9オームの2層ESDゴムマットを使用し、各作業台に1メグオーム抵抗内蔵のリストストラップを装備します。'
        },
        alertText: {
          vi: 'Khuyến nghị: Kiểm tra định kỳ độ ẩm nhà xưởng trong khoảng 45% - 60% RH để giảm thiểu ma sát tạo điện thế.',
          en: 'Recommendation: Maintain plant humidity at 45% - 60% RH to minimize friction charges.',
          ja: '推奨：摩擦帯電を最小限に抑えるため、工場内の湿度を45%〜60% RHに維持してください。'
        }
      }
    ]
  },
  {
    id: 'guide-fragile-packaging-export',
    category: 'guide',
    badge: { vi: 'Cẩm nang kỹ thuật', en: 'Technical Guide', ja: '技術ガイド' },
    title: {
      vi: 'Cẩm nang đóng gói hàng dễ vỡ xuất khẩu đường biển & hàng không',
      en: 'Handbook for Fragile Goods Packaging in Ocean & Air Freight',
      ja: '海上・航空貨物における壊れやすい製品の梱包ハンドブック'
    },
    description: {
      vi: 'Kỹ thuật chèn lót túi khí chèn hàng (dunnage air bag), màng xốp khí bóng khí và cố định kiện pallet chịu tải gia tốc rung lắc đường dài.',
      en: 'Techniques for dunnage air bags, air bubble cushioning, and pallet securing to withstand long-haul transit vibration and acceleration.',
      ja: '長距離輸送の振動や衝撃に耐えるダンネージエアバッグ、気泡緩衝材、パレット固定技術。'
    },
    date: '10/02/2026',
    image: '/images/resources/autohtml/thumb6.png',
    author: {
      name: { vi: 'ULINK Packaging Lab', en: 'ULINK Packaging Lab', ja: 'ULINK包装ラボ' },
      role: { vi: 'Bộ phận Nghiên cứu Đóng gói', en: 'Packaging R&D Team', ja: '包装研究開発チーム' },
      avatar: '/images/about/op-team.webp'
    }
  },
  {
    id: 'guide-cleanroom-maintenance-iso14644',
    category: 'guide',
    badge: { vi: 'Cẩm nang kỹ thuật', en: 'Technical Guide', ja: '技術ガイド' },
    title: {
      vi: 'Quy trình kiểm định và bảo trì phòng sạch định kỳ theo tiêu chuẩn ISO 14644',
      en: 'Periodic Cleanroom Inspection & Maintenance Protocol per ISO 14644',
      ja: 'ISO 14644規格に基づくクリーンルーム定期点検・保守手順'
    },
    description: {
      vi: 'Hướng dẫn chi tiết phương pháp đếm hạt bụi vi mô, kiểm tra chênh áp màng lọc HEPA/ULPA và quy chuẩn thay thế định kỳ phụ kiện lọc khí.',
      en: 'Detailed guidance on particle counter testing, HEPA/ULPA filter pressure drop checks, and scheduled filter replacement intervals.',
      ja: '微粒子カウンターによる測定法、HEPA/ULPAフィルターの差圧測定、定期的なフィルター交換基準の詳細解説。'
    },
    date: '28/01/2026',
    image: '/images/resources/autohtml/thumb0.png',
    author: {
      name: { vi: 'Kỹ sư Hoàng Hải', en: 'Hai Hoang, HVAC & Cleanroom Lead', ja: 'ハイ・ホアン（HVAC＆クリーンルーム責任者）' },
      role: { vi: 'Trưởng nhóm Kiểm định Phòng sạch', en: 'Cleanroom Certification Lead', ja: 'クリーンルーム認証責任者' },
      avatar: '/images/about/op-team.webp'
    }
  },
  {
    id: 'guide-adhesive-tape-selection-hvac',
    category: 'guide',
    badge: { vi: 'Cẩm nang kỹ thuật', en: 'Technical Guide', ja: '技術ガイド' },
    title: {
      vi: 'Lựa chọn băng keo kỹ thuật dán bảo ôn đường ống HVAC chịu nhiệt',
      en: 'Selecting High-Temperature Technical Tapes for HVAC Insulation Ducts',
      ja: 'HVAC配管断熱用耐熱テープの選定ガイド'
    },
    description: {
      vi: 'So sánh băng keo nhôm nguyên chất, băng keo nhôm sợi thủy tinh FSK và băng dính xốp PE chống đọng sương bề mặt đường ống gió.',
      en: 'Comparing pure aluminum foil tape, fiberglass-reinforced FSK tape, and PE foam tape for duct condensation prevention.',
      ja: '純アルミテープ、グラスファイバー補強FSKテープ、ダクト結露防止用PEフォームテープの比較検証。'
    },
    date: '20/01/2026',
    image: '/images/resources/autohtml/thumb2.png',
    author: {
      name: { vi: 'ULINK Technical Advisory', en: 'ULINK Technical Advisory', ja: 'ULINK技術アドバイザリー' },
      role: { vi: 'Kỹ sư Vật liệu Kỹ thuật', en: 'Materials Engineer', ja: '材料エンジニア' },
      avatar: '/images/about/op-team.webp'
    }
  },
  {
    id: 'guide-pallet-stretch-wrapping-optimization',
    category: 'guide',
    badge: { vi: 'Cẩm nang kỹ thuật', en: 'Technical Guide', ja: '技術ガイド' },
    title: {
      vi: 'Tối ưu hóa lực căng màng quấn PE pallet xuất khẩu tự động',
      en: 'Optimizing Pre-Stretch Ratio for Automated Export Pallet Wrapping',
      ja: '自動パレット包装機におけるPEストレッチフィルム延伸率の最適化'
    },
    description: {
      vi: 'Cách tinh chỉnh độ giãn dài 250% - 300% cho máy quấn màng tự động để tiết kiệm 30% chi phí màng mà vẫn giữ vững tải trọng 1.5 tấn.',
      en: 'How to fine-tune 250% - 300% pre-stretch on automated wrappers, saving 30% film cost while securing 1.5-ton pallets.',
      ja: '自動包装機で延伸率250%〜300%を適切に設定し、1.5トンの荷崩れを防ぎながらフィルム使用量を30%削減する方法。'
    },
    date: '12/01/2026',
    image: '/images/resources/autohtml/thumb3.png',
    author: {
      name: { vi: 'Kỹ sư Vũ Minh Đức', en: 'Duc Vu, Packaging Automation Specialist', ja: 'ドゥック・ヴー（包装自動化エンジニア）' },
      role: { vi: 'Chuyên viên Tự động hóa Đóng gói', en: 'Packaging Automation Lead', ja: '包装自動化リード' },
      avatar: '/images/about/op-team.webp'
    }
  },
  {
    id: 'guide-cleanroom-garment-protocol',
    category: 'guide',
    badge: { vi: 'Cẩm nang kỹ thuật', en: 'Technical Guide', ja: '技術ガイド' },
    title: {
      vi: 'Quy chuẩn trang phục phòng sạch và quy trình thay đồ chuẩn SOP Class 100 - Class 10.000',
      en: 'Cleanroom Garment Standards & Gowning SOP for Class 100 - Class 10,000',
      ja: 'クラス100〜10,000クリーンルーム用無塵衣基準と更衣SOP手順'
    },
    description: {
      vi: 'Tiêu chuẩn chọn quần áo liền mũ chống tĩnh điện dệt sợi carbon, ủng phòng sạch và quy trình bước qua air-shower không nhiễm chéo.',
      en: 'Selection of anti-static carbon-filament jumpsuits, boots, and non-cross-contaminating air-shower entrance procedures.',
      ja: 'カーボン導電糸入り無塵衣、クリーンブーツの選定基準および交差汚染を防ぐエアシャワー通過手順。'
    },
    date: '05/01/2026',
    image: '/images/resources/autohtml/thumb4.png',
    author: {
      name: { vi: 'ULINK Cleanroom Team', en: 'ULINK Cleanroom Team', ja: 'ULINKクリーンルームチーム' },
      role: { vi: 'Chuyên gia Quy trình Phòng sạch', en: 'Cleanroom Protocol Specialist', ja: 'クリーンルーム手順専門家' },
      avatar: '/images/about/op-team.webp'
    }
  }
];

// ============================================================================
// 2. CHỨNG CHỈ CHẤT LƯỢNG & TIÊU CHUẨN (standard) - 6 bài
// ============================================================================
const STANDARDS: SeedArticle[] = [
  {
    id: 'standard-iso-14644-cleanroom-classification',
    category: 'standard',
    badge: { vi: 'Tiêu chuẩn', en: 'Standards', ja: '規格・認証' },
    title: {
      vi: 'Tiêu chuẩn phòng sạch ISO 14644: Phân loại cấp sạch và giới hạn hạt bụi',
      en: 'ISO 14644 Cleanroom Standard: Classification & Airborne Particulate Limits',
      ja: 'ISO 14644クリーンルーム規格：清浄度クラス分類と浮遊微粒子許容限界'
    },
    description: {
      vi: 'Bảng tra cứu số lượng hạt bụi tối đa từ ISO Class 1 đến ISO Class 9, tương đương tiêu chuẩn FED-STD-209E và yêu cầu kiểm nghiệm thực địa.',
      en: 'Lookup table for maximum particle concentrations from ISO Class 1 to 9, FED-STD-209E cross-reference, and on-site testing rules.',
      ja: 'ISOクラス1〜9までの最大微粒子許容濃度、FED-STD-209E対応表および現地測定要件の解説。'
    },
    date: '18/02/2026',
    image: '/images/resources/autohtml/thumb0.png',
    author: {
      name: { vi: 'ULINK Compliance Office', en: 'ULINK Compliance Office', ja: 'ULINKコンプライアンス室' },
      role: { vi: 'Phòng Pháp chế Tiêu chuẩn', en: 'Standards Compliance Team', ja: '規格適合チーム' },
      avatar: '/images/about/op-team.webp'
    }
  },
  {
    id: 'standard-rohs-reach-electronics-compliance',
    category: 'standard',
    badge: { vi: 'Tiêu chuẩn', en: 'Standards', ja: '規格・認証' },
    title: {
      vi: 'Chứng nhận RoHS 3 (EU 2015/863) & REACH: Yêu cầu hạn chế 10 chất độc hại',
      en: 'RoHS 3 (EU 2015/863) & REACH Certification: 10 Hazardous Substances Limits',
      ja: 'RoHS 3（EU 2015/863）およびREACH認証：10種の特定有害物質制限'
    },
    description: {
      vi: 'Cẩm nang pháp lý về giới hạn hàm lượng chì (Pb), thủy ngân (Hg), cadmi (Cd), Cr6+ và 4 hợp chất Phthalate trong vật liệu phụ trợ điện tử.',
      en: 'Regulatory overview on lead, mercury, cadmium, Cr6+, and 4 Phthalate restrictions in electronic auxiliary supplies.',
      ja: '電子材料・包装資材における鉛、水銀、カドミウム、六価クロムおよび4種フタル酸エステルの含有制限値。'
    },
    date: '11/02/2026',
    image: '/images/resources/autohtml/thumb5.png',
    author: {
      name: { vi: 'Kỹ sư Đặng Thúy Nga', en: 'Thúy Nga Đặng, QA/QC Specialist', ja: 'トゥイ・ガー・ダン（QA/QC専門員）' },
      role: { vi: 'Chuyên viên Đảm bảo Chất lượng', en: 'Quality Assurance Lead', ja: '品質保証リード' },
      avatar: '/images/about/op-team.webp'
    }
  },
  {
    id: 'standard-iso-17712-container-bolt-seals',
    category: 'standard',
    badge: { vi: 'Tiêu chuẩn', en: 'Standards', ja: '規格・認証' },
    title: {
      vi: 'Tiêu chuẩn niêm phong an ninh cao ISO 17712 (C-TPAT) cho seal container xuất khẩu',
      en: 'ISO 17712 (C-TPAT) High Security Mechanical Seal Standards for Ocean Containers',
      ja: '海上輸出コンテナ用ISO 17712（C-TPAT）高セキュリティメカニカルシール基準'
    },
    description: {
      vi: 'Quy chuẩn phân hạng H (High Security Seal), yêu cầu chống cạy mở, lực kéo đứt tối thiểu 10kN và chứng chỉ kiểm định quốc tế hải quan Mỹ.',
      en: 'Grade H (High Security) rating rules, tamper-evident features, 10kN tensile resistance, and US Customs compliance test specs.',
      ja: 'H等級（高セキュリティ）要件、耐不正開放設計、引張耐荷重10kN以上および米国税関適合検査基準。'
    },
    date: '03/02/2026',
    image: '/images/industries/logistics/usecase_3.png',
    author: {
      name: { vi: 'ULINK Maritime Logistics', en: 'ULINK Maritime Logistics', ja: 'ULINK海上物流部' },
      role: { vi: 'Chuyên gia An ninh Chuỗi Cung ứng', en: 'Supply Chain Security Advisor', ja: 'サプライチェーンセキュリティ顧問' },
      avatar: '/images/about/op-team.webp'
    }
  },
  {
    id: 'standard-ansi-esd-s20-20-2021-certification',
    category: 'standard',
    badge: { vi: 'Tiêu chuẩn', en: 'Standards', ja: '規格・認証' },
    title: {
      vi: 'Tiêu chuẩn kiểm soát tĩnh điện ANSI/ESD S20.20-2021 phiên bản mới nhất',
      en: 'ANSI/ESD S20.20-2021: Latest ESD Control Program Standard Updates',
      ja: 'ANSI/ESD S20.20-2021最新版：ESD管理プログラム基準の更新点'
    },
    description: {
      vi: 'Những thay đổi quan trọng về điện áp bước người (Body Voltage Generation), kiểm soát ion hóa không khí và quy trình thẩm định nhà xưởng.',
      en: 'Key changes regarding walking body voltage limits, air ionization qualification, and production facility audit requirements.',
      ja: '人体歩行帯電電位の許容限界、除電イオナイザーの検証基準、施設監査要件の重要変更点。'
    },
    date: '25/01/2026',
    image: '/images/resources/autohtml/thumb7.png',
    author: {
      name: { vi: 'ULINK ESD Lab', en: 'ULINK ESD Lab', ja: 'ULINK ESDラボ' },
      role: { vi: 'Trung tâm Kiểm định ESD', en: 'ESD Verification Lab', ja: 'ESD検証センター' },
      avatar: '/images/about/op-team.webp'
    }
  },
  {
    id: 'standard-fda-haccp-food-contact-packaging',
    category: 'standard',
    badge: { vi: 'Tiêu chuẩn', en: 'Standards', ja: '規格・認証' },
    title: {
      vi: 'Chứng nhận FDA 21 CFR & HACCP đối với màng co nhiệt và bao bì tiếp xúc thực phẩm',
      en: 'FDA 21 CFR & HACCP Compliance for Shrink Films & Food Contact Packaging',
      ja: 'FDA 21 CFRおよびHACCP適合：食品接触用シュリンクフィルムと包装基準'
    },
    description: {
      vi: 'Quy định di thôi thôi nhiễm chất độc hại, chứng chỉ không chứa BPA và quy trình sản xuất phòng sạch đạt chuẩn an toàn vệ sinh thực phẩm.',
      en: 'Migration test limits, BPA-free certifications, and cleanroom production requirements for food-grade packaging materials.',
      ja: '化学物質溶出試験基準、BPAフリー認証、食品包装資材のクリーンルーム製造管理手順。'
    },
    date: '17/01/2026',
    image: '/images/industries/logistics/usecase_2.png',
    author: {
      name: { vi: 'ULINK Food & Pharma Team', en: 'ULINK Food & Pharma Team', ja: 'ULINK食品・医薬品チーム' },
      role: { vi: 'Cố vấn An toàn Thực phẩm', en: 'Food Safety Advisor', ja: '食品安全顧問' },
      avatar: '/images/about/op-team.webp'
    }
  },
  {
    id: 'standard-iso-9001-2015-quality-management',
    category: 'standard',
    badge: { vi: 'Tiêu chuẩn', en: 'Standards', ja: '規格・認証' },
    title: {
      vi: 'Hệ thống Quản lý Chất lượng ISO 9001:2015 & ISO 14001:2015 tại ULink',
      en: 'ISO 9001:2015 & ISO 14001:2015 Quality and Environmental Systems at ULink',
      ja: 'ULinkにおけるISO 9001:2015品質＆ISO 14001:2015環境マネジメントシステム'
    },
    description: {
      vi: 'Cam kết chất lượng 100% lô hàng xuất kho có chứng nhận xuất xưởng (CO/CQ), phiếu kiểm định RoHs và cam kết giảm thiểu rác thải nhựa.',
      en: 'Commitment to 100% outbound shipments with CO/CQ, RoHS certificates, and carbon footprint reduction protocols.',
      ja: '全出荷ロットにおけるCO/CQ検査証明書添付、RoHS試験成績書、プラスチック削減コミットメント。'
    },
    date: '08/01/2026',
    image: '/images/resources/autohtml/thumb8.png',
    author: {
      name: { vi: 'Ban Giám đốc Chất lượng ULink', en: 'ULINK Quality Board', ja: 'ULINK品質統括委員会' },
      role: { vi: 'Bộ phận Quản lý Chất lượng', en: 'Quality Assurance Board', ja: '品質管理本部' },
      avatar: '/images/about/op-team.webp'
    }
  }
];

// ============================================================================
// 3. NGHIÊN CỨU ĐIỂN HÌNH (case-study) - 9 case studies
// ============================================================================
const CASE_STUDIES: SeedArticle[] = [
  {
    id: 'hvac-office-building',
    category: 'case-study',
    badge: { vi: 'Tòa nhà thương mại', en: 'Commercial Building', ja: '商業ビル' },
    title: {
      vi: 'Hệ thống HVAC tòa nhà văn phòng cao cấp: Khắc phục đọng sương đường ống chiller',
      en: 'High-End Office Building HVAC: Eliminating Chiller Pipe Condensation',
      ja: '高級オフィスビルHVACシステム：チラー配管の結露完全防止'
    },
    description: {
      vi: 'Ứng dụng băng dính nhôm lưới gia cường FSK bọc cách nhiệt hệ chiller, đảm bảo tuổi thọ đường ống trên 15 năm mà không bong tróc.',
      en: 'Applying mesh-reinforced aluminum tape to chiller insulation, ensuring pipe lifespan over 15 years without peeling.',
      ja: 'チラーシステム断熱に補強アルミテープを使用し、剥がれることなく15年以上の耐久性を確保。'
    },
    date: '15/12/2025',
    image: '/images/industries/construction/usecase_1.png',
    author: {
      name: { vi: 'ULINK M&E Engineering', en: 'ULINK M&E Engineering', ja: 'ULINK M&E Engineering' },
      role: { vi: 'Chuyên gia HVAC', en: 'HVAC Specialist', ja: 'HVAC専門家' },
      avatar: '/images/about/op-team.webp'
    }
  },
  {
    id: 'fdi-electronics-plant',
    category: 'case-study',
    badge: { vi: 'Khu công nghiệp', en: 'Industrial Park', ja: '工業団地' },
    title: {
      vi: 'Nhà máy sản xuất điện tử FDI quy mô lớn: Đồng bộ 20.000 cuộn keo nhôm phòng sạch',
      en: 'Large-Scale FDI Electronics Plant: Synchronizing 20,000 Cleanroom Tapes',
      ja: '大規模FDI電子製造工場：20,000巻のクリーンルーム用テープ同期納品'
    },
    description: {
      vi: 'Cung ứng hỏa tốc băng keo nhôm FSK ngăn ẩm tuyệt đối cho hệ thống cấp gió sạch phòng máy, vượt qua các đợt kiểm định FDI nghiêm ngặt.',
      en: 'Synchronized supply of moisture-barrier FSK aluminum tape for cleanroom supply ducts, passing strict FDI quality audits.',
      ja: 'クリーンルーム送風ダクト用に完全防湿FSKアルミテープを同期供給し、厳格なFDI品質検査に合格。'
    },
    date: '20/01/2026',
    image: '/images/industries/construction/usecase_2.png',
    author: {
      name: { vi: 'ULINK Technical Advisory', en: 'ULINK Technical Advisory', ja: 'ULINK Technical Advisory' },
      role: { vi: 'Kỹ sư dự án FDI', en: 'FDI Project Engineer', ja: 'FDIプロジェクトエンジニア' },
      avatar: '/images/about/op-team.webp'
    }
  },
  {
    id: 'hospital-cleanroom',
    category: 'case-study',
    badge: { vi: 'Bệnh viện & Lab', en: 'Hospital & Lab', ja: '病院＆ラボ' },
    title: {
      vi: 'Bệnh viện quốc tế & Phòng sạch vô trùng: Bịt kín ống thông gió áp lực âm',
      en: 'International Hospital & Cleanroom: Negative Pressure Duct Sealing',
      ja: '国際病院＆無菌クリーンルーム：陰圧換気ダクトの完全密閉'
    },
    description: {
      vi: 'Bịt kín ống thông gió phòng mổ bằng băng keo nhôm kháng khuẩn chuẩn RoHS, tuyệt đối không tạo bụi bẩn, không mùi dung môi hữu cơ.',
      en: 'Sealing negative pressure operating room ducts with RoHS antibacterial tape, zero dust and solvent emissions.',
      ja: 'RoHS抗菌アルミテープで陰圧手術室の換気ダクトを密閉し、粉塵や有機溶剤臭の発生をゼロに抑制。'
    },
    date: '02/02/2026',
    image: '/images/industries/construction/usecase_3.png',
    author: {
      name: { vi: 'ULINK Medical Solutions', en: 'ULINK Medical Solutions', ja: 'ULINK Medical Solutions' },
      role: { vi: 'Chuyên gia Y tế & Vi sinh', en: 'Biomedical Specialist', ja: '生物医療専門家' },
      avatar: '/images/about/op-team.webp'
    }
  },
  {
    id: 'an-cuong-wood-export',
    category: 'case-study',
    badge: { vi: 'Xuất khẩu Mỹ & EU', en: 'US & EU Export', ja: '米国・欧州輸出' },
    title: {
      vi: 'Bảo vệ bề mặt gỗ xuất khẩu Mỹ cho Tập đoàn Gỗ An Cường',
      en: 'Protecting US Export Furniture for An Cuong Group',
      ja: 'An Cườngグループ向け米国輸出家具の表面保護'
    },
    description: {
      vi: 'Triển khai màng bảo vệ bề mặt PE chống trầy xước không để lại keo dư sau 45 ngày container vượt đại dương ở nhiệt độ 50°C.',
      en: 'Deployed residue-free PE surface protective film maintaining zero adhesive residue after 45-day ocean transit at 50°C.',
      ja: '50℃の過酷な海上輸送45日後でも糊残りゼロのPE保護フィルムを導入。'
    },
    date: '10/01/2026',
    image: '/images/industries/wood/usecase_1.png',
    author: {
      name: { vi: 'ULINK Wood Solutions', en: 'ULINK Wood Solutions', ja: 'ULINK Wood Solutions' },
      role: { vi: 'Chuyên gia Vật liệu Ngành Gỗ', en: 'Wood Industry Specialist', ja: '木材産業専門家' },
      avatar: '/images/about/op-team.webp'
    }
  },
  {
    id: 'vinhomes-penthouse-furniture',
    category: 'case-study',
    badge: { vi: 'Nội thất & Dự án', en: 'Interior & Projects', ja: 'インテリア＆プロジェクト' },
    title: {
      vi: 'Bảo vệ nội thất hoàn thiện Penthouse Vinhomes Ocean Park trong thi công',
      en: 'Protecting Luxury Penthouse Finishes at Vinhomes Ocean Park During Fit-Out',
      ja: 'Vinhomes Ocean Parkペントハウス施工中の高級内装表面保護'
    },
    description: {
      vi: 'Giải pháp màng bọc bảo vệ sàn đá cẩm thạch và kính chạm sàn khổ lớn chống va đập, tiết kiệm 200 triệu đồng chi phí phục hồi hư hại.',
      en: 'Impact-resistant protective films for marble floors and large glazed partitions, saving 200M VND in potential rework.',
      ja: '大理石床や大型ガラス間仕切りの耐衝撃保護フィルムにより、修復コスト2億ドンを削減。'
    },
    date: '18/12/2025',
    image: '/images/industries/wood/usecase_2.png',
    author: {
      name: { vi: 'ULINK Interior Advisory', en: 'ULINK Interior Advisory', ja: 'ULINK Interior Advisory' },
      role: { vi: 'Tư vấn Bảo vệ Công trình', en: 'Interior Protection Consultant', ja: '内装保護コンサルタント' },
      avatar: '/images/about/op-team.webp'
    }
  },
  {
    id: 'woodsland-eu-export',
    category: 'case-study',
    badge: { vi: 'Dây chuyền Xuất khẩu', en: 'Export Lines', ja: '輸出ライン' },
    title: {
      vi: 'Dây chuyền đóng gói nội thất xuất khẩu EU - Woodsland Tuyên Quang',
      en: 'Automated EU Export Furniture Packaging - Woodsland Tuyen Quang',
      ja: 'Woodsland Tuyen Quangの対EU輸出家具向け自動梱包ライン'
    },
    description: {
      vi: 'Tự động hóa quấn màng co và băng dính niêm phong carton chịu ẩm cao, giúp hàng rào độ ẩm của thùng hàng đạt tiêu chuẩn xuất khẩu châu Âu.',
      en: 'Automated stretch wrapping and moisture-resistant carton sealing tape, meeting stringent European export moisture standards.',
      ja: '自動ストレッチ包装と耐湿段ボールテープにより、欧州向け厳格な防湿基準をクリア。'
    },
    date: '05/01/2026',
    image: '/images/industries/wood/usecase_3.png',
    author: {
      name: { vi: 'ULINK Automation Lab', en: 'ULINK Automation Lab', ja: 'ULINK Automation Lab' },
      role: { vi: 'Kỹ sư Đóng gói Công nghiệp', en: 'Industrial Packaging Engineer', ja: '産業包装エンジニア' },
      avatar: '/images/about/op-team.webp'
    }
  },
  {
    id: 'logistics-bac-ninh-hub',
    category: 'case-study',
    badge: { vi: 'Tổng kho Fulfillment', en: 'Fulfillment Hub', ja: 'フルフィルメントハブ' },
    title: {
      vi: 'Tối ưu hóa vật tư đóng gói tại Tổng kho Fulfillment Bắc Ninh 30.000m²',
      en: 'Optimizing Packaging Materials at Bac Ninh 30,000m² Fulfillment Hub',
      ja: 'バクニン30,000m²フルフィルメントハブにおける梱包資材の最適化'
    },
    description: {
      vi: 'Cắt giảm 25% lượng nhựa sử dụng nhờ chuyển đổi sang màng quấn PE Nano 55 lớp có độ bền kéo cao, rút ngắn thời gian đóng gói mỗi kiện.',
      en: 'Cut plastic usage by 25% by switching to 55-layer Nano PE stretch film with superior tensile yield, speeding packing cycles.',
      ja: '55層ナノPEストレッチフィルムへの切り替えによりプラスチック使用量を25%削減し梱包時間を短縮。'
    },
    date: '22/01/2026',
    image: '/images/industries/logistics/usecase_1.png',
    author: {
      name: { vi: 'ULINK Logistics Practice', en: 'ULINK Logistics Practice', ja: 'ULINK Logistics Practice' },
      role: { vi: 'Chuyên gia Tối ưu Kho vận', en: 'Warehouse Optimization Specialist', ja: '倉庫最適化専門家' },
      avatar: '/images/about/op-team.webp'
    }
  },
  {
    id: 'cold-chain-logistics',
    category: 'case-study',
    badge: { vi: 'Kho lạnh & Thực phẩm', en: 'Cold Storage & Food', ja: '冷蔵・食品物流' },
    title: {
      vi: 'Chuỗi kho lạnh bảo quản thủy hải sản xuất khẩu Minh Phú: Băng dính chịu nhiệt -40°C',
      en: 'Minh Phu Cold-Chain Seafood Export: -40°C Low-Temp Sealing Tape',
      ja: 'Minh Phu向け冷凍水産物輸出コールドチェーン：マイナス40℃対応粘着テープ'
    },
    description: {
      vi: 'Cung cấp màng co POF và băng dính chuyên dụng bám dính cực tốt trong môi trường âm 40 độ C, đảm bảo bao bì không giòn gãy khi cấp đông.',
      en: 'Supplied POF shrink film and specialty rubber tape adhering reliably at -40°C, eliminating brittle failures during quick-freezing.',
      ja: 'マイナス40℃の極低温環境でも強力粘着するPOFシュリンクフィルムと特殊ゴム系テープを供給。'
    },
    date: '14/02/2026',
    image: '/images/industries/logistics/usecase_2.png',
    author: {
      name: { vi: 'ULINK Cold Chain Advisor', en: 'ULINK Cold Chain Advisor', ja: 'ULINK Cold Chain Advisor' },
      role: { vi: 'Kỹ sư Chuỗi Cung ứng Lạnh', en: 'Cold Chain Engineer', ja: 'コールドチェーンエンジニア' },
      avatar: '/images/about/op-team.webp'
    }
  },
  {
    id: 'cat-lai-port-export',
    category: 'case-study',
    badge: { vi: 'Cảng biển & Container', en: 'Seaport & Container', ja: '港湾・コンテナ' },
    title: {
      vi: 'Cảng Cát Lái & Quy trình niêm phong container xuất khẩu đường biển chuẩn ISO 17712',
      en: 'Cat Lai Port: ISO 17712 Ocean Freight Container Sealing Standards',
      ja: 'キャットライ港：ISO 17712規格に基づく海上輸出コンテナ封かんプロセス'
    },
    description: {
      vi: 'Khóa seal cối container mạ thép chống gỉ khắc laser số nhảy theo chuẩn C-TPAT, triệt tiêu 100% rủi ro mất trộm hoặc tráo hàng trên biển.',
      en: 'Supplied laser-etched anti-tamper C-TPAT bolt seals, eliminating cargo tampering on transpacific routes.',
      ja: 'レーザー刻印付きC-TPAT適合ボルトシールにより、太平洋航路での荷抜き・改ざんリスクを100%排除。'
    },
    date: '08/02/2026',
    image: '/images/industries/logistics/usecase_3.png',
    author: {
      name: { vi: 'ULINK Maritime Logistics', en: 'ULINK Maritime Logistics', ja: 'ULINK Maritime Logistics' },
      role: { vi: 'Chuyên gia An ninh Cảng biển', en: 'Port Security Specialist', ja: '港湾セキュリティ専門家' },
      avatar: '/images/about/op-team.webp'
    }
  }
];

// ============================================================================
// 4. TIN THỊ TRƯỜNG (market-news) - 6 bài
// ============================================================================
const MARKET_NEWS: SeedArticle[] = [
  {
    id: 'market-news-supply-chain-2026',
    category: 'market-news',
    badge: { vi: 'Tin thị trường', en: 'Market News', ja: '市場ニュース' },
    title: {
      vi: 'Xu hướng chuỗi cung ứng vật liệu đóng gói công nghiệp năm 2026',
      en: 'Industrial Packaging Supply Chain Trends for 2026',
      ja: '2026年産業用包装資材サプライチェーンの動向'
    },
    description: {
      vi: 'Phân tích biến động giá hạt nhựa nguyên sinh, cước vận tải biển và chiến lược tối ưu tồn kho an toàn cho nhà máy FDI.',
      en: 'Analysis of virgin resin price volatility, ocean freight rates, and safety stock optimization for FDI plants.',
      ja: 'バージン樹脂価格の変動、海上運賃、FDI工場向けの安全在庫最適化戦略の分析。'
    },
    date: '18/02/2026',
    image: '/images/home/news/image (9).png',
    author: {
      name: { vi: 'ULINK Market Research', en: 'ULINK Market Research', ja: 'ULINK Market Research' },
      role: { vi: 'Chuyên gia nghiên cứu thị trường', en: 'Senior Market Analyst', ja: 'シニアマーケットアナリスト' },
      avatar: '/images/home/section5/image (2).png'
    }
  },
  {
    id: 'market-news-green-packaging-mandate',
    category: 'market-news',
    badge: { vi: 'Tin thị trường', en: 'Market News', ja: '市場ニュース' },
    title: {
      vi: 'Quy chuẩn đóng gói xanh mới tại các thị trường EU và Hoa Kỳ',
      en: 'New Green Packaging Standards in EU and US Markets',
      ja: 'EUおよび米国市場における新しいグリーン包装基準'
    },
    description: {
      vi: 'Cập nhật lộ trình cắt giảm nhựa dùng một lần, chứng chỉ tái chế PCR và yêu cầu dán nhãn sinh thái cho hàng xuất khẩu.',
      en: 'Updates on single-use plastic phase-outs, PCR recycling certificates, and eco-labeling rules for export goods.',
      ja: '使い捨てプラスチック削減ロードマップ、PCRリサイクル認証、輸出製品向けエコラベル要件の最新情報。'
    },
    date: '14/02/2026',
    image: '/images/home/news/image (10).png',
    author: {
      name: { vi: 'ULINK Technical Advisory', en: 'ULINK Technical Advisory', ja: 'ULINK Technical Advisory' },
      role: { vi: 'Cố vấn tuân thủ quy chuẩn quốc tế', en: 'Compliance Specialist', ja: 'コンプライアンス専門家' },
      avatar: '/images/home/section5/image (4).png'
    }
  },
  {
    id: 'market-news-semiconductor-expansion-vn',
    category: 'market-news',
    badge: { vi: 'Tin thị trường', en: 'Market News', ja: '市場ニュース' },
    title: {
      vi: 'Làn sóng mở rộng nhà máy bán dẫn tại Bắc Ninh - Hải Phòng',
      en: 'Semiconductor Plant Expansion Wave in Bac Ninh - Hai Phong',
      ja: 'バクニン・ハイフォンにおける半導体工場の拡張ラッシュ'
    },
    description: {
      vi: 'Nhu cầu đột biến về vật tư phòng sạch cấp độ cao và giải pháp bảo vệ bề mặt linh kiện tinh vi đạt chuẩn ESD S20.20.',
      en: 'Surging demand for high-grade cleanroom supplies and ESD S20.20 surface protection solutions for precision parts.',
      ja: 'ハイグレードクリーンルーム資材およびESD S20.20適合の精密部品表面保護ソリューションへの需要急増。'
    },
    date: '06/02/2026',
    image: '/images/home/news/image (11).png',
    author: {
      name: { vi: 'ULINK Electronics Practice', en: 'ULINK Electronics Practice', ja: 'ULINK Electronics Practice' },
      role: { vi: 'Kỹ sư giải pháp điện tử', en: 'Electronics Solution Engineer', ja: 'エレクトロニクスソリューションエンジニア' },
      avatar: '/images/home/section5/image (1).png'
    }
  },
  {
    id: 'market-news-raw-materials-q1-2026',
    category: 'market-news',
    badge: { vi: 'Tin thị trường', en: 'Market News', ja: '市場ニュース' },
    title: {
      vi: 'Báo cáo giá nguyên liệu công nghiệp Quý 1/2026',
      en: 'Q1/2026 Industrial Raw Materials Price Report',
      ja: '2026年第1四半期 産業用原材料価格レポート'
    },
    description: {
      vi: 'Dự báo biến động giá nhôm lá, keo acrylic, màng BOPP và khuyến nghị kế hoạch thu mua dài hạn cho phòng cung ứng.',
      en: 'Price forecasts for aluminum foil, acrylic adhesives, BOPP film, and procurement recommendations for buyer teams.',
      ja: 'アルミ箔、アクリル粘着剤、BOPPフィルムの価格予測と調達チーム向け長期調達計画の提言。'
    },
    date: '28/01/2026',
    image: '/images/home/news/news4_eco.jpg',
    author: {
      name: { vi: 'ULINK Procurement Intelligence', en: 'ULINK Procurement Intelligence', ja: 'ULINK Procurement Intelligence' },
      role: { vi: 'Trưởng bộ phận phân tích chuỗi cung ứng', en: 'Supply Chain Intelligence Lead', ja: 'サプライチェーン情報リーダー' },
      avatar: '/images/home/section5/image (3).png'
    }
  },
  {
    id: 'market-news-ocean-freight-indices-2026',
    category: 'market-news',
    badge: { vi: 'Tin thị trường', en: 'Market News', ja: '市場ニュース' },
    title: {
      vi: 'Chỉ số cước tàu biển tuyến Á - Âu và giải pháp đóng gói giảm khối lượng vận chuyển',
      en: 'Asia-Europe Ocean Freight Indices & Weight-Reduction Packaging Solutions',
      ja: 'アジア〜欧州航路の海上運賃指標と軽量化包装ソリューション'
    },
    description: {
      vi: 'Phân tích áp lực chi phí logistics đường biển và ứng dụng màng quấn siêu mỏng chịu lực giúp tối ưu hóa tải trọng container.',
      en: 'Analysis of ocean container freight pressures and adopting ultra-thin high-tensile stretch wrap to optimize payload weights.',
      ja: 'コンテナ運賃高騰の背景と、積載効率を最大化する超薄型高強度フィルムの活用法。'
    },
    date: '20/01/2026',
    image: '/images/resources/autohtml/thumb9.png',
    author: {
      name: { vi: 'ULINK Logistics Intelligence', en: 'ULINK Logistics Intelligence', ja: 'ULINK物流インテリジェンス' },
      role: { vi: 'Chuyên gia Phân tích Vận tải', en: 'Freight Market Analyst', ja: '貨物市場アナリスト' },
      avatar: '/images/about/op-team.webp'
    }
  },
  {
    id: 'market-news-fdi-tech-investment-vietnam',
    category: 'market-news',
    badge: { vi: 'Tin thị trường', en: 'Market News', ja: '市場ニュース' },
    title: {
      vi: 'Bức tranh thu hút vốn FDI công nghệ cao năm 2026 tại miền Bắc và miền Nam',
      en: '2026 High-Tech FDI Inflow Landscape in Northern & Southern Vietnam',
      ja: '2026年ベトナム南北におけるハイテクFDI誘致動向'
    },
    description: {
      vi: 'Các tập đoàn đa quốc gia gia tăng đầu tư vào nhà máy sản xuất bo mạch và đòi hỏi tiêu chuẩn nội địa hóa vật tư phụ trợ khắt khe.',
      en: 'Multinational corporations ramp up motherboard assembly investments, demanding stringent domestic sourcing compliance.',
      ja: '多国籍企業による基板実装工場への投資拡大と、現地調達資材に対する厳格な品質要求。'
    },
    date: '10/01/2026',
    image: '/images/resources/autohtml/thumb10.png',
    author: {
      name: { vi: 'ULINK Economic Advisory', en: 'ULINK Economic Advisory', ja: 'ULINK経済アドバイザリー' },
      role: { vi: 'Chuyên gia Kinh tế Công nghiệp', en: 'Industrial Economist', ja: '産業エコノミスト' },
      avatar: '/images/about/op-team.webp'
    }
  }
];

// ============================================================================
// 5. TIN TỨC (news) - 9 bài
// ============================================================================
const NEWS: SeedArticle[] = [
  {
    id: 'news-1',
    category: 'news',
    badge: { vi: 'Catalogue', en: 'Catalogue', ja: 'カタログ' },
    title: {
      vi: 'Giải pháp đóng gói công nghiệp tối ưu',
      en: 'Optimal Industrial Packaging Solutions',
      ja: '最適な産業用包装ソリューション'
    },
    description: {
      vi: 'Để cố định cụm nhiều chai nước ngọt, bia, hoặc lốc sữa hộp thành các khối chắc chắn, tiện lợi cho việc lưu kho và phân phối.',
      en: 'Securely bundle beverages, canned goods, and dairy multipacks into stable units for streamlined warehousing and distribution.',
      ja: '飲料、缶詰、乳製品マルチパックを強固に結束し、倉庫保管と配送を効率化する最適包装ソリューション。'
    },
    date: '22/07/2026',
    image: '/images/home/news/image (9).png',
    author: {
      name: { vi: 'Nguyễn Minh Tuấn', en: 'Minh Tuan Nguyen', ja: 'ミン・トゥアン・グエン' },
      role: { vi: 'Trưởng phòng Đóng gói', en: 'Head of Packaging', ja: '包装部門責任者' },
      avatar: '/images/regional_hubs/hub-2/KennyTran.png'
    }
  },
  {
    id: 'news-2',
    category: 'news',
    badge: { vi: 'Tài liệu kỹ thuật', en: 'Technical Document', ja: '技術資料' },
    title: {
      vi: 'Giải pháp đóng gói công nghiệp tối ưu - Tiêu chuẩn kỹ thuật',
      en: 'Optimal Industrial Packaging Solutions - Technical Standards',
      ja: '最適な産業用包装ソリューション - 技術基準'
    },
    description: {
      vi: 'Để cố định cụm nhiều chai nước ngọt, bia, hoặc lốc sữa hộp thành các khối chắc chắn, tiện lợi cho việc lưu kho và phân phối.',
      en: 'Securely bundle beverages, canned goods, and dairy multipacks into stable units for streamlined warehousing and distribution.',
      ja: '飲料、缶詰、乳製品マルチパックを強固に結束し、倉庫保管と配送を効率化する最適包装ソリューション。'
    },
    date: '20/07/2026',
    image: '/images/home/news/image (10).png',
    author: {
      name: { vi: 'Lê Quốc Hưng', en: 'Quoc Hung Le', ja: 'クオック・フン・レ' },
      role: { vi: 'Quản lý Kho vận', en: 'Warehouse Manager', ja: '倉庫管理者' },
      avatar: '/images/regional_hubs/hub-2/QuangTran.png'
    }
  },
  {
    id: 'news-3',
    category: 'news',
    badge: { vi: 'Catalogue', en: 'Catalogue', ja: 'カタログ' },
    title: {
      vi: 'Giải pháp đóng gói công nghiệp tối ưu - Quy trình triển khai',
      en: 'Optimal Industrial Packaging Solutions - Deployment Workflow',
      ja: '最適な産業用包装ソリューション - 導入プロセス'
    },
    description: {
      vi: 'Để cố định cụm nhiều chai nước ngọt, bia, hoặc lốc sữa hộp thành các khối chắc chắn, tiện lợi cho việc lưu kho và phân phối.',
      en: 'Securely bundle beverages, canned goods, and dairy multipacks into stable units for streamlined warehousing and distribution.',
      ja: '飲料、缶詰、乳製品マルチパックを強固に結束し、倉庫保管と配送を効率化する最適包装ソリューション。'
    },
    date: '22/07/2026',
    image: '/images/home/news/image (11).png',
    author: {
      name: { vi: 'Trần Thị Hồng Nhung', en: 'Hong Nhung Tran', ja: 'ホン・ニュン・チャン' },
      role: { vi: 'Giám đốc Sản xuất', en: 'Production Director', ja: '製造部長' },
      avatar: '/images/regional_hubs/hub-2/KennyTran.png'
    }
  },
  {
    id: 'news-ha-nam-logistics-hub-launch',
    category: 'news',
    badge: { vi: 'Tin tức', en: 'News', ja: 'ニュース' },
    title: {
      vi: 'ULink chính thức khánh thành Tổng kho phân phối kỹ thuật Hà Nam 15.000m²',
      en: 'ULink Officially Inaugurates 15,000m² Ha Nam Technical Distribution Hub',
      ja: 'ULink、ハナムに15,000m²のテクニカル物流ハブを正式開設'
    },
    description: {
      vi: 'Trung tâm kho vận đạt chuẩn kiểm soát nhiệt ẩm 24/7, cung ứng hỏa tốc trong 4 giờ tới các khu công nghiệp Hà Nam, Hà Nội và Bắc Ninh.',
      en: 'Temperature and humidity controlled warehouse facility ensuring 4-hour express delivery to industrial parks across Northern Vietnam.',
      ja: '24時間温湿度管理対応の物流拠点で、ハナム・ハノイ・バクニンの工業団地へ4時間以内の特急配送を実現。'
    },
    date: '16/02/2026',
    image: '/images/resources/autohtml/thumb11.png',
    author: {
      name: { vi: 'Ban Truyền thông ULink', en: 'ULink Corporate Communications', ja: 'ULink広報部' },
      role: { vi: 'ULink Newsroom', en: 'ULink Newsroom', ja: 'ULink広報' },
      avatar: '/images/logo/image.png'
    }
  },
  {
    id: 'news-japan-esd-cleanroom-partnership',
    category: 'news',
    badge: { vi: 'Tin tức', en: 'News', ja: 'ニュース' },
    title: {
      vi: 'ULink ký kết hợp tác chiến lược cung ứng vật tư phòng sạch với đối tác Nhật Bản',
      en: 'ULink Inks Strategic Cleanroom & ESD Supply Partnership with Japanese Maker',
      ja: 'ULink、日本の大手メーカーとクリーンルーム＆ESD資材の戦略的提携を締結'
    },
    description: {
      vi: 'Hợp tác chuyển giao công nghệ màng dính bảo vệ bề mặt quang học không bóng khí và thảm cao su chống tĩnh điện thế hệ mới.',
      en: 'Technology transfer agreement on bubble-free optical surface protective films and next-gen conductive rubber mats.',
      ja: '気泡ゼロの光学用表面保護フィルムおよび次世代導電性ゴムマットの技術提携に合意。'
    },
    date: '08/02/2026',
    image: '/images/resources/autohtml/thumb12.png',
    author: {
      name: { vi: 'Phòng Hợp tác Quốc tế ULink', en: 'ULink Global Partnerships', ja: 'ULink国際連携室' },
      role: { vi: 'Ban Đối ngoại Doanh nghiệp', en: 'Corporate Affairs', ja: '渉外部' },
      avatar: '/images/logo/image.png'
    }
  },
  {
    id: 'news-b2b-platform-instant-sku-pricing',
    category: 'news',
    badge: { vi: 'Tin tức', en: 'News', ja: 'ニュース' },
    title: {
      vi: 'Ra mắt nền tảng mua sắm B2B trực tuyến với tính năng tra cứu SKU tức thì',
      en: 'Launching ULink B2B Digital Platform with Instant SKU Lookup & Dynamic RFQ',
      ja: '即時SKU検索および動的RFQ機能を備えたULink B2Bポータルを正式公開'
    },
    description: {
      vi: 'Hệ thống số hóa quy trình báo giá, hợp đồng điện tử và tra cứu thông số kỹ thuật 5.000+ mã vật tư công nghiệp chỉ trong 30 giây.',
      en: 'Digitized quotation, e-contracting, and instant technical datasheet access for 5,000+ industrial SKUs in under 30 seconds.',
      ja: '5,000点以上の産業用資材の仕様書閲覧、見積もり、電子契約を30秒で完結するデジタル基盤。'
    },
    date: '01/02/2026',
    image: '/images/resources/autohtml/thumb13.png',
    author: {
      name: { vi: 'ULink Digital Transformation', en: 'ULink Digital Team', ja: 'ULink DX推進部' },
      role: { vi: 'Nhóm Phát triển Nền tảng', en: 'Platform Product Team', ja: 'プラットフォーム開発チーム' },
      avatar: '/images/logo/image.png'
    }
  },
  {
    id: 'news-net-zero-recycled-packaging-line',
    category: 'news',
    badge: { vi: 'Tin tức', en: 'News', ja: 'ニュース' },
    title: {
      vi: 'ULink công bố dòng sản phẩm màng quấn PE tái chế 30% PCR đạt chứng nhận GRS',
      en: 'ULink Unveils 30% Post-Consumer Recycled (PCR) Stretch Film with GRS Badge',
      ja: 'ULink、GRS認証取得のPCR30%再生PEストレッチフィルムを発売'
    },
    description: {
      vi: 'Giải pháp bao bì bền vững hỗ trợ các nhà sản xuất đa quốc gia đạt chứng nhận giảm phát thải carbon Scope 3 theo mục tiêu Net Zero.',
      en: 'Sustainable packaging line aiding global enterprises in meeting Scope 3 carbon reduction and Net Zero milestones.',
      ja: 'Scope 3二酸化炭素排出削減とネットゼロ目標達成を支援する持続可能な包装ソリューション。'
    },
    date: '22/01/2026',
    image: '/images/resources/autohtml/thumb14.png',
    author: {
      name: { vi: 'Ban Phát triển Bền vững ULink', en: 'ULink Sustainability Board', ja: 'ULinkサステナビリティ推進室' },
      role: { vi: 'Chuyên viên Phát triển Bền vững', en: 'Sustainability Officer', ja: 'サステナビリティ担当' },
      avatar: '/images/logo/image.png'
    }
  },
  {
    id: 'news-iso-dual-audit-passed-2026',
    category: 'news',
    badge: { vi: 'Tin tức', en: 'News', ja: 'ニュース' },
    title: {
      vi: 'ULink hoàn thành xuất sắc kỳ đánh giá giám sát kép ISO 9001 & ISO 14001',
      en: 'ULink Successfully Passes ISO 9001 & ISO 14001 Annual Surveillance Audit',
      ja: 'ULink、ISO 9001およびISO 14001の年次定期審査を優良判定で完了'
    },
    description: {
      vi: 'Tổ chức chứng nhận quốc tế SGS ghi nhận tỷ lệ tuân thủ chất lượng 99.8% trong toàn bộ quy trình lưu kho và phân phối.',
      en: 'SGS certification body certifies 99.8% quality compliance across warehousing, testing, and delivery workflows.',
      ja: 'SGS国際認証機関による審査で、倉庫保管・検査・配送プロセス全体で99.8%の品質適合率を達成。'
    },
    date: '15/01/2026',
    image: '/images/resources/autohtml/thumb15.png',
    author: {
      name: { vi: 'Ban Đảm bảo Chất lượng', en: 'ULink QA/QC Division', ja: 'ULink品質管理本部' },
      role: { vi: 'Trưởng ban Đảm bảo Chất lượng', en: 'QA Director', ja: '品質管理本部長' },
      avatar: '/images/logo/image.png'
    }
  },
  {
    id: 'news-customer-conference-2026-recap',
    category: 'news',
    badge: { vi: 'Tin tức', en: 'News', ja: 'ニュース' },
    title: {
      vi: 'Tổng kết Hội nghị Khách hàng Doanh nghiệp ULink thường niên năm 2026',
      en: 'Recap: ULink Annual Enterprise Customer Conference 2026',
      ja: '2026年ULink年次法人顧客カンファレンス開催レポート'
    },
    description: {
      vi: 'Hơn 200 đại diện doanh nghiệp FDI và nhà thầu cơ điện tham dự, chia sẻ giải pháp tối ưu hóa chi phí thu mua vật tư kỹ thuật.',
      en: 'Over 200 FDI enterprise leads and M&E contractors gathered to share technical material procurement optimization models.',
      ja: '200社を超えるFDI企業および設備工事業者が参加し、資材調達コスト最適化のベストプラクティスを共有。'
    },
    date: '07/01/2026',
    image: '/images/resources/autohtml/thumb16.png',
    author: {
      name: { vi: 'Ban Tổ chức Sự kiện ULink', en: 'ULink Events Bureau', ja: 'ULinkイベント企画事務局' },
      role: { vi: 'Điều phối viên Sự kiện', en: 'Event Operations Team', ja: 'イベント運営チーム' },
      avatar: '/images/logo/image.png'
    }
  }
];

// ============================================================================
// 6. SỰ KIỆN (event) - 5 bài
// ============================================================================
const EVENTS_ARTICLES: SeedArticle[] = [
  {
    id: 'ev-001',
    category: 'event',
    badge: { vi: 'Sự kiện', en: 'Events', ja: 'イベント' },
    title: {
      vi: 'Hội thảo chuyên đề: Kiểm soát phòng sạch & Tiêu chuẩn ISO 14644',
      en: 'Cleanroom Technology Seminar: ISO 14644 Compliance',
      ja: 'クリーンルーム技術セミナー：ISO 14644適合の実務'
    },
    description: {
      vi: 'Hội thảo chuyên sâu về các giải pháp kiểm soát phòng sạch và ứng dụng tiêu chuẩn quốc tế ISO 14644 trong nhà xưởng công nghiệp bán dẫn & dược phẩm.',
      en: 'In-depth seminar on cleanroom contamination control and practical ISO 14644 implementation in semiconductor & pharmaceutical plants.',
      ja: '半導体・医薬品工場におけるクリーンルーム汚染制御とISO 14644国際規格の実践的導入に関する専門セミナー。'
    },
    date: '15/08/2026',
    image: '/images/resources/events/event (1).png',
    author: {
      name: { vi: 'ULINK Events Bureau', en: 'ULINK Events Bureau', ja: 'ULINKイベント事務局' },
      role: { vi: 'Ban Tổ chức Sự kiện', en: 'Event Coordinator', ja: 'イベントコーディネーター' },
      avatar: '/images/about/op-team.webp'
    }
  },
  {
    id: 'ev-002',
    category: 'event',
    badge: { vi: 'Sự kiện', en: 'Events', ja: 'イベント' },
    title: {
      vi: 'B2B Business Networking: Kết nối chuỗi cung ứng công nghiệp phụ trợ 2026',
      en: 'B2B Business Networking: Supporting Industries Supply Chain 2026',
      ja: 'B2Bビジネスネットワーキング：裾野産業サプライチェーン接続2026'
    },
    description: {
      vi: 'Sự kiện kết nối các nhà sản xuất, nhà phân phối và doanh nghiệp công nghiệp hàng đầu khu vực miền Bắc tại Hà Nội.',
      en: 'Premier networking mixer for industrial manufacturers, tier-1 suppliers, and enterprise buyers in Northern Vietnam.',
      ja: 'ハノイで開催される北部地域トップの産業メーカー、サプライヤー、購買企業向けビジネスマッチングイベント。'
    },
    date: '22/08/2026',
    image: '/images/resources/events/event (2).png',
    author: {
      name: { vi: 'ULINK Commercial Team', en: 'ULINK Commercial Team', ja: 'ULINK営業統括部' },
      role: { vi: 'Ban Kết nối Doanh nghiệp', en: 'Partnership Lead', ja: 'パートナーシップリード' },
      avatar: '/images/about/op-team.webp'
    }
  },
  {
    id: 'ev-003',
    category: 'event',
    badge: { vi: 'Sự kiện', en: 'Events', ja: 'イベント' },
    title: {
      vi: 'Tọa đàm chuyên gia: Xu hướng tự động hóa & Công nghiệp 4.0 trong chuỗi logistics',
      en: 'Expert Panel: Automation & Industry 4.0 in Modern Supply Chains',
      ja: '専門家パネル：現代サプライチェーンにおける自動化とインダストリー4.0'
    },
    description: {
      vi: 'Cập nhật các giải pháp công nghệ đóng gói tự động, robot kho hàng AGV và số hóa chuỗi cung ứng công nghiệp hiện đại.',
      en: 'Showcasing automated packaging machinery, AGV warehouse robots, and end-to-end supply chain digitization frameworks.',
      ja: '自動包装ライン、AGV無人搬送車、最先端サプライチェーンのデジタルトランスフォーメーション最新動向。'
    },
    date: '05/09/2026',
    image: '/images/resources/events/event (3).png',
    author: {
      name: { vi: 'ULINK Tech Forum', en: 'ULINK Tech Forum', ja: 'ULINK技術フォーラム' },
      role: { vi: 'Hội đồng Khoa học Kỹ thuật', en: 'Technical Advisory Board', ja: '技術諮問委員会' },
      avatar: '/images/about/op-team.webp'
    }
  },
  {
    id: 'ev-004',
    category: 'event',
    badge: { vi: 'Sự kiện', en: 'Events', ja: 'イベント' },
    title: {
      vi: 'Workshop: Kỹ thuật kiểm soát tĩnh điện ESD S20.20 cho kỹ sư nhà máy',
      en: 'Workshop: ESD S20.20 Static Control Practices for Plant Engineers',
      ja: 'ワークショップ：工場エンジニア向けESD S20.20静電気対策実務'
    },
    description: {
      vi: 'Thực hành đo điện áp bước người, kiểm tra điện trở mặt bàn thao tác và hiệu chuẩn ionizer với thiết bị đo chuyên dụng.',
      en: 'Hands-on training in measuring body walking voltage, surface resistance validation, and ionizer calibration.',
      ja: '人体歩行帯電位測定、作業面抵抗値検証、専用測定器を用いたイオナイザー校正の実践講座。'
    },
    date: '18/09/2026',
    image: '/images/resources/autohtml/thumb17.png',
    author: {
      name: { vi: 'ULINK Academy', en: 'ULINK Academy', ja: 'ULINKアカデミー' },
      role: { vi: 'Trung tâm Đào tạo Kỹ thuật', en: 'Technical Training Center', ja: '技術研修センター' },
      avatar: '/images/about/op-team.webp'
    }
  },
  {
    id: 'ev-005',
    category: 'event',
    badge: { vi: 'Sự kiện', en: 'Events', ja: 'イベント' },
    title: {
      vi: 'Triển lãm Quốc tế Công nghiệp Hỗ trợ & Chế tạo VIMEXPO 2026',
      en: 'VIMEXPO 2026: Vietnam International Supporting Industry Exhibition',
      ja: 'VIMEXPO 2026：ベトナム国際裾野産業・製造業展示会'
    },
    description: {
      vi: 'Gian hàng ULink giới thiệu các giải pháp vật liệu bảo vệ bề mặt cao cấp, băng keo kỹ thuật HVAC và bao bì xuất khẩu thế hệ mới.',
      en: 'ULink pavilion displaying premium surface protection films, HVAC specialty tapes, and next-generation export wraps.',
      ja: 'ULink特設ブースにて、高機能表面保護フィルム、HVAC特殊テープ、最新の輸出用梱包資材を展示。'
    },
    date: '25/10/2026',
    image: '/images/resources/autohtml/thumb18.png',
    author: {
      name: { vi: 'ULINK Exhibition Team', en: 'ULINK Exhibition Team', ja: 'ULINK展示会チーム' },
      role: { vi: 'Ban Triển lãm Quốc tế', en: 'Exhibition Secretariat', ja: '展示会事務局' },
      avatar: '/images/logo/image.png'
    }
  }
];

function generateSql(): string {
  const lines: string[] = [];

  lines.push(`-- ====================================================================`);
  lines.push(`-- ULink B2B Platform: Full Seed Data for Resources Page`);
  lines.push(`-- 6 Complete Categories: guide, standard, case-study, market-news, news, event`);
  lines.push(`-- Generated: ${new Date().toISOString()}`);
  lines.push(`-- ====================================================================\n`);
  lines.push(`BEGIN;\n`);

  lines.push(`-- 1. Ensure schema / tables & columns exist`);
  lines.push(`CREATE TABLE IF NOT EXISTS public.blog_posts (
    id SERIAL PRIMARY KEY,
    status character varying(255) DEFAULT 'draft'::character varying,
    title character varying(255),
    slug character varying(255) UNIQUE,
    body text,
    cover text,
    author character varying(255),
    published_at timestamp with time zone,
    meta_title character varying(255),
    meta_description text,
    category character varying(255) DEFAULT NULL::character varying,
    author_role character varying(255) DEFAULT NULL::character varying,
    author_avatar character varying(255),
    description text,
    is_featured boolean DEFAULT false,
    industry integer,
    badge character varying(255)
);`);

  lines.push(`ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS category character varying(255);`);
  lines.push(`ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS author_role character varying(255);`);
  lines.push(`ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS author_avatar character varying(255);`);
  lines.push(`ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS description text;`);
  lines.push(`ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS is_featured boolean DEFAULT false;`);
  lines.push(`ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS industry integer;`);
  lines.push(`ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS badge character varying(255);`);

  lines.push(`CREATE TABLE IF NOT EXISTS public.blog_posts_translations (
    id SERIAL PRIMARY KEY,
    blog_posts_id integer REFERENCES public.blog_posts(id) ON DELETE CASCADE,
    languages_code character varying(255),
    title character varying(255),
    body text,
    meta_title character varying(255),
    meta_description text,
    description text,
    badge character varying(255)
);`);

  lines.push(`ALTER TABLE public.blog_posts_translations ADD COLUMN IF NOT EXISTS description text;`);
  lines.push(`ALTER TABLE public.blog_posts_translations ADD COLUMN IF NOT EXISTS badge character varying(255);`);

  lines.push(`CREATE TABLE IF NOT EXISTS public.events (
    id SERIAL PRIMARY KEY,
    status character varying(255) DEFAULT 'draft'::character varying,
    slug character varying(255) UNIQUE,
    title character varying(255),
    summary text,
    image character varying(255),
    date character varying(255),
    "time" character varying(255),
    start_time character varying(50),
    end_time character varying(50),
    location character varying(255),
    location_name character varying(255),
    address text,
    registration_status character varying(50) DEFAULT 'UPCOMING'::character varying,
    price character varying(100),
    overview text,
    highlights jsonb DEFAULT '[]'::jsonb,
    agenda jsonb DEFAULT '[]'::jsonb,
    speakers jsonb DEFAULT '[]'::jsonb,
    hosts jsonb DEFAULT '[]'::jsonb,
    sponsors jsonb DEFAULT '[]'::jsonb,
    benefits jsonb DEFAULT '[]'::jsonb,
    organizer_name character varying(255),
    organizer_description text,
    organizer_contact character varying(255),
    organizer_logo character varying(255),
    date_created timestamp with time zone DEFAULT now(),
    date_updated timestamp with time zone DEFAULT now(),
    organizer_role character varying(255) DEFAULT NULL::character varying
);`);

  lines.push(`CREATE TABLE IF NOT EXISTS public.events_translations (
    id SERIAL PRIMARY KEY,
    events_id integer REFERENCES public.events(id) ON DELETE CASCADE,
    languages_code character varying(255),
    title character varying(255),
    summary text,
    overview text,
    location_name character varying(255),
    address text,
    price character varying(100),
    organizer_description text,
    organizer_role character varying(255),
    agenda jsonb,
    speakers jsonb,
    hosts jsonb,
    benefits jsonb,
    highlights jsonb,
    organizer_name text
);`);

  const allArticles: SeedArticle[] = [
    ...GUIDES,
    ...STANDARDS,
    ...CASE_STUDIES,
    ...MARKET_NEWS,
    ...NEWS,
    ...EVENTS_ARTICLES
  ];

  lines.push(`\n-- 2. Clean & Seed 38 high-quality articles across 6 categories`);
  lines.push(`-- Guides: ${GUIDES.length}, Standards: ${STANDARDS.length}, Case Studies: ${CASE_STUDIES.length}, Market News: ${MARKET_NEWS.length}, News: ${NEWS.length}, Events: ${EVENTS_ARTICLES.length}\n`);

  for (const item of allArticles) {
    const slug = item.id;
    // Map category to the exact keyword expected by frontend resource-catalog.server.ts
    const categoryDbValue =
      item.category === 'market-news' ? 'market-news' :
      item.category === 'guide' ? 'Hướng dẫn kỹ thuật' :
      item.category === 'standard' ? 'Tiêu chuẩn' :
      item.category === 'case-study' ? 'Nghiên cứu điển hình' :
      item.category === 'event' ? 'Sự kiện' :
      'Tin tức';

    const author = pick(item.author.name, 'vi');
    const author_role = pick(item.author.role, 'vi');
    const author_avatar = item.author.avatar;
    const cover = item.image;
    const titleVi = pick(item.title, 'vi');
    const descVi = pick(item.description, 'vi');
    const badgeVi = pick(item.badge, 'vi');

    // Parse date into ISO timestamp
    const parts = item.date.split('/');
    let publishedAtIso: string;
    if (parts.length === 3) {
      publishedAtIso = new Date(+parts[2], +parts[1] - 1, +parts[0]).toISOString();
    } else {
      publishedAtIso = new Date().toISOString();
    }

    lines.push(`
DO $$
DECLARE
  v_post_id integer;
BEGIN
  INSERT INTO public.blog_posts (
    slug, title, description, cover, author, author_role, author_avatar,
    category, badge, published_at, status, meta_title, meta_description
  ) VALUES (
    ${sqlStr(slug)}, ${sqlStr(titleVi)}, ${sqlStr(descVi)}, ${sqlStr(cover)},
    ${sqlStr(author)}, ${sqlStr(author_role)}, ${sqlStr(author_avatar)},
    ${sqlStr(categoryDbValue)}, ${sqlStr(badgeVi)}, ${sqlStr(publishedAtIso)}::timestamptz,
    'published', ${sqlStr(titleVi)}, ${sqlStr(descVi)}
  )
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    cover = EXCLUDED.cover,
    author = EXCLUDED.author,
    author_role = EXCLUDED.author_role,
    author_avatar = EXCLUDED.author_avatar,
    category = EXCLUDED.category,
    badge = EXCLUDED.badge,
    published_at = EXCLUDED.published_at,
    status = 'published',
    meta_title = EXCLUDED.meta_title,
    meta_description = EXCLUDED.meta_description
  RETURNING id INTO v_post_id;

  DELETE FROM public.blog_posts_translations WHERE blog_posts_id = v_post_id;
`);

    for (const loc of LOCALES) {
      const title = pick(item.title, loc);
      const description = pick(item.description, loc);
      const body = buildBody(item, loc);
      const badge = pick(item.badge, loc);

      lines.push(`  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, ${sqlStr(loc)}, ${sqlStr(title)}, ${sqlStr(description)}, ${sqlStr(body)}, ${sqlStr(badge)}, ${sqlStr(title)}, ${sqlStr(description)}
  );`);
    }

    lines.push(`END $$;\n`);
  }

  lines.push(`-- Reset sequences
SELECT setval('blog_posts_id_seq', COALESCE((SELECT MAX(id) FROM blog_posts), 1));
SELECT setval('blog_posts_translations_id_seq', COALESCE((SELECT MAX(id) FROM blog_posts_translations), 1));
SELECT setval('events_id_seq', COALESCE((SELECT MAX(id) FROM events), 1));
SELECT setval('events_translations_id_seq', COALESCE((SELECT MAX(id) FROM events_translations), 1));

COMMIT;
`);

  return lines.join('\n');
}

const sql = generateSql();
const outPath = path.resolve(__dirname, '../../seed-resources.sql');
fs.writeFileSync(outPath, sql, 'utf-8');
console.log(`Generated ${outPath} successfully (${(sql.length / 1024).toFixed(1)} KB)`);
