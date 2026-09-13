import { FileText, BookOpen, ShieldCheck, Briefcase, Newspaper, CalendarDays } from 'lucide-react';
import { ResourceItem } from './types';

// Updated 6 Tabs configuration matching the HTML design
export const TABS = [
  { id: 'all', label: { vi: 'Tất cả', en: 'All', ja: 'すべて' }, icon: FileText },
  {
    id: 'guide',
    label: { vi: 'Cẩm nang kỹ thuật', en: 'Technical Guides', ja: '技術ガイド' },
    icon: BookOpen
  },
  {
    id: 'standard',
    label: { vi: 'Chứng chỉ chất lượng', en: 'Certificates', ja: '品質認証書' },
    icon: ShieldCheck
  },
  {
    id: 'case-study',
    label: { vi: 'Nghiên cứu điển hình', en: 'Case Studies', ja: 'ケーススタディ' },
    icon: Briefcase
  },
  { id: 'news', label: { vi: 'Tin tức', en: 'News', ja: 'ニュース' }, icon: Newspaper },
  { id: 'event', label: { vi: 'Sự kiện', en: 'Events', ja: 'イベント' }, icon: CalendarDays }
];

export interface EventItem {
  id: string;
  title: { vi: string; en: string; ja: string };
  image: string;
  images: string[];
  date: string;
  time: string;
  location: { vi: string; en: string; ja: string };
  link: string;
  badge?: { vi: string; en: string; ja: string };
  price?: { vi: string; en: string; ja: string };
  description?: { vi: string; en: string; ja: string };
}

