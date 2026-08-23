import React from 'react';
import { FileBadge2, Factory, Globe, Award, Check } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

interface CoreAdvantagesProps {
  locale: string;
}

export default async function CoreAdvantages({ locale }: CoreAdvantagesProps) {
  const t = await getTranslations({ locale, namespace: 'solutions' });

  const summaryFeatures = [
    {
      icon: FileBadge2,
      title:
        locale === 'vi' ? 'Đội ngũ chuyên môn' : locale === 'ja' ? '専門家チーム' : 'Expert Team',
      desc:
        locale === 'vi'
          ? 'Nhiều năm kinh nghiệm trong sản xuất và cung ứng cho nhiều ngành.'
          : locale === 'ja'
            ? 'さまざまな業界での多年にわたる製造と供給の実績。'
            : 'Years of experience in production & supply for various industries.'
    },
    {
      icon: Factory,
      title:
        locale === 'vi'
          ? 'Giải pháp tùy chỉnh'
          : locale === 'ja'
            ? 'カスタムソリューション'
            : 'Custom Solutions',
      desc:
        locale === 'vi'
          ? 'Sản xuất, tùy chỉnh linh hoạt theo yêu cầu đặc thù của từng Khách hàng.'
          : locale === 'ja'
            ? '各お客様の固有の要件に応じた柔軟な製造とカスタマイズ。'
            : 'Flexible manufacturing and customization tailored to each client.'
    },
    {
      icon: Globe,
      title:
        locale === 'vi'
          ? 'Chuỗi cung ứng quốc tế'
          : locale === 'ja'
            ? 'グローバル供給'
            : 'Global Supply Chain',
      desc:
        locale === 'vi'
          ? 'Nguồn hàng chất lượng, đạt chuẩn chất lượng theo tiêu chuẩn ISO.'
          : locale === 'ja'
            ? 'ISO規格に準拠した高品質な供給源。'
            : 'Quality sources conforming to ISO quality standards.'
    },
    {
      icon: Award,
      title:
        locale === 'vi'
          ? 'Chất lượng & tiêu chuẩn'
          : locale === 'ja'
            ? '品質と規格'
            : 'Quality & Standards',
      desc:
        locale === 'vi'
          ? 'Đầy đủ chứng nhận quốc tế ISO, GMP, RoHS.'
          : locale === 'ja'
            ? 'ISO、GMP、RoHSなどの主要な国際認証を取得。'
            : 'Full international certificates including ISO, GMP, RoHS.'
    }
  ];

  const advantages = [
    {
      icon: FileBadge2,
      title: t('coreAdvantages.card1Title'),
      desc: t('coreAdvantages.card1Desc')
    },
    {
      icon: Globe,
      title: t('coreAdvantages.card2Title'),
      desc: t('coreAdvantages.card2Desc')
    },
    {
      icon: Award,
      title: t('coreAdvantages.card3Title'),
      desc: t('coreAdvantages.card3Desc')
    },
    {
      icon: Globe,
      title: t('coreAdvantages.card4Title'),
      desc: t('coreAdvantages.card4Desc')
    },
    {
      icon: Check,
      title: t('coreAdvantages.card5Title'),
      desc: t('coreAdvantages.card5Desc')
    },
    {
      icon: Award,
      title: t('coreAdvantages.card6Title'),
      desc: t('coreAdvantages.card6Desc')
    }
  ];

  return (
    <div className="w-full flex flex-col">
      {/* 4-Column Summary Bar */}
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="bg-white border border-slate-100 rounded-[3px] p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-6 lg:gap-x-2 xl:gap-x-4">
          {summaryFeatures.map((feat, idx) => {
            const IconComp = feat.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-3.5 relative lg:pl-6 xl:pl-8 lg:pr-2 first:pl-0 last:pr-0"
              >
                {/* Divider for desktop */}
                {idx > 0 && (
                  <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-10 bg-slate-200/60" />
                )}
                {/* Divider for medium screens */}
                {idx % 2 === 1 && (
                  <div className="hidden md:block lg:hidden absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-10 bg-slate-200/60" />
                )}

                <IconComp className="h-6 w-6 text-slate-700 shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <h4 className="text-[15px] sm:text-[16px] lg:text-[18px] font-bold text-slate-900 leading-tight">
                    {feat.title}
                  </h4>
                  <p className="text-[12px] sm:text-[13px] text-slate-500 leading-relaxed font-medium">
                    {feat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Core Advantages Section (Wrapper with bg - Full Width) */}
      <div className="bg-[#F2F4F8] py-16 lg:py-24 mt-16 lg:mt-24 w-full">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16">
          {/* Core Advantages Heading */}
          <div className="flex flex-col items-start max-w-3xl">
            <h2 className="text-[22px] sm:text-[24px] md:text-[26px] lg:text-[28px] xl:text-[30px] font-extrabold text-primary tracking-tight leading-tight">
              {t('coreAdvantages.heading')}
            </h2>
            <p className="mt-3.5 text-[13px] sm:text-[14px] leading-relaxed text-slate-500 font-medium">
              {t('coreAdvantages.subtitle')}
            </p>
          </div>

          {/* Core Advantages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {advantages.map((adv, idx) => {
              const IconComp = adv.icon;
              return (
                <div
                  key={idx}
                  className="group bg-white rounded-[3px] border border-slate-100 p-6 sm:p-8 flex flex-col items-start"
                >
                  <div className="w-9 h-9 rounded-[3px] bg-slate-50 flex items-center justify-center text-slate-700 shrink-0 mb-5">
                    <IconComp className="h-5 w-5" />
                  </div>
                  <h3 className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] font-bold text-slate-900 mb-2.5 leading-snug">
                    {adv.title}
                  </h3>
                  <p className="text-[13px] sm:text-[14px] leading-relaxed text-slate-500 font-medium">
                    {adv.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

