import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const solutions = [
  {
    id: 'cleanroom',
    title: 'Phòng sạch',
    desc: 'Giải pháp vật tư phòng sạch đạt chuẩn ISO, đảm bảo môi trường kiểm soát nhiễm cho ngành dược phẩm & điện tử.',
    image: '/images/about/quality-hero-bg.webp',
    href: '/industries/electronics'
  },
  {
    id: 'packaging',
    title: 'Bao bì Công nghiệp',
    desc: 'Cung cấp các loại bao bì chuyên dụng cho vận chuyển, bảo quản hàng hóa công nghiệp an toàn & hiệu quả.',
    image: '/images/about/op-warehouse.webp',
    href: '/industries/logistics'
  },
  {
    id: 'hvac',
    title: 'Băng keo nhôm HVAC',
    desc: 'Các sản phẩm băng keo nhôm chịu nhiệt cao, chống ẩm, dùng cho hệ thống HVAC, ống gió và cách nhiệt công nghiệp.',
    image: '/images/about/op-wms.webp',
    href: '/industries/construction'
  }
];

export function ContactFeaturedSolutions() {
  return (
    <section className="py-12 px-4 sm:px-8">
      <div className="flex flex-col items-center text-center mb-10">
        <span className="inline-flex items-center rounded-full bg-blue-50 px-3.5 py-1 text-[13px] sm:text-[14px] lg:text-[16px] font-bold uppercase tracking-wider text-blue-700 ring-1 ring-inset ring-blue-700/10 mb-2">
          DANH MỤC TIÊU BIỂU
        </span>
        <h2 className="text-[30px] sm:text-[38px] md:text-[44px] lg:text-[50px] xl:text-[52px] font-extrabold tracking-tight text-slate-900">
          Khám phá thêm giải pháp từ ULink
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 max-w-6xl mx-auto">
        {solutions.map((item) => (
          <div
            key={item.id}
            className="flex flex-col overflow-hidden rounded-[3px] bg-white border border-slate-100 shadow-sm group transition-all duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)]"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                {item.title}
              </h3>
              <p className="mt-2 text-[13px] sm:text-[14px] leading-relaxed text-slate-600 flex-1">{item.desc}</p>
              <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
                <Link
                  href={item.href}
                  className="text-[13px] sm:text-[14px] font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
                >
                  Xem thêm <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