// 12 Main Resource Cards matching autohtml-project/index.html
export const MOCK_RESOURCES: ResourceItem[] = [
  {
    id: 'card-1',
    category: 'guide',
    badge: { vi: 'Infographic', en: 'Infographic', ja: 'インフォグラフィック' },
    title: {
      vi: 'Tiêu chuẩn phòng sạch ISO 14644',
      en: 'Cleanroom Standard ISO 14644',
      ja: 'クリーンルーム規格 ISO 14644'
    },
    description: {
      vi: 'Hướng dẫn đầy đủ về phân loại phòng sạch theo tiêu chuẩn quốc tế ISO 14644.',
      en: 'Comprehensive guide to cleanroom classification under ISO 14644 international standard.',
      ja: '国際規格ISO 14644に基づくクリーンルーム分類の完全ガイド。'
    },
    date: 'Tháng 11, 2024',
    image: '/images/resources/autohtml/thumb0.png',
    author: {
      name: { vi: 'ULink Editorial', en: 'ULink Editorial', ja: 'ULink 編集部' },
      role: { vi: 'Chuyên gia phòng sạch', en: 'Cleanroom Specialist', ja: 'クリーンルーム専門家' },
      avatar: '/images/about/op-team.webp'
    },
    readTime: { vi: '5 phút đọc', en: '5 min read', ja: '5分' },
    sections: [
      {
        id: 'sec-1-1',
        num: '1.',
        title: {
          vi: 'Tổng quan & Phạm vi áp dụng ISO 14644',
          en: 'Overview & Scope of ISO 14644',
          ja: 'ISO 14644の概要と適用範囲'
        },
        content: {
          vi: 'Bộ tiêu chuẩn ISO 14644 là chuẩn mực quốc tế cao nhất dùng để đánh giá và phân loại độ sạch không khí trong các môi trường kiểm soát hạt bụi như công nghiệp bán dẫn, dược phẩm và thiết bị y tế.\n\nPhần ISO 14644-1 tập trung vào phân cấp nồng độ hạt bụi lơ lửng trong không khí, quy định phương pháp đo lường chính xác để xác định cấp độ sạch từ ISO Class 1 đến ISO Class 9.',
          en: 'The ISO 14644 standards represent the global benchmark for evaluating air cleanliness in controlled environments such as semiconductor, pharmaceutical, and medical device manufacturing.\n\nISO 14644-1 specifies airborne particle concentration limits, defining precise measurement methodologies for ISO Class 1 through Class 9.',
          ja: 'ISO 14644規格は、半導体、医薬品、医療機器などの管理環境における空気清浄度を評価する国際基準です。\n\nISO 14644-1は浮遊粒子濃度の分類に焦点を当て、ISOクラス1からクラス9までの清浄度レベルを決定するための正確な測定方法を規定しています。'
        }
      },
      {
        id: 'sec-1-2',
        num: '2.',
        title: {
          vi: 'Phân loại cấp độ sạch (ISO Class 1 - Class 9)',
          en: 'Air Cleanliness Classification (ISO Class 1 - Class 9)',
          ja: '空気清浄度クラス（ISO Class 1〜Class 9）'
        },
        content: {
          vi: 'Bảng phân loại ISO 14644-1 giới hạn số lượng hạt bụi tối đa cho phép trên mỗi mét khối không khí dựa trên các kích thước hạt từ 0.1 µm đến 5.0 µm.\n\nCác phòng sạch sản xuất chip điện tử quy mô nanomet thường yêu cầu ISO Class 1 đến Class 3, trong khi các nhà máy dược phẩm vô trùng thường áp dụng chuẩn ISO Class 5 đến Class 7.',
          en: 'The ISO 14644-1 classification table limits maximum allowable particle concentrations per cubic meter of air across sizes from 0.1 µm to 5.0 µm.\n\nNanometer semiconductor fabs typically demand ISO Class 1 to Class 3, whereas sterile pharmaceutical facilities standardly run on ISO Class 5 to Class 7.',
          ja: 'ISO 14644-1の分類表は、0.1 µmから5.0 µmまでの粒子サイズに基づいて、空気1立方メートルあたりの最大許容粒子数を制限しています。\n\nナノメートル級の半導体工場は通常ISOクラス1〜3を要求し、無菌医薬品工場はISOクラス5〜7を標準適用します。'
        },
        alertText: {
          vi: 'Quy chuẩn: ISO Class 5 tương đương với tiêu chuẩn Federal Standard 209E Class 100 trước đây.',
          en: 'Standard: ISO Class 5 is equivalent to the legacy Federal Standard 209E Class 100.',
          ja: '基準：ISOクラス5は従来の米国連邦規格209Eクラス100と同等です。'
        }
      },
      {
        id: 'sec-1-3',
        num: '3.',
        title: {
          vi: 'Quy trình đo đạc & Kiểm soát nồng độ hạt bụi',
          en: 'Particle Measurement & Monitoring Protocol',
          ja: '粒子測定手順とプロトコル'
        },
        content: {
          vi: 'Quy trình đánh giá tuân thủ ISO 14644 đòi hỏi sử dụng máy đếm hạt bụi quang học (Optical Particle Counter) được hiệu chuẩn định kỳ.\n\nMẫu không khí phải được thu thập tại các điểm đại diện ở các trạng thái vận hành: Trạng thái xây dựng (As-built), Trạng thái nghỉ (At-rest), và Trạng thái hoạt động (Operational).',
          en: 'Compliance validation requires calibrated Optical Particle Counters.\n\nAir samples must be collected across representative sampling points in three operational states: As-built, At-rest, and Operational.',
          ja: '規格準拠の評価には、定期的に校正された光学式粒子カウンターの使用が必要です。\n\n空気サンプルは、3つの運用状態（構築時、静止時、稼働時）で代表的な測定点から収集する必要があります。'
        }
      },
      {
        id: 'sec-1-4',
        num: '4.',
        title: {
          vi: 'Khuyến nghị lựa chọn trang thiết bị phù hợp',
          en: 'Equipment & Material Selection Recommendations',
          ja: '機器および資材選定の推奨事項'
        },
        content: {
          vi: 'Để duy trì chuẩn ISO 14644, toàn bộ vật tư như găng tay nitrile không bột, khăn lau phòng sạch siêu mịn, và trang phục chống tĩnh điện phải có mức phát sinh vi hạt (Lint generation) tiệm cận 0.',
          en: 'To maintain ISO 14644 standards, all supplies including powder-free nitrile gloves, ultra-fine cleanroom wipes, and anti-static garments must exhibit near-zero particle generation.',
          ja: 'ISO 14644規格を維持するために、パウダーフリーのニトリル手袋、極細クリーンルームワイパー、帯電防止服などの資材はすべて粒子発塵がほぼゼロである必要があります。'
        }
      }
    ]
  },
  {
    id: 'card-2',
    category: 'guide',
    badge: { vi: 'Hướng dẫn kỹ thuật', en: 'Technical Guide', ja: '技術ガイド' },
    title: {
      vi: 'Hướng dẫn lựa chọn vật tư phòng sạch',
      en: 'Guide to Selecting Cleanroom Supplies',
      ja: 'クリーンルーム資材の選定ガイド'
    },
    description: {
      vi: 'Tiêu chí quan trọng khi lựa chọn vật tư đạt chuẩn cho môi trường sản xuất sạch.',
      en: 'Crucial criteria when choosing standard supplies for clean production environments.',
      ja: 'クリーンな製造環境に適した資材を選定する際の重要な基準。'
    },
    date: 'Tháng 11, 2024',
    image: '/images/resources/autohtml/thumb1.png',
    author: {
      name: { vi: 'ULink Editorial', en: 'ULink Editorial', ja: 'ULink 編集部' },
      role: { vi: 'Kỹ sư chất lượng', en: 'QA Engineer', ja: '品質エンジニア' },
      avatar: '/images/about/op-team.webp'
    },
    readTime: { vi: '6 phút đọc', en: '6 min read', ja: '6分' },
    sections: [
      {
        id: 'sec-2-1',
        num: '1.',
        title: {
          vi: 'Tầm quan trọng của vật tư đạt chuẩn phòng sạch',
          en: 'Importance of Standardized Cleanroom Materials',
          ja: '標準化されたクリーンルーム資材の重要性'
        },
        content: {
          vi: 'Vật tư tiêu hao chiếm tỷ lệ ô nhiễm thứ hai trong phòng sạch chỉ sau nhân sự. Lựa chọn vật tư kém chất lượng có thể dẫn đến nhiễm hạt trên bề mặt sản phẩm bán dẫn hoặc vi sinh vật trong thuốc.',
          en: 'Consumables are the second largest contamination vector after personnel. Poor quality materials lead to microparticle defects on semiconductor wafers or microbial contamination in pharmaceuticals.',
          ja: '消耗品は作業員に次ぐ第2の汚染要因です。粗悪な資材は、半導体ウエハ表面の微粒子欠陥や医薬品中の微生物汚染を引き起こします。'
        }
      },
      {
        id: 'sec-2-2',
        num: '2.',
        title: {
          vi: 'Tiêu chí đánh giá găng tay, khăn lau và quần áo ESD',
          en: 'Evaluation Criteria for Gloves, Wipes & ESD Apparel',
          ja: '手袋、ワイパー、ESDウェアの評価基準'
        },
        content: {
          vi: 'Găng tay nitrile cần có hàm lượng ion chiết xuất cực thấp và độ bền xé cao.\nKhăn lau polyester kết hợp cellulose cần qua xử lý laser mép để tránh xơ sợi.\nQuần áo phòng sạch phải woven từ sợi carbon chống tĩnh điện (ESD) liên tục.',
          en: 'Nitrile gloves require low extractable ion levels and high tear strength.\nPolyester-cellulose wipes need laser-sealed edges to prevent fiber shedding.\nCleanroom apparel must feature continuous conductive ESD carbon threads.',
          ja: 'ニトリル手袋は抽出可能イオン濃度が非常に低く、高い引き裂き強度が必要です。\nポリエステル・セルロースワイパーは、繊維の発生を防ぐためにレーザーカットエッジ処理が必要です。\nクリーンルームウェアは、連続したESDカーボン繊維で織られている必要があります。'
        },
        alertText: {
          vi: 'Khuyên dùng: Nên ưu tiên găng tay dài 12-inch (30cm) để bảo vệ toàn bộ phần cổ tay và tay áo.',
          en: 'Recommendation: Prefer 12-inch (30cm) gloves to completely seal wrist and sleeve gaps.',
          ja: '推奨：手首と袖の隙間を完全に保護するために、12インチ（30cm）の手袋を優先してください。'
        }
      },
      {
        id: 'sec-2-3',
        num: '3.',
        title: {
          vi: 'Phân loại vật tư theo cấp độ ISO sạch',
          en: 'Categorizing Supplies by ISO Cleanliness Class',
          ja: 'ISO清浄度クラスによる資材の分類'
        },
        content: {
          vi: 'Mỗi môi trường ISO 4, 5 hay 7 đều đòi hỏi cấp đóng gói vật tư tương ứng (Class 10 / Class 100 cleanroom packaging).\nVật tư phải trải qua quá trình giặt sấy trong phòng sạch trước khi đóng gói hai lớp (Double-bagged).',
          en: 'ISO 4, 5, or 7 zones demand corresponding packaging cleanliness (Class 10 / Class 100 cleanroom packaging).\nSupplies undergo cleanroom laundering before double-bagging.',
          ja: 'ISO 4、5、または7エリアには、対応する包装清浄度が要求されます。\n資材は二重袋（Double-bagged）包装の前にクリーンルームでの洗濯・乾燥プロセスを経る必要があります。'
        }
      },
      {
        id: 'sec-2-4',
        num: '4.',
        title: {
          vi: 'Quy trình kiểm định và nghiệm thu vật tư đầu vào',
          en: 'Incoming Inspection & Verification Workflow',
          ja: '入荷資材の検査および受入プロセス'
        },
        content: {
          vi: 'Doanh nghiệp cần xây dựng bảng checklist nghiệm thu vật tư gồm: Kiểm tra chứng nhận CO/CQ, đo điện trở bề mặt (Surface Resistivity) và xét nghiệm vi hạt độc lập.',
          en: 'Enterprises should establish incoming inspection checklists including: CO/CQ certificates, Surface Resistivity measurement, and independent particle testing.',
          ja: '企業は、CO/CQ証明書の確認、表面抵抗の測定、独立した微粒子テストを含む受入検査チェックリストを作成する必要があります。'
        }
      }
    ]
  },
  {
    id: 'card-3',
    category: 'guide',
    badge: { vi: 'Infographic', en: 'Infographic', ja: 'インフォグラフィック' },
    title: {
      vi: 'Kiến thức về hệ thống HVAC',
      en: 'HVAC System Fundamentals',
      ja: 'HVACシステムに関する基礎知識'
    },
    description: {
      vi: 'Tổng quan về hệ thống điều hòa không khí và thông gió trong công nghiệp.',
      en: 'Overview of industrial air conditioning and ventilation system architecture.',
      ja: '産業における空調および換気システムの概要。'
    },
    date: 'Tháng 11, 2024',
    image: '/images/resources/autohtml/thumb2.png',
    author: {
      name: { vi: 'ULink Editorial', en: 'ULink Editorial', ja: 'ULink 編集部' },
      role: { vi: 'Kỹ sư HVAC', en: 'HVAC Engineer', ja: 'HVACエンジニア' },
      avatar: '/images/about/op-team.webp'
    },
    readTime: { vi: '4 phút đọc', en: '4 min read', ja: '4分' },
    sections: [
      {
        id: 'sec-3-1',
        num: '1.',
        title: {
          vi: 'Cấu trúc cơ bản của hệ thống HVAC phòng sạch',
          en: 'Basic Architecture of Cleanroom HVAC Systems',
          ja: 'クリーンルームHVACシステムの基本構造'
        },
        content: {
          vi: 'Hệ thống HVAC phòng sạch bao gồm AHU (Air Handling Unit), đường ống gió cách nhiệt, van dăm-pơ chênh áp, và cụm bộ lọc HEPA/ULPA lắp ở trần.\nHệ thống giữ vai trò duy trì 4 thông số: Độ sạch, Nhiệt độ (20-22°C), Độ ẩm (45-55%), và Chênh áp dương (10-15 Pa).',
          en: 'Cleanroom HVAC comprises AHUs, insulated ductwork, differential pressure dampers, and ceiling HEPA/ULPA modules.\nIt controls 4 metrics: Cleanliness, Temperature (20-22°C), Humidity (45-55%), and Positive Differential Pressure (10-15 Pa).',
          ja: 'クリーンルームHVACは、AHU、断熱ダクト、差圧ダンパー、天井HEPA/ULPAモジュールで構成されます。\n清浄度、温度（20-22°C）、湿度（45-55%）、および陽圧差圧（10-15 Pa）の4つの指標を維持します。'
        }
      },
      {
        id: 'sec-3-2',
        num: '2.',
        title: {
          vi: 'Nguyên lý tuần hoàn không khí và chênh áp',
          en: 'Air Recirculation & Differential Pressure Principles',
          ja: '空気循環と差圧の原理'
        },
        content: {
          vi: 'Chênh áp dương giữ cho không khí luôn chảy từ vùng sạch hơn sang vùng ít sạch hơn, ngăn chặn vi hạt từ bên ngoài xâm nhập.\nBội số tuần hoàn không khí (ACH - Air Changes per Hour) dao động từ 20 đến hơn 600 lần/giờ tùy thuộc cấp ISO.',
          en: 'Positive pressure forces air flow from cleaner to less clean areas, preventing external particulate ingress.\nAir Changes per Hour (ACH) range from 20 to over 600 times/hour depending on ISO class.',
          ja: '陽圧差圧により、空気はより清潔なエリアから清浄度の低いエリアへと流れ、外部からの微粒子の侵入を防ぎます。\n換気回数（ACH）はISOクラスに応じて1時間あたり20回から600回以上に及びます。'
        }
      },
      {
        id: 'sec-3-3',
        num: '3.',
        title: {
          vi: 'Hệ thống màng lọc HEPA/ULPA và hiệu suất lọc',
          en: 'HEPA/ULPA Filtration & Efficiency Standards',
          ja: 'HEPA/ULPAフィルターシステムとろ過効率'
        },
        content: {
          vi: 'Bộ lọc HEPA H14 đạt hiệu suất lọc 99.995% với hạt 0.3 µm.\nBộ lọc ULPA U15 đạt hiệu suất 99.9995% với hạt 0.12 µm.\nCần kiểm tra rò rỉ màng lọc bằng phép thử PAO/DOP định kỳ 6-12 tháng/lần.',
          en: 'HEPA H14 filters capture 99.995% at 0.3 µm MPPS.\nULPA U15 filters achieve 99.9995% at 0.12 µm.\nIntegrity leak testing using PAO/DOP aerosol is mandated every 6-12 months.',
          ja: 'HEPA H14フィルターは0.3 µmの粒子に対して99.995%の効率を達成します。\nULPA U15フィルターは0.12 µmで99.9995%を達成します。\n6〜12ヶ月ごとにPAO/DOP試験による漏れ検査が必要です。'
        },
        alertText: {
          vi: 'Cảnh báo: Thay thế bộ lọc sơ cấp (Pre-filter) đúng hạn giúp kéo dài tuổi thọ của bộ lọc HEPA đắt tiền lên gấp 3 lần.',
          en: 'Warning: Timely replacement of pre-filters extends expensive HEPA filter lifespan by up to 3x.',
          ja: '警告：プレフィルターを適時に交換すると、高価なHEPAフィルターの寿命が最大3倍延びます。'
        }
      },
      {
        id: 'sec-3-4',
        num: '4.',
        title: {
          vi: 'Bảo trì định kỳ và xử lý sự cố HVAC',
          en: 'Routine Maintenance & Troubleshooting HVAC',
          ja: '定期メンテナンスとHVACトラブルシューティング'
        },
        content: {
          vi: 'Lập biểu đồ theo dõi độ chênh áp qua màng lọc (Magnehelic Gauge).\nKhi tổn thất áp suất vượt quá 2 lần ban đầu, cần tiến hành thay thế màng lọc ngay.',
          en: 'Track differential pressure across filter banks via Magnehelic gauges.\nReplace filters when pressure drop exceeds twice the initial clean resistance.',
          ja: 'マグネヘリックゲージを介してフィルター前後の差圧を追跡します。\n圧力損失が初期値の2倍を超えた場合は、すぐにフィルターを交換する必要があります。'
        }
      }
    ]
  },
  {
    id: 'card-4',
    category: 'standard',
    badge: { vi: 'Tiêu chuẩn', en: 'Standards', ja: '標準' },
    title: {
      vi: 'Quy trình vận hành phòng sạch',
      en: 'Cleanroom Standard Operating Procedures',
      ja: 'クリーンルームの標準運用手順'
    },
    description: {
      vi: 'Quy trình chuẩn hóa cho vận hành môi trường phòng sạch hiệu quả và an toàn.',
      en: 'Standardized workflow for safe and efficient cleanroom operation.',
      ja: '効率的で safe なクリーンルーム環境運用のための標準化プロセス。'
    },
    date: 'Tháng 10, 2024',
    image: '/images/resources/autohtml/thumb3.png',
    author: {
      name: { vi: 'ULink Editorial', en: 'ULink Editorial', ja: 'ULink 編集部' },
      role: { vi: 'Quản lý vận hành', en: 'Operations Manager', ja: '運用マネージャー' },
      avatar: '/images/about/op-team.webp'
    },
    readTime: { vi: '7 phút đọc', en: '7 min read', ja: '7分' },
    sections: [
      {
        id: 'sec-4-1',
        num: '1.',
        title: {
          vi: 'Quy định ra vào và thay trang phục phòng sạch (SOP)',
          en: 'Gowning & Entry Procedures (SOP)',
          ja: '入室手順および着衣規定（SOP）'
        },
        content: {
          vi: 'Quy trình thay đồ tuân thủ nguyên tắc từ trên xuống dưới và từ trong ra ngoài.\nNhân sự đi qua thảm dính bụi (Sticky mat), vào phòng Air Shower thổi bụi 15-30 giây trước khi bước vào khu vực sản xuất chính.',
          en: 'Gowning follows top-to-bottom and inside-to-outside sequence.\nPersonnel pass over sticky mats into Air Showers for 15-30 seconds of air jet de-dusting before entering clean bays.',
          ja: '着衣手順は上から下、内から外の原則に従います。\n作業員は粘着マットを通り、エアシャワーで15〜30秒間除塵した後にメイン生産エリアに入ります。'
        }
      },
      {
        id: 'sec-4-2',
        num: '2.',
        title: {
          vi: 'Quy trình khử trùng và vệ sinh bề mặt định kỳ',
          en: 'Surface Disinfection & Cleaning Protocols',
          ja: '定期的な表面消毒および清掃プロトコル'
        },
        content: {
          vi: 'Vệ sinh bề mặt bằng cồn Isopropyl Alcohol (IPA) 70% đã lọc vi hạt.\nSử dụng kỹ thuật lau một chiều (Single-pass wiping) để không phát tán ngược vi hạt.',
          en: 'Clean surfaces using filtered 70% Isopropyl Alcohol (IPA).\nApply single-pass overlapping wiping techniques to avoid re-contaminating clean zones.',
          ja: 'ろ過された70%イソプロピルアルコール（IPA）で表面を清掃します。\n微粒子の再拡散を防ぐため、一方向拭き取り（Single-pass wiping）技術を使用します。'
        }
      },
      {
        id: 'sec-4-3',
        num: '3.',
        title: {
          vi: 'Quản lý nguyên vật liệu và thiết bị qua Pass-box',
          en: 'Material & Equipment Transfer via Pass-boxes',
          ja: 'パスボックスを介した資材・機器の管理'
        },
        content: {
          vi: 'Toàn bộ nguyên vật liệu phải tháo bỏ bao bì carton bên ngoài trước khi đưa qua Pass-box interlock khóa chéo âm dương.',
          en: 'All materials must undergo outer carton stripping before entering interlocked Pass-boxes.',
          ja: 'すべての資材は、インターロック付きパスボックスを通過する前に、外箱段ボールを取り除く必要があります。'
        }
      },
      {
        id: 'sec-4-4',
        num: '4.',
        title: {
          vi: 'Giám sát thông số môi trường (Nhiệt độ, Độ ẩm, Chênh áp)',
          en: 'Environmental Monitoring (Temp, Humidity, Pressure)',
          ja: '環境パラメータの監視（温度、湿度、差圧）'
        },
        content: {
          vi: 'Hệ thống cảm biến tự động ghi nhận dữ liệu 24/7 và đưa ra cảnh báo tức thì khi chênh áp tụt xuống dưới 10 Pa.',
          en: 'Automated sensors log data 24/7, triggering instant alerts whenever room pressure drops below 10 Pa.',
          ja: '自動センサーがデータを24時間365日記録し、室圧が10 Paを下回ると即座にアラートを発します。'
        }
      }
    ]
  },
  {
    id: 'card-5',
    category: 'case-study',
    badge: { vi: 'Case Study', en: 'Case Study', ja: 'ケーススタディ' },
    title: {
      vi: 'Nhà máy Samsung Việt Nam',
      en: 'Samsung Vietnam Plant Case Study',
      ja: 'サムスンベトナム工場のケーススタディ'
    },
    description: {
      vi: 'Triển khai hệ thống vật tư phòng sạch cho dây chuyền sản xuất chip bán dẫn.',
      en: 'Deploying cleanroom materials for semiconductor chip assembly line.',
      ja: '半導体チップ生産ライン向けクリーンルーム資材システムの導入。'
    },
    date: 'Tháng 10, 2024',
    image: '/images/resources/autohtml/thumb4.png',
    author: {
      name: { vi: 'ULink Editorial', en: 'ULink Editorial', ja: 'ULink 編集部' },
      role: { vi: 'Chuyên gia Dự án', en: 'Project Specialist', ja: 'プロジェクト専門家' },
      avatar: '/images/about/op-team.webp'
    },
    readTime: { vi: '8 phút đọc', en: '8 min read', ja: '8分' },
    sections: [
      {
        id: 'sec-5-1',
        num: '1.',
        title: {
          vi: 'Thách thức về kiểm soát vi hạt trong lắp ráp bán dẫn',
          en: 'Contamination Control Challenges in Semiconductor Fabs',
          ja: '半導体組み立てにおける微粒子制御の課題'
        },
        content: {
          vi: 'Với tiến trình sản xuất linh kiện vi mạch mật độ cao, chỉ một hạt bụi kích thước 0.1 µm cũng có thể gây hỏng toàn bộ die bán dẫn. Nhà máy Samsung yêu cầu vật tư phòng sạch tiêu chuẩn ISO Class 3 khắt khe.',
          en: 'With high-density microchip fabrication, even a single 0.1 µm particle ruins an entire wafer die. Samsung demanded strict ISO Class 3 compliant materials.',
          ja: '高密度マイクロチップ製造において、わずか0.1 µmの1つの粒子がダイ全体を破壊する可能性があります。サムスンは厳格なISOクラス3準拠の資材を要求しました。'
        }
      },
      {
        id: 'sec-5-2',
        num: '2.',
        title: {
          vi: 'Giải pháp tích hợp vật tư phòng sạch ULink',
          en: 'ULink Cleanroom Supplies Integration Solution',
          ja: 'ULinkクリーンルーム資材統合ソリューション'
        },
        content: {
          vi: 'ULink đã cung cấp giải pháp trọn gói bao gồm: Găng tay nitrile 12" siêu sạch, khăn lau polyester không xơ dệt vi sợi, và khay tĩnh điện ESD chuyên dụng.\nToàn bộ lô hàng được kiểm định hạt bụi tự do bằng máy đếm LPC (Liquid Particle Counter).',
          en: 'ULink supplied an end-to-end package: 12" ultra-clean nitrile gloves, non-shedding micro-fiber polyester wipes, and specialized ESD trays.\nAll lots were validated via Liquid Particle Counter (LPC).',
          ja: 'ULinkは、12インチの超清浄ニトリル手袋、発塵のないマイクロファイバーポリエステルワイパー、専用ESDトレイを含むエンドツーエンドのパッケージを提供しました。\nすべてのバッチはLPC（液体粒子カウンター）で検証されました。'
        }
      },
      {
        id: 'sec-5-3',
        num: '3.',
        title: {
          vi: 'Kết quả cải thiện tỷ lệ lỗi sản phẩm (Yield Rate)',
          en: 'Product Yield Rate Improvement Results',
          ja: '歩留まり率（Yield Rate）改善の結果'
        },
        content: {
          vi: 'Sau 6 tháng chuyển đổi sang dòng vật tư cao cấp ULink, tỷ lệ lỗi sản phẩm do vi hạt giảm 34%, giúp nhà máy nâng tỷ lệ sản phẩm đạt (Yield Rate) lên 98.6%.',
          en: 'After 6 months transitioning to ULink supplies, particle defect rates fell by 34%, lifting wafer yield rates to 98.6%.',
          ja: 'ULinkの高品質資材への切り替えから6ヶ月後、微粒子による製品欠陥率は34%減少し、歩留まり率は98.6%に向上しました。'
        },
        alertText: {
          vi: 'Thành tựu: Dự án được Samsung vinh danh là Giải pháp Cung ứng B2B Xuất sắc năm 2024.',
          en: 'Achievement: Awarded Excellent B2B Supply Solution 2024 by Samsung.',
          ja: '実績：2024年サムスン優秀B2Bサプライソリューション賞を受賞。'
        }
      },
      {
        id: 'sec-5-4',
        num: '4.',
        title: {
          vi: 'Bài học kinh nghiệm cho doanh nghiệp sản xuất điện tử',
          en: 'Key Takeaways for Electronics Manufacturers',
          ja: '電子機器メーカー向けの重要な教訓'
        },
        content: {
          vi: 'Đầu tư chuẩn hóa vật tư tiêu hao đầu vào mang lại hiệu quả kinh tế rõ rệt thông qua việc giảm chi phí tái chế sản phẩm lỗi và tăng năng suất dây chuyền.',
          en: 'Investing in standardized input consumables yields clear ROI by slashing scrap costs and boosting line throughput.',
          ja: '標準化された入力消耗品への投資は、廃棄コストの削減とラインスループットの向上により、明確なROIをもたらします。'
        }
      }
    ]
  },
  {
    id: 'card-6',
    category: 'guide',
    badge: { vi: 'Infographic', en: 'Infographic', ja: 'インフォグラフィック' },
    title: {
      vi: 'Bảo hộ lao động trong công nghiệp',
      en: 'Industrial PPE & Personal Safety',
      ja: '産業労働安全と保護具'
    },
    description: {
      vi: 'Danh mục thiết bị bảo hộ cá nhân theo chuẩn an toàn lao động quốc tế.',
      en: 'List of personal protective equipment aligned with international safety codes.',
      ja: '国際労働安全基準に準拠した個人用保護具のリスト。'
    },
    date: 'Tháng 10, 2024',
    image: '/images/resources/autohtml/thumb5.png',
    author: {
      name: { vi: 'ULink Editorial', en: 'ULink Editorial', ja: 'ULink 編集部' },
      role: { vi: 'Chuyên gia HSE', en: 'HSE Expert', ja: 'HSE専門家' },
      avatar: '/images/about/op-team.webp'
    },
    readTime: { vi: '5 phút đọc', en: '5 min read', ja: '5分' },
    sections: [
      {
        id: 'sec-6-1',
        num: '1.',
        title: {
          vi: 'Tổng quan về thiết bị bảo hộ cá nhân (PPE)',
          en: 'Overview of Personal Protective Equipment (PPE)',
          ja: '個人用保護具（PPE）の概要'
        },
        content: {
          vi: 'Trang thiết bị bảo hộ cá nhân (PPE) đóng vai trò lá chắn bảo vệ người lao động khỏi rủi ro hóa chất, vi hạt độc hại và chấn thương cơ học trong môi trường nhà máy.',
          en: 'Personal Protective Equipment (PPE) acts as the final defense barrier against chemical splashes, hazardous particulates, and mechanical injuries.',
          ja: '個人用保護具（PPE）は、化学物質の飛散、有害な微粒子、および機械的負傷に対する最終防護壁として機能します。'
        }
      },
      {
        id: 'sec-6-2',
        num: '2.',
        title: {
          vi: 'Tiêu chuẩn an toàn và chống tĩnh điện ESD',
          en: 'Safety Standards & Anti-Static ESD Controls',
          ja: '安全基準と静電気防止（ESD）制御'
        },
        content: {
          vi: 'Đối với ngành điện tử, giày bảo hộ ESD và găng tay phủ PU tĩnh điện phải tuân thủ chuẩn ANSI/ESD S20.20 với điện trở bề mặt trong khoảng 10^6 đến 10^9 Ohms.',
          en: 'In electronics, ESD safety footwear and PU-coated anti-static gloves must satisfy ANSI/ESD S20.20 with surface resistance between 10^6 and 10^9 Ohms.',
          ja: 'エレクトロニクス分野では、ESD安全靴とPUコーティング抗静電手袋は、表面抵抗が10^6から10^9オームの範囲でANSI/ESD S20.20に適合する必要があります。'
        }
      },
      {
        id: 'sec-6-3',
        num: '3.',
        title: {
          vi: 'Hướng dẫn trang bị PPE theo từng khu vực sản xuất',
          en: 'PPE Matrix Across Production Zones',
          ja: '生産エリア別PPE装着ガイドライン'
        },
        content: {
          vi: 'Khu vực hóa chất: Kính bảo hộ chống văng bắn, khẩu trang lọc độc 3M, găng tay neoprene dài tay.\nKhu vực cơ khí: Giày mũi thép chống dập ngón, găng tay chống cắt mức Level 5.',
          en: 'Chemical zones: Splash goggles, 3M gas respirators, long neoprene gloves.\nMechanical bays: Steel-toe boots, Level 5 cut-resistant gloves.',
          ja: '化学エリア：飛散 nhãn 鏡、3M防毒マスク、長袖ネオプレン手袋。\n機械エリア：つま先鋼製安全靴、レベル5耐切創手袋。'
        }
      },
      {
        id: 'sec-6-4',
        num: '4.',
        title: {
          vi: 'Quy trình kiểm tra và thay thế thiết bị bảo hộ',
          en: 'Inspection & Replacement Lifecycles',
          ja: '保護具の点検および交換サイクル'
        },
        content: {
          vi: 'Hàng tháng cán bộ HSE cần thực hiện kiểm tra sờn rách, nứt nẻ trên trang thiết bị bảo hộ và thay thế lập tức thiết bị hết hạn hoặc hư hỏng.',
          en: 'HSE officers must perform monthly degradation audits, replacing worn or expired gear instantly.',
          ja: 'HSE担当者は毎月劣化監査を実施し、摩耗した装備や期限切れの装備を即座に交換する必要があります。'
        }
      }
    ]
  },
  {
    id: 'card-7',
    category: 'news',
    badge: { vi: 'Data Room', en: 'Data Room', ja: 'データルーム' },
    title: {
      vi: 'Thiết bị đo lường và kiểm soát',
      en: 'Measurement and Control Instrumentation',
      ja: '計測・制御機器'
    },
    description: {
      vi: 'Tổng hợp thông số kỹ thuật và ứng dụng các thiết bị đo lường trong sản xuất.',
      en: 'Comprehensive technical specification and applications of factory testing devices.',
      ja: '製造における計測機器の仕様と用途のまとめ。'
    },
    date: 'Tháng 9, 2024',
    image: '/images/resources/autohtml/thumb6.png',
    author: {
      name: { vi: 'ULink Editorial', en: 'ULink Editorial', ja: 'ULink 編集部' },
      role: { vi: 'Ban biên tập', en: 'Editorial Board', ja: '編集部' },
      avatar: '/images/about/op-team.webp'
    },
    readTime: { vi: '8 phút đọc', en: '8 min read', ja: '8分' },
    sections: [
      {
        id: 'sec-7-1',
        num: '1.',
        title: {
          vi: 'Vai trò của thiết bị đo lường trong phòng sạch',
          en: 'Role of Measurement Instrumentation in Cleanrooms',
          ja: 'クリーンルームにおける計測機器の役割'
        },
        content: {
          vi: 'Thiết bị đo lường là con mắt giám sát độ sạch không khí, đảm bảo môi trường sản xuất không bị biến đổi bất ngờ gây ảnh hưởng đến chất lượng sản phẩm.',
          en: 'Instrumentation acts as the eyes monitoring air quality, ensuring production parameters remain strictly within validated windows.',
          ja: '計測機器は空気清浄度を監視する目として機能し、生産パラメータが検証済み範囲内に厳格に維持されることを保証します。'
        }
      },
      {
        id: 'sec-7-2',
        num: '2.',
        title: {
          vi: 'Các loại máy đếm hạt bụi và cảm biến chênh áp',
          en: 'Particle Counters & Differential Sensors',
          ja: '粒子カウンターおよび差圧センサーの種類'
        },
        content: {
          vi: 'Máy đếm hạt bụi xách tay dòng 28.3 L/min phục vụ kiểm tra nhanh.\nCảm biến chênh áp kỹ thuật số hiển thị LED kết nối cổng truyền thông Modbus RS485 đưa dữ liệu về trung tâm.',
          en: 'Handheld 28.3 L/min particle counters provide spot audits.\nDigital differential sensors with RS485 Modbus stream continuous telemetry to SCADA.',
          ja: 'ポータブル28.3 L/min粒子カウンターは迅速な監査に使用されます。\nRS485 Modbus通信を備えたデジタル差圧センサーは、連続したテレメトリをSCADAに送信します。'
        }
      },
      {
        id: 'sec-7-3',
        num: '3.',
        title: {
          vi: 'Quy trình hiệu chuẩn (Calibration) đạt chuẩn ISO/IEC 17025',
          en: 'ISO/IEC 17025 Calibration Standards',
          ja: 'ISO/IEC 17025に準拠した校正プロセス'
        },
        content: {
          vi: 'Toàn bộ thiết bị đo cần được hiệu chuẩn định kỳ 12 tháng/lần tại các phòng lab đạt chuẩn ISO/IEC 17025 sử dụng hạt chuẩn NIST.',
          en: 'Instruments require annual calibration at ISO/IEC 17025 accredited labs using NIST-traceable microspheres.',
          ja: 'すべての測定機器は、NIST追跡可能な標準粒子を使用して、ISO/IEC 17025認定ラボで年に1回校正される必要があります。'
        }
      },
      {
        id: 'sec-7-4',
        num: '4.',
        title: {
          vi: 'Tích hợp dữ liệu đo lường vào hệ thống BMS/SCADA',
          en: 'Integrating Sensors into BMS/SCADA Systems',
          ja: 'BMS/SCADAシステムへの計測データの統合'
        },
        content: {
          vi: 'Tích hợp tự động giúp trích xuất báo cáo tự động, cảnh báo qua SMS/Email khi có bất thường và lưu trữ hồ sơ lịch sử phục vụ kiểm toán.',
          en: 'Integration enables automated reporting, instant SMS/Email alerts, and audit trail records.',
          ja: '統合により、自動レポート作成、異常時のSMS/電子メールによるアラート、監査用履歴記録の保管が可能になります。'
        }
      }
    ]
  },
  {
    id: 'card-8',
    category: 'guide',
    badge: { vi: 'E-books', en: 'E-books', ja: 'Eブック' },
    title: {
      vi: 'Tiêu chuẩn GMP trong dược phẩm',
      en: 'GMP Standards in Pharmaceutical Manufacturing',
      ja: '医薬品製造におけるGMP基準'
    },
    description: {
      vi: 'Hướng dẫn thực hành sản xuất tốt cho ngành dược phẩm và y tế.',
      en: 'Good Manufacturing Practice (GMP) guide for healthcare and pharmaceuticals.',
      ja: '医薬品および医療産業向けの適正製造規範ガイド。'
    },
    date: 'Tháng 9, 2024',
    image: '/images/resources/autohtml/thumb7.png',
    author: {
      name: { vi: 'ULink Editorial', en: 'ULink Editorial', ja: 'ULink 編集部' },
      role: { vi: 'Chuyên gia Dược phẩm', en: 'Pharma Expert', ja: '医薬品専門家' },
      avatar: '/images/about/op-team.webp'
    },
    readTime: { vi: '12 phút đọc', en: '12 min read', ja: '12分' },
    sections: [
      {
        id: 'sec-8-1',
        num: '1.',
        title: {
          vi: 'Tổng quan về nguyên tắc GMP-WHO và EU-GMP',
          en: 'Principles of GMP-WHO & EU-GMP',
          ja: 'GMP-WHOおよびEU-GMPの基本原則'
        },
        content: {
          vi: 'Thực hành tốt sản xuất thuốc (GMP) đặt ra các nguyên tắc nghiêm ngặt đảm bảo thuốc được sản xuất đồng đều và kiểm soát theo đúng tiêu chuẩn chất lượng.',
          en: 'Good Manufacturing Practice (GMP) sets strict directives ensuring pharmaceuticals are consistently produced and controlled to quality standards.',
          ja: '医薬品適正製造規範（GMP）は、医薬品が品質基準に従って一貫して製造および管理されることを保証する厳格な原則を規定しています。'
        }
      },
      {
        id: 'sec-8-2',
        num: '2.',
        title: {
          vi: 'Yêu cầu kiểm soát nhiễm chéo trong nhà máy dược',
          en: 'Cross-Contamination Control Requirements',
          ja: '医薬品工場における交差汚染の制御要件'
        },
        content: {
          vi: 'Ngăn ngừa nhiễm chéo bằng thiết kế HVAC chênh áp phân khu, hệ thống cửa Air-lock chéo và sử dụng trang phục phòng sạch tiệt trùng single-use.',
          en: 'Prevent cross-contamination through zoned pressure cascades, airlock doors, and sterile single-use apparel.',
          ja: 'ゾーン別差圧HVAC、エアロックドア、ステライル使い捨てウェアを使用して交差汚染を防ぎます。'
        }
      },
      {
        id: 'sec-8-3',
        num: '3.',
        title: {
          vi: 'Hệ thống xử lý không khí và cấp nước tinh khiết (PW/WFI)',
          en: 'Air Handling & Purified Water Systems (PW/WFI)',
          ja: '空気処理システムおよび精製水（PW/WFI）供給'
        },
        content: {
          vi: 'Nước pha tiêm (WFI) phải được duy trì tuần hoàn ở nhiệt độ 80°C để chống tái nhiễm khuẩn. Hệ thống HVAC phòng sản xuất thuốc tiêm yêu cầu vô trùng Grade A/B.',
          en: 'Water for Injection (WFI) must recirculate at 80°C to prevent bio-film formation. Injectable suites mandate Grade A/B cleanroom conditions.',
          ja: '注射用水（WFI）はバイオフィルム形成を防ぐために80°Cで循環維持する必要があります。注射剤エリアはグレードA/B条件を必須とします。'
        }
      },
      {
        id: 'sec-8-4',
        num: '4.',
        title: {
          vi: 'Quy trình thẩm định (Validation) nhà xưởng dược',
          en: 'Facility Validation & Protocol Steps',
          ja: '医薬品工場のバリデーション（Validation）手順'
        },
        content: {
          vi: 'Hoàn thiện hồ sơ thẩm định 4 giai đoạn: DQ (Thiết kế), IQ (Lắp đặt), OQ (Vận hành), và PQ (Hiệu năng) trước khi đưa nhà máy vào vận hành thương mại.',
          en: 'Complete 4-stage validation protocols: Design (DQ), Installation (IQ), Operational (OQ), and Performance Qualification (PQ).',
          ja: '商業運転前に、DQ（設計）、IQ（据付）、OQ（運転）、PQ（性能）の4段階のバリデーションプロトコルを完了します。'
        }
      }
    ]
  },
  {
    id: 'card-9',
    category: 'case-study',
    badge: { vi: 'Case Study', en: 'Case Study', ja: 'ケーススタディ' },
    title: {
      vi: 'An toàn hóa chất công nghiệp',
      en: 'Industrial Chemical Safety Management',
      ja: '産業용化学物質の安全管理'
    },
    description: {
      vi: 'Quy trình và quy định xử lý an toàn hóa chất trong môi trường công nghiệp.',
      en: 'Handling regulations and emergency response protocols for industrial chemicals.',
      ja: '産業環境における化学物質の安全な取り扱い手順と規制。'
    },
    date: 'Tháng 9, 2024',
    image: '/images/resources/autohtml/thumb8.png',
    author: {
      name: { vi: 'ULink Editorial', en: 'ULink Editorial', ja: 'ULink 編集部' },
      role: { vi: 'Ban biên tập', en: 'Editorial Board', ja: '編集部' },
      avatar: '/images/about/op-team.webp'
    },
    readTime: { vi: '9 phút đọc', en: '9 min read', ja: '9分' },
    sections: [
      {
        id: 'sec-9-1',
        num: '1.',
        title: {
          vi: 'Phân loại hóa chất nguy hiểm và tiêu chuẩn GHS',
          en: 'Hazardous Chemical Classification & GHS',
          ja: '危険有害化学物質の分類とGHS基準'
        },
        content: {
          vi: 'Hệ thống hài hòa toàn cầu GHS quy định nhãn cảnh báo hóa chất dễ cháy, ăn mòn, độc tính cấp tính để người lao động dễ dàng nhận biết nguy cơ.',
          en: 'GHS harmonizes global chemical warning labels for flammables, corrosives, and acute toxins for instant hazard recognition.',
          ja: 'GHSは、作業員が危険を即座に認識できるように、引火性、腐食性、急性毒性などの化学物質警告ラベルを世界的に調和させています。'
        }
      },
      {
        id: 'sec-9-2',
        num: '2.',
        title: {
          vi: 'Quy định lưu trữ, bảo quản và vận chuyển hóa chất',
          en: 'Storage, Handling & Transport Regulations',
          ja: '化学物質の保管、取り扱い、輸送に関する規制'
        },
        content: {
          vi: 'Kho hóa chất phải trang bị tủ chống cháy đạt chuẩn FM Approval, khay hứng tràn dung tích 110% và hệ thống thông gió chống nổ.',
          en: 'Chemical stores require FM-Approved safety cabinets, 110% containment spill pallets, and explosion-proof ventilation.',
          ja: '化学物質倉庫には、FM承認の安全キャビネット、110%容量の漏洩受けトレイ、防爆換気システムを装備する必要があります。'
        }
      },
      {
        id: 'sec-9-3',
        num: '3.',
        title: {
          vi: 'Biện pháp phòng ngừa và trang thiết bị ứng cứu sự cố',
          en: 'Emergency Response & Spill Containment Kits',
          ja: '事故対応対策および緊急時装備'
        },
        content: {
          vi: 'Trang bị bộ Spill Kit xử lý sự cố tràn hóa chất khẩn cấp, vòi rửa mắt khẩn cấp (Emergency Eyewash) trong bán kính 10 mét từ vị trí thao tác.',
          en: 'Deploy chemical spill kits and emergency eyewash stations within 10 meters of handling areas.',
          ja: '作業位置から10メートル以内に、緊急化学物質漏洩キットと緊急洗眼器を配置します。'
        }
      },
      {
        id: 'sec-9-4',
        num: '4.',
        title: {
          vi: 'Đào tạo an toàn hóa chất cho người lao động',
          en: 'Worker Safety Training & MSDS Compliance',
          ja: '作業員向け化学物質安全教育'
        },
        content: {
          vi: 'Tổ chức diễn tập ứng phó sự cố hóa chất định kỳ 6 tháng/lần và đảm bảo phiếu MSDS tiếng Việt luôn có sẵn tại nơi làm việc.',
          en: 'Conduct bi-annual emergency response drills and keep localized MSDS sheets accessible in all work areas.',
          ja: '半年に1回緊急対応訓練を実施し、現地語のMSDSシートをすべての作業エリアで閲覧可能にします。'
        }
      }
    ]
  },
  {
    id: 'card-10',
    category: 'guide',
    badge: { vi: 'Infographic', en: 'Infographic', ja: 'インフォグラフィック' },
    title: {
      vi: 'Hệ thống lọc khí công nghiệp',
      en: 'Industrial Air Filtration Technologies',
      ja: '産業用空気ろ過技術'
    },
    description: {
      vi: 'So sánh và phân tích các công nghệ lọc khí hiện đại trong sản xuất công nghiệp.',
      en: 'Comparative analysis of advanced air filtration systems in modern manufacturing.',
      ja: '産業生産における現代の空気ろ過技術の比較と分析。'
    },
    date: 'Tháng 8, 2024',
    image: '/images/resources/autohtml/thumb9.png',
    author: {
      name: { vi: 'ULink Editorial', en: 'ULink Editorial', ja: 'ULink 編集部' },
      role: { vi: 'Ban biên tập', en: 'Editorial Board', ja: '編集部' },
      avatar: '/images/about/op-team.webp'
    },
    readTime: { vi: '7 phút đọc', en: '7 min read', ja: '7分' },
    sections: [
      {
        id: 'sec-10-1',
        num: '1.',
        title: {
          vi: 'Nguyên lý hoạt động của màng lọc không khí',
          en: 'Working Principles of Air Filtration Media',
          ja: '空気ろ過メディアの動作原理'
        },
        content: {
          vi: 'Màng lọc giữ lại hạt bụi nhờ 4 cơ chế cơ bản: Sàng lọc (Sieving), Chặn (Interception), Tác động quán tính (Inertial Impaction), và Khuếch tán (Diffusion).',
          en: 'Filter media capture contaminants via 4 mechanism stages: Sieving, Interception, Inertial Impaction, and Brownian Diffusion.',
          ja: 'フィルターメディアは、ふるい分け、遮断、慣性衝突、およびブラウン拡散の4つのメカニズムを介して汚染物質を捕集します。'
        }
      },
      {
        id: 'sec-10-2',
        num: '2.',
        title: {
          vi: 'Phân biệt màng lọc Sơ cấp, Trung cấp và HEPA/ULPA',
          en: 'Comparing Pre-filters, Medium Filters & HEPA/ULPA',
          ja: 'プレフィルター、中性能フィルター、HEPA/ULPAの比較'
        },
        content: {
          vi: 'Màng lọc sơ cấp G4 bảo vệ quạt gió khỏi bụi thô > 10 µm.\nMàng trung cấp F8 giữ hạt 1-5 µm.\nMàng HEPA H14/ULPA U15 là chốt chặn cuối cùng cho vi hạt siêu mịn.',
          en: 'G4 pre-filters trap coarse particles > 10 µm.\nF8 medium filters catch 1-5 µm dust.\nHEPA H14/ULPA U15 serve as final barriers for sub-micron particles.',
          ja: 'G4プレフィルターは10 µm超の粗大粒子を捕集します。\nF8中性能フィルターは1〜5 µmの粉塵を捕集します。\nHEPA H14/ULPA U15はサブミクロン粒子の最終バリアとして機能します。'
        }
      },
      {
        id: 'sec-10-3',
        num: '3.',
        title: {
          vi: 'Đánh giá tuổi thọ và tần suất thay thế màng lọc',
          en: 'Lifespan Assessment & Replacement Cycles',
          ja: '寿命評価および交換サイクルの設定'
        },
        content: {
          vi: 'Màng sơ cấp: Thay thế sau 2-3 tháng.\nMàng trung cấp: 6-12 tháng.\nMàng HEPA: 3-5 năm tùy thuộc vào tải lượng bụi và chất lượng màng lọc sơ cấp.',
          en: 'Pre-filters: Replace every 2-3 months.\nMedium filters: 6-12 months.\nHEPA: 3-5 years based on dust loading.',
          ja: 'プレフィルター：2〜3ヶ月ごとに交換。\n中性能フィルター：6〜12ヶ月。\nHEPA：粉塵負荷に応じて3〜5年。'
        }
      },
      {
        id: 'sec-10-4',
        num: '4.',
        title: {
          vi: 'Giải pháp tiết kiệm năng lượng cho hệ thống lọc',
          en: 'Energy Saving Solutions for Air Filtration',
          ja: '空気ろ過システムの省エネソリューション'
        },
        content: {
          vi: 'Sử dụng màng lọc HEPA nếp gấp sâu (Deep-pleat) và động cơ EC quạt FFU biến tần giúp giảm đến 30% điện năng tiêu thụ cho AHU.',
          en: 'Deep-pleat HEPA filters and EC fan FFU modules slash AHU fan energy consumption by up to 30%.',
          ja: 'ディーププリーツHEPAフィルターとECファンFFUモジュールを使用すると、AHUファンの消費電力を最大30%削減できます。'
        }
      }
    ]
  },
  {
    id: 'card-11',
    category: 'news',
    badge: { vi: 'Data Room', en: 'Data Room', ja: 'データルーム' },
    title: {
      vi: 'Báo cáo thị trường vật tư 2024',
      en: 'Industrial Supplies Market Report 2024',
      ja: '産業資材市場レポート 2024'
    },
    description: {
      vi: 'Phân tích xu hướng và dự báo thị trường vật tư công nghiệp Việt Nam năm 2024.',
      en: 'Trend forecast and supply chain market report for Vietnam industrial sectors in 2024.',
      ja: '2024年のベトナム産業資材市場のトレンド分析と予測。'
    },
    date: 'Tháng 8, 2024',
    image: '/images/resources/autohtml/thumb10.png',
    author: {
      name: { vi: 'ULink Editorial', en: 'ULink Editorial', ja: 'ULink 編集部' },
      role: { vi: 'Chuyên gia Phân tích', en: 'Market Analyst', ja: '市場アナリスト' },
      avatar: '/images/about/op-team.webp'
    },
    readTime: { vi: '10 phút đọc', en: '10 min read', ja: '10分' },
    sections: [
      {
        id: 'sec-11-1',
        num: '1.',
        title: {
          vi: 'Tổng quan thị trường vật tư công nghiệp Việt Nam 2024',
          en: 'Overview of Vietnam Industrial Supplies Market 2024',
          ja: '2024年ベトナム産業資材市場の概要'
        },
        content: {
          vi: 'Thị trường vật tư công nghiệp Việt Nam ghi nhận mức tăng trưởng 14.5% nhờ làn sóng dịch chuyển dòng vốn FDI vào các ngành điện tử bán dẫn và công nghệ sinh học.',
          en: 'Vietnam industrial supplies market registered 14.5% YoY growth driven by FDI inflows into semiconductor assembly and biotech hubs.',
          ja: '半導体アセンブリおよびバイオテクハブへのFDI流入に牽引され、ベトナムの産業資材市場は前年比14.5%の成長を記録しました。'
        }
      },
      {
        id: 'sec-11-2',
        num: '2.',
        title: {
          vi: 'Xu hướng dịch chuyển chuỗi cung ứng B2B',
          en: 'B2B Supply Chain Digitization Trends',
          ja: 'B2Bサプライチェーンのデジタル化トレンド'
        },
        content: {
          vi: 'Các tập đoàn đa quốc gia chuyển hướng ưu tiên các nhà cung ứng B2B nội địa có khả năng kho vận rải rác, cung ứng JIT (Just-in-Time) và tích hợp nền tảng mua sắm số hóa.',
          en: 'Multinational corporations increasingly prioritize local B2B vendors offering distributed warehousing, JIT delivery, and digital procurement platforms.',
          ja: '多国籍企業は、分散型倉庫保管、JIT配送、デジタル調達プラットフォームを提供するローカルB2Bベンダーをますます優先しています。'
        }
      },
      {
        id: 'sec-11-3',
        num: '3.',
        title: {
          vi: 'Top nhóm hàng phòng sạch và bảo hộ tăng trưởng mạnh',
          en: 'Fastest Growing Cleanroom & Safety Segments',
          ja: '最も急成長しているクリーンルームおよび安全セグメント'
        },
        content: {
          vi: 'Găng tay nitrile không bột, quần áo chống tĩnh điện dệt sợi carbon, và khăn lau phòng sạch siêu mịn ghi nhận mức cầu vượt 40% so với cùng kỳ 2023.',
          en: 'Powder-free nitrile gloves, ESD carbon grid suits, and micro-fiber cleanroom wipes experienced >40% surge in demand.',
          ja: 'パウダーフリーニトリル手袋、ESDカーボングリッドスーツ、マイクロファイバークリーンルームワイパーの需要は40%以上急増しました。'
        }
      },
      {
        id: 'sec-11-4',
        num: '4.',
        title: {
          vi: 'Dự báo và khuyến nghị chiến lược thu mua năm 2025',
          en: 'Forecast & Procurement Strategy Recommendations 2025',
          ja: '2025年の予測と調達戦略の推奨事項'
        },
        content: {
          vi: 'ULink khuyến nghị doanh nghiệp ký hợp đồng khung khung hàng năm (Blanket Order) để cố định giá thành và đảm bảo nguồn cung không bị gián đoạn.',
          en: 'ULink advises enterprises to execute annual Blanket Supply Agreements to lock pricing and secure buffer stock reserves.',
          ja: 'ULinkは、価格を固定し予備在庫を確保するために、年間ブランケット供給契約の締結を推奨します。'
        }
      }
    ]
  },
  {
    id: 'card-12',
    category: 'event',
    badge: { vi: 'Events', en: 'Events', ja: 'イベント' },
    title: {
      vi: 'Hội thảo công nghệ phòng sạch',
      en: 'Cleanroom Technology Seminar',
      ja: 'クリーンルーム技術セミナー'
    },
    description: {
      vi: 'Sự kiện giao lưu và chia sẻ kiến thức chuyên ngành phòng sạch hàng đầu Việt Nam.',
      en: 'Premier cleanroom technology knowledge-sharing forum in Vietnam.',
      ja: 'ベトナムをリードするクリーンルーム業界の知識共有イベント。'
    },
    date: 'Tháng 8, 2024',
    image: '/images/resources/autohtml/thumb11.png',
    author: {
      name: { vi: 'ULink Editorial', en: 'ULink Editorial', ja: 'ULink 編集部' },
      role: { vi: 'Ban biên tập', en: 'Editorial Board', ja: '編集部' },
      avatar: '/images/about/op-team.webp'
    },
    readTime: { vi: 'Tham gia', en: 'Join now', ja: '参加する' },
    sections: [
      {
        id: 'sec-12-1',
        num: '1.',
        title: {
          vi: 'Chương trình tổng quan và các chủ đề thảo luận chính',
          en: 'Program Overview & Key Discussion Topics',
          ja: 'プログラムの概要と主要な議論のトピック'
        },
        content: {
          vi: 'Hội thảo tập trung thảo luận về xu hướng thiết kế phòng sạch tiết kiệm năng lượng, ứng dụng IoT trong giám sát vi hạt và các cập nhật mới nhất về tiêu chuẩn ISO 14644-1:2024.',
          en: 'The seminar highlights energy-efficient cleanroom designs, IoT-enabled particle monitoring, and ISO 14644-1:2024 revisions.',
          ja: 'セミナーでは、省エネクリーンルームの設計、IoTを活用した粒子監視、ISO 14644-1:2024の改訂に焦点を当てます。'
        }
      },
      {
        id: 'sec-12-2',
        num: '2.',
        title: {
          vi: 'Danh sách diễn giả và chuyên gia đầu ngành',
          en: 'Keynote Speakers & Industry Panelists',
          ja: '基調講演者および業界パネリスト'
        },
        content: {
          vi: 'Sự kiện có sự tham gia của các chuyên gia tư vấn kiểm định quốc tế từ Đức, Nhật Bản cùng hơn 300 giám đốc nhà máy và quản lý QA/QC tại Việt Nam.',
          en: 'Featuring international audit experts from Germany and Japan alongside 300+ plant directors and QA managers in Vietnam.',
          ja: 'ドイツおよび日本からの国際監査専門家、ならびにベトナムの300名以上の工場長およびQAマネージャーが参加します。'
        }
      },
      {
        id: 'sec-12-3',
        num: '3.',
        title: {
          vi: 'Triển lãm công nghệ và giải pháp phòng sạch tiên tiến',
          en: 'Technology Exhibition & Product Showcase',
          ja: '技術展示会および製品の紹介'
        },
        content: {
          vi: 'Khu vực gian hàng trải nghiệm trực tiếp hệ thống FFU thông minh, găng tay nitrile siêu mềm ESD, và các thiết bị đo hạt bụi thế hệ mới.',
          en: 'Hands-on exhibition zone showcasing smart FFUs, ultra-soft ESD nitrile gloves, and next-gen aerosol particle counters.',
          ja: 'スマートFFU、超ソフトESDニトリル手袋、次世代エアロゾル粒子カウンターを体験できるハンズオン展示ゾーン。'
        }
      },
      {
        id: 'sec-12-4',
        num: '4.',
        title: {
          vi: 'Hướng dẫn đăng ký tham dự và quyền lợi đại biểu',
          en: 'Delegate Registration & Exclusive Benefits',
          ja: '参加登録および特別特典'
        },
        content: {
          vi: 'Đại biểu đăng ký trước ngày 20/08 được miễn phí tham dự, tặng bộ tài liệu cẩm nang kỹ thuật phòng sạch và ưu đãi tư vấn khảo sát nhà máy trực tiếp từ ULink.',
          en: 'Delegates registering before Aug 20 enjoy free access, technical handbook packages, and complimentary ULink site survey vouchers.',
          ja: '8月20日までに登録した参加者は、無料入場、技術ハンドブックパッケージ、およびULink現場調査クーポンを受け取ることができます。'
        }
      }
    ]
  }
];

