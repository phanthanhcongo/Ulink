import Link from 'next/link';
import { Briefcase, MapPin, Clock, Calendar, DollarSign, Award, Share2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function JobDetailHeader() {
  return (
    <section className="py-6 border-b border-slate-100">
      {/* Title & Top Badges */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[3px] bg-blue-600 text-white font-extrabold text-[22px] sm:text-[24px] shadow-md">
            UL
          </div>
          <div>
            <h1 className="text-[30px] sm:text-[38px] md:text-[44px] lg:text-[50px] xl:text-[52px] font-extrabold text-slate-900 tracking-tight">
              Chuyên viên Phát triển Kinh doanh B2B - Khu Công nghiệp
            </h1>
            <div className="mt-2.5 flex flex-wrap items-center gap-2 text-[13px] sm:text-[14px] font-semibold text-slate-600">
              <Badge variant="soft" className="px-2.5 py-1 text-blue-700">
                Phòng Kinh doanh B2B
              </Badge>
              <Badge variant="muted" className="px-2.5 py-1 text-slate-700">
                Hà Nội
              </Badge>
              <Badge variant="muted" className="px-2.5 py-1 text-slate-700">
                Full-time
              </Badge>
              <Badge variant="outline" className="px-2.5 py-1 text-amber-700">
                Hạn nộp: 30/08/2026
              </Badge>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <Button variant="secondary" size="md" className="px-4 py-2.5 text-[13px] sm:text-[14px] font-semibold text-slate-700 shadow-sm">
            <Share2 className="h-4 w-4" /> Chia sẻ
          </Button>
          <Link
            href="/about/careers/b2b-sales/apply"
            className="inline-flex items-center justify-center rounded-[3px] bg-blue-600 px-6 py-2.5 text-[13px] sm:text-[14px] font-semibold text-white shadow-md hover:bg-blue-700 transition-all"
          >
            Ứng tuyển ngay
          </Link>
        </div>
      </div>

      {/* 4 Quick Info Cards */}
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="flex items-center gap-3.5 rounded-[3px] bg-slate-50 p-4 border border-slate-100">
          <div className="flex h-10 w-10 items-center justify-center rounded-[3px] bg-blue-100 text-blue-600">
            <DollarSign className="h-5 w-5" />
          </div>
          <div>
            <span className="block text-[12px] sm:text-[13px] font-semibold text-slate-500">Mức lương</span>
            <span className="text-[15px] sm:text-[16px] font-bold text-slate-900">15 - 25 triệu</span>
          </div>
        </div>

        <div className="flex items-center gap-3.5 rounded-[3px] bg-slate-50 p-4 border border-slate-100">
          <div className="flex h-10 w-10 items-center justify-center rounded-[3px] bg-blue-100 text-blue-600">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <span className="block text-[12px] sm:text-[13px] font-semibold text-slate-500">Kinh nghiệm</span>
            <span className="text-[15px] sm:text-[16px] font-bold text-slate-900">1 - 3 năm</span>
          </div>
        </div>

        <div className="flex items-center gap-3.5 rounded-[3px] bg-slate-50 p-4 border border-slate-100">
          <div className="flex h-10 w-10 items-center justify-center rounded-[3px] bg-blue-100 text-blue-600">
            <Award className="h-5 w-5" />
          </div>
          <div>
            <span className="block text-[12px] sm:text-[13px] font-semibold text-slate-500">Cấp bậc</span>
            <span className="text-[15px] sm:text-[16px] font-bold text-slate-900">Chuyên viên</span>
          </div>
        </div>

        <div className="flex items-center gap-3.5 rounded-[3px] bg-slate-50 p-4 border border-slate-100">
          <div className="flex h-10 w-10 items-center justify-center rounded-[3px] bg-blue-100 text-blue-600">
            <Briefcase className="h-5 w-5" />
          </div>
          <div>
            <span className="block text-[12px] sm:text-[13px] font-semibold text-slate-500">Hình thức</span>
            <span className="text-[15px] sm:text-[16px] font-bold text-slate-900">Full-time</span>
          </div>
        </div>
      </div>
    </section>
  );
}
