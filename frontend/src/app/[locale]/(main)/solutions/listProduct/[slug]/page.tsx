import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import {
  ChevronRight,
  Package,
  ShieldCheck,
  FileDown,
  FileText,
  Truck,
  MapPin,
  Search,
  Award,
  Droplets,
  Wind,
  Link2,
  CalendarRange,
  Globe2,
  Bookmark,
  Maximize2,
  RefreshCw,
  Plus,
  ArrowRight
} from 'lucide-react';
import { getDirectusUrl } from '@/lib/directus-runtime.mjs';
import { resolveImageUrl } from '@/lib/image-url';
import {
  getTranslatedName,
  getTranslatedField,
  getTranslatedDescription
} from '@/lib/i18n-content';
import {
  fetchProductBySlug,
  fetchProducts,
  getProductPricing,
  ProductSku,
  Product
} from '@/lib/product-data';
import ProductDetailClient from '@/components/product/product-detail-client';
import ProductTabs from '@/components/product/product-tabs';
import { ProductImageGallery } from '@/components/product/product-image-gallery';
import ProductContactCta from '@/components/product/product-contact-cta';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import SavedProductsSection from '@/components/product/saved-products-section';

export const dynamic = 'force-dynamic';

interface ProductDetailPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProductDetailPageProps) {
  const { locale, slug } = await params;
  const product = await fetchProductBySlug(slug);

  if (!product) {
    return { title: 'Sản phẩm không tồn tại | ULink Industries' };
  }

  const name = getTranslatedName(product, locale) || product.name;
  const desc =
    getTranslatedField(product, 'short_description', locale) || product.short_description || '';