// 4 Most Viewed Articles matching autohtml-project/index.html (thumb12.png - thumb15.png)
export const MOST_VIEWED_ARTICLES: ResourceItem[] = [
  {
    id: 'mv-card-1',
    category: 'guide',
    badge: { vi: 'Infographic', en: 'Infographic', ja: 'インフォグラフィック' },
    title: {
      vi: 'Hướng dẫn thiết kế phòng sạch tối ưu cho Doanh nghiệp',
      en: 'Optimal Cleanroom Design Guide for Enterprises',
      ja: '企業向け最適なクリーンルーム設計ガイド'
    },
    description: {
      vi: 'Các nguyên tắc cơ bản và lưu ý quan trọng khi thiết kế môi trường sản xuất sạch.',
      en: 'Core engineering principles and considerations when setting up cleanrooms.',
      ja: 'クリーンな製造環境を設計する際の基本原則と重要な考慮事項。'
    },
    date: '1.2k lượt xem',
    image: '/images/resources/autohtml/thumb12.png',
    author: {
      name: { vi: 'ULink Editorial', en: 'ULink Editorial', ja: 'ULink 編集部' },
      role: { vi: 'Ban biên tập', en: 'Editorial Board', ja: '編集部' },
      avatar: '/images/about/op-team.webp'
    },
    readTime: { vi: 'Đọc thêm', en: 'Read more', ja: 'もっと読む' },
    sections: [
      {
        id: 'sec-mv1-1',
        num: '1.',
        title: {
          vi: 'Khảo sát mặt bằng và xác định cấp độ sạch ISO',
          en: 'Site Survey & Target ISO Class Determination',
          ja: '現地調査と目標ISOクラスの決定'
        },
        content: {
          vi: 'Bước đầu tiên trong quy trình thiết kế phòng sạch là khảo sát điều kiện mặt bằng hiện hữu, luồng gió tự nhiên và xác định cấp ISO sạch mục tiêu (ISO Class 3 - Class 8) theo đúng đặc thù ngành hàng sản xuất.',
          en: 'The first step involves evaluating site conditions, natural airflow paths, and determining target ISO cleanliness classes (ISO Class 3 - Class 8) aligned with specific manufacturing requirements.',
          ja: '設計の第一歩は、現地条件や自然気流経路を評価し、特定の製造要件に合わせた目標ISOクラス（ISOクラス3〜8）を決定することです。'
        }
      },
      {
        id: 'sec-mv1-2',
        num: '2.',
        title: {
          vi: 'Lựa chọn vật liệu vách panel và sàn epoxy/vinyl ESD',
          en: 'Selecting Wall Panels & ESD Epoxy/Vinyl Flooring',
          ja: '壁パネルおよびESDエポキシ/ビニール床材の選定'
        },
        content: {
          vi: 'Ưu tiên vách Panel Sandwich lõi PU/PIR chống cháy với bề mặt phẳng láng, kháng hóa chất tẩy rửa.\nSàn phòng sạch cần thi công lớp phủ Epoxy hoặc Vinyl chống tĩnh điện ESD nối đất tiêu chuẩn.',
          en: 'Prioritize PU/PIR sandwich panels featuring chemical-resistant smooth surfaces.\nFlooring requires conductive ESD epoxy or vinyl coatings connected to verified ground points.',
          ja: '耐薬品性の滑らかな表面を備えたPU/PIRサンドイッチパネルを優先します。\n床材は、検証された接地ポイントに接続された導電性ESDエポキシまたはビニールコーティングが必要です。'
        }
      },
      {
        id: 'sec-mv1-3',
        num: '3.',
        title: {
          vi: 'Bố trí luồng di chuyển nhân sự và hàng hóa (Pass-box / Air Shower)',
          en: 'Personnel & Material Flow Layout (Pass-box / Air Shower)',
          ja: '作業員および資材の動線レイアウト（パスボックス/エアシャワー）'
        },
        content: {
          vi: 'Tách biệt hoàn toàn luồng di chuyển của nhân sự (Person Flow) và luồng hàng hóa (Material Flow).\nTrang bị Air Shower ở lối vào nhân sự và Pass-box khóa chéo cơ/điện ở các khu vực chuyển giao sản phẩm.',
          en: 'Completely segregate Personnel Flow from Material Flow.\nInstall Air Showers at personnel entries and interlocked Pass-boxes at material transfer points.',
          ja: '人流（Personnel Flow）と物流（Material Flow）を完全に分離します。\n作業員入口にエアシャワーを、資材移送ポイントにインターロック付きパスボックスを設置します。'
        }
      },
      {
        id: 'sec-mv1-4',
        num: '4.',
        title: {
          vi: 'Dự toán chi phí đầu tư và tối ưu hóa vận hành',
          en: 'CAPEX Cost Estimation & Operational Optimization',
          ja: 'CAPEXコスト見積もりと運用の最適化'
        },
        content: {
          vi: 'Cân đối giữa chi phí đầu tư ban đầu (CAPEX) và chi phí vận hành hàng năm (OPEX).\nSử dụng hệ thống FFU điều khiển thông minh giúp cắt giảm 25% tiền điện hàng tháng.',
          en: 'Balance initial CAPEX with annual OPEX.\nDeploying smart FFU controls saves up to 25% on monthly electricity bills.',
          ja: '初期CAPEXと年間OPEXのバランスをとります。\nスマートFFU制御の導入により、毎月の電気代を最大25%削減できます。'
        }
      }
    ]
  },
  {
    id: 'mv-card-2',
    category: 'guide',
    badge: { vi: 'Hướng dẫn kỹ thuật', en: 'Technical Guide', ja: '技術ガイド' },
    title: {
      vi: 'Kiểm soát ô nhiễm trong sản xuất Dược phẩm',
      en: 'Contamination Control in Pharmaceutical Manufacturing',
      ja: '医薬品製造における汚染制御'
    },
    description: {
      vi: 'Phương pháp hiệu quả để giảm thiểu bụi và vi khuẩn trong môi trường công nghiệp.',
      en: 'Effective protocols to eliminate dust particles and airborne microbes.',
      ja: '産業環境における粉塵と細菌を最小限に抑える効果的な方法。'
    },
    date: '850 lượt xem',
    image: '/images/resources/autohtml/thumb13.png',
    author: {
      name: { vi: 'ULink Editorial', en: 'ULink Editorial', ja: 'ULink 編集部' },
      role: { vi: 'Ban biên tập', en: 'Editorial Board', ja: '編集部' },
      avatar: '/images/about/op-team.webp'
    },
    readTime: { vi: 'Đọc thêm', en: 'Read more', ja: 'もっと読む' },
    sections: []
  },
  {
    id: 'mv-card-4',
    category: 'case-study',
    badge: { vi: 'Case Study', en: 'Case Study', ja: 'ケーススタディ' },
    title: {
      vi: 'Triển khai phòng sạch cho dây chuyền mới',
      en: 'Cleanroom Implementation for New Lines',
      ja: '新規生産ライン向けクリーンルームの導入'
    },
    description: {
      vi: 'Kinh nghiệm thực tế từ dự án triển khai phòng sạch cho nhà máy sản xuất điện tử.',
      en: 'Field insights and rollout lessons from electronics fab construction.',
      ja: '電子工場のクリーンルーム導入プロジェクトの実践経験。'
    },
    date: '1.5k lượt xem',
    image: '/images/resources/autohtml/thumb15.png',
    author: {
      name: { vi: 'ULink Editorial', en: 'ULink Editorial', ja: 'ULink 編集部' },
      role: { vi: 'Ban biên tập', en: 'Editorial Board', ja: '編集部' },
      avatar: '/images/about/op-team.webp'
    },
    readTime: { vi: 'Đọc thêm', en: 'Read more', ja: 'もっと読む' },
    sections: [
      {
        id: 'sec-mv4-1',
        num: '1.',
        title: {
          vi: 'Lập kế hoạch và giai đoạn thiết kế thi công',
          en: 'Project Planning & Construction Design Phases',
          ja: 'プロジェクト計画および施工設計フェーズ'
        },
        content: {
          vi: 'Lập tiến độ thi công chi tiết từng hạng mục: Xây dựng cơ bản, lắp dựng vách panel, thi công đường ống HVAC và hoàn thiện bề mặt sàn.',
          en: 'Formulate detailed milestones: Civil works, panel erection, HVAC ducting installation, and specialized floor finishing.',
          ja: '詳細なマイルストーンを策定します：土木工事、パネルの設置、HVACダクトの設置、および専門的な床仕上げ。'
        }
      },
      {
        id: 'sec-mv4-2',
        num: '2.',
        title: {
          vi: 'Lắp đặt hệ thống HVAC, màng lọc HEPA và FFU',
          en: 'Installing HVAC, HEPA Filters & FFU Units',
          ja: 'HVAC、HEPAフィルター、FFUユニットの設置'
        },
        content: {
          vi: 'Thi công lắp đặt cụm quạt lọc FFU trên hệ trần T-grid, kết nối đường ống gió AHU và cân chỉnh van tiết lưu để đạt chênh áp thiết kế.',
          en: 'Mount FFU modules on ceiling T-grids, hook up AHU ducting, and balance dampers to achieve design differential pressure.',
          ja: '天井TグリッドにFFUモジュールを取り付け、AHUダクトを接続し、ダンパーを調整して設計差圧を達成します。'
        }
      },
      {
        id: 'sec-mv4-3',
        num: '3.',
        title: {
          vi: 'Chạy thử nghiệm (Commissioning) và đo đạc thông số',
          en: 'Commissioning & Environmental Parameter Testing',
          ja: '試運転（Commissioning）および環境パラメータの測定'
        },
        content: {
          vi: 'Vận hành thử nghiệm hệ thống trong 72 giờ liên tục. Tiến hành đo tốc độ gió, lưu lượng khí, độ chênh áp và nồng độ hạt bụi ban đầu.',
          en: 'Run continuous 72-hour system burn-in. Measure air velocity, airflow volumes, room differential pressure, and baseline particle counts.',
          ja: 'システムを72時間連続して試運転します。風速、風量、室差圧、および初期粒子数を測定します。'
        }
      },
      {
        id: 'sec-mv4-4',
        num: '4.',
        title: {
          vi: 'Nghiệm thu đánh giá đạt chuẩn (IQ/OQ/PQ)',
          en: 'Standard Validation & Sign-off (IQ/OQ/PQ)',
          ja: '標準バリデーションおよび承認（IQ/OQ/PQ）'
        },
        content: {
          vi: 'Nghiệm thu chính thức cấp chứng nhận ISO Class 6 cho dây chuyền sản xuất, sẵn sàng bàn giao cho nhà máy đưa vào hoạt động.',
          en: 'Final sign-off granting ISO Class 6 certification for the production line, fully ready for commercial handoff.',
          ja: '生産ラインにISOクラス6認証を付与する公式承認を行い、商業運用の引き渡しに完全に備えます。'
        }
      }
    ]
  },
  {
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
    sections: []
  },
  {
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
    sections: []
  },
  {
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
    sections: []
  }
];

