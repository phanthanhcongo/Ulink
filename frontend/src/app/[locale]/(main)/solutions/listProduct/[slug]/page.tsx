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
  const rawCategoryName = category ? getTranslatedName(category, locale) || category.name : null;

  const PARENT_CATEGORY_NAMES: Record<string, { vi: string; en: string }> = {
    'cleanroom-consumables': { vi: 'Vật tư phòng sạch', en: 'Cleanroom Consumables' },
    'industrial-packaging': { vi: 'Bao bì & Đóng gói', en: 'Packaging & Logistics' },
    'bang-keo-nhom': { vi: 'Băng keo Nhôm', en: 'Aluminum Tape' }
  };

  // Map subcategory slug -> official URL parent category slug
  const SUBCATEGORY_TO_PARENT_SLUG: Record<string, string> = {
    // Cleanroom
    'cleanroom-consumables': 'cleanroom-consumables',
    'vat-tu-phong-sach': 'cleanroom-consumables',
    'quan-ao-phong-sach': 'cleanroom-consumables',
    'gang-tay-phong-sach': 'cleanroom-consumables',
    'khau-trang-phong-sach': 'cleanroom-consumables',
    'vai-lau-phong-sach': 'cleanroom-consumables',
    'tham-dinh-bui': 'cleanroom-consumables',
    'dung-cu-ve-sinh': 'cleanroom-consumables',
    'phu-kien-khac': 'cleanroom-consumables',
    'cleanroom-gloves': 'cleanroom-consumables',
    'cleanroom-wipers': 'cleanroom-consumables',
    'cleanroom-apparel': 'cleanroom-consumables',
    'cleanroom-masks': 'cleanroom-consumables',
    'cleanroom-chemicals': 'cleanroom-consumables',

    // Industrial Packaging
    'industrial-packaging': 'industrial-packaging',
    'bao-bi-dong-goi': 'industrial-packaging',
    'bao-bi-cong-nghiep': 'industrial-packaging',
    'mang-quan-pallet-cat': 'industrial-packaging',
    'thung-carton-cac-loai': 'industrial-packaging',
    'bang-keo-cong-nghiep': 'industrial-packaging',
    'tui-pe-pp-ziper': 'industrial-packaging',
    'pallet-nhua-go': 'industrial-packaging',
    'day-dai-dong-hang': 'industrial-packaging',
    'vat-lieu-dem-lot': 'industrial-packaging',

    // Aluminum Tape
    'bang-keo-nhom': 'bang-keo-nhom',
    'bang-keo-nhom-tieu-chuan': 'bang-keo-nhom',
    'bang-keo-nhom-chiu-nhiet': 'bang-keo-nhom',
    'bang-keo-nhom-gia-co-luoi': 'bang-keo-nhom',
    'bang-keo-nhom-cach-nhiet-cat': 'bang-keo-nhom',
    'bang-keo-nhom-ong-gio': 'bang-keo-nhom',
    'bang-keo-nhom-ma-kem-cat': 'bang-keo-nhom',
    'bang-keo-nhom-tu-dinh-cat': 'bang-keo-nhom'
  };

  const parentSlug = category
    ? SUBCATEGORY_TO_PARENT_SLUG[category.slug] || category.slug
    : null;

  const parentCategoryName =
    parentSlug && PARENT_CATEGORY_NAMES[parentSlug]
      ? locale === 'vi'
        ? PARENT_CATEGORY_NAMES[parentSlug].vi
        : PARENT_CATEGORY_NAMES[parentSlug].en
      : rawCategoryName;

  const categorySlug = parentSlug || category?.slug || null;
  const categoryName = parentCategoryName || rawCategoryName;

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

  const isVideoPath = (p: string) => /\.(mp4|webm|mov|ogg)$/i.test(p);
  const productGalleryImages: Array<{ src: string; alt: string; label?: string; type?: 'image' | 'video' }> = [];

  const rawHero = product.hero;
  if (rawHero) {
    try {
      let heroImages: string[] = [];

      if (typeof rawHero === 'string') {
        try {
          const parsed = JSON.parse(rawHero);
          if (Array.isArray(parsed)) {
            heroImages = parsed;
          } else if (typeof parsed === 'string') {
            heroImages = [parsed];
          }
        } catch (e) {
          if (rawHero.startsWith('/') || rawHero.startsWith('http')) {
            heroImages = [rawHero];
          }
        }
      } else if (Array.isArray(rawHero)) {
        heroImages = rawHero;
      } else if (typeof rawHero === 'object' && rawHero !== null) {
        const heroId = (rawHero as any).id;
        if (heroId) {
          const heroSrc = resolveImageUrl(heroId);
          if (heroSrc) heroImages = [heroSrc];
        }
      }

      heroImages.forEach((mediaPath, idx) => {
        const resolved = resolveImageUrl(mediaPath);
        if (resolved) {
          if (!productGalleryImages.some((img) => img.src === resolved)) {
            const isVid = isVideoPath(resolved);
            productGalleryImages.push({
              src: resolved,
              alt: `${productName} - Hero ${idx + 1}`,
              label: isVid ? `Video ${idx + 1}` : `Ảnh ${idx + 1}`,
              type: isVid ? 'video' : 'image'
            });
          }
        }
      });
    } catch (err) {
      console.error('Error parsing hero images:', err);
    }
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
            {
              label: categoryName || (locale === 'vi' ? 'Danh mục sản phẩm' : 'Category'),
              href: categorySlug ? `/solutions/listProduct?category=${categorySlug}` : undefined
            },
            {
              label: productName
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
                <span className="inline-block text-[14px] font-semibold text-[#1257c0] bg-[#f5f8fc] px-2 py-1 rounded-[3px]">
                  {categoryName}
                </span>
              </div>
            )}

            <h1 className="text-[24px] sm:text-[28px] lg:text-[28px] font-semibold leading-[36px] text-[#162233] tracking-[-0.0107em]">
              {productName}
            </h1>

            {/* SKU row */}
            {skuCode && (
              <div className="flex items-center gap-4 text-[14px] font-semibold text-[#495057]">
                <span>SKU: {skuCode}</span>
              </div>
            )}

            <hr className="border-[#dce0e5]" />

            {productDescription && (
              <p className="text-[14px] text-[#495057] leading-[20px] font-normal">
                {productDescription}
              </p>
            )}

            {/* Feature Badges — dynamic from product.features JSON */}
            {(() => {
              const features = Array.isArray((product as any).features) ? (product as any).features : [];
              if (features.length === 0) return null;
              const featureIcons = [
                <Link2 key="i0" className="h-4 w-4 sm:h-5 sm:w-5" />,
                <ShieldCheck key="i1" className="h-4 w-4 sm:h-5 sm:w-5" />,
                <Droplets key="i2" className="h-4 w-4 sm:h-5 sm:w-5" />,
                <Wind key="i3" className="h-4 w-4 sm:h-5 sm:w-5" />,
              ];
              return (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 py-2">
                    {features.slice(0, 4).map((feat: string, idx: number) => (
                      <div key={idx} className="flex flex-col items-center justify-center p-2 sm:py-2.5 sm:px-1 gap-2 border border-[#c89a955c] rounded-[3px] bg-white">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#f5f8fc] border border-[#c89a955c] flex items-center justify-center text-[#1769e2] shrink-0">
                          {featureIcons[idx % featureIcons.length]}
                        </div>
                        <span className="text-[11px] sm:text-[12px] font-semibold text-[#495057] leading-tight text-center px-1">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                  <hr className="border-[#dce0e5]" />
                </>
              );
            })()}

            {/* Key Specifications — first 4 from specifications JSON */}
            {specs && Object.keys(specs).length > 0 && (
              <div className="py-2">
                {(() => {
                  const entries = Object.entries(specs).slice(0, 4);
                  const rows: [string, string][][] = [];
                  for (let i = 0; i < entries.length; i += 2) {
                    rows.push(entries.slice(i, i + 2) as [string, string][]);
                  }
                  return rows.map((row, rowIdx) => (
                    <div key={rowIdx}>
                      {rowIdx > 0 && (
                        <div className="border-t border-dashed border-[#c89a955c] my-3" />
                      )}
                      <div className="grid grid-cols-2 gap-x-6">
                        {row.map(([key, value]) => (
                          <div key={key} className="flex flex-col gap-1">
                            <span className="text-[12px] font-semibold text-[#495057]">{key}</span>
                            <span className="text-[14px] font-semibold text-[#212529]">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ));
                })()}
              </div>
            )}

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
