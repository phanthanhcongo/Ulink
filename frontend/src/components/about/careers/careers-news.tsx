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
    <section className="py-12 lg:py-16">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-10">
        <span className="text-[13px] sm:text-[14px] lg:text-[16px] font-bold uppercase tracking-wider text-blue-600">
          Cập nhật mới nhất
        </span>
        <h2 className="text-[30px] sm:text-[38px] md:text-[44px] lg:text-[50px] xl:text-[52px] font-extrabold tracking-tight text-slate-900 mt-1">
          Tin tức & Sự kiện
        </h2>
        <p className="mt-2 text-[13px] sm:text-[14px] text-slate-500 max-w-xl">
          Cập nhật các hoạt động sản xuất, kinh doanh và hợp tác quốc tế của ULink Industries
        </p>
      </div>

      {/* Top Block: Featured News (2 columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left: Image */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[3px] shadow-md bg-slate-100">
          <Image
            src={featuredNews.image}
            alt={featuredNews.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-102"
            priority
          />
        </div>

        {/* Right: Details */}
        <div className="flex flex-col gap-3">
          <span className="text-[13px] sm:text-[14px] text-slate-400 font-medium">
            {featuredNews.date}
          </span>
          <h3 className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] font-bold text-slate-900 leading-snug">
            {featuredNews.title}
          </h3>
          <p className="text-[13px] sm:text-[14px] leading-relaxed text-slate-500">
            {featuredNews.excerpt}
          </p>
          <Link
            href="/about/news"
            className="inline-flex items-center gap-3 rounded-[3px] bg-blue-600 px-5 py-2.5 text-[13px] sm:text-[14px] font-semibold text-white transition-colors hover:bg-blue-700 w-fit mt-3 shadow-xs"
          >
            <span>Đọc thêm</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-blue-600">
              <ArrowRight className="h-3 w-3" />
            </span>
          </Link>
        </div>
      </div>

      {/* Horizontal Divider */}
      <div className="border-t border-slate-200/60 my-10" />

      {/* Bottom Block: 3 columns of news cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {newsList.map((item) => (
          <div key={item.id} className="flex flex-col gap-3 group">
            {/* Image */}
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[3px] bg-slate-100 shadow-xs">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            {/* Details */}
            <div className="flex flex-col flex-1 gap-2">
              <span className="text-[13px] sm:text-[14px] text-slate-400 font-medium mt-1">
                {item.date}
              </span>
              <h4 className="text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px] xl:text-[20px] font-semibold text-slate-800 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
                {item.title}
              </h4>
              <p className="text-[13px] sm:text-[14px] text-slate-500 leading-relaxed line-clamp-3">
                {item.excerpt}
              </p>
              <Link
                href={`/about/news/${item.id}`}
                className="text-[13px] sm:text-[14px] font-bold text-blue-600 hover:text-blue-700 inline-flex items-center mt-auto pt-2"
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