// 3 Upcoming Events matching autohtml-project/index.html (thumb16.png - thumb18.png)
export const UPCOMING_EVENTS: ResourceItem[] = [
  {
    id: 'ev-001',
    category: 'event',
    badge: { vi: 'Workshop', en: 'Workshop', ja: 'ワークショップ' },
    title: {
      vi: 'Hội thảo công nghệ phòng sạch 2024',
      en: 'Cleanroom Technology Seminar 2024',
      ja: 'クリーンルーム技術セミナー 2024'
    },
    description: {
      vi: 'Sự kiện giao lưu và chia sẻ kiến thức chuyên ngành phòng sạch hàng đầu Việt Nam.',
      en: 'Leading cleanroom industry knowledge-sharing event in Vietnam.',
      ja: 'ベトナムをリードするクリーンルーム業界の知識共有イベント。'
    },
    date: '15/08/2024',
    image: '/images/resources/autohtml/thumb16.png',
    author: {
      name: { vi: 'ULink Events', en: 'ULink Events', ja: 'ULink イベント' },
      role: { vi: 'Ban tổ chức', en: 'Organizer', ja: '主催者' },
      avatar: '/images/about/op-team.webp'
    },
    readTime: { vi: 'Đăng ký ngay', en: 'Register now', ja: '今すぐ登録' },
    time: '09:00 - 17:00',
    location: {
      vi: 'Hà Nội',
      en: 'Hanoi',
      ja: 'ハノイ'
    },
    price: {
      vi: '500.000 VNĐ',
      en: '500,000 VND',
      ja: '500,000 VND'
    },
    sections: []
  },
  {
    id: 'ev-002',
    category: 'event',
    badge: { vi: 'Event', en: 'Event', ja: 'イベント' },
    title: {
      vi: 'Event: B2B Business Networking',
      en: 'Event: B2B Business Networking',
      ja: 'Event: B2B Business Networking'
    },
    description: {
      vi: 'Sự kiện kết nối doanh nghiệp B2B do ULink Industries tổ chức, tạo cơ hội hợp tác và mở rộng mạng lưới đối tác chiến lược.',
      en: 'B2B business networking event hosted by ULink Industries for expanding strategic partnerships.',
      ja: 'ULink Industriesが主催するB2Bビジネスネットワーキングイベント。'
    },
    date: '22/08/2024',
    image: '/images/resources/autohtml/thumb17.png',
    author: {
      name: { vi: 'ULink Events', en: 'ULink Events', ja: 'ULink イベント' },
      role: { vi: 'Ban tổ chức', en: 'Organizer', ja: '主催者' },
      avatar: '/images/about/op-team.webp'
    },
    readTime: { vi: 'Đăng ký ngay', en: 'Register now', ja: '今すぐ登録' },
    time: '08:30 - 12:00',
    location: {
      vi: 'GOM BISTRO - 2C Trần Thánh Tông, HBT, Hà Nội',
      en: 'GOM BISTRO - 2C Tran Thanh Tong, HBT, Hanoi',
      ja: 'GOM BISTRO - 2C Tran Thanh Tong, HBT, Hanoi'
    },
    price: {
      vi: '300.000 VNĐ',
      en: '300,000 VND',
      ja: '300,000 VND'
    },
    sections: []
  },
  {
    id: 'ev-003',
    category: 'event',
    badge: { vi: 'Online', en: 'Online', ja: 'オンライン' },
    title: {
      vi: 'Tọa đàm: Xu hướng công nghiệp 4.0',
      en: 'Seminar: Industry 4.0 Trends',
      ja: 'セミナー：インダストリー4.0のトレンド'
    },
    description: {
      vi: 'Cập nhật xu hướng và công nghệ mới nhất trong sản xuất công nghiệp hiện đại.',
      en: 'Latest trend updates and smart manufacturing technology in modern industry.',
      ja: '現代の産業製造における最新のトレンドと技術の更新。'
    },
    date: '05/09/2024',
    image: '/images/resources/autohtml/thumb18.png',
    author: {
      name: { vi: 'ULink Events', en: 'ULink Events', ja: 'ULink イベント' },
      role: { vi: 'Ban tổ chức', en: 'Organizer', ja: '主催者' },
      avatar: '/images/about/op-team.webp'
    },
    readTime: { vi: 'Đăng ký ngay', en: 'Register now', ja: '今すぐ登録' },
    time: '14:00 - 16:30',
    location: {
      vi: 'Đà Nẵng',
      en: 'Da Nang',
      ja: 'ダナン'
    },
    price: {
      vi: 'Miễn phí',
      en: 'Free',
      ja: '無料'
    },
    sections: []
  }
];

