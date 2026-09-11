'use client';

import React from 'react';

interface CategoryCTAProps {
  locale: string;
}

export function CategoryCTA({ locale }: CategoryCTAProps) {
  return (
    <section className="w-full bg-[#3f61e8] py-12 sm:py-14 lg:py-16 mt-16 text-white border-y border-blue-300/60">
      <div className="page-container flex flex-col items-center text-center gap-3">
        <h2 className="text-[28px] sm:text-[32px] lg:text-[36px] font-bold tracking-tight leading-tight">
          {locale === 'vi' ? 'Bạn cần tư vấn giải pháp công nghiệp?' : 'Do You Need Industrial Solutions Consulting?'}
        </h2>
        <p className="text-[18px] sm:text-[21px] lg:text-[24px] text-blue-100/90 font-semibold max-w-2xl">
          {locale === 'vi'
            ? 'Đội ngũ chuyên gia của chúng tôi sẵn sàng hỗ trợ bạn 24/7'
            : 'Our team of experts is ready to support you 24/7'}
        </p>
        <div className="pt-1">
          <a
            href="tel:02473689999"
            className="inline-flex flex-wrap items-center justify-center gap-x-2 text-[18px] sm:text-[21px] lg:text-[24px] font-bold text-blue-100 transition-colors hover:text-white"
          >
            <span>{locale === 'vi' ? 'Hoặc gọi ngay:' : 'Or call us now:'}</span>
            <span>(0247) 368 9999</span>
          </a>
        </div>
      </div>
    </section>
  );
}
