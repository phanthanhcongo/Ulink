import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const featuredNews = {
  date: '15/07/2026',
  title: 'ULink Industries ký kết hợp tác chiến lược với tập đoàn Bosch về cung cấp linh kiện công nghiệp',
  excerpt:
    'Thỏa thuận hợp tác kéo dài 5 năm, mở ra cơ hội xuất khẩu linh kiện chính xác cao sang thị trường châu Âu và nâng cao năng lực sản xuất theo tiêu chuẩn quốc tế.',
  image: '/images/Career/career (11).png'
};

const newsList = [
  {
    id: '1',
    date: '28/06/2026',
    title: 'ULink Industries đạt chứng nhận ISO 14001:2015 về quản lý môi trường',
    excerpt:
      'Chứng nhận khẳng định cam kết của ULink Industries trong việc phát triển bền vững và bảo vệ môi trường cho nhà máy sản xuất Bao bì ...',
    image: '/images/Career/career (6).png'
  },
  {
    id: '2',
    date: '10/06/2026',
    title: 'Khánh thành nhà máy sản xuất mới tại KCN Bình Dương với công suất gấp 3 lần',
    excerpt:
      'Nhà máy mới được trang bị dây chuyền tự động hóa hiện đại, nâng tổng công suất sản xuất lên 150.000 đơn vị/tháng...',
    image: '/images/Career/career (7).png'
  },
  {
    id: '3',
    date: '22/05/2026',
    title: 'ULink Industries tham gia Triển lãm Công nghiệp & Sản xuất Việt Nam 2026',
    excerpt:
      'Gian hàng ULink Industries thu hút hơn 500 khách tham quan, giới thiệu các giải pháp phòng sạch và bao bì đóng gói công nghiệp...',
    image: '/images/Career/career (8).png'
  }
];

export function CareersNews() {
  return (
    <section className="py-4 sm:py-6 lg:py-8">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-6 sm:mb-8 lg:mb-10">
        <span className="text-[#1769E2] font-semibold text-xl lg:text-[28px] leading-tight lg:leading-[36px] uppercase tracking-wider">
          Cập nhật mới nhất
        </span>
        <h2 className="text-[#263A4D] font-bold text-2xl sm:text-3xl lg:text-[38px] leading-tight lg:leading-[46px] tracking-tight mt-1">
          Tin tức & Sự kiện
        </h2>
        <p className="mt-2 text-[#7F878F] font-normal text-base lg:text-[16px] leading-[24px] max-w-3xl">
          Cập nhật các hoạt động sản xuất, kinh doanh và hợp tác quốc tế của ULink Industries
        </p>
      </div>

      {/* Top Block: Featured News (2 columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-center">
        {/* Left: Image */}
        <div className="group relative aspect-[16/10] w-full overflow-hidden rounded-[2px] shadow-md bg-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-1 hover:ring-[#1769E2] cursor-pointer">
          <Image
            src={featuredNews.image}
            alt={featuredNews.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            priority
          />
        </div>

        {/* Right: Details */}
        <div className="flex flex-col gap-3">
          <span className="text-[#5E6368] font-normal text-sm lg:text-[14px] leading-[20px]">
            {featuredNews.date}
          </span>
          <h3 className="text-[#303235] font-semibold text-lg lg:text-[20px] leading-[28px]">
            {featuredNews.title}
          </h3>
          <p className="text-[#303235] font-normal text-base lg:text-[16px] leading-[24px]">
            {featuredNews.excerpt}
          </p>
          <Link
            href="/about/news"
            className="inline-flex items-center gap-3 rounded-[3px] bg-[#023DA0] px-5 py-2.5 text-white font-semibold text-sm lg:text-[14px] transition-colors hover:bg-[#002B73] w-fit mt-3 shadow-xs"
          >
            <span>Đọc thêm</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#023DA0]">
              <ArrowRight className="h-3 w-3" />
            </span>
          </Link>
        </div>
      </div>

      {/* Horizontal Divider */}
      <div className="border-t border-slate-200/60 my-10" />

      {/* Bottom Block: 3 columns of news cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {newsList.map((item) => (
          <div key={item.id} className="flex flex-col gap-3 group">
            {/* Image */}
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[2px] bg-slate-100 shadow-xs transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:ring-1 group-hover:ring-[#1769E2] cursor-pointer">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            {/* Details */}
            <div className="flex flex-col flex-1 gap-2">
              <span className="text-[#5E6368] font-normal text-sm lg:text-[14px] mt-1">
                {item.date}
              </span>
              <h4 className="text-[#303235] font-semibold text-base lg:text-[16px] leading-[24px] line-clamp-2 group-hover:text-[#1769E2] transition-colors">
                {item.title}
              </h4>
              <p className="text-[#5E6368] font-normal text-sm lg:text-[14px] leading-[20px] line-clamp-3">
                {item.excerpt}
              </p>
              <Link
                href={`/about/news/${item.id}`}
                className="text-[#1769E2] font-semibold text-sm lg:text-[14px] hover:text-[#1257BD] inline-flex items-center mt-auto pt-2"
              >
                Đọc thêm
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