// Popular Articles (Sidebar)
export const POPULAR_ARTICLES = [
  {
    id: 'pop-1',
    number: '01',
    title: {
      vi: 'ISO 14644-1:2015 – Tiêu chuẩn phòng sạch mới nhất',
      en: 'ISO 14644-1:2015 – The Latest Cleanroom Standard',
      ja: 'ISO 14644-1:2015 – 最新のクリーンルーム規格'
    }
  },
  {
    id: 'pop-2',
    number: '02',
    title: {
      vi: 'Găng tay nitrile và latex: Loại nào phù hợp với bạn?',
      en: 'Nitrile vs Latex Gloves: Which is Right for You?',
      ja: 'ニトリル手袋対ラテックス手袋：どちらが適していますか？'
    }
  },
  {
    id: 'pop-3',
    number: '03',
    title: {
      vi: '5 yếu tố ảnh hưởng đến hiệu quả của phòng sạch',
      en: '5 Factors Affecting Cleanroom Efficiency',
      ja: 'クリーンルームの効率に影響を与える5つの要因'
    }
  },
  {
    id: 'pop-4',
    number: '04',
    title: {
      vi: 'Hướng dẫn lựa chọn vật liệu phòng sạch phù hợp',
      en: 'Guide to Selecting the Right Cleanroom Materials',
      ja: '適切なクリーンルーム資材の選択ガイド'
    }
  },
  {
    id: 'pop-5',
    number: '05',
    title: {
      vi: 'Xu thế công nghệ phòng sạch năm 2025',
      en: 'Cleanroom Technology Trends in 2025',
      ja: '2025年のクリーンルーム技術動向'
    }
  }
];
