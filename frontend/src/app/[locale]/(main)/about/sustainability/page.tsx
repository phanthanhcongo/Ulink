import { setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { 
  FileText, 
  ArrowRight, 
  Leaf, 
  Users, 
  Scale, 
  Quote, 
  TrendingDown, 
  RefreshCw, 
  Droplet,
  Heart,
  GraduationCap,
  Zap,
  Briefcase,
  Globe,
  Handshake,
  MapPin,
  Mail,
  Phone,
  Clock
} from 'lucide-react';
import { AboutBreadcrumb } from '@/components/layout/about-breadcrumb';
import { ASSETS } from '@/lib/assets';
import { SustainabilityContact } from '@/components/about/sustainability-contact';

// Data Dictionary for Internationalization
const DICTIONARY = {
  vi: {
    hero: {
      eyebrow: "PHÁT TRIỂN BỀN VỮNG",
      title: "Tạo giá trị bền vững, kiến tạo tương lai.",
      desc: "Từ nhà máy sản xuất tại Việt Nam, như một cam kết vững chắc cho mọi quyết định. ULINK cam kết giảm thiểu tác động đến môi trường, đóng góp tích cực cho xã hội và vận hành minh bạch, có trách nhiệm.",
      btn: "Tải báo cáo phát triển bền vững 2023"
    },
    esgStats: {
      eyebrow: "CHỈ SỐ HIỆU QUẢ ESG",
      title: "Dấu ấn bền vững 2023",
      download: "Tải báo cáo tóm tắt",
      items: [
        { value: "-32%", sub: "vs với 2022", label: "Giảm phát thải CO2", iconType: "co2" },
        { value: "78%", sub: "tổng sản lượng", label: "Năng lượng tái tạo", iconType: "energy" },
        { value: "95%", sub: "nguyên liệu", label: "Tái chế chất thải", iconType: "recycle" },
        { value: "45%", sub: "so với 2022", label: "Tiết kiệm nước", iconType: "water" }
      ]
    },
    framework: {
      eyebrow: "KHUNG TIÊU CHUẨN ESG",
      title: "Cam kết hành động của ULink",
      cards: [
        {
          title: "VỚI MÔI TRƯỜNG",
          iconType: "env",
          bullets: [
            "Cam kết bảo vệ môi trường",
            "Ứng dụng công nghệ sạch trong sản xuất, đóng gói",
            "Quản lý chất thải theo hướng tuần hoàn bền vững",
            "Bảo tồn tài nguyên thiên nhiên & giảm thiểu nguồn nước"
          ],
          linkText: "Xem chi tiết"
        },
        {
          title: "XÃ HỘI",
          iconType: "social",
          bullets: [
            "Đảm bảo an toàn sức khỏe lao động và cộng đồng",
            "Phát triển nguồn nhân lực & duy trì phúc lợi nghề nghiệp",
            "Xây dựng môi trường làm việc đa dạng & hoà nhập",
            "Đóng góp tích cực cho cộng đồng thông qua các hoạt động an sinh"
          ],
          linkText: "Xem chi tiết"
        },
        {
          title: "QUẢN TRỊ",
          iconType: "gov",
          bullets: [
            "Quản trị doanh nghiệp minh bạch và tuân thủ các chuẩn mực đạo đức",
            "Đảm bảo quyền lợi của đối tác & quyền lợi nhà đầu tư",
            "Quản trị rủi ro toàn diện và liên tục giám sát chất lượng",
            "Xây dựng văn hoá ứng xử, trách nhiệm xã hội và môi trường"
          ],
          linkText: "Xem chi tiết"
        }
      ],
      quote: "Chúng tôi cam kết thúc đẩy việc thực hành bền vững thông qua sự tích hợp các chỉ tiêu ESG vào trong hoạt động kinh doanh hàng ngày, hướng tới tương lai phát triển bền vững cùng các đối tác.",
      author: "Ban Lãnh đạo",
      company: "ULINK Industries Việt Nam"
    },
    sdgs: {
      eyebrow: "MỤC TIÊU PHÁT TRIỂN BỀN VỮNG",
      title: "Đồng hành cùng mục tiêu toàn cầu của Liên Hợp Quốc",
      desc: "ULINK tự hào góp phần thực hiện các mục tiêu phát triển bền vững (SDGs) trọng tâm, hướng đến tương lai xanh và công nghiệp có trách nhiệm.",
      items: [
        { num: "SDG 3", label: "Sức khỏe & Hạnh phúc", icon: Leaf, color: "text-emerald-500" },
        { num: "SDG 4", label: "Giáo dục chất lượng", icon: Users, color: "text-orange-500" },
        { num: "SDG 7", label: "Năng lượng sạch, giá rẻ", icon: Zap, color: "text-amber-500" },
        { num: "SDG 8", label: "Công việc tốt & Tăng trưởng", icon: Users, color: "text-blue-600" },
        { num: "SDG 12", numColor: "text-teal-600", label: "Tiêu dùng & Sản xuất", icon: RefreshCw, color: "text-teal-500" },
        { num: "SDG 13", label: "Hành động khí hậu", icon: Globe, color: "text-blue-500" },
        { num: "SDG 17", label: "Hợp tác vì mục tiêu", icon: Leaf, color: "text-green-500" }
      ]
    },
    contact: {
      title: "Liên hệ với chúng tôi",
      desc: "Hãy để lại thông tin của bạn và chúng tôi sẽ phản hồi trong vòng 24h làm việc. Đội ngũ kinh doanh của ULINK Industries luôn sẵn sàng hỗ trợ bạn.",
      info: {
        addressLabel: "Địa chỉ",
        address: "Khu Công nghiệp Đông Văn, Hà Nam, Việt Nam",
        emailLabel: "Email",
        email: "CONTACT@ULINKIND.COM",
        phoneLabel: "Số điện thoại",
        phone: "024 7308 8889",
        hoursLabel: "Giờ làm việc",
        hours: "T2-T6: 08:00 - 17:00"
      },
      form: {
        title: "Gửi tin nhắn cho chúng tôi",
        desc: "Chúng tôi sẽ phản hồi thông tin sớm nhất đến bạn.",
        name: "Họ và tên",
        email: "Email",
        phone: "Số điện thoại",
        message: "Tin nhắn",
        placeholderName: "Họ và tên của bạn",
        placeholderEmail: "Địa chỉ email của bạn",
        placeholderPhone: "Số điện thoại của bạn",
        placeholderMsg: "Nhập nội dung cần gửi...",
        submit: "Gửi đi"
      }
    }
  },
  en: {
    hero: {
      eyebrow: "SUSTAINABILITY DEVELOPMENT",
      title: "Creating sustainable values, shaping the future.",
      desc: "From our factory in Vietnam, as a firm commitment for every decision. ULINK is committed to minimizing environmental impact, contributing positively to society, and operating transparently and responsibly.",
      btn: "Download Sustainability Report 2023"
    },
    esgStats: {
      eyebrow: "ESG PERFORMANCE INDICATORS",
      title: "Sustainability Footprint 2023",
      download: "Download Summary Report",
      items: [
        { value: "-32%", sub: "vs 2022", label: "CO2 Emission Reduction", iconType: "co2" },
        { value: "78%", sub: "of total volume", label: "Renewable Energy", iconType: "energy" },
        { value: "95%", sub: "raw materials", label: "Waste Recycling", iconType: "recycle" },
        { value: "45%", sub: "vs 2022", label: "Water Saving", iconType: "water" }
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
            "Commitment to environmental protection",
            "Applying clean technology in production and packaging",
            "Waste management towards sustainable circular economy",
            "Preserving natural resources & minimizing water usage"
          ],
          linkText: "View details"
        },
        {
          title: "SOCIAL",
          iconType: "social",
          bullets: [
            "Ensuring occupational health, safety and community wellbeing",
            "Developing human resources & maintaining career welfare",
            "Building a diverse & inclusive working environment",
            "Positively contributing to community through social security activities"
          ],
          linkText: "View details"
        },
        {
          title: "GOVERNANCE",
          iconType: "gov",
          bullets: [
            "Transparent corporate governance & compliance with ethical standards",
            "Ensuring benefits of partners & investors",
            "Comprehensive risk management & continuous quality monitoring",
            "Building culture of conduct, social and environmental responsibility"
          ],
          linkText: "View details"
        }
      ],
      quote: "We are committed to promoting sustainable practices through the integration of ESG criteria into our daily business operations, aiming for a sustainable future together with our partners.",
      author: "Board of Directors",
      company: "ULINK Industries Vietnam"
    },
    sdgs: {
      eyebrow: "SUSTAINABLE DEVELOPMENT GOALS",
      title: "Accompanying the United Nations Global Goals",
      desc: "ULINK is proud to contribute to the core Sustainable Development Goals (SDGs), aiming for a green future and responsible industry.",
      items: [
        { num: "SDG 3", label: "Good Health & Well-being", icon: Leaf, color: "text-emerald-500" },
        { num: "SDG 4", label: "Quality Education", icon: Users, color: "text-orange-500" },
        { num: "SDG 7", label: "Affordable & Clean Energy", icon: Zap, color: "text-amber-500" },
        { num: "SDG 8", label: "Decent Work & Economic Growth", icon: Users, color: "text-blue-600" },
        { num: "SDG 12", numColor: "text-teal-600", label: "Responsible Consumption & Production", icon: RefreshCw, color: "text-teal-500" },
        { num: "SDG 13", label: "Climate Action", icon: Globe, color: "text-blue-500" },
        { num: "SDG 17", label: "Partnerships for the Goals", icon: Leaf, color: "text-green-500" }
      ]
    },
    contact: {
      title: "Contact Us",
      desc: "Please leave your information and we will respond within 24 working hours. ULINK Industries' sales team is always ready to support you.",
      info: {
        addressLabel: "Address",
        address: "Dong Van Industrial Zone, Ha Nam, Vietnam",
        emailLabel: "Email",
        email: "CONTACT@ULINKIND.COM",
        phoneLabel: "Phone",
        phone: "024 7308 8889",
        hoursLabel: "Working Hours",
        hours: "Mon-Fri: 08:00 - 17:00"
      },
      form: {
        title: "Send Us a Message",
        desc: "We will respond to your information as soon as possible.",
        name: "Full name",
        email: "Email",
        phone: "Phone number",
        message: "Message",
        placeholderName: "Your full name",
        placeholderEmail: "Your email address",
        placeholderPhone: "Your phone number",
        placeholderMsg: "Enter message details...",
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
    <div className="w-full bg-white font-sans antialiased text-slate-800">
      
      {/* 1. HERO SECTION & BREADCRUMB */}
      <section className="bg-white py-6 md:py-10 lg:py-14 border-b border-slate-100">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16">
          <AboutBreadcrumb />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center mt-4">
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <span className="text-[13px] font-bold text-emerald-600 tracking-wider uppercase">
                {t.hero.eyebrow}
              </span>
              <h1 className="text-[28px] sm:text-[38px] lg:text-[44px] xl:text-[48px] font-extrabold text-slate-900 tracking-tight leading-[1.15] mt-2 mb-4">
                {t.hero.title}
              </h1>
              <p className="text-[14px] sm:text-[16px] leading-relaxed text-slate-500 max-w-2xl font-medium">
                {t.hero.desc}
              </p>
              
              <Link
                href="/about/sustainability"
                className="mt-6 sm:mt-8 group inline-flex h-[48px] items-center justify-center gap-2.5 rounded-[3px] bg-brand px-6 text-[14px] sm:text-[15px] font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)] hover:bg-brand-strong active:bg-[#0E4497]"
              >
                <FileText className="h-4.5 w-4.5" />
                {t.hero.btn}
              </Link>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-5 relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] rounded-[3px] overflow-hidden border border-slate-100 shadow-lg">
              <Image
                src={ASSETS.about.heroWarehouse}
                alt="ULINK Sustainability"
                fill
                priority
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. ESG PERFORMANCE INDICATORS */}
      <section className="bg-slate-50 py-12 md:py-16 border-b border-slate-100">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[12px] font-bold text-emerald-600 tracking-wider uppercase">
                {t.esgStats.eyebrow}
              </span>
              <h2 className="text-[22px] sm:text-[28px] lg:text-[32px] font-extrabold text-slate-900 mt-1">
                {t.esgStats.title}
              </h2>
            </div>
            <Link 
              href="/about/sustainability" 
              className="group inline-flex items-center gap-1 text-[13px] sm:text-[14px] font-bold text-brand hover:text-brand-strong transition-colors"
            >
              {t.esgStats.download}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.esgStats.items.map((item, idx) => {
              // Icon Renderer
              let IconComp = TrendingDown;
              let iconColor = "text-emerald-500";
              if (item.iconType === "energy") {
                IconComp = Leaf;
                iconColor = "text-green-500";
              } else if (item.iconType === "recycle") {
                IconComp = RefreshCw;
                iconColor = "text-teal-500";
              } else if (item.iconType === "water") {
                IconComp = Droplet;
                iconColor = "text-sky-500";
              }

              return (
                <div key={idx} className="bg-white p-6 rounded-[3px] border border-slate-100 shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
                  <div>
                    <div className="flex items-baseline">
                      <span className="text-[32px] sm:text-[36px] font-extrabold text-slate-900 tracking-tight">
                        {item.value}
                      </span>
                      <span className="text-[12px] text-slate-400 font-semibold ml-2">
                        {item.sub}
                      </span>
                    </div>
                    <p className="text-[14px] sm:text-[15px] font-bold text-slate-800 mt-3 flex items-center gap-1.5">
                      {item.label}
                      <IconComp className={`h-4.5 w-4.5 ${iconColor}`} />
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. ESG STANDARD FRAMEWORK */}
      <section className="bg-white py-12 md:py-16 border-b border-slate-100">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16">
          <div>
            <span className="text-[12px] font-bold text-emerald-600 tracking-wider uppercase">
              {t.framework.eyebrow}
            </span>
            <h2 className="text-[22px] sm:text-[28px] lg:text-[32px] font-extrabold text-slate-900 mt-1 mb-8">
              {t.framework.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.framework.cards.map((card, idx) => {
              let Icon = Leaf;
              let iconColor = "text-emerald-500";
              if (card.iconType === "social") {
                Icon = Users;
                iconColor = "text-brand";
              } else if (card.iconType === "gov") {
                Icon = Scale;
                iconColor = "text-slate-700";
              }

              return (
                <div key={idx} className="bg-white p-6 rounded-[3px] border border-slate-200/80 shadow-sm flex flex-col justify-between group hover:border-brand/30 hover:shadow-md transition-all duration-300">
                  <div>
                    <div className="flex items-center gap-2.5 mb-4">
                      <Icon className={`h-6 w-6 shrink-0 ${iconColor}`} />
                      <span className="text-[14px] font-bold text-slate-950 tracking-wider">
                        {card.title}
                      </span>
                    </div>

                    <ul className="space-y-3.5">
                      {card.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="text-[13px] sm:text-[14px] text-slate-500 leading-relaxed font-medium flex items-start gap-2">
                          <span className="text-emerald-600 font-bold shrink-0 mt-0.5">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link 
                    href="/about/sustainability" 
                    className="group inline-flex items-center gap-1 text-[13px] font-bold text-brand hover:text-brand-strong transition-colors mt-6"
                  >
                    {card.linkText}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              );
            })}

            {/* Dark Blue Quote Card */}
            <div className="bg-[#0B2347] p-6 rounded-[3px] text-white flex flex-col justify-between shadow-sm relative overflow-hidden">
              {/* Background Glow */}
              <div className="absolute -top-12 -right-12 h-36 w-36 rounded-full bg-brand/10 blur-2xl" />
              
              <Quote className="h-8 w-8 text-emerald-400 opacity-80 mb-4 shrink-0" />

              <p className="text-[13px] sm:text-[14px] leading-relaxed italic text-slate-200 font-medium">
                &ldquo;{t.framework.quote}&rdquo;
              </p>

              <div className="mt-6 border-t border-white/10 pt-4">
                <p className="text-[13px] font-bold text-emerald-400 uppercase tracking-wide">
                  {t.framework.author}
                </p>
                <p className="text-[12px] text-slate-300 font-medium">
                  {t.framework.company}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. UN SDGs PARTNERSHIP */}
      <section className="bg-slate-50 py-12 md:py-16 border-b border-slate-100">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="lg:col-span-5 flex flex-col items-start">
              <span className="text-[12px] font-bold text-emerald-600 tracking-wider uppercase">
                {t.sdgs.eyebrow}
              </span>
              <h2 className="text-[22px] sm:text-[28px] lg:text-[32px] font-extrabold text-slate-900 tracking-tight leading-tight mt-1 mb-4">
                {t.sdgs.title}
              </h2>
              <p className="text-[14px] sm:text-[15px] leading-relaxed text-slate-500 font-medium">
                {t.sdgs.desc}
              </p>
            </div>

            {/* Right SDGs Grid */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {t.sdgs.items.map((sdg, idx) => {
                const Icon = sdg.icon;
                return (
                  <div 
                    key={idx} 
                    className="bg-white p-4 rounded-[3px] border border-slate-100 shadow-xs flex flex-col gap-2 group hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <Icon className={`h-7 w-7 shrink-0 ${sdg.color}`} />
                    <div>
                      <p className={`text-[13px] font-extrabold ${sdg.numColor || 'text-brand'}`}>
                        {sdg.num}
                      </p>
                      <p className="text-[12px] font-bold text-slate-800 leading-snug mt-0.5">
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

      {/* 5. CONTACT US SECTION */}
      <SustainabilityContact tContact={t.contact} />

    </div>
  );
}
