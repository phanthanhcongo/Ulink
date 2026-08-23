import { FileText, BookOpen, ShieldCheck, Briefcase, Newspaper, CalendarDays } from 'lucide-react';
import { ResourceItem } from './types';

// Updated 6 Tabs configuration matching the screenshot
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

// 12 Mock Resources to display on the main grid (matching the screenshot layout)
export const MOCK_RESOURCES: ResourceItem[] = [
  {
    id: 'case-study-1',
    category: 'case-study',
    badge: { vi: 'Nghiên cứu điển hình', en: 'Case Study', ja: 'ケーススタディ' },
    title: { vi: 'DN Điện tử × ULink Nitrile', en: 'Electronics Enterprise × ULink Nitrile', ja: '電子部品企業 × ULink Nitrile' },
    description: { vi: 'Doanh nghiệp sản xuất linh kiện điện tử tại Bắc Ninh đã áp dụng tiêu chuẩn găng tay Nitrile của ULink, giảm 28% chi phí vật tư bảo hộ nhờ tối ưu độ dày, độ bền và quy trình kiểm định chất lượng.', en: 'Electronics factory in Bac Ninh saved 28% PPE cost by adopting ULink Nitrile glove standard, optimizing thickness and durability.', ja: 'バクニンの電子部品工場は、厚みと耐久性を最適化したULink Nitrile手袋規格を採用し、PPEコストを28%削減しました。' },
    date: '23/08/2026',
    image: '/images/home/section2/product-cut-gloves.webp',
    author: {
      name: { vi: 'Trần Thị Hồng Nhung', en: 'Tran Thi Hong Nhung', ja: 'Tran Thi Hong Nhung' },
      role: { vi: 'Giám đốc Sản xuất', en: 'Production Director', ja: '製造ディレクター' },
      avatar: '/images/regional_hubs/hub-2/QuangTran.png'
    },
    readTime: { vi: '6 phút đọc', en: '6 min read', ja: '6分' },
    sections: [
      {
        id: 'cs1-sec1',
        num: '1.',
        title: { vi: 'Thử thách & Bối cảnh', en: 'Challenges & Context', ja: '課題と背景' },
        content: { vi: 'Một nhà máy sản xuất bán dẫn và vi mạch lớn tại Bắc Ninh gặp khó khăn trong việc kiểm soát tỷ lệ lỗi sản phẩm do tĩnh điện (ESD) và bụi xơ từ găng tay cao su thông thường. Ngoài ra, hao phí găng tay quá lớn do găng dễ bị rách khi thao tác tiếp xúc với góc sắc cạnh của linh kiện.', en: 'A semiconductor factory in Bac Ninh faced issues with product defects from ESD and lint of standard gloves, plus high tear rates.', ja: 'バクニンの半導体工場は、標準手袋のESDと糸くずによる製品不良、および高い破れ率に直ement。' }
      },
      {
        id: 'cs1-sec2',
        num: '2.',
        title: { vi: 'Giải pháp từ ULink Industries', en: 'ULink Industries Solution', ja: 'ULink Industriesの解決策' },
        content: { vi: 'ULink cung cấp dòng găng tay Nitrile phòng sạch đạt chuẩn ISO Class 5, chống tĩnh điện bề mặt 10^6 - 10^9 Ohms, hoàn toàn không chứa bột và silicone. Chúng tôi hỗ trợ tư vấn độ dày tối ưu cho từng công đoạn lắp ráp.', en: 'ULink provided cleanroom Nitrile gloves with ISO Class 5 certification, surface resistivity of 10^6 - 10^9 Ohms, powder-free, and silicone-free.', ja: 'ULinkは、ISOクラス5認証、表面抵抗10^6-10^9Ω、パウダーフリー、シリコンフリーのクリーンルーム用ニトリル手袋を提供しました。' }
      },
      {
        id: 'cs1-sec3',
        num: '3.',
        title: { vi: 'Kết quả đạt được', en: 'Key Results', ja: '主な成果' },
        content: { vi: 'Tỷ lệ lỗi do ESD giảm 45%. Chi phí mua sắm vật tư bảo hộ giảm 28% hàng tháng nhờ tuổi thọ găng tay cao gấp 1.8 lần so với nhà cung cấp cũ.', en: 'ESD defects dropped by 45%. Monthly PPE costs decreased by 28% due to 1.8x longer lifespan than previous supplier.', ja: 'ESDによる不良が45%減少。前サプライヤーと比較して寿命が1.8倍に延びたため、月間PPEコストが28%削減されました。' }
      }
    ],
    aiSummary: {
      intro: { vi: 'Tóm tắt câu chuyện thành công lắp đặt quy chuẩn găng tay Nitrile phòng sạch tại nhà máy FDI Bắc Ninh.', en: 'Success story summary of installing cleanroom Nitrile gloves standard at a Bac Ninh FDI factory.', ja: 'バクニンのFDI工場におけるクリーンルーム用ニトリル手袋規格導入の成功事例の要約。' },
      bullets: [
        { vi: 'Giảm 28% chi phí mua sắm găng tay bảo hộ.', en: '28% reduction in protective glove purchasing costs.', ja: '保護手袋の購入コストを28%削減。' },
        { vi: 'Tỷ lệ lỗi sản xuất do phóng tĩnh điện giảm 45%.', en: '45% reduction in production defect rate caused by ESD.', ja: 'ESDによる製造不良率を45%削減。' }
      ]
    },
    audioDuration: '0',
    audioSecs: 0
  },
  {
    id: 'case-study-2',
    category: 'case-study',
    badge: { vi: 'Nghiên cứu điển hình', en: 'Case Study', ja: 'ケーススタディ' },
    title: { vi: 'Ứng dụng màng co PE', en: 'PE Shrink Film Application', ja: 'PEシュリンクフィルムの応用' },
    description: { vi: 'Màng co PE dùng đóng chai nước ngọt, bó chặt chai thành lốc hoặc thùng, đảm bảo ổn định vận chuyển và lưu kho. Co nhiệt đều, bền kéo cao, chống thủng vượt trội cho nhà máy đồ uống.', en: 'PE shrink film applied for bundling soft drink bottles into packs, ensuring transport stability and high puncture resistance.', ja: 'ソフトドリンクボトルのパック結束用PEシュリンクフィルム、輸送安定性と高い穿刺抵抗性を確保。' },
    date: '23/08/2026',
    image: '/images/home/section2/product-custom-pkg.webp',
    author: {
      name: { vi: 'Nguyễn Minh Tuấn', en: 'Nguyen Minh Tuan', ja: 'Nguyen Minh Tuan' },
      role: { vi: 'Trưởng phòng Đóng gói', en: 'Packaging Head', ja: '包装責任者' },
      avatar: '/images/regional_hubs/hub-2/KennyTran.png'
    },
    readTime: { vi: '5 phút đọc', en: '5 min read', ja: '5分' },
    sections: [
      {
        id: 'cs2-sec1',
        num: '1.',
        title: { vi: 'Yêu cầu từ Nhà máy Đồ uống', en: 'Beverage Factory Requirements', ja: '飲料工場の要件' },
        content: { vi: 'Khách hàng là nhà máy sản xuất nước ngọt lớn yêu cầu giải pháp đóng lốc màng co nhiệt tự động tốc độ cao. Màng co phải có tỷ lệ co rút đồng đều, không bị rách mép hay nhăn góc khi đi qua buồng co nhiệt.', en: 'A major beverage factory required high-speed automatic bundling shrink film solutions with even shrinkage and no tearing.', ja: '主要な飲料工場は、均一な収縮と破れのない高速自動結束シュリンクフィルムソリューションを必要としていました。' }
      },
      {
        id: 'cs2-sec2',
        num: '2.',
        title: { vi: 'Giải pháp Màng co PE nguyên sinh', en: 'Virgin PE Shrink Film Solution', ja: 'バージンPEシュリンクフィルム溶液' },
        content: { vi: 'ULink cung cấp màng co PE sản xuất từ hạt nhựa LDPE nguyên sinh nhập khẩu, tối ưu hóa độ dày 50-60 mic giúp màng có độ dai chịu lực kéo tốt và độ trong suốt cao.', en: 'ULink supplied virgin LDPE shrink film, optimizing thickness between 50-60 microns for high tensile strength and clarity.', ja: 'ULinkはバージンLDPEシュリンクフィルムを供給し、高い引張強度と透明度のために厚さを50-60ミクロンに最適化しました。' }
      },
      {
        id: 'cs2-sec3',
        num: '3.',
        title: { vi: 'Hiệu quả vận hành', en: 'Operational Performance', ja: '運用パフォーマンス' },
        content: { vi: 'Quy trình đóng gói tự động chạy liên tục không bị gián đoạn do đứt màng. Ngoại quan kiện lốc chai căng phẳng đẹp mắt, bảo vệ hoàn hảo trong suốt quá trình phân phối xe tải.', en: 'Automatic packaging ran smoothly without film breakages, presenting a tight and clean pack appearance.', ja: 'フィルム切れによる停止がなく自動包装がスムーズに行われ、引き締まった清潔なパック外観を提供しました。' }
      }
    ],
    aiSummary: {
      intro: { vi: 'Phân tích ứng dụng thành công màng co PE nguyên sinh tại dây chuyền đóng chai nước ngọt.', en: 'Case analysis of successfully utilizing virgin PE shrink film in soft drink bottling lines.', ja: 'ソフトドリンクボトル詰めラインにおけるバージンPEシュリンクフィルムの導入成功事例の分析。' },
      bullets: [
        { vi: 'Độ dày tối ưu giúp tiết kiệm 12% nguyên liệu.', en: 'Optimized thickness saved 12% raw material.', ja: '最適化された厚みにより、原材料を12%削減。' },
        { vi: 'Tỷ lệ lỗi đóng lốc tại buồng nhiệt giảm xuống dưới 0.1%.', en: 'Shrink tunnel error rate dropped below 0.1%.', ja: 'シュリンクトンネルの不良率が0.1%未満に低下。' }
      ]
    },
    audioDuration: '0',
    audioSecs: 0
  },
  {
    id: 'case-study-3',
    category: 'case-study',
    badge: { vi: 'Nghiên cứu điển hình', en: 'Case Study', ja: 'ケーススタディ' },
    title: { vi: 'Giải pháp cho HVAC', en: 'Solutions for HVAC System', ja: 'HVACシステム向けソリューション' },
    description: { vi: 'Băng keo nhôm ULink Industries dùng để bọc kín mối nối ống HVAC tại Nhà máy In Hải Quân, đảm bảo kín khít, chống thất thoát nhiệt và rò rỉ khí, nâng cao hiệu suất làm lạnh.', en: 'ULink aluminum foil tape applied to seal HVAC pipe joints at Navy Printing Factory, preventing heat loss and air leaks.', ja: '海軍印刷工場のHVAC配管継手シールにULinkアルミホイルテープを適用し、熱損失と空気漏れを防止。' },
    date: '23/08/2026',
    image: '/images/home/section2/product-hvac-tape.webp',
    author: {
      name: { vi: 'Phạm Thị Mai Lan', en: 'Pham Thi Mai Lan', ja: 'Pham Thi Mai Lan' },
      role: { vi: 'Biên tập viên Kỹ thuật', en: 'Technical Editor', ja: '技術編集者' },
      avatar: '/images/regional_hubs/hub-2/MinhHung.png'
    },
    readTime: { vi: '4 phút đọc', en: '4 min read', ja: '4分' },
    sections: [
      {
        id: 'cs3-sec1',
        num: '1.',
        title: { vi: 'Bảo ôn hệ thống ống gió công nghiệp', en: 'Industrial Duct System Insulation', ja: '産業用ダクトシステムの断熱' },
        content: { vi: 'Nhà máy In Hải Quân vận hành hệ thống máy điều hòa không khí và thông gió trung tâm công suất lớn. Việc rò rỉ nhiệt tại các mối nối khớp ống gió kim loại gây lãng phí điện năng nghiêm trọng và đọng nước bề mặt ống.', en: 'Navy Printing Factory operated a large HVAC system where joints leaked thermal energy and caused water condensation.', ja: '海軍印刷工場は大型HVACシステムを運用していましたが、ダクト継手での熱漏れ và 結露が発生していました。' }
      },
      {
        id: 'cs3-sec2',
        num: '2.',
        title: { vi: 'Băng keo nhôm ULink chịu lực & nhiệt', en: 'ULink High-Temp Aluminum Tape', ja: 'ULink耐熱アルミテープ' },
        content: { vi: 'ULink cung cấp giải pháp băng keo nhôm có lớp keo Acrylic bám dính siêu mạnh, lớp nhôm dày dặn cản nhiệt tốt, chống cháy và hoạt động bền bỉ trong dải nhiệt độ rộng.', en: 'ULink provided high-grade aluminum tape with strong acrylic adhesive, thick foil for thermal barrier, and fire resistance.', ja: 'ULinkは、強力なアクリル粘着剤、遮熱用の厚いホイル、耐火性を備えた高品質のアルミテープを提供しました。' }
      },
      {
        id: 'cs3-sec3',
        num: '3.',
        title: { vi: 'Kết quả bọc bảo ôn', en: 'Insulation Results', ja: '断熱効果' },
        content: { vi: 'Loại bỏ hoàn toàn đọng sương bề mặt. Hệ thống HVAC đạt hiệu quả làm lạnh sâu nhanh hơn, tiết kiệm điện năng tiêu thụ thực tế hàng tháng của nhà máy lên tới 8.5%.', en: 'Completely eliminated condensation. HVAC reached temperature faster, saving 8.5% of monthly electricity bills.', ja: '結露を完全に解消。HVACの冷却効率が向上し、月間電気代を8.5%削減しました。' }
      }
    ],
    aiSummary: {
      intro: { vi: 'Đánh giá giải pháp bọc mối nối ống HVAC bằng băng keo nhôm chuyên dụng tại công trình công nghiệp.', en: 'Evaluation of sealing HVAC joints with specialized aluminum tape at an industrial site.', ja: '産業現場における専用アルミテープによるHVAC継手シールの評価。' },
      bullets: [
        { vi: 'Tiết kiệm 8.5% lượng điện tiêu thụ của hệ thống thông gió.', en: 'Saved 8.5% electricity consumption of the ventilation system.', ja: '換気システムの電気消費量を8.5%削減。' },
        { vi: 'Khắc phục triệt để đọng nước gây ẩm mốc nhà xưởng.', en: 'Completely fixed water dripping causing warehouse mold.', ja: '倉庫のカビの原因となる水滴を完全に修復。' }
      ]
    },
    audioDuration: '0',
    audioSecs: 0
  },
  {
    id: 'case-study-4',
    category: 'case-study',
    badge: { vi: 'Nghiên cứu điển hình', en: 'Case Study', ja: 'ケーススタディ' },
    title: { vi: 'Máy quấn màng Pallet', en: 'Pallet Wrapping Machine System', ja: 'パレットストレッチ包装機' },
    description: { vi: 'Ứng dụng giám sát và tối ưu hóa hiệu suất máy quấn màng pallet theo thời gian thực, giúp giảm lãng phí vật liệu, tăng năng suất vận hành và đảm bảo an toàn kiện hàng.', en: 'Monitoring and optimizing pallet wrapping machine efficiency in real-time, reducing material waste and securing loads.', ja: 'パレット包装機の効率をリアルタイムで監視・最適化し、資材の廃棄を削減し荷崩れを防止。' },
    date: '23/08/2026',
    image: '/images/home/section2/solution-packaging.webp',
    author: {
      name: { vi: 'Lê Quốc Hưng', en: 'Le Quoc Hung', ja: 'Le Quoc Hung' },
      role: { vi: 'Quản lý Kho vận', en: 'Warehouse Manager', ja: '倉庫マネージャー' },
      avatar: '/images/regional_hubs/hub-2/HaiNguyen.png'
    },
    readTime: { vi: '6 phút đọc', en: '6 min read', ja: '6分' },
    sections: [
      {
        id: 'cs4-sec1',
        num: '1.',
        title: { vi: 'Tối ưu hóa khâu quấn màng xuất khẩu', en: 'Optimizing Export Pallet Wrapping', ja: '輸出パレット包装の最適化' },
        content: { vi: 'Doanh nghiệp kho vận thường quấn màng thủ công dẫn đến độ căng không đồng đều, tốn thời gian và lãng phí màng PE. Hàng hóa khi xuất khẩu đường biển xa dễ bị xô lệch, đổ ngã làm hư hại sản phẩm.', en: 'Manual wrapping caused uneven tension, wasted time, and poor stability, risking load collapses during sea transit.', ja: '手動包装では張力が不均一になり、時間がかかり安定性が低いため、海上輸送中に荷崩れするリスクがありました。' }
      },
      {
        id: 'cs4-sec2',
        num: '2.',
        title: { vi: 'Hệ thống Máy quấn màng tự động ULink', en: 'ULink Auto Wrapping Machine Solution', ja: 'ULink自動ストレッチ包装機' },
        content: { vi: 'ULink cung cấp giải pháp máy quấn màng pallet tự động trang bị bộ căng màng điện từ (pre-stretch) tỷ lệ lên tới 250%, giúp kéo dãn màng tối đa và lực quấn giữ đồng đều.', en: 'ULink provided automatic wrappers with electromagnetic pre-stretch up to 250%, maximizing stretch and holding force.', ja: 'ULinkは、最大250%の電磁プレストレッチを備えた自動包装機を提供し, ストレッチと保持力を最大化しました。' }
      },
      {
        id: 'cs4-sec3',
        num: '3.',
        title: { vi: 'Tiết giảm chi phí vật liệu', en: 'Material Cost Reduction', ja: '資材コストの削減' },
        content: { vi: 'Lượng màng PE sử dụng giảm 40% cho mỗi pallet hàng. Tốc độ quấn nhanh gấp 3 lần so với nhân viên quấn thủ công, loại bỏ hoàn toàn rủi ro hư hỏng xô lệch kiện hàng khi xuất khẩu.', en: 'PE film consumption per pallet reduced by 40%. Wrapping speed increased by 3x, completely eliminating load damage.', ja: 'パレットあたりのフィルム消費量を40%削減。包装速度が3倍に向上し、荷崩れによる破損リスクを解消。' }
      }
    ],
    aiSummary: {
      intro: { vi: 'Khảo sát hiệu quả của máy quấn màng pallet tự động tích hợp công nghệ căng trước trong khâu đóng gói logistics.', en: 'Performance review of automatic pallet wrapping machines with pre-stretch technology in logistics packaging.', ja: '物流包装におけるプレストレッチ技術を搭載した自動パレット包装機の性能レビュー。' },
      bullets: [
        { vi: 'Tiết kiệm 40% chi phí màng co PE đóng gói.', en: 'Saved 40% of packaging PE shrink film costs.', ja: '梱包用PEシュリンクフィルムのコストを40%削減。' },
        { vi: 'Tốc độ đóng gói xuất khẩu tăng 300%.', en: 'Export packaging speed increased by 300%.', ja: '輸出梱包スピードが300%向上。' }
      ]
    },
    audioDuration: '0',
    audioSecs: 0
  },
  {
    id: 'RES-001',
    category: 'guide',
    badge: {
      vi: 'Hướng dẫn kỹ thuật',
      en: 'Technical Guide',
      ja: '技術ガイド'
    },
    title: {
      vi: 'Tầm quan trọng của phòng sạch trong sản xuất bán dẫn hiện đại',
      en: 'The Importance of Cleanrooms in Modern Semiconductor Manufacturing',
      ja: '現代の半導体製造におけるクリーンルームの重要性'
    },
    description: {
      vi: 'Tìm hiểu vì sao kiểm soát độ bụi, nhiệt độ và độ ẩm đóng vai trò quyết định đến hiệu suất và chất lượng của sản phẩm bán dẫn.',
      en: 'Learn why controlling dust, temperature, and humidity plays a decisive role in the yield and quality of semiconductor products.',
      ja: 'チリ、温度、湿度の制御が半導体製品의 歩留まりと品質に決定的な役割を果たす理由を学びます。'
    },
    date: '19/08/2026',
    image: '/images/resources/news/cleanroom-technician.webp',
    author: {
      name: { vi: 'Minh Thuận Lê', en: 'Minh Thuan Le', ja: 'Minh Thuan Le' },
      role: { vi: 'Ban biên tập ULink', en: 'ULink Editorial Board', ja: 'ULink編集部' },
      avatar: '/images/about/op-team.webp'
    },
    readTime: { vi: '5 phút đọc', en: '5 min read', ja: '5分で読める' },
    sections: [
      {
        id: 'sec-1',
        num: '1.',
        title: {
          vi: 'Phòng sạch là gì?',
          en: 'What is a Cleanroom?',
          ja: 'クリーンルームとは？'
        },
        content: {
          vi: 'Phòng sạch (Cleanroom) là một môi trường được kiểm soát nghiêm ngặt về mật độ các hạt bụi lơ lửng trong không khí, nhiệt độ, độ ẩm và áp suất. Mức độ sạch được phân loại theo các tiêu chuẩn quốc tế như ISO 14644, trong đó xác định số lượng hạt bụi tối đa trên mỗi mét khối không khí cho phép theo từng cấp độ.',
          en: 'A cleanroom is an environment with controlled level of contamination that is specified by the number of particles per cubic meter at a specified particle size. Standard classifications like ISO 14644 determine the maximum allowable concentration of particles per cubic meter for each cleanroom class.',
          ja: 'クリーンルームとは、空気中に浮遊する微粒子の濃度が一定の基準以下に管理され、必要に応じて温度、湿度、圧力が制御された部屋のことです。ISO 14644などの国際規格により、各クラスで許容される微粒子の最大濃度が定められています。'
        }
      },
      {
        id: 'sec-2',
        num: '2.',
        title: {
          vi: 'Quy chuẩn trong sản xuất bán dẫn',
          en: 'Standards in Semiconductor Manufacturing',
          ja: '半導体製造における規格'
        },
        content: {
          vi: 'Trong công nghiệp bán dẫn, các bóng bán dẫn (transistor) có kích thước chỉ vài nanomet, nhạy cảm với bất kỳ hạt bụi siêu mịn nào. Quy chuẩn phòng sạch tại đây thường đạt cấp độ Class 10 (ISO 4) hoặc Class 1 (ISO 3). Bất kỳ sự xuất hiện nào của hạt bụi cơ học dù nhỏ nhất cũng có thể làm đứt gãy mạch hoặc gây đoản mạch, dẫn đến hỏng chip hoàn toàn.',
          en: 'In semiconductor fabrication, transistors measure only a few nanometers, making them extremely vulnerable to any ultra-fine dust. Cleanrooms in this industry typically reach Class 10 (ISO 4) or Class 1 (ISO 3). The slightest presence of even a single mechanical particle can sever microcircuits or cause short circuits, ruining the entire silicon wafer.',
          ja: '半導体製造では、トランジスタのサイズが数ナノメートルしかなく、極小の塵埃に対しても極めて敏感です。このため、半導体クリーンルームの規格は通常、クラス10（ISO 4）またはクラス1（ISO 3）に達します。ごく微細なチリが1つ存在するだけでも、回路の断線や短絡を引き起こし、シリコンウェーハ全体を台無しにする可能性があります。'
        }
      },
      {
        id: 'sec-3',
        num: '3.',
        title: {
          vi: 'Các thành phần phòng sạch',
          en: 'Cleanroom Core Components',
          ja: 'クリーンルームの主な構成要素'
        },
        content: {
          vi: 'Hệ thống phòng sạch hoàn chỉnh được xây dựng từ nhiều thành phần khép kín phối hợp chặt chẽ:\n- Hệ thống lọc khí HEPA/ULPA: Lọc sạch hạt bụi mịn với hiệu suất lên tới 99.999%.\n- Trang phục bảo hộ phòng sạch PPE: Quần áo liền quần chống tĩnh điện, găng tay nitrile không bột, mũ trùm và khẩu trang chuyên dụng ngăn phát tán xơ vải và tế bào cơ thể người.\n- Thảm dính bụi phòng sạch (Sticky Mats): Đặt tại các cửa ra vào để loại bỏ cát bụi dưới đế giày trước khi bước vào khu vực sạch.',
          en: 'A complete cleanroom system is built from several integrated components working together:\n- HEPA/ULPA Filtration: Filters out fine dust particles with efficiency up to 99.999%.\n- Cleanroom Wear (PPE): Antistatic coveralls, powder-free nitrile gloves, hoods, and specialized masks preventing shedding of human skin cells or fibers.\n- Sticky Mats: Placed at entryways to pull dust and particles off the soles of shoes before entering the clean zone.',
          ja: '完全なクリーンルームシステムは、相互に連携するいくつかの統合コンポーネントから構成されています。\n- HEPA/ULPAフィルター：最大99.999％の効率で微細な塵埃をろ過します。\n- クリーンルームウェア（PPE）：人体からの角質細胞や繊維の脱落を防ぐ、帯電防止カバーオール、パウダーフリーのニトリル手袋、フード、専用マスク。\n- 粘着マット：クリーンゾーンに入る前に、靴底のチリや粒子を取り除くために出入り口に設置されます。'
        }
      },
      {
        id: 'sec-4',
        num: '4.',
        title: {
          vi: 'Kết luận thiết kế',
          en: 'Design Conclusions',
          ja: '設計の結論'
        },
        content: {
          vi: 'Thiết kế phòng sạch tối ưu là sự kết hợp đồng bộ giữa trang thiết bị lọc khí cao cấp và quy trình vận hành nghiêm chỉnh của công nhân. Việc đầu tư hệ thống vật tư bảo hộ phòng sạch chất lượng cao là nền tảng tối quan trọng giúp đảm bảo tỷ lệ lỗi sản phẩm bán dẫn ở mức thấp nhất, tối ưu năng suất và lợi nhuận cho doanh nghiệp.',
          en: 'Optimal cleanroom design is a synchronized combination of premium air filtration equipment and strict operational procedures for workers. Investing in high-quality cleanroom protective supplies is the crucial foundation to keep semiconductor defect rates at a minimum, optimizing yield and corporate profitability.',
          ja: '最適なクリーンルーム設計は、高性能な空気ろ過設備と、作業員の厳格な運用の組み合わせによって実現します。高品質なクリーンルーム保護用品への投資は、半導体の不良率を最小限 ở 抑え、歩留まりと企業の収益性を最適化するための極めて重要な基礎となります。'
        }
      }
    ],
    aiSummary: {
      intro: {
        vi: 'Bài viết cung cấp cái nhìn toàn diện về phòng sạch bán dẫn - chìa khóa đảm bảo năng suất sản xuất linh kiện điện tử siêu nhỏ.',
        en: 'The article provides a comprehensive view of semiconductor cleanrooms - the key to ensuring manufacturing yields of micro-components.',
        ja: 'この記事は、極小部品の製造歩留まりを確保する鍵である半導体クリーンルームの包括的なビューを提供します。'
      },
      bullets: [
        {
          vi: 'Phòng sạch bán dẫn đòi hỏi cấp độ Class 10 (ISO 4) hoặc cao hơn do kích thước linh kiện siêu nhỏ.',
          en: 'Semiconductor cleanrooms require Class 10 (ISO 4) or higher due to micro-sized components.',
          ja: '半導体クリーンルームは、極小部品のためクラス10（ISO 4）以上が必要です。'
        },
        {
          vi: 'Hệ thống lọc khí HEPA/ULPA và trang phục PPE chống tĩnh điện là bắt buộc để ngăn hạt bụi và tĩnh điện phóng ra.',
          en: 'HEPA/ULPA filtration and ESD PPE are mandatory to prevent dust particles and electrostatic discharge.',
          ja: '塵埃粒子と静電気放電を防ぐため、HEPA/ULPAフィルターとESD対応の防護服（PPE）が必須です。'
        },
        {
          vi: 'Đầu tư vật tư phòng sạch chất lượng là giải pháp cốt lõi để hạ thấp tỷ lệ lỗi sản phẩm chip.',
          en: 'Investing in quality cleanroom supplies is the core solution to reduce chip defect rates.',
          ja: '高品質なクリーンルーム用品への投資は、チップの不良率を低減するためのコアソリューションです。'
        }
      ]
    },
    audioDuration: '03:45',
    audioSecs: 225,
    size: '1.2 MB',
    type: 'PDF',
    downloadUrl: '/documents/lien-he-nha-phat-trien.pdf'
  },
  {
    id: 'RES-002',
    category: 'guide',
    badge: {
      vi: 'Hướng dẫn kỹ thuật',
      en: 'Hướng dẫn kỹ thuật',
      ja: 'Hướng dẫn kỹ thuật'
    },
    title: {
      vi: 'Hướng dẫn lựa chọn vật tư phòng sạch',
      en: 'Hướng dẫn lựa chọn vật tư phòng sạch',
      ja: 'Hướng dẫn lựa chọn vật tư phòng sạch'
    },
    description: {
      vi: 'Tiêu chí quan trọng khi lựa chọn vật tư đạt chuẩn cho môi trường sản xuất sạch.',
      en: 'Tiêu chí quan trọng khi lựa chọn vật tư đạt chuẩn cho môi trường sản xuất sạch.',
      ja: 'Tiêu chí quan trọng khi lựa chọn vật tư đạt chuẩn cho môi trường sản xuất sạch.'
    },
    date: 'Tháng 11, 2024',
    image: '/images/resources/news/lab-equipment.webp',
    author: {
      name: { vi: 'ULink', en: 'ULink', ja: 'ULink' },
      role: { vi: 'Ban biên tập', en: 'Editorial Board', ja: 'Ban biên tập' },
      avatar: '/images/about/op-team.webp'
    },
    readTime: { vi: '6 phút đọc', en: '6 phút đọc', ja: '6 phút đọc' },
    sections: [],
    aiSummary: { intro: { vi: '', en: '', ja: '' }, bullets: [] },
    audioDuration: '0',
    audioSecs: 0,
    size: '1.2 MB',
    type: 'PDF',
    downloadUrl: '/documents/lien-he-nha-phat-trien.pdf'
  },
  {
    id: 'RES-003',
    category: 'guide',
    badge: {
      vi: 'Infographic',
      en: 'Infographic',
      ja: 'Infographic'
    },
    title: {
      vi: 'Kiến thức về hệ thống HVAC',
      en: 'Kiến thức về hệ thống HVAC',
      ja: 'Kiến thức về hệ thống HVAC'
    },
    description: {
      vi: 'Tổng quan về hệ thống điều hòa không khí và thông gió trong công nghiệp.',
      en: 'Tổng quan về hệ thống điều hòa không khí và thông gió trong công nghiệp.',
      ja: 'Tổng quan về hệ thống điều hòa không khí và thông gió trong công nghiệp.'
    },
    date: 'Tháng 11, 2024',
    image: '/images/resources/news/hvac-system.webp',
    author: {
      name: { vi: 'ULink', en: 'ULink', ja: 'ULink' },
      role: { vi: 'Ban biên tập', en: 'Editorial Board', ja: 'Ban biên tập' },
      avatar: '/images/about/op-team.webp'
    },
    readTime: { vi: '4 phút đọc', en: '4 phút đọc', ja: '4 phút đọc' },
    sections: [],
    aiSummary: { intro: { vi: '', en: '', ja: '' }, bullets: [] },
    audioDuration: '0',
    audioSecs: 0,
    size: '1.2 MB',
    type: 'PDF',
    downloadUrl: '/documents/lien-he-nha-phat-trien.pdf'
  },
  {
    id: 'RES-004',
    category: 'standard',
    badge: {
      vi: 'Tiêu chuẩn',
      en: 'Tiêu chuẩn',
      ja: 'Tiêu chuẩn'
    },
    title: {
      vi: 'Quy trình vận hành phòng sạch',
      en: 'Quy trình vận hành phòng sạch',
      ja: 'Quy trình vận hành phòng sạch'
    },
    description: {
      vi: 'Quy trình chuẩn hóa cho vận hành môi trường phòng sạch hiệu quả và an toàn.',
      en: 'Quy trình chuẩn hóa cho vận hành môi trường phòng sạch hiệu quả và an toàn.',
      ja: 'Quy trình chuẩn hóa cho vận hành môi trường phòng sạch hiệu quả và an toàn.'
    },
    date: 'Tháng 10, 2024',
    image: '/images/resources/news/cleanroom-workers.webp',
    author: {
      name: { vi: 'ULink', en: 'ULink', ja: 'ULink' },
      role: { vi: 'Ban biên tập', en: 'Editorial Board', ja: 'Ban biên tập' },
      avatar: '/images/about/op-team.webp'
    },
    readTime: { vi: '7 phút đọc', en: '7 phút đọc', ja: '7 phút đọc' },
    sections: [],
    aiSummary: { intro: { vi: '', en: '', ja: '' }, bullets: [] },
    audioDuration: '0',
    audioSecs: 0,
    size: '1.2 MB',
    type: 'PDF',
    downloadUrl: '/documents/lien-he-nha-phat-trien.pdf'
  },
  {
    id: 'RES-005',
    category: 'case-study',
    badge: {
      vi: 'Case Study',
      en: 'Case Study',
      ja: 'Case Study'
    },
    title: {
      vi: 'Nhà máy Samsung Việt Nam',
      en: 'Nhà máy Samsung Việt Nam',
      ja: 'Nhà máy Samsung Việt Nam'
    },
    description: {
      vi: 'Triển khai hệ thống vật tư phòng sạch cho dây chuyền sản xuất chip bán dẫn.',
      en: 'Triển khai hệ thống vật tư phòng sạch cho dây chuyền sản xuất chip bán dẫn.',
      ja: 'Triển khai hệ thống vật tư phòng sạch cho dây chuyền sản xuất chip bán dẫn.'
    },
    date: 'Tháng 10, 2024',
    image: '/images/resources/news/semiconductor-assembly.webp',
    author: {
      name: { vi: 'ULink', en: 'ULink', ja: 'ULink' },
      role: { vi: 'Ban biên tập', en: 'Editorial Board', ja: 'Ban biên tập' },
      avatar: '/images/about/op-team.webp'
    },
    readTime: { vi: '8 phút đọc', en: '8 phút đọc', ja: '8 phút đọc' },
    sections: [],
    aiSummary: { intro: { vi: '', en: '', ja: '' }, bullets: [] },
    audioDuration: '0',
    audioSecs: 0,
    size: '1.2 MB',
    type: 'PDF',
    downloadUrl: '/documents/lien-he-nha-phat-trien.pdf'
  },
  {
    id: 'RES-006',
    category: 'guide',
    badge: {
      vi: 'Infographic',
      en: 'Infographic',
      ja: 'Infographic'
    },
    title: {
      vi: 'Bảo hộ lao động trong công nghiệp',
      en: 'Bảo hộ lao động trong công nghiệp',
      ja: 'Bảo hộ lao động trong công nghiệp'
    },
    description: {
      vi: 'Danh mục thiết bị bảo hộ cá nhân theo chuẩn an toàn lao động quốc tế.',
      en: 'Danh mục thiết bị bảo hộ cá nhân theo chuẩn an toàn lao động quốc tế.',
      ja: 'Danh mục thiết bị bảo hộ cá nhân theo chuẩn an toàn lao động quốc tế.'
    },
    date: 'Tháng 10, 2024',
    image: '/images/resources/news/safety-equipment.webp',
    author: {
      name: { vi: 'ULink', en: 'ULink', ja: 'ULink' },
      role: { vi: 'Ban biên tập', en: 'Editorial Board', ja: 'Ban biên tập' },
      avatar: '/images/about/op-team.webp'
    },
    readTime: { vi: '5 phút đọc', en: '5 phút đọc', ja: '5 phút đọc' },
    sections: [],
    aiSummary: { intro: { vi: '', en: '', ja: '' }, bullets: [] },
    audioDuration: '0',
    audioSecs: 0,
    size: '1.2 MB',
    type: 'PDF',
    downloadUrl: '/documents/lien-he-nha-phat-trien.pdf'
  },
  {
    id: 'RES-007',
    category: 'news',
    badge: {
      vi: 'Data Room',
      en: 'Data Room',
      ja: 'Data Room'
    },
    title: {
      vi: 'Thiết bị đo lường và kiểm soát',
      en: 'Thiết bị đo lường và kiểm soát',
      ja: 'Thiết bị đo lường và kiểm soát'
    },
    description: {
      vi: 'Tổng hợp thông số kỹ thuật và ứng dụng các thiết bị đo lường trong sản xuất.',
      en: 'Tổng hợp thông số kỹ thuật và ứng dụng các thiết bị đo lường trong sản xuất.',
      ja: 'Tổng hợp thông số kỹ thuật và ứng dụng các thiết bị đo lường trong sản xuất.'
    },
    date: 'Tháng 9, 2024',
    image: '/images/resources/news/measurement-instruments.webp',
    author: {
      name: { vi: 'ULink', en: 'ULink', ja: 'ULink' },
      role: { vi: 'Ban biên tập', en: 'Editorial Board', ja: 'Ban biên tập' },
      avatar: '/images/about/op-team.webp'
    },
    readTime: { vi: '8 phút đọc', en: '8 phút đọc', ja: '8 phút đọc' },
    sections: [],
    aiSummary: { intro: { vi: '', en: '', ja: '' }, bullets: [] },
    audioDuration: '0',
    audioSecs: 0,
    size: '1.2 MB',
    type: 'PDF',
    downloadUrl: '/documents/lien-he-nha-phat-trien.pdf'
  },
  {
    id: 'RES-008',
    category: 'guide',
    badge: {
      vi: 'E-books',
      en: 'E-books',
      ja: 'E-books'
    },
    title: {
      vi: 'Tiêu chuẩn GMP trong dược phẩm',
      en: 'Tiêu chuẩn GMP trong dược phẩm',
      ja: 'Tiêu chuẩn GMP trong dược phẩm'
    },
    description: {
      vi: 'Hướng dẫn thực hành sản xuất tốt cho ngành dược phẩm và y tế.',
      en: 'Hướng dẫn thực hành sản xuất tốt cho ngành dược phẩm và y tế.',
      ja: 'Hướng dẫn thực hành sản xuất tốt cho ngành dược phẩm và y tế.'
    },
    date: 'Tháng 9, 2024',
    image: '/images/resources/news/gmp-facility.webp',
    author: {
      name: { vi: 'ULink', en: 'ULink', ja: 'ULink' },
      role: { vi: 'Ban biên tập', en: 'Editorial Board', ja: 'Ban biên tập' },
      avatar: '/images/about/op-team.webp'
    },
    readTime: { vi: '12 phút đọc', en: '12 phút đọc', ja: '12 phút đọc' },
    sections: [],
    aiSummary: { intro: { vi: '', en: '', ja: '' }, bullets: [] },
    audioDuration: '0',
    audioSecs: 0,
    size: '1.2 MB',
    type: 'PDF',
    downloadUrl: '/documents/lien-he-nha-phat-trien.pdf'
  },
  {
    id: 'RES-009',
    category: 'case-study',
    badge: {
      vi: 'Case Study',
      en: 'Case Study',
      ja: 'Case Study'
    },
    title: {
      vi: 'An toàn hóa chất công nghiệp',
      en: 'An toàn hóa chất công nghiệp',
      ja: 'An toàn hóa chất công nghiệp'
    },
    description: {
      vi: 'Quy trình và quy định xử lý an toàn hóa chất trong môi trường công nghiệp.',
      en: 'Quy trình và quy định xử lý an toàn hóa chất trong môi trường công nghiệp.',
      ja: 'Quy trình và quy định xử lý an toàn hóa chất trong môi trường công nghiệp.'
    },
    date: 'Tháng 9, 2024',
    image: '/images/resources/news/chemical-handling.webp',
    author: {
      name: { vi: 'ULink', en: 'ULink', ja: 'ULink' },
      role: { vi: 'Ban biên tập', en: 'Editorial Board', ja: 'Ban biên tập' },
      avatar: '/images/about/op-team.webp'
    },
    readTime: { vi: '9 phút đọc', en: '9 phút đọc', ja: '9 phút đọc' },
    sections: [],
    aiSummary: { intro: { vi: '', en: '', ja: '' }, bullets: [] },
    audioDuration: '0',
    audioSecs: 0,
    size: '1.2 MB',
    type: 'PDF',
    downloadUrl: '/documents/lien-he-nha-phat-trien.pdf'
  },
  {
    id: 'RES-010',
    category: 'guide',
    badge: {
      vi: 'Infographic',
      en: 'Infographic',
      ja: 'Infographic'
    },
    title: {
      vi: 'Hệ thống lọc khí công nghiệp',
      en: 'Hệ thống lọc khí công nghiệp',
      ja: 'Hệ thống lọc khí công nghiệp'
    },
    description: {
      vi: 'So sánh và phân tích các công nghệ lọc khí hiện đại trong sản xuất công nghiệp.',
      en: 'So sánh và phân tích các công nghệ lọc khí hiện đại trong sản xuất công nghiệp.',
      ja: 'So sánh và phân tích các công nghệ lọc khí hiện đại trong sản xuất công nghiệp.'
    },
    date: 'Tháng 8, 2024',
    image: '/images/resources/news/air-filtration.webp',
    author: {
      name: { vi: 'ULink', en: 'ULink', ja: 'ULink' },
      role: { vi: 'Ban biên tập', en: 'Editorial Board', ja: 'Ban biên tập' },
      avatar: '/images/about/op-team.webp'
    },
    readTime: { vi: '7 phút đọc', en: '7 phút đọc', ja: '7 phút đọc' },
    sections: [],
    aiSummary: { intro: { vi: '', en: '', ja: '' }, bullets: [] },
    audioDuration: '0',
    audioSecs: 0,
    size: '1.2 MB',
    type: 'PDF',
    downloadUrl: '/documents/lien-he-nha-phat-trien.pdf'
  },
  {
    id: 'RES-011',
    category: 'news',
    badge: {
      vi: 'Data Room',
      en: 'Data Room',
      ja: 'Data Room'
    },
    title: {
      vi: 'Báo cáo thị trường vật tư 2024',
      en: 'Báo cáo thị trường vật tư 2024',
      ja: 'Báo cáo thị trường vật tư 2024'
    },
    description: {
      vi: 'Phân tích xu hướng và dự báo thị trường vật tư công nghiệp Việt Nam năm 2024.',
      en: 'Phân tích xu hướng và dự báo thị trường vật tư công nghiệp Việt Nam năm 2024.',
      ja: 'Phân tích xu hướng và dự báo thị trường vật tư công nghiệp Việt Nam năm 2024.'
    },
    date: 'Tháng 8, 2024',
    image: '/images/resources/news/market-report.webp',
    author: {
      name: { vi: 'ULink', en: 'ULink', ja: 'ULink' },
      role: { vi: 'Ban biên tập', en: 'Editorial Board', ja: 'Ban biên tập' },
      avatar: '/images/about/op-team.webp'
    },
    readTime: { vi: '10 phút đọc', en: '10 phút đọc', ja: '10 phút đọc' },
    sections: [],
    aiSummary: { intro: { vi: '', en: '', ja: '' }, bullets: [] },
    audioDuration: '0',
    audioSecs: 0,
    size: '1.2 MB',
    type: 'PDF',
    downloadUrl: '/documents/lien-he-nha-phat-trien.pdf'
  },
    {
    id: 'RES-012',
    category: 'event',
    badge: {
      vi: 'Workshop',
      en: 'Workshop',
      ja: 'Workshop'
    },
    title: {
      vi: 'Hội thảo công nghệ phòng sạch 2024',
      en: 'Cleanroom Technology Seminar 2024',
      ja: 'クリーンルーム技術セミナー 2024'
    },
    description: {
      vi: 'Sự kiện giao lưu và chia sẻ kiến thức chuyên ngành phòng sạch hàng đầu Việt Nam.',
      en: 'Sự kiện giao lưu và chia sẻ kiến thức chuyên ngành phòng sạch hàng đầu Việt Nam.',
      ja: 'Sự kiện giao lưu và chia sẻ kiến thức chuyên ngành phòng sạch hàng đầu Việt Nam.'
    },
    date: '15/08/2024',
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
    image: '/images/resources/events/conference-hall.webp',
    author: {
      name: { vi: 'ULink', en: 'ULink', ja: 'ULink' },
      role: { vi: 'Ban biên tập', en: 'Editorial Board', ja: 'Ban biên tập' },
      avatar: '/images/about/op-team.webp'
    },
    readTime: { vi: 'Đăng ký ngay', en: 'Register now', ja: 'Register now' },
    sections: [],
    aiSummary: { intro: { vi: '', en: '', ja: '' }, bullets: [] },
    audioDuration: '0',
    audioSecs: 0,
    size: '1.2 MB',
    type: 'PDF',
    downloadUrl: '/documents/lien-he-nha-phat-trien.pdf'
  }
];


