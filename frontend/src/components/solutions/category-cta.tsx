'use client';

import React from 'react';
import { Phone } from 'lucide-react';

interface CategoryCTAProps {
  locale: string;
}

export function CategoryCTA({ locale }: CategoryCTAProps) {
  return (
    <section className="w-full bg-[#0F62FE] text-white py-14 mt-16 shadow-inner">
      <div className="page-container text-center space-y-4">
        <h2 className="text-section-title font-bold tracking-tight">
          {locale === 'vi' ? 'Bạn cần tư vấn giải pháp công nghiệp?' : 'Do You Need Industrial Solutions Consulting?'}
        </h2>
        <p className="text-body-regular text-blue-100/90 font-semibold max-w-2xl mx-auto">
          {locale === 'vi'
            ? 'Đội ngũ chuyên gia của chúng tôi sẵn sàng hỗ trợ bạn 24/7'
            : 'Our team of experts is ready to support you 24/7'}
        </p>
        <div className="pt-2">
          <span className="text-caption-responsive text-blue-200 uppercase tracking-widest block mb-1 font-bold">
            {locale === 'vi' ? 'Hoặc gọi ngay:' : 'Or call us now:'}
          </span>
          <a
            href="tel:02473689999"
            className="text-section-title font-bold hover:text-blue-100 transition-colors inline-flex items-center gap-2"
          >
            <Phone className="h-6 w-6 sm:h-7 sm:w-7" />
            (0247) 368 9999
          </a>
        </div>
      </div>
    </section>
  );
}
