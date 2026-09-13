import Image from 'next/image';
import { ShieldCheck, Zap, UserCheck, Users, TrendingUp, GraduationCap, Star } from 'lucide-react';

const stats = [
  { value: '100+', label: 'Nhân sự toàn quốc', icon: Users },
  { value: '10+', label: 'Năm phát triển', icon: TrendingUp },
  { value: '30+', label: 'Chương trình đào tạo', icon: GraduationCap },
  { value: '95%', label: 'Nhân viên hài lòng', icon: Star }
];

export function CareersHero() {
  return (
    <section className="py-4 sm:py-6 lg:py-8">
      <div className="grid grid-cols-1 items-center gap-4 sm:gap-6 lg:grid-cols-12 lg:gap-8">
        {/* Left Column: Headline & Quick Props */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <span className="text-[#1769E2] font-semibold text-base lg:text-[20px] leading-tight lg:leading-[28px] uppercase tracking-wider">
            GIA NHẬP ULINK INDUSTRIES
          </span>
          <h1 className="text-[#162233] font-bold text-3xl sm:text-4xl lg:text-[48px] leading-tight lg:leading-[56px] tracking-[-0.0208em]">
            Kiến tạo giá trị khác biệt.<br />Phát triển bền vững.
          </h1>
          <p className="text-[#617084] font-normal text-base lg:text-[16px] leading-[24px] max-w-[540px]">
            Tại ULINK, chúng tôi tin rằng con người là nền tảng của mọi thành công. Chúng tôi không
            ngừng tìm kiếm các tài năng đầy nhiệt huyết, tận tâm để cùng nhau xây dựng môi trường
            làm việc thông minh và bền vững cho tương lai.
          </p>

          {/* 3 columns of features */}
          <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-0">
            {/* Col 1 */}
            <div className="group flex flex-col gap-1.5 p-2 rounded-[2px] transition-all duration-200 hover:bg-blue-50/40 hover:translate-x-0.5 cursor-pointer">
              <div className="flex items-center gap-2 text-[#162233] font-semibold text-sm lg:text-[14px] leading-[20px] tracking-[0.0071em]">
                <ShieldCheck className="h-5 w-5 text-[#1769E2] shrink-0 transition-transform duration-200 group-hover:scale-110" />
                <span className="transition-colors duration-200 group-hover:text-[#1769E2]">Phát triển toàn diện</span>
              </div>
              <p className="text-[#617084] font-normal text-sm lg:text-[14px] leading-[20px]">
                Học tập không giới hạn thông qua dự án thực tế.
              </p>
            </div>

            {/* Col 2 */}
            <div className="group flex flex-col gap-1.5 p-2 rounded-[2px] transition-all duration-200 hover:bg-blue-50/40 hover:translate-x-0.5 cursor-pointer">
              <div className="flex items-center gap-2 text-[#162233] font-semibold text-sm lg:text-[14px] leading-[20px] tracking-[0.0071em]">
                <Zap className="h-5 w-5 text-[#1769E2] shrink-0 transition-transform duration-200 group-hover:scale-110" />
                <span className="transition-colors duration-200 group-hover:text-[#1769E2]">Phát triển không ngừng</span>
              </div>
              <p className="text-[#617084] font-normal text-sm lg:text-[14px] leading-[20px]">
                Lộ trình thăng tiến rõ ràng, ghi nhận xứng đáng.
              </p>
            </div>

            {/* Col 3 */}
            <div className="group flex flex-col gap-1.5 p-2 rounded-[2px] transition-all duration-200 hover:bg-blue-50/40 hover:translate-x-0.5 cursor-pointer">
              <div className="flex items-center gap-2 text-[#162233] font-semibold text-sm lg:text-[14px] leading-[20px] tracking-[0.0071em]">
                <UserCheck className="h-5 w-5 text-[#1769E2] shrink-0 transition-transform duration-200 group-hover:scale-110" />
                <span className="transition-colors duration-200 group-hover:text-[#1769E2]">Phúc lợi hấp dẫn</span>
              </div>
              <p className="text-[#617084] font-normal text-sm lg:text-[14px] leading-[20px]">
                Chăm sóc sức khỏe & Cân bằng cuộc sống tối ưu.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Image */}
        <div className="lg:col-span-6">
          <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-[2px] shadow-lg ring-1 ring-slate-900/5 transition-all duration-500 hover:shadow-2xl">
            <Image
              src="/images/Career/career (12).png"
              alt="Đội ngũ nhân sự ULink B2B Platform"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              priority
            />
          </div>
        </div>
      </div>

      {/* Impression Metrics Bar */}
      <div className="mt-6 sm:mt-10 lg:mt-12 p-3 sm:p-4 lg:p-6 shadow-xs grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6 sm:grid-cols-4 items-center bg-[#F5F8FC]/60 rounded-[2px] border border-slate-100">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className="group flex items-center gap-4 justify-start sm:justify-center p-3 rounded-[2px] bg-white/70 transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:bg-white hover:ring-1 hover:ring-[#1769E2]/30 cursor-pointer"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#1769E2] transition-colors duration-200 group-hover:bg-[#1769E2] group-hover:text-white">
                <Icon className="h-6 w-6 transition-transform duration-200 group-hover:scale-110" />
              </div>
              <div className="flex flex-col">
                <span className="text-[#162233] font-extrabold text-xl lg:text-[24px] leading-tight transition-colors duration-200 group-hover:text-[#1769E2]">
                  {s.value}
                </span>
                <span className="text-[#617084] font-normal text-xs lg:text-[13px] leading-tight mt-0.5">
                  {s.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}


