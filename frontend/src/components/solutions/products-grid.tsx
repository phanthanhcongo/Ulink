'use client';

import React from 'react';
import Image from 'next/image';
import { Package, RotateCcw } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { ASSETS } from '@/lib/assets';
import { ProductCard } from './product-card';

export interface ProductItem {
  id: number;
  name: string;
  slug: string;
  brand: string;
  categoryName: string;
  categorySlug: string;
  shortDescription: string;
  stockStatus: 'in_stock' | 'low_stock' | 'on_order';
  image?: string;
  specs?: string[];
  unit?: string;
  packSize?: string;
  standards?: any[];
  industries?: any[];
  specifications?: Record<string, string> | null;
  price?: number | null;
}

interface ProductsGridProps {
  products: ProductItem[];
  viewType: 'grid' | 'list';
  locale: string;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onAddToCart: (e: React.MouseEvent, product: ProductItem) => void;
  addedProductIds: Set<number>;
  onShowAllProducts: () => void;
}

export function ProductsGrid({
  products,
  viewType,
  locale,
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  onAddToCart,
  addedProductIds,
  onShowAllProducts
}: ProductsGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-[3px] bg-white p-12 border border-slate-200/80 shadow-sm text-center flex flex-col items-center justify-center">
        <Package className="h-16 w-16 text-slate-300 mb-4" />
        <h3 className="text-card-title font-bold text-slate-800">
          Chưa có sản phẩm trong danh mục này
        </h3>
        <p className="text-caption-responsive text-slate-500 mt-1 max-w-md">
          Vui lòng chọn danh mục sản phẩm khác ở cột bên trái.
        </p>
        <button
          onClick={onShowAllProducts}
          className="mt-6 px-5 py-2.5 rounded-[3px] bg-blue-600 text-white text-caption-responsive font-bold shadow-sm hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Xem tất cả sản phẩm
        </button>
      </div>
    );
  }

  const formatPrice = (price: number | null | undefined, locale: string) => {
    if (!price) return 'Liên hệ báo giá';
    const minPrice = Math.round(price * 0.8);
    const maxPrice = Math.round(price);
    if (locale === 'vi') {
      return `${minPrice.toLocaleString('vi-VN')}-${maxPrice.toLocaleString('vi-VN')}đ`;
    }
    return `$${minPrice}-$${maxPrice}`;
  };

  return (
    <div>
      <div className={viewType === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6' : 'flex flex-col gap-4'}>
        {products.map((product) => {
          const mappedProduct = {
            id: product.id,
            slug: product.slug,
            name: product.name,
            description: product.shortDescription,
            image: product.image,
            price: formatPrice(product.price, locale),
            moq: `MOQ: ${product.packSize || 'Liên hệ'}`,
            moqUnit: product.unit,
            status: product.stockStatus === 'in_stock' ? (locale === 'vi' ? 'Có sẵn tại Kho' : 'In Stock') : (locale === 'vi' ? 'Sản xuất theo yêu cầu' : 'Custom orders'),
            location: 'Hub Hà Nam, Việt Nam',
            unit: product.unit
          };

          return viewType === 'grid' ? (
            <ProductCard key={product.id} product={mappedProduct} locale={locale} />
          ) : (
            <div key={product.id} className="bg-white border border-slate-200/80 rounded-[3px] p-4 flex flex-col md:flex-row gap-5 hover:shadow-md transition-shadow">
              <div className="relative w-full md:w-44 h-32 shrink-0 rounded-[3px] overflow-hidden bg-slate-50 border border-slate-100">
                <Link href={`/solutions/listProduct/${product.slug}`} className="block w-full h-full">
                  <Image
                    src={product.image || ASSETS.home.solutionCleanroom}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 176px"
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </Link>
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-caption-responsive font-bold uppercase bg-blue-50 text-blue-600 px-2 py-0.5 rounded-[2px] border border-blue-100">
                      {product.brand}
                    </span>
                    <span className="text-caption-responsive font-bold text-slate-400">
                      {product.categoryName}
                    </span>
                  </div>
                  <Link href={`/solutions/listProduct/${product.slug}`} className="block">
                    <h4 className="text-body-regular font-bold text-slate-900 hover:text-blue-600 transition-colors line-clamp-1">
                      {product.name}
                    </h4>
                  </Link>
                  <p className="text-caption-responsive text-slate-500 font-medium line-clamp-2 mt-1.5 leading-relaxed">
                    {product.shortDescription || 'Mô tả chi tiết sản phẩm phòng sạch chất lượng cao từ ULink Industries.'}
                  </p>
                  <div className="text-body-small font-bold text-slate-900 mt-3">
                    {formatPrice(product.price, locale)} / {product.unit || 'kg'}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 mt-3 pt-2.5 border-t border-slate-50">
                  <div className="flex items-center gap-3.5 text-caption-responsive font-semibold text-slate-500">
                    <div>
                      <span className="text-slate-400 font-medium">{locale === 'vi' ? 'Kho hàng:' : 'Warehouse:'}</span>{' '}
                      <span className="text-slate-700 font-bold">Hà Nam, Việt Nam</span>
                    </div>
                    <span className="text-slate-200">|</span>
                    <div>
                      <span className="text-slate-400 font-medium">MOQ:</span>{' '}
                      <span className="text-slate-700 font-bold">100 {product.unit || 'cái'}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => onAddToCart(e, product)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-caption-responsive rounded-[3px] transition-colors shadow-xs cursor-pointer"
                    >
                      {locale === 'vi' ? 'Đặt hàng' : 'Add to RFQ'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12 pt-4">
          <button
            onClick={() => {
              onPageChange(Math.max(1, currentPage - 1));
              window.scrollTo({ top: 300, behavior: 'smooth' });
            }}
            disabled={currentPage === 1}
            className="h-9 w-9 rounded-[3px] border border-slate-200 text-body-regular font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer"
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
            <button
              key={page}
              onClick={() => {
                onPageChange(page);
                window.scrollTo({ top: 300, behavior: 'smooth' });
              }}
              className={`h-9 w-9 rounded-[3px] text-caption-responsive font-bold transition-all cursor-pointer ${
                currentPage === page
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => {
              onPageChange(Math.min(totalPages, currentPage + 1));
              window.scrollTo({ top: 300, behavior: 'smooth' });
            }}
            disabled={currentPage === totalPages}
            className="h-9 w-9 rounded-[3px] border border-slate-200 text-body-regular font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer"
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
}
