export type EventDetailSection = {
  time: string;
  title: string;
  description: string;
};

export type EventSpeaker = {
  name: string;
  title: string;
  company: string;
  bio: string;
  avatar?: string; // Bổ sung ảnh đại diện
};

export type EventDetail = {
  slug: string;
  title: string;
  summary: string;
  image: string;
  images: string[];
  date: string;
  time: string;
  startTime?: string;          // Bổ sung giờ bắt đầu
  endTime?: string;            // Bổ sung giờ kết thúc
  timezone?: string;           // Bổ sung múi giờ
  location: string;            // Giữ lại để tương thích ngược
  locationName?: string;       // Bổ sung tên địa điểm
  address?: string;            // Bổ sung địa chỉ chi tiết
  registrationStatus: string;  
  price?: string;              // Bổ sung giá vé
  overview: string;
  highlights: string[];
  agenda: EventDetailSection[];
  speakers: EventSpeaker[];
  hosts?: EventSpeaker[];      // Bổ sung danh sách Host
  sponsors?: string[];         // Bổ sung danh sách logo nhà tài trợ/đối tác
  benefits: string[];
  organizer: {
    name: string;
    description: string;
    contact: string;
    logo?: string;             // Bổ sung logo ban tổ chức
    role?: string;             // Bổ sung vai trò/chức danh
  };
};

