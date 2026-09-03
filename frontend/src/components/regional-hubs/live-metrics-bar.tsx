'use client';

import { useState, useEffect, useRef } from 'react';
import { FileText, PieChart, Truck, Store } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function LiveMetricsBar() {
  const t = useTranslations('regionalHubs');
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
      setCurrentTime(timeStr);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const metrics = [
    {
      key: 'orders',
      icon: FileText,
      label: t('dashboard.ordersLabel'),
      val: t('dashboard.ordersValue'),
      unit: t('dashboard.ordersUnit'),
      change: t('dashboard.ordersChange').replace('+', ''),
      note: t('dashboard.ordersNote'),
      hasChange: true
    },
    {
      key: 'delivery',
      icon: PieChart,
      label: t('dashboard.deliveryLabel'),
      val: t('dashboard.deliveryValue'),
      unit: '',
      change: t('dashboard.deliveryChange').replace('+', ''),
      note: t('dashboard.deliveryNote'),
      hasChange: true
    },
    {
      key: 'vehicles',
      icon: Truck,
      label: t('dashboard.vehiclesLabel'),
      val: t('dashboard.vehiclesValue'),
      unit: t('dashboard.vehiclesUnit'),
      change: '',
      note: t('dashboard.vehiclesNote'),
      hasChange: false
    },
    {
      key: 'warehouse',
      icon: Store,
      label: t('dashboard.warehouseLabel'),
      val: t('dashboard.warehouseValue'),
      unit: t('dashboard.warehouseUnit'),
      change: '',
      note: t('dashboard.warehouseNote'),
      hasChange: false
    }
  ];

  return (
    <section className="w-full bg-[#f8fafc] py-8 sm:py-10 border-b border-slate-200/60">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <h2 className="text-[18px] sm:text-[20px] font-bold text-[#1e293b] leading-[28px] tracking-tight">
            {t('dashboard.headerTitle')}
          </h2>
          <div className="flex items-center gap-2 text-[14px] sm:text-[15px] font-semibold text-[#94a3b8]">
            <span className="h-2.5 w-2.5 rounded-full bg-[#10b981] animate-pulse" />
            <span>{currentTime ? `Cập nhật lúc: ${currentTime}` : t('dashboard.headerTime')}</span>
          </div>
        </div>

        {/* Metrics Row Grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
        >
          {metrics.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.key}
                className={`group flex items-center gap-4 rounded-none border border-[#ced4da] bg-white p-5 sm:p-6 lg:p-6 shadow-sm transition-[transform,box-shadow,border-color] duration-150 ease-out hover:scale-[1.02] hover:-translate-y-1 hover:shadow-md hover:border-brand cursor-pointer ${visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                  }`}
              >
                {/* Icon (No circle background, no border) */}
                <div className="flex h-10 w-10 items-center justify-center text-brand shrink-0">
                  <Icon className="h-8 w-8 transition-transform duration-150 ease-out group-hover:scale-105" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-[16px] sm:text-[18px] font-bold text-[#495057] leading-[24px] group-hover:text-brand transition-colors duration-300 truncate">
                    {item.label}
                  </p>
                  <div className="mt-0.5 flex items-baseline gap-1.5">
                    <span className="text-[22px] sm:text-[24px] lg:text-[26px] font-bold text-brand transition-colors duration-300">
                      {item.val}
                    </span>
                    {item.unit && (
                      <span className="text-[15px] font-bold text-[#495057] transition-colors duration-300">
                        {item.unit}
                      </span>
                    )}
                  </div>
                  {item.hasChange ? (
                    <div className="mt-1 flex items-center gap-1 text-[14px] font-bold text-[#10b981]">
                      <span>▲</span>
                      <span>{item.change}</span>
                      <span className="text-[#495057] font-normal ml-0.5 truncate">
                        {item.note}
                      </span>
                    </div>
                  ) : (
                    <p className="mt-1 text-[14px] text-[#495057] font-normal truncate">
                      {item.note}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
