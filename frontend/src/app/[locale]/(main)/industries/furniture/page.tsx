import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { fetchProducts } from '@/lib/product-data';
import FurnitureClient from './furniture-client';
import { getIndustryDetails } from '@/components/industries/industry-data';

interface Props {
  params: { locale: string };
}

const CANONICAL_SLUG = 'furniture';
const ROUTE_SLUG = 'furniture';

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const details = getIndustryDetails(CANONICAL_SLUG, locale);
  if (!details) return { title: 'Không tìm thấy giải pháp | ULink B2B' };

  return {
    title: `${details.title} | ULink B2B`,
    description: details.description
  };
}

export default async function FurnitureIndustryPage({ params: { locale } }: Props) {
  setRequestLocale(locale);

  const industryData = getIndustryDetails(CANONICAL_SLUG, locale);
  if (!industryData) {
    notFound();
  }

  const { products } = await fetchProducts({
    industry: CANONICAL_SLUG,
    limit: 8
  });

  const isVi = locale === 'vi';
  const isJa = locale === 'ja';

  const translations = {
    home: isVi ? 'Trang chủ' : isJa ? 'ホーム' : 'Home',
    resources: isVi ? 'Tài nguyên' : isJa ? 'リソース' : 'Resources',
    overview: isVi ? 'Tổng quan' : isJa ? '概要' : 'Overview',
    cleanroomSol: isVi ? 'Giải pháp phòng sạch' : isJa ? 'クリーンルーム' : 'Cleanroom Solutions',
    packagingSol: isVi ? 'Giải pháp đóng gói' : isJa ? '包装' : 'Packaging Solutions',
    cases: isVi ? 'Trường hợp áp dụng' : isJa ? '導入事例' : 'Case Studies',
    recommendedProducts: isVi ? 'Sản phẩm đề xuất' : isJa ? 'おすすめ製品' : 'Recommended Products',
    resourceTab: isVi ? 'Tài nguyên' : isJa ? '資料' : 'Resources',
    seeAll: isVi ? 'Xem toàn bộ' : isJa ? 'すべてを見る' : 'See all',
    contactSupport: isVi ? 'Liên hệ hỗ trợ kỹ thuật' : isJa ? '技術サポートに連絡' : 'Contact Support',
    noProductDesc: isVi
      ? 'Chưa có sản phẩm đề xuất cụ thể cho ngành này. Vui lòng liên hệ bộ phận hỗ trợ kỹ thuật.'
      : isJa
        ? 'この業界向けの特定の推奨製品はまだありません。技術サポート部門にお問い合わせください。'
        : 'No specific recommended products for this industry yet. Please contact technical support.'
  };

  return (
    <FurnitureClient
      industryData={industryData}
      products={products}
      locale={locale}
      currentSlug={ROUTE_SLUG}
      translations={translations}
    />
  );
}
