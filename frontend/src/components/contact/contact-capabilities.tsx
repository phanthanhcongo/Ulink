import { Truck, Boxes, ShieldCheck, Cpu, Leaf } from 'lucide-react';

const capabilities = [
  { icon: Truck, title: 'Giao hàng nhanh', desc: 'Mạng lưới toàn quốc, tối ưu' },
  { icon: Boxes, title: 'Năng lực lưu trữ lớn', desc: 'Diện tích kho > 10,000 m²' },
  { icon: ShieldCheck, title: 'An toàn & Bảo mật', desc: 'Chuẩn ISO 9001, 14001' },
  { icon: Cpu, title: 'Công nghệ hiện đại', desc: 'WMS, TMS tự động hóa' },
  { icon: Leaf, title: 'Phát triển bền vững', desc: 'Hướng tới Logistics xanh' }
];

export function ContactCapabilities() {
  return (
    <section className="py-6 sm:py-8 lg:py-12 border-t border-slate-100">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {capabilities.map((c, idx) => {
          const Icon = c.icon;
          return (
            <div
              key={idx}
              className="flex items-start sm:items-center gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-[3px] bg-slate-50 border border-slate-100"
            >
              <div className="flex h-8 sm:h-9 w-8 sm:w-9 shrink-0 items-center justify-center rounded-[3px] bg-blue-100 text-blue-600">
                <Icon className="h-4 sm:h-5 w-4 sm:w-5" />
              </div>
              <div>
                <h3 className="text-caption-responsive font-bold text-slate-900 leading-snug">{c.title}</h3>
                <p className="text-caption-responsive text-slate-500 leading-snug">{c.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