export const MOST_VIEWED_ARTICLES: ResourceItem[] = [
  {
    id: 'MV-001',
    category: 'guide',
    badge: {
      vi: 'Hướng dẫn kỹ thuật',
      en: 'Technical Guide',
      ja: '技術ガイド'
    },
    title: {
      vi: 'Xu hướng phát triển vật liệu phòng sạch sinh học năm 2026',
      en: 'Trends in Biological Cleanroom Materials Development in 2026',
      ja: '2026年におけるバイオクリーンルーム資材開発の動向'
    },
    description: {
      vi: 'Phân tích các thế hệ vật liệu kháng khuẩn mới và ứng dụng trong phòng sạch y tế, dược phẩm.',
      en: 'Analysis of new antibacterial materials and their applications in medical and pharmaceutical cleanrooms.',
      ja: '医療および医薬品クリーンルームにおける新しい抗菌素材とその応用の analysis。'
    },
    date: 'Tháng 10, 2024',
    image: '/images/resources/news/gmp-facility.webp',
    author: {
      name: { vi: 'TS. Lê Mạnh Hùng', en: 'Dr. Hung Le', ja: 'TS. Lê Mạnh Hùng' },
      role: { vi: 'Chuyên gia vật liệu sinh học', en: 'Biomaterials Expert', ja: 'Chuyên gia vật liệu sinh học' },
      avatar: '/images/about/op-team.webp'
    },
    readTime: { vi: '6 phút đọc', en: '6 min read', ja: '6 min read' },
    audioDuration: '04:12',
    audioSecs: 252,
    size: '1.5 MB',
    type: 'PDF',
    downloadUrl: '/documents/lien-he-nha-phat-trien.pdf',
    sections: [
      {
        id: 'mv1-sec-1',
        num: '1.',
        title: {
          vi: 'Vật liệu tự khử khuẩn',
          en: 'Self-disinfecting Materials',
          ja: '自己消毒素材'
        },
        content: {
          vi: 'Các nghiên cứu mới nhất năm 2026 tập trung vào tích hợp các hạt nano kháng khuẩn (như nano bạc hoặc titan dioxit) trực tiếp vào cấu trúc bề mặt vật liệu tấm tường và sàn phòng sạch. Công nghệ này giúp ức chế liên tục sự phát triển của vi khuẩn và nấm mốc mà không phụ thuộc hoàn toàn vào hóa chất lau chùi.',
          en: 'The latest research in 2026 focuses on embedding antibacterial nanoparticles (like nano-silver or titanium dioxide) directly into the surface structure of cleanroom wall and floor panels. This technology continuously inhibits the growth of bacteria and fungi without relying solely on chemical cleaning agents.',
          ja: '2026年の最新研究では、クリーンルームの壁や床パネルの表面構造に抗菌ナノ粒子（ナノシルバーや二酸化チタンなど）を直接組み込むことに焦点を当てています。この技術は、化学洗浄剤のみに頼ることなく、細菌や真菌の増殖を継続的に抑制します。'
        }
      },
      {
        id: 'mv1-sec-2',
        num: '2.',
        title: {
          vi: 'Ứng dụng trong y tế',
          en: 'Medical Applications',
          ja: '医療への応用'
        },
        content: {
          vi: 'Trong phòng sạch y tế và phòng mổ vô trùng, các vật liệu polyme thông minh có khả năng tự phục hồi vết trầy xước siêu nhỏ đang được ứng dụng rộng rãi. Việc loại bỏ các khe hở siêu nhỏ giúp ngăn chặn hoàn toàn nơi ẩn nấp và phát triển của các bào tử vi sinh vật gây nhiễm trùng bệnh viện.',
          en: 'In medical cleanrooms and sterile operating theatres, smart polymer materials capable of self-healing micro-scratches are being widely applied. Eliminating microscopic crevices completely blocks nesting grounds where microbial spores could grow and cause hospital-acquired infections.',
          ja: '医療用クリーンルームや無菌手術室では、微細な傷を自己修復できるスマートポリマー素材が広く応用されています。微細な隙間を排除することで、微生物の胞子が繁殖して院内感染を引き起こす可能性のある温床を完全に遮断します。'
        }
      },
      {
        id: 'mv1-sec-3',
        num: '3.',
        title: {
          vi: 'Tiêu chuẩn vô trùng mới',
          en: 'New Sterility Standards',
          ja: '新しい無菌基準'
        },
        content: {
          vi: 'Quy chuẩn phòng sạch sinh học thế hệ mới đòi hỏi kiểm soát nghiêm ngặt không chỉ hạt bụi trơ mà cả các hạt vi sinh sống (viable particles). Các vật liệu mới phải vượt qua bài kiểm tra kháng hóa chất khử trùng mạnh (như Hydro peroxit hóa hơi - VHP) mà không bị biến tính hay xuống cấp bề mặt.',
          en: 'Next-generation biological cleanroom standards require strict control over both inert dust and viable biological particles. New materials must pass rigorous resistance tests against strong chemical sterilizers (such as vaporized hydrogen peroxide - VHP) without surface degradation.',
          ja: '次世代のバイオクリーンルーム規格では、不活性な塵埃と生きた生物粒子の両方を厳格に管理することが求められます。新しい資材は、表面の劣化を伴うことなく、強力な化学滅菌剤（過酸化水素ガス - VHPなど）に対する厳格な耐性試験に合格する必要があります。'
        }
      }
    ],
    aiSummary: {
      intro: {
        vi: 'Tóm tắt xu hướng phát triển vật liệu phòng sạch sinh học thế hệ mới với khả năng tự diệt khuẩn và chống ăn mòn hóa chất vượt trội.',
        en: 'Summary of next-generation biological cleanroom material trends featuring superior self-disinfection and chemical corrosion resistance.',
        ja: '優れた自己消毒機能と化学腐食耐性を備えた次世代バイオクリーンルーム資材のトレンドの要約。'
      },
      bullets: [
        {
          vi: 'Tích hợp công nghệ nano bạc giúp diệt khuẩn liên tục trên bề mặt phòng sạch.',
          en: 'Integrating nano-silver technology enables continuous sterilization on cleanroom surfaces.',
          ja: 'ナノシルバー技術の統合により、クリーンルーム表面の継続的な滅菌が可能になります。'
        },
        {
          vi: 'Polyme thông minh tự vá vết xước giúp loại bỏ nơi trú ẩn của vi sinh vật.',
          en: 'Smart self-healing polymers eliminate micro-crevices where microbes hide.',
          ja: 'スマート自己修復ポリマーにより、微生物が潜む微細な隙間が排除されます。'
        },
        {
          vi: 'Khả năng chịu đựng phương pháp tiệt trùng VHP (Hydrogen Peroxide hóa hơi) là bắt buộc.',
          en: 'Resilience against VHP (Vaporized Hydrogen Peroxide) sterilization is mandatory.',
          ja: 'VHP（過酸化水素ガス）滅菌に対する耐性が必須となります。'
        }
      ]
    }
  },
  {
    id: 'MV-002',
    category: 'standard',
    badge: {
      vi: 'Tiêu chuẩn',
      en: 'Standard',
      ja: '規格'
    },
    title: {
      vi: 'Kiểm soát tĩnh điện (ESD) trong đóng gói linh kiện bán dẫn',
      en: 'Electrostatic Discharge (ESD) Control in Semiconductor Packaging',
      ja: '半導体パッケージングにおける静電気放電（ESD）管理'
    },
    description: {
      vi: 'Các nguyên tắc cốt lõi giúp loại bỏ hoàn toàn rủi ro phóng tĩnh điện trong khâu đóng gói thành phẩm xuất khẩu.',
      en: 'Core principles to completely eliminate electrostatic discharge risks during export finished-product packaging.',
      ja: '輸出完成品の梱包プロセスにおいて静電気放電リスクを完全に排除するための核心原則。'
    },
    date: 'Tháng 10, 2024',
    image: '/images/resources/news/lab-equipment.webp',
    author: {
      name: { vi: 'KS. Trần Quốc Trung', en: 'KS. Trần Quốc Trung', ja: 'KS. Trần Quốc Trung' },
      role: { vi: 'Trưởng phòng Giải pháp ESD', en: 'ESD Solutions Lead', ja: 'Trưởng phòng Giải pháp ESD' },
      avatar: '/images/about/op-team.webp'
    },
    readTime: { vi: '8 phút đọc', en: '8 min read', ja: '8 min read' },
    audioDuration: '05:30',
    audioSecs: 330,
    size: '1.8 MB',
    type: 'PDF',
    downloadUrl: '/documents/lien-he-nha-phat-trien.pdf',
    sections: [
      {
        id: 'mv2-sec-1',
        num: '1.',
        title: {
          vi: 'Nguyên lý phóng tĩnh điện (ESD)',
          en: 'Electrostatic Discharge Principles',
          ja: '静電気放電の原理'
        },
        content: {
          vi: 'Hiện tượng phóng tĩnh điện xảy ra do sự mất cân biến điện tích giữa hai vật thể khi tiếp xúc hoặc ma sát. Trong sản xuất bán dẫn, các linh kiện vi mạch siêu nhỏ có thể bị phá hủy hoàn toàn bởi dòng điện phóng tĩnh điện cực nhỏ (chỉ vài vôn) mà mắt thường hay xúc giác con người không thể cảm nhận được.',
          en: 'Electrostatic discharge occurs due to charge imbalance between two objects when they contact or rub. In semiconductor manufacturing, microscopic microcircuit components can be completely destroyed by very small discharge currents (just a few volts) undetectable to human sight or touch.',
          ja: '静電気放電は、2つの物体が接触または摩擦したときの電荷の不均衡によって発生します。半導体製造では、目視や触覚では検出できない極小の放end電流（わずか数ボルト）によって、微細なマイクロ回路部品が完全に破壊される可能性があります。'
        }
      },
      {
        id: 'mv2-sec-2',
        num: '2.',
        title: {
          vi: 'Vật liệu đóng gói chống tĩnh điện',
          en: 'Anti-Static Packaging Materials',
          ja: '帯電防止梱包資材'
        },
        content: {
          vi: 'Quy trình bảo quản và vận chuyển đòi hỏi sử dụng đồng bộ các bao bì chống tĩnh điện chuyên dụng như:\n- Túi nhôm chắn sóng (Shielding Bags): Tạo lồng Faraday ngăn bức xạ điện từ và phóng điện bên ngoài.\n- Khay nhựa dẫn điện/chống tĩnh điện (ESD Trays): Giữ linh kiện cố định và giải phóng điện tích an toàn.\n- Màng PE quấn ESD: Bảo vệ pallet hàng hóa tránh tích tụ ma sát tĩnh điện trong quá trình rung lắc cơ học.',
          en: 'Storage and transport processes require synchronized usage of specialized anti-static packaging such as:\n- Shielding Bags: Creates a Faraday cage effect to block electromagnetic radiation and external discharges.\n- ESD Trays: Keeps components secure and dissipates electrical charges safely.\n- ESD PE Stretch Film: Protects palletized cargo from triboelectric charge accumulation during physical transport vibration.',
          ja: '保管および輸送プロセスでは、以下のような専用の帯電防止梱包資材を一貫して使用する必要があります。\n- シールドバッグ：ファラデーケージ効果を構築し、電磁波や外部放電を遮断します。\n- ESDトレイ：部品を固定し、電荷を安全に放散します。\n- ESD対応PEストレッチフィルム：輸送中の機械的振動による静電気の蓄積からパレット貨物を保護します。'
        }
      },
      {
        id: 'mv2-sec-3',
        num: '3.',
        title: {
          vi: 'Quy trình đóng gói chuẩn hóa',
          en: 'Standardized Packaging Process',
          ja: '標準化された梱包プロセス'
        },
        content: {
          vi: 'Để đảm bảo an toàn ESD, toàn bộ công nhân phải tuân thủ nghiêm ngặt quy trình: đeo vòng tiếp địa cổ tay kiểm định hàng ngày, đứng trên thảm ESD dẫn điện, và chỉ bóc mở túi bao bì chống tĩnh điện ngay tại khu vực EPA (Electrostatic Protected Area) đã được nối đất đầy đủ.',
          en: 'To ensure ESD safety, all personnel must strictly comply with procedures: wearing a daily-verified wrist strap, standing on conductive ESD maps, and unpacking anti-static bags only within a fully grounded Electrostatic Protected Area (EPA).',
          ja: 'ESDの安全を確保するため、すべての作業員は手順を厳格に遵守する必要があります。毎日検査されるリストストラップの着用、導電性ESDマット上への起立、接地された静電気対策区域（EPA）内のみでの帯電防止袋の開封などです。'
        }
      }
    ],
    aiSummary: {
      intro: {
        vi: 'Hướng dẫn toàn diện về kiểm soát ESD trong đóng gói bán dẫn, ngăn ngừa hư hỏng chip do dòng điện phóng tĩnh điện.',
        en: 'Comprehensive guide to ESD control in semiconductor packaging, preventing chip damage from electrostatic discharge.',
        ja: '半導体パッケージングにおけるESD管理の包括的なガイド。静電気放電によるチップの損傷を防止します。'
      },
      bullets: [
        {
          vi: 'Các chip bán dẫn hiện đại rất dễ bị phá hủy bởi dòng điện phóng tĩnh điện siêu nhỏ.',
          en: 'Modern semiconductor chips are highly vulnerable to microscopic electrostatic discharge currents.',
          ja: '現代の半導体チップは、極小の静電気放電電流によって非常に破壊されやすいです。'
        },
        {
          vi: 'Sử dụng túi chắn sóng shielding bags và khay ESD để tạo môi trường bảo vệ Faraday.',
          en: 'Using shielding bags and ESD trays creates a protective Faraday environment.',
          ja: 'シールドバッグとESDトレイを使用することで、保護ファラデー環境を構築します。'
        },
        {
          vi: 'Mọi hoạt động đóng gói phải diễn ra trong vùng bảo vệ EPA được kiểm định tĩnh điện định kỳ.',
          en: 'All packaging activities must take place inside a periodically certified EPA protection zone.',
          ja: 'すべての梱包作業は、定期的に検証されるEPA保護区域内で行う必要があります。'
        }
      ]
    }
  },
  {
    id: 'MV-003',
    category: 'case-study',
    badge: {
      vi: 'Case Study',
      en: 'Case Study',
      ja: 'ケーススタディ'
    },
    title: {
      vi: 'Tối ưu hóa năng lượng hệ thống AHU trong nhà máy điện tử',
      en: 'Optimizing AHU System Energy in Electronics Factories',
      ja: '電子工場におけるAHUシステムのエネルギー最適化'
    },
    description: {
      vi: 'Giải pháp điều tiết lưu lượng gió giúp giảm thiểu đến 30% điện năng tiêu thụ mà vẫn đảm bảo cấp độ sạch.',
      en: 'Airflow regulation solution that reduces power consumption by up to 30% while maintaining cleanroom standards.',
      ja: 'クリーンルーム規格を維持しながら、電力消費を最大30％削減する風量制御ソリューション。'
    },
    date: 'Tháng 10, 2024',
    image: '/images/resources/news/hvac-system.webp',
    author: {
      name: { vi: 'KS. Nguyễn Hoàng Nam', en: 'KS. Nguyễn Hoàng Nam', ja: 'KS. Nguyễn Hoàng Nam' },
      role: { vi: 'Kỹ sư HVAC Cấp cao', en: 'Senior HVAC Engineer', ja: 'Kỹ sư HVAC Cấp cao' },
      avatar: '/images/about/op-team.webp'
    },
    readTime: { vi: '7 phút đọc', en: '7 min read', ja: '7 min read' },
    audioDuration: '04:45',
    audioSecs: 285,
    size: '2.1 MB',
    type: 'PDF',
    downloadUrl: '/documents/lien-he-nha-phat-trien.pdf',
    sections: [
      {
        id: 'mv3-sec-1',
        num: '1.',
        title: {
          vi: 'Vai trò của AHU trong phòng sạch',
          en: 'The Role of AHUs in Cleanrooms',
          ja: 'クリーンルームにおけるAHUの役割'
        },
        content: {
          vi: 'Hệ thống AHU (Air Handling Unit) là trái tim của điều hòa không khí phòng sạch, có nhiệm vụ luân chuyển, lọc bụi và điều hòa nhiệt ẩm lượng không khí khổng lồ. Tuy nhiên, việc vận hành liên tục các quạt công suất lớn khiến AHU chiếm tới 50-60% tổng lượng điện năng tiêu thụ của cả nhà máy.',
          en: 'The Air Handling Unit (AHU) system is the heart of cleanroom air conditioning, responsible for circulating, filtering dust, and regulating temperature/humidity for huge volumes of air. However, continuous operation of high-power fans makes AHUs account for 50-60% of the entire factory electricity consumption.',
          ja: 'AHU（空気調和機）システムは、クリーンルーム空調の心臓部であり、大風量の空気を循環、ろ過、および温湿度調整する役割を担っています。しかし、高出力ファンの連続運転により、AHUは工場全体の電力消費量の50〜60％を占めることになります。'
        }
      },
      {
        id: 'mv3-sec-2',
        num: '2.',
        title: {
          vi: 'Giải pháp điều tiết lưu lượng gió',
          en: 'Airflow Regulation Solutions',
          ja: '風量制御ソリューション'
        },
        content: {
          vi: 'Giải pháp ứng dụng biến tần thông minh tự động giảm tốc độ quạt AHU vào các giờ thấp điểm (ban đêm hoặc khi không có ca sản xuất) mà vẫn duy trì áp suất dương phòng sạch. Điều này giúp ngăn chặn bụi bẩn tràn vào bên trong nhưng tiết kiệm được điện năng hao phí vô cùng lớn.',
          en: 'Applying smart variable frequency drives (VFD) automatically slows down AHU fan speeds during off-peak hours (nighttime or non-production shifts) while maintaining cleanroom positive pressure. This prevents external dust intrusion while cutting down massive idle energy waste.',
          ja: 'スマートなインバータ（VFD）を適用することで、夜間や非生産シフトなどのオフピーク時に、クリーンルームの陽圧を維持しながらAHUのファン速度を自動的に低下させます。これにより、外部からの塵埃侵入を防ぎつつ、膨大な無駄な電力を削減します。'
        }
      },
      {
        id: 'mv3-sec-3',
        num: '3.',
        title: {
          vi: 'Hiệu quả tiết kiệm năng lượng',
          en: 'Energy Saving Efficiency',
          ja: '省エネ効率'
        },
        content: {
          vi: 'Dự án áp dụng thực tế tại nhà máy điện tử cho thấy điện năng tiêu thụ giảm trung bình 32% hàng tháng. Chi phí đầu tư hệ thống điều khiển tự động biến tần được hoàn vốn chỉ trong vòng 14 tháng vận hành, mang lại hiệu quả kinh tế vượt mong đợi.',
          en: 'Real-world deployment projects in electronics factories show an average monthly electricity consumption drop of 32%. The investment cost for the VFD automatic control system was fully recouped in just 14 months of operation, bringing better-than-expected economic returns.',
          ja: '電子工場における実際の展開プロジェクトでは、月平均の電力消費量が32％削減されました。インバータ自動制御システムへの投資コストは、わずか14ヶ月の運転で完全に回収され、予想を上回る経済的利益をもたらしました。'
        }
      }
    ],
    aiSummary: {
      intro: {
        vi: 'Nghiên cứu điển hình về tối ưu hóa điện năng AHU thông qua công nghệ điều khiển tần số quạt gió tự động theo ca sản xuất.',
        en: 'Case study on AHU power optimization through automatic fan frequency control technology based on production shifts.',
        ja: '生産シフトに基づき送風ファンの周波数を自動制御する技術を通じた、AHU電力最適化に関するケーススタディ。'
      },
      bullets: [
        {
          vi: 'AHU thường chiếm tỷ trọng tiêu thụ điện lớn nhất trong hệ thống phòng sạch nhà máy.',
          en: 'AHUs typically consume the largest share of electricity in factory cleanroom systems.',
          ja: 'AHUは通常、工場のクリーンルームシステムにおいて最大の電力を消費します。'
        },
        {
          vi: 'Ứng dụng biến tần thông minh để hạ thấp công suất quạt vào giờ nghỉ không sản xuất.',
          en: 'Using smart VFDs to lower fan power during non-production resting hours.',
          ja: 'スマートインバータを使用し、非生産時間帯にファン出力を低下させます。'
        },
        {
          vi: 'Đạt hiệu quả giảm tới 32% điện năng hao phí, thu hồi vốn nhanh chóng.',
          en: 'Achieved up to 32% waste electricity reduction with rapid investment recovery.',
          ja: '最大32％の無駄な電力を削減し、迅速な投資回収を実現しました。'
        }
      ]
    }
  },
  {
    id: 'MV-004',
    category: 'news',
    badge: {
      vi: 'Data Room',
      en: 'Data Room',
      ja: 'Data Room'
    },
    title: {
      vi: 'Quy trình phân loại và kiểm soát rác thải phòng sạch',
      en: 'Cleanroom Waste Classification and Control Process',
      ja: 'クリーンルーム廃棄物の分別および管理手順'
    },
    description: {
      vi: 'Hướng quan trọng giúp phân tách và thu gom rác thải nguy hại, bao bì nhiễm bẩn theo tiêu chuẩn an toàn lao động quốc tế.',
      en: 'Important guide to separate and collect hazardous waste and contaminated packaging according to international safety standards.',
      ja: '国際安全規格に準拠した危険廃棄物および汚染梱包資材の分別・収集に関する重要ガイド。'
    },
    date: 'Tháng 10, 2024',
    image: '/images/resources/news/chemical-handling.webp',
    author: {
      name: { vi: 'KS. Đỗ Hoàng Giang', en: 'KS. Đỗ Hoàng Giang', ja: 'KS. Đỗ Hoàng Giang' },
      role: { vi: 'Chuyên viên an toàn HSE', en: 'Safety HSE Specialist', ja: 'Chuyên viên an toàn HSE' },
      avatar: '/images/about/op-team.webp'
    },
    readTime: { vi: '5 phút đọc', en: '5 min read', ja: '5 min read' },
    audioDuration: '03:50',
    audioSecs: 230,
    size: '1.4 MB',
    type: 'PDF',
    downloadUrl: '/documents/lien-he-nha-phat-trien.pdf',
    sections: [
      {
        id: 'mv4-sec-1',
        num: '1.',
        title: {
          vi: 'Phân loại chất thải nguy hại',
          en: 'Hazardous Waste Classification',
          ja: '危険廃棄物の分別'
        },
        content: {
          vi: 'Trong phòng sạch bán dẫn và y dược, rác thải được phát sinh từ nhiều hoạt động khác nhau. Phân loại chuẩn bao gồm: rác thải hạt bám dính, vật tư bảo hộ dính hóa chất tẩy rửa, và các dung môi tẩy rửa bay hơi. Các nhóm này tuyệt đối không được trộn lẫn để tránh phản ứng hóa học phát sinh khí độc.',
          en: 'In semiconductor and pharmaceutical cleanrooms, waste is generated from various activities. Standard classification includes: particulate-adhered waste, protective gear stained with chemical cleaning agents, and volatile solvent residues. These groups must never be mixed to prevent chemical reactions generating toxic fumes.',
          ja: '半導体や医薬品のクリーンルームでは、様々な作業から廃棄物が発生します。標準的な分別には、粒子が付着した廃棄物、化学洗浄剤で汚染された保護具、および揮発性溶剤残渣が含まれます。有毒ガスを発生させる化学反応を防ぐため、これらのグループは絶対に混合してはなりません。'
        }
      },
      {
        id: 'mv4-sec-2',
        num: '2.',
        title: {
          vi: 'Quy chuẩn thùng chứa chuyên dụng',
          en: 'Specialized Container Standards',
          ja: '専用容器の規格'
        },
        content: {
          vi: 'Thùng chứa rác thải phòng sạch phải là loại chống tĩnh điện ESD để tránh nguy cơ phóng tia lửa điện bắt lửa hóa chất. Nắp thùng phải thiết kế tự động đóng kín hoặc dùng bàn đạp chân để ngăn bụi từ rác phát tán ngược lại vào luồng khí phòng sạch đang luân chuyển.',
          en: 'Cleanroom waste containers must be ESD-safe to prevent spark risks from igniting chemicals. Lids must be self-closing or pedal-operated to prevent dust from escaping back into the circulating cleanroom airflow.',
          ja: 'クリーンルームの廃棄物容器は、化学物質の引火原因となる火花の発生を防ぐため、ESD対応である必要があります。塵埃が循環するクリーンルーム内の気流に逆流するのを防ぐため、蓋は自動密閉式またはペダル式である必要があります。'
        }
      },
      {
        id: 'mv4-sec-3',
        num: '3.',
        title: {
          vi: 'Quy trình thu gom an toàn',
          en: 'Safe Collection Procedures',
          ja: '安全な回収手順'
        },
        content: {
          vi: 'Thu gom chất thải phải tiến hành định kỳ vào cuối mỗi ca làm việc. Nhân viên thu gom phải mặc trang phục bảo hộ đầy đủ và vận chuyển rác qua các lối đi chuyên dụng (Service Corridors) cách biệt, tuyệt đối không được đưa rác đi qua lối đi chính của phòng sạch đang vận hành.',
          en: 'Waste collection must be conducted periodically at the end of each shift. Collecting personnel must wear full protective gear and transport waste through dedicated service corridors, never passing through the main cleanroom lanes under operation.',
          ja: '廃棄物の回収は、各シフトの終了時に定期的に行う必要があります。回収作業員は防護具を着用し、専用のサービスコリドー（作業用通路）を通過して搬出する必要があり、稼働中のメインクリーンルーム内を通過することは厳禁です。'
        }
      }
    ],
    aiSummary: {
      intro: {
        vi: 'Hướng dẫn chuẩn hóa quy trình phân tách, chứa đựng và vận chuyển chất thải phòng sạch đảm bảo không gây ô nhiễm chéo môi trường sản xuất.',
        en: 'Guidelines to standardize the process of separating, containing, and transporting cleanroom waste, ensuring no cross-contamination to the production environment.',
        ja: 'クリーンルーム廃棄物の分別、封入、および輸送プロセスを標準化し、製造環境への交差汚染を防止するためのガイドライン。'
      },
      bullets: [
        {
          vi: 'Bắt buộc tách biệt rác thải dính hóa chất và dung môi bay hơi để tránh phản ứng.',
          en: 'Mandatory separation of chemical-stained waste and volatile solvents to prevent reactions.',
          ja: '化学反応を防ぐため、化学物質で汚染された廃棄物と揮発性溶剤の分別が義務付けられています。'
        },
        {
          vi: 'Sử dụng thùng chứa rác chống tĩnh điện ESD có cơ chế tự động đóng kín.',
          en: 'Using ESD-safe waste bins equipped with automatic self-closing mechanisms.',
          ja: '自動密閉機能を備えたESD対応の廃棄物容器を使用します。'
        },
        {
          vi: 'Chỉ vận chuyển rác qua hành lang dịch vụ kỹ thuật chuyên dụng bên ngoài phòng sạch.',
          en: 'Transport waste only through dedicated technical service corridors outside the cleanroom.',
          ja: '廃棄物はクリーンルーム外の専用サービス通路のみを通って搬出します。'
        }
      ]
    }
  }
];


