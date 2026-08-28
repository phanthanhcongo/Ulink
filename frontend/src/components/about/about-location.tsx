import Image from 'next/image';
import { MapPin, Navigation, Building2, Route } from 'lucide-react';

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
        <div className="lg:col-span-6 flex flex-col gap-4">
          <span className="text-sm font-bold text-blue-600">
            Vị trí chiến lược
          </span>
          <h2 className="text-[22px] sm:text-[24px] md:text-[26px] lg:text-[28px] xl:text-[30px] font-extrabold tracking-tight text-slate-900 leading-tight">
            Trung tâm kết nối thuận tiện
          </h2>
          <p className="text-[13px] sm:text-[14px] leading-relaxed text-slate-500 max-w-xl">
            Nằm tại vị trí tâm điểm kết nối các tuyến giao thông huyết mạch phía Bắc, tạo điều kiện tối đa cho việc giao thương và tối ưu chi phí vận chuyển hàng hóa.
          </p>
          <ul className="mt-2 space-y-4">
            {connectivityList.map((item, idx) => {
              const Icon = item.icon;
              return (
                <li key={idx} className="flex items-center gap-3">
                  <Icon className="h-4 w-4 text-blue-600 shrink-0" />
                  <span className="text-[13px] sm:text-[14px] font-semibold text-slate-700">{item.title}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="lg:col-span-6">
          <div className="ui-card-hover relative aspect-[16/10] w-full overflow-hidden rounded-[3px] shadow-lg border border-slate-100">
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
