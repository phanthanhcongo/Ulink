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
    <section className="py-8 lg:py-12 border-y border-slate-100 my-4 bg-white">
      <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-0 lg:divide-x lg:divide-slate-200/80">
        {stats.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="group flex flex-col items-center text-center px-4 sm:px-6 py-4 card-hover-standard rounded-[3px]"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-colors duration-200 group-hover:bg-[#1769E2] group-hover:text-white">
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-stat-value text-slate-900 group-hover:text-[#1769E2] transition-colors duration-200">{item.value}</span>
              <p className="text-caption-responsive mt-2 text-slate-500">
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
