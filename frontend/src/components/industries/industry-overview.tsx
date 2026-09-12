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
  User,
  PhoneCall
};

interface IndustryOverviewSectionProps {
  industryData: IndustryData;
  locale: string;
}

export function IndustryOverviewSection({ industryData, locale }: IndustryOverviewSectionProps) {
  const isVi = locale === 'vi';
  const isJa = locale === 'ja';

  return (
    <section id="overview" className="scroll-mt-16 py-16 lg:py-[80px] w-full bg-white">
      <div className="page-container flex flex-col lg:flex-row gap-8 lg:gap-[48px] items-stretch">
        {/* Left Column - Text & Overview Image (Figma Node #1119:10539) */}
        <div className="flex-1 space-y-6 flex flex-col justify-between">
          <div className="space-y-[12px]">
            <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-[0.05em] text-[#1769E2] block">
              {isVi ? 'TỔNG QUAN GIẢI PHÁP' : isJa ? 'ソリューション概要' : 'SOLUTION OVERVIEW'}
            </span>
            <h2 className="text-[20px] sm:text-[28px] md:text-[34px] lg:text-[38px] leading-snug lg:leading-[46px] font-bold text-[#1D2A49] tracking-[-0.0158em]">
              {industryData.slug === 'pharmaceutical-cosmetics'
                ? (isVi ? 'Đảm bảo tiêu chuẩn vô trùng khắt khe nhất' : isJa ? '最も厳格な無菌基準を保証' : 'Ensure the strictest sterility standards')
                : industryData.slug === 'electronics'
                  ? (isVi ? 'Kiểm soát ô nhiễm & tĩnh điện tối ưu' : isJa ? '汚染管理と静電気対策の最適化' : 'Optimize contamination & electrostatic control')
                  : industryData.slug === 'food-beverage' || industryData.slug === 'food'
                    ? (isVi ? 'Giải pháp Toàn diện cho Chuỗi Sản xuất F&B' : isJa ? 'F&B生産チェーン向け総合ソリューション' : 'Comprehensive Solution for F&B Production Chain')
                    : industryData.slug === 'logistics'
                      ? (isVi ? 'Tối ưu hóa Chuỗi Vận chuyển & Kho vận' : isJa ? '物流と倉庫管理の最適化' : 'Optimize Freight & Logistics Management')
                      : industryData.slug === 'furniture'
                        ? (isVi ? 'Giải pháp Bảo vệ Bề mặt & Đóng gói Gỗ Nội thất' : isJa ? '家具・木製品の表面保護と包装' : 'Furniture Surface Protection & Packaging')
                        : industryData.slug === 'construction'
                          ? (isVi ? 'Đảm bảo độ kín khí và bảo ôn hoàn hảo cho hệ thống Cơ Điện' : isJa ? 'M&Eシステムの完璧な気密性と保温を確保' : 'Ensuring Perfect Airtightness and Thermal Insulation for M&E Systems')
                          : (isVi ? 'Giải pháp Vật tư & Bảo vệ Công trình Xây dựng' : isJa ? '建設・工事用資材＆保護ソリューション' : 'Construction Materials & Protection Solutions')}
            </h2>
            <div className="text-[15px] lg:text-[16px] leading-[24px] text-[#495057] font-normal space-y-4 pt-2">
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
              ) : industryData.slug === 'food-beverage' || industryData.slug === 'food' ? (
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
              ) : industryData.slug === 'construction' ? (
                <p>
                  {isVi
                    ? 'Trong thiết kế hệ thống HVAC, việc rò rỉ khí và đọng sương bề mặt ống gió là những lỗi vận hành nghiêm trọng gây lãng phí điện năng lớn. Băng keo nhôm ULINK đóng vai trò là màng ngăn ẩm, bịt kín tuyệt đối các mối nối ghép ống gió và bảo vệ hoàn thiện các lớp bông thủy tinh cách nhiệt.'
                    : isJa
                      ? 'HVACシステム設計において、空気漏れとダクト表面の結露は重大な運用エラーであり、大規模な電力無駄を引き起こします。ULINKアルミテープは防湿膜として機能し、ダクト接続部を完全に密閉してグラスウール断熱層を保護します。'
                      : 'In HVAC system design, air leakage and surface condensation on ducts are critical operational flaws causing massive energy waste. ULINK aluminum tape acts as a vapor barrier, perfectly sealing duct joints and completely protecting glasswool insulation layers.'}
                </p>
              ) : (
                <p>{industryData.description}</p>
              )}
            </div>
          </div>

          {/* Overview Image */}
          <div className="relative w-full h-[340px] sm:h-[370px] lg:h-[390px] rounded-[4px] overflow-hidden mt-6">
            <Image
              src={industryData.overviewImage || '/images/industries/food/overview.png'}
              alt={industryData.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
          </div>
        </div>

        {/* Right Sidebar (Figma Node #1119:10546 - Fixed 380px, bg #F2F4F8, rounded 8px, padding 28px) */}
        <div className="w-full lg:w-[380px] shrink-0 bg-[#F2F4F8] rounded-[8px] p-[28px] flex flex-col justify-between space-y-[24px]">
          <div className="space-y-[24px]">
            {/* Header Title */}
            <div className="border-b border-[#DDE1E6] pb-[16px]">
              <h3 className="text-[20px] font-semibold text-[#1D2A49] leading-[28px]">
                {industryData.whyUsTitle || (isVi ? 'Vì sao chọn ULINK?' : isJa ? 'なぜULINKを選ぶのか？' : 'Why Choose ULINK?')}
              </h3>
            </div>

            {/* 3 Advantage Items */}
            <div className="space-y-[24px]">
              {(industryData.slug === 'food-beverage' || industryData.slug === 'food'
                ? [
                  {
                    title: isVi ? 'Cam kết chất lượng vượt trội' : 'Superior Quality Commitment',
                    desc: isVi ? 'Sản phẩm được kiểm định nghiêm ngặt qua từng công đoạn, đảm bảo độ chính xác cao và hiệu suất ổn định.' : 'Rigorously inspected products ensuring high precision.',
                    iconComp: ShieldCheck
                  },
                  {
                    title: isVi ? 'Tích hợp tự động hóa cao' : 'High Automation Integration',
                    desc: isVi ? 'Đồng bộ hóa dữ liệu thời gian thực, quản lý và truy xuất chính xác từng lô hàng.' : 'Real-time data synchronization for precise batch tracking.',
                    iconComp: Cpu
                  },
                  {
                    title: isVi ? 'Cung ứng liên tục 24/7' : 'Continuous 24/7 Supply',
                    desc: isVi ? 'Tổng kho Hà Nam trữ lượng dồi dào, đảm bảo không gián đoạn dây chuyền.' : 'Abundant Ha Nam warehouse inventory ensures no downtime.',
                    iconComp: Truck
                  }
                ]
                : (industryData.whyUsItems || [
                  { title: industryData.whyUsList?.[0] || 'Cam kết chất lượng vượt trội', desc: 'Sản phẩm được kiểm định nghiêm ngặt qua từng công đoạn, đảm bảo độ chính xác cao và hiệu suất ổn định.', iconComp: ShieldCheck },
                  { title: industryData.whyUsList?.[1] || 'Tích hợp tự động hóa cao', desc: 'Đồng bộ hóa dữ liệu thời gian thực, quản lý và truy xuất chính xác từng lô hàng.', iconComp: Cpu },
                  { title: industryData.whyUsList?.[2] || 'Cung ứng liên tục 24/7', desc: 'Tổng kho Hà Nam trữ lượng dồi dào, đảm bảo không gián đoạn dây chuyền.', iconComp: Truck }
                ])
              ).map((item, idx) => {
                const IconComponent = (item as any).iconComp || ShieldCheck;

                return (
                  <div key={idx} className="flex gap-[12px] items-start">
                    <div className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-[6px] bg-[#DBEAFE] text-[#1769E2] mt-0.5">
                      <IconComponent className="h-[20px] w-[20px] stroke-[2]" />
                    </div>
                    <div className="space-y-[4px] flex-1">
                      <h4 className="text-[18px] font-normal text-[#212529] leading-[28px]">
                        {item.title}
                      </h4>
                      <p className="text-[14px] text-[#495057] font-normal leading-[20px]">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hotline & Call Now CTA Section */}
          <div className="border-t border-[#DDE1E6] pt-[20px] space-y-[16px]">
            <div className="flex items-center gap-[12px]">
              <div className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-[6px] bg-[#DBEAFE] text-[#1769E2]">
                <PhoneCall className="h-[20px] w-[20px] stroke-[2]" />
              </div>
              <div className="space-y-[2px]">
                <span className="text-[16px] text-[#495057] leading-[24px] block font-normal">
                  {isVi ? 'Liên hệ chuyên gia tư vấn' : isJa ? '専門家へのお問い合わせ' : 'Contact expert consultant'}
                </span>
                <span className="text-[18px] font-normal text-[#212529] leading-[28px] block">
                  0247 309 9899
                </span>
              </div>
            </div>

            <Link
              href="/contact"
              className="w-full bg-[#1769E2] hover:bg-[#1257BD] text-white font-semibold text-[14px] h-[48px] inline-flex items-center justify-center transition-all rounded-[3px]"
            >
              {isVi ? 'Gọi ngay' : isJa ? '今すぐお電話' : 'Call Now'}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

