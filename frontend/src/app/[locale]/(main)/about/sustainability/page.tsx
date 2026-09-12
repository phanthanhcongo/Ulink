import { setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { 
  Download, 
  ArrowRight, 
  Leaf, 
  Users, 
  Scale, 
  Quote, 
  TrendingDown, 
  TrendingUp,
  RefreshCw, 
  User,
  Zap,
  Globe,
  Sprout
} from 'lucide-react';
import { AboutBreadcrumb } from '@/components/layout/about-breadcrumb';
import { ASSETS } from '@/lib/assets';
import { AboutContact } from '@/components/about/about-contact';

// Data Dictionary for Internationalization
const DICTIONARY = {
  vi: {
    hero: {
      eyebrow: "PHÁT TRIỂN BỀN VỮNG",
      title: "Tạo giá trị bền vững, kiến tạo tương lai.",
      desc: "Tại nhà máy màng quấn pallet Hà Nam, phát triển bền vững là nền tảng cho mọi quyết định. Chúng tôi cam kết giảm thiểu tác động đến môi trường, đóng góp tích cực cho xã hội và vận hành minh bạch, có trách nhiệm.",
      btn: "Tải báo cáo phát triển bền vững 2025"
    },
    esgStats: {
      eyebrow: "CHỈ SỐ HIỆU QUẢ ESG",
      title: "Dấu ấn bền vững 2023",
      download: "Xem tất cả chỉ số",
      items: [
        { value: "-32%", sub: "so với 2022", label: "Giảm phát thải CO₂", isDown: true },
        { value: "78%", sub: "tổng năng lượng", label: "Năng lượng tái tạo", isDown: false },
        { value: "95%", sub: "tổng chất thải", label: "Tái chế chất thải", isDown: false },
        { value: "45%", sub: "so với 2022", label: "Tiết kiệm nước", isDown: true }
      ]
    },
    framework: {
      eyebrow: "KHUNG TIÊU CHUẨN ESG",
      title: "Cam kết hành động của ULink",
      cards: [
        {
          title: "MÔI TRƯỜNG",
          iconType: "env",
          bullets: [
            "Tối ưu hóa sử dụng năng lượng",
            "Ứng dụng công nghệ xanh trong sản xuất màng quấn",
            "Quản lý chất thải theo hướng tuần hoàn bền vững",
            "Bảo tồn tài nguyên thiên nhiên & giảm nhựa nguyên sinh"
          ],
          linkText: "Xem chi tiết"
        },
        {
          title: "XÃ HỘI",
          iconType: "social",
          bullets: [
            "Đảm bảo sức khỏe & an toàn lao động tuyệt đối",
            "Phát triển năng lực & mở rộng cơ hội nghề nghiệp",
            "Xây dựng môi trường làm việc đa dạng & hòa nhập",
            "Đóng góp tích cực cho cộng đồng địa phương Hà Nam"
          ],
          linkText: "Xem chi tiết"
        },
        {
          title: "QUẢN TRỊ",
          iconType: "gov",
          bullets: [
            "Quản trị doanh nghiệp minh bạch và thượng tôn pháp luật",
            "Tuân thủ nghiêm túc các chuẩn mực quốc tế",
            "Quản lý rủi ro toàn diện & cải tiến hiệu suất liên tục",
            "Xây dựng chuỗi cung ứng có trách nhiệm với môi trường"
          ],
          linkText: "Xem chi tiết"
        }
      ],
      quote: "Chúng tôi cam kết kiến tạo giá trị bền vững thông qua quản trị trách nhiệm, đổi mới sáng tạo và hợp tác cùng các bên liên quan, vì một tương lai xanh hơn và thịnh vượng hơn.",
      author: "Ban Lãnh đạo",
      company: "Nhà máy ULink Industries Hà Nam"
    },
    sdgs: {
      eyebrow: "MỤC TIÊU PHÁT TRIỂN BỀN VỮNG",
      title: "Đồng hành cùng mục tiêu toàn cầu của Liên Hợp Quốc",
      desc: "Nhà máy màng quấn pallet Hà Nam nỗ lực đóng góp thiết thực vào các Mục tiêu Phát triển Bền vững (SDG) trọng yếu nhằm định hình nền sản xuất công nghiệp có trách nhiệm.",
      items: [
        { num: "SDG 3", label: "Sức khỏe & Hạnh phúc", icon: Sprout, iconColor: "text-[#22C55E]" },
        { num: "SDG 4", label: "Giáo dục chất lượng", icon: User, iconColor: "text-[#F97316]" },
        { num: "SDG 7", label: "Năng lượng sạch & Giá rẻ", icon: Zap, iconColor: "text-[#F59E0B]" },
        { num: "SDG 8", label: "Công việc tốt & Tăng trưởng", icon: Users, iconColor: "text-[#0F62FE]" },
        { num: "SDG 12", label: "Tiêu dùng & Sản xuất", icon: RefreshCw, iconColor: "text-[#10B981]" },
        { num: "SDG 13", label: "Hành động Khí hậu", icon: Globe, iconColor: "text-[#00A3E0]" },
        { num: "SDG 17", label: "Hợp tác vì Mục tiêu", icon: Leaf, iconColor: "text-[#22C55E]" }
      ]
    },
    contact: {
      title: "Liên hệ với chúng tôi",
      desc: "Hãy để lại thông tin của bạn và chúng tôi sẽ phản hồi trong vòng 24 giờ làm việc. Đội ngũ kinh doanh của ULINK Industries luôn sẵn sàng hỗ trợ bạn.",
      info: {
        addressLabel: "Địa chỉ",
        address: "Khu Công nghiệp Đồng Văn IV, Hà Nam, Việt Nam",
        emailLabel: "Email",
        email: "contact@ulinkindustries.com",
        phoneLabel: "Số điện thoại",
        phone: "0247.309.9899",
        hoursLabel: "Giờ làm việc",
        hours: "Thứ 2 - Thứ 7: 8h00 - 17h30"
      },
      form: {
        title: "Gửi tin nhắn cho chúng tôi",
        desc: "Chúng tôi sẽ phản hồi lại bạn trong thời gian sớm nhất.",
        name: "Họ và tên",
        email: "Email",
        phone: "Số điện thoại",
        message: "Tin nhắn",
        placeholderName: "Nhập họ và tên của bạn",
        placeholderEmail: "Nhập địa chỉ email",
        placeholderPhone: "Nhập số điện thoại",
        placeholderMsg: "Viết tin nhắn của bạn tại đây...",
        submit: "Gửi đi"
      }
    }
  },
  en: {
    hero: {
      eyebrow: "SUSTAINABLE DEVELOPMENT",
      title: "Creating sustainable values, shaping the future.",
      desc: "At Ha Nam pallet stretch film factory, sustainable development is the foundation for every decision. We are committed to minimizing environmental impact, contributing positively to society, and operating transparently and responsibly.",
      btn: "Download Sustainability Report 2025"
    },
    esgStats: {
      eyebrow: "ESG PERFORMANCE INDICATORS",
      title: "Sustainability Footprint 2023",
      download: "View all indicators",
      items: [
        { value: "-32%", sub: "vs 2022", label: "CO₂ Emission Reduction", isDown: true },
        { value: "78%", sub: "total energy", label: "Renewable Energy", isDown: false },
        { value: "95%", sub: "total waste", label: "Waste Recycling", isDown: false },
        { value: "45%", sub: "vs 2022", label: "Water Saving", isDown: true }
      ]
    },
    framework: {
      eyebrow: "ESG STANDARD FRAMEWORK",
      title: "ULink's Commitment to Action",
      cards: [
        {
          title: "ENVIRONMENTAL",
          iconType: "env",
          bullets: [
            "Optimizing energy consumption",
            "Applying green technology in stretch film production",
            "Managing waste towards sustainable circular economy",
            "Preserving natural resources & reducing virgin plastic"
          ],
          linkText: "View details"
        },
        {
          title: "SOCIAL",
          iconType: "social",
          bullets: [
            "Ensuring absolute occupational health & safety",
            "Developing capacity & expanding career opportunities",
            "Building a diverse & inclusive work environment",
            "Actively contributing to Ha Nam local community"
          ],
          linkText: "View details"
        },
        {
          title: "GOVERNANCE",
          iconType: "gov",
          bullets: [
            "Transparent corporate governance & rule of law",
            "Strictly complying with international standards",
            "Comprehensive risk management & continuous performance improvement",
            "Building an environmentally responsible supply chain"
          ],
          linkText: "View details"
        }
      ],
      quote: "We are committed to creating sustainable value through responsible governance, innovation, and collaboration with stakeholders, for a greener and more prosperous future.",
      author: "Board of Management",
      company: "ULink Industries Ha Nam Factory"
    },
    sdgs: {
      eyebrow: "SUSTAINABLE DEVELOPMENT GOALS",
      title: "Accompanying the United Nations Global Goals",
      desc: "Ha Nam pallet stretch film factory strives to make practical contributions to key Sustainable Development Goals (SDGs) to shape responsible industrial manufacturing.",
      items: [
        { num: "SDG 3", label: "Good Health & Well-being", icon: Sprout, iconColor: "text-[#22C55E]" },
        { num: "SDG 4", label: "Quality Education", icon: User, iconColor: "text-[#F97316]" },
        { num: "SDG 7", label: "Affordable & Clean Energy", icon: Zap, iconColor: "text-[#F59E0B]" },
        { num: "SDG 8", label: "Decent Work & Growth", icon: Users, iconColor: "text-[#0F62FE]" },
        { num: "SDG 12", label: "Responsible Consumption", icon: RefreshCw, iconColor: "text-[#10B981]" },
        { num: "SDG 13", label: "Climate Action", icon: Globe, iconColor: "text-[#00A3E0]" },
        { num: "SDG 17", label: "Partnerships for Goals", icon: Leaf, iconColor: "text-[#22C55E]" }
      ]
    },
    contact: {
      title: "Contact Us",
      desc: "Please leave your information and we will respond within 24 working hours. ULINK Industries' sales team is always ready to support you.",
      info: {
        addressLabel: "Address",
        address: "Dong Van IV Industrial Park, Ha Nam, Vietnam",
        emailLabel: "Email",
        email: "contact@ulinkindustries.com",
        phoneLabel: "Phone",
        phone: "0247.309.9899",
        hoursLabel: "Working Hours",
        hours: "Mon - Sat: 08:00 - 17:30"
      },
      form: {
        title: "Send Us a Message",
        desc: "We will respond to your information as soon as possible.",
        name: "Full name",
        email: "Email",
        phone: "Phone number",
        message: "Message",
        placeholderName: "Enter your full name",
        placeholderEmail: "Enter your email address",
        placeholderPhone: "Enter your phone number",
        placeholderMsg: "Write your message here...",
        submit: "Send Message"
      }
    }
  }
};

export default async function AboutSustainabilityPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const isVi = locale === 'vi';
  const t = isVi ? DICTIONARY.vi : DICTIONARY.en;

  return (
    <div className="w-full bg-white font-sans antialiased text-[#141414]">
      
      {/* 1. HERO SECTION & BREADCRUMB */}
      <section className="bg-white py-4 sm:py-8 lg:py-12 border-b border-slate-100">
        <div className="page-container">
          <AboutBreadcrumb />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-12 items-center mt-2 sm:mt-4 lg:mt-6">
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <span className="text-xs sm:text-sm font-semibold text-[#22C55E] tracking-tight uppercase">
                {t.hero.eyebrow}
              </span>
              <h1 className="text-xl sm:text-4xl lg:text-[48px] lg:leading-[56px] font-bold text-[#001D6C] mt-1.5 sm:mt-3 mb-2 sm:mb-4 tracking-[-0.0208em]">
                {t.hero.title}
              </h1>
              <p className="text-xs sm:text-base lg:text-[18px] lg:leading-[28px] text-[#495057] max-w-2xl font-normal mb-4 sm:mb-8 leading-relaxed">
                {t.hero.desc}
              </p>

              <Link
                href="/about/sustainability"
                className="inline-flex h-9 sm:h-[46px] items-center justify-center gap-2 rounded-[4px] bg-[#0F62FE] px-4 sm:px-6 text-xs sm:text-[15px] font-semibold text-white shadow-sm transition-all hover:bg-[#0043CE] active:bg-[#002D9C]"
              >
                <Download className="h-3.5 w-3.5 sm:h-4.5 sm:w-4.5" />
                {t.hero.btn}
              </Link>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-5 relative w-full h-[180px] sm:h-[300px] lg:h-[380px] rounded-[3px] overflow-hidden border border-slate-100 shadow-md">
              <Image
                src={ASSETS.about.heroWarehouse}
                alt="ULINK Sustainability Warehouse"
                fill
                priority
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. ESG PERFORMANCE INDICATORS */}
      <section className="bg-[#F5F8FC] py-4 sm:py-14 lg:py-16 border-b border-slate-100">
        <div className="page-container">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-4 mb-3 sm:mb-10">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] sm:text-sm font-semibold text-[#22C55E] tracking-tight uppercase">
                {t.esgStats.eyebrow}
              </span>
              <h2 className="text-lg sm:text-3xl lg:text-[32px] font-bold text-[#001D6C] leading-tight">
                {t.esgStats.title}
              </h2>
            </div>
            <Link
              href="/about/sustainability"
              className="group inline-flex items-center gap-1 sm:gap-2 text-xs sm:text-[15px] font-semibold text-[#0F62FE] hover:underline transition-colors mt-1 sm:mt-0"
            >
              {t.esgStats.download}
              <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Grid Layout - 4 Stat Cards (2 per row on mobile) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5 lg:gap-4">
            {t.esgStats.items.map((item, idx) => {
              const IconComp = item.isDown ? TrendingDown : TrendingUp;

              return (
                <div 
                  key={idx} 
                  className="bg-white p-4 sm:p-6 rounded-[3px] border border-[#E2E8F0] shadow-[0px_4px_12px_0px_rgba(0,29,108,0.05)] flex flex-col items-start justify-start gap-3 lg:h-[160px] lg:w-[304px]"
                >
                  {/* Value Row */}
                  <div className="flex flex-wrap items-baseline gap-1.5 sm:gap-2">
                    <span className="text-2xl sm:text-3xl lg:text-[40px] font-bold text-[#001D6C] leading-none">
                      {item.value}
                    </span>
                    <span className="text-xs sm:text-base text-[#64748B]">
                      {item.sub}
                    </span>
                  </div>

                  {/* Label Row directly below Value Row with 12px gap */}
                  <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-base font-bold text-[#001D6C]">
                    <span className="truncate">{item.label}</span>
                    <IconComp className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#001D6C] shrink-0" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. ESG STANDARD FRAMEWORK */}
      <section className="bg-white py-4 sm:py-14 lg:py-20 border-b border-slate-100">
        <div className="page-container">
          <div className="flex flex-col gap-1 mb-3 sm:mb-10">
            <span className="text-[11px] sm:text-sm font-semibold text-[#22C55E] tracking-tight uppercase">
              {t.framework.eyebrow}
            </span>
            <h2 className="text-lg sm:text-3xl lg:text-[38px] lg:leading-[46px] font-bold text-[#001D6C]">
              {t.framework.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {t.framework.cards.map((card, idx) => {
              let Icon = Leaf;
              if (card.iconType === "social") {
                Icon = Users;
              } else if (card.iconType === "gov") {
                Icon = Scale;
              }

              return (
                <div 
                  key={idx} 
                  className="bg-[#F5F8FC] p-4 sm:p-8 rounded-[3px] flex flex-col justify-between h-auto min-h-0 lg:h-[420px] transition-all hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-6">
                      <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-[#001D6C] shrink-0" />
                      <h3 className="text-sm sm:text-lg lg:text-xl font-bold text-[#001D6C]">
                        {card.title}
                      </h3>
                    </div>

                    <ul className="space-y-1.5 sm:space-y-3">
                      {card.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="text-xs sm:text-base text-[#495057] leading-relaxed flex items-start gap-1.5 sm:gap-2">
                          <span className="text-[#001D6C] font-bold shrink-0">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href="/about/sustainability"
                    className="group inline-flex items-center gap-1 sm:gap-1.5 text-xs sm:text-[15px] font-semibold text-[#0F62FE] hover:underline mt-3 sm:mt-6"
                  >
                    {card.linkText}
                    <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              );
            })}

            {/* Dark Navy Quote Card */}
            <div className="bg-[#001D6C] p-4 sm:p-8 rounded-[3px] text-white flex flex-col justify-between h-auto min-h-0 lg:h-[420px] shadow-sm relative overflow-hidden">
              <Quote className="h-6 w-6 sm:h-12 sm:w-12 text-[#22C55E] shrink-0 mb-2 sm:mb-0" />

              <p className="text-xs sm:text-sm lg:text-base leading-relaxed italic text-white/95 my-auto font-normal">
                &ldquo;{t.framework.quote}&rdquo;
              </p>

              <div className="border-t border-white/20 pt-2.5 sm:pt-4 mt-3 sm:mt-4">
                <p className="text-xs sm:text-base font-bold text-white uppercase tracking-wide">
                  {t.framework.author}
                </p>
                <p className="text-[10px] sm:text-xs text-white/80 font-normal mt-0.5">
                  {t.framework.company}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. UN SDGs PARTNERSHIP (Exact Figma: 80px padding, 48px gap, 420px left col, 180x180px cards, matching icon colors) */}
      <section className="bg-[#F5F8FC] py-8 sm:py-14 lg:py-20 border-b border-slate-100">
        <div className="page-container">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 sm:gap-8 lg:gap-[48px]">
            {/* Left Content Column (420px fixed on desktop) */}
            <div className="w-full lg:w-[420px] shrink-0 flex flex-col items-start justify-center">
              <div className="flex flex-col gap-1 mb-2 sm:mb-4">
                <span className="text-[11px] sm:text-sm font-semibold text-[#22C55E] tracking-tight uppercase">
                  {t.sdgs.eyebrow}
                </span>
                <h2 className="text-lg sm:text-3xl lg:text-[38px] lg:leading-[46px] font-bold text-[#001D6C] tracking-tight">
                  {t.sdgs.title}
                </h2>
              </div>
              <p className="text-xs sm:text-base lg:text-[18px] lg:leading-[28px] text-[#495057] font-normal leading-relaxed">
                {t.sdgs.desc}
              </p>
            </div>

            {/* Right SDGs Grid - 7 Cards (Optimized height ~156px) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 flex-1">
              {t.sdgs.items.map((sdg, idx) => {
                const Icon = sdg.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white p-4 sm:p-4 rounded-[3px] border border-[#CAD5E2] shadow-none flex flex-col items-start justify-start gap-2.5 sm:gap-3 min-h-[135px] sm:min-h-[156px] lg:h-[156px] lg:w-[180px] transition-all hover:border-[#0F62FE]"
                  >
                    <Icon className={`h-7 w-7 sm:h-8 sm:w-8 ${sdg.iconColor} shrink-0`} />
                    <div>
                      <p className="text-xs sm:text-base font-bold text-[#001D6C] leading-snug">
                        {sdg.num}
                      </p>
                      <p className="text-[11px] sm:text-sm text-[#495057] leading-snug mt-1 font-normal">
                        {sdg.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 5. CONTACT US SECTION (Replacing with home page contact section) */}
      <AboutContact />

    </div>
  );
}
