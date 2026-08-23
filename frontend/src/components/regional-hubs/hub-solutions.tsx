import Image from 'next/image';

interface HubSolutionsProps {
  locale: string;
}

export default function HubSolutions({ locale }: HubSolutionsProps) {
  // Dictionary for multi-language support (vi, en, ja)
  const translations: Record<string, {
    eyebrow: string;
    title: string;
    col1Title: string;
    col1Desc: string;
    col2Title: string;
    col2Desc: string;
    col3Title: string;
    col3Desc: string;
    col4Title: string;
    col4Desc: string;
  }> = {
    vi: {
      eyebrow: 'GIẢI PHÁP',
      title: 'Cung cấp vật tư công nghiệp.',
      col1Title: 'Quản lí chuỗi cung ứng',
      col1Desc: 'Tối ưu quy trình vận hành, kết nối nhà cung cấp và quản lý hàng hóa, cung ứng hiệu quả.',
      col2Title: 'Đa dạng sản phẩm',
      col2Desc: 'Hàng ngàn sản phẩm được tối ưu phù hợp với nhiều ngành nghề, đáp ứng mọi nhu cầu kinh doanh.',
      col3Title: 'Chuẩn hóa & Minh bạch',
      col3Desc: 'Thông tin sản phẩm rõ ràng, giá cả minh bạch, quy trình giao dịch chuẩn hóa.',
      col4Title: 'Giao hàng nhanh',
      col4Desc: 'Đơn hàng được xử lý nhanh chóng, hiệu quả và giao tận nơi đúng thời gian cam kết.'
    },
    en: {
      eyebrow: 'SOLUTIONS',
      title: 'Industrial Supply Solutions.',
      col1Title: 'Supply Chain Management',
      col1Desc: 'Optimize operational processes, connect suppliers and manage goods, supply efficiently.',
      col2Title: 'Product Diversity',
      col2Desc: 'Thousands of products optimized for many industries, meeting all business needs.',
      col3Title: 'Standardization & Transparency',
      col3Desc: 'Clear product information, transparent pricing, standardized transaction processes.',
      col4Title: 'Fast Delivery',
      col4Desc: 'Orders are processed quickly, efficiently, and delivered to your place on time.'
    },
    ja: {
      eyebrow: 'ソリューション',
      title: '工業用資材の供給。',
      col1Title: 'サプライチェーン管理',
      col1Desc: '業務プロセスの最適化、サプライヤーとの接続、効率的な資材供給管理。',
      col2Title: '多様な製品ラインナップ',
      col2Desc: '多様な業界に最適化された何千もの製品で、あらゆるビジネスニーズに対応。',
      col3Title: '標準化と透明性',
      col3Desc: '明確な製品情報、透明性の高い価格設定、標準化された取引プロセス。',
      col4Title: '迅速な配送',
      col4Desc: '注文は迅速かつ効率的に処理され、合意された時間通りに目的地へお届けします。'
    }
  };

  const t = translations[locale] || translations.en;

  return (
    <section className="w-full bg-white py-10 lg:py-14 border-b border-slate-100">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16 flex flex-col items-center">
        
        {/* Title Area */}
        <div className="text-center max-w-[600px] w-full">
          <span className="text-[13px] sm:text-[14px] lg:text-[16px] font-bold uppercase tracking-wider text-[#0F2942] mb-2 block">
            {t.eyebrow}
          </span>
          <h2 className="text-[30px] sm:text-[38px] md:text-[44px] lg:text-[50px] xl:text-[52px] font-extrabold text-slate-900 leading-tight">
            {t.title}
          </h2>
        </div>

        {/* 4 Feature Columns Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mt-16 max-w-[1120px] w-full">
          
          {/* Column 1: Supply Chain */}
          <div className="flex flex-col items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center">
              <div className="relative h-10 w-10">
                <Image
                  src="/images/regional_hubs/hub-2/icon/link.png"
                  alt={t.col1Title}
                  fill
                  className="object-contain pointer-events-none"
                />
              </div>
            </div>
            <h3 className="mt-5 text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] font-bold text-slate-900 leading-snug">
              {t.col1Title}
            </h3>
            <p className="mt-3 text-[13px] sm:text-[14px] leading-relaxed text-slate-500 max-w-[260px]">
              {t.col1Desc}
            </p>
          </div>

          {/* Column 2: Products */}
          <div className="flex flex-col items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center">
              <div className="relative h-10 w-10">
                <Image
                  src="/images/regional_hubs/hub-2/icon/shopping--catalog.png"
                  alt={t.col2Title}
                  fill
                  className="object-contain pointer-events-none"
                />
              </div>
            </div>
            <h3 className="mt-5 text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] font-bold text-slate-900 leading-snug">
              {t.col2Title}
            </h3>
            <p className="mt-3 text-[13px] sm:text-[14px] leading-relaxed text-slate-500 max-w-[260px]">
              {t.col2Desc}
            </p>
          </div>

          {/* Column 3: Standardization */}
          <div className="flex flex-col items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center">
              <div className="relative h-10 w-10">
                <Image
                  src="/images/regional_hubs/hub-2/icon/certificate--check.png"
                  alt={t.col3Title}
                  fill
                  className="object-contain pointer-events-none"
                />
              </div>
            </div>
            <h3 className="mt-5 text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] font-bold text-slate-900 leading-snug">
              {t.col3Title}
            </h3>
            <p className="mt-3 text-[13px] sm:text-[14px] leading-relaxed text-slate-500 max-w-[260px]">
              {t.col3Desc}
            </p>
          </div>

          {/* Column 4: Delivery */}
          <div className="flex flex-col items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center">
              <div className="relative h-10 w-10">
                <Image
                  src="/images/regional_hubs/hub-2/icon/delivery-truck.png"
                  alt={t.col4Title}
                  fill
                  className="object-contain pointer-events-none"
                />
              </div>
            </div>
            <h3 className="mt-5 text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] font-bold text-slate-900 leading-snug">
              {t.col4Title}
            </h3>
            <p className="mt-3 text-[13px] sm:text-[14px] leading-relaxed text-slate-500 max-w-[260px]">
              {t.col4Desc}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
