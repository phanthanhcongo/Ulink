import Link from 'next/link';
import { MapPin, Briefcase, Clock, Wallet, ArrowRight } from 'lucide-react';

const relatedRoles = [
  {
    id: 'role-1',
    title: 'Trưởng nhóm Kinh doanh KCN',
    dept: 'Kinh doanh',
    exp: '3–5 năm',
    type: 'Toàn thời gian',
    salary: '25 – 35M VND',
    location: 'Hà Nội',
    slug: 'b2b-sales-lead'
  },
  {
    id: 'role-2',
    title: 'Chuyên viên Marketing Công nghiệp',
    dept: 'Marketing',
    exp: '2–4 năm',
    type: 'Toàn thời gian',
    salary: '15 – 22M VND',
    location: 'Hà Nội',
    slug: 'industrial-marketing'
  },
  {
    id: 'role-3',
    title: 'Chuyên viên Hỗ trợ Khách hàng DN',
    dept: 'Customer Support',
    exp: '1–3 năm',
    type: 'Toàn thời gian',
    salary: '12 – 16M VND',
    location: 'Hà Nội',
    slug: 'customer-support'
  }
];

export function JobDetailRelated() {
  return (
    <section className="py-8 sm:py-12 border-t border-slate-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8 border-b border-slate-100 pb-4">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-[#617084] font-semibold text-xs lg:text-[12px] uppercase tracking-wider">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0FD186]" />
            <span>KHÁM PHÁ THÊM TỪ ULink Industries</span>
          </div>
          <h2 className="text-[#162233] font-semibold text-xl lg:text-[20px] leading-[28px]">
            Các vị trí Kinh doanh khác đang tuyển
          </h2>
        </div>

        <Link
          href="/about/careers"
          className="inline-flex items-center gap-1.5 rounded-full border border-[#DDE3E8] px-4 py-2 text-[#1257C0] font-semibold text-xs lg:text-[14px] hover:bg-blue-50 transition-colors w-fit shrink-0"
        >
          <span>Xem tất cả vị trí</span>
          <ArrowRight className="h-4 w-4 stroke-[2.25]" />
        </Link>
      </div>

      {/* 3 Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        {relatedRoles.map((role) => (
          <div
            key={role.id}
            className="group flex flex-col justify-between rounded-[2px] bg-white p-5 border border-[#DDE3E8] shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-1 hover:ring-[#1769E2] cursor-pointer"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-[#0089FF] to-[#1769E2] text-white font-bold text-xs shadow-xs">
                  UL
                </div>
                <h3 className="text-[#162233] font-semibold text-sm lg:text-[14px] group-hover:text-[#1769E2] transition-colors leading-snug">
                  {role.title}
                </h3>
              </div>

              {/* Chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="inline-flex items-center gap-1 bg-[#F1F3F5] text-[#617084] px-2.5 py-0.5 rounded-full text-xs font-medium">
                  <MapPin className="h-3 w-3 stroke-[2]" /> {role.location}
                </span>
                <span className="inline-flex items-center gap-1 bg-[#F1F3F5] text-[#617084] px-2.5 py-0.5 rounded-full text-xs font-medium">
                  <Clock className="h-3 w-3 stroke-[2]" /> {role.exp}
                </span>
                <span className="inline-flex items-center gap-1 bg-[#F1F3F5] text-[#617084] px-2.5 py-0.5 rounded-full text-xs font-medium">
                  <Briefcase className="h-3 w-3 stroke-[2]" /> {role.type}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100">
              <span className="text-[#162233] font-semibold text-xs lg:text-[14px]">
                {role.salary}
              </span>
              <Link
                href={`/about/careers/${role.slug}`}
                className="text-[#1769E2] font-semibold text-xs lg:text-[14px] hover:underline inline-flex items-center gap-1"
              >
                Ứng tuyển →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
