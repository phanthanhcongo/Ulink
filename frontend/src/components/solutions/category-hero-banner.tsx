'use client';

import React from 'react';
import Image from 'next/image';
import { Search } from 'lucide-react';
import { ASSETS } from '@/lib/assets';
import { Breadcrumb } from '@/components/ui/breadcrumb';

interface CategoryHeroBannerProps {
  isSearchPage: boolean;
  currentCategoryName: string;
  categoryDescription?: string;
  categorySlug: string;
  locale: string;
  searchQuery: string;
  searchInput: string;
  filteredProductsCount: number;
  onSearchInputChange: (value: string) => void;
  onSearchSubmit: () => void;
  sortBy: string;
  onSortChange: (value: string) => void;
}

const CATEGORY_IMAGE_MAP: Record<string, string> = {
  // Parent categories
  'vat-tu-phong-sach': '/images/solutions/banerVattu.png',
  'bao-bi-dong-goi': '/images/solutions/maxresdefault.jpg',
  'bang-keo-nhom': '/images/solutions/banerBangkeo.png',
  // Sub categories
  'cleanroom-consumables': '/images/about/gallery/cleanroom-materials-warehouse.png',
  'cleanroom-gloves': ASSETS.home.productCutGloves,
  'cleanroom-wipers': ASSETS.home.solutionPackaging,
  'cleanroom-apparel': ASSETS.about.heroWarehouse,
  'cleanroom-masks': ASSETS.about.qualityLab,
  'industrial-packaging': ASSETS.home.productCustomPkg,
  'esd-supplies': ASSETS.home.productHvacTape,
  'cleanroom-chemicals': ASSETS.home.solutionCleanroom
};

const PARENT_CATEGORY_BANNER: Record<string, {
  vi: { title: string; description: string; breadcrumbParent: string };
  en: { title: string; description: string; breadcrumbParent: string };
}> = {
  'bao-bi-dong-goi': {
    vi: {
      title: 'Tất cả sản phẩm Bao bì & Đóng gói',
      description: 'Đa dạng giải pháp bao bì công nghiệp chất lượng cao, từ màng co, thùng carton đến vật liệu đóng gói chuyên dụng, đáp ứng mọi nhu cầu sản xuất và xuất khẩu.',
      breadcrumbParent: 'Bao bì & Đóng gói'
    },
    en: {
      title: 'All Packaging & Logistics Products',
      description: 'Comprehensive industrial packaging solutions from shrink films, cartons to specialized packing materials for all manufacturing and export needs.',
      breadcrumbParent: 'Packaging & Logistics'
    }
  },
  'vat-tu-phong-sach': {
    vi: {
      title: 'Tất cả sản phẩm phòng sạch',
      description: 'Sản phẩm chất lượng cao giúp kiểm soát ô nhiễm, duy trì môi trường sản xuất sạch sẽ, bảo đảm an toàn tuyệt đối cho linh kiện, thiết bị và con người.',
      breadcrumbParent: 'Giải pháp phòng sạch'
    },
    en: {
      title: 'All Cleanroom Products',
      description: 'High-quality products for contamination control, maintaining clean production environments, ensuring absolute safety for components, equipment and personnel.',
      breadcrumbParent: 'Cleanroom Supplies'
    }
  },
  'bang-keo-nhom': {
    vi: {
      title: 'Tất cả sản phẩm Băng keo Nhôm',
      description: 'Đa dạng giải pháp băng keo nhôm chất lượng cao cho hệ thống HVAC, ống gió, cách nhiệt và bảo trì công nghiệp, đáp ứng tiêu chuẩn kỹ thuật khắt khe.',
      breadcrumbParent: 'Công nghiệp & HVAC'
    },
    en: {
      title: 'All Aluminum Tape Products',
      description: 'High-quality aluminum tape solutions for HVAC systems, air ducts, insulation and industrial maintenance, meeting strict technical standards.',
      breadcrumbParent: 'Industrial & HVAC'
    }
  }
};

