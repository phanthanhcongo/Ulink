export interface NewsArticle {
  slug: string;
  category: string;
  title: string;
  description: string;
  date: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  coverImage: string;
  content: NewsSection[];
}

export interface NewsSection {
  id: string;
  title: string;
  body: string[];
}

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    slug: 'news-1',
    category: 'Catalogue',
    title: 'Giải pháp đóng gói công nghiệp tối ưu',
    description:
      'để cố định cụm nhiều chai nước ngọt, bia, hoặc lốc sữa hộp thành các khối chắc chắn, tiện lợi cho việc lưu kho và phân phối.',
    date: 'Ngày 22/7/2026',
    author: 'Nguyễn Minh Tuấn',
    authorRole: 'Trưởng phòng Đóng gói',
    authorAvatar: '/images/regional_hubs/hub-2/KennyTran.png',
    coverImage: '/images/home/news/image (9).png',
    content: [
      {
        id: 'sec-1',
        title: 'Tổng quan giải pháp',
        body: [
          'Trong ngành sản xuất đồ uống và thực phẩm đóng gói, việc cố định nhiều chai nước ngọt, bia hoặc lốc sữa hộp thành các khối vững chắc là yêu cầu then chốt để đảm bảo an toàn trong quá trình lưu kho và vận chuyển. Giải pháp đóng gói công nghiệp tối ưu của ULink giúp doanh nghiệp giải quyết triệt để bài toán này.',
          'Với hệ thống màng co PE chất lượng cao, chúng tôi mang đến khả năng bó chặt sản phẩm thành khối đồng nhất, chống xô lệch và giảm thiểu tối đa hư hỏng trong quá trình logistics.'
        ]
      },
      {
        id: 'sec-2',
        title: 'Ưu điểm vượt trội',
        body: [
          'Màng co PE của ULink có độ bền kéo cao, khả năng co nhiệt đều và chống thủng vượt trội, phù hợp với nhiều quy cách đóng gói khác nhau từ 4 chai, 6 chai đến 24 chai một lốc.',
          'Quy trình đóng gói được tự động hóa hoàn toàn, giúp tăng năng suất đóng gói lên đến 40% so với phương pháp thủ công truyền thống, đồng thời giảm chi phí nhân công vận hành.'
        ]
      },
      {
        id: 'sec-3',
        title: 'Ứng dụng thực tế',
        body: [
          'Giải pháp đã được triển khai thành công tại nhiều nhà máy bia và nước giải khát lớn tại miền Bắc và miền Nam, với công suất đóng gói lên đến 12.000 chai/giờ.',
          'Kết quả kiểm định cho thấy tỷ lệ hư hỏng trong vận chuyển giảm từ 3.2% xuống còn 0.4%, giúp doanh nghiệp tiết kiệm đáng kể chi phí bồi thường và tái sản xuất.'
        ]
      },
      {
        id: 'sec-4',
        title: 'Kết luận',
        body: [
          'Giải pháp đóng gói công nghiệp của ULink không chỉ tối ưu hóa quy trình đóng gói mà còn nâng cao chất lượng bảo quản sản phẩm, tạo lợi thế cạnh tranh bền vững cho doanh nghiệp trên thị trường.'
        ]
      }
    ]
  },
  {
    slug: 'news-2',
    category: 'Tài liệu kỹ thuật',
    title: 'Giải pháp đóng gói công nghiệp tối ưu',
    description:
      'để cố định cụm nhiều chai nước ngọt, bia, hoặc lốc sữa hộp thành các khối chắc chắn, tiện lợi cho việc lưu kho và phân phối.',
    date: 'Ngày 20/7/2026',
    author: 'Lê Quốc Hưng',
    authorRole: 'Quản lý Kho vận',
    authorAvatar: '/images/regional_hubs/hub-2/QuangTran.png',
    coverImage: '/images/home/news/image (10).png',
    content: [
      {
        id: 'sec-1',
        title: 'Bối cảnh và thách thức',
        body: [
          'Quản lý kho vận trong ngành hàng tiêu dùng nhanh (FMCG) đặt ra nhiều thách thức về không gian lưu trữ, tốc độ xuất nhập hàng và đặc biệt là khả năng bảo quản sản phẩm trong điều kiện môi trường kho thay đổi.',
          'Việc đóng gói không chuẩn dẫn đến lãng phí không gian, khó khăn trong việc xếp dỡ và gia tăng nguy cơ hư hỏng sản phẩm trong quá trình vận chuyển đường dài.'
        ]
      },
      {
        id: 'sec-2',
        title: 'Tiêu chuẩn kỹ thuật',
        body: [
          'Màng co PE của ULink đáp ứng các tiêu chuẩn kỹ thuật khắt khe nhất: độ dày từ 15-25 micron, độ giãn dài ≥ 450%, lực kéo đứt ≥ 25 MPa và khả năng chịu nhiệt từ 120°C đến 160°C.',
          'Sản phẩm được kiểm định bởi các trung tâm đo lường chất lượng quốc gia, đảm bảo an toàn cho thực phẩm và thân thiện với môi trường.'
        ]
      },
      {
        id: 'sec-3',
        title: 'Hiệu quả kinh tế',
        body: [
          'Áp dụng giải pháp đóng gói tiêu chuẩn giúp tối ưu hóa không gian lưu kho lên đến 35%, nhờ khả năng xếp chồng các khối hàng ổn định mà không lo đổ vỡ.',
          'Chi phí logistics tổng thể giảm 22% nhờ tối ưu số chuyến xe và giảm hao hụt hàng hóa trong vận chuyển.'
        ]
      },
      {
        id: 'sec-4',
        title: 'Kết luận',
        body: [
          'Đầu tư vào giải pháp đóng gói công nghiệp chuẩn là bước đi chiến lược giúp doanh nghiệp tối ưu vận hành kho vận và nâng cao sức cạnh tranh trong chuỗi cung ứng.'
        ]
      }
    ]
  },
  {
    slug: 'news-3',
    category: 'Catalogue',
    title: 'Giải pháp đóng gói công nghiệp tối ưu',
    description:
      'để cố định cụm nhiều chai nước ngọt, bia, hoặc lốc sữa hộp thành các khối chắc chắn, tiện lợi cho việc lưu kho và phân phối.',
    date: 'Ngày 22/7/2026',
    author: 'Trần Thị Hồng Nhung',
    authorRole: 'Giám đốc Sản xuất',
    authorAvatar: '/images/regional_hubs/hub-2/KennyTran.png',
    coverImage: '/images/home/news/image (11).png',
    content: [
      {
        id: 'sec-1',
        title: 'Góc nhìn từ Giám đốc Sản xuất',
        body: [
          'Trong bối cảnh cạnh tranh khốc liệt của ngành sản xuất, việc tối ưu hóa quy trình đóng gói không chỉ là bài toán kỹ thuật mà còn là chiến lược kinh doanh dài hạn.',
          'Tại ULink, chúng tôi đã nghiên cứu và phát triển giải pháp đóng gói công nghiệp toàn diện, đáp ứng được đồng thời các yêu cầu về tốc độ, chất lượng và chi phí cho doanh nghiệp sản xuất.'
        ]
      },
      {
        id: 'sec-2',
        title: 'Quy trình triển khai',
        body: [
          'Quy trình triển khai bao gồm 4 bước: (1) Khảo sát hiện trạng dây chuyền đóng gói, (2) Tư vấn giải pháp và lựa chọn vật tư phù hợp, (3) Lắp đặt và vận hành thử nghiệm, (4) Bàn giao và đào tạo vận hành.',
          'Mỗi bước đều có đội ngũ kỹ thuật giàu kinh nghiệm đồng hành cùng doanh nghiệp, đảm bảo chuyển đổi mượt mà và không gián đoạn sản xuất.'
        ]
      },
      {
        id: 'sec-3',
        title: 'Cam kết chất lượng',
        body: [
          'ULink cam kết cung cấp sản phẩm đạt chuẩn ISO 9001:2015, với chế độ bảo hành và hậu mãi toàn diện. Đội ngũ kỹ thuật sẵn sàng hỗ trợ 24/7 để xử lý mọi vấn đề phát sinh trong quá trình sử dụng.',
          'Chúng tôi không chỉ bán vật tư đóng gói - chúng tôi đồng hành cùng doanh nghiệp trong suốt hành trình tối ưu hóa sản xuất và nâng cao năng lực cạnh tranh.'
        ]
      }
    ]
  }
];

export function getNewsArticleBySlug(slug: string) {
  return NEWS_ARTICLES.find((a) => a.slug === slug) ?? null;
}
