'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Wrench,
  Cpu,
  Shield,
  Truck,
  FileText,
  Activity,
  Award,
  Package,
  Star,
  CheckCircle,
  HelpCircle,
  Clock,
  ClipboardCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { getTranslatedName, getTranslatedDescription } from '@/lib/i18n-content';
import type { Industry, Standard, ProductSku } from '@/lib/directus';

interface ProductTabsProps {
  locale: string;
  productName: string;
  skuCode: string;
  brand: string;
  categoryName: string;
  specifications: Record<string, string> | null;
  industries: Industry[];
  standards: Standard[];
  skus: ProductSku[];
}

export default function ProductTabs({
  locale,
  productName,
  skuCode,
  brand,
  categoryName,
  specifications,
  industries,
  standards,
  skus
}: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<'specs' | 'apps' | 'certs' | 'reviews'>('specs');

  // Pack size from the first SKU
  const packSize =
    skus[0]?.pack_size ?? (locale === 'vi' ? 'Đóng gói theo yêu cầu' : 'Standard packaging');

  const tabs = [
    { id: 'specs', label: locale === 'vi' ? 'Thông số kỹ thuật' : 'Specifications' },
    { id: 'apps', label: locale === 'vi' ? 'Ứng dụng' : 'Applications' },
    { id: 'certs', label: locale === 'vi' ? 'Chứng nhận' : 'Certifications' },
    { id: 'reviews', label: locale === 'vi' ? 'Đánh giá' : 'Reviews' }
  ] as const;

  // Render specifications tab content
  const renderSpecsContent = () => {
    // Generate technical bullet points dynamically based on product name/category
    const bulletPoints =
      locale === 'vi'
        ? [
          `Sản phẩm ${productName} được thiết kế với chất liệu cao cấp, bảo vệ tối ưu khỏi các tác nhân vật lý và hóa học khi thao tác.`,
          `Công nghệ dệt/đúc liền mạch mang lại độ ôm khít hoàn hảo, tăng tối đa độ nhạy cảm ứng đầu ngón tay và linh hoạt khi sử dụng.`,
          `Khả năng chống tĩnh điện hoặc chống nhiễm bẩn vượt trội, lý tưởng cho môi trường phòng sạch và trạm sản xuất linh kiện.`,
          `Chất liệu thân thiện, không gây kích ứng da, thông thoáng khí giúp người lao động thoải mái làm việc suốt ngày dài.`
        ]
        : [
          `The ${productName} is engineered with premium materials for optimal protection against physical and chemical hazards during handling.`,
          `Seamless construction provides a perfect snug fit, maximizing fingertip sensitivity and dexterity.`,
          `Excellent anti-static or contamination control properties, ideal for cleanrooms and sensitive assembly lines.`,
          `Skin-friendly, breathable materials keep workers comfortable throughout extended shifts.`
        ];

    return (
      <div className="space-y-8">
        {/* Top summary row: Description & Applications Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Bullet Points */}
          <div className="lg:col-span-8 space-y-4">
            <h4 className="text-base font-bold text-[#212529]">
              {locale === 'vi' ? 'Đặc tính kỹ thuật chi tiết' : 'Detailed Technical Features'}
            </h4>
            <ul className="space-y-3">
              {bulletPoints.map((bp, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-sm sm:text-base text-[#495057] leading-relaxed font-normal"
                >
                  <span className="text-[#1769E2] font-bold shrink-0 mt-0.5">•</span>
                  <span>{bp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Actual Applications Box (Figma Node 872:5353) */}
          <div className="lg:col-span-4">
            <div className="bg-[#F5F8FC] border-l-[3px] border-l-[#0F62FE] p-6 rounded-[3px] space-y-4 shadow-2xs">
              <h4 className="text-base font-bold text-[#212529]">
                {locale === 'vi' ? 'Ứng dụng thực tế' : 'Real-world Applications'}
              </h4>
              <div className="space-y-3.5">
                <div className="flex items-center gap-3 text-sm text-[#212529] font-medium">
                  <div className="w-8 h-8 rounded-[6px] bg-[#EBF3FE] flex items-center justify-center text-[#1769E2] shrink-0">
                    <Wrench className="h-4.5 w-4.5" />
                  </div>
                  <span>
                    {locale === 'vi'
                      ? 'Lắp ráp cơ khí & linh kiện'
                      : 'Mechanical & Component Assembly'}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#212529] font-medium">
                  <div className="w-8 h-8 rounded-[6px] bg-[#EBF3FE] flex items-center justify-center text-[#1769E2] shrink-0">
                    <FileText className="h-4.5 w-4.5" />
                  </div>
                  <span>
                    {locale === 'vi'
                      ? 'Gia công kim loại & tấm tôn'
                      : 'Metalworking & Sheet Handling'}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#212529] font-medium">
                  <div className="w-8 h-8 rounded-[6px] bg-[#EBF3FE] flex items-center justify-center text-[#1769E2] shrink-0">
                    <Truck className="h-4.5 w-4.5" />
                  </div>
                  <span>
                    {locale === 'vi'
                      ? 'Logistics, Kho vận & Đóng gói'
                      : 'Logistics, Warehouse & Packaging'}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#212529] font-medium">
                  <div className="w-8 h-8 rounded-[6px] bg-[#EBF3FE] flex items-center justify-center text-[#1769E2] shrink-0">
                    <Shield className="h-4.5 w-4.5" />
                  </div>
                  <span>
                    {locale === 'vi'
                      ? 'Bảo trì công nghiệp chung'
                      : 'General Industrial Maintenance'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical specifications table (Figma Node 884:931) */}
        <div className="space-y-4">
          <div className="border border-[#E5E7EB] rounded-[8px] overflow-hidden shadow-xs bg-white">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#1769E2] text-white text-xs sm:text-sm font-bold uppercase tracking-wider">
                  <th className="px-4 sm:px-6 py-3 w-1/3 sm:w-80">
                    {locale === 'vi' ? 'Thông số' : 'Parameter'}
                  </th>
                  <th className="px-4 sm:px-6 py-3">{locale === 'vi' ? 'Chi tiết' : 'Details'}</th>
                </tr>
              </thead>
              <tbody className="text-xs sm:text-sm text-[#212529] divide-y divide-[#E5E7EB]/50">
                {skuCode && (
                  <tr className="bg-white">
                    <td className="px-4 sm:px-6 py-3 font-semibold text-[#495057]">
                      {locale === 'vi' ? 'Mã sản phẩm' : 'Product Code'}
                    </td>
                    <td className="px-4 sm:px-6 py-3 font-bold text-[#212529]">{skuCode}</td>
                  </tr>
                )}
                {brand && (
                  <tr className="bg-[#F4F4F4]">
                    <td className="px-4 sm:px-6 py-3 font-semibold text-[#495057]">
                      {locale === 'vi' ? 'Thương hiệu' : 'Brand'}
                    </td>
                    <td className="px-4 sm:px-6 py-3 font-bold text-[#212529]">{brand}</td>
                  </tr>
                )}
                {categoryName && (
                  <tr className="bg-white">
                    <td className="px-4 sm:px-6 py-3 font-semibold text-[#495057]">
                      {locale === 'vi' ? 'Danh mục' : 'Category'}
                    </td>
                    <td className="px-4 sm:px-6 py-3 font-bold text-[#212529]">{categoryName}</td>
                  </tr>
                )}
                {specifications &&
                  Object.entries(specifications).map(([key, val], idx) => (
                    <tr key={key} className={idx % 2 === 0 ? 'bg-[#F4F4F4]' : 'bg-white'}>
                      <td className="px-4 sm:px-6 py-3 font-semibold text-[#495057]">{key}</td>
                      <td className="px-4 sm:px-6 py-3 font-bold text-[#212529]">{val}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Packaging Info & Shipping Schedule Banner (Figma Node 882:4421) */}
        <div className="border border-[#E5E7EB] rounded-[8px] p-6 sm:p-8 bg-white shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
          {/* Left image of Warehouse */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <div className="relative w-full aspect-[4/3] rounded-[8px] overflow-hidden border border-[#E5E7EB]">
              <Image
                src="/images/solutions/khoHang.png"
                alt="Kho hàng"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 360px"
              />
            </div>
            <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mt-2.5">
              {locale === 'vi' ? 'Kho hàng' : 'Warehouse'}
            </span>
          </div>

          {/* Right schedule table & description */}
          <div className="lg:col-span-8 space-y-4">
            <div className="space-y-1">
              <span className="text-sm font-semibold text-[#2563EB] uppercase tracking-wider block">
                {locale === 'vi' ? 'Thông tin đóng gói' : 'Packaging Information'}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#212529]">
                {packSize || (locale === 'vi' ? '50 đôi/thùng' : '50 pairs/carton')}
              </h3>
              <p className="text-sm text-[#495057] leading-relaxed pt-1">
                {locale === 'vi'
                  ? `Sản phẩm ${productName} được đóng gói trong thùng carton tiêu chuẩn, giúp bảo vệ sản phẩm trong quá trình vận chuyển và lưu kho. Thuận tiện cho quản lý tồn kho và sử dụng.`
                  : `The ${productName} is packaged in standard cartons to ensure protection during transport and storage. Convenient for inventory management and usage.`}
              </p>
            </div>

            {/* Chips */}
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#F3F4F6] border border-[#E5E7EB] rounded-full text-xs font-semibold text-[#111827]">
                <Truck className="h-4 w-4 text-[#1769E2]" />
                <span>{locale === 'vi' ? 'Giao hàng toàn quốc' : 'Nationwide Shipping'}</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#F3F4F6] border border-[#E5E7EB] rounded-full text-xs font-semibold text-[#111827]">
                <Package className="h-4 w-4 text-[#1769E2]" />
                <span>{locale === 'vi' ? 'Lưu kho dễ dàng' : 'Easy Storage'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tiêu chuẩn & Cam kết */}
        <div className="space-y-6 pt-6 border-t border-[#E5E7EB] text-left">
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-bold text-[#1769E2]">
              {locale === 'vi' ? 'Tiêu chuẩn & Cam kết' : 'Standards & Commitments'}
            </h3>
            <p className="text-sm sm:text-base font-semibold text-[#212529]">
              {locale === 'vi' ? 'Chứng nhận chất lượng sản phẩm' : 'Product Quality Certifications'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: ISO 9001:2015 */}
            <div className="p-4 sm:p-6 bg-white border border-[#E5E7EB] rounded-[6px] flex flex-col sm:flex-row gap-4 items-start shadow-2xs">
              <div className="w-10 h-10 rounded-[6px] bg-[#EBF3FE] flex items-center justify-center text-[#1769E2] shrink-0">
                <FileText className="h-5 w-5" />
              </div>
              <div className="space-y-1.5">
                <h4 className="text-sm font-bold text-[#212529]">ISO 9001:2015</h4>
                <p className="text-xs sm:text-sm text-[#495057] font-normal leading-relaxed">
                  {locale === 'vi'
                    ? 'Hệ thống quản lý chất lượng đạt tiêu chuẩn quốc tế cho hoạt động sản xuất và cung ứng vật tư công nghiệp.'
                    : 'Quality management system meets international standards for manufacturing and industrial supplies.'}
                </p>
              </div>
            </div>

            {/* Card 2: RoHS Compliant */}
            <div className="p-4 sm:p-6 bg-white border border-[#E5E7EB] rounded-[6px] flex flex-col sm:flex-row gap-4 items-start shadow-2xs">
              <div className="w-10 h-10 rounded-[6px] bg-[#EBF3FE] flex items-center justify-center text-[#1769E2] shrink-0">
                <Award className="h-5 w-5" />
              </div>
              <div className="space-y-1.5">
                <h4 className="text-sm font-bold text-[#212529]">RoHS / ANSI Compliant</h4>
                <p className="text-xs sm:text-sm text-[#495057] font-normal leading-relaxed">
                  {locale === 'vi'
                    ? 'Đảm bảo sản phẩm tuân thủ giới hạn chất độc hại, đạt chuẩn an toàn vệ sinh công nghiệp cao.'
                    : 'Ensures products comply with hazardous material limits and meet high industrial safety standards.'}
                </p>
              </div>
            </div>
          </div>

          {/* Footer banner */}
          <div className="p-4 bg-[#F5F8FC] rounded-[6px] flex items-center gap-3.5 text-xs sm:text-sm text-[#495057] font-medium border border-[#E5E7EB]/60">
            <ClipboardCheck className="h-5 w-5 text-[#1769E2] shrink-0" />
            <span>
              {locale === 'vi'
                ? 'Nhà sản xuất đạt các kiểm định an toàn vệ sinh công nghiệp cao, thích hợp đóng gói và sử dụng trong các nhà máy Dược phẩm, Điện tử và Thực phẩm.'
                : 'Manufacturer meets high industrial hygiene standards, suitable for packaging and application in Pharmaceutical, Electronics, and Food facilities.'}
            </span>
          </div>
        </div>
      </div>
    );
  };

  // Render applications tab content
  const renderAppsContent = () => {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4">
        {industries.map((ind) => (
          <Link
            key={ind.id}
            href={`/${locale}/solutions?industry=${ind.slug}`}
            className="flex flex-col items-center justify-center p-4 sm:p-6 rounded-[6px] border border-[#E5E7EB] bg-white hover:border-[#1769E2] hover:shadow-md transition-all text-center group"
          >
            <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-[#F5F8FC] flex items-center justify-center text-slate-500 group-hover:bg-[#EBF3FE] group-hover:text-[#1769E2] mb-2 sm:mb-4 shrink-0 transition-colors">
              <Cpu className="h-4 sm:h-5 w-4 sm:w-5" />
            </div>
            <span className="text-xs sm:text-sm font-bold text-[#212529] group-hover:text-[#1769E2] transition-colors line-clamp-2">
              {getTranslatedName(ind, locale)}
            </span>
          </Link>
        ))}
      </div>
    );
  };

  // Render certifications/standards tab content
  const renderCertsContent = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
        {standards.map((std) => (
          <div
            key={std.id}
            className="flex items-start gap-4 p-4 sm:p-5 bg-white border border-[#E5E7EB] rounded-[6px] shadow-xs"
          >
            <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-[6px] bg-[#EBF3FE] border border-blue-100 flex items-center justify-center text-[#1769E2] shrink-0">
              <Award className="h-5 sm:h-6 w-5 sm:w-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#212529]">{getTranslatedName(std, locale)}</h4>
              {getTranslatedDescription(std, locale) && (
                <p className="text-xs sm:text-sm text-[#495057] leading-relaxed mt-1 font-normal">
                  {getTranslatedDescription(std, locale)}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Render mock reviews tab content
  const renderReviewsContent = () => {
    const reviews = [
      {
        author: 'Trần Minh H.',
        company: 'Samsung Electro-Mechanics',
        text: 'Chất lượng đóng gói rất đồng đều. Hàng chống tĩnh điện đo thử đạt chuẩn điện trở yêu cầu.',
        rating: 5,
        date: '12/06/2026'
      },
      {
        author: 'Nguyễn Thuỳ D.',
        company: 'Foxconn Bắc Giang',
        text: 'Khả năng chịu kéo căng tốt, rất ít khi bị rách khi quấn góc pallet sắc nhọn.',
        rating: 4,
        date: '28/05/2026'
      },
      {
        author: 'Yamada T.',
        company: 'Nidec Vietnam',
        text: 'Giao hàng đúng hẹn, đầy đủ chứng chỉ chất lượng CO/CQ cho từng đợt hàng.',
        rating: 5,
        date: '14/05/2026'
      }
    ];

    return (
      <div className="space-y-6 py-4">
        {/* Rating Summary Card */}
        <div className="bg-[#F5F8FC] border border-[#E5E7EB] p-4 sm:p-6 rounded-[6px] flex flex-col sm:flex-row gap-6 items-center justify-between">
          <div className="text-center sm:text-left space-y-1">
            <p className="text-2xl font-bold text-[#212529]">4.7 / 5.0</p>
            <div className="flex text-amber-400 justify-center sm:justify-start">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="text-xs text-[#6B7280] font-medium">
              12 {locale === 'vi' ? 'đánh giá' : 'reviews'}
            </p>
          </div>
          <div className="flex items-center gap-1.5 px-4 py-2 bg-white border border-[#E5E7EB] rounded-[6px] shadow-2xs whitespace-nowrap">
            <CheckCircle className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
            <span className="text-xs sm:text-sm font-bold text-[#212529]">100% Hài lòng</span>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4 divide-y divide-[#E5E7EB]">
          {reviews.map((rev, i) => (
            <div key={i} className="pt-4 first:pt-0 space-y-2">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-4">
                <div>
                  <span className="text-sm font-bold text-[#212529]">{rev.author}</span>
                  <span className="text-xs text-[#6B7280] ml-2">({rev.company})</span>
                </div>
                <span className="text-xs text-[#6B7280] shrink-0">{rev.date}</span>
              </div>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, starIdx) => (
                  <Star
                    key={starIdx}
                    className={cn(
                      'h-3.5 w-3.5 fill-current',
                      starIdx < rev.rating ? 'text-amber-400' : 'text-slate-200'
                    )}
                  />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-[#495057] font-normal leading-relaxed">
                {rev.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Tab Navigation (Figma Node 872:5336) */}
      <div className="border-b border-[#DCE0E5] mb-6 overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
        <nav className="flex items-center gap-6 -mb-px">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'text-base pb-3 px-1 transition-all border-b-[3px] font-bold focus:outline-none whitespace-nowrap cursor-pointer',
                  isActive
                    ? 'text-[#1769E2] border-[#1769E2]'
                    : 'text-[#495057] border-transparent hover:text-[#1769E2]'
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content rendering */}
      <div className="transition-opacity duration-150">
        {activeTab === 'specs' && renderSpecsContent()}
        {activeTab === 'apps' && renderAppsContent()}
        {activeTab === 'certs' && renderCertsContent()}
        {activeTab === 'reviews' && renderReviewsContent()}
      </div>
    </div>
  );
}