export function CategoryHeroBanner({
  isSearchPage,
  currentCategoryName,
  categoryDescription,
  categorySlug,
  locale,
  searchQuery,
  searchInput,
  filteredProductsCount,
  onSearchInputChange,
  onSearchSubmit,
  sortBy,
  onSortChange
}: CategoryHeroBannerProps) {
  const ITEMS_PER_PAGE = 6;
  const parentBanner = PARENT_CATEGORY_BANNER[categorySlug];
  const bannerLocale = (locale === 'vi' || locale === 'en') ? locale : 'vi';
  const bannerTitle = parentBanner
    ? parentBanner[bannerLocale].title
    : (locale === 'vi'
        ? `Tất cả sản phẩm ${currentCategoryName.toLowerCase()}`
        : `All ${currentCategoryName} Products`);
  const bannerDescription = parentBanner
    ? parentBanner[bannerLocale].description
    : (categoryDescription ||
        `Tổng hợp các loại ${currentCategoryName.toLowerCase()} đạt tiêu chuẩn kiểm định phòng sạch ISO 14644-1, điện trở tĩnh điện ANSI/ESD S20.20 và chứng nhận CO/CQ chính hãng.`);

  return (
    <header className="w-full" style={{ backgroundColor: '#F5F8FC' }}>
      <div className="page-container py-6 lg:py-[48px] text-slate-800 relative overflow-hidden">
        <div className="mb-4 hidden md:block">
          <Breadcrumb
            className="px-0 sm:px-0 lg:px-0 xl:px-0 mx-0 max-w-none"
            items={
              isSearchPage
                ? [
                    {
                      label: locale === 'vi' ? 'Trang chủ' : 'Home',
                      href: '/'
                    },
                    {
                      label: locale === 'vi' ? 'Sản phẩm' : 'Products',
                      href: '/solutions/listProduct'
                    },
                    {
                      label: locale === 'vi' ? 'Tìm kiếm' : 'Search'
                    }
                  ]
                : [
                    {
                      label: locale === 'vi' ? 'Trang chủ' : 'Home',
                      href: '/'
                    },
                    {
                      label: locale === 'vi' ? 'Sản phẩm' : 'Products',
                      href: categorySlug ? '/solutions/listProduct' : undefined
                    },
                    ...(categorySlug ? [
                      {
                        label: currentCategoryName
                      }
                    ] : [])
                  ]
            }
          />
        </div>

        {isSearchPage ? (
          <div className="relative z-10 space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              {searchQuery.trim() ? (
                <div suppressHydrationWarning>
                  <h1 className="text-section-title font-bold text-slate-900 tracking-tight leading-tight">
                    {locale === 'vi'
                      ? `Kết quả tìm kiếm cho "${searchQuery}"`
                      : `Search results for "${searchQuery}"`}
                  </h1>
                  <p className="mt-2 text-caption-responsive text-slate-500 font-semibold">
                    {locale === 'vi'
                      ? `Hiển thị 1-${Math.min(filteredProductsCount, ITEMS_PER_PAGE)} trong tổng số ${filteredProductsCount} sản phẩm`
                      : `Showing 1-${Math.min(filteredProductsCount, ITEMS_PER_PAGE)} of ${filteredProductsCount} products`}
                  </p>
                </div>
              ) : (
                <div>
                  <h1 className="text-section-title font-bold text-slate-900 tracking-tight leading-tight">
                    {locale === 'vi'
                      ? 'Hãy nhập từ khóa để tìm kiếm sản phẩm'
                      : 'Please enter keywords to search for products'}
                  </h1>
                </div>
              )}

              <div className="flex items-center gap-2 self-start md:self-end">
                <span className="text-caption-responsive text-slate-400 font-bold">{locale === 'vi' ? 'Sắp xếp:' : 'Sort:'}</span>
                <select
                  value={sortBy}
                  onChange={(e) => onSortChange(e.target.value)}
                  className="px-3 py-2 rounded-[3px] border border-slate-200 text-caption-responsive font-bold text-slate-700 bg-white focus:outline-none focus:ring-1 focus:ring-blue-600 shadow-xs cursor-pointer"
                >
                  <option value="popular">{locale === 'vi' ? 'Liên quan nhất' : 'Most Relevant'}</option>
                  <option value="newest">{locale === 'vi' ? 'Sản phẩm mới nhất' : 'Newest'}</option>
                  <option value="name_asc">{locale === 'vi' ? 'Tên A → Z' : 'Name A → Z'}</option>
                  <option value="name_desc">{locale === 'vi' ? 'Tên Z → A' : 'Name Z → A'}</option>
                </select>
              </div>
            </div>

            <div className="max-w-2xl bg-white border border-slate-200 rounded-full p-1.5 pl-4 flex items-center shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
              <div className="pl-3.5 pr-2 text-slate-400">
                <Search className="h-5 w-5" />
              </div>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => onSearchInputChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    onSearchSubmit();
                  }
                }}
                placeholder={locale === 'vi' ? 'Tìm kiếm sản phẩm...' : 'Search products...'}
                className="flex-1 bg-transparent text-body-regular text-slate-800 focus:outline-none font-medium placeholder:text-slate-400 py-1.5"
              />
              <button
                onClick={onSearchSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-caption-responsive px-6 py-2 rounded-full shadow-sm transition-colors cursor-pointer shrink-0"
              >
                {locale === 'vi' ? 'Tìm lại' : 'Search again'}
              </button>
            </div>
          </div>
        ) : (
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-6 lg:gap-[40px]">
            {/* Banner Left - Text */}
            <div className="flex-1 flex flex-col gap-[16px]">
              <h1 className="text-2xl sm:text-3xl lg:text-[38px] lg:leading-[46px] font-bold text-[#212529] tracking-[-0.0158em]" suppressHydrationWarning>
                {bannerTitle}
              </h1>

              <p className="text-base lg:text-[20px] lg:leading-[28px] font-normal text-[#495057] max-w-2xl">
                {bannerDescription}
              </p>
            </div>

            {/* Banner Right - Image */}
            <div className="hidden lg:block shrink-0">
              <div className="relative w-[496px] h-[280px] rounded-[3px] overflow-hidden">
                <Image
                  src={CATEGORY_IMAGE_MAP[categorySlug] || ASSETS.home.solutionCleanroom}
                  alt={currentCategoryName}
                  fill
                  sizes="496px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
