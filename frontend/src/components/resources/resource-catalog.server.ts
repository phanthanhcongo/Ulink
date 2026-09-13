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
  },
  'an-cuong-wood-export': {
    id: 'an-cuong-wood-export',
    category: 'case-study',
    badge: { vi: 'Xuất khẩu Mỹ & EU', en: 'US & EU Export', ja: '米国・欧州輸出' },
    title: {
      vi: 'Bảo vệ bề mặt gỗ xuất khẩu Mỹ cho Tập đoàn Gỗ An Cường',
      en: 'Protecting US Export Furniture for An Cuong Group',
      ja: 'An Cườngグループ向け米国輸出家具の表面保護'
    },
    description: {
      vi: 'Ứng dụng màng PE dán bảo vệ không để lại keo kết hợp nẹp góc xốp PE, loại bỏ 100% khiếu nại trầy xước và giảm 40% thời gian bọc hàng thủ công.',
      en: 'Applied zero-residue PE protection film with corner foam guards, eliminating 100% scratch complaints and cutting manual wrap time by 40%.',
      ja: 'のり残りゼロPEフィルムと角当てフォームを導入し、傷クレームを100%排除、手梱包時間を40%削減。'
    },
    date: 'Tháng 02, 2026',
    image: '/images/industries/furniture/usecase_1.png',
    author: {
      name: { vi: 'ULINK Wood & Packaging Team', en: 'ULINK Wood & Packaging Team', ja: 'ULINK Wood & Packaging Team' },
      role: { vi: 'Chuyên gia Bao bì Gỗ', en: 'Wood Packaging Specialist', ja: '木材包装専門家' },
      avatar: '/images/about/op-team.webp'
    },
    readTime: { vi: '6 phút đọc', en: '6 min read', ja: '6分' },
    sections: [
      {
        id: 'sec-ancuong-1',
        num: '1.',
        title: {
          vi: 'Bối cảnh dự án & Thách thức trầy xước bề mặt gỗ xuất khẩu',
          en: 'Project Context & Wood Finish Scratch Challenges',
          ja: 'プロジェクト背景と木材塗装傷の課題'
        },
        content: {
          vi: 'Tập đoàn Gỗ An Cường là đơn vị cung ứng và xuất khẩu nội thất gỗ lớn hàng đầu Việt Nam sang thị trường Mỹ và Châu Âu.\n\nTrong quá trình xếp dỡ và đóng container biển kéo dài 30-45 ngày, sự cọ xát giữa các tấm panel phủ Melamine và Veneer dễ gây bong tróc, trầy xước nước sơn bóng PU, dẫn tới các đợt đền bù tổn thất đắt đỏ từ phía đối tác nhập khẩu.',
          en: 'An Cuong Wood Group is Vietnams leading manufacturer and exporter of wooden furniture to US and EU markets.\n\nDuring 30-45 days of ocean container transit, friction between Melamine and Veneer panels frequently caused scratches on glossy PU paint coats, incurring severe financial penalties.',
          ja: 'An Cườngグループは、米国および欧州市場向けのベトナムトップクラスの木製家具メーカー・輸出企業です。\n\n30〜45日間の海上コンテナ輸送中、メラミンやツキ板パネルの擦れによりPU塗装傷が発生し、大きな đền bù コストが発生していました。'
        }
      },
      {
        id: 'sec-ancuong-2',
        num: '2.',
        title: {
          vi: 'Giải pháp Màng PE dán bảo vệ nhạy áp & Nẹp góc Xốp PE Foam ULINK',
          en: 'ULINK Pressure-Sensitive PE Film & PE Foam Corner Solution',
          ja: 'ULINK感圧性PE保護フィルム＆成形PEフォーム角当てソリューション'
        },
        content: {
          vi: 'ULINK đã nghiên cứu và ứng dụng dòng màng PE nhạy áp bóc sạch 100% không vệt keo, dán trực tiếp lên bề mặt gỗ vừa hoàn thiện.\n\nKết hợp hệ thống thanh nẹp góc xốp PE Foam 3D ôm khít cạnh bàn ghế, giúp hấp thụ toàn bộ lực va đập cơ học trong container.',
          en: 'ULINK deployed a specialized pressure-sensitive PE protection film guaranteeing 100% clean peel without adhesive residue directly onto fresh wood finishes.\n\nPaired with custom 3D PE foam corner guards, all mechanical impacts inside containers were fully absorbed.',
          ja: 'ULINKは、塗装直後の木材表面に直接 dán できるのり残りゼロの感圧PE保護フィルムを開発・導入しました。\n\n3D成形PEフォーム角当てと組み合わせることで、コンテナ内の機械的衝撃を完全に吸収します。'
        },
        alertText: {
          vi: 'Kết quả: Triệt tiêu 100% sự cố khiếu nại hỏng sơn từ phía đối tác Mỹ, tiết kiệm 40% thời gian bọc hàng thủ công cho nhà máy.',
          en: 'Result: 100% elimination of paint damage claims from US buyers, reducing factory manual packaging time by 40%.',
          ja: '成果：米国バイヤーからの塗装損害クレームを100%排除し、手梱包作業時間を40%削減。'
        }
      }
    ]
  },
  'vinhomes-penthouse-furniture': {
    id: 'vinhomes-penthouse-furniture',
    category: 'case-study',
    badge: { vi: 'Nội thất & Dự án', en: 'Interior Project', ja: '内装＆プロジェクト' },
    title: {
      vi: 'Bọc bảo vệ toàn bộ nội thất gỗ cao cấp Căn hộ Vinhomes Grand Park',
      en: 'Protecting Luxury Woodwork for Vinhomes Penthouse Apartment',
      ja: 'Vinhomes高級マンション家具の保護フィルム施工'
    },
    description: {
      vi: 'Bảo vệ 100% hệ tủ bếp gỗ An Cường và bàn ghế nội thất cao cấp trong suốt 6 tháng thi công hoàn thiện, không phát sinh bất kỳ lỗi trầy xước.',
      en: '100% surface protection for custom kitchen cabinets and furniture during 6 months of interior finishing, zero scratches.',
      ja: '6ヶ月の内装施工期間中、高級キッチンキャビネットと家具の傷を完全に防止。'
    },
    date: 'Tháng 02, 2026',
    image: '/images/industries/furniture/usecase_2.png',
    author: {
      name: { vi: 'ULINK Interior Solutions', en: 'ULINK Interior Solutions', ja: 'ULINK Interior Solutions' },
      role: { vi: 'Kỹ sư Giám sát Thi công', en: 'Site Inspection Engineer', ja: '現場監理エンジニア' },
      avatar: '/images/about/op-team.webp'
    },
    readTime: { vi: '5 phút đọc', en: '5 min read', ja: '5分' },
    sections: [
      {
        id: 'sec-vinhomes-1',
        num: '1.',
        title: {
          vi: 'Thách thức bảo vệ nội thất gỗ trong quá trình thi công xây dựng',
          en: 'Protecting Finished Woodwork During Active Interior Construction',
          ja: '内装工事中における完成木製家具の保護の課題'
        },
        content: {
          vi: 'Trong các dự án căn hộ penthouse và biệt thự cao cấp, hệ tủ bếp, tủ quần áo âm tường và bàn ăn gỗ óc chó thường được lắp đặt sớm trước khi hoàn thiện các hạng mục sơn tường, lát sàn và điện nước.\n\nBụi sơn, vữa chát và đồ nghề thi công rơi vãi rất dễ gây xước dăm và làm hỏng nước sơn PU đắt tiền.',
          en: 'In penthouse and luxury villa projects, custom walnut dining tables and fitted kitchen cabinets are often installed early before painting and flooring completion.\n\nPaint dust, mortar, and tools dropping on surfaces pose severe risks of scratching expensive finishes.',
          ja: '高級マンションやヴィラでは、ウォールナット製ダイニングテーブルやシステムキッチンが内装工事完了前に早期設置されます。\n\n塗料の粉塵や工具の nứt 落ちにより、高価なPU塗装が損傷するリスクがあります。'
        }
      },
      {
        id: 'sec-vinhomes-2',
        num: '2.',
        title: {
          vi: 'Giải pháp Màng PE dán bảo vệ bề mặt chống bụi bẩn & va đập nhẹ',
          en: 'ULINK Surface Protection PE Film for Dust & Scratch Barrier',
          ja: 'ULINK 傷・粉塵防止用表面保護PEフィルムソリューション'
        },
        content: {
          vi: 'ULINK đã triển khai phủ toàn bộ màng PE dán bảo vệ chuyên dụng trên tất cả bề mặt tủ bếp, mặt bàn đá & gỗ óc chó ngay sau khi lắp đặt xong.\n\nMàng dán bám chắc chắn suốt 6 tháng công trình thi công, chống thấm nước, chống bụi mịn và sau khi nghiệm thu bóc ra bề mặt gỗ vẫn sáng bóng 100% như mới.',
          en: 'ULINK applied specialized surface protection PE film across all kitchen cabinets, stone countertops, and walnut tables immediately after installation.\n\nThe film stayed securely attached for 6 months, repelling water and fine dust, peeling cleanly to reveal pristine surfaces.',
          ja: 'ULINKは設置直後、すべてのキッチンキャビネットとテーブルに専用PE保護フィルムを施工しました。\n\n6ヶ月間の施工中も確実に密着し、引き渡し時に剥がすと新品同様の輝きを保っていました。'
        },
        alertText: {
          vi: 'Kết quả: Bảo vệ 100% sản phẩm nội thất gỗ cao cấp, bàn giao dự án hoàn hảo không một lỗi trầy xước.',
          en: 'Result: 100% protection for luxury woodwork, perfect project handover with zero defects.',
          ja: '成果：高級木製家具を100%保護し、傷ゼロで完璧な引き渡しを完了。'
        }
      }
    ]
  },
  'woodsland-eu-export': {
    id: 'woodsland-eu-export',
    category: 'case-study',
    badge: { vi: 'Dây chuyền Xuất khẩu', en: 'Export Line', ja: '輸出製造ライン' },
    title: {
      vi: 'Cung ứng màng bọc bảo vệ bề mặt gỗ cho Tập đoàn Woodsland xuất khẩu EU',
      en: 'Supplying Wood Surface Protection Film for Woodsland EU Export',
      ja: 'Woodslandグループ向け欧州輸出家具保護フィルム供給'
    },
    description: {
      vi: 'Đồng bộ giải pháp màng PE nhạy áp lực bóc sạch cho dây chuyền xuất khẩu nội thất sang thị trường Châu Âu, đạt tiêu chuẩn FSC & REACH.',
      en: 'Synchronized pressure-sensitive PE protection film for furniture export lines to European markets, compliant with FSC & REACH.',
      ja: '欧州向け家具輸出ラインにのり残りゼロ感圧PEフィルムを同期導入し、FSCおよびREACH規格に適合。'
    },
    date: 'Tháng 02, 2026',
    image: '/images/industries/furniture/usecase_3.png',
    author: {
      name: { vi: 'ULINK Industrial Supply', en: 'ULINK Industrial Supply', ja: 'ULINK Industrial Supply' },
      role: { vi: 'Chuyên gia Chuỗi Cung ứng', en: 'Supply Chain Specialist', ja: 'サプライチェーン専門家' },
      avatar: '/images/about/op-team.webp'
    },
    readTime: { vi: '6 phút đọc', en: '6 min read', ja: '6分' },
    sections: [
      {
        id: 'sec-woodsland-1',
        num: '1.',
        title: {
          vi: 'Yêu cầu khắt khe về Tiêu chuẩn Xanh & An toàn Hóa chất Châu Âu',
          en: 'Strict European Chemical Safety & Environmental Standards',
          ja: '欧州における化学物質安全・環境基準の厳格な要件'
        },
        content: {
          vi: 'Các sản phẩm đồ gỗ nội thất xuất khẩu sang thị trường EU (Đức, Pháp, Hà Lan...) phải tuân thủ nghiêm ngặt các quy định về an toàn sức khỏe REACH và nguồn gốc rừng bền vững FSC.\n\nCác loại màng nhựa và keo dán bảo vệ bao bì phải chứng minh không chứa chì, không kim loại nặng và không phát tán hóa chất độc hại.',
          en: 'Wooden furniture exported to EU markets (Germany, France, Netherlands) must strictly comply with REACH health safety and FSC sustainable forestry regulations.\n\nPackaging protective films and adhesives must be certified free of lead, heavy metals, and toxic chemical emissions.',
          ja: '欧州（ドイツ、フランス、オランダなど）向け輸出家具は、REACH健康安全規則およびFSC持続可能な森林認証に厳格に適合しなければなりません。\n\n保護フィルムと粘着剤は、鉛や重金属、有害化学物質を含まないことが証明される必要があります。'
        }
      },
      {
        id: 'sec-woodsland-2',
        num: '2.',
        title: {
          vi: 'Cung ứng đồng bộ màng PE ULINK đạt chứng nhận REACH & FSC',
          en: 'Synchronized Supply of ULINK REACH & FSC Certified PE Films',
          ja: 'REACH＆FSC認証適合ULINK PEフィルムの同期供給'
        },
        content: {
          vi: 'ULINK đã trở thành đối tác cung ứng chiến lược cho Tập đoàn Woodsland, cấp hàng hỏa tốc màng PE dán bảo vệ bề mặt gỗ đạt chứng nhận REACH của SGS.\n\nMàng bọc dán tự động trên dây chuyền với tốc độ cao, không rách nứt và bóc tách hoàn hảo tại các showroom nội thất tại Châu Âu.',
          en: 'ULINK became the strategic supply partner for Woodsland, delivering SGS REACH-certified surface protective PE films.\n\nThe film applies automatically on high-speed factory lines without tearing, peeling cleanly at European retail showrooms.',
          ja: 'ULINKはWoodslandグループの戦略的供給パートナーとなり、SGS REACH認証取得の木材表面保護PEフィルムを迅速供給しました。\n\n高速自動ラインで破れずに dán でき、欧州のショールームで完璧に剥がすことが可能です。'
        },
        alertText: {
          vi: 'Kết quả: Vượt qua 100% các đợt kiểm định chất lượng EU, tối ưu hóa quy trình đóng gói tự động cho nhà máy.',
          en: 'Result: Passed 100% of EU quality audits, optimizing automated packaging lines for the factory.',
          ja: '成果：EUの品質監査を100%クリアし、工場の自動梱包プロセスを最適化。'
        }
      }
    ]
  },
  'logistics-bac-ninh-hub': {
    id: 'logistics-bac-ninh-hub',
    category: 'case-study',
    badge: { vi: 'Tổng kho Fulfillment', en: 'Fulfillment Hub', ja: 'フルフィルメント拠点' },
    title: {
      vi: 'Trung tâm Logistics & Fulfillment 50.000m² tại Bắc Ninh',
      en: '50,000m² Logistics & Fulfillment Center in Bac Ninh',
      ja: 'バクニンにおける50,000㎡の物流・フルフィルメントセンター'
    },
    description: {
      vi: 'Cung cấp 100 tấn màng quấn Pallet PE stretch film siêu dai kết hợp dây đai PET chịu lực, giảm 25% tỷ lệ hỏng hàng do xô lệch trong vận tải container.',
      en: 'Supplied 100 tons of high-tensile PE stretch film and heavy-duty PET strapping, reducing goods damage by 25% during container transport.',
      ja: '100トンの高張力PEストレッチフィルムと高強度PETバンドを納品し、コンテナ輸送中の荷崩れ損害を25%削減。'
    },
    date: 'Tháng 02, 2026',
    image: '/images/industries/logistics/usecase_1.png',
    author: {
      name: { vi: 'ULINK Packaging Solutions', en: 'ULINK Packaging Solutions', ja: 'ULINK Packaging Solutions' },
      role: { vi: 'Chuyên gia Màng quấn & Đóng gói', en: 'Packaging & Film Specialist', ja: '包装・フィルム専門家' },
      avatar: '/images/about/op-team.webp'
    },
    readTime: { vi: '6 phút đọc', en: '6 min read', ja: '6分' },
    sections: [
      {
        id: 'sec-log-1-1',
        num: '1.',
        title: {
          vi: 'Bối cảnh dự án & Thách thức xô lệch hàng pallet trong kho vận',
          en: 'Project Context & Pallet Collapsing Challenges in Warehousing',
          ja: 'プロジェクト背景と倉庫輸送における荷崩れの課題'
        },
        content: {
          vi: 'Trung tâm Logistics Bắc Ninh xử lý hơn 10.000 pallet hàng hóa mỗi ngày cho các tập đoàn bán lẻ và thương mại điện tử hàng đầu.\n\nSự xô lệch và rách màng quấn trong quá trình nâng hạ xe nâng và vận chuyển đường dài gây thiệt hại lớn về linh kiện điện tử và hàng tiêu dùng.',
          en: 'Bac Ninh Logistics Center handles over 10,000 pallets daily for top retail and e-commerce giants.\n\nPallet collapsing and film tearing during forklift handling and long-haul transit led to heavy merchandise loss.',
          ja: 'バクニン物流センターは、大手小売り・EC企業向けに毎日1万パレット以上の貨物を処理しています。\n\nフォークリフト荷役や長距離輸送中のフィルム破れや荷崩れが大きな損害となっていました。'
        }
      },
      {
        id: 'sec-log-1-2',
        num: '2.',
        title: {
          vi: 'Giải pháp Màng quấn Pallet 5 lớp ULINK & Dây đai PET chịu lực',
          en: 'ULINK 5-Layer PE Stretch Film & Heavy-Duty PET Strapping Solution',
          ja: 'ULINK 5層PEストレッチフィルム＆高強度PETバンドソリューション'
        },
        content: {
          vi: 'ULINK triển khai màng stretch film 5 lớp máy quấn tự động độ dãn 300% kết hợp dây đai PET chịu lực căng 850kg.\n\nGiúp cố định khối pallet vững chắc, chống bám bụi và chống nước mưa tuyệt đối trong suốt trình di chuyển.',
          en: 'ULINK deployed 5-layer machine stretch film with 300% stretch capability paired with PET straps rated for 850kg tensile strength.\n\nSecures pallets rigidly against vibration, moisture, and dust during inter-provincial transport.',
          ja: 'ULINKは延伸率300%の自動梱包機用5層ストレッチフィルムと破断強度850kgのPETバンドを導入しました。\n\nパレットを強固に固定し、長距離輸送中の振動や湿気から完全に保護します。'
        },
        alertText: {
          vi: 'Kết quả: Giảm 25% sự cố móp vỡ thùng hàng, tiết kiệm 18% chi phí màng quấn nhờ khả năng kéo dãn vượt trội.',
          en: 'Result: 25% reduction in carton damage and 18% savings on wrapping materials due to high stretchability.',
          ja: '成果：段ボール破損を25%削減し、優れた延伸性によりフィルム資材コストを18%削減。'
        }
      }
    ]
  },
  'cold-chain-logistics': {
    id: 'cold-chain-logistics',
    category: 'case-study',
    badge: { vi: 'Kho lạnh & Thực phẩm', en: 'Cold Storage', ja: '冷熱・食品物流' },
    title: {
      vi: 'Chuỗi kho lạnh & Bảo quản thực phẩm đông lạnh âm 25°C',
      en: 'Cold Chain Logistics & Sub-Zero 25°C Frozen Food Storage',
      ja: 'マイナス25℃対応のコールドチェーン＆冷凍食品保管'
    },
    description: {
      vi: 'Trang bị màng quấn co chịu nhiệt âm, găng tay bảo hộ chống lạnh sâu và băng dính niêm phong kho lạnh, đảm bảo an toàn tuyệt đối cho công nhân và hàng hóa.',
      en: 'Equipped freeze-resistant shrink film, thermal protection gloves, and cold-room sealing tapes, ensuring worker safety and cargo integrity.',
      ja: '耐寒シュリンクフィルム、防寒保護手袋、冷凍庫用封かんテープを配備し、作業者の安全と貨物の品質を完ぺきに保護。'
    },
    date: 'Tháng 02, 2026',
    image: '/images/industries/logistics/usecase_2.png',
    author: {
      name: { vi: 'ULINK Cold Storage Team', en: 'ULINK Cold Storage Team', ja: 'ULINK Cold Storage Team' },
      role: { vi: 'Chuyên gia Chuỗi cung ứng lạnh', en: 'Cold Chain Specialist', ja: 'コールドチェーン専門家' },
      avatar: '/images/about/op-team.webp'
    },
    readTime: { vi: '5 phút đọc', en: '5 min read', ja: '5分' },
    sections: [
      {
        id: 'sec-log-2-1',
        num: '1.',
        title: {
          vi: 'Đặc thù môi trường nhiệt độ âm 25°C & Yêu cầu vật tư chuyên dụng',
          en: 'Challenges of Sub-Zero 25°C Environment & Cold-Resistant Specs',
          ja: 'マイナス25℃環境の特殊性と専用資材の要件'
        },
        content: {
          vi: 'Kho lạnh âm sâu 25°C khiến màng nhựa thông thường bị giòn gãy và màng dán bị mất độ bám nhạy áp.\n\nNgoài ra, công nhân thao tác bốc xếp trong môi trường lạnh giá có nguy cơ bỏng lạnh và tổn thương bàn tay nếu không được trang bị đồ bảo hộ chuyên dụng.',
          en: 'Deep freeze environments (-25°C) render normal plastic films brittle and strip standard adhesives of their tackiness.\n\nFurthermore, workers face severe frostbite risks without certified thermal safety gear.',
          ja: 'マイナス25℃の極冷環境では、通常のプラスチックフィルムは脆くなり、通常の粘着テープは粘着力を失います。\n\nまた、作業者は適切な防寒保護具なしでは凍傷のリスクに晒されます。'
        }
      },
      {
        id: 'sec-log-2-2',
        num: '2.',
        title: {
          vi: 'Giải pháp Vật tư Kho lạnh & Trang bị Trang bị Bảo hộ ULINK ColdCare',
          en: 'ULINK ColdCare Low-Temp Packaging & Thermal PPE Solutions',
          ja: 'ULINK ColdCare 冷凍庫用資材＆防寒保護具ソリューション'
        },
        content: {
          vi: 'ULINK đã cung cấp màng co POF chịu nhiệt âm -40°C không giòn gãy, băng dính niêm phong keo synthetic đặc chủng bám dính tốt trên bề mặt phủ băng tuyết, cùng găng tay bảo hộ chống lạnh chuẩn EN511.',
          en: 'ULINK provided -40°C rated POF shrink film, synthetic rubber sealing tape designed for icy surfaces, and EN511-certified thermal gloves.',
          ja: 'ULINKはマイナス40℃対応POFシュリンクフィルム、氷結表面でも強力粘着する合成ゴムテープ、EN511適合の防寒手袋を供給しました。'
        },
        alertText: {
          vi: 'Kết quả: Bảo vệ 100% sức khỏe công nhân kho lạnh, đảm bảo đóng gói kín khít tuyệt đối cho 500 tấn hải sản xuất khẩu.',
          en: 'Result: 100% safety record for warehouse operators and flawless airtight packaging for 500 tons of export seafood.',
          ja: '成果：作業者の安全事故ゼロを達成し、輸出用水産物500トンの完全密閉包装を実現。'
        }
      }
    ]
  },
  'cat-lai-port-export': {
    id: 'cat-lai-port-export',
    category: 'case-study',
    badge: { vi: 'Cảng biển & Container', en: 'Seaport & Container', ja: '港湾＆コンテナ' },
    title: {
      vi: 'Cảng Cát Lái & Quy trình niêm phong container xuất khẩu đường biển',
      en: 'Cat Lai Port Container Sealing & Ocean Freight Protection',
      ja: 'キャットライ港におけるコンテナ封かん＆海上輸送保護'
    },
    description: {
      vi: 'Giải pháp Seal niêm phong an ninh đạt chuẩn ISO 17712, kính bảo hộ và găng tay chống cắt cho lực lượng bốc xếp cảng biển, triệt tiêu 100% sự cố rách vỡ hàng hóa.',
      en: 'ISO 17712 certified security seals, safety glasses, and cut-resistant gloves for seaport handlers, eliminating goods damage.',
      ja: 'ISO 17712適合セキュリティシール、保護メガネ、耐切創手袋を港湾作業員に配備し、貨物破損事故を100%排除。'
    },
    date: 'Tháng 02, 2026',
    image: '/images/industries/logistics/usecase_3.png',
    author: {
      name: { vi: 'ULINK Maritime Logistics', en: 'ULINK Maritime Logistics', ja: 'ULINK Maritime Logistics' },
      role: { vi: 'Chuyên gia An ninh Cảng biển', en: 'Port Security Specialist', ja: '港湾セキュリティ専門家' },
      avatar: '/images/about/op-team.webp'
    },
    readTime: { vi: '6 phút đọc', en: '6 min read', ja: '6分' },
    sections: [
      {
        id: 'sec-log-3-1',
        num: '1.',
        title: {
          vi: 'Yêu cầu An toàn An ninh Cảng biển & Chuẩn ISO 17712',
          en: 'Seaport Security Requirements & ISO 17712 Compliance',
          ja: '港湾セキュリティ要件とISO 17712標準の適合'
        },
        content: {
          vi: 'Cảng Cát Lái là cửa ngõ xuất nhập khẩu hàng hải lớn nhất miền Nam. Các lô hàng container đi Mỹ và EU yêu cầu khóa seal niêm phong đạt chuẩn ISO 17712 High Security Seal để ngăn ngừa rủi ro mất trộm hoặc tráo hàng.',
          en: 'Cat Lai Port is Southern Vietnams largest maritime export gateway. Ocean containers bound for US/EU require ISO 17712 High Security Seals to prevent tampering.',
          ja: 'キャットライ港はベトナム南部最大の海上輸出入の玄関口です。欧米向けコンテナは改ざん防止のためISO 17712ハイセキュリティシールが必須です。'
        }
      },
      {
        id: 'sec-log-3-2',
        num: '2.',
        title: {
          vi: 'Cung cấp Seal container ULINK & Bảo hộ lao động chống cắt',
          en: 'Supplying ULINK High-Security Bolt Seals & Cut-Resistant PPE',
          ja: 'ULINK高セキュリティボルトシール＆耐切創保護具の供給'
        },
        content: {
          vi: 'ULINK cấp khóa seal cối container mạ thép chống gỉ khắc số nhảy laser theo tiêu chuẩn C-TPAT, cùng kính bảo hộ chống đọng sương và găng tay phủ PU chống cắt cấp độ 5 cho công nhân cảng.',
          en: 'ULINK supplied laser-etched C-TPAT bolt seals alongside anti-fog safety glasses and Level-5 cut-resistant gloves for dock workers.',
          ja: 'ULINKはレーザー刻印付きC-TPAT適合ボルトシール、防曇保護メガネ、レベル5耐切創手袋を港湾作業員に供給しました。'
        },
        alertText: {
          vi: 'Kết quả: 100% container thông quan suôn sẻ không bị hải quan quốc tế giữ hàng, đảm bảo an toàn tuyệt đối cho lực lượng xếp dỡ.',
          en: 'Result: 100% smooth customs clearance at international destports with zero injury incidents.',
          ja: '成果：国際税関での保留ゼロで100%スムーズな通関を達成し、荷役作業員の安全を完全に確保。'
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
  if (lowerSlug.includes('ancuong') || lowerSlug.includes('an-cuong')) {
    return CASE_STUDIES_MAP['an-cuong-wood-export'];
  }
  if (lowerSlug.includes('vinhomes') || lowerSlug.includes('penthouse')) {
    return CASE_STUDIES_MAP['vinhomes-penthouse-furniture'];
  }
  if (lowerSlug.includes('woodsland')) {
    return CASE_STUDIES_MAP['woodsland-eu-export'];
  }
  if (lowerSlug.includes('bac-ninh') || lowerSlug.includes('fulfillment')) {
    return CASE_STUDIES_MAP['logistics-bac-ninh-hub'];
  }
  if (lowerSlug.includes('cold-chain') || lowerSlug.includes('kho-lanh') || lowerSlug.includes('kho-lạnh')) {
    return CASE_STUDIES_MAP['cold-chain-logistics'];
  }
  if (lowerSlug.includes('cat-lai') || lowerSlug.includes('cát-lái') || lowerSlug.includes('port')) {
    return CASE_STUDIES_MAP['cat-lai-port-export'];
  }

  const catalog = await loadResourceCatalog();

  // Exact match by ID in full catalog
  const found = catalog.find((item) => item.id.toLowerCase() === lowerSlug);
  if (found) return found;

  // Fallback by index e.g. case-1 -> catalog[0]
  const numMatch = lowerSlug.match(/\d+/);
  if (numMatch) {
    const idx = parseInt(numMatch[0], 10) - 1;
    if (idx >= 0 && idx < catalog.length) {
      return catalog[idx];
    }
  }

  return null;
}