// Upcoming Events Mock Data
export const UPCOMING_EVENTS: EventItem[] = [
  {
    id: 'EV-001',
    title: {
      vi: 'Công nghệ kiểm soát ô nhiễm phòng sạch bán dẫn thế hệ mới',
      en: 'Next-Generation Semiconductor Cleanroom Contamination Control Technology',
      ja: '次世代半導体クリーンルームの汚染制御技術'
    },
    description: {
      vi: 'Hội thảo khoa học quốc tế về các công nghệ kiểm soát ô nhiễm hạt mịn thế hệ mới trong sản xuất vi mạch.',
      en: 'International scientific conference on next-generation fine particle contamination control technologies in semiconductor manufacturing.',
      ja: 'マイクロチップ製造における次世代微粒子汚染制御技術に関する国際科学セミナー。'
    },
    badge: {
      vi: 'Hội thảo',
      en: 'Conference',
      ja: 'セミナー'
    },
    price: {
      vi: 'Miễn phí',
      en: 'Free',
      ja: '無料'
    },
    image: '/images/resources/events/conference-hall.webp',
    images: [
      '/images/resources/events/conference-hall.webp',
      '/images/resources/events/event (1).png'
    ],
    date: '15/09/2026',
    time: '09:00 - 11:30',
    location: {
      vi: 'Hội trường ULink Hà Nam',
      en: 'ULink Ha Nam Hall',
      ja: 'ULinkハナムホール'
    },
    link: '/events/ev-001'
  },
  {
    id: 'EV-002',
    title: {
      vi: 'Hội nghị khách hàng và Triển lãm bao bì ESD cao cấp',
      en: 'Customer Conference & Premium ESD Packaging Exhibition',
      ja: '顧客会議およびプレミアムESDパッケージング展示会'
    },
    description: {
      vi: 'Sự kiện kết nối và giới thiệu các giải pháp đóng gói chống tĩnh điện đột phá cho chuỗi cung ứng điện tử.',
      en: 'An event to connect and introduce breakthrough anti-static packaging solutions for the electronics supply chain.',
      ja: '電子機器サプライチェーン向けの革新的な帯電防止パッケージングソリューションの紹介およびネットワーキングイベント。'
    },
    badge: {
      vi: 'Triển lãm',
      en: 'Exhibition',
      ja: '展示会'
    },
    price: {
      vi: 'Miễn phí',
      en: 'Free',
      ja: '無料'
    },
    image: '/images/resources/events/b2b-networking.webp',
    images: [
      '/images/resources/events/b2b-networking.webp',
      '/images/resources/events/event (2).png'
    ],
    date: '22/09/2026',
    time: '14:00 - 16:30',
    location: {
      vi: 'Khách sạn Crowne Plaza, Hà Nội',
      en: 'Crowne Plaza Hotel, Hanoi',
      ja: 'クラウンプラザホテルハノイ'
    },
    link: '/events/ev-002'
  },
  {
    id: 'EV-003',
    title: {
      vi: 'Đào tạo thực hành Gowning và Đo đạc chất lượng phòng sạch',
      en: 'Practical Cleanroom Gowning & Quality Measurement Training',
      ja: '実用的クリーンルームガウニングおよび品質測定トレーニング'
    },
    description: {
      vi: 'Khóa đào tạo thực hành mặc trang phục phòng sạch và kiểm chuẩn chất lượng theo ISO 14644.',
      en: 'Practical training course on cleanroom gowning and quality verification according to ISO 14644.',
      ja: 'ISO 14644に準拠したクリーンルームウェアの着用と品質測定の実践的なトレーニングコース。'
    },
    badge: {
      vi: 'Đào tạo',
      en: 'Training',
      ja: 'トレーニング'
    },
    price: {
      vi: '1.200.000 VNĐ',
      en: '1,200,000 VND',
      ja: '1,200,000 VND'
    },
    image: '/images/resources/events/seminar-room.webp',
    images: [
      '/images/resources/events/seminar-room.webp',
      '/images/resources/events/event (3).png'
    ],
    date: '05/10/2026',
    time: '08:30 - 17:00',
    location: {
      vi: 'Văn phòng ULink, TP. Hồ Chí Minh',
      en: 'ULink Office, Ho Chi Minh City',
      ja: 'ULinkホーチミンオフィス'
    },
    link: '/events/ev-003'
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
      vi: 'Xu thái công nghệ phòng sạch năm 2025',
      en: 'Cleanroom Technology Trends in 2025',
      ja: '2025年のクリーンルーム技術動向'
    }
  }
];
