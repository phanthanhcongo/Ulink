import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { CategoryNavLink } from '@/components/solutions/category-nav-link';

const solutions = [
  {
    id: 'cleanroom',
    title: 'Phòng sạch',
    desc: 'Giải pháp vật tư phòng sạch đạt chuẩn ISO, đảm bảo môi trường kiểm soát nhiễm cho ngành dược phẩm & điện tử.',
    image: '/images/contact-success/card-image0.png',
    href: '/solutions/listProduct?category=cleanroom-consumables',
    categorySlug: 'cleanroom-consumables'
  },
  {
    id: 'packaging',
    title: 'Bao bì Công nghiệp',
    desc: 'Cung cấp các loại bao bì chuyên dụng cho vận chuyển, bảo quản hàng hóa công nghiệp an toàn & hiệu quả.',
    image: '/images/contact-success/card-image1.png',
    href: '/solutions/listProduct?category=industrial-packaging',
    categorySlug: 'industrial-packaging'
  },
  {
    id: 'hvac',
    title: 'Băng keo nhôm HVAC',
    desc: 'Các sản phẩm Băng keo nhôm chịu nhiệt cao, chống ẩm, dùng cho hệ thống HVAC, ống gió và cách nhiệt công nghiệp.',
    image: '/images/contact-success/card-image2.png',
    href: '/solutions/listProduct?category=esd-supplies',
    categorySlug: 'esd-supplies'
  }
];

export function ContactFeaturedSolutions() {
  return (
    <section className="w-full bg-white py-12 lg:py-[80px]">
      <div className="page-container max-w-[1280px]">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-3 mb-10 lg:mb-[48px]">
          <span className="text-base sm:text-lg lg:text-[20px] font-semibold text-[#1769e2] tracking-[0.5px] uppercase">
            DANH MỤC TIÊU BIỂU
          </span>
          <h2 className="text-xl sm:text-2xl lg:text-[28px] lg:leading-[36px] font-semibold tracking-[-0.3px] text-[#162233]">
            Khám phá thêm giải pháp từ ULink
          </h2>
        </div>

        {/* Product List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {solutions.map((item) => (
            <div
              key={item.id}
              className="flex flex-col overflow-hidden rounded-[8px] bg-white border border-[#cad5e2] shadow-sm group transition-all duration-300 hover:-translate-y-1 hover:border-[#1769e2] hover:shadow-[0_0_0_1px_#1769E2,0_8px_25px_-5px_rgba(23,105,226,0.2)] cursor-pointer"
            >
              <CategoryNavLink
                categorySlug={item.categorySlug}
                href={item.href}
                className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 block"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </CategoryNavLink>
              <div className="flex flex-1 flex-col p-6">
                <CategoryNavLink
                  categorySlug={item.categorySlug}
                  href={item.href}
                  className="text-lg lg:text-[20px] font-bold text-[#162233] group-hover:text-[#1769e2] transition-colors mb-2 block"
                >
                  {item.title}
                </CategoryNavLink>
                <p className="text-sm sm:text-base lg:text-[16px] lg:leading-[24px] font-normal text-[#617084] flex-1">
                  {item.desc}
                </p>
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-end">
                  <CategoryNavLink
                    categorySlug={item.categorySlug}
                    href={item.href}
                    className="text-sm font-semibold text-[#1769e2] hover:underline inline-flex items-center gap-1"
                  >
                    Xem thêm <ArrowRight className="h-4 w-4" />
                  </CategoryNavLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
