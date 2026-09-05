'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, MapPin, Briefcase, Wallet, ArrowRight, Target, Zap, HeartHandshake, User, Calendar } from 'lucide-react';

const jobsData = [
  {
    id: '1',
    slug: 'bd-01',
    title: 'Chuyên viên Phát triển Kinh doanh',
    code: 'BD-01',
    isUrgent: true,
    location: 'Hà Nam',
    type: 'Toàn thời gian',
    salary: '15 - 20 triệu',
    daysLeft: 'Còn 10 ngày'
  },
  {
    id: '2',
    slug: 'pe-03',
    title: 'Kỹ sư Dự án (Project Engineer)',
    code: 'PE-03',
    isUrgent: false,
    location: 'Hà Nam',
    type: 'Toàn thời gian',
    salary: '18 - 25 triệu',
    daysLeft: 'Còn 8 ngày'
  },
  {
    id: '3',
    slug: 'sce-02',
    title: 'Chuyên viên Chuỗi cung ứng (Supply Chain Executive)',
    code: 'SCE-02',
    isUrgent: false,
    location: 'Hà Nội',
    type: 'Toàn thời gian',
    salary: '12 - 18 triệu',
    daysLeft: 'Còn 15 ngày'
  }
];

const benefitsData = [
  {
    icon: Target,
    title: 'Sứ mệnh ý nghĩa',
    desc: 'Tham gia xây dựng chuỗi cung ứng thông minh, bền vững cho tương lai.'
  },
  {
    icon: Zap,
    title: 'Cơ hội phát triển',
    desc: 'Lộ trình nghề nghiệp rõ ràng, đào tạo bài bản và liên tục cập nhật.'
  },
  {
    icon: HeartHandshake,
    title: 'Môi trường truyền cảm hứng',
    desc: 'Văn hóa minh bạch, tôn trọng và đề cao sự hợp tác, sáng tạo.'
  },
  {
    icon: User,
    title: 'Phúc lợi toàn diện',
    desc: 'Chăm sóc sức khỏe toàn diện, bảo hiểm và các chế độ đãi ngộ hấp dẫn.'
  },
  {
    icon: Calendar,
    title: 'Cân bằng cuộc sống',
    desc: 'Làm việc linh hoạt với nhiều hoạt động gắn kết tinh thần phong phú.'
  }
];

export function CareersJobList() {
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('');
  const [location, setLocation] = useState('');

  const filteredJobs = jobsData.filter((j) => {
    const matchesSearch = j.title.toLowerCase().includes(search.toLowerCase());
    const matchesLocation = location ? j.location.toLowerCase().includes(location.toLowerCase()) : true;
    return matchesSearch && matchesLocation;
  });

  return (
    <section className="py-12 lg:py-16" id="openings">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-start">
        {/* Left Column: Job Search & List */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="flex justify-between items-end border-b border-slate-200/60 pb-4">
            <h2 className="text-[30px] font-extrabold text-blue-600 uppercase tracking-wider">
              VỊ TRÍ TUYỂN DỤNG
            </h2>
            <Link
              href="/about/careers"
              className="text-body-regular font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
            >
              <span>Xem tất cả vị trí</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Search & Filter Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="relative">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Từ khóa, vị trí cần tìm..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-[3px] border border-slate-200 pl-10 pr-4 py-2.5 text-body-regular outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600/20 bg-white"
              />
            </div>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="rounded-[3px] border border-slate-200 px-3 py-2.5 text-body-regular text-slate-600 outline-none focus:border-blue-600 bg-white"
            >
              <option value="">Phòng ban</option>
              <option value="kinh-doanh">Kinh doanh</option>
              <option value="ky-thuat">Kỹ thuật</option>
              <option value="chuoi-cung-ung">Chuỗi cung ứng</option>
            </select>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="rounded-[3px] border border-slate-200 px-3 py-2.5 text-body-regular text-slate-600 outline-none focus:border-blue-600 bg-white"
            >
              <option value="">Địa điểm</option>
              <option value="hanoi">Hà Nội</option>
              <option value="hanam">Hà Nam</option>
            </select>
          </div>

          {/* Job List */}
          <div className="flex flex-col gap-4">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-[3px] bg-white p-5 border border-slate-200/80 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)]"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      href={`/about/careers/${job.slug}`}
                      className="text-card-title text-slate-800 hover:text-blue-600 transition-colors"
                    >
                      {job.title}
                    </Link>
                    <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded text-caption-responsive font-bold uppercase tracking-wider">
                      {job.code}
                    </span>
                    {job.isUrgent && (
                      <span className="bg-orange-50 text-orange-600 px-2 py-0.5 rounded text-caption-responsive font-bold uppercase tracking-wider">
                        Tuyển gấp
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-body-regular text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" /> {job.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Briefcase className="h-3.5 w-3.5 text-slate-400" /> {job.type}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Wallet className="h-3.5 w-3.5 text-slate-400" /> {job.salary}
                    </span>
                  </div>
                </div>

                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start h-full gap-2 shrink-0">
                  <span className="text-body-regular font-semibold text-amber-600">
                    {job.daysLeft}
                  </span>
                  <Link
                    href={`/about/careers/${job.slug}`}
                    className="inline-flex shrink-0 items-center justify-center rounded-[3px] bg-[#1769E2] px-5 py-2 text-body-regular font-semibold text-white shadow-xs hover:bg-[#1257BD] transition-colors"
                  >
                    Ứng tuyển
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-3.5 mt-8">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-body-regular font-bold text-white shadow-xs">
              1
            </span>
            {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((page) => (
              <span
                key={page}
                className="text-body-regular font-bold text-slate-500 hover:text-blue-600 cursor-pointer transition-colors"
              >
                {page}
              </span>
            ))}
          </div>
        </div>

        {/* Right Column: Why Join ULink */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <h2 className="text-[30px] font-extrabold text-blue-600 uppercase tracking-wider border-b border-slate-200/60 pb-4">
            VÌ SAO NÊN GIA NHẬP ULINK?
          </h2>

          <div className="flex flex-col gap-4">
            {benefitsData.map((b, idx) => {
              const Icon = b.icon;
              return (
                <div
                  key={idx}
                  className="group flex items-start gap-4 p-4 rounded-[3px] bg-slate-50/50 border border-slate-100/80 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.15)]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[3px] bg-blue-50 text-blue-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-card-title text-slate-800">
                      {b.title}
                    </h3>
                    <p className="text-body-regular text-slate-500 leading-relaxed mt-0.5">
                      {b.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
