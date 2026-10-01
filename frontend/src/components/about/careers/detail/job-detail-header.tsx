'use client';

import Link from 'next/link';
import { Wallet, MapPin, Briefcase, Clock, Heart, ArrowRight } from 'lucide-react';
import type { JobDetailVM } from '@/lib/careers-data';

export function JobDetailHeader({ job }: { job: JobDetailVM }) {
  const overviewCards = [
    {
      id: 'salary',
      label: 'LƯƠNG',
      value: job.salaryRange || 'Thương lượng',
      subtext: 'Thương lượng theo năng lực',
      icon: Wallet
    },
    {
      id: 'location',
      label: 'ĐỊA ĐIỂM',
      value: job.location || '—',
      subtext: 'ULink Industries',
      icon: MapPin
    },
    {
      id: 'type',
      label: 'LOẠI HÌNH',
      value: job.employmentTypeLabel || '—',
      subtext: job.departmentLabel || 'Toàn thời gian',
      icon: Briefcase
    },
    {
      id: 'deadline',
      label: 'HẠN NỘP',
      value: job.deadlineLabel || '—',
      subtext: job.deadlineDate || 'Đang cập nhật',
      icon: Clock
    }
  ];

  return (
    <section className="py-4 sm:py-6 lg:py-8">
      {/* Title & Action Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6">
        {/* Left Info */}
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-[#1769E2] to-[#0089FF] text-white font-bold text-lg sm:text-2xl shadow-md border-2 border-[#BCE0FF]">
            UL
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-[#162233] font-semibold text-xl sm:text-2xl lg:text-[28px] leading-snug lg:leading-[36px]">
              {job.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-[#617084] font-normal text-xs sm:text-sm lg:text-[14px]">
              {job.location && (
                <span className="flex items-center gap-1.5 bg-[#F5F8FC] px-2.5 py-1 rounded-[2px]">
                  <MapPin className="h-4 w-4 text-[#1769E2] stroke-[2.25]" /> {job.location} · Tại văn phòng
                </span>
              )}
              {job.employmentTypeLabel && (
                <span className="flex items-center gap-1.5 bg-[#F5F8FC] px-2.5 py-1 rounded-[2px]">
                  <Briefcase className="h-4 w-4 text-[#1769E2] stroke-[2.25]" /> {job.employmentTypeLabel}
                </span>
              )}
              {job.code && (
                <span className="flex items-center gap-1.5 bg-[#F5F8FC] px-2.5 py-1 rounded-[2px]">
                  <Clock className="h-4 w-4 text-[#1769E2] stroke-[2.25]" /> Mã: {job.code}
                </span>
              )}
              {job.isUrgent && (
                <span className="font-semibold text-[#B25E00]">Tuyển gấp</span>
              )}
            </div>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 shrink-0 w-full lg:w-auto">
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#0089FF]/40 bg-blue-50/50 text-[#0089FF] hover:bg-blue-100/60 transition-all"
            title="Lưu tin tuyển dụng"
          >
            <Heart className="h-5 w-5 stroke-[2.25]" />
          </button>
          <Link
            href={`/about/careers/${job.slug}/apply`}
            className="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 rounded-full bg-[#023DA0] hover:bg-[#002B73] px-6 py-3 text-white font-semibold text-sm lg:text-[14px] shadow-sm transition-all hover:scale-[1.02] active:scale-95"
          >
            <span>Ứng tuyển ngay</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-white">
              <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
            </span>
          </Link>
        </div>
      </div>

      {/* 4 Info Cards */}
      <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {overviewCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className="group flex items-center gap-3.5 rounded-[2px] bg-white p-4 border border-[#DDE3E8] shadow-xs transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:ring-1 hover:ring-[#1769E2]/30 cursor-pointer"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EFF8FF] text-[#1769E2] transition-transform duration-200 group-hover:scale-110">
                <Icon className="h-5 w-5 stroke-[2.25]" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[#617084] font-semibold text-[12px] uppercase tracking-wider">
                  {card.label}
                </span>
                <span className="text-[#162233] font-semibold text-base lg:text-[16px] leading-tight mt-0.5">
                  {card.value}
                </span>
                <span className="text-[#617084] font-normal text-xs lg:text-[13px] truncate mt-0.5">
                  {card.subtext}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
