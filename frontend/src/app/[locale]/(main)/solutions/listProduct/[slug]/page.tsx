import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
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
import ProductCard from '@/components/product/product-card';
import ProductTabs from '@/components/product/product-tabs';
import { ProductImageGallery } from '@/components/product/product-image-gallery';
import RequestSampleButton from '@/components/sample-request/request-sample-button';
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

  const [tSample, product] = await Promise.all([
    getTranslations({ locale, namespace: 'sampleRequest' }),
    fetchProductBySlug(slug)
  ]);

  if (!product) {
    notFound();
  }

  const directusUrl = getDirectusUrl();
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
    const heroSrc =
      typeof heroId === 'string' && (heroId.startsWith('http') || heroId.startsWith('/'))
        ? heroId
        : `${directusUrl}/assets/${heroId}`;
    productGalleryImages.push({
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
      const fileSrc = `${directusUrl}/assets/${fileId}`;
      if (!productGalleryImages.some((img) => img.src === fileSrc)) {
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
      const skuSrc =
        typeof skuImageId === 'string' &&
          (skuImageId.startsWith('http') || skuImageId.startsWith('/'))
          ? skuImageId
          : `${directusUrl}/assets/${skuImageId}`;
      if (!productGalleryImages.some((img) => img.src === skuSrc)) {
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
              href: `/solutions/listProduct/categories/${category.slug}`
            }] : []),
            {
              label: productName || ''
            }
          ]}
        />
      </div>

      {/* Main Content Area */}
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-16 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* LEFT: Image Gallery Slider */}
          <div className="lg:col-span-5">
            <ProductImageGallery images={productGalleryImages} productName={productName} />
          </div>

          {/* CENTER: Product Info */}
          <div className="lg:col-span-4 space-y-6">
            {categoryName && (
              <div>
                <span className="inline-block text-xs font-bold text-blue-600 bg-blue-50/80 border border-blue-100/80 px-3.5 py-1 rounded-[3px] shadow-2xs">
                  {categoryName}
                </span>
              </div>
            )}

            <h1 className="text-[28px] sm:text-[34px] md:text-[38px] lg:text-[42px] xl:text-[44px] font-extrabold text-slate-900 leading-tight tracking-tight">
              {productName}
            </h1>

            {/* SKU and Rating row */}
            <div className="flex items-center gap-3 text-xs text-slate-500 font-semibold">
              {skuCode && <span>SKU: {skuCode}</span>}
              {skuCode && <span className="text-slate-300">|</span>}
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-900">4.8</span>
                <div className="flex text-amber-500 text-lg sm:text-xl gap-0.5 leading-none">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
                <span className="text-slate-500 font-medium">
                  (48 {locale === 'vi' ? 'đánh giá' : 'reviews'})
                </span>
              </div>
            </div>

            <hr className="border-slate-200/80" />

            {productDescription && (
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                {productDescription}
              </p>
            )}

            {/* 4 Feature Icon Circles */}
            <div className="grid grid-cols-4 gap-3 py-2">
              <div className="flex flex-col items-center text-center group">
                <div className="w-12 h-12 rounded-[3px] bg-slate-50 border border-slate-200/70 flex items-center justify-center text-blue-600 mb-2 shrink-0 group-hover:bg-blue-50 transition-colors shadow-2xs">
                  <Maximize2 className="h-5 w-5" />
                </div>
                <span className="text-[12px] sm:text-[13px] font-bold text-slate-700 leading-tight">
                  {locale === 'vi' ? 'Co giãn 400%' : 'Stretch 400%'}
                </span>
              </div>

              <div className="flex flex-col items-center text-center group">
                <div className="w-12 h-12 rounded-[3px] bg-slate-50 border border-slate-200/70 flex items-center justify-center text-blue-600 mb-2 shrink-0 group-hover:bg-blue-50 transition-colors shadow-2xs">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <span className="text-[12px] sm:text-[13px] font-bold text-slate-700 leading-tight">
                  {locale === 'vi' ? 'Dẻo & Khó rách' : 'Tear Resistant'}
                </span>
              </div>

              <div className="flex flex-col items-center text-center group">
                <div className="w-12 h-12 rounded-[3px] bg-slate-50 border border-slate-200/70 flex items-center justify-center text-blue-600 mb-2 shrink-0 group-hover:bg-blue-50 transition-colors shadow-2xs">
                  <Droplets className="h-5 w-5" />
                </div>
                <span className="text-[12px] sm:text-[13px] font-bold text-slate-700 leading-tight">
                  {locale === 'vi' ? 'Chống ẩm ướt' : 'Moisture Proof'}
                </span>
              </div>

              <div className="flex flex-col items-center text-center group">
                <div className="w-12 h-12 rounded-[3px] bg-slate-50 border border-slate-200/70 flex items-center justify-center text-blue-600 mb-2 shrink-0 group-hover:bg-blue-50 transition-colors shadow-2xs">
                  <RefreshCw className="h-5 w-5" />
                </div>
                <span className="text-[12px] sm:text-[13px] font-bold text-slate-700 leading-tight">
                  {locale === 'vi' ? 'PE Tái chế' : 'Recyclable PE'}
                </span>
              </div>
            </div>

            <hr className="border-slate-200/80" />

            {/* 2x2 Key Specifications Grid */}
            <div className="grid grid-cols-2 gap-y-5 gap-x-8 py-2">
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-slate-500">
                  {locale === 'vi' ? 'Độ dày màng' : 'Thickness'}
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-900 mt-1">
                  {specs?.['Độ dày'] || specs?.['Thickness'] || '17 mic / 20 mic / 23 mic'}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-xs font-semibold text-slate-500">
                  {locale === 'vi' ? 'Chất liệu chính' : 'Material'}
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-900 mt-1">
                  {specs?.['Chất liệu'] || specs?.['Material'] || '100% LLDPE Nguyên sinh'}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-xs font-semibold text-slate-500">
                  {locale === 'vi' ? 'Quy cách cuộn' : 'Specification'}
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-900 mt-1">
                  {specs?.['Đóng gói'] ||
                    specs?.['Specification'] ||
                    'Khổ rộng 50cm, cân nặng theo yêu cầu'}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-xs font-semibold text-slate-500">
                  {locale === 'vi' ? 'Màu sắc' : 'Color'}
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-900 mt-1">
                  {specs?.['Màu sắc'] || specs?.['Color'] || 'Trắng trong'}
                </span>
              </div>
            </div>

            <hr className="border-gray-150" />

            {/* Quality Standards Achieved */}
            {standards.length > 0 && (
              <div className="space-y-3 pt-2">
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  {locale === 'vi'
                    ? 'Tiêu chuẩn chất lượng đạt được:'
                    : 'Quality Standards Achieved:'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {standards.map((std) => (
                    <div
                      key={std.id}
                      className="flex items-center gap-3 p-4 bg-white border border-slate-200/80 rounded-[3px]"
                    >
                      <div className="w-10 h-10 rounded-[3px] bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                        <Award className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800 leading-tight">
                          {getTranslatedName(std, locale)}
                        </p>
                        {getTranslatedDescription(std, locale) && (
                          <p className="text-[10px] font-semibold text-slate-400 mt-0.5">
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

          {/* RIGHT: Sidebar Card */}
          <div className="lg:col-span-3">
            <div className="bg-[#F5F8FC] border border-slate-200/80 rounded-[3px] p-6 sticky top-6 space-y-6">
              {/* Product interactive config */}
              <ProductDetailClient
                skus={skus.map((s: ProductSku) => ({
                  id: s.id,
                  sku_code: s.sku_code,
                  unit: s.unit,
                  pack_size: s.pack_size,
                  attributes: s.attributes as Record<string, string> | null
                }))}
                productName={productName}
                locale={locale}
                basePrice={pricing.price}
                unitLabel={pricing.unit}
                labels={{
                  addToCart: locale === 'vi' ? 'Đặt hàng' : 'Add to RFQ',
                  added: locale === 'vi' ? 'Đã thêm' : 'Added',
                  selectVariant: locale === 'vi' ? 'Chọn quy cách' : 'Select Variant',
                  requestQuote:
                    locale === 'vi' ? 'Yêu cầu báo giá sản lượng lớn' : 'Request Bulk Quote'
                }}
              />

              {/* Request Sample Option */}
              <div className="pt-2 border-t border-slate-200/80">
                <RequestSampleButton
                  productSlug={product.slug}
                  productName={productName}
                  skuCodes={skus.map((s: ProductSku) => s.sku_code)}
                  labels={{
                    requestSampleBtn: tSample('requestSampleBtn'),
                    modalTitle: tSample('modalTitle'),
                    modalDesc: tSample('modalDesc'),
                    contactName: tSample('contactName'),
                    email: tSample('email'),
                    company: tSample('company'),
                    phone: tSample('phone'),
                    province: tSample('province'),
                    district: tSample('district'),
                    addressDetail: tSample('addressDetail'),
                    message: tSample('message'),
                    messagePlaceholder: tSample('messagePlaceholder'),
                    selectProvince: tSample('selectProvince'),
                    selectDistrict: tSample('selectDistrict'),
                    submit: tSample('submit'),
                    submitting: tSample('submitting'),
                    success: tSample('success'),
                    error: tSample('error'),
                    required: tSample('required'),
                    invalidEmail: tSample('invalidEmail'),
                    invalidPhone: tSample('invalidPhone'),
                    product: tSample('product'),
                    skus: tSample('skus')
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Product details tabs section */}
        <div className="mt-12 pt-8 border-t border-slate-100">
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
    </div>
  );
}

