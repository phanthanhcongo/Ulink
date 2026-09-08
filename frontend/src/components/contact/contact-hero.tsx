import Image from 'next/image';
import { MapPin, Building2, ShieldCheck } from 'lucide-react';

const valueProps = [
  {
    icon: MapPin,
    title: 'Vị trí chiến lược',
    desc: 'Kết nối nhanh đến các KCN và cảng biển lớn'
  },
  {
    icon: Building2,
    title: 'Kho vận hiện đại',
    desc: 'Hệ thống quản lý chuẩn quốc tế, tối ưu quy trình xử lý'
  },
  {
    icon: ShieldCheck,
    title: 'Vận hành tin cậy',
    desc: 'Quy trình kiểm soát, an toàn và minh bạch'
  }
];

export function ContactHero() {
  return (
    <section className="py-6 sm:py-8 lg:py-12">
      <div className="grid grid-cols-1 items-center gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-10">
        {/* Left Column */}
        <div className="lg:col-span-6 flex flex-col gap-3 sm:gap-4">
          <span className="inline-flex w-fit items-center rounded-full bg-blue-50 px-3 sm:px-3.5 py-1 text-caption-responsive font-semibold text-blue-700 ring-1 ring-inset ring-blue-700/10">
            LIÊN HỆ
          </span>
          <h1 className="text-section-title sm:text-hero-title font-bold tracking-tight text-slate-900 leading-tight">
            Hub Hà Nam - Trung tâm phân phối
          </h1>
          <p className="text-caption-responsive sm:text-body-regular leading-6 sm:leading-relaxed text-slate-600">
            Trung tâm phân phối chiến lược tại cửa ngõ phía Nam Hà Nội, kết nối linh hoạt với các cụm công nghiệp trọng điểm và hệ thống logistics toàn quốc.
          </p>

          <div className="mt-3 sm:mt-4 flex flex-col gap-2.5 sm:gap-3">
            {valueProps.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 sm:gap-3.5 p-2 sm:p-2.5 rounded-[3px] bg-slate-50 border border-slate-100"
                >
                  <div className="flex h-8 sm:h-9 w-8 sm:w-9 shrink-0 items-center justify-center rounded-[3px] bg-blue-600 text-white">
                    <Icon className="h-4 sm:h-5 w-4 sm:w-5" />
                  </div>
                  <div>
                    <h3 className="text-caption-responsive font-bold text-slate-900">{item.title}</h3>
                    <p className="text-caption-responsive text-slate-600 leading-snug">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Photo */}
        <div className="lg:col-span-6">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[3px] shadow-xl ring-1 ring-slate-900/10">
            <Image
              src="/images/about/kho.png"
              alt="Trung tâm phân phối ULink Hub Hà Nam"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
