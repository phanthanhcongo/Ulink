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
  Award,
  Package,
  Star,
  CheckCircle,
  ClipboardCheck,
  MessageSquare
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { getTranslatedName, getTranslatedDescription } from '@/lib/i18n-content';
import type { Industry, Standard, ProductSku } from '@/lib/directus';
import type { ProductReview } from '@/lib/product-data';

interface ProductTabsProps {
  locale: string;
  productName: string;
  skuCode: string;
  brand: string;
  categoryName: string;
  description: string | null;
  specifications: Record<string, string> | null;
  industries: Industry[];
  standards: Standard[];
  reviews: ProductReview[];
  skus: ProductSku[];
}

export default function ProductTabs({
  locale,
  productName,
  skuCode,
  brand,
  categoryName,
  description,
  specifications,
  industries,
  standards,
  reviews,
  skus
}: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<'specs' | 'apps' | 'certs' | 'reviews'>('specs');

  const packSize =
    skus[0]?.pack_size ?? (locale === 'vi' ? 'Liên hệ' : 'Contact us');

  const tabs = [
    { id: 'specs', label: locale === 'vi' ? 'Thông số kỹ thuật' : 'Specifications' },
    { id: 'apps', label: locale === 'vi' ? 'Ứng dụng' : 'Applications' },
    { id: 'certs', label: locale === 'vi' ? 'Chứng nhận' : 'Certifications' },
    { id: 'reviews', label: locale === 'vi' ? 'Đánh giá' : 'Reviews' }
  ] as const;

  const INDUSTRY_ICONS = [Wrench, Cpu, Truck, Shield, FileText, Package];

  const renderSpecsContent = () => {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Description */}
          <div className="lg:col-span-8 space-y-4">
            {description ? (
              <div
                className="prose prose-sm max-w-none text-[#495057] leading-relaxed
                  [&_ul]:space-y-2 [&_ul]:list-none [&_ul]:pl-0
                  [&_li]:flex [&_li]:items-start [&_li]:gap-2.5
                  [&_li]:before:content-['•'] [&_li]:before:text-[#1769E2] [&_li]:before:font-bold [&_li]:before:shrink-0 [&_li]:before:mt-0.5"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            ) : (
              <p className="text-sm text-[#495057] leading-relaxed">
                {locale === 'vi'
                  ? `Thông tin chi tiết về sản phẩm ${productName} đang được cập nhật.`
                  : `Detailed information about ${productName} is being updated.`}
              </p>
            )}
          </div>

          {/* Right: Applications from industries */}
          {industries.length > 0 && (
            <div className="lg:col-span-4">
              <div className="bg-[#F5F8FC] border-l-[3px] border-l-[#0F62FE] p-6 rounded-[3px] space-y-4 shadow-2xs">
                <h4 className="text-base font-bold text-[#212529]">
                  {locale === 'vi' ? 'Ứng dụng thực tế' : 'Real-world Applications'}
                </h4>
                <div className="space-y-3.5">
                  {industries.slice(0, 4).map((ind, idx) => {
                    const Icon = INDUSTRY_ICONS[idx % INDUSTRY_ICONS.length];
                    return (
                      <div key={ind.id} className="flex items-center gap-3 text-sm text-[#212529] font-medium">
                        <div className="w-8 h-8 rounded-[3px] bg-[#EBF3FE] flex items-center justify-center text-[#1769E2] shrink-0">
                          <Icon className="h-4.5 w-4.5" />
                        </div>
                        <span>{getTranslatedName(ind, locale)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Technical specifications table */}
        {(skuCode || brand || categoryName || (specifications && Object.keys(specifications).length > 0)) && (
          <div className="space-y-4">
            <div className="border border-[#E5E7EB] rounded-[3px] overflow-hidden shadow-xs bg-white">
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
        )}

        {/* Packaging Info */}
        <div className="border border-[#E5E7EB] rounded-[3px] p-6 sm:p-8 bg-white shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
          <div className="lg:col-span-4 flex flex-col items-center">
            <div className="relative w-full aspect-[4/3] rounded-[3px] overflow-hidden border border-[#E5E7EB]">
              <Image
                src="/images/solutions/khoHang.png"
                alt={locale === 'vi' ? 'Kho hàng' : 'Warehouse'}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 360px"
              />
            </div>
            <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mt-2.5">
              {locale === 'vi' ? 'Kho hàng' : 'Warehouse'}
            </span>
          </div>

          <div className="lg:col-span-8 space-y-4">
            <div className="space-y-1">
              <span className="text-sm font-semibold text-[#2563EB] uppercase tracking-wider block">
                {locale === 'vi' ? 'Thông tin đóng gói' : 'Packaging Information'}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#212529]">
                {packSize}
              </h3>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#F3F4F6] border border-[#E5E7EB] rounded-[3px] text-xs font-semibold text-[#111827]">
                <Truck className="h-4 w-4 text-[#1769E2]" />
                <span>{locale === 'vi' ? 'Giao hàng toàn quốc' : 'Nationwide Shipping'}</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#F3F4F6] border border-[#E5E7EB] rounded-[3px] text-xs font-semibold text-[#111827]">
                <Package className="h-4 w-4 text-[#1769E2]" />
                <span>{locale === 'vi' ? 'Lưu kho dễ dàng' : 'Easy Storage'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Standards & Certifications from DB */}
        {standards.length > 0 && (
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
              {standards.map((std) => (
                <div key={std.id} className="p-4 sm:p-6 bg-white border border-[#E5E7EB] rounded-[3px] flex flex-col sm:flex-row gap-4 items-start shadow-2xs">
                  <div className="w-10 h-10 rounded-[3px] bg-[#EBF3FE] flex items-center justify-center text-[#1769E2] shrink-0">
                    <Award className="h-5 w-5" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-sm font-bold text-[#212529]">{getTranslatedName(std, locale)}</h4>
                    {getTranslatedDescription(std, locale) && (
                      <p className="text-xs sm:text-sm text-[#495057] font-normal leading-relaxed">
                        {getTranslatedDescription(std, locale)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderAppsContent = () => {
    if (industries.length === 0) {
      return (
        <div className="py-12 text-center text-sm text-[#6B7280]">
          <Cpu className="h-10 w-10 mx-auto mb-3 text-[#D1D5DB]" />
          <p>{locale === 'vi' ? 'Thông tin ứng dụng đang được cập nhật.' : 'Application information is being updated.'}</p>
        </div>
      );
    }
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4">
        {industries.map((ind, idx) => {
          const Icon = INDUSTRY_ICONS[idx % INDUSTRY_ICONS.length];
          return (
            <Link
              key={ind.id}
              href={`/${locale}/solutions?industry=${ind.slug}`}
              className="flex flex-col items-center justify-center p-4 sm:p-6 rounded-[3px] border border-[#E5E7EB] bg-white hover:border-[#1769E2] hover:shadow-md transition-all text-center group"
            >
              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-[#F5F8FC] flex items-center justify-center text-slate-500 group-hover:bg-[#EBF3FE] group-hover:text-[#1769E2] mb-2 sm:mb-4 shrink-0 transition-colors">
                <Icon className="h-4 sm:h-5 w-4 sm:w-5" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-[#212529] group-hover:text-[#1769E2] transition-colors line-clamp-2">
                {getTranslatedName(ind, locale)}
              </span>
            </Link>
          );
        })}
      </div>
    );
  };

  const renderCertsContent = () => {
    if (standards.length === 0) {
      return (
        <div className="py-12 text-center text-sm text-[#6B7280]">
          <Award className="h-10 w-10 mx-auto mb-3 text-[#D1D5DB]" />
          <p>{locale === 'vi' ? 'Thông tin chứng nhận đang được cập nhật.' : 'Certification information is being updated.'}</p>
        </div>
      );
    }
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
        {standards.map((std) => (
          <div
            key={std.id}
            className="flex items-start gap-4 p-4 sm:p-5 bg-white border border-[#E5E7EB] rounded-[3px] shadow-xs"
          >
            <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-[3px] bg-[#EBF3FE] border border-blue-100 flex items-center justify-center text-[#1769E2] shrink-0">
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

  const renderReviewsContent = () => {
    if (reviews.length === 0) {
      return (
        <div className="py-12 text-center text-sm text-[#6B7280]">
          <MessageSquare className="h-10 w-10 mx-auto mb-3 text-[#D1D5DB]" />
          <p className="font-semibold text-[#495057] mb-1">
            {locale === 'vi' ? 'Chưa có đánh giá nào' : 'No reviews yet'}
          </p>
          <p>
            {locale === 'vi'
              ? 'Hãy là người đầu tiên đánh giá sản phẩm này.'
              : 'Be the first to review this product.'}
          </p>
        </div>
      );
    }

    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    const ratingCounts = [5, 4, 3, 2, 1].map(
      (star) => ({ star, count: reviews.filter((r) => r.rating === star).length })
    );

    return (
      <div className="space-y-8 py-4">
        {/* Summary */}
        <div className="flex flex-col sm:flex-row gap-8 items-start">
          <div className="flex flex-col items-center gap-1 min-w-[120px]">
            <span className="text-4xl font-bold text-[#212529]">{avgRating.toFixed(1)}</span>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={cn('h-5 w-5', s <= Math.round(avgRating) ? 'text-yellow-400 fill-yellow-400' : 'text-[#D1D5DB]')}
                />
              ))}
            </div>
            <span className="text-sm text-[#6B7280]">
              {reviews.length} {locale === 'vi' ? 'đánh giá' : 'reviews'}
            </span>
          </div>
          <div className="flex-1 space-y-1.5 w-full">
            {ratingCounts.map(({ star, count }) => (
              <div key={star} className="flex items-center gap-2 text-sm">
                <span className="w-8 text-right font-semibold text-[#495057]">{star} ★</span>
                <div className="flex-1 h-2.5 bg-[#F3F4F6] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 rounded-full"
                    style={{ width: `${reviews.length > 0 ? (count / reviews.length) * 100 : 0}%` }}
                  />
                </div>
                <span className="w-8 text-[#6B7280]">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Review list */}
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="border border-[#E5E7EB] rounded-[3px] p-5 bg-white shadow-xs">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#212529]">{review.reviewer_name}</span>
                    {review.is_verified && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-green-700 bg-green-50 px-1.5 py-0.5 rounded">
                        <CheckCircle className="h-3 w-3" />
                        {locale === 'vi' ? 'Đã xác thực' : 'Verified'}
                      </span>
                    )}
                  </div>
                  {review.reviewer_company && (
                    <span className="text-xs text-[#6B7280]">{review.reviewer_company}</span>
                  )}
                </div>
                <span className="text-xs text-[#9CA3AF] whitespace-nowrap">
                  {new Date(review.date_created).toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex gap-0.5 mb-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={cn('h-4 w-4', s <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-[#D1D5DB]')}
                  />
                ))}
              </div>
              {review.title && (
                <h4 className="text-sm font-bold text-[#212529] mb-1">{review.title}</h4>
              )}
              <p className="text-sm text-[#495057] leading-relaxed">{review.content}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
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

      <div className="transition-opacity duration-150">
        {activeTab === 'specs' && renderSpecsContent()}
        {activeTab === 'apps' && renderAppsContent()}
        {activeTab === 'certs' && renderCertsContent()}
        {activeTab === 'reviews' && renderReviewsContent()}
      </div>
    </div>
  );
}
