'use client';

import React from 'react';
import { Link } from '@/i18n/navigation';

interface IndustryCtaBannerProps {
  title?: string;
  subtitle?: string;
  locale: string;
  industryName?: string;
}

export function IndustryCtaBanner({
  title,
  subtitle,
  locale,
  industryName = ''
}: IndustryCtaBannerProps) {
  const isVi = locale === 'vi';
  const isJa = locale === 'ja';

  const defaultTitle = isVi
    ? `Sẵn sàng tối ưu hóa chuỗi cung ứng ${industryName.toLowerCase().startsWith('ngành') ? industryName : `ngành ${industryName}`} của bạn?`
    : isJa
      ? `${industryName}サプライチェーンを最適化する準備はできていますか？`
      : `Ready to optimize your ${industryName} supply chain?`;

  const defaultSubtitle = isVi
    ? 'Liên hệ ngay với đội ngũ chuyên gia ULink để nhận tư vấn giải pháp phù hợp và báo giá cạnh tranh nhất.'
    : isJa
      ? 'ULinkの専門チームに今すぐ連絡し、最適なソリューションと最も競争力のある見積もりを受け取りましょう。'
      : 'Contact ULink experts today for tailored solution advice and competitive quotes.';

  return (
    <section className="w-full bg-[#1769E2] text-white py-16 lg:py-20">
      <div className="page-container flex flex-col items-center text-center space-y-6 max-w-6xl mx-auto">
        <h2 className="text-[20px] sm:text-[30px] lg:text-[34px] xl:text-[38px] lg:leading-[46px] font-bold text-white tracking-tight whitespace-normal">
          {title || defaultTitle}
        </h2>
        <p className="text-[16px] lg:text-[18px] leading-relaxed text-white/90 max-w-5xl font-normal">
          {subtitle || defaultSubtitle}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 w-full sm:w-auto">
          <Link
            href="/quick-order"
            className="w-full sm:w-auto inline-flex h-12 items-center justify-center px-8 rounded-[3px] bg-white text-[#1769E2] font-bold text-[15px] sm:text-[16px] shadow-sm hover:bg-slate-100 transition-all duration-200"
          >
            {isVi ? 'Nhận báo giá ngay' : isJa ? '今すぐ見積もりを取得' : 'Get Quote Now'}
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex h-12 items-center justify-center px-8 rounded-[3px] border-[1.5px] border-white bg-transparent text-white font-bold text-[15px] sm:text-[16px] hover:bg-white/10 transition-all duration-200"
          >
            {isVi ? 'Liên hệ tư vấn' : isJa ? 'お問い合わせ' : 'Contact Us'}
          </Link>
        </div>
      </div>
    </section>
  );
}
