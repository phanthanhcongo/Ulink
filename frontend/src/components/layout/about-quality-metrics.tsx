import { getTranslations } from 'next-intl/server';

export async function AboutQualityMetrics() {
  const t = await getTranslations('aboutQuality.metrics');

  const metrics = [
    { label: t('onTime'), value: t('onTimeValue') },
    { label: t('qualityRate'), value: t('qualityRateValue') },
    { label: t('complaintRate'), value: t('complaintRateValue') },
    { label: t('satisfaction'), value: t('satisfactionValue') }
  ];

  return (
    <section className="rounded-[3px] border border-border/40 bg-white px-6 py-6">
      {/* Header */}
      <h2 className="text-[13px] sm:text-[14px] lg:text-[16px] font-bold uppercase tracking-wider text-primary">{t('title')}</h2>

      {/* Metrics list */}
      <div className="mt-5 flex flex-col gap-4">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="flex items-center justify-between border-b border-border/20 pb-3 last:border-b-0 last:pb-0"
          >
            <p className="text-[13px] sm:text-[14px] leading-relaxed text-foreground/60">{metric.label}</p>
            <p className="text-[15px] sm:text-[16px] lg:text-[18px] font-bold text-brand">{metric.value}</p>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <p className="mt-4 text-[12px] sm:text-[13px] text-foreground/40">{t('note')}</p>
    </section>
  );
}


