import Image from 'next/image';
import { MapPin, Navigation, Building2, Route } from 'lucide-react';
import { AboutSectionHeader } from './about-section-header';

const connectivityList = [
  {
    icon: MapPin,
    title: 'Cảng hàng không quốc tế Nội Bài - 60km'
  },
  {
    icon: Navigation,
    title: 'Cảng Hải Phòng - 75km'
  },
  {
    icon: Building2,
    title: 'Kết nối trực tiếp cận các KCN lớn phía Bắc'
  },
  {
    icon: Route,
    title: 'Hệ thống đường cao tốc Hà Nội - Hải Phòng thuận tiện'
  }
];

export function AboutLocation() {
  return (
    <section className="py-6 lg:py-8 xl:py-10">
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-12">
        <div className="flex flex-col lg:col-span-6">
          <AboutSectionHeader
            eyebrow="Vị trí chiến lược"
            title="Trung tâm kết nối thuận tiện"
            className="mb-4"
          />
          <p className="text-sm sm:text-base lg:text-[18px] lg:leading-[28px] font-normal text-[#617084] max-w-xl">
            Nằm tại vị trí tâm điểm kết nối các tuyến giao thông huyết mạch phía Bắc, tạo điều kiện tối đa cho việc giao thương và tối ưu chi phí vận chuyển hàng hóa.
          </p>
          <ul className="space-y-3 pt-2">
            {connectivityList.map((item, idx) => {
              const Icon = item.icon;
              return (
                <li key={idx} className="flex items-center gap-3">
                  <Icon className="h-[18px] w-[18px] text-[#1769e2] shrink-0" />
                  <span className="text-sm sm:text-base lg:text-[16px] lg:leading-[24px] font-normal text-[#162233]">{item.title}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="lg:col-span-6">
          <div className="ui-card-hover relative aspect-[16/10] w-full overflow-hidden rounded-[6px] shadow-lg border border-slate-100">
            <Image
              src="/images/about/gallery/location-aerial-view.png"
              alt="Vị trí kết nối giao thông Hub Hà Nam"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