const EVENT_DETAILS: Record<string, EventDetail> = {
  'ev-001': {
    slug: 'ev-001',
    title: 'ULink Tech Summit 2026: Decentralized Future',
    summary:
      'Chương trình thường niên quy tụ các chuyên gia hàng đầu trong lĩnh vực Blockchain, Web3 và Trí tuệ Nhân tạo để thảo luận và chia sẻ xu hướng phát triển nền kinh tế phi tập trung.',
    image: '/images/resources/events/event (1).png', // Cập nhật hình ảnh sự kiện tương tự banner
    images: [
      '/images/resources/events/conference-hall.webp',
      '/images/resources/events/event (1).png'
    ],
    date: 'Thứ Bảy, 15 tháng 11, 2026',
    time: '08:30 - 17:30',
    startTime: '08:30 AM',
    endTime: '17:30 PM',
    timezone: 'UTC+07:00',
    location: 'Trung tâm Hội nghị GEM Center, 8 Nguyễn Bỉnh Khiêm, Đa Kao, Quận 1, TP. Hồ Chí Minh',
    locationName: 'Trung tâm Hội nghị GEM Center',
    address: '8 Nguyễn Bỉnh Khiêm, Phường Đa Kao, Quận 1, TP. Hồ Chí Minh',
    registrationStatus: 'UPCOMING',
    price: '300.000đ/người',
    overview:
      'ULink Tech Summit 2026 là sự kiện thường niên quy tụ các chuyên gia hàng đầu trong lĩnh vực Blockchain, Web3 và Trí tuệ Nhân tạo. Sự kiện năm nay tập trung vào chủ đề "Decentralized Future – Xây dựng nền kinh tế số phi tập trung", nơi các diễn giả sẽ chia sẻ kinh nghiệm thực chiến về DeFi, NFT, DAO và các ứng dụng AI trong hệ sinh thái Web3. Tham gia sự kiện, bạn sẽ được kết nối với cộng đồng hơn 500 nhà phát triển, nhà đầu tư và người sáng lập startup từ khắp Đông Nam Á. Đây là cơ hội để cập nhật xu hướng mới nhất, tìm kiếm đối tác và khám phá các dự án tiềm năng trong ngành.',
    highlights: [
      'Cập nhật xu hướng phát triển kinh tế số phi tập trung 2026',
      'Kinh nghiệm thực chiến triển khai các dự án DeFi, NFT, DAO',
      'Ứng dụng AI trong các dự án Web3 hiện nay',
      'Cơ hội kết nối mạng lưới đối tác và quỹ đầu tư lớn'
    ],
    agenda: [
      {
        time: '08:00 - 08:30',
        title: 'Đón khách và Check-in',
        description: 'Nhận tài liệu, name tag và kết nối nhanh tại sảnh hội trường.'
      },
      {
        time: '08:30 - 09:30',
        title: 'Khai mạc & Keynote: Tương lai phi tập trung',
        description: 'Tầm nhìn phát triển kinh tế số và lộ trình ứng dụng blockchain.'
      },
      {
        time: '09:30 - 12:00',
        title: 'Phiên thảo luận chuyên sâu về DeFi & DAO',
        description: 'Các bài học thực chiến và giải pháp quản trị phi tập trung từ các dự án lớn.'
      },
      {
        time: '12:00 - 13:30',
        title: 'Nghỉ trưa & Business Networking',
        description: 'Tiệc buffet trưa kết nối cơ hội hợp tác kinh doanh trực tiếp.'
      },
      {
        time: '13:30 - 15:30',
        title: 'Ứng dụng AI và Web3',
        description: 'Sự giao thoa giữa AI và Web3 nhằm kiến tạo các mô hình kinh doanh mới.'
      },
      {
        time: '15:30 - 17:30',
        title: 'Pitching & Bế mạc',
        description: 'Trình bày các dự án khởi nghiệp tiềm năng và cơ hội gọi vốn đầu tư.'
      }
    ],
    speakers: [
      {
        name: 'Nguyễn Minh Trí',
        title: 'CEO & Co-founder',
        company: 'ChainVerse',
        bio: 'Chuyên gia về kiến trúc blockchain Layer 2 với hơn 8 năm kinh nghiệm phát triển hệ sinh thái DeFi.',
        avatar: '/images/resources/events/eventDetails/speaker (1).png'
      },
      {
        name: 'Lê Thanh Hằng',
        title: 'Head of Product',
        company: 'MetaLab Asia',
        bio: 'Người tiên phong trong việc ứng dụng NFT vào ngành bán lẻ và thương mại điện tử tại Việt Nam.',
        avatar: '/images/resources/events/eventDetails/speaker (2).png'
      },
      {
        name: 'David Chen',
        title: 'CTO',
        company: 'OpenNode Global',
        bio: 'Kiến trúc sư hệ thống phân tán, từng dẫn dắt đội ngũ kỹ thuật tại Binance Labs và Polygon.',
        avatar: '/images/resources/events/eventDetails/speaker (3).png'
      }
    ],
    hosts: [
      {
        name: 'Trần Quốc Bảo',
        title: 'Community Lead',
        company: 'ULink Vietnam',
        bio: 'Người kết nối cộng đồng Web3 Việt Nam với hơn 50 sự kiện đã tổ chức trong 3 năm qua.',
        avatar: '/images/resources/events/eventDetails/speaker (4).png'
      },
      {
        name: 'Phạm Thị Mai Anh',
        title: 'Marketing Director',
        company: 'BlockMedia',
        bio: 'MC công nghệ nổi tiếng, từng dẫn dắt các hội nghị blockchain quốc tế tại Singapore và Dubai.',
        avatar: '/images/resources/events/eventDetails/speaker (5).png'
      },
      {
        name: 'Alex Nguyễn',
        title: 'Developer Advocate',
        company: 'WaveDAO',
        bio: 'Nhà truyền cảm hứng cho thế hệ developer trẻ với phong cách dẫn dắt sự kiện năng động và chuyên sâu.',
        avatar: '/images/resources/events/eventDetails/speaker (6).png'
      }
    ],
    sponsors: [
      'SHELLS',
      'SmartFinder',
      'kontrastr',
      'WAVESMARATHON'
    ],
    benefits: [
      'Cập nhật xu hướng công nghệ Web3, Blockchain và AI mới nhất',
      'Nhận tài liệu đặc quyền từ các diễn giả và đối tác sự kiện',
      'Kết nối trực tiếp với hơn 500 nhà phát triển, nhà đầu tư trong khu vực',
      'Trải nghiệm thực tế các giải pháp công nghệ mới tại khu trưng bày triển lãm'
    ],
    organizer: {
      name: 'ULink Industries JSC',
      description: 'Công ty công nghệ tiên phong trong lĩnh vực blockchain và giải pháp phi tập trung tại Việt Nam. Sứ mệnh kết nối cộng đồng Web3 Đông Nam Á.',
      contact: 'contact@ulinkindustries.com',
      logo: '/images/logo/image.png',
      role: 'Đơn vị tổ chức chính'
    }
  },
  'ev-002': {
    slug: 'ev-002',
    title:
      'Hội nghị khách hàng và Triển lãm bao bì ESD cao cấp trong chuỗi cung ứng linh kiện điện tử',
    summary:
      'Sự kiện dành cho khách hàng điện tử với nội dung về cấu hình bao bì ESD, demo vật tư và chia sẻ case thực tế từ nhà máy.',
    image: '/images/about/hero-warehouse.webp',
    images: [
      '/images/resources/events/b2b-networking.webp',
      '/images/resources/events/event (2).png'
    ],
    date: 'Thứ Ba, 22 tháng 09, 2026',
    time: '14:00 - 16:30',
    startTime: '14:00 PM',
    endTime: '16:30 PM',
    timezone: 'UTC+07:00',
    location: 'Khách sạn Crowne Plaza, Số 36 Lê Đức Thọ, Hà Nội',
    locationName: 'Khách sạn Crowne Plaza',
    address: 'Số 36 Lê Đức Thọ, Quận Nam Từ Liêm, Hà Nội',
    registrationStatus: 'UPCOMING',
    price: 'Miễn phí',
    overview:
      'Chương trình chia sẻ cách thiết kế gói bao bì ESD đúng chuẩn, giảm lỗi vận chuyển và tối ưu hiệu quả chi phí cho chuỗi cung ứng điện tử.',
    highlights: [
      'Hiểu cách chọn bao bì ESD theo từng loại linh kiện',
      'Xem demo vật tư và cấu hình đóng gói thực tế',
      'Trao đổi trực tiếp với đội ngũ kỹ thuật ULink',
      'Kết nối với các bộ phận mua hàng và QA/QC'
    ],
    agenda: [
      {
        time: '13:30 - 14:00',
        title: 'Đón khách và check-in',
        description: 'Nhận tài liệu, name tag và thông tin khu trưng bày.'
      },
      {
        time: '14:00 - 14:35',
        title: 'Chiến lược bao bì ESD cho chuỗi cung ứng điện tử',
        description: 'Phân tích các lỗi thường gặp và cách thiết kế gói đóng gói chuẩn xuất khẩu.'
      },
      {
        time: '14:35 - 15:15',
        title: 'Demo vật tư và case thực tế',
        description: 'Trình bày các cấu hình bao bì chống tĩnh điện đang dùng tại nhà máy.'
      },
      {
        time: '15:15 - 15:45',
        title: 'Giao lưu, hỏi đáp',
        description: 'Giải đáp tình huống kỹ thuật và nhu cầu tùy chỉnh của doanh nghiệp.'
      }
    ],
    speakers: [
      {
        name: 'Ông Phạm Quốc Nam',
        title: 'Giám đốc chuỗi cung ứng',
        company: 'ULink Industries',
        bio: 'Phụ trách các giải pháp đóng gói, lưu kho và vận chuyển cho ngành điện tử.',
        avatar: '/images/resources/events/eventDetails/speaker (4).png'
      },
      {
        name: 'Bà Nguyễn Thảo Vy',
        title: 'Chuyên gia vật tư ESD',
        company: 'ULink Industries',
        bio: 'Nghiên cứu và triển khai các dòng bao bì chống tĩnh điện, chống ẩm và tối ưu chi phí.',
        avatar: '/images/resources/events/eventDetails/speaker (5).png'
      },
      {
        name: 'Ông Lâm Hoàng Sơn',
        title: 'Chuyên gia đánh giá ESD',
        company: 'SafeTech Vietnam',
        bio: 'Chuyên gia đánh giá tiêu chuẩn chống tĩnh điện chuẩn ANSI/ESD S20.20 quốc tế cho các nhà máy.',
        avatar: '/images/resources/events/eventDetails/speaker (3).png'
      }
    ],
    hosts: [
      {
        name: 'Ông Nguyễn Văn Thành',
        title: 'Technical Support Lead',
        company: 'ULink Industries',
        bio: 'Chuyên gia hỗ trợ kỹ thuật và đánh giá giải pháp phòng sạch, chống tĩnh điện cho nhà máy.',
        avatar: '/images/resources/events/eventDetails/speaker (6).png'
      },
      {
        name: 'Bà Đặng Minh Hằng',
        title: 'Customer Relations Manager',
        company: 'ULink Industries',
        bio: 'Phụ trách chăm sóc khách hàng và điều phối các sự kiện kết nối doanh nghiệp B2B tại ULink.',
        avatar: '/images/resources/events/eventDetails/speaker (5).png'
      },
      {
        name: 'Bà Vũ Thùy Linh',
        title: 'PR & Event Specialist',
        company: 'ULink Industries',
        bio: 'Chuyên viên truyền thông và tổ chức sự kiện, hỗ trợ dẫn dắt kết nối tại triển lãm.',
        avatar: '/images/resources/events/eventDetails/speaker (2).png'
      }
    ],
    sponsors: [
      'SmartFinder',
      'kontrastr'
    ],
    benefits: [
      'Nắm được cách chọn bao bì ESD đúng cho từng loại linh kiện',
      'Nhận bảng tham khảo cấu hình gói đóng gói phổ biến',
      'Trao đổi với đội ngũ kỹ thuật về bài toán xuất khẩu',
      'Xem demo trực tiếp vật tư và vật liệu đóng gói'
    ],
    organizer: {
      name: 'ULink Industries',
      description:
        'Sự kiện dành cho khách hàng điện tử, tập trung vào giải pháp bao bì ESD và tối ưu chuỗi cung ứng.',
      contact: 'contact@ulinkindustries.com',
      logo: '/images/logo/image.png',
      role: 'Đơn vị tổ chức'
    }
  },
  'ev-003': {
    slug: 'ev-003',
    title: 'Workshop trực tuyến: chọn vật tư phòng sạch phù hợp cho dây chuyền xuất khẩu 2026',
    summary:
      'Workshop thực chiến về cách chọn găng tay, khẩu trang, khăn lau và vật tư đóng gói cho dây chuyền xuất khẩu.',
    image: '/images/home/section2/solution-packaging.webp',
    images: [
      '/images/resources/events/seminar-room.webp',
      '/images/resources/events/event (3).png'
    ],
    date: 'Thứ Hai, 05 tháng 10, 2026',
    time: '08:30 - 17:00',
    startTime: '08:30 AM',
    endTime: '17:00 PM',
    timezone: 'UTC+07:00',
    location: 'Văn phòng đại diện ULink, Quận 1, TP. Hồ Chí Minh',
    locationName: 'Văn phòng đại diện ULink',
    address: 'Quận 1, TP. Hồ Chí Minh',
    registrationStatus: 'UPCOMING',
    price: 'Miễn phí',
    overview:
      'Workshop chia sẻ cách chọn vật tư phòng sạch theo từng công đoạn sản xuất để giữ ổn định chất lượng đầu ra và giảm lỗi trong chuỗi xuất khẩu.',
    highlights: [
      'Nắm được quy trình chọn vật tư theo từng công đoạn',
      'Nhận checklist dùng trong xưởng và kho xuất hàng',
      'Hỏi đáp trực tiếp với chuyên gia ứng dụng',
      'Kết nối với các bộ phận mua hàng và QA/QC'
    ],
    agenda: [
      {
        time: '08:00 - 08:30',
        title: 'Đón khách và giới thiệu chương trình',
        description: 'Tổng quan nội dung workshop và mục tiêu ứng dụng thực tế.'
      },
      {
        time: '08:30 - 09:20',
        title: 'Chọn vật tư phòng sạch cho dải xuất khẩu',
        description: 'Cách chọn găng tay, khẩu trang, khăn lau và bao bì theo nhu cầu nhà máy.'
      },
      {
        time: '09:20 - 10:00',
        title: 'Bài học từ các dây chuyền thực tế',
        description: 'Chia sẻ các case triển khai và lỗi phổ biến khi chọn sai vật tư.'
      },
      {
        time: '10:00 - 10:30',
        title: 'Q&A',
        description: 'Trao đổi trực tiếp với đội ngũ ULink về bài toán vật tư phòng sạch.'
      }
    ],
    speakers: [
      {
        name: 'Ông Trần Văn Đức',
        title: 'Trưởng nhóm kỹ thuật',
        company: 'ULink Industries',
        bio: 'Phụ trách đào tạo và tư vấn giải pháp vật tư phòng sạch cho khách hàng xuất khẩu.',
        avatar: '/images/resources/events/eventDetails/speaker (4).png'
      },
      {
        name: 'Bà Lê Thu Hằng',
        title: 'Chuyên gia ứng dụng',
        company: 'ULink Industries',
        bio: 'Có kinh nghiệm tư vấn cấu hình vật tư cho sản xuất điện tử và logistics.',
        avatar: '/images/resources/events/eventDetails/speaker (2).png'
      },
      {
        name: 'Ông Đỗ Minh Quân',
        title: 'Supply Chain Director',
        company: 'Global Logistics Group',
        bio: 'Chuyên gia tối ưu hóa quy trình cung ứng vật tư phòng sạch cho các nhà máy xuất khẩu lớn.',
        avatar: '/images/resources/events/eventDetails/speaker (3).png'
      }
    ],
    hosts: [
      {
        name: 'Bà Hoàng Kim Chi',
        title: 'Event Coordinator',
        company: 'ULink Industries',
        bio: 'Điều phối viên các chương trình đào tạo trực tuyến và hội thảo kỹ thuật tại ULink.',
        avatar: '/images/resources/events/eventDetails/speaker (5).png'
      },
      {
        name: 'Ông Vũ Đức Huy',
        title: 'QA Specialist',
        company: 'ULink Industries',
        bio: 'Chuyên viên đảm bảo chất lượng, hỗ trợ giải đáp quy chuẩn phòng sạch trong workshop.',
        avatar: '/images/resources/events/eventDetails/speaker (6).png'
      },
      {
        name: 'Bà Nguyễn Khánh Vy',
        title: 'Customer Relations Rep',
        company: 'ULink Industries',
        bio: 'Đại diện chăm sóc khách hàng doanh nghiệp, hỗ trợ giải đáp chính sách dịch vụ tại workshop.',
        avatar: '/images/resources/events/eventDetails/speaker (1).png'
      }
    ],
    sponsors: [],
    benefits: [
      'Biết cách chọn vật tư đúng cho từng công đoạn',
      'Có checklist áp dụng cho nhà máy và kho xuất hàng',
      'Trao đổi trực tiếp với chuyên gia ứng dụng',
      'Kết nối với bộ phận mua hàng và QA/QC'
    ],
    organizer: {
      name: 'ULink Industries',
      description: 'Workshop thực chiến về lựa chọn vật tư phòng sạch cho dây chuyền xuất khẩu.',
      contact: 'contact@ulinkindustries.com',
      logo: '/images/logo/image.png',
      role: 'Đơn vị tổ chức'
    }
  }
};

export function getEventDetailBySlug(slug: string) {
  return EVENT_DETAILS[slug.toLowerCase()] ?? null;
}

export function getEventRegisterLink(slug: string) {
  return `/resources/events/${slug.toLowerCase()}/register`;
}
