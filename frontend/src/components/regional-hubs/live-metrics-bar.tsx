import { FileText, Clock, Truck, Warehouse } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export default async function LiveMetricsBar() {
  const t = await getTranslations('regionalHubs');

  return (
    <section className="w-full bg-card py-8 border-b border-slate-200/60">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <h2 className="text-[15px] sm:text-[16px] lg:text-[18px] font-semibold text-slate-800">
            {t('dashboard.headerTitle')}
          </h2>
          <div className="flex items-center gap-1.5 text-[13px] sm:text-[14px] text-slate-500 font-medium">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{t('dashboard.headerTime')}</span>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 rounded-[3px] border border-slate-300 bg-white shadow-sm divide-y md:divide-y-0 lg:divide-x divide-slate-200">
          {/* Metric 1: Orders */}
          <div className="group relative p-6 flex items-center gap-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)] hover:scale-[1.02] hover:bg-blue-50/80 cursor-default rounded-[3px]">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg transition-colors duration-200 group-hover:bg-blue-100 group-hover:shadow-sm">
              <FileText className="h-[28px] w-[28px] text-brand transition-colors duration-200 group-hover:text-blue-700" />
            </div>
            <div>
              <p className="text-[12px] sm:text-[13px] font-semibold text-slate-500 uppercase tracking-wider transition-colors duration-200 group-hover:text-blue-600">
                {t('dashboard.ordersLabel')}
              </p>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-[22px] sm:text-[24px] md:text-[26px] lg:text-[28px] xl:text-[30px] font-extrabold text-brand transition-colors duration-200 group-hover:text-blue-700">
                  {t('dashboard.ordersValue')}
                </span>
                <span className="text-[13px] sm:text-[14px] font-bold text-brand transition-colors duration-200 group-hover:text-blue-600">
                  {t('dashboard.ordersUnit')}
                </span>
              </div>
              <div className="mt-1.5 flex items-center gap-1 text-[12px] sm:text-[13px] font-bold text-emerald-500">
                <span>▲</span>
                <span>{t('dashboard.ordersChange').replace('+', '')}</span>
                <span className="text-slate-400 font-normal ml-0.5">
                  {t('dashboard.ordersNote')}
                </span>
              </div>
            </div>
          </div>

          {/* Metric 2: Delivery */}
          <div className="group p-6 flex items-center gap-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)] hover:scale-[1.02] hover:bg-amber-50/80 cursor-default rounded-[3px]">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg transition-colors duration-200 group-hover:bg-amber-100 group-hover:shadow-sm">
              <Clock className="h-[28px] w-[28px] text-brand transition-colors duration-200 group-hover:text-amber-700" />
            </div>
            <div>
              <p className="text-[12px] sm:text-[13px] font-semibold text-slate-500 uppercase tracking-wider transition-colors duration-200 group-hover:text-amber-600">
                {t('dashboard.deliveryLabel')}
              </p>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-[22px] sm:text-[24px] md:text-[26px] lg:text-[28px] xl:text-[30px] font-extrabold text-brand transition-colors duration-200 group-hover:text-amber-700">
                  {t('dashboard.deliveryValue')}
                </span>
              </div>
              <div className="mt-1.5 flex items-center gap-1 text-[11px] font-bold text-emerald-500">
                <span>▲</span>
                <span>{t('dashboard.deliveryChange').replace('+', '')}</span>
                <span className="text-slate-400 font-normal ml-0.5">
                  {t('dashboard.deliveryNote')}
                </span>
              </div>
            </div>
          </div>

          {/* Metric 3: Vehicles */}
          <div className="group p-6 flex items-center gap-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)] hover:scale-[1.02] hover:bg-emerald-50/80 cursor-default rounded-[3px]">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg transition-colors duration-200 group-hover:bg-emerald-100 group-hover:shadow-sm">
              <Truck className="h-[28px] w-[28px] text-brand transition-colors duration-200 group-hover:text-emerald-700" />
            </div>
            <div>
              <p className="text-[12px] sm:text-[13px] font-semibold text-slate-500 uppercase tracking-wider transition-colors duration-200 group-hover:text-emerald-600">
                {t('dashboard.vehiclesLabel')}
              </p>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-[22px] sm:text-[24px] md:text-[26px] lg:text-[28px] xl:text-[30px] font-extrabold text-brand transition-colors duration-200 group-hover:text-emerald-700">
                  {t('dashboard.vehiclesValue')}
                </span>
                <span className="text-[13px] sm:text-[14px] font-bold text-brand transition-colors duration-200 group-hover:text-emerald-600">
                  {t('dashboard.vehiclesUnit')}
                </span>
              </div>
              <p className="mt-1.5 text-[12px] sm:text-[13px] text-slate-400 font-medium transition-colors duration-200 group-hover:text-emerald-600">
                {t('dashboard.vehiclesNote')}
              </p>
            </div>
          </div>

          {/* Metric 4: Warehouse */}
          <div className="group p-6 flex items-center gap-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)] hover:scale-[1.02] hover:bg-purple-50/80 cursor-default rounded-[3px]">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg transition-colors duration-200 group-hover:bg-purple-100 group-hover:shadow-sm">
              <Warehouse className="h-[28px] w-[28px] text-brand transition-colors duration-200 group-hover:text-purple-700" />
            </div>
            <div>
              <p className="text-[12px] sm:text-[13px] font-semibold text-slate-500 uppercase tracking-wider transition-colors duration-200 group-hover:text-purple-600">
                {t('dashboard.warehouseLabel')}
              </p>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-[22px] sm:text-[24px] md:text-[26px] lg:text-[28px] xl:text-[30px] font-extrabold text-brand transition-colors duration-200 group-hover:text-purple-700">
                  {t('dashboard.warehouseValue')}
                </span>
                <span className="text-[13px] sm:text-[14px] font-bold text-brand transition-colors duration-200 group-hover:text-purple-600">
                  {t('dashboard.warehouseUnit')}
                </span>
              </div>
              <p className="mt-1.5 text-[12px] sm:text-[13px] text-slate-400 font-medium transition-colors duration-200 group-hover:text-purple-600">
                {t('dashboard.warehouseNote')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
