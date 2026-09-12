'use client';

import React from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import {
  PhoneCall,
  ShieldCheck,
  Package,
  Truck,
  User,
  Cpu,
  Activity,
  Utensils,
  Settings,
  Globe,
  Zap,
  Sparkles,
  CheckCircle2,
  Factory
} from 'lucide-react';
import { IndustryData } from './types';

const iconMap: Record<string, React.ComponentType<any>> = {
  Cpu,
  Activity,
  Utensils,
  ShieldCheck,
  Settings,
  Globe,
  Zap,
  Sparkles,
  Truck,
  CheckCircle2,
  Factory,
  Package,
  User
};

interface IndustryOverviewSectionProps {
  industryData: IndustryData;
  locale: string;
}

export function IndustryOverviewSection({ industryData, locale }: IndustryOverviewSectionProps) {
  const isVi = locale === 'vi';
  const isJa = locale === 'ja';

  return (
    <section id="overview" className="scroll-mt-16 py-12 lg:py-20 w-full bg-white">
      <div className="page-container flex flex-col lg:flex-row gap-8 lg:gap-[48px] items-stretch">
        {/* Left Column - Text & Large Image */}
        <div className="flex-1 space-y-6 flex flex-col justify-between">
          <div className="space-y-3">
            <span className="text-[14px] font-bold uppercase tracking-wider text-[#1769E2] block">
              {isVi ? 'TỔNG QUAN GIẢI PHÁP' : isJa ? 'ソリューション概要' : 'SOLUTION OVERVIEW'}
            </span>
            <h2 className="text-[26px] sm:text-[32px] lg:text-[38px] lg:leading-[46px] font-bold text-[#141414] tracking-tight">
              {industryData.slug === 'pharmaceutical-cosmetics'
                ? (isVi ? 'Đảm bảo tiêu chuẩn vô trùng khắt khe nhất' : isJa ? '最も厳格な無菌基準を保証' : 'Ensure the strictest sterility standards')
                : industryData.slug === 'electronics'
                  ? (isVi ? 'Kiểm soát ô nhiễm & tĩnh điện tối ưu' : isJa ? '汚染管理と静電気対策の最適化' : 'Optimize contamination & electrostatic control')
                  : industryData.slug === 'food-beverage'
                    ? (isVi ? 'Giải pháp Toàn diện cho Chuỗi Sản xuất F&B' : isJa ? 'F&B生産チェーン向け総合ソリューション' : 'Comprehensive Solution for F&B Production Chain')
                    : industryData.slug === 'logistics'
                      ? (isVi ? 'Tối ưu hóa Chuỗi Vận chuyển & Kho vận' : isJa ? '物流と倉庫管理の最適化' : 'Optimize Freight & Logistics Management')
                      : industryData.slug === 'furniture'
                        ? (isVi ? 'Giải pháp Bảo vệ Bề mặt & Đóng gói Gỗ Nội thất' : isJa ? '家具・木製品の表面保護と包装' : 'Furniture Surface Protection & Packaging')
                        : (isVi ? 'Giải pháp Vật tư & Bảo vệ Công trình Xây dựng' : isJa ? '建設・工事用資材＆保護ソリューション' : 'Construction Materials & Protection Solutions')}
            </h2>
            <div className="text-[15px] lg:text-[16px] leading-[24px] lg:leading-[26px] text-[#495057] font-normal space-y-4 pt-2">
              {industryData.slug === 'pharmaceutical-cosmetics' ? (
                <>
                  <p>
                    {isVi
                      ? 'Trong sản xuất Dược phẩm, bất kỳ hạt bụi nhỏ hay vi sinh vật nào cũng có thể làm ảnh hưởng trực tiếp tới chất lượng mẻ thuốc và an toàn của người bệnh. Do đó, kiểm soát ô nhiễm và bảo vệ môi trường vô trùng là ưu tiên hàng đầu.'
                      : 'In pharmaceutical manufacturing, any small dust particle or microorganism can directly affect batch quality and patient safety. Therefore, contamination control and protecting sterile environments are top priorities.'}
                  </p>
                  <p>
                    {isVi
                      ? 'Các sản phẩm của ULink được thiết kế chuyên biệt để triệt tiêu tĩnh điện, giữ lại bụi mịn tối đa và duy trì độ kín khí cao. Chúng tôi đồng hành cùng nhà máy vượt qua các đợt đánh giá chất lượng và chứng nhận nghiêm ngặt của Bộ Y Tế và quốc tế.'
                      : 'ULink products are specially engineered to dissipate static charges, maximize fine dust retention, and maintain high airtightness. We accompany factories through rigorous quality audits and certifications from the Ministry of Health and international bodies.'}
                  </p>
                </>
              ) : industryData.slug === 'food-beverage' ? (
                <>
                  <p>
                    {isVi
                      ? 'Trong ngành chế biến Thực phẩm và Đồ uống (F&B), việc duy trì và tuân thủ các quy định khắt khe về an toàn thực phẩm như HACCP và ISO 22000 là yếu tố sống còn quyết định sự uy tín thương hiệu. Mọi quy trình từ chuẩn bị nguyên liệu, chế biến, chiết rót đến đóng gói đều yêu cầu các tiêu chuẩn cơ lý và vệ sinh ở mức tối đa.'
                      : 'In the Food & Beverage (F&B) processing industry, maintaining and complying with strict food safety regulations like HACCP and ISO 22000 is vital for brand reputation. Every process from raw preparation, processing, filling to packaging demands maximum physical and hygiene standards.'}
                  </p>
                  <p>
                    {isVi
                      ? 'Các hệ thống thiết bị và giải pháp công nghiệp của ULink được tối ưu hóa nhằm đáp ứng tốt các yêu cầu về tẩy rửa liên tục (CIP/COP), chống bám bẩn vi sinh, kiểm soát nhiệt độ nghiêm ngặt và tự động hóa truy xuất nguồn gốc. Chúng tôi đồng hành cùng các nhà máy F&B nâng cao công suất, triệt tiêu hao hụt và nâng tầm chất lượng thành phẩm.'
                      : 'ULink equipment systems and industrial solutions are optimized for continuous cleaning (CIP/COP), microbial anti-fouling, temperature control, and automated traceability. We partner with F&B plants to boost capacity, eliminate waste, and elevate finished product quality.'}
                  </p>
                </>
              ) : industryData.slug === 'electronics' ? (
                <>
                  <p>
                    Quy trình sản xuất mạch tích hợp, chip bán dẫn và linh kiện điện tử đòi hỏi môi trường siêu sạch (Class 10 - Class 100) để ngăn ngừa hỏng hóc do hạt bụi siêu mịn. ULINK mang lại các giải pháp kiểm soát tĩnh điện (ESD) vượt trội và lọc bụi chất lượng cao.
                  </p>
                  <p>
                    Tất cả găng tay, khăn lau và khay nhựa đựng linh kiện của chúng tôi đều đạt tiêu chuẩn điện trở bề mặt an toàn, giúp phân tán dòng điện tích tích tụ và bảo vệ linh kiện.
                  </p>
                </>
              ) : (
                <p>{industryData.description}</p>
              )}
            </div>
          </div>

          {industryData.overviewImage && (
            <div className="relative w-full flex-1 min-h-[300px] sm:min-h-[340px] rounded-[2px] overflow-hidden mt-6 shadow-sm border border-slate-100">
              <Image
                src={industryData.overviewImage}
                alt={industryData.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
            </div>
          )}
        </div>

        {/* Right Sidebar (Fixed 380px - Matching Figma 100%) */}
        <div className="w-full lg:w-[380px] shrink-0 bg-[#F5F7FA] border border-[#E2E8F0] rounded-[2px] p-[28px] flex flex-col justify-between h-full space-y-[30px]">
          <div className="space-y-[30px]">
            <div className="border-b border-[#E2E8F0] pb-[20px]">
              <h3 className="text-[24px] font-bold text-[#0F172A] tracking-tight">
                {industryData.whyUsTitle}
              </h3>
            </div>
            <div className="space-y-[30px]">
              {(industryData.whyUsItems || [
                { title: industryData.whyUsList[0] || 'Chứng nhận quốc tế uy tín', desc: 'ISO 13485, CE, FDA và tiêu chuẩn an toàn y tế nghiêm ngặt nhất.', iconName: 'ShieldCheck' },
                { title: industryData.whyUsList[1] || 'Năng lực cung ứng lớn', desc: 'Trung tâm phân phối hiện đại tại Hà Nam, không đứt gãy nguồn hàng.', iconName: 'Package' },
                { title: industryData.whyUsList[2] || 'Giao nhận thần tốc 24-48h', desc: 'Kết nối nhanh tới các khu công nghiệp dược phẩm toàn quốc.', iconName: 'Truck' },
                { title: industryData.whyUsList[3] || 'Tư vấn kỹ thuật', desc: 'Kỹ sư chuyên sâu tư vấn giải pháp phù hợp ngân sách doanh nghiệp.', iconName: 'User' }
              ]).map((item, idx) => {
                const fallbackIcons = [ShieldCheck, Package, Truck, User];
                const IconComp = (item.iconName && iconMap[item.iconName]) ? iconMap[item.iconName] : fallbackIcons[idx % fallbackIcons.length];

                return (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] bg-[#EAF2FF] text-[#1769E2] mt-0.5">
                      <IconComp className="h-5 w-5 stroke-[2]" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-[16px] font-bold text-[#0F172A] leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-[14px] text-[#64748B] font-normal leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hotline & Contact CTA Box */}
          <div className="border-t border-[#E2E8F0] pt-[30px] space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] bg-[#EAF2FF] text-[#1769E2]">
                <PhoneCall className="h-5 w-5 stroke-[2]" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[13px] text-[#64748B] block font-normal">
                  {isVi ? 'Liên hệ tư vấn miễn phí' : isJa ? '無料相談のお問い合わせ' : 'Contact for free consultation'}
                </span>
                <span className="text-[16px] lg:text-[18px] font-bold text-[#0F172A] block">
                  Hotline: 0247 309 9899
                </span>
              </div>
            </div>

            <Link
              href="/contact"
              className="w-full bg-[#1769E2] hover:bg-[#1257BD] text-white font-bold text-[15px] h-12 inline-flex items-center justify-center transition-all shadow-xs rounded-[8px]"
            >
              {isVi ? 'Gọi ngay' : isJa ? '今すぐお電話' : 'Call Now'}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
