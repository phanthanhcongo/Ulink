import Link from 'next/link';
import { MapPin, Briefcase, ArrowRight } from 'lucide-react';

const relatedJobs = [
  {
    id: '1',
    title: 'Kỹ sư Vận hành & Bảo trì Kho (Warehouse Ops Engineer)',
    department: 'Vận hành Kho bãi',
    location: 'Hà Nam',
    type: 'Full-time'
  },
  {
    id: '2',
    title: 'Chuyên viên Mua hàng & Chuỗi cung ứng (Procurement)',
    department: 'Chuỗi cung ứng',
    location: 'Hà Nội',
    type: 'Full-time'
  },
  {
    id: '3',
    title: 'Chuyên viên Marketing B2B (B2B Marketing Specialist)',
    department: 'Marketing',
    location: 'Hà Nội',
    type: 'Full-time'
  }
];

export function JobDetailRelated() {
  return (
    <section className="py-6 sm:py-8 lg:py-12 border-t border-slate-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 lg:mb-8 gap-2">
        <h2 className="text-base sm:text-lg lg:text-section-title font-bold text-slate-900">Các vị trí khác đang tuyển dụng</h2>
        <Link
          href="/about/careers"
          className="text-xs sm:text-body-regular font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 whitespace-nowrap"
        >
          Xem tất cả <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:gap-6 md:grid-cols-3">
        {relatedJobs.map((job) => (
          <div
            key={job.id}
            className="flex flex-col justify-between rounded-[3px] bg-white p-3 sm:p-5 shadow-sm border border-slate-100 group transition-all duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)]"
          >
            <div>
              <h3 className="text-sm sm:text-card-title font-bold text-slate-900 mb-1.5 sm:mb-2">{job.title}</h3>
              <div className="flex flex-wrap gap-1.5 sm:gap-2 text-xs sm:text-body-regular leading-relaxed text-slate-500 mb-3 sm:mb-4">
                <span className="flex items-center gap-0.5 sm:gap-1">
                  <Briefcase className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-blue-600" /> {job.department}
                </span>
                <span className="flex items-center gap-0.5 sm:gap-1">
                  <MapPin className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-blue-600" /> {job.location}
                </span>
              </div>
            </div>
            <Link
              href="/about/careers/b2b-sales"
              className="inline-flex justify-center rounded-[3px] border border-slate-200 py-1.5 sm:py-2 px-3 sm:px-4 text-xs sm:text-body-regular font-semibold text-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all"
            >
              Xem chi tiết
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
