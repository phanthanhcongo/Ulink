import { FileText, Clock, Truck, Warehouse } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export default async function LiveMetricsBar() {
  const t = await getTranslations('regionalHubs');

  return (
    <section className="w-full bg-card py-8 border-b border-slate-200/60">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <h2 className="text-[15px] font-bold text-slate-800">
            {t('dashboard.headerTitle')}
          </h2>
          <div className="flex items-center gap-1.5 text-[13px] text-slate-500 font-medium">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{t('dashboard.headerTime')}</span>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 rounded-[3px] border border-slate-300 bg-white shadow-sm divide-y md:divide-y-0 lg:divide-x divide-slate-200">
          {/* Metric 1: Orders */}
          <div className="p-6 flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center">
              <FileText className="h-[28px] w-[28px] text-brand" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                {t('dashboard.ordersLabel')}
              </p>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-[20px] font-bold text-brand">
                  {t('dashboard.ordersValue')}
                </span>
                <span className="text-[13px] font-bold text-brand">
                  {t('dashboard.ordersUnit')}
                </span>
              </div>
              <div className="mt-1.5 flex items-center gap-1 text-[11px] font-bold text-emerald-500">
                <span>▲</span>
                <span>{t('dashboard.ordersChange').replace('+', '')}</span>
                <span className="text-slate-400 font-normal ml-0.5">
                  {t('dashboard.ordersNote')}
                </span>
              </div>
            </div>
          </div>

          {/* Metric 2: Delivery */}
          <div className="p-6 flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center">
              <Clock className="h-[28px] w-[28px] text-brand" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                {t('dashboard.deliveryLabel')}
              </p>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-[20px] font-bold text-brand">
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
          <div className="p-6 flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center">
              <Truck className="h-[28px] w-[28px] text-brand" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                {t('dashboard.vehiclesLabel')}
              </p>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-[20px] font-bold text-brand">
                  {t('dashboard.vehiclesValue')}
                </span>
                <span className="text-[13px] font-bold text-brand">
                  {t('dashboard.vehiclesUnit')}
                </span>
              </div>
              <p className="mt-1.5 text-[11px] text-slate-400 font-medium">
                {t('dashboard.vehiclesNote')}
              </p>
            </div>
          </div>

          {/* Metric 4: Warehouse */}
          <div className="p-6 flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center">
              <Warehouse className="h-[28px] w-[28px] text-brand" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                {t('dashboard.warehouseLabel')}
              </p>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-[20px] font-bold text-brand">
                  {t('dashboard.warehouseValue')}
                </span>
                <span className="text-[13px] font-bold text-brand">
                  {t('dashboard.warehouseUnit')}
                </span>
              </div>
              <p className="mt-1.5 text-[11px] text-slate-400 font-medium">
                {t('dashboard.warehouseNote')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
