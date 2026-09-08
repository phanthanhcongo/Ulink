import Link from 'next/link';
import { Briefcase, MapPin, Clock, Calendar, DollarSign, Award, Share2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function JobDetailHeader() {
  return (
    <section className="py-4 sm:py-5 lg:py-6 border-b border-slate-100">
      {/* Title & Top Badges */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4 lg:gap-6">
        <div className="flex items-start gap-3 sm:gap-4">
            <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-[3px] bg-blue-600 text-white font-bold text-sm sm:text-section-title shadow-md">
            UL
          </div>
          <div className="flex-1">
            <h1 className="text-lg sm:text-xl lg:text-hero-title font-bold text-slate-900 tracking-tight leading-snug">
              Chuyên viên Phát triển Kinh doanh B2B - Khu Công nghiệp
            </h1>
            <div className="mt-2 sm:mt-2.5 flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs sm:text-body-regular font-semibold text-slate-600">
              <Badge variant="soft" className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-xs sm:text-body-regular text-blue-700">
                Phòng Kinh doanh B2B
              </Badge>
              <Badge variant="muted" className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-xs sm:text-body-regular text-slate-700">
                Hà Nội
              </Badge>
              <Badge variant="muted" className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-xs sm:text-body-regular text-slate-700">
                Full-time
              </Badge>
              <Badge variant="outline" className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-xs sm:text-body-regular text-amber-700">
                Hạn nộp: 30/08/2026
              </Badge>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 w-full lg:w-auto">
          <Button variant="secondary" size="md" className="flex-1 sm:flex-none px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-body-regular font-semibold text-slate-700 shadow-sm">
            <Share2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> <span className="hidden sm:inline">Chia sẻ</span>
          </Button>
          <Link
            href="/about/careers/b2b-sales/apply"
            className="flex-1 sm:flex-none inline-flex items-center justify-center rounded-[3px] bg-blue-600 px-3 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-body-regular font-semibold text-white shadow-md hover:bg-blue-700 transition-all"
          >
            Ứng tuyển ngay
          </Link>
        </div>
      </div>

      {/* 4 Quick Info Cards */}
      <div className="mt-4 sm:mt-6 lg:mt-8 grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4 sm:grid-cols-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3.5 rounded-[3px] bg-slate-50 p-3 sm:p-4 border border-slate-100">
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-[3px] bg-blue-100 text-blue-600">
            <DollarSign className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <div className="min-w-0">
            <span className="block text-xs sm:text-caption-responsive font-semibold text-slate-500">Mức lương</span>
            <span className="text-sm sm:text-body-large font-bold text-slate-900">15 - 25 triệu</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3.5 rounded-[3px] bg-slate-50 p-3 sm:p-4 border border-slate-100">
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-[3px] bg-blue-100 text-blue-600">
            <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <div className="min-w-0">
            <span className="block text-xs sm:text-caption-responsive font-semibold text-slate-500">Kinh nghiệm</span>
            <span className="text-sm sm:text-body-large font-bold text-slate-900">1 - 3 năm</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3.5 rounded-[3px] bg-slate-50 p-3 sm:p-4 border border-slate-100">
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-[3px] bg-blue-100 text-blue-600">
            <Award className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <div className="min-w-0">
            <span className="block text-xs sm:text-caption-responsive font-semibold text-slate-500">Cấp bậc</span>
            <span className="text-sm sm:text-body-large font-bold text-slate-900">Chuyên viên</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3.5 rounded-[3px] bg-slate-50 p-3 sm:p-4 border border-slate-100">
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-[3px] bg-blue-100 text-blue-600">
            <Briefcase className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <div className="min-w-0">
            <span className="block text-xs sm:text-caption-responsive font-semibold text-slate-500">Hình thức</span>
            <span className="text-sm sm:text-body-large font-bold text-slate-900">Full-time</span>
          </div>
        </div>
      </div>
    </section>
  );
}
