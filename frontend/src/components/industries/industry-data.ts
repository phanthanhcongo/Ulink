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
      title: isVi ? 'Giải pháp Vật tư & Bao bì Đóng gói Kho vận Chuyên nghiệp' : isJa ? 'プロフェッショナルな倉庫・物流梱包資材ソリューション' : 'Professional Logistics Packaging & Warehouse Supply Solutions',
      description: isVi
        ? 'ULINK cung cấp giải pháp màng PE quấn pallet lực căng cao, bao bì chống ẩm container và trang thiết bị an toàn bốc xếp kho bãi đạt chuẩn vận tải quốc tế ISTA & ISO 9001.'
        : isJa
          ? 'ULINKは、高張力PEパレットラッピングフィルム、コンテナ防湿包装、および国際輸送規格ISTA & ISO 9001に適合する倉庫安全資材を提供します。'
          : 'ULINK provides high-tension PE pallet wrap, container moisture barriers, and ISTA & ISO 9001 compliant warehouse safety gear for global supply chains.',
      iconName: 'Warehouse',
      gradient: 'from-blue-900 via-indigo-950 to-slate-950',
      bannerImage: '/images/industries/logistics/logistics_hero.png',
      overviewImage: '/images/industries/logistics/logistics_overview.png',
      valueProps: [
        {
          title: isVi ? 'Chống gãy đổ Pallet 100%' : isJa ? '荷崩れ100%防止' : '100% Pallet Collapse Prevention',
          desc: isVi ? 'Màng PE lực co giãn 300% giữ vững khối hàng khi va quệt và lật nghiêng.' : isJa ? '300%伸縮PEフィルムにより、傾斜や擦れ時にも貨物を強固に保持。' : '300% stretch PE film securely locks stacked cargo against tilting.',
          iconName: 'ShieldCheck'
        },
        {
          title: isVi ? 'Tăng 30% tốc độ đóng kiện' : isJa ? '梱包速度30%向上' : '30% Faster Packaging',
          desc: isVi ? 'Cuộn màng mỏng dai vừa vặn máy quấn tự động, tối ưu nhịp vận hành kho.' : isJa ? '自動巻き機に適合する薄型高強度フィルムにより作業効率を向上。' : 'High-tensile film fits automatic wrappers seamlessly, speeding up workflows.',
          iconName: 'Zap'
        },
        {
          title: isVi ? 'Chống ẩm mốc kho lạnh' : isJa ? '冷暗倉庫の防湿・防カビ' : 'Cold Chain Moisture Protection',
          desc: isVi ? 'Màng co & túi hút ẩm giữ thùng carton khô ráo trong môi trường độ ẩm cao.' : isJa ? '高湿度環境でもダンボールを乾燥状態に保つ防湿ソリューション。' : 'Shrink film & desiccants protect outer cartons in high-humidity storage.',
          iconName: 'Package'
        },
        {
          title: isVi ? 'Tiết kiệm 20% chi phí' : isJa ? 'コスト20%削減' : '20% Cost Reduction',
          desc: isVi ? 'Công nghệ đùn nhiều lớp giảm chiều dày cuộn nhưng tăng sức chịu xé thủng.' : isJa ? '多層押出技術によりフィルム厚を抑えつつ耐 thủng 強度を向上。' : 'Multilayer extrusion reduces film weight while boosting puncture resistance.',
          iconName: 'Factory'
        }
      ],
      challengesIntro: isVi ? 'Thách thức trong ngành Kho vận & Logistics' : isJa ? '倉庫＆物流における課題' : 'Challenges in Warehousing & Logistics',
      challenges: [
        {
          title: isVi ? 'Hàng hóa dịch chuyển gãy đổ khi vận chuyển đường dài' : isJa ? '長距離輸送中の貨物の荷崩れ・破損' : 'Cargo shifting and pallet collapse during transit',
          desc: isVi ? 'Màng quấn kém chất lượng bị đứt đứt ngang làm xiêu vẹo pallet, hỏng hàng hóa và đền bù lớn.' : isJa ? '低品質フィルムの đứt 切れによりパレットが傾き、貨物損害が発生。' : 'Poor quality film snaps, causing pallets to lean and crush boxed goods.',
          iconName: 'AlertCircle'
        },
        {
          title: isVi ? 'Độ ẩm kho bãi & kho lạnh làm nhũn rách vỏ thùng carton' : isJa ? '倉庫や冷暗所の湿気によるダンボールの軟化・破損' : 'High humidity and cold storage softening cartons',
          desc: isVi ? 'Độ ẩm cao gây đọng sương làm yếu khung hộp carton, đe dọa an toàn xếp chồng tầng cao.' : isJa ? '高湿度の結露によりダンボール強度が低下し、高層積載時のリスクが増大。' : 'Condensation weakens carton walls, risking collapse during high-bay stacking.',
          iconName: 'ShieldCheck'
        },
        {
          title: isVi ? 'Tai nạn lao động bốc xếp do thiếu trang bị an toàn' : isJa ? '安全保護具不足による荷役作業中の rủi ro' : 'Occupational hazards during manual warehouse handling',
          desc: isVi ? 'Trầy xước tay và va đập vật nặng khi bốc xếp hàng thủ công trong các ca làm việc liên tục.' : isJa ? '連続 đợt 荷役作業中の手傷や重物 va đập による作業員 rủi ro。' : 'Hand injuries and heavy box impacts occur during intensive warehouse shifts.',
          iconName: 'Package'
        }
      ],
      cleanroomIntro: isVi ? 'Vật tư bảo hộ lao động & trang thiết bị an toàn bốc xếp kho bãi.' : isJa ? '倉庫内荷役作業用保護具＆安全資材。' : 'Personal protective equipment & safety supplies for warehouse handling.',
      cleanroomCategories: [
        {
          name: isVi ? 'Găng tay bốc xếp kho' : isJa ? '倉庫・荷役用耐切創手袋' : 'Warehouse Handling Gloves',
          image: '/images/industries/logistics/product_1.png',
          slug: 'cleanroom-gloves'
        },
        {
          name: isVi ? 'Khẩu trang & Kính bảo hộ' : isJa ? '倉庫作業用保護メガネ' : 'Warehouse Safety Goggles',
          image: '/images/industries/logistics/product_2.png',
          slug: 'cleanroom-masks'
        },
        {
          name: isVi ? 'Màng PE quấn Pallet' : isJa ? 'PEパレットフィルム' : 'PE Pallet Stretch Film',
          image: '/images/industries/logistics/product_3.png',
          slug: 'industrial-packaging'
        },
        {
          name: isVi ? 'Màng co PE đóng kiện' : isJa ? 'PEシュリンクフィルム' : 'PE Shrink Film',
          image: '/images/industries/logistics/product_4.png',
          slug: 'industrial-packaging'
        }
      ],
      cleanroomViewAll: isVi ? 'Xem tất cả sản phẩm bảo hộ kho' : isJa ? 'すべての保護用品を見る' : 'See all warehouse safety products',
      packagingIntro: isVi ? 'Giải pháp màng quấn pallet, màng co & bao bì chống ẩm container.' : isJa ? 'パレット梱包・シュリンク＆コンテナ防湿包装ソリューション。' : 'Pallet stretch wrap, shrink film & container moisture control packaging.',
      packagingCategories: [
        {
          name: isVi ? 'Màng PE quấn Pallet' : isJa ? 'PEパレットフィルム' : 'PE Pallet Stretch Film',
          image: '/images/industries/logistics/product_3.png',
          slug: 'industrial-packaging'
        },
        {
          name: isVi ? 'Màng co PE đóng kiện' : isJa ? 'PEシュリンクフィルム' : 'PE Shrink Film',
          image: '/images/industries/logistics/product_4.png',
          slug: 'industrial-packaging'
        },
        {
          name: isVi ? 'Găng tay bốc xếp kho' : isJa ? '倉庫・荷役用耐切創手袋' : 'Warehouse Handling Gloves',
          image: '/images/industries/logistics/product_1.png',
          slug: 'cleanroom-gloves'
        },
        {
          name: isVi ? 'Khẩu trang & Kính bảo hộ' : isJa ? '倉庫作業用保護メガネ' : 'Warehouse Safety Goggles',
          image: '/images/industries/logistics/product_2.png',
          slug: 'cleanroom-masks'
        }
      ],
      packagingViewAll: isVi ? 'Xem tất cả sản phẩm đóng gói kho' : isJa ? 'すべての包装製品を見る' : 'See all packaging products',
      casesTitle: isVi ? 'Dự án thực tế ứng dụng trong ngành Kho vận & Logistics' : isJa ? '倉庫＆物流業界での実地導入事例' : 'Real-world Applications in Logistics',
      cases: [
        {
          slug: 'logistics-bac-ninh-hub',
          title: isVi ? 'Tối ưu hóa quy trình quấn Pallet tại Trung tâm Logistics Bắc Ninh' : isJa ? 'バクニン物流ハブでのパレット梱包最適化' : 'Optimizing Pallet Packaging at Bac Ninh Logistics Hub',
          description: isVi ? 'Đồng bộ màng PE lực căng 300% cho máy quấn tự động, tăng 35% tốc độ đóng gói và triệt tiêu 100% rủi ro đổ vỡ pallet khi vận chuyển đường dài.' : isJa ? '自動巻き機に300%伸縮PEフィルムを同期導入し、梱包スピードを35%向上、荷崩れを100%防止。' : 'Synchronized 300% stretch PE film for automatic wrappers, boosting speed by 35% and eliminating 100% pallet collapse risks.',
          image: '/images/industries/logistics/usecase_1.png',
          badge: isVi ? 'Trung tâm Logistics' : isJa ? '物流ハブ' : 'Logistics Hub'
        },
        {
          slug: 'cold-chain-logistics',
          title: isVi ? 'Bảo vệ thùng hàng xuất khẩu tại Chuỗi Kho Lạnh Cold Chain Bình Dương' : isJa ? 'ビンズオン冷暗倉庫での輸出箱防湿保護' : 'Export Carton Protection at Binh Duong Cold Chain Depot',
          description: isVi ? 'Ứng dụng màng co PE kết hợp túi hút ẩm container, ngăn chặn 100% hiện tượng đọng sương làm nhũn carton trong môi trường ẩm -18°C đến 5°C.' : isJa ? 'PEシュリンクフィルムと防湿剤を併用し、-18°C〜5°Cの冷暗環境での結露と箱軟化を100%防止。' : 'Applied PE shrink film and desiccants, preventing 100% condensation and carton softening in cold storage (-18°C to 5°C).',
          image: '/images/industries/logistics/usecase_2.png',
          badge: isVi ? 'Kho lạnh & Chuỗi cung ứng' : isJa ? 'コールドチェーン' : 'Cold Chain Logistics'
        },
        {
          slug: 'cat-lai-port-export',
          title: isVi ? 'Bao bì chống đứt rách cho Pallet xi măng & hóa chất Cảng Cát Lái' : isJa ? 'キャットライ港でのセメント・化学品パレット梱包' : 'Heavy Cargo Pallet Wrap for Cat Lai Ocean Port Export',
          description: isVi ? 'Cung ứng màng PE đùn 5 lớp chịu lực thủng cực cao, đảm bảo an toàn tuyệt đối khi cẩu xếp container vận chuyển xuyên đại dương.' : isJa ? '超高耐 thủng 5層PEフィルムを供給し、外洋コンテナクレーン荷役時の安全性100%を確保。' : 'Supplying 5-layer extruded PE film with high puncture resistance, ensuring 100% safety during ocean container crane handling.',
          image: '/images/industries/logistics/usecase_3.png',
          badge: isVi ? 'Cảng biển Xuất khẩu' : isJa ? '港湾・海運' : 'Ocean Container Port'
        }
      ],
      whyUsTitle: isVi ? 'Vì sao chọn ULINK cho Ngành Kho vận & Logistics?' : isJa ? 'なぜULINKの物流ソリューションを選ぶのか？' : 'Why Choose ULINK for Logistics Operations?',
      whyUsList: isVi
        ? ['Đạt tiêu chuẩn đóng gói vận tải quốc tế ISTA 3A / 6', 'Màng PE đùn 5 lớp lực dai vượt trội chống rách thủng', 'Nguồn cung trữ lượng lớn, giao hàng kho trong 24h', 'Hỗ trợ kỹ thuật thiết kế khổ màng chuẩn máy quấn tự động']
        : isJa
          ? ['国際輸送安全規格ISTA 3A / 6に適合', '耐引き裂き性に優れた5層押出PEフィルム', '大容量在庫により24時間以内に倉庫へ納品', '自動巻き機に合わせたフィルムサイズ設計サポート']
          : ['Compliant with ISTA 3A / 6 international transport packaging standards', '5-layer extruded PE film with superior puncture resistance', 'Large inventory capacity with 24h warehouse delivery', 'Technical support matching roll sizes for automatic wrappers'],
      whyUsItems: isVi
        ? [
          {
            title: 'Tiêu chuẩn vận tải ISTA 3A',
            desc: 'Được chứng nhận độ bền bao bì chịu rung xóc và va đập trong suốt quy trình vận chuyển quốc tế.',
            iconName: 'ShieldCheck'
          },
          {
            title: 'Màng PE đùn 5 lớp siêu dai',
            desc: 'Lực co giãn 300% chống rách thủng khi quấn các góc kiện hàng nhọn hoặc thùng hàng nặng.',
            iconName: 'Package'
          },
          {
            title: 'Giao hàng kho trong 24h',
            desc: 'Tổng kho Hà Nam trữ lượng hàng nghìn cuộn, sẵn sàng ứng cứu và cấp hàng hỏa tốc.',
            iconName: 'Truck'
          },
          {
            title: 'Chuẩn máy quấn tự động',
            desc: 'Tư vấn khổ màng và độ dày tối ưu giúp máy quấn tự động vận hành trơn tru không đứt cuộn.',
            iconName: 'Factory'
          }
        ]
        : isJa
          ? [
            {
              title: 'ISTA 3A輸送安全規格',
              desc: '国際輸送中の振動や衝撃に対する梱包耐久性が認証されています。',
              iconName: 'ShieldCheck'
            },
            {
              title: '高強度5層押出PEフィルム',
              desc: '300%の伸縮力により、鋭い角や重量物パレットんでも破れを防止。',
              iconName: 'Package'
            },
            {
              title: '24時間以内の倉庫納品',
              desc: '河南省倉庫の豊富な在庫により、緊急の納品要請にも即座に対応。',
              iconName: 'Truck'
            },
            {
              title: '自動巻き機適合設計',
              desc: '自動巻き機が途切れずにスムーズに稼働する最適な厚みとサイズを提案。',
              iconName: 'Factory'
            }
          ]
          : [
            {
              title: 'ISTA 3A Transport Standard',
              desc: 'Certified packaging durability against vibration and impacts throughout international freight routes.',
              iconName: 'ShieldCheck'
            },
            {
              title: '5-Layer Extruded PE Film',
              desc: '300% elongation rate preventing tearing on sharp pallet corners or heavy bulk boxes.',
              iconName: 'Package'
            },
            {
              title: '24h Warehouse Delivery',
              desc: 'Ha Nam warehouse hub holds thousands of rolls, ready for immediate emergency dispatch.',
              iconName: 'Truck'
            },
            {
              title: 'Automatic Wrapper Compliant',
              desc: 'Optimized width and thickness specs ensuring smooth continuous automated wrapping.',
              iconName: 'Factory'
            }
          ],
      standardsTitle: isVi ? 'TIÊU CHUẨN KỸ THUẬT & CHỨNG NHẬN KHO VẬN' : isJa ? '技術基準＆物流認証' : 'TECHNICAL STANDARDS & LOGISTICS CERTIFICATIONS',
      standards: [
        { name: 'ISTA 3A / 6 Standard', detail: isVi ? 'Tiêu chuẩn thử nghiệm độ bền bao bì đóng gói vận tải quốc tế chịu rung xóc và rơi tự do.' : isJa ? '国際安全輸送協会の振動・落下耐久試験規格。' : 'International safe transit association packaging vibration & drop test standard.' },
        { name: 'ISO 9001:2015', detail: isVi ? 'Hệ thống quản lý chất lượng quy trình lưu kho, bốc xếp và phân phối hàng hóa.' : isJa ? '倉庫保管、荷役、流通プロセスの品質管理システム。' : 'Quality management system for warehousing, handling & distribution.' },
        { name: 'ISO 14001:2015', detail: isVi ? 'Tiêu chuẩn vận hành kho bãi xanh và quản lý tác động môi trường.' : isJa ? 'グリーン倉庫管理および環境適合規格。' : 'Environmental management system for green warehousing operations.' },
        { name: 'RoHS & REACH Compliance', detail: isVi ? 'Chứng nhận an toàn sinh học cho màng quấn PE, màng co và túi chống ẩm bọc kiện.' : isJa ? 'パレットフィルムおよび防湿袋の資材安全認証。' : 'Material safety compliance for PE film and container desiccant bags.' }
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
      title: isVi ? 'Giải pháp Bảo vệ Bề mặt & Đóng gói Đồ gỗ Xuất khẩu' : isJa ? '家具・木製品の表面保護および輸出梱包ソリューション' : 'Surface Protection & Packaging Solutions for Export Furniture',
      description: isVi
        ? 'ULINK cung cấp giải pháp màng PE bảo vệ sơn gỗ bóc sạch không để lại keo, xốp nẹp góc chống va đập 360° và hệ bao bì đóng gói chống ẩm mốc cho đồ gỗ xuất khẩu Mỹ & Châu Âu.'
        : isJa
          ? 'ULINKは、のり残りゼロの木材表面保護PEフィルム、360度角落ち防止の成形PEフォーム、および米国・欧州向け輸出家具の防湿包装ソリューションを提供します。'
          : 'ULINK provides zero-residue PE protective film, 360° shockproof corner foam, and moisture-barrier packaging solutions for premium US & EU export furniture.',
      iconName: 'Armchair',
      gradient: 'from-amber-800 via-amber-900 to-stone-950',
      bannerImage: '/images/industries/furniture/furniture_hero.png',
      overviewImage: '/images/industries/furniture/furniture_overview.png',
      valueProps: [
        {
          title: isVi ? 'Bảo vệ bề mặt sơn 100%' : isJa ? '100%表面塗装保護' : '100% Paint Surface Protection',
          desc: isVi ? 'Màng PE chuyên dụng chống trầy xước nước sơn PU, Melamine & Veneer.' : isJa ? 'PU、メラミン、ツキ板塗装の傷を完全に防止する専用PEフィルム。' : 'Specialized PE film prevents scratches on PU, Melamine & Veneer finishes.',
          iconName: 'ShieldCheck'
        },
        {
          title: isVi ? 'Bóc sạch 0% vệt keo' : isJa ? 'のり残りゼロ' : 'Zero Residue Adhesives',
          desc: isVi ? 'Công nghệ keo acrylic nhạy áp lực bóc tách dễ dàng, không để lại vết mờ.' : isJa ? '感圧アクリル粘着技術により、簡単に剥がせて跡が残りません。' : 'Pressure-sensitive acrylic technology peels off cleanly without staining.',
          iconName: 'Sparkles'
        },
        {
          title: isVi ? 'Chống sốc góc 360°' : isJa ? '360度耐衝撃保護' : '360° Corner Protection',
          desc: isVi ? 'Nẹp góc xốp PE foam định hình chống bẹp góc và va đập khi xếp pallet.' : isJa ? '成形PEフォーム角当てにより、パレット積載時の角潰れを防ぎます。' : 'Custom PE foam corner guards prevent edge crushing during transport.',
          iconName: 'Package'
        },
        {
          title: isVi ? 'Chống ẩm mốc Container' : isJa ? 'コンテナ防湿・防カビ' : 'Container Moisture Control',
          desc: isVi ? 'Túi chống ẩm & màng co PE quấn pallet an toàn cho các chuyến biển dài ngày.' : isJa ? '長時間の海上輸送でも安全な防湿剤とPEストレッチフィルム。' : 'Desiccant bags & PE stretch film ensuring ocean freight safety.',
          iconName: 'Zap'
        }
      ],
      challengesIntro: isVi ? 'Thách thức trong ngành Đồ gỗ & Nội thất Xuất khẩu' : isJa ? '家具・インテリア輸出産業における課題' : 'Challenges in Export Furniture Manufacturing',
      challenges: [
        {
          title: isVi ? 'Khiếu nại trầy xước nước sơn gỗ khi giao hàng' : isJa ? '納品時の木材塗装傷によるクレーム' : 'Paint scratch claims upon delivery',
          desc: isVi ? 'Va chạm trong quá trình vận chuyển container làm hỏng bề mặt sơn cao cấp, tốn chi phí đền bù lớn.' : isJa ? 'コンテナ輸送中の擦れにより高級塗装面が損壊し、大きな損害が発生。' : 'Friction during container transport damages premium finishes, leading to costly claims.',
          iconName: 'AlertCircle'
        },
        {
          title: isVi ? 'Vệt keo dán dính cứng trên mặt gỗ sau khi bóc' : isJa ? '剥離後の木材表面へののり残り' : 'Adhesive residue stuck on wood surfaces',
          desc: isVi ? 'Màng bọc thông thường để lại vệt keo gây ố hoen và hỏng bóng bề mặt sản phẩm.' : isJa ? '通常のフィルムではのり残りが発生し、製品の美観を損ないます。' : 'Standard films leave sticky residue, staining expensive wood products.',
          iconName: 'ShieldCheck'
        },
        {
          title: isVi ? 'Bẹp góc và ẩm mốc trong container đi biển' : isJa ? '海上コンテナ内での角潰れと湿気・カビ' : 'Corner crushing & mold in ocean shipping',
          desc: isVi ? 'Độ ẩm cao trên biển làm mốc gỗ và va đập làm sứt mẻ các góc bàn ghế.' : isJa ? '高湿度の海上環境でカビが発生し、衝撃により角が欠ける問題。' : 'High sea humidity leads to mold growth while impacts chip table corners.',
          iconName: 'Package'
        }
      ],
      cleanroomIntro: isVi ? 'Trang phục & vật tư che chắn cho phòng sơn nội thất gỗ.' : isJa ? '家具塗装室用保護ウェア＆マスキング資材。' : 'Protective apparel & masking supplies for furniture spray rooms.',
      cleanroomCategories: [
        {
          name: isVi ? 'Màng PE bọc bảo vệ bề mặt gỗ cao cấp' : isJa ? '高級木材表面保護PEフィルム' : 'Premium Wood Surface PE Protective Film',
          image: '/images/industries/furniture/product_1.png',
          slug: 'industrial-packaging'
        },
        {
          name: isVi ? 'Băng keo giấy che sơn gỗ cao cấp' : isJa ? '高級木材塗装用マスキングテープ' : 'Premium Wood Masking Tape',
          image: '/images/industries/furniture/product_3.png',
          slug: 'cleanroom-tapes'
        },
        {
          name: isVi ? 'Trang phục & khẩu trang bảo hộ phòng sơn' : isJa ? '塗装作業用防護服＆マスク' : 'Spray Paint Protective Suit & Mask',
          image: '/images/industries/furniture/product_4.png',
          slug: 'cleanroom-apparel'
        },
        {
          name: isVi ? 'Khăn lau bụi bề mặt gỗ trước khi sơn' : isJa ? '塗装前木材表面用無塵ワイパー' : 'Lint-Free Pre-Paint Wood Wipes',
          image: '/images/industries/furniture/product_5.png',
          slug: 'cleanroom-wipes'
        }
      ],
      cleanroomViewAll: isVi ? 'Xem tất cả sản phẩm bảo vệ bề mặt' : isJa ? 'すべての表面保護製品を見る' : 'See all surface protection products',
      packagingIntro: isVi ? 'Giải pháp đóng gói, nẹp góc xốp & chống ẩm mốc cho container xuất khẩu.' : isJa ? '輸出コンテナ用梱包・角当てフォーム・防湿ソリューション。' : 'Packaging, corner foam & moisture barrier solutions for export containers.',
      packagingCategories: [
        {
          name: isVi ? 'Xốp nẹp góc & Màng quấn Pallet đóng gói' : isJa ? '角当てフォーム＆パレット梱包フィルム' : 'Corner Guard Foam & Pallet Stretch Film',
          image: '/images/industries/furniture/product_2.png',
          slug: 'industrial-packaging'
        },
        {
          name: isVi ? 'Túi chống ẩm & Thanh hút ẩm Container xuất khẩu' : isJa ? '輸出コンテナ用防湿剤＆乾燥ポール' : 'Export Container Desiccant Bags & Poles',
          image: '/images/industries/furniture/product_6.png',
          slug: 'industrial-packaging'
        },
        {
          name: isVi ? 'Xốp PE Foam chèn lót bảo vệ tấm gỗ' : isJa ? '木材保護用PEフォームシート' : 'PE Foam Cushioning Sheets for Wood Panels',
          image: '/images/industries/furniture/product_7.png',
          slug: 'industrial-packaging'
        },
        {
          name: isVi ? 'Màng PE bọc bảo vệ gỗ cao cấp' : isJa ? '高級木材保護PEフィルム' : 'Premium Wood Protection PE Film',
          image: '/images/industries/furniture/product_1.png',
          slug: 'industrial-packaging'
        }
      ],
      packagingViewAll: isVi ? 'Xem tất cả sản phẩm bao bì đóng gói' : isJa ? 'すべての包装製品を見る' : 'See all packaging products',
      casesTitle: isVi ? 'Dự án thực tế ứng dụng trong ngành Đồ gỗ - Nội thất' : isJa ? '家具・インテリア業界での実地導入事例' : 'Real-world Applications in Export Furniture',
      cases: [
        {
          slug: 'an-cuong-wood-export',
          title: isVi ? 'Bảo vệ bề mặt gỗ xuất khẩu Mỹ cho Tập đoàn Gỗ An Cường' : isJa ? 'An Cườngグループ向け米国輸出家具の表面保護' : 'Protecting US Export Furniture for An Cuong Group',
          description: isVi ? 'Ứng dụng màng PE dán bảo vệ không để lại keo kết hợp nẹp góc xốp PE, loại bỏ 100% khiếu nại trầy xước và giảm 40% thời gian bọc hàng thủ công.' : isJa ? 'のり残りゼロPEフィルムと角当てフォームを導入し、傷クレームを100%排除、手梱包時間を40%削減。' : 'Applied zero-residue PE protection film with corner foam guards, eliminating 100% scratch complaints and cutting manual wrap time by 40%.',
          image: '/images/industries/furniture/usecase_1.png',
          badge: isVi ? 'Xuất khẩu Mỹ & EU' : isJa ? '米国・欧州輸出' : 'US & EU Export'
        },
        {
          slug: 'vinhomes-penthouse-furniture',
          title: isVi ? 'Bọc bảo vệ toàn bộ nội thất gỗ cao cấp Căn hộ Vinhomes Grand Park' : isJa ? 'Vinhomes高級マンション家具の保護フィルム施工' : 'Protecting Luxury Woodwork for Vinhomes Penthouse Apartment',
          description: isVi ? 'Bảo vệ 100% hệ tủ bếp gỗ An Cường và bàn ghế nội thất cao cấp trong suốt 6 tháng thi công hoàn thiện, không phát sinh bất kỳ lỗi trầy xước.' : isJa ? '6ヶ月の内装施工期間中、高級キッチンキャビネットと家具の傷を完全に防止。' : '100% surface protection for custom kitchen cabinets and furniture during 6 months of interior finishing, zero scratches.',
          image: '/images/industries/furniture/usecase_2.png',
          badge: isVi ? 'Nội thất & Dự án' : isJa ? '内装＆プロジェクト' : 'Interior Project'
        },
        {
          slug: 'woodsland-eu-export',
          title: isVi ? 'Cung ứng màng bọc bảo vệ bề mặt gỗ cho Tập đoàn Woodsland xuất khẩu EU' : isJa ? 'Woodslandグループ向け欧州輸出家具保護フィルム供給' : 'Supplying Wood Surface Protection Film for Woodsland EU Export',
          description: isVi ? 'Đồng bộ giải pháp màng PE nhạy áp lực bóc sạch cho dây chuyền xuất khẩu nội thất sang thị trường Châu Âu, đạt tiêu chuẩn FSC & REACH.' : isJa ? '欧州向け家具輸出ラインにのり残りゼロ感圧PEフィルムを同期導入し、FSCおよびREACH規格に適合。' : 'Synchronized pressure-sensitive PE protection film for furniture export lines to European markets, compliant with FSC & REACH.',
          image: '/images/industries/furniture/usecase_3.png',
          badge: isVi ? 'Dây chuyền Xuất khẩu' : isJa ? '輸出製造ライン' : 'Export Line'
        }
      ],
      whyUsTitle: isVi ? 'Vì sao chọn ULINK cho Ngành Đồ gỗ - Nội thất?' : isJa ? 'なぜULINKの家具ソリューションを選ぶのか？' : 'Why Choose ULINK for Furniture Manufacturing?',
      whyUsList: isVi
        ? ['Công nghệ keo nhạy áp không để lại vệt mờ trên sơn gỗ', 'Thanh nẹp góc xốp PE foam chống bẹp góc 360°', 'Giải pháp bao bì đạt chuẩn xuất khẩu Mỹ & Châu Âu', 'Nguồn cung trữ lượng lớn tại Kho vận Hà Nam']
        : isJa
          ? ['木材塗装面に跡が残らない感圧粘着技術', '角潰れを防ぐ360度成形PEフォーム角当て', '米国・欧州の厳格な輸出規格に適合する包装', '河南省物流倉庫からの大容量安定供給']
          : ['Pressure-sensitive adhesive leaving zero residue on wood finish', '360° PE foam corner guards preventing edge crushing', 'Export packaging compliant with strict US & EU standards', 'Abundant supply capacity from Ha Nam logistics hub'],
      whyUsItems: isVi
        ? [
          {
            title: 'Keo dán nhạy áp 0% vệt mờ',
            desc: 'Bóc tách dễ dàng sau khi giao hàng, tuyệt đối không phản ứng hóa học với các loại sơn PU, UV, Melamine.',
            iconName: 'ShieldCheck'
          },
          {
            title: 'Nẹp góc xốp PE Foam 360°',
            desc: 'Thiết kế ôm sát mọi góc bàn ghế, tủ bếp, hấp thụ hoàn toàn lực va đập trong container.',
            iconName: 'Package'
          },
          {
            title: 'Chuẩn xuất khẩu US & EU',
            desc: 'Đáp ứng các tiêu chuẩn FSC CoC, RoHS & REACH về an toàn sinh học và bảo vệ môi trường.',
            iconName: 'Award'
          },
          {
            title: 'Kho vận Hà Nam trữ lượng lớn',
            desc: 'Đáp ứng ngay lập tức các đơn hàng quy mô lớn của các tập đoàn nội thất hàng đầu.',
            iconName: 'Factory'
          }
        ]
        : isJa
          ? [
            {
              title: '跡が残らない感圧粘着剤',
              desc: '納品後に簡単に剥がせ、PU・UV・メラミン塗装と化学反応を起こしません。',
              iconName: 'ShieldCheck'
            },
            {
              title: '360度成形PEフォーム角当て',
              desc: 'テーブルやキャビネットのあらゆる角にフィットし、衝撃を吸収。',
              iconName: 'Package'
            },
            {
              title: '米国・欧州の輸出規格適合',
              desc: 'FSC CoC、RoHS、REACHなどの環境・生物学的安全基準に完全適合。',
              iconName: 'Award'
            },
            {
              title: '河南省倉庫の豊富な在庫',
              desc: '大手家具メーカーの大規模注文に即座に対応可能。',
              iconName: 'Factory'
            }
          ]
          : [
            {
              title: 'Zero Residue Adhesives',
              desc: 'Peels off cleanly after delivery, non-reactive with PU, UV, and Melamine wood finishes.',
              iconName: 'ShieldCheck'
            },
            {
              title: '360° PE Foam Corner Guards',
              desc: 'Hugs every corner of tables & cabinets, absorbing all impact forces inside containers.',
              iconName: 'Package'
            },
            {
              title: 'US & EU Export Standards',
              desc: 'Meeting FSC CoC, RoHS & REACH environmental and safety compliance.',
              iconName: 'Award'
            },
            {
              title: 'Ha Nam Large Inventory Hub',
              desc: 'Instantly fulfilling large-scale orders for leading export furniture manufacturers.',
              iconName: 'Factory'
            }
          ],
      standardsTitle: isVi ? 'TIÊU CHUẨN KỸ THUẬT & CHỨNG NHẬN' : isJa ? '技術基準＆認証' : 'TECHNICAL STANDARDS & CERTIFICATIONS',
      standards: [
        { name: 'FSC CoC Certified', detail: isVi ? 'Chứng nhận quản lý chuỗi hành trình sản phẩm rừng bền vững.' : isJa ? 'FSC持続可能な森林管理サプライチェーン認証。' : 'Forest stewardship council chain of custody certification.' },
        { name: 'ISO 9001:2015', detail: isVi ? 'Hệ thống quản lý chất lượng bao bì và màng bọc bảo vệ bề mặt nội thất.' : isJa ? '家具保護フィルムおよび包装資材の品質管理システム。' : 'Quality management system for furniture protective packaging.' },
        { name: 'RoHS & REACH', detail: isVi ? 'Đảm bảo màng PE và xốp foam không chứa chì và hóa chất độc hại.' : isJa ? 'PEフィルムおよびフォーム材の有害物質非含有証明。' : 'RoHS & REACH certification for non-hazardous materials.' },
        { name: 'ASTM D3330 Tested', detail: isVi ? 'Kiểm định tiêu chuẩn lực bám dính keo nhạy áp lực bóc tách 0% vết bẩn.' : isJa ? '感圧粘着剤の剥離強度および跡残りゼロ試験規格。' : 'Standard test method for pressure-sensitive tape peel adhesion.' }
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
