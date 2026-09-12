'use client';

import React from 'react';
import { Link } from '@/i18n/navigation';
import { Award, Megaphone, GraduationCap, ShieldCheck } from 'lucide-react';

interface IndustryDistributorSectionProps {
  locale: string;
}

export function IndustryDistributorSection({ locale }: IndustryDistributorSectionProps) {
  const isVi = locale === 'vi';
  const isJa = locale === 'ja';

  const benefits = [
    {
      icon: Award,
      title: isVi ? 'Chiết khấu hấp dẫn' : isJa ? '魅力的な割引' : 'Attractive Discounts',
      desc: isVi
        ? 'Chính sách giá ưu đãi dành riêng cho nhà phân phối với chiết khấu theo sản lượng.'
        : isJa
          ? '販売量に応じた割引を提供するディストリビューター専用の特別価格ポリシー。'
          : 'Competitive tier-based volume discounts exclusively for authorized distributors.'
    },
    {
      icon: Megaphone,
      title: isVi ? 'Hỗ trợ Marketing' : isJa ? 'マーケティング支援' : 'Marketing Support',
      desc: isVi
        ? 'Cung cấp tài liệu kỹ thuật, catalogue, mẫu thử và hỗ trợ trưng bày sản phẩm.'
        : isJa
          ? '技術資料、カタログ、サンプル品、店頭ディスプレイのサポートを提供します。'
          : 'Complete marketing toolkits including technical specs, catalogs, samples, and display units.'
    },
    {
      icon: GraduationCap,
      title: isVi ? 'Đào tạo kỹ thuật' : isJa ? '技術トレーニング' : 'Technical Training',
      desc: isVi
        ? 'Chương trình đào tạo chuyên sâu về sản phẩm và ứng dụng băng keo nhôm trong HVAC.'
        : isJa
          ? 'HVACにおけるアルミテープ製品とアプリケーションに関する詳細なトレーニング。'
          : 'Comprehensive training programs on aluminum tape products and HVAC application engineering.'
    },
    {
      icon: ShieldCheck,
      title: isVi ? 'Bảo vệ vùng bán' : isJa ? '販売エリアの保護' : 'Territory Protection',
      desc: isVi
        ? 'Chính sách bảo vệ khu vực kinh doanh, tránh cạnh tranh nội bộ.'
        : isJa
          ? '社内競争を避け、指定エリアでのビジネス活動を保護するポリシー。'
          : 'Strict regional territory protection policy preventing internal network friction.'
    }
  ];

  return (
    <section id="distributor-program" className="w-full bg-white py-16 lg:py-[80px]">
      <div className="page-container flex flex-col items-center gap-10 lg:gap-[40px]">
        {/* Section Header (Figma Node #1229:2389) */}
        <div className="flex flex-col items-center text-center gap-3 lg:gap-[16px] max-w-4xl mx-auto">
          <span className="text-[14px] sm:text-[16px] font-bold uppercase tracking-[0.05em] text-[#1769E2]">
            {isVi ? 'CHƯƠNG TRÌNH ĐỐI TÁC' : isJa ? 'パートナープログラム' : 'PARTNER PROGRAM'}
          </span>
          <h2 className="text-[26px] sm:text-[34px] lg:text-[38px] lg:leading-[46px] font-bold text-[#0B153D] tracking-tight">
            {isVi
              ? 'Trở thành nhà phân phối sản phẩm Băng Keo Nhôm ULINK'
              : isJa
                ? 'ULINKアルミテープ製品のディストリビューターになりましょう'
                : 'Become a Distributor of ULINK Aluminum Tape'}
          </h2>
          <p className="text-[15px] sm:text-[16px] leading-[24px] text-[#697077] font-normal max-w-3xl">
            {isVi
              ? 'Tham gia mạng lưới phân phối ULINK để mở rộng danh mục sản phẩm và gia tăng doanh thu với sản phẩm băng keo nhôm chất lượng cao cho ngành HVAC.'
              : isJa
                ? 'ULINKの販売ネットワークに参加して製品ラインナップを拡大し、HVAC業界向けの高品質アルミテープ製品で収益を増やしましょう。'
                : "Join ULINK's distribution network to expand your product portfolio and boost revenue with premium aluminum tape solutions for the HVAC industry."}
          </p>
        </div>

        {/* Benefits Row (Figma Node #1229:2393) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-[24px] w-full">
          {benefits.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="group bg-[#F2F4F8] hover:bg-white rounded-[2px] p-6 flex flex-col items-start gap-[12px] border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(6,26,54,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_0_1px_#1769E2,0_12px_30px_-5px_rgba(23,105,226,0.2)] cursor-pointer"
              >
                <div className="w-[36px] h-[36px] rounded-[2px] bg-[#DBEAFE] text-[#1769E2] border border-[#d0e2fb] flex items-center justify-center shrink-0 transition-colors duration-300 group-hover:bg-[#1769E2] group-hover:border-[#1769E2] group-hover:text-white">
                  <IconComponent className="w-5 h-5 stroke-[2] transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="text-[16px] sm:text-[18px] font-bold text-[#0F172A] leading-snug group-hover:text-[#1769E2] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-[14px] text-[#697077] leading-[20px] font-normal">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Buttons (Figma Node #1229:2420) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full pt-2">
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-[2px] bg-[#1769E2] text-white font-semibold text-[14px] sm:text-[15px] hover:bg-[#1255B8] transition-all shadow-sm"
          >
            {isVi ? 'Đăng ký ngay' : isJa ? '今すぐ登録' : 'Register Now'}
          </Link>
          <Link
            href="/about"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-[2px] border border-[#1769E2] bg-transparent text-[#1769E2] font-semibold text-[14px] sm:text-[15px] hover:bg-[#F0F6FF] transition-all"
          >
            {isVi ? 'Tìm hiểu thêm' : isJa ? '詳細を見る' : 'Learn More'}
          </Link>
        </div>
      </div>
    </section>
  );
}
