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
    <section className="py-8 lg:py-12">
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
        {/* Left Column: Headline & Quick Props */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <span className="text-body-regular font-bold uppercase tracking-wider text-blue-600">
            GIA NHẬP ULINK INDUSTRIES
          </span>
          <h1 className="text-[30px] font-extrabold tracking-tight text-slate-900 leading-tight">
            Kiến tạo giá trị khác biệt.<br />Phát triển bền vững.
          </h1>
          <p className="text-body-large leading-relaxed text-slate-500 max-w-[540px]">
            Tại ULINK, chúng tôi tin rằng con người là nền tảng của mọi thành công. Chúng tôi không
            ngừng tìm kiếm các tài năng đầy nhiệt huyết, tận tâm để cùng nhau xây dựng môi trường
            làm việc thông minh và bền vững cho tương lai.
          </p>

          {/* 3 columns of features */}
          <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-0">
            {/* Col 1 */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-body-large font-bold text-slate-800">
                <ShieldCheck className="h-5 w-5 text-blue-600 shrink-0" />
                <span>Phát triển toàn diện</span>
              </div>
              <p className="text-body-regular text-slate-500 leading-relaxed">
                Học tập không giới hạn thông qua dự án thực tế.
              </p>
            </div>

            {/* Col 2 */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-body-large font-bold text-slate-800">
                <Zap className="h-5 w-5 text-blue-600 shrink-0" />
                <span>Phát triển không ngừng</span>
              </div>
              <p className="text-body-regular text-slate-500 leading-relaxed">
                Lộ trình thăng tiến rõ ràng, ghi nhận xứng đáng.
              </p>
            </div>

            {/* Col 3 */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-body-large font-bold text-slate-800">
                <UserCheck className="h-5 w-5 text-blue-600 shrink-0" />
                <span>Phúc lợi hấp dẫn</span>
              </div>
              <p className="text-body-regular text-slate-500 leading-relaxed">
                Chăm sóc sức khỏe & Cân bằng cuộc sống tối ưu.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Image */}
        <div className="lg:col-span-6">
          <div className="ui-card-hover relative aspect-[4/3] w-full overflow-hidden rounded-[3px] shadow-lg ring-1 ring-slate-900/5">
            <Image
              src="/images/Career/career (12).png"
              alt="Đội ngũ nhân sự ULink B2B Platform"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      {/* Impression Metrics Bar */}
      <div className="mt-12 sm:mt-16  p-6 sm:p-8 shadow-sm grid grid-cols-2 gap-6 sm:grid-cols-4 items-center">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="group ui-card-hover flex items-center gap-4 justify-start sm:justify-center py-2 px-2 rounded-[3px]">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-colors duration-200 group-hover:bg-[#1769E2] group-hover:text-white">
                <Icon className="h-6 w-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-[22px] font-extrabold text-slate-900 leading-tight transition-colors duration-200 group-hover:text-[#1769E2]">
                  {s.value}
                </span>
                <span className="text-body-regular text-slate-400 font-medium mt-0.5 leading-tight">
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


