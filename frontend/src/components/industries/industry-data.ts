import { IndustryData } from './types';

export function normalizeSlug(slug: string): string {
  if (slug === 'pharmaceutical' || slug === 'cosmetics' || slug === 'pharma-medical' || slug === 'pharmaceutical-cosmetics') {
    return 'pharmaceutical-cosmetics';
  } else if (slug === 'food' || slug === 'food-beverage') {
    return 'food-beverage';
  } else if (slug === 'furniture-wood' || slug === 'furniture') {
    return 'furniture';
  } else if (slug === 'construction-hvac' || slug === 'manufacturing' || slug === 'construction') {
    return 'construction';
  }
  return slug;
}

export const VALID_SLUGS = ['electronics', 'pharmaceutical-cosmetics', 'food-beverage', 'logistics', 'furniture', 'construction'];

export function getIndustryDetails(slug: string, locale: string) {
  const isVi = locale === 'vi';
  const isJa = locale === 'ja';

  let actualSlug = slug;
  if (slug === 'pharmaceutical' || slug === 'cosmetics' || slug === 'pharma-medical') {
    actualSlug = 'pharmaceutical-cosmetics';
  } else if (slug === 'food' || slug === 'food-beverage') {
    actualSlug = 'food-beverage';
  } else if (slug === 'furniture-wood') {
    actualSlug = 'furniture';
  } else if (slug === 'construction-hvac' || slug === 'manufacturing') {
    actualSlug = 'construction';
  }

  const VALID_SLUGS = ['electronics', 'pharmaceutical-cosmetics', 'food-beverage', 'logistics', 'furniture', 'construction'];
  if (!VALID_SLUGS.includes(actualSlug)) {
    return null;
  }

  if (actualSlug === 'pharmaceutical-cosmetics') {
    return {
      slug: 'pharmaceutical-cosmetics',
      name: isVi ? 'Dược phẩm & Y tế' : isJa ? '医薬品・医療' : 'Pharmaceutical & Medical',
      title: isVi ? 'Giải pháp cho ngành Dược phẩm & Y tế' : isJa ? '医薬品・医療産業向けソリューション' : 'Solutions for Pharmaceutical & Medical',
      description: isVi
        ? 'Đảm bảo tiêu chuẩn vô trùng khắt khe nhất trong sản xuất dược phẩm với các giải pháp phòng sạch, bao bì chống nhiễm khuẩn và vật tư y tế chuyên dụng.'
        : isJa
          ? '医薬品製造における最も厳格な無菌基準を確保するため、クリーンルーム、抗菌包装、および専門医療用品ソリューションを提供します。'
          : 'Ensure the strictest sterility standards in pharmaceutical manufacturing with cleanroom solutions, anti-contamination packaging, and specialized medical supplies.',
      iconName: 'Activity',
      gradient: 'from-emerald-600 to-teal-900',
      bannerImage: '/images/industries/pharma/pharma_hero.png',
      overviewImage: '/images/industries/pharma/pharma_overview.png',
      valueProps: [
        {
          title: isVi ? 'Vô trùng tuyệt đối' : isJa ? '完全な無菌性' : 'Absolute Sterility',
          desc: isVi ? 'Sản phẩm đạt chuẩn vô trùng cao nhất cho sản xuất dược phẩm.' : isJa ? '医薬品製造のための最高水準の無菌製品。' : 'Products meeting the highest sterility standards for pharmaceutical manufacturing.',
          iconName: 'ShieldCheck'
        },
        {
          title: isVi ? 'Kiểm soát ô nhiễm' : isJa ? '汚染制御' : 'Contamination Control',
          desc: isVi ? 'Triệt tiêu hạt bụi và vi sinh vật trong môi trường phòng sạch.' : isJa ? 'クリーンルーム環境における粉塵と微生物の排除。' : 'Eliminate dust particles and microorganisms in cleanroom environments.',
          iconName: 'Activity'
        },
        {
          title: isVi ? 'Tuân thủ GMP' : isJa ? 'GMP準拠' : 'GMP Compliance',
          desc: isVi ? 'Đáp ứng tiêu chuẩn thực hành sản xuất tốt của WHO và FDA.' : isJa ? 'WHOおよびFDAの適正製造基準に適合。' : 'Meeting WHO and FDA Good Manufacturing Practice standards.',
          iconName: 'Settings'
        },
        {
          title: isVi ? 'Tối ưu hóa chi phí' : isJa ? 'コスト最適化' : 'Cost Optimization',
          desc: isVi ? 'Giải pháp vật tư toàn diện giúp tiết kiệm chi phí vận hành nhà máy dược.' : isJa ? '包括的な資材ソリューションにより製薬工場の運用コストを削減。' : 'Comprehensive supply solutions help save pharmaceutical factory operational costs.',
          iconName: 'Zap'
        }
      ],
      challengesIntro: isVi ? 'Thách thức trong ngành Dược phẩm' : isJa ? '医薬品産業における課題' : 'Challenges in Pharmaceutical Industry',
      challenges: [
        {
          title: isVi ? 'Vi sinh vật và hạt bụi gây nhiễm khuẩn' : isJa ? '微生物と粉塵による汚染' : 'Microorganisms and dust causing contamination',
          desc: isVi ? 'Bất kỳ hạt bụi nhỏ hay vi sinh vật nào cũng có thể làm ảnh hưởng trực tiếp tới chất lượng mẻ thuốc và an toàn của người bệnh.' : isJa ? 'どんな微小な粉塵や微生物も、薬品バッチの品質と患者の安全に直接影響を与える可能性があります。' : 'Any small dust particle or microorganism can directly affect batch quality and patient safety.',
          iconName: 'Sparkles'
        },
        {
          title: isVi ? 'Yêu cầu phòng sạch cấp cao ISO 5-7' : isJa ? 'ISO 5-7高レベルクリーンルーム要件' : 'ISO 5-7 high-level cleanroom requirements',
          desc: isVi ? 'Sản xuất dược phẩm đòi hỏi phòng sạch cấp cao với kiểm soát hạt bụi nghiêm ngặt nhất.' : isJa ? '医薬品製造には最も厳格な粉塵管理を伴う高レベルのクリーンルームが必要です。' : 'Pharmaceutical production requires high-level cleanrooms with the strictest particle control.',
          iconName: 'ShieldCheck'
        },
        {
          title: isVi ? 'Bao bì tiếp xúc trực tiếp với dược phẩm' : isJa ? '医薬品に直接接触する包装材' : 'Packaging in direct contact with pharmaceuticals',
          desc: isVi ? 'Vật liệu bao bì phải đạt chuẩn FDA, không tương tác hóa học với thành phần hoạt chất.' : isJa ? '包装材料はFDA基準に適合し、有効成分と化学的に反応しないものでなければなりません。' : 'Packaging materials must meet FDA standards and not chemically interact with active ingredients.',
          iconName: 'Package'
        }
      ],
      cleanroomIntro: isVi ? 'Duy trì môi trường vô trùng tuyệt đối trong sản xuất dược phẩm với các vật tư phòng sạch chuyên dụng.' : isJa ? '専門のクリーンルーム用品で医薬品製造における完全な無菌環境を維持します。' : 'Maintain absolute sterile environments in pharmaceutical manufacturing with specialized cleanroom supplies.',
      cleanroomCategories: [
        {
          name: isVi ? 'Trang phục phòng sạch' : isJa ? 'クリーンルームウェア' : 'Cleanroom Apparel',
          desc: isVi ? 'Quần áo liền thân, mũ trùm đầu, bọc giày chống tĩnh điện chuyên dụng cho phòng sạch Class 100 - 10,000.' : 'Specialized anti-static apparel for Class 100 - 10,000 cleanrooms.',
          image: '/images/industries/pharma/pharma_apparel.png',
          slug: 'cleanroom-apparel'
        },
        {
          name: isVi ? 'Găng tay y tế & công nghiệp' : isJa ? '医療・工業用手袋' : 'Medical & Industrial Gloves',
          desc: isVi ? 'Găng tay Nitrile, Latex không bột, vô trùng chuyên dụng đạt tiêu chuẩn phẫu thuật và kiểm nghiệm phòng lab.' : 'Powder-free, sterile Nitrile & Latex gloves for surgical and lab testing.',
          image: '/images/industries/pharma/pharma_gloves.png',
          slug: 'cleanroom-gloves'
        },
        {
          name: isVi ? 'Khăn lau phòng sạch' : isJa ? 'クリーンルームワイパー' : 'Cleanroom Wipers',
          desc: isVi ? 'Khăn lau Wiper không xơ vải, kiểm soát hạt bụi tối đa và không để lại vết dầu dành riêng cho môi trường vô trùng.' : 'Lint-free wipers, maximum dust control and oil-free for sterile environments.',
          image: '/images/industries/pharma/pharma_wipers.png',
          slug: 'cleanroom-wipers'
        },
        {
          name: isVi ? 'Thảm dính phòng sạch' : isJa ? 'クリーンルーム用粘着マット' : 'Cleanroom Sticky Mats',
          desc: isVi ? 'Sticky mat nhiều lớp kiểm soát bụi và vi khuẩn tại cửa vào phòng sạch, ngăn ô nhiễm chéo từ bên ngoài.' : 'Multi-layer sticky mats controlling dust and bacteria at cleanroom entrances.',
          image: '/images/industries/pharma/pharma_mats.png',
          slug: 'cleanroom-consumables'
        }
      ],
      cleanroomViewAll: isVi ? 'Xem tất cả sản phẩm phòng sạch' : isJa ? 'すべてのクリーンルーム製品を見る' : 'See all cleanroom products',
      packagingIntro: isVi ? 'Bao bì chống nhiễm khuẩn và bảo quản dược phẩm đạt chuẩn FDA.' : isJa ? 'FDA基準に適合した抗菌・医薬品保管包装。' : 'Anti-contamination packaging and pharmaceutical preservation meeting FDA standards.',
      packagingCategories: [
        {
          name: isVi ? 'Túi PE phòng sạch' : isJa ? 'クリーンルーム用PE袋' : 'Cleanroom PE Bags',
          desc: isVi ? 'Túi polyethylene sạch dùng cho đóng gói linh kiện, thiết bị trong môi trường phòng sạch Class 100-10,000.' : 'Clean polyethylene bags for component packaging in Class 100-10,000 cleanrooms.',
          image: '/images/industries/pharma/pharma_pe_bags.png',
          slug: 'industrial-packaging'
        },
        {
          name: isVi ? 'Bao bì nhôm chân không' : isJa ? 'アルミ真空包装' : 'Vacuum Aluminum Packaging',
          desc: isVi ? 'Bao bì nhôm hàn nhiệt chân không, bảo quản sản phẩm khỏi ẩm và ô nhiễm. Có nhiều kích thước lựa chọn.' : 'Vacuum heat-sealed aluminum packaging protecting products from moisture & contamination.',
          image: '/images/industries/pharma/pharma_aluminum_bags.png',
          slug: 'industrial-packaging'
        },
        {
          name: isVi ? 'Túi zip chống tĩnh điện' : isJa ? '帯電防止ジッパー袋' : 'Anti-Static Zipper Bags',
          desc: isVi ? 'Túi ESD shielding bảo vệ linh kiện điện tử khỏi phóng tĩnh điện trong vận chuyển và lưu kho.' : 'ESD shielding bags protecting electronic components from electrostatic discharge.',
          image: '/images/industries/pharma/pharma_zip_bags.png',
          slug: 'industrial-packaging'
        },
        {
          name: isVi ? 'Khay & hộp đóng gói' : isJa ? 'トレイ＆包装ボックス' : 'Packaging Trays & Boxes',
          desc: isVi ? 'Khay nhựa và hộp carton sạch thiết kế riêng cho từng sản phẩm, đảm bảo cố định và bảo vệ tối ưu.' : 'Clean plastic trays and carton boxes custom-designed for each product.',
          image: '/images/industries/pharma/pharma_trays.png',
          slug: 'industrial-packaging'
        }
      ],
      packagingViewAll: isVi ? 'Xem tất cả sản phẩm đóng gói' : isJa ? 'すべての包装製品を見る' : 'See all packaging products',
      casesTitle: isVi ? 'Trường hợp áp dụng thực tế' : isJa ? '実際の導入事例' : 'Real-world Applications',
      cases: [
        {
          title: isVi ? 'Nâng cấp hệ thống vật tư phòng sạch nhà máy Traphaco' : isJa ? 'Traphaco工場のクリーンルーム資材アップグレード' : 'Upgrading cleanroom supplies for Traphaco factory',
          description: isVi ? 'Triển khai bộ giải pháp vật tư phòng sạch toàn diện giúp Traphaco đạt chuẩn WHO-GMP và giảm 40% tỉ lệ nhiễm khuẩn trong sản xuất.' : isJa ? '包括的なクリーンルーム資材ソリューションの導入により、TraphacoがWHO-GMP基準を達成し、製造時の汚染率を40%削減。' : 'Deploying comprehensive cleanroom supply solutions helped Traphaco achieve WHO-GMP certification and reduce contamination rates by 40%.',
          image: '/images/industries/pharma/pharma_case1.png',
          badge: isVi ? 'Giảm 40% nhiễm khuẩn' : isJa ? '汚染率40%低減' : '40% Contamination Reduction'
        },
        {
          title: isVi ? 'Tối ưu bao bì dược phẩm xuất khẩu' : isJa ? '輸出医薬品包装の最適化' : 'Optimizing export pharmaceutical packaging',
          description: isVi ? 'Chuyển đổi sang túi nhôm chống ẩm ULink giúp bảo quản nguyên liệu API nhạy cảm, loại bỏ 100% rủi ro hút ẩm trong vận chuyển quốc tế.' : isJa ? 'ULink防湿アルミ袋への移行により、敏感なAPI原料の保管を改善し、国際輸送中の吸湿リスクを100%排除。' : 'Switching to ULink moisture barrier bags improved sensitive API material storage, eliminating 100% of moisture absorption risks in international transit.',
          image: '/images/industries/pharma/pharma_case2.png',
          badge: isVi ? 'Chống ẩm 100%' : isJa ? '防湿100%' : '100% Moisture Proof'
        },
        {
          title: isVi ? 'Cải tiến quy trình phòng sạch nhà máy mỹ phẩm' : isJa ? '化粧品工場のクリーンルームプロセス改善' : 'Improving cleanroom process at cosmetics factory',
          description: isVi ? 'Áp dụng khăn lau không xơ vải và găng tay vô trùng ULink giúp tăng 25% tốc độ vệ sinh thiết bị và đạt chuẩn ISO 22716 cho sản xuất mỹ phẩm.' : isJa ? 'ULinkの無塵ワイパーと滅菌手袋の導入により、設備清掃速度が25%向上し、化粧品製造のISO 22716認証を取得。' : 'Applying ULink lint-free wipers and sterile gloves increased equipment cleaning speed by 25% and achieved ISO 22716 for cosmetics manufacturing.',
          image: '/images/industries/pharma/pharma_case3.png',
          badge: isVi ? 'Tăng 25% hiệu suất' : isJa ? '効率25%向上' : '25% Efficiency Boost'
        }
      ],
      whyUsTitle: isVi ? 'Vì sao chọn ULINK?' : isJa ? 'なぜULINKを選ぶのか？' : 'Why Choose ULINK?',
      whyUsList: isVi
        ? ['Sản phẩm đạt tiêu chuẩn chất lượng cao cấp, vô trùng tuyệt đối', 'Kiểm soát chất lượng nghiêm ngặt đạt chuẩn WHO-GMP và FDA', 'Nguồn cung ứng dồi dào, đảm bảo giao hàng đúng hẹn', 'Hỗ trợ kỹ thuật, kiểm định và hồ sơ năng lực đầy đủ cho nhà máy']
        : isJa
          ? ['最高水準の無菌品質を満たす製品', 'WHO-GMPおよびFDA規格に準拠した厳格な品質管理', '豊富な供給能力により確実な納期を約束', '技術サポート、製品検査、工場向け機能プロファイルの提供']
          : ['Products meeting premium sterile quality standards', 'Strict quality control complying with WHO-GMP and FDA', 'Abundant supply capacity ensuring on-time delivery', 'Technical support, inspection reports, and full factory profile documentation'],
      whyUsItems: isVi
        ? [
          {
            title: 'Chứng nhận quốc tế uy tín',
            desc: 'ISO 13485, CE, FDA và tiêu chuẩn an toàn y tế nghiêm ngặt nhất.',
            iconName: 'ShieldCheck'
          },
          {
            title: 'Năng lực cung ứng lớn',
            desc: 'Trung tâm phân phối hiện đại tại Hà Nam, không đứt gãy nguồn hàng.',
            iconName: 'Package'
          },
          {
            title: 'Giao nhận thần tốc 24-48h',
            desc: 'Kết nối nhanh tới các khu công nghiệp dược phẩm toàn quốc.',
            iconName: 'Truck'
          },
          {
            title: 'Tư vấn kỹ thuật',
            desc: 'Kỹ sư chuyên sâu tư vấn giải pháp phù hợp ngân sách doanh nghiệp.',
            iconName: 'User'
          }
        ]
        : isJa
          ? [
            {
              title: '信頼性の高い国際認証',
              desc: 'ISO 13485、CE、FDAおよび最も厳格な医療安全基準に適合。',
              iconName: 'ShieldCheck'
            },
            {
              title: '大規模な供給能力',
              desc: 'ハナムの現代的な物流センターにより供給の断絶を防ぎます。',
              iconName: 'Package'
            },
            {
              title: '24-48時間の迅速配送',
              desc: '全国の医薬品工業団地へ迅速に配送いたします。',
              iconName: 'Truck'
            },
            {
              title: '専門技術コンサルティング',
              desc: '専門エンジニアが企業の予算に合わせた最適ソリューションをご提案。',
              iconName: 'User'
            }
          ]
          : [
            {
              title: 'Prestigious International Certifications',
              desc: 'ISO 13485, CE, FDA, and the strictest medical safety standards.',
              iconName: 'ShieldCheck'
            },
            {
              title: 'Large Supply Capacity',
              desc: 'Modern distribution center in Ha Nam ensuring uninterrupted supply.',
              iconName: 'Package'
            },
            {
              title: 'Express 24-48h Delivery',
              desc: 'Fast connection to pharmaceutical industrial zones nationwide.',
              iconName: 'Truck'
            },
            {
              title: 'Technical Consulting',
              desc: 'Expert engineers advise solutions tailored to enterprise budget.',
              iconName: 'User'
            }
          ],
      standardsTitle: isVi ? 'Chứng nhận & tiêu chuẩn áp dụng' : isJa ? '適用される認証＆規格' : 'Certifications & Standards',
      standards: [
        { name: 'ISO 13485:2016', detail: isVi ? 'Hệ thống quản lý chất lượng thiết bị y tế - tiêu chuẩn toàn cầu cho sản xuất dược phẩm an toàn.' : isJa ? '医療機器品質マネジメントシステム。' : 'Medical device quality management system standard.' },
        { name: 'GMP - WHO', detail: isVi ? 'Thực hành sản xuất thuốc tốt theo tiêu chuẩn Tổ chức Y tế Thế giới, bắt buộc cho nhà máy dược phẩm.' : isJa ? 'WHO世界保健機関適正製造基準。' : 'Good manufacturing practice for pharmaceuticals.' },
        { name: 'ISO 14644 Cleanroom', detail: isVi ? 'Tiêu chuẩn quốc tế về phân loại và kiểm soát môi trường phòng sạch trong sản xuất Dược phẩm & Y tế.' : isJa ? 'クリーンルーム環境管理国際規格。' : 'International cleanroom environmental control standard.' },
        { name: 'FDA 21 CFR', detail: isVi ? 'Tuân thủ quy định FDA Hoa Kỳ cho bao bì tiếp xúc trực tiếp với dược phẩm và thực phẩm chức năng.' : isJa ? '米国FDA直接接触包装規制適合。' : 'FDA US code of federal regulations for direct packaging.' }
      ],
      resourcesTitle: isVi ? 'Tài liệu liên quan' : isJa ? '関連資料' : 'Related Resources',
      catalogue: {
        title: isVi ? 'Catalogue giải pháp cho ngành Dược phẩm & Y tế' : isJa ? '医薬品・医療用ソリューションカタログ' : 'Solutions Catalogue for Pharmaceuticals & Medical',
        info: 'PDF / 5.8MB',
        url: '#'
      }
    };
  }

  if (actualSlug === 'electronics') {
    return {
      slug: 'electronics',
      name: isVi ? 'Điện tử & Bán dẫn' : isJa ? '電子・半導体' : 'Electronics & Semiconductors',
      title: isVi ? 'Giải pháp cho ngành Điện tử & Bán dẫn' : isJa ? '電子・半導体産業向けソリューション' : 'Solutions for Electronics & Semiconductors',
      description: isVi
        ? 'Tối ưu kiểm soát ô nhiễm và quy trình đóng gói để đảm bảo chất lượng và độ tin cậy của linh kiện điện tử.'
        : isJa
          ? '電子部品の品質と信頼性を確保するために、汚染管理と包装プロセスを最適化します。'
          : 'Optimize contamination control and packaging processes to ensure the quality and reliability of electronic components.',
      iconName: 'Cpu',
      gradient: 'from-blue-600 to-indigo-900',
      bannerImage: '/images/industries/electronics/banner.png',
      overviewImage: '/images/industries/electronics/overview-product.png',
      valueProps: [
        {
          title: isVi ? 'Đảm bảo chất lượng cao' : isJa ? '高品質の保証' : 'High Quality Assurance',
          desc: isVi ? 'Kiểm soát tĩnh điện và hạt bụi giúp giảm thiểu rủi ro lỗi sản phẩm.' : isJa ? '静電気とチリの制御により、製品の欠陥リスクを最小限に抑えます。' : 'Controlling static and dust particles minimizes product defect risks.',
          iconName: 'ShieldCheck'
        },
        {
          title: isVi ? 'Nâng cao hiệu suất sản xuất' : isJa ? '生産効率の向上' : 'Enhance Production Efficiency',
          desc: isVi ? 'Tiêu chuẩn hóa vật tư và quy trình giúp tăng hiệu quả và năng suất.' : isJa ? '資材とプロセスの標準化により、効率と生産性が向上します。' : 'Standardizing supplies and processes improves efficiency and productivity.',
          iconName: 'Settings'
        },
        {
          title: isVi ? 'Tối ưu chuỗi cung ứng' : isJa ? 'サプライチェーンの最適化' : 'Optimize Supply Chain',
          desc: isVi ? 'Nguồn cung ổn định toàn cầu và giao hàng đúng hạn.' : isJa ? '安定したグローバル供給とタイムリーな納品。' : 'Stable global supply and timely delivery.',
          iconName: 'Globe'
        },
        {
          title: isVi ? 'Tối ưu hóa chi phí' : isJa ? 'コスト最適化' : 'Cost Optimization',
          desc: isVi ? 'Giải pháp vật tư toàn diện giúp tiết kiệm chi phí vận hành.' : isJa ? '包括的な資材ソリューションにより、運用コストを削減します。' : 'Comprehensive supply solutions help save operational costs.',
          iconName: 'Zap'
        }
      ],
      challengesIntro: isVi ? 'Thách thức trong ngành Điện tử' : isJa ? '電子産業における課題' : 'Challenges in the Electronics Industry',
      challenges: [
        {
          title: isVi ? 'Hạt bụi siêu nhỏ gây lỗi sản phẩm' : isJa ? '極小の塵埃による製品の不具合' : 'Micro dust particles causing product defects',
          desc: isVi ? 'Hạt bụi siêu mịn bám dính trên các lớp quang khắc gây chập mạch, đứt đường dẫn điện cực.' : isJa ? '超微細な塵埃がフォトリソグラフィー層に付着し、短絡や電極の断線を引き起こします。' : 'Ultra-fine dust particles adhering to photolithography layers cause short circuits or electrode breakage.',
          iconName: 'Sparkles'
        },
        {
          title: isVi ? 'Tĩnh điện gây hư hỏng linh kiện' : isJa ? '静電気による部品の損傷' : 'Static electricity damaging components',
          desc: isVi ? 'Hiện tượng phóng tĩnh điện (ESD) gây hỏng chip ngầm không thể phát hiện bằng mắt thường.' : isJa ? '静電気放電（ESD）により、目視では検出できない潜在的なチップ破損が発生します。' : 'Electrostatic discharge (ESD) causes latent chip damage undetectable to the eye.',
          iconName: 'Zap'
        },
        {
          title: isVi ? 'Va đập trong vận chuyển gây suy giảm chất lượng' : isJa ? '輸送時の衝撃による品質低下' : 'Impact during transport degrading quality',
          desc: isVi ? 'Va đập, rung chấn và độ ẩm cao trong quá trình lưu kho và vận chuyển làm giảm độ tin cậy và tuổi thọ linh kiện.' : isJa ? '保管や輸送中の衝撃、振動、高湿度は、部品の信頼性と寿命を低下させます。' : 'Impacts, vibrations, and high humidity during storage and transport reduce component reliability and lifespan.',
          iconName: 'Truck'
        }
      ],
      cleanroomIntro: isVi ? 'Duy trì môi trường sản xuất sạch sẽ, kiểm soát hạt bụi và tĩnh điện.' : isJa ? 'クリーンな製造環境を維持し、塵埃と静電気を制御します。' : 'Maintain a clean manufacturing environment, controlling dust particles and static electricity.',
      cleanroomCategories: [
        { name: isVi ? 'Quần áo phòng sạch' : isJa ? 'クリーンルームウェア＆用品' : 'Cleanroom Wear & Accessories', image: '/images/industries/electronics_hero.webp', slug: 'cleanroom-apparel' },
        { name: isVi ? 'Găng tay phòng sạch' : isJa ? 'クリーンルーム手袋' : 'Cleanroom Gloves', image: '/images/industries/electronics_hero.webp', slug: 'cleanroom-gloves' },
        { name: isVi ? 'Khẩu trang phòng sạch' : isJa ? 'クリーンルームマスク' : 'Cleanroom Masks', image: '/images/industries/electronics_hero.webp', slug: 'cleanroom-masks' },
        { name: isVi ? 'Thảm dính bụi' : isJa ? '粘着マット' : 'Sticky Mats', image: '/images/industries/electronics_hero.webp', slug: 'cleanroom-consumables' }
      ],
      cleanroomViewAll: isVi ? 'Xem tất cả sản phẩm phòng sạch' : isJa ? 'すべてのクリーンルーム製品を見る' : 'See all cleanroom products',
      packagingIntro: isVi ? 'Bảo vệ linh kiện trong quá trình lưu trữ và vận chuyển.' : isJa ? '保管および輸送プロセスにおいて部品を保護します。' : 'Protect components during storage and transportation processes.',
      packagingCategories: [
        { name: isVi ? 'Màng PE (LLDPE)' : isJa ? 'PEストレッチフィルム' : 'PE Stretch Film (LLDPE)', image: '/images/industries/electronics_hero.webp', slug: 'industrial-packaging' },
        { name: isVi ? 'Túi chống tĩnh điện & màng chống tĩnh điện' : isJa ? '帯電防止袋＆フィルム' : 'ESD Shielding Bags & Film', image: '/images/industries/electronics_hero.webp', slug: 'esd-supplies' },
        { name: isVi ? 'Khay nhựa (ESD)' : isJa ? 'ESDプラスチックトレイ' : 'ESD Plastic Trays', image: '/images/industries/electronics_hero.webp', slug: 'esd-supplies' },
        { name: isVi ? 'Túi nhôm chống ẩm' : isJa ? '防湿アルミ袋' : 'Moisture Barrier Aluminum Bags', image: '/images/industries/electronics_hero.webp', slug: 'industrial-packaging' }
      ],
      packagingViewAll: isVi ? 'Xem tất cả sản phẩm đóng gói' : isJa ? 'すべての包装製品を見る' : 'See all packaging products',
      casesTitle: isVi ? 'Trường hợp áp dụng thực tế' : isJa ? '実際の導入事例' : 'Real-world Applications',
      cases: [
        {
          title: isVi ? 'Cải thiện môi trường sản xuất tại nhà máy linh kiện' : isJa ? '部品工場における製造環境の改善' : 'Improving production environment at component factory',
          description: isVi ? 'Giảm tỉ lệ lỗi sản phẩm từ 1.8% xuống 1.2% nhờ quy trình kiểm soát hạt bụi và tĩnh điện đồng bộ tại phòng sạch Class 100.' : isJa ? 'Class 100クリーンルームでの一貫した塵埃と静電気管理プロセスにより、製品不具合率を1.8%から1.2%に低減。' : 'Reduced product defect rate from 1.8% to 1.2% through synchronized dust and static control processes in a Class 100 cleanroom.',
          image: '/images/industries/electronics_hero.webp',
          badge: isVi ? 'Giảm 32% lỗi' : isJa ? '不良率32%低減' : '32% Defect Reduction'
        },
        {
          title: isVi ? 'Tối ưu bao bì cho doanh nghiệp lắp ráp bán dẫn' : isJa ? '半導体アセンブリ企業の包装最適化' : 'Optimizing packaging for semiconductor assembly company',
          description: isVi ? 'Loại bỏ hoàn toàn rủi ro phóng tĩnh điện trong quá trình vận chuyển liên tỉnh bằng cách chuyển sang khay nhựa ESD và túi nhôm che chắn sóng.' : isJa ? 'ESDプラスチックトレイとシールドアルミ袋への変更により、都市間輸送中の静電気放電リスクを完全に排除。' : 'Completely eliminated electrostatic discharge risks during inter-provincial transit by switching to ESD plastic trays and shielding aluminum bags.',
          image: '/images/industries/electronics_hero.webp',
          badge: isVi ? 'Giảm 45% hư hỏng' : isJa ? '破損45%削減' : '45% Damage Reduction'
        },
        {
          title: isVi ? 'Giải pháp cho nhà cung cấp linh kiện điện tử' : isJa ? '電子部品サプライヤー向けソリューション' : 'Solutions for electronic component suppliers',
          description: isVi ? 'Tăng 28% hiệu suất đóng gói cuối cùng, tăng tốc độ xử lý đơn hàng và tiết kiệm 15% chi phí vật tư bằng thiết kế cuộn màng PE tùy chỉnh.' : isJa ? 'カスタム設計のPEフィルムロールの導入により、最終包装効率が28%向上し、注文処理の迅速化と15%の資材コスト削減を実現。' : 'Increased final packaging efficiency by 28%, accelerated order processing, and saved 15% in materials cost through custom PE film roll designs.',
          image: '/images/industries/electronics_hero.webp',
          badge: isVi ? 'Tăng 28% hiệu suất' : isJa ? '効率28%向上' : '28% Efficiency Increase'
        }
      ],
      whyUsTitle: isVi ? 'Vì sao chọn ULINK?' : isJa ? 'なぜULINKを選ぶのか？' : 'Why Choose ULINK?',
      whyUsList: isVi
        ? ['Sản phẩm đạt tiêu chuẩn chất lượng cao cấp, vô trùng tuyệt đối', 'Kiểm soát chất lượng nghiêm ngặt đạt chuẩn WHO-GMP và FDA', 'Nguồn cung ứng dồi dào, đảm bảo giao hàng đúng hẹn', 'Hỗ trợ kỹ thuật, kiểm định và hồ sơ năng lực đầy đủ cho nhà máy']
        : isJa
          ? ['最高水準の無菌品質を満たす製品', 'WHO-GMPおよびFDA規格に準拠した厳格な品質管理', '豊富な供給能力により確実な納期を約束', '技術サポート、製品検査、工場向け機能プロファイルの提供']
          : ['Products meeting premium sterile quality standards', 'Strict quality control complying with WHO-GMP and FDA', 'Abundant supply capacity ensuring on-time delivery', 'Technical support, inspection reports, and full factory profile documentation'],
      whyUsItems: isVi
        ? [
          {
            title: 'Chứng nhận quốc tế uy tín',
            desc: 'ISO 13485, CE, FDA và tiêu chuẩn an toàn y tế nghiêm ngặt nhất.',
            iconName: 'ShieldCheck'
          },
          {
            title: 'Năng lực cung ứng lớn',
            desc: 'Trung tâm phân phối hiện đại tại Hà Nam, không đứt gãy nguồn hàng.',
            iconName: 'Package'
          },
          {
            title: 'Giao nhận thần tốc 24-48h',
            desc: 'Kết nối nhanh tới các khu công nghiệp dược phẩm toàn quốc.',
            iconName: 'Truck'
          },
          {
            title: 'Tư vấn kỹ thuật',
            desc: 'Kỹ sư chuyên sâu tư vấn giải pháp phù hợp ngân sách doanh nghiệp.',
            iconName: 'User'
          }
        ]
        : isJa
          ? [
            {
              title: '信頼性の高い国際認証',
              desc: 'ISO 13485、CE、FDAおよび最も厳格な医療安全基準に適合。',
              iconName: 'ShieldCheck'
            },
            {
              title: '大規模な供給能力',
              desc: 'ハナムの現代的な物流センターにより供給の断絶を防ぎます。',
              iconName: 'Package'
            },
            {
              title: '24-48時間の迅速配送',
              desc: '全国の医薬品工業団地へ迅速に配送いたします。',
              iconName: 'Truck'
            },
            {
              title: '専門技術コンサルティング',
              desc: '専門エンジニアが企業の予算に合わせた最適ソリューションをご提案。',
              iconName: 'User'
            }
          ]
          : [
            {
              title: 'Prestigious International Certifications',
              desc: 'ISO 13485, CE, FDA, and the strictest medical safety standards.',
              iconName: 'ShieldCheck'
            },
            {
              title: 'Large Supply Capacity',
              desc: 'Modern distribution center in Ha Nam ensuring uninterrupted supply.',
              iconName: 'Package'
            },
            {
              title: 'Express 24-48h Delivery',
              desc: 'Fast connection to pharmaceutical industrial zones nationwide.',
              iconName: 'Truck'
            },
            {
              title: 'Technical Consulting',
              desc: 'Expert engineers advise solutions tailored to enterprise budget.',
              iconName: 'User'
            }
          ],
      standardsTitle: isVi ? 'Chứng nhận & tiêu chuẩn áp dụng' : isJa ? '適用される認証＆規格' : 'Certifications & Standards',
      standards: [
        { name: 'ISO 13485:2016', detail: isVi ? 'Hệ thống quản lý chất lượng thiết bị y tế - tiêu chuẩn toàn cầu cho sản xuất dược phẩm an toàn.' : isJa ? '医療機器品質マネジメントシステム。' : 'Medical device quality management system standard.' },
        { name: 'GMP - WHO', detail: isVi ? 'Thực hành sản xuất thuốc tốt theo tiêu chuẩn Tổ chức Y tế Thế giới, bắt buộc cho nhà máy dược phẩm.' : isJa ? 'WHO世界保健機関適正製造基準。' : 'Good manufacturing practice for pharmaceuticals.' },
        { name: 'ISO 14644 Cleanroom', detail: isVi ? 'Tiêu chuẩn quốc tế về phân loại và kiểm soát môi trường phòng sạch trong sản xuất Dược phẩm & Y tế.' : isJa ? 'クリーンルーム環境管理国際規格。' : 'International cleanroom environmental control standard.' },
        { name: 'FDA 21 CFR', detail: isVi ? 'Tuân thủ quy định FDA Hoa Kỳ cho bao bì tiếp xúc trực tiếp với dược phẩm và thực phẩm chức năng.' : isJa ? '米国FDA直接接触包装規制適合。' : 'FDA US code of federal regulations for direct packaging.' }
      ],
      resourcesTitle: isVi ? 'Tài liệu liên quan' : isJa ? '関連資料' : 'Related Resources',
      catalogue: {
        title: isVi ? 'Catalogue giải pháp cho ngành Dược phẩm & Y tế' : isJa ? '医薬品・医療用ソリューションカタログ' : 'Solutions Catalogue for Pharmaceuticals & Medical',
        info: 'PDF / 5.8MB',
        url: '#'
      }
    };
  }

  if (actualSlug === 'food-beverage') {
    return {
      slug: 'food-beverage',
      name: isVi ? 'Thực phẩm & Đồ uống' : isJa ? '食品・飲料' : 'Food & Beverage',
      title: isVi ? 'Giải pháp Ngành Thực phẩm & Đồ uống' : isJa ? '食品・飲料産業向けソリューション' : 'Solutions for Food & Beverage Industry',
      description: isVi
        ? 'Tối ưu hóa hiệu suất vận hành, ổn định chất lượng sản phẩm và tích hợp liền mạch với dây chuyền đóng gói tự động hóa. ULink cung cấp giải pháp toàn diện giúp doanh nghiệp nâng cao năng suất, giảm thiểu lãng phí và đạt tiêu chuẩn quốc tế.'
        : isJa
          ? '運用効率の最適化、製品品質の安定化、自動包装ラインへのシームレスな統合。ULinkは、生産性の向上、廃棄の削減、国際基準の達成を支援する包括的なソリューションを提供します。'
          : 'Optimize operational performance, stabilize product quality, and seamlessly integrate with automated packaging lines. ULink provides comprehensive solutions.',
      iconName: 'Utensils',
      gradient: 'from-amber-500 to-orange-800',
      bannerImage: '/images/industries/food/food_hero.png',
      overviewImage: '/images/industries/food/food_overview.png',
      valueProps: [
        {
          title: isVi ? 'Đạt chuẩn FDA' : isJa ? 'FDA適合' : 'FDA Certified',
          desc: isVi ? 'Vật liệu an toàn tuyệt đối khi tiếp xúc trực tiếp với thực phẩm.' : isJa ? '食品に直接接触しても完全に安全な素材を使用。' : 'Materials fully safe for direct contact with food products.',
          iconName: 'ShieldCheck'
        },
        {
          title: isVi ? 'Kiểm soát xơ vải & vi nhựa' : isJa ? '繊維・マイクロプラスチック制御' : 'Lint & Microplastics Control',
          desc: isVi ? 'Hạn chế dị vật rơi vào nguyên liệu chế biến.' : isJa ? '加工原材料への異物混入を効果的に抑制。' : 'Effectively prevents foreign objects from falling into ingredients.',
          iconName: 'Activity'
        },
        {
          title: isVi ? 'Quy trình chuẩn hóa' : isJa ? 'プロセスの標準化' : 'Process Standardization',
          desc: isVi ? 'Tiêu chuẩn hóa vật tư giúp dây chuyền luôn ổn định.' : isJa ? '資材の標準化により生産ラインを安定させます。' : 'Standardizing supplies keeps the production lines stable.',
          iconName: 'Settings'
        },
        {
          title: isVi ? 'Tối ưu chi phí' : isJa ? 'コスト最適化' : 'Cost Optimization',
          desc: isVi ? 'Giảm thiểu hao phí vật tư và đóng gói hiệu quả.' : isJa ? '包装資材の無駄を最小限に抑え、効率化を図ります。' : 'Minimizes material waste and increases packaging efficiency.',
          iconName: 'Zap'
        }
      ],
      challengesIntro: isVi ? 'Thách thức trong ngành Thực phẩm' : isJa ? '食品産業における課題' : 'Challenges in the Food Industry',
      challenges: [
        {
          title: isVi ? 'Rác thải vi nhựa và xơ vải rơi vào nguyên liệu' : isJa ? '原材料へのマイクロプラスチック・繊維混入' : 'Microplastics & fibers falling into ingredients',
          desc: isVi ? 'Xơ vải từ trang phục bảo hộ cũ rơi vào bồn trộn nguyên liệu gây lỗi chất lượng thành phẩm hàng loạt.' : isJa ? '古い防護服からの繊維が混合タンクに混入し、大量の製品品質不良の原因となります。' : 'Fibers from old protective suits falling into mixing vats cause bulk product quality defects.',
          iconName: 'Sparkles'
        },
        {
          title: isVi ? 'Bao bì đóng gói pallet bên ngoài bị rách' : isJa ? '外装パレット包装の破損・破れ' : 'Outer pallet packaging tearing or breaking',
          desc: isVi ? 'Màng quấn pallet không đủ dai dẫn đến rách, làm ẩm nước và côn trùng xâm nhập trong kho lạnh.' : isJa ? 'パレットストレッチフィルムの強度が不足し、冷凍庫内での破れや湿気、虫の侵入を招きます。' : 'Insufficient pallet stretch film strength leads to tearing, moisture, and pest intrusion in cold storage.',
          iconName: 'AlertCircle'
        },
        {
          title: isVi ? 'Quy trình lau chùi băng chuyền dính dầu mỡ' : isJa ? 'コンベアの油分除去・清掃作業' : 'Conveyor belt grease cleaning process',
          desc: isVi ? 'Hao phí thời gian và hóa chất khi lau băng tải thực phẩm bằng khăn thông thường phát sinh bụi vải.' : isJa ? '通常のタオルで食品コンベアを清掃すると、清掃時間や化学薬品の浪費、および布埃が発生します。' : 'Wiping food conveyor belts with regular cloths wastes time/chemicals and generates lint dust.',
          iconName: 'Settings'
        }
      ],
      cleanroomIntro: isVi ? 'Giải pháp kiểm soát vệ sinh, trang phục bảo hộ đạt chuẩn tiếp xúc thực phẩm.' : isJa ? '食品接触基準に適合した衛生管理・防護服ソリューション。' : 'Sanitation control and protective wear solutions complying with food contact standards.',
      cleanroomCategories: [
        { name: isVi ? 'Mũ bảo hộ & Khẩu trang thực phẩm' : isJa ? '食品用キャップ＆マスク' : 'Food Grade Caps & Masks', desc: isVi ? 'Thiết kế bao bọc toàn bộ tóc và mặt, ngăn rụng tóc và bắn nước bọt vào sản phẩm.' : isJa ? '毛髪や唾液の飛散を防止。' : 'Covers hair and face to prevent contamination.', image: '/images/industries/food/food_cap_mask.png', slug: 'cleanroom-masks' },
        { name: isVi ? 'Găng tay cao su tiếp xúc thực phẩm' : isJa ? '食品接触用ゴム手袋' : 'Food Contact Rubber Gloves', desc: isVi ? 'Găng tay Nitrile/Latex không bột đạt chuẩn FDA 21 CFR tiếp xúc trực tiếp thực phẩm.' : isJa ? 'FDA適合パウダーフリー手袋。' : 'Powder-free gloves complying with FDA 21 CFR.', image: '/images/industries/food/food_gloves.png', slug: 'cleanroom-gloves' },
        { name: isVi ? 'Giấy lau băng tải không bụi' : isJa ? '無塵コンベアワイパー' : 'Lint-free Conveyor Wipers', desc: isVi ? 'Khăn lau không phát tán xơ vải, thấm hút dầu mỡ cực nhanh cho dây chuyền F&B.' : isJa ? '発塵防止、油分吸収性に優れたワイパー。' : 'Lint-free wipers with superior oil absorption.', image: '/images/industries/food/food_wipers.png', slug: 'cleanroom-wipers' },
        { name: isVi ? 'Màng PE co bọc hàng' : isJa ? 'PEシュリンクフィルム' : 'PE Shrink Packaging Film', desc: isVi ? 'Màng PE bảo vệ pallet khỏi ẩm mốc, bụi bẩn và va đập khi lưu kho và vận chuyển.' : isJa ? '保管・輸送時の防湿・防塵フィルム。' : 'PE film protecting pallets from moisture & dust.', image: '/images/industries/food/food_pe_shrink.png', slug: 'industrial-packaging' }
      ],
      cleanroomViewAll: isVi ? 'Xem tất cả sản phẩm phòng sạch' : isJa ? 'すべてのクリーンルーム製品を見る' : 'See all cleanroom products',
      packagingIntro: isVi ? 'Màng bọc, màng co đóng gói an toàn thực phẩm.' : isJa ? '食品安全衛生に準拠したラッピング・シュリンクフィルム。' : 'Wrapping and shrink film solutions complying with food safety standards.',
      packagingCategories: [
        { name: isVi ? 'Túi PE thực phẩm đóng gói' : isJa ? '食品用PE bao bì' : 'Food Grade PE Bags', desc: isVi ? 'Túi PE dẻo dai, không chứa chất độc hại, bảo quản độ tươi ngon của nguyên liệu.' : isJa ? '無毒で柔軟な食品用PE袋。' : 'Flexible, non-toxic PE bags for food preservation.', image: '/images/industries/food/food_pe_bag.png', slug: 'industrial-packaging' },
        { name: isVi ? 'Túi zip bảo vệ thực phẩm' : isJa ? '食品用ジップ袋' : 'Food Zip Lock Bags', desc: isVi ? 'Túi miết miệng khóa kín 100%, bảo vệ độ ẩm và ngăn bay mùi.' : isJa ? '100%密閉防湿ジップ袋。' : '100% airtight zip bags protecting humidity & flavor.', image: '/images/industries/food/food_zip_bag.png', slug: 'industrial-packaging' },
        { name: isVi ? 'Màng co POF bọc khay thực phẩm' : isJa ? 'POFシュリンクフィルム' : 'POF Shrink Film for Trays', desc: isVi ? 'Màng co POF trong suốt, độ bóng cao, an toàn tuyệt đối cho thực phẩm chế biến sẵn.' : isJa ? '高透明・高光沢のPOFフィルム。' : 'High transparency POF shrink film for ready meals.', image: '/images/industries/food/food_pof_film.png', slug: 'industrial-packaging' }
      ],
      packagingViewAll: isVi ? 'Xem tất cả sản phẩm đóng gói' : isJa ? 'すべての包装製品を見る' : 'See all packaging products',
      casesTitle: isVi ? 'Khách hàng tin dùng trong ngành Thực phẩm & Đồ uống' : isJa ? '食品・飲料業界の導入事例' : 'Trusted by Food & Beverage Clients',
      cases: [
        {
          title: isVi ? 'Nhà máy chế biến thực phẩm đông lạnh xuất khẩu' : isJa ? '水産・冷凍食品加工工場' : 'Export frozen food processing plant',
          description: isVi ? 'Cung cấp toàn bộ giải pháp vệ sinh công nghiệp, bao bì tiệt trùng và vật tư phòng sạch cho dây chuyền chế biến thực phẩm đông lạnh đạt chuẩn HACCP & BRC.' : isJa ? 'HACCPおよびBRC基準を満たす冷凍食品加工ライン向け清掃・無菌包装・クリーンルーム資材を提供。' : 'Provided complete industrial hygiene, sterile packaging, and cleanroom supplies for frozen food processing lines meeting HACCP & BRC standards.',
          image: '/images/industries/food/food_case1.png',
          badge: isVi ? 'Chế biến thực phẩm' : isJa ? '食品加工' : 'Food Processing'
        },
        {
          title: isVi ? 'Dây chuyền đóng gói sữa và nước giải khát' : isJa ? '乳製品・飲料包装ライン' : 'Milk & beverage packaging line',
          description: isVi ? 'Giải pháp bao bì vô trùng, màng co nhiệt và hệ thống chiết rót khép kín đảm bảo an toàn thực phẩm cho sản phẩm sữa tươi và nước giải khát.' : isJa ? '無菌包装、シュリンクフィルム、密閉充填システムにより、牛乳および清涼飲料の食品安全を確保。' : 'Sterile packaging, shrink film, and closed filling system solutions ensuring food safety for fresh milk and beverages.',
          image: '/images/industries/food/food_case2.png',
          badge: isVi ? 'Đóng gói & Bảo quản' : isJa ? '包装・保管' : 'Packaging & Preservation'
        },
        {
          title: isVi ? 'Phòng lab kiểm tra an toàn vệ sinh thực phẩm' : isJa ? '食品安全検査ラボ' : 'Food safety testing lab',
          description: isVi ? 'Cung cấp kit test nhanh, dụng cụ lấy mẫu vô trùng và thiết bị bảo hộ cho phòng lab kiểm nghiệm vi sinh, hóa lý thực phẩm.' : isJa ? '微生物・物理化学食品検査ラボ向けに迅速テストキット、無菌採水器具、保護具を提供。' : 'Supplied rapid test kits, sterile sampling tools, and protective gear for microbiological and physicochemical food testing labs.',
          image: '/images/industries/food/food_case3.png',
          badge: isVi ? 'Kiểm nghiệm & QC' : isJa ? '検査・QC' : 'Testing & QC'
        }
      ],
      whyUsTitle: isVi ? 'Năng lực công nghệ & Cung ứng thực tế' : isJa ? 'テクノロジーと供給能力' : 'Technology & Supply Capability',
      whyUsList: isVi
        ? ['Dây chuyền sản xuất tự động với máy móc châu Âu', 'Áp dụng QC đa tầng theo ISO 9001:2015', 'Đội ngũ kỹ sư R&D kinh nghiệm, dùng mô phỏng 3D', 'Sản xuất theo yêu cầu riêng từ vật liệu đến quy cách']
        : isJa
          ? ['欧州製機械による自動生産ライン', 'ISO 9001:2015に準拠した多層QCの適用', '3Dシミュレーションを使用する経験豊富なR&Dチーム', '素材から仕様まで個別カスタマイズ生産']
          : ['Automated production line with European machinery', 'Applying multi-tier QC according to ISO 9001:2015', 'Experienced R&D engineering team using 3D simulation', 'Custom manufacturing tailored from materials to specifications'],
      whyUsItems: isVi
        ? [
          {
            title: 'Công Nghệ Sản Xuất Tiên Tiến',
            desc: 'Dây chuyền sản xuất tự động với máy móc châu Âu, đảm bảo chính xác tuyệt đối trong gia công và lắp ráp.',
            iconName: 'Award'
          },
          {
            title: 'Kiểm Soát Chất Lượng Nghiêm Ngặt',
            desc: 'Áp dụng QC đa tầng theo ISO 9001:2015, kiểm tra 100% sản phẩm trước xuất xưởng bằng thiết bị chuyên dụng.',
            iconName: 'ShieldCheck'
          },
          {
            title: 'Năng Lực Kỹ Thuật Chuyên Sâu',
            desc: 'Đội ngũ kỹ sư R&D kinh nghiệm, dùng mô phỏng 3D để tối ưu thiết kế trước sản xuất hàng loạt.',
            iconName: 'Activity'
          },
          {
            title: 'Giải Pháp Sản Xuất Tùy Chỉnh',
            desc: 'Sản xuất theo yêu cầu riêng của khách hàng — từ vật liệu, kích thước đến thông số kỹ thuật phù hợp từng ngành.',
            iconName: 'Settings'
          }
        ]
        : isJa
          ? [
            {
              title: '高度な製造技術',
              desc: '欧州製機械による自動生産ラインにより、精密な加工と組立てを実現。',
              iconName: 'Award'
            },
            {
              title: '厳格な品質管理',
              desc: 'ISO 9001:2015に準拠した多層QCを適用し、出荷前に製品を100%検査。',
              iconName: 'ShieldCheck'
            },
            {
              title: '深遠な技術能力',
              desc: '経験豊富なR&Dエンジニアが3Dシミュレーションを用いて設計を最適化。',
              iconName: 'Activity'
            },
            {
              title: 'カスタム製造ソリューション',
              desc: '素材、サイズから仕様までお客様のご要望に応じて個別カスタマイズ。',
              iconName: 'Settings'
            }
          ]
          : [
            {
              title: 'Advanced Production Technology',
              desc: 'Automated production line with European machinery ensuring absolute precision in processing and assembly.',
              iconName: 'Award'
            },
            {
              title: 'Strict Quality Control',
              desc: 'Applying multi-tier QC under ISO 9001:2015, testing 100% of products before shipment.',
              iconName: 'ShieldCheck'
            },
            {
              title: 'Deep Engineering Expertise',
              desc: 'Experienced R&D engineering team using 3D simulation to optimize designs prior to mass production.',
              iconName: 'Activity'
            },
            {
              title: 'Custom Manufacturing Solutions',
              desc: 'Custom manufacturing tailored to client requests — from materials and dimensions to industry specs.',
              iconName: 'Settings'
            }
          ],
      standardsTitle: isVi ? 'Chứng nhận & tiêu chuẩn áp dụng' : isJa ? '適用される認証＆規格' : 'Certifications & Standards',
      standards: [
        { name: 'FDA 21 CFR', detail: isVi ? 'Tiêu chuẩn an toàn vật liệu tiếp xúc trực tiếp thực phẩm Hoa Kỳ.' : isJa ? '米国FDA食品直接接触安全基準。' : 'FDA regulations for direct food contact safety.' },
        { name: 'HACCP', detail: isVi ? 'Hệ thống phân tích mối nguy và kiểm soát điểm tới hạn trong chế biến.' : isJa ? 'ハサップ食品衛生・危険分析重要管理点。' : 'Hazard analysis and critical control points in food.' },
        { name: 'ISO 22000:2018', detail: isVi ? 'Hệ thống quản lý an toàn thực phẩm chuỗi cung ứng toàn cầu.' : isJa ? '食品安全マネジメントシステム国際規格。' : 'Food safety management system for global supply chains.' },
        { name: 'ISO 9001:2015', detail: isVi ? 'Hệ thống quản lý chất lượng quy trình bao bì và chế biến thực phẩm.' : isJa ? '食品加工・包装プロセスの品質管理。' : 'Quality management system for food processing & packaging.' }
      ],
      resourcesTitle: isVi ? 'Tài liệu liên quan' : isJa ? '関連資料' : 'Related Resources',
      catalogue: {
        title: isVi ? 'Catalogue giải pháp ngành Thực phẩm & Đồ uống' : isJa ? '食品・飲料向けカタログ' : 'Solutions Catalogue for Food & Beverage',
        info: 'PDF / 5.8MB',
        url: '#'
      }
    };
  }

  if (actualSlug === 'logistics') {
    return {
      slug: 'logistics',
      name: isVi ? 'Kho vận & Logistics' : isJa ? '倉庫＆物流' : 'Warehouse & Logistics',
      title: isVi ? 'Giải pháp cho ngành Kho vận & Logistics' : isJa ? '倉庫＆物流向けソリューション' : 'Solutions for Warehouse & Logistics',
      description: isVi
        ? 'Tối ưu hóa quy trình lưu kho, vận chuyển và phân phối hàng hóa với giải pháp màng quấn pallet, bao bì chống ẩm và chống va đập chuyên dụng.'
        : isJa
          ? '専用のパレットラッピングフィルム、防湿・耐衝撃包装ソリューションにより、倉庫保管、輸送、および流通プロセスを最適化します。'
          : 'Optimize warehousing, transport, and distribution processes with specialized pallet wrap film, moisture-proof, and anti-impact packaging solutions.',
      iconName: 'Warehouse',
      gradient: 'from-slate-700 to-slate-900',
      bannerImage: '/images/industries/electronics_hero.webp',
      valueProps: [
        {
          title: isVi ? 'Tối ưu lưu kho & vận chuyển' : isJa ? '保管・輸送の最適化' : 'Storage & Transport Optimization',
          desc: isVi ? 'Bảo vệ hàng hóa vững chắc khi xếp chồng và di chuyển đường dài.' : isJa ? '長距離移動や積み重ね時の貨物を強固に保護。' : 'Firmly protects goods during stacking and long-distance transport.',
          iconName: 'ShieldCheck'
        },
        {
          title: isVi ? 'Giảm thiểu tỷ lệ hư hỏng' : isJa ? '破損率の削減' : 'Minimize Damage Rate',
          desc: isVi ? 'Chống ẩm, chống nước bám và chống trầy xước bao bì bên ngoài.' : isJa ? '外装包装の防湿・防水・防傷効果。' : 'Moisture-proof, waterproof, and scratch-resistant for outer packaging.',
          iconName: 'Activity'
        },
        {
          title: isVi ? 'Tăng tốc độ đóng gói' : isJa ? '梱包スピードの向上' : 'Accelerate Packaging Speed',
          desc: isVi ? 'Màng co & màng quấn pallet lực căng cao giúp đóng kiện nhanh.' : isJa ? '高張力シュリンク＆パレットフィルムで迅速な梱包を実現。' : 'High-tension shrink & pallet wrap enables fast bundling.',
          iconName: 'Settings'
        },
        {
          title: isVi ? 'Tiết kiệm chi phí bao bì' : isJa ? '包装コストの削減' : 'Save Packaging Costs',
          desc: isVi ? 'Tối ưu độ dày và chiều dài cuộn màng giúp giảm hao phí 20%.' : isJa ? 'フィルムの厚みと長さを最適化し無駄を20%削減。' : 'Optimized thickness and roll length reduces waste by 20%.',
          iconName: 'Zap'
        }
      ],
      challengesIntro: isVi ? 'Thách thức trong ngành Kho vận & Logistics' : isJa ? '倉庫＆物流における課題' : 'Challenges in Logistics',
      challenges: [
        {
          title: isVi ? 'Hàng hóa dịch chuyển gãy đổ khi vận chuyển' : isJa ? '輸送中の貨物の荷崩れ・破損' : 'Cargo shifting and tumbling during transport',
          desc: isVi ? 'Màng quấn kém chất lượng bị đứt cuộn làm pallet hàng bị xiêu quẹo và va đập.' : isJa ? '低品質なフィルムの切れによりパレット荷崩れが発生。' : 'Poor quality film snaps cause pallet goods to lean and impact each other.',
          iconName: 'AlertCircle'
        },
        {
          title: isVi ? 'Độ ẩm kho bãi làm hỏng thùng carton' : isJa ? '倉庫の湿気によるダンボールの破損' : 'Warehouse moisture softening cartons',
          desc: isVi ? 'Độ ẩm cao tại kho lạnh làm nhũn rách vỏ hộp bọc ngoài hàng hóa.' : isJa ? '冷暗倉庫での高湿度により外装箱が軟化・破損。' : 'High humidity in cold storage softens and tears outer cartons.',
          iconName: 'Sparkles'
        }
      ],
      cleanroomIntro: isVi ? 'Vật tư bảo hộ & an toàn lao động trong kho bãi.' : isJa ? '倉庫内での安全・保護用品。' : 'Safety and protective gear in warehousing.',
      cleanroomCategories: [
        { name: isVi ? 'Găng tay kho bãi & bốc xếp' : isJa ? '倉庫・荷役用手袋' : 'Warehouse Handling Gloves', image: '/images/industries/electronics_hero.webp', slug: 'cleanroom-gloves' },
        { name: isVi ? 'Khẩu trang chống bụi kho' : isJa ? '防塵防護マスク' : 'Dust Protective Masks', image: '/images/industries/electronics_hero.webp', slug: 'cleanroom-masks' }
      ],
      cleanroomViewAll: isVi ? 'Xem tất cả sản phẩm bảo hộ kho' : isJa ? 'すべての保護用品を見る' : 'See all warehouse safety products',
      packagingIntro: isVi ? 'Giải pháp màng quấn & bao bì đóng kiện vận chuyển.' : isJa ? 'パレット梱包・輸送用フィルムソリューション。' : 'Pallet wrapping and shipping packaging solutions.',
      packagingCategories: [
        { name: isVi ? 'Màng PE quấn pallet lực căng cao' : isJa ? '高張力PEパレットフィルム' : 'High-Tension PE Pallet Film', image: '/images/industries/electronics_hero.webp', slug: 'industrial-packaging' },
        { name: isVi ? 'Màng co PE bảo vệ hàng hóa' : isJa ? '保護用PEシュリンクフィルム' : 'Protective PE Shrink Film', image: '/images/industries/electronics_hero.webp', slug: 'industrial-packaging' }
      ],
      packagingViewAll: isVi ? 'Xem tất cả sản phẩm đóng gói' : isJa ? 'すべての包装製品を見る' : 'See all packaging products',
      casesTitle: isVi ? 'Trường hợp áp dụng thực tế' : isJa ? '実際の導入事例' : 'Real-world Applications',
      cases: [
        {
          title: isVi ? 'Tối ưu hóa quy trình quấn pallet tại Tổng kho Bắc Ninh' : isJa ? 'バクニン倉庫でのパレット梱包最適化' : 'Optimizing Pallet Wrapping at Bac Ninh Depot',
          description: isVi ? 'Tăng 35% tốc độ đóng gói và triệt tiêu 100% rủi ro đổ vỡ pallet khi vận chuyển đường dài.' : isJa ? '梱包スピードを35%向上させ、長距離輸送時の荷崩れを100%防止。' : 'Increased packaging speed by 35% and eliminated 100% of long-distance pallet collapse risks.',
          image: '/images/industries/electronics_hero.webp',
          badge: isVi ? 'Tăng 35% tốc độ' : isJa ? 'スピード35%向上' : '35% Faster Speed'
        }
      ],
      whyUsTitle: isVi ? 'Vì sao chọn ULINK?' : isJa ? 'なぜULINKを選ぶのか？' : 'Why Choose ULINK?',
      whyUsList: isVi
        ? ['Đạt tiêu chuẩn đóng gói vận tải quốc tế ISTA', 'Màng PE lực dai vượt trội chống rách thủng', 'Nguồn cung dồi dào, giao hàng kho trong 24h', 'Hỗ trợ thiết kế kích thước cuộn màng theo máy quấn']
        : isJa
          ? ['国際輸送梱包規格ISTAに準拠', '優れた耐引き裂き性を持つPEフィルム', '豊富な在庫で24時間以内に納品', '自動巻き機に応じたフィルムサイズ設計']
          : ['Complying with ISTA international transport packaging standards', 'Superior puncture-resistant PE film', 'Abundant inventory, 24h warehouse delivery', 'Custom roll size design for automatic wrappers'],
      standardsTitle: isVi ? 'Chứng nhận & tiêu chuẩn áp dụng' : isJa ? '適用される認証＆規格' : 'Certifications & Standards',
      standards: [
        { name: 'ISTA 3A / 6', detail: isVi ? 'Tiêu chuẩn thử nghiệm độ bền bao bì đóng gói vận tải quốc tế.' : isJa ? '国際安全輸送協会試験規格。' : 'International safe transit association packaging test standard.' },
        { name: 'ISO 9001:2015', detail: isVi ? 'Hệ thống quản lý chất lượng quy trình lưu kho và phân phối.' : isJa ? '倉庫保管および流通プロセスの品質管理。' : 'Quality management system for warehousing & distribution.' },
        { name: 'ISO 14001:2015', detail: isVi ? 'Tiêu chuẩn vận hành kho bãi xanh và quản lý môi trường.' : isJa ? 'グリーン倉庫管理および環境適合規格。' : 'Environmental management system for green warehousing.' },
        { name: 'RoHS & REACH', detail: isVi ? 'Chứng nhận an toàn vật liệu màng PE quấn pallet và túi chống ẩm.' : isJa ? 'パレットフィルムおよび防湿袋の資材安全認証。' : 'Material safety compliance for PE film and desiccant bags.' }
      ],
      resourcesTitle: isVi ? 'Tài liệu liên quan' : isJa ? '関連資料' : 'Related Resources',
      catalogue: {
        title: isVi ? 'Catalogue giải pháp ngành Kho vận & Logistics' : isJa ? '倉庫＆物流向けカタログ' : 'Solutions Catalogue for Logistics',
        info: 'PDF / 5.5MB',
        url: '#'
      }
    };
  }

  if (actualSlug === 'furniture') {
    return {
      slug: 'furniture',
      name: isVi ? 'Đồ gỗ - Nội thất' : isJa ? '家具・インテリア' : 'Furniture & Interior',
      title: isVi ? 'Giải pháp cho ngành Đồ gỗ - Nội thất' : isJa ? '家具・インテリア産業向けソリューション' : 'Solutions for Furniture & Interior',
      description: isVi
        ? 'Bảo vệ toàn diện bề mặt gỗ, da, vải và kim loại trong suốt quy trình sản xuất, vận chuyển và lắp đặt nội thất cao cấp.'
        : isJa
          ? '高級家具の製造、輸送、設置プロセス全体において、木材、皮革、布地、金属の表面を包括的に保護します。'
          : 'Comprehensive protection for wood, leather, fabric, and metal surfaces throughout the manufacturing, transport, and installation of premium furniture.',
      iconName: 'Armchair',
      gradient: 'from-amber-700 to-yellow-900',
      bannerImage: '/images/industries/electronics_hero.webp',
      valueProps: [
        {
          title: isVi ? 'Bảo vệ bề mặt cao cấp' : isJa ? '高級表面保護' : 'Premium Surface Protection',
          desc: isVi ? 'Chống trầy xước nước sơn gỗ và bề mặt da cao cấp.' : isJa ? '塗装面や高級皮革の傷を完全に防止。' : 'Prevents scratches on wood paint and premium leather.',
          iconName: 'ShieldCheck'
        },
        {
          title: isVi ? 'Chống ẩm mốc xuất khẩu' : isJa ? '輸出用防湿・防カビ' : 'Export Anti-Mold',
          desc: isVi ? 'Hạn chế ẩm mốc trong container đi biển dài ngày.' : isJa ? '海上コンテナ輸送中の湿気・カビを抑制。' : 'Prevents mold in long ocean container transits.',
          iconName: 'Activity'
        }
      ],
      challengesIntro: isVi ? 'Thách thức trong ngành Nội thất' : isJa ? '家具産業における課題' : 'Challenges in Furniture',
      challenges: [
        {
          title: isVi ? 'Trầy xước nước sơn gỗ khi va chạm' : isJa ? '衝突による木材塗装の傷' : 'Scratches on wood finish from collisions',
          desc: isVi ? 'Va quệt trong quá trình di chuyển từ xưởng ra kho làm hỏng lớp sơn PU.' : isJa ? '工場から倉庫への移動時の擦れでPU塗装が損壊。' : 'Friction during transit damages the PU paint coat.',
          iconName: 'AlertCircle'
        }
      ],
      cleanroomIntro: isVi ? 'Trang phục & vật tư sạch cho phòng sơn nội thất.' : isJa ? '家具塗装室用クリーンウェア＆資材。' : 'Cleanwear & supplies for furniture paint rooms.',
      cleanroomCategories: [
        { name: isVi ? 'Khẩu trang phòng sơn nội thất' : isJa ? '塗装用防護マスク' : 'Furniture Paint Room Masks', image: '/images/industries/electronics_hero.webp', slug: 'cleanroom-masks' }
      ],
      cleanroomViewAll: isVi ? 'Xem tất cả sản phẩm phòng sơn' : isJa ? 'すべての塗装用品を見る' : 'See all paint room products',
      packagingIntro: isVi ? 'Giải pháp màng bọc bảo vệ bề mặt gỗ & bao bì đóng gói.' : isJa ? '木材保護フィルム＆梱包ソリューション。' : 'Wood surface protection film & packaging solutions.',
      packagingCategories: [
        { name: isVi ? 'Màng PE bọc bảo vệ bề mặt gỗ' : isJa ? '木材表面保護PEフィルム' : 'Wood Surface PE Protective Film', image: '/images/industries/electronics_hero.webp', slug: 'industrial-packaging' }
      ],
      packagingViewAll: isVi ? 'Xem tất cả sản phẩm đóng gói' : isJa ? 'すべての包装製品を見る' : 'See all packaging products',
      casesTitle: isVi ? 'Trường hợp áp dụng thực tế' : isJa ? '実際の導入事例' : 'Real-world Applications',
      cases: [
        {
          title: isVi ? 'Bảo vệ đồ gỗ xuất khẩu Mỹ cho Nhà máy Gỗ An Cường' : isJa ? 'An Cường工場向け米国輸出家具の保護' : 'Protecting US Export Furniture for An Cuong Factory',
          description: isVi ? 'Loại bỏ 100% khiếu nại trầy xước sơn và giảm 40% thời gian bọc hàng thủ công.' : isJa ? '塗装傷のクレームを100%排除し、手梱包時間を40%削減。' : 'Eliminated 100% of paint scratch complaints and reduced manual wrap time by 40%.',
          image: '/images/industries/electronics_hero.webp',
          badge: isVi ? 'Giảm 100% lỗi sơn' : isJa ? '傷クレーム0' : 'Zero Scratch Complaints'
        }
      ],
      whyUsTitle: isVi ? 'Vì sao chọn ULINK?' : isJa ? 'なぜULINKを選ぶのか？' : 'Why Choose ULINK?',
      whyUsList: isVi
        ? ['Màng bọc bảo vệ chuyên dụng không để lại keo', 'Xốp PE foam định hình chống va đập góc hoàn hảo', 'Nguồn cung ổn định cho các tập đoàn gỗ xuất khẩu']
        : isJa
          ? ['のり残りしない専用保護フィルム', '角落ち防止の完璧な成形PEフォーム', '大手木材輸出企業への安定供給実績']
          : ['Specialized non-residue protective film', 'Perfect corner impact-proof PE foam shapes', 'Stable supply for major wood exporters'],
      standardsTitle: isVi ? 'Chứng nhận & tiêu chuẩn áp dụng' : isJa ? '適用される認証＆規格' : 'Certifications & Standards',
      standards: [
        { name: 'FSC CoC', detail: isVi ? 'Chứng nhận quản lý chuỗi hành trình sản phẩm rừng bền vững.' : isJa ? 'FSC森林認証 CoCサプライチェーン。' : 'Forest stewardship council chain of custody certification.' },
        { name: 'ISO 9001:2015', detail: isVi ? 'Hệ thống quản lý chất lượng bao bì bọc bảo vệ bề mặt nội thất.' : isJa ? '家具保護フィルムの品質管理システム。' : 'Quality management system for furniture protective packaging.' },
        { name: 'RoHS', detail: isVi ? 'Đảm bảo màng PE và xốp foam không chứa hóa chất độc hại.' : isJa ? 'PEフィルムおよびフォーム材の有害物質非含有証明。' : 'RoHS certification for non-hazardous PE film & foam.' },
        { name: 'REACH', detail: isVi ? 'An toàn keo dán bóc tách không để lại vết vệt trên gỗ cao cấp.' : isJa ? '高級木材用のり残りゼロ粘着剤の安全基準。' : 'EU chemical safety for non-residue protective adhesive film.' }
      ],
      resourcesTitle: isVi ? 'Tài liệu liên quan' : isJa ? '関連資料' : 'Related Resources',
      catalogue: {
        title: isVi ? 'Catalogue giải pháp ngành Đồ gỗ & Nội thất' : isJa ? '家具・インテリア向けカタログ' : 'Solutions Catalogue for Furniture',
        info: 'PDF / 5.2MB',
        url: '#'
      }
    };
  }

  if (actualSlug === 'construction') {
    return {
      slug: 'construction',
      name: isVi ? 'Cơ Điện - HVAC' : isJa ? '設備・HVAC' : 'M&E - HVAC',
      title: isVi ? 'Giải pháp Băng keo Nhôm chuyên dụng cho ngành Cơ Điện – HVAC' : isJa ? '設備・HVAC産業向けアルミテープソリューション' : 'Specialized Aluminum Tape Solutions for M&E – HVAC',
      description: isVi
        ? 'ULINK cung cấp các dòng băng keo nhôm (Aluminum Foil Tape) chất lượng cao chịu nhiệt vượt trội, bám dính cực mạnh chuyên dùng bịt kín ống gió, bọc cách nhiệt bảo ôn và hoàn thiện hệ thống cơ điện HVAC đạt chuẩn UL 723.'
        : isJa
          ? 'ULINKは、ダクト密閉、保温断熱ラッピング、およびUL 723規格に準拠したHVAC設備の完成に使用される、優れた耐熱性と強力な粘着力を備えた高品質なアルミテープ（Aluminum Foil Tape）製品を提供します。'
          : 'ULINK provides high-quality aluminum foil tape with superior heat resistance and strong adhesion for sealing ductwork, wrapping thermal insulation, and completing M&E HVAC systems meeting UL 723 standards.',
      iconName: 'Wrench',
      gradient: 'from-cyan-700 to-blue-900',
      bannerImage: '/images/industries/construction/construction_hero.png',
      overviewImage: '/images/industries/construction/construction_overview.png',
      valueProps: [
        {
          title: isVi ? 'Chịu nhiệt cao' : isJa ? '高耐熱性' : 'High Heat Resistance',
          desc: isVi ? 'Hoạt động ổn định trong dải nhiệt từ -30°C đến +120°C.' : isJa ? '-30°Cから+120°Cの温度範囲で安定稼働。' : 'Stable operation in temperatures from -30°C to +120°C.',
          iconName: 'ShieldCheck'
        },
        {
          title: isVi ? 'Bám dính vượt trội' : isJa ? '優れた粘着性' : 'Superior Adhesion',
          desc: isVi ? 'Keo acrylic chịu lực, bám chắc trên bề mặt kim loại & ống gió.' : isJa ? '金属やダクト表面に強力に接着する重荷重アクリル粘着剤。' : 'Heavy-duty acrylic adhesive adhering firmly to metal & duct surfaces.',
          iconName: 'Activity'
        }
      ],
      challengesIntro: isVi ? 'Thách thức trong ngành Cơ Điện - HVAC' : isJa ? '設備・HVAC産業における課題' : 'Challenges in M&E - HVAC',
      challenges: [
        {
          title: isVi ? 'Thất thoát nhiệt tại các mối nối ống gió' : isJa ? 'ダクト接続部における熱損失' : 'Heat loss at duct connections',
          desc: isVi ? 'Rò rỉ khí và đọng sương bề mặt ống gió gây lãng phí điện năng lớn.' : isJa ? '空気漏れとダクト結露により大きな電力損失が発生。' : 'Air leakage and surface condensation on ducts cause heavy energy loss.',
          iconName: 'AlertCircle'
        }
      ],
      cleanroomIntro: isVi ? 'Trang phục & găng tay bảo hộ cơ khí HVAC.' : isJa ? 'HVAC・機械作業用保護具。' : 'HVAC and mechanical safety gear.',
      cleanroomCategories: [
        { name: isVi ? 'Găng tay chống cắt cấp 5' : isJa ? 'Level 5耐切創手袋' : 'Level 5 Cut Resistant Gloves', image: '/images/industries/construction/product_1.png', slug: 'cleanroom-gloves' }
      ],
      cleanroomViewAll: isVi ? 'Xem tất cả sản phẩm an toàn lao động' : isJa ? 'すべての安全用品を見る' : 'See all safety products',
      packagingIntro: isVi ? 'Vật tư dán cách nhiệt & màng bọc bảo vệ tấm ốp.' : isJa ? '断熱テープ＆保護フィルム。' : 'Insulation tape & protective film.',
      packagingCategories: [
        { name: isVi ? 'Băng keo nhôm cách nhiệt HVAC' : isJa ? 'HVAC用断熱アルミテープ' : 'HVAC Aluminum Foil Insulation Tape', image: '/images/industries/construction/product_2.png', slug: 'industrial-packaging' }
      ],
      packagingViewAll: isVi ? 'Xem tất cả sản phẩm dán cách nhiệt' : isJa ? 'すべての断熱製品を見る' : 'See all insulation products',
      casesTitle: isVi ? 'Khách hàng tin dùng trong ngành Cơ Điện - HVAC' : isJa ? '設備・HVAC業界の導入事例' : 'Real-world Applications in M&E - HVAC',
      cases: [
        {
          slug: 'hvac-office-building',
          title: isVi ? 'Hệ thống HVAC tòa nhà văn phòng cao cấp' : isJa ? '高級オフィスビルHVACシステム' : 'High-End Office Building HVAC System',
          description: isVi ? 'Ứng dụng băng dính nhôm lưới gia cường bọc cách nhiệt hệ chiller, đảm bảo tuổi thọ đường ống trên 15 năm mà không bong tróc.' : isJa ? 'チラーシステム断熱に補強アルミテープを使用し、剥がれることなく15年以上の耐久性を確保。' : 'Applying mesh-reinforced aluminum tape to chiller insulation, ensuring pipe lifespan over 15 years without peeling.',
          image: '/images/industries/construction/usecase_1.png',
          badge: isVi ? 'Tòa nhà thương mại' : isJa ? '商業ビル' : 'Commercial Building'
        },
        {
          slug: 'fdi-electronics-plant',
          title: isVi ? 'Nhà máy sản xuất điện tử FDI quy mô lớn tại Việt Nam' : isJa ? 'ベトナムの大規模FDI電子製造工場' : 'Large-Scale FDI Electronics Manufacturing Plant',
          description: isVi ? 'Cung ứng đồng bộ băng keo nhôm FSK ngăn ẩm tuyệt đối cho hệ thống ống cấp gió sạch phòng máy, vượt qua các đợt kiểm tra chất lượng FDI nghiêm ngặt.' : isJa ? 'クリーンルーム送風ダクト用に完全防湿FSKアルミテープを同期供給し、厳格なFDI品質検査に合格。' : 'Synchronized supply of 100% moisture-barrier FSK aluminum tape for cleanroom supply ducts, passing strict FDI quality audits.',
          image: '/images/industries/construction/usecase_2.png',
          badge: isVi ? 'Khu công nghiệp' : isJa ? '工業団地' : 'Industrial Park'
        },
        {
          slug: 'hospital-cleanroom',
          title: isVi ? 'Bệnh viện quốc tế & Phòng sạch vô trùng' : isJa ? '国際病院＆無菌クリーンルーム' : 'International Hospital & Cleanroom',
          description: isVi ? 'Bịt kín ống thông gió phòng mổ áp lực âm bằng băng keo nhôm chuẩn chống khuẩn RoHS, tuyệt đối không tạo bụi bẩn, không mùi dung môi hữu cơ.' : isJa ? 'RoHS抗菌アルミテープで陰圧手術室の換気ダクトを密閉し、粉塵や有機溶剤臭の発生をゼロに抑制。' : 'Sealing negative pressure operating room ventilation ducts with RoHS antibacterial aluminum tape, zero dust and solvent odor.',
          image: '/images/industries/construction/usecase_3.png',
          badge: isVi ? 'Bệnh viện & Lab' : isJa ? '病院＆ラボ' : 'Hospital & Lab'
        }
      ],
      whyUsTitle: isVi ? 'Vì sao chọn ULINK?' : isJa ? 'なぜULINKを選ぶのか？' : 'Why Choose ULINK?',
      whyUsList: isVi
        ? ['Nhôm nguyên chất 99.5%', 'Keo acrylic chịu nhiệt cao', 'An toàn sức khỏe & RoHS', 'Độ dày đa dạng 30-80μm']
        : isJa
          ? ['99.5%純アルミニウム', '高耐熱アクリル粘着剤', 'RoHS適合・健康安全', '30-80μmの多様な厚み']
          : ['99.5% Pure Aluminum', 'High Heat Resistant Acrylic Adhesive', 'Health Safety & RoHS Compliant', 'Diverse Thickness 30-80μm'],
      whyUsItems: isVi
        ? [
          {
            title: 'Nhôm nguyên chất 99.5%',
            desc: 'Màng nhôm dẻo dai, không rách nứt khi thi công ở các góc cạnh ống gió phức tạp.',
            iconName: 'Factory'
          },
          {
            title: 'Keo acrylic chịu nhiệt cao',
            desc: 'Lớp keo bám dính cực tốt, không bị khô giòn hay bong tróc khi hệ thống hoạt động liên tục.',
            iconName: 'ShieldCheck'
          },
          {
            title: 'An toàn sức khỏe & RoHS',
            desc: 'Sản phẩm không chứa chì, không mùi độc hại, an toàn tuyệt đối cho hệ thống dẫn khí tòa nhà.',
            iconName: 'User'
          },
          {
            title: 'Độ dày đa dạng 30-80μm',
            desc: 'Đáp ứng linh hoạt các tiêu chuẩn kỹ thuật của từng dự án và chủ đầu tư.',
            iconName: 'Award'
          }
        ]
        : isJa
          ? [
            {
              title: '99.5%純アルミニウム',
              desc: '複雑なダクト角部の施工時にも裂けない柔軟なアルミフィルム。',
              iconName: 'Factory'
            },
            {
              title: '高耐熱アクリル粘着剤',
              desc: '連続稼働時にも乾燥や剥がれが発生しない優れた粘着層。',
              iconName: 'ShieldCheck'
            },
            {
              title: 'RoHS適合・健康安全',
              desc: '無鉛・無毒性で建物の送風システムに100%安全。',
              iconName: 'User'
            },
            {
              title: '30-80μmの多様な厚み',
              desc: '各プロジェクトや事業主の技術要件に柔軟に対応。',
              iconName: 'Award'
            }
          ]
          : [
            {
              title: '99.5% Pure Aluminum',
              desc: 'Flexible aluminum film, non-tearing during complex duct corner installation.',
              iconName: 'Factory'
            },
            {
              title: 'High Heat Resistant Acrylic Adhesive',
              desc: 'Superior adhesion layer, non-brittle and non-peeling during continuous system operation.',
              iconName: 'ShieldCheck'
            },
            {
              title: 'Health Safety & RoHS',
              desc: 'Lead-free, no toxic odor, absolute safety for building air supply systems.',
              iconName: 'User'
            },
            {
              title: 'Diverse Thickness 30-80μm',
              desc: 'Flexibly meeting technical standards of various projects and investors.',
              iconName: 'Award'
            }
          ],
      standardsTitle: isVi ? 'TIÊU CHUẨN KỸ THUẬT' : isJa ? '技術基準' : 'TECHNICAL STANDARDS',
      standards: [
        { name: 'ISO 9001:2015', detail: isVi ? 'Hệ thống quản lý chất lượng đồng bộ, kiểm soát nghiêm ngặt từ hạt keo đến màng nhôm đầu vào.' : isJa ? '接着剤の粒子から入力アルミフィルムまで厳格に管理する同期品質マネジメントシステム。' : 'Synchronized quality management system, strictly controlled from adhesive particles to raw aluminum film.' },
        { name: 'UL 723 Standards', detail: isVi ? 'Kiểm nghiệm an toàn phòng cháy chữa cháy cực kỳ khắt khe của UL Hoa Kỳ đối với vật liệu cơ điện.' : isJa ? 'M&E資材に対する米国ULの極めて厳格な防火・防災安全試験。' : 'Extremely strict fire and burn safety testing by US UL for M&E materials.' },
        { name: 'SMACNA Compliant', detail: isVi ? 'Đạt tiêu chuẩn thi công chế tạo ống gió công nghiệp của hiệp hội cơ điện Hoa Kỳ, Việt Nam.' : isJa ? '米国およびベトナムのM&E協会による産業用ダクトの製造・施工規格に適合。' : 'Meeting industrial duct fabrication and installation standards of US & Vietnam M&E associations.' },
        { name: 'SGS Tested (RoHS)', detail: isVi ? 'Chứng nhận an toàn sinh học, không chứa chất độc hại gây ảnh hưởng chất lượng không khí.' : isJa ? '空気品質に影響を与える有害物質を含まない生物学的安全認証。' : 'Biosafety certification, free from harmful substances affecting air quality.' }
      ],
      resourcesTitle: isVi ? 'Tài liệu liên quan' : isJa ? '関連資料' : 'Related Resources',
      catalogue: {
        title: isVi ? 'Catalogue giải pháp ngành Cơ Điện - HVAC' : isJa ? 'HVAC・設備ソリューションカタログ' : 'Solutions Catalogue for M&E - HVAC',
        info: 'PDF / 6.0MB',
        url: '#'
      }
    };
  }

  return null;
}
