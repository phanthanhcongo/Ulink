import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CustomSolutionsProps {
  locale: string;
}

export default function CustomSolutions({ locale }: CustomSolutionsProps) {
  return (
    <section className="w-full bg-white py-16 lg:py-24 border-t border-gray-150">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Text Content */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <h2 className="text-[30px] sm:text-[38px] md:text-[44px] lg:text-[50px] xl:text-[52px] font-extrabold text-slate-900 tracking-tight leading-tight">
              Giải pháp thiết kế riêng cho Doanh nghiệp
            </h2>
            <p className="mt-6 text-[13px] sm:text-[14px] leading-relaxed text-slate-600 font-medium">
              Giải pháp đóng gói thông minh dành riêng cho Doanh nghiệp, giúp tối ưu chi phí vật liệu, giảm thiểu hao hụt và tự động hóa quy trình đóng gói theo quy mô đơn hàng. Tích hợp dễ dàng với hệ thống quản lý kho vận hiện có, đảm bảo vận hành liền mạch và tiết kiệm lên đến 30% chi phí logistics.
            </p>
            <div className="mt-8">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center rounded-[3px] bg-blue-600 px-6 py-3 text-[13px] sm:text-[14px] leading-relaxed font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
              >
                Kết nối với Chuyên gia
              </Link>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="lg:col-span-6 ui-card-hover relative aspect-[4/3] w-full overflow-hidden bg-slate-50 border border-gray-100 rounded-[3px]">
            <Image
              src="/images/solutions/Stretch-Hood-Packaging.png"
              alt="Giải pháp thiết kế riêng cho Doanh nghiệp"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