  return {
    title: `${name} | Giải pháp Phòng sạch & Đóng gói ULink`,
    description: desc
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const product = await fetchProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL || getDirectusUrl();
  const productName = getTranslatedName(product, locale) || product.name;
  const productDescription =
    getTranslatedField(product, 'short_description', locale) || product.short_description;

  const category =
    typeof product.category === 'object' && product.category !== null ? product.category : null;
  const categoryName = category ? getTranslatedName(category, locale) || category.name : null;

  const pricing = getProductPricing(product.slug, locale);

  const skus: ProductSku[] = (product.skus as ProductSku[]) || [];
  const gallery = Array.isArray(product.gallery) ? product.gallery : [];
  const documents = Array.isArray(product.documents) ? product.documents : [];
  const standards = Array.isArray(product.standards)
    ? product.standards.map((s: any) => s.standards_id).filter(Boolean)
    : [];

  const industries = Array.isArray(product.industries)
    ? product.industries.map((i: any) => i.industries_id).filter(Boolean)
    : [];

  const skuCode = skus[0]?.sku_code ?? null;

  const formatPrice = (amount: number) => {
    if (locale === 'vi') {
      return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
    }
    return (
      '$' +
      new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(
        amount / 25000
      )
    );
  };

  const specs = product.specifications as Record<string, string> | null;

  const productGalleryImages: Array<{ src: string; alt: string; label?: string }> = [];

  const rawHero = product.hero;
  const heroId = typeof rawHero === 'object' && rawHero !== null ? (rawHero as any).id : rawHero;

  if (heroId) {
    const heroSrc = resolveImageUrl(heroId);
    if (heroSrc) productGalleryImages.push({
      src: heroSrc,
      alt: `${productName} - Ảnh đại diện Database`,
      label: 'Ảnh chính DB'
    });
  }

  gallery.forEach((fileObj, idx) => {
    const rawFileRef = fileObj?.directus_files_id;
    const fileId =
      typeof rawFileRef === 'object' && rawFileRef !== null ? (rawFileRef as any).id : rawFileRef;
    if (fileId) {
      const fileSrc = resolveImageUrl(fileId);
      if (fileSrc && !productGalleryImages.some((img) => img.src === fileSrc)) {
        productGalleryImages.push({
          src: fileSrc,
          alt: `${productName} - Bộ sưu tập DB ${idx + 1}`,
          label: `Bộ ảnh DB ${idx + 1}`
        });
      }
    }
  });

  skus.forEach((sku, idx) => {
    const rawSkuImage = sku?.image;
    const skuImageId =
      typeof rawSkuImage === 'object' && rawSkuImage !== null
        ? (rawSkuImage as any).id
        : rawSkuImage;

    if (skuImageId) {
      const skuSrc = resolveImageUrl(skuImageId);
      if (skuSrc && !productGalleryImages.some((img) => img.src === skuSrc)) {
        productGalleryImages.push({
          src: skuSrc,
          alt: `${productName} - Mã SKU ${sku.sku_code || idx + 1}`,
          label: `SKU ${sku.sku_code || idx + 1}`
        });
      }
    }
  });

  const { products: allDbProducts } = await fetchProducts({ limit: 20 });

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-white">
        <Breadcrumb
          className="py-3"
          items={[
            {
              label: locale === 'vi' ? 'Trang chủ' : 'Home',
              href: '/'
            },
            {
              label: locale === 'vi' ? 'Sản phẩm' : 'Products',
              href: '/solutions/listProduct'
            },
            ...(category ? [{
              label: categoryName || '',
              href: `/solutions/listProduct?category=${category.slug}`
            }] : []),
            {
              label: productName || ''
            }
          ]}
        />
      </div>

      {/* Main Content Area */}
      <div className="page-container px-4 sm:px-10 lg:px-[80px] pt-2.5 pb-10">
        <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-[40px]">
          {/* LEFT: Image Gallery Slider (420px fixed) */}
          <div className="w-full lg:w-[420px] lg:shrink-0">
            <ProductImageGallery images={productGalleryImages} productName={productName} />
          </div>

          {/* CENTER: Product Info (Flex Fill) */}
          <div className="w-full lg:flex-1 lg:min-w-0 space-y-6">
            {categoryName && (
              <div>
                <span className="inline-block text-[14px] font-semibold text-[#1257c0] bg-[#f5f8fc] px-2 py-1 rounded-[24px]">
                  {categoryName}
                </span>
              </div>
            )}

            <h1 className="text-[24px] sm:text-[28px] lg:text-[28px] font-semibold leading-[36px] text-[#162233] tracking-[-0.0107em]">
              {productName}
            </h1>

            {/* SKU and Rating row */}
            <div className="flex items-center gap-4 text-[14px] font-semibold text-[#495057]">
              {skuCode && <span>SKU: {skuCode}</span>}
              {skuCode && <div className="w-[1px] h-[12px] bg-[#dce0e5]" />}
              <div className="flex items-center gap-1.5">
                <span className="text-[14px] font-semibold text-[#212529]">4.8</span>
                <div className="flex text-amber-500 text-[14px] gap-0.5 leading-none">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
                <span className="text-[12px] font-semibold text-[#495057]">
                  (48 {locale === 'vi' ? 'đánh giá' : 'reviews'})
                </span>
              </div>
            </div>

            <hr className="border-[#dce0e5]" />

            {productDescription && (
              <p className="text-[14px] text-[#495057] leading-[20px] font-normal">
                {productDescription}
              </p>
            )}

            {/* 4 Feature Icon Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 py-2">
              <div className="flex flex-col items-center justify-center p-2 sm:py-2.5 sm:px-1 gap-2 border border-[#c89a955c] rounded-[3px] bg-white">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#f5f8fc] border border-[#c89a955c] flex items-center justify-center text-[#1769e2] shrink-0">
                  <Maximize2 className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <span className="text-[11px] sm:text-[12px] font-semibold text-[#495057] leading-tight text-center px-1">
                  {locale === 'vi' ? 'Co giãn 400%' : 'Stretch 400%'}
                </span>
              </div>

              <div className="flex flex-col items-center justify-center p-2 sm:py-2.5 sm:px-1 gap-2 border border-[#c89a955c] rounded-[3px] bg-white">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#f5f8fc] border border-[#c89a955c] flex items-center justify-center text-[#1769e2] shrink-0">
                  <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <span className="text-[11px] sm:text-[12px] font-semibold text-[#495057] leading-tight text-center px-1">
                  {locale === 'vi' ? 'Dai & Khó rách' : 'Tear Resistant'}
                </span>
              </div>

              <div className="flex flex-col items-center justify-center p-2 sm:py-2.5 sm:px-1 gap-2 border border-[#c89a955c] rounded-[3px] bg-white">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#f5f8fc] border border-[#c89a955c] flex items-center justify-center text-[#1769e2] shrink-0">
                  <Droplets className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <span className="text-[11px] sm:text-[12px] font-semibold text-[#495057] leading-tight text-center px-1">
                  {locale === 'vi' ? 'Chống ẩm ướt' : 'Moisture Proof'}
                </span>
              </div>

              <div className="flex flex-col items-center justify-center p-2 sm:py-2.5 sm:px-1 gap-2 border border-[#c89a955c] rounded-[3px] bg-white">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#f5f8fc] border border-[#c89a955c] flex items-center justify-center text-[#1769e2] shrink-0">
                  <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <span className="text-[11px] sm:text-[12px] font-semibold text-[#495057] leading-tight text-center px-1">
                  {locale === 'vi' ? 'PE Tái chế' : 'Recyclable PE'}
                </span>
              </div>
            </div>

            <hr className="border-[#dce0e5]" />

            {/* 2x2 Key Specifications Grid */}
            <div className="grid grid-cols-2 gap-y-4 gap-x-4 py-2">
              <div className="flex flex-col gap-1">
                <span className="text-[12px] font-semibold text-[#495057]">
                  {locale === 'vi' ? 'Độ dày màng' : 'Thickness'}
                </span>
                <span className="text-[14px] font-normal text-[#212529]">
                  {specs?.['Độ dày'] || specs?.['Thickness'] || '17 mic / 20 mic / 23 mic'}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[12px] font-semibold text-[#495057]">
                  {locale === 'vi' ? 'Chất liệu chính' : 'Material'}
                </span>
                <span className="text-[14px] font-normal text-[#212529]">
                  {specs?.['Chất liệu'] || specs?.['Material'] || '100% LLDPE Nguyên Sinh'}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[12px] font-semibold text-[#495057]">
                  {locale === 'vi' ? 'Quy cách cuộn' : 'Specification'}
                </span>
                <span className="text-[14px] font-normal text-[#212529]">
                  {specs?.['Đóng gói'] ||
                    specs?.['Specification'] ||
                    'Khổ rộng 50cm, cân nặng theo yêu cầu'}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[12px] font-semibold text-[#495057]">
                  {locale === 'vi' ? 'Màu sắc' : 'Color'}
                </span>
                <span className="text-[14px] font-normal text-[#212529]">
                  {specs?.['Màu sắc'] || specs?.['Color'] || 'Trắng trong'}
                </span>
              </div>
            </div>

            {/* Quality Standards Achieved */}
            {standards.length > 0 && (
              <div className="space-y-3 pt-2">
                <p className="text-[12px] font-semibold text-slate-700 uppercase tracking-tight">
                  {locale === 'vi'
                    ? 'Tiêu chuẩn chất lượng đạt được:'
                    : 'Quality Standards Achieved:'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {standards.map((std) => (
                    <div
                      key={std.id}
                      className="flex items-center gap-3 p-4 bg-white border border-[#dce0e5] rounded-[3px]"
                    >
                      <div className="w-10 h-10 rounded-[3px] bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                        <Award className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-[12px] font-semibold text-[#212529] leading-tight">
                          {getTranslatedName(std, locale)}
                        </p>
                        {getTranslatedDescription(std, locale) && (
                          <p className="text-[10px] font-medium text-slate-400 mt-0.5">
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

          {/* RIGHT: Sidebar Card (340px fixed) */}
          <div className="w-full lg:w-[340px] lg:shrink-0 lg:sticky lg:top-6">
            <ProductDetailClient
              skus={skus.map((s: ProductSku) => ({
                id: s.id,
                sku_code: s.sku_code,
                unit: s.unit,
                pack_size: s.pack_size,
                price: s.price,
                attributes: s.attributes as Record<string, string> | null
              }))}
              productName={productName}
              locale={locale}
              basePrice={pricing.price}
                unitLabel={pricing.unit}
                labels={{
                  addToCart: locale === 'vi' ? 'Thêm vào giỏ hàng' : 'Add to Cart',
                  added: locale === 'vi' ? 'Đã thêm' : 'Added',
                  selectVariant: locale === 'vi' ? 'Chọn quy cách' : 'Select Variant',
                  requestQuote:
                    locale === 'vi' ? 'Thanh toán' : locale === 'ja' ? 'チェックアウト' : 'Checkout'
                }}
              />
            </div>
          </div>

        {/* Product details tabs section */}
        <div className="mt-10 pt-8 border-t border-slate-100">
          <ProductTabs
            locale={locale}
            productName={productName}
            skuCode={skus[0]?.sku_code || ''}
            brand={product.brand || 'ULink'}
            categoryName={categoryName || ''}
            specifications={specs}
            industries={industries}
            standards={standards}
            skus={skus}
          />
        </div>

        <SavedProductsSection allProducts={allDbProducts} currentSlug={product.slug} locale={locale} />
      </div>

      <ProductContactCta locale={locale} />
    </div>
  );
}
