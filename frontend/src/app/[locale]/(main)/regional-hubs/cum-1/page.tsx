import { getTranslations, setRequestLocale } from 'next-intl/server';
import { fetchRegionalHubs } from '@/lib/regional-hub-data';
import { VietnamMap } from '@/components/vietnam-map';
import LiveMetricsBar from '@/components/regional-hubs/live-metrics-bar';
import FeaturedProducts from '@/components/regional-hubs/featured-products';
import SolutionCarousel from '@/components/regional-hubs/solution-carousel';
import CoreCapabilities from '@/components/regional-hubs/core-capabilities';
import HanamOverview from '@/components/regional-hubs/hanam-overview';
import TestimonialCarousel from '@/components/regional-hubs/testimonial-carousel';
import { WorkingProcess, ResourcesNews, CtaBanner, DocSection, SupportSection } from '@/components/home';
import { fetchProducts } from '@/lib/product-data';
import { AboutContact } from '@/components/about/about-contact';
import { ScrollReveal } from '@/components/scroll-reveal';
import { SectionDivider } from '@/components/section-divider';

export default async function RegionalHubsPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('regionalHubs');

  const hubs = await fetchRegionalHubs();

  // Fetch up to 12 products from Directus to filter
  const { products: dbProducts } = await fetchProducts({ limit: 12 });

  // Filter products that have at least one published SKU (fallback to dbProducts if fewer than 4)
  const productsWithSkus = dbProducts.filter(
    (p) => p.skus && p.skus.some((s) => s.status === 'published')
  );
  const availableProducts = productsWithSkus.length >= 4 ? productsWithSkus : (dbProducts.length > 0 ? dbProducts : []);

  // Select 4 products to display in the Featured Products section
  const randomProducts = availableProducts.slice(0, 4);

  const carouselSlides = [
    {
      eyebrow: 'MÀNG CUỐN PALLET',
      title: 'Bảo vệ hàng hóa tối ưu, tiết kiệm chi phí vận chuyển. Giao nhanh từ Hub Hà Nam.',
      feat1: 'Độ bám dính cao, chống ẩm và bụi hiệu quả. Giảm đến 30% chi phí đóng gói so với phương pháp truyền thống.',
      feat2: 'Giao hàng nhanh trong 24h từ Hub Hà Nam. Đáp ứng mọi quy mô đơn hàng cho nhà máy và kho vận.',
      image: '/images/home/section2/placeholder-picture0.png',
      alt: 'Màng cuốn Pallet'
    },
    {
      eyebrow: 'GĂNG TAY CHỐNG CẮT',
      title: 'Bảo vệ đôi tay vượt trội, thiết kế chuyên dụng cho sản xuất công nghiệp.',
      feat1: 'Đạt tiêu chuẩn chống cắt cao cấp, bám dính tốt, chống trượt và tạo cảm giác thoải mái khi thao tác.',
      feat2: 'Cung cấp số lượng lớn cho các xưởng cơ khí, lắp ráp điện tử và nhà máy sản xuất.',
      image: '/images/home/section2/product-cut-gloves.webp',
      alt: 'Găng tay công nghiệp'
    },
    {
      eyebrow: 'BĂNG KEO NHÔM HVAC',
      title: 'Giải pháp làm kín và cách nhiệt hệ thống thông gió công nghiệp.',
      feat1: 'Khả năng chịu nhiệt vượt trội, chống ẩm, làm kín tuyệt đối các mối nối bảo ôn.',
      feat2: 'Sản xuất chuẩn kích thước kỹ thuật, độ bám dính cực cao trên bề mặt kim loại.',
      image: '/images/home/section2/product-hvac-tape.webp',
      alt: 'Băng keo nhôm HVAC'
    },
    {
      eyebrow: 'KHĂN LAU PHÒNG SẠCH',
      title: 'Kiểm soát ô nhiễm hạt bụi và vi khuẩn tối đa trong môi trường phòng sạch.',
      feat1: 'Chất liệu Microfiber siêu mịn, không xơ vải, độ thấm hút dung môi cực cao.',
      feat2: 'Đóng gói tiệt trùng đạt chuẩn ISO, sẵn sàng giao ngay cho nhà máy bán dẫn.',
      image: '/images/home/section2/solution-cleanroom.webp',
      alt: 'Khăn lau phòng sạch'
    },
    {
      eyebrow: 'MÀNG CO PE ĐÓNG GÓI',
      title: 'Bao bọc thành phẩm chắc chắn, chống móp méo và trầy xước.',
      feat1: 'Độ dẻo dai cao, chống đâm thủng, co ôm sát bề mặt mọi loại kiện hàng.',
      feat2: 'Sản xuất theo kích thước và độ dày yêu cầu của doanh nghiệp.',
      image: '/images/home/section2/product-custom-pkg.webp',
      alt: 'Màng co PE'
    }
  ];

  const carouselLabels = {
    rfqButton: t('carousel.rfqButton'),
    learnMore: t('carousel.learnMore')
  };

  const testimonialLabels = {
    eyebrow: t('testimonials.eyebrow'),
    title: t('testimonials.title'),
    subtitle: t('testimonials.subtitle'),
    company1: t('testimonials.company1'),
    quote1: t('testimonials.quote1'),
    name1: t('testimonials.name1'),
    role1: t('testimonials.role1'),
    company2: t('testimonials.company2'),
    quote2: t('testimonials.quote2'),
    name2: t('testimonials.name2'),
    role2: t('testimonials.role2'),
    company3: t('testimonials.company3'),
    quote3: t('testimonials.quote3'),
    name3: t('testimonials.name3'),
    role3: t('testimonials.role3'),
    company4: t('testimonials.company4'),
    quote4: t('testimonials.quote4'),
    name4: t('testimonials.name4'),
    role4: t('testimonials.role4')
  };

  return (
    <>
      <VietnamMap locale={locale} />

      {/* === SECTION 2: Real-time Live Data Bar === */}
      <LiveMetricsBar />
      <SectionDivider />

      {/* === SECTION 3: Featured Products (100% Static Standard Data) === */}
      <ScrollReveal><FeaturedProducts locale={locale} /></ScrollReveal>
      <SectionDivider />

      {/* === SECTION 4: Interactive Solution Carousel === */}
      <ScrollReveal><SolutionCarousel slides={carouselSlides} labels={carouselLabels} /></ScrollReveal>
      <SectionDivider />

      {/* === SECTION 5: Core Capabilities === */}
      <ScrollReveal><CoreCapabilities /></ScrollReveal>
      <SectionDivider />

      {/* === SECTION 3.5: Ha Nam Distribution Center Overview === */}
      <ScrollReveal><HanamOverview /></ScrollReveal>
      <SectionDivider />

      {/* === SECTION 7: Customer Testimonials === */}
      <ScrollReveal><TestimonialCarousel labels={testimonialLabels} /></ScrollReveal>
      <SectionDivider />

      {/* === SECTION 8: Working Process === */}
      <ScrollReveal><WorkingProcess /></ScrollReveal>
      <SectionDivider />

      {/* === SECTION 9: Resources & News === */}
      <ScrollReveal><ResourcesNews /></ScrollReveal>
      <SectionDivider />

      <DocSection />
      <SectionDivider />
      <SupportSection />
      <SectionDivider />
      <ScrollReveal><AboutContact /></ScrollReveal>

    </>
  );
}



