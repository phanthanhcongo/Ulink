import { Factory, Package, Truck, ShieldCheck } from 'lucide-react';

const stats = [
  {
    icon: Factory,
    value: '10.000 m²',
    label: 'Tổng diện tích',
    sub: 'nhà xưởng sản xuất'
  },
  {
    icon: Package,
    value: '1000+',
    label: 'Sản phẩm luôn sẵn sàng',
    sub: 'với đa dạng SKU'
  },
  {
    icon: Truck,
    value: '24 - 48h',
    label: 'Thời gian giao hàng',
    sub: 'trung bình toàn quốc'
  },
  {
    icon: ShieldCheck,
    value: 'ISO 9001:2015',
    label: 'Kiểm soát chất lượng',
    sub: 'theo tiêu chuẩn quốc tế'
  }
];

export function AboutStats() {
  return (
    <section className="py-6 sm:py-8 lg:py-12 border-y border-slate-100 my-4 bg-white">
      <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-0 lg:divide-x lg:divide-slate-200/80">
        {stats.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="group flex flex-col items-start text-left sm:items-center sm:text-center px-3 sm:px-6 py-3 sm:py-4 card-hover-standard rounded-[3px]"
            >
              <div className="mb-3 sm:mb-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-colors duration-200 group-hover:bg-[#1769E2] group-hover:text-white">
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-xl sm:text-2xl lg:text-[28px] lg:leading-[36px] font-bold text-[#162233] group-hover:text-[#1769E2] transition-colors duration-200">
                {item.value}
              </span>
              <p className="text-sm lg:text-[16px] lg:leading-[24px] font-medium mt-1.5 sm:mt-2 text-[#617084]">
                {item.label}
                <span className="block">{item.sub}</span>
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
