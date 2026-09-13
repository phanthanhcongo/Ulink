'use client';

import Link from 'next/link';
import { UserCheck, Users, Briefcase, Calendar, Clock, Copy, Globe, Building2, ChevronRight, ExternalLink } from 'lucide-react';

const generalInfo = [
  { label: 'Cấp bậc', value: 'Chuyên viên', icon: UserCheck },
  { label: 'Số lượng tuyển', value: '2 người', icon: Users },
  { label: 'Hình thức làm việc', value: 'Toàn thời gian', icon: Briefcase },
  { label: 'Giới tính', value: 'Không yêu cầu', icon: Calendar },
  { label: 'Hạn nộp hồ sơ', value: '30/09/2026', icon: Clock }
];

const companyDetails = [
  { label: 'SỐ LƯỢNG', value: '50–100 nhân viên' },
  { label: 'THÀNH LẬP', value: '2020' },
  { label: 'LĨNH VỰC', value: 'Công nghệ công nghiệp' },
  { label: 'VĂN PHÒNG', value: 'Hà Nội, TP.HCM' },
  { label: 'WEBSITE', value: 'ulink.vn' }
];

const similarJobs = [
  { title: 'Trưởng nhóm Kinh doanh KCN', location: 'Hà Nội', exp: '5+ năm', slug: 'b2b-sales-lead' },
  { title: 'Chuyên viên Marketing Công nghiệp', location: 'Hà Nội', exp: '2+ năm', slug: 'industrial-marketing' },
  { title: 'Chuyên viên Hỗ trợ Khách hàng DN', location: 'Hà Nội', exp: '1+ năm', slug: 'customer-support' }
];

export function JobDetailSidebar() {
  return (
    <div className="flex flex-col gap-6 py-4 sm:py-6 lg:py-8">
      {/* Card 1: Thông tin chung */}
      <div className="rounded-[2px] bg-white p-5 border border-[#DDE3E8] shadow-xs flex flex-col gap-5">
        <h3 className="text-[#162233] font-semibold text-base lg:text-[16px] border-b border-slate-100 pb-3">
          Thông tin chung
        </h3>

        <div className="flex flex-col gap-4">
          {generalInfo.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#0089FF]/30 bg-[#EFF8FF] text-[#1769E2]">
                  <Icon className="h-4.5 w-4.5 stroke-[2.25]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[#617084] font-normal text-xs lg:text-[13px]">{item.label}</span>
                  <span className="text-[#162233] font-semibold text-sm lg:text-[14px]">{item.value}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Share section */}
        <div className="border-t border-slate-100 pt-4 flex flex-col gap-2.5">
          <span className="text-[#617084] font-normal text-xs lg:text-[13px]">Chia sẻ:</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigator.clipboard?.writeText?.(window.location.href)}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#EFF8FF] px-3.5 py-1.5 text-[#1769E2] font-semibold text-xs lg:text-[13px] hover:bg-blue-100 transition-colors"
            >
              <Copy className="h-3.5 w-3.5 stroke-[2.25]" />
              <span>Sao chép link</span>
            </button>
          </div>
        </div>
      </div>

      {/* Card 2: VỀ CÔNG TY */}
      <div className="rounded-[2px] bg-white p-5 border border-[#DDE3E8] shadow-xs flex flex-col gap-4">
        <span className="text-[#617084] font-semibold text-xs uppercase tracking-wider">
          VỀ CÔNG TY
        </span>
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#0089FF] to-[#1769E2] text-white font-bold text-sm shadow-xs border border-[#BCE0FF]">
            UL
          </div>
          <div className="flex flex-col">
            <span className="text-[#162233] font-semibold text-sm lg:text-[14px] leading-snug">
              Công ty TNHH ULink Industries
            </span>
            <span className="text-[#617084] font-normal text-xs lg:text-[13px]">
              Nhà sản xuất & cung ứng vật tư
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 pt-2 border-t border-slate-100">
          {companyDetails.map((det, idx) => (
            <div key={idx} className="flex justify-between items-center text-xs lg:text-[13px]">
              <span className="text-[#617084] font-semibold uppercase">{det.label}</span>
              <span className="text-[#617084] font-normal">{det.value}</span>
            </div>
          ))}
        </div>

        <Link
          href="/about"
          className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-full border border-[#DDE3E8] py-2 px-4 text-[#1257C0] font-semibold text-xs lg:text-[14px] hover:bg-blue-50 transition-colors text-center"
        >
          <span>Xem trang công ty</span>
          <ChevronRight className="h-4 w-4 stroke-[2.25]" />
        </Link>
      </div>

      {/* Card 3: VỊ TRÍ TƯƠNG TỰ */}
      <div className="rounded-[2px] bg-white p-5 border border-[#DDE3E8] shadow-xs flex flex-col gap-4">
        <span className="text-[#617084] font-semibold text-xs uppercase tracking-wider">
          VỊ TRÍ TƯƠNG TỰ
        </span>

        <div className="flex flex-col gap-3">
          {similarJobs.map((job, idx) => (
            <Link
              key={idx}
              href={`/about/careers/${job.slug}`}
              className="group flex flex-col p-3 rounded-[2px] bg-[#F5F8FC]/60 border border-slate-100 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs hover:border-[#1769E2] hover:bg-white"
            >
              <span className="text-[#162233] font-semibold text-xs lg:text-[14px] group-hover:text-[#1769E2] transition-colors leading-snug">
                {job.title}
              </span>
              <div className="flex items-center gap-2 mt-1 text-[#617084] font-normal text-xs">
                <span>{job.location}</span>
                <span>·</span>
                <span>{job.exp}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
