import Link from 'next/link';

const jobs = [
  {
    id: '1',
    category: 'Khối Sản Xuất - Công Nghệ Cao',
    title: 'Kỹ Sư Giám Sát Chất Lượng QA/QC (Phòng Sạch)',
    salary: '14 - 20M VNĐ',
    location: 'Kim Bảng, Hà Nam',
    href: '/about/careers/qa-qc-engineer'
  },
  {
    id: '2',
    category: 'Phòng Logistics & HUB',
    title: 'Chuyên Viên Logistics & Điều Phối Chuỗi Cung Ứng',
    salary: '12 - 18M VNĐ',
    location: 'HUB Hà Nam',
    href: '/about/careers/logistics-spec'
  }
];

export function ApplySuccessRecommendations() {
  return (
    <section className="py-4 sm:py-6 lg:py-8 max-w-5xl mx-auto border-t border-slate-100 px-3 sm:px-4">
      <div className="flex flex-col items-center text-center mb-4 sm:mb-6 lg:mb-8">
        <h2 className="text-section-title sm:text-hero-title font-bold tracking-tight text-slate-900">
          Cơ hội nghề nghiệp tương tự dành cho bạn
        </h2>
        <p className="mt-1.5 sm:mt-2 lg:mt-3 text-body-regular text-slate-500 text-sm sm:text-base">
          Các vị trí đang tuyển có yêu cầu kỹ năng tương tự với hồ sơ của bạn
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:gap-6 md:grid-cols-2">
        {jobs.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="flex flex-col justify-between rounded-[3px] bg-white p-3 sm:p-4 lg:p-6 border border-slate-100 shadow-sm transition-all hover:shadow-md hover:border-blue-200 group"
          >
            <div>
              <span className="text-caption-responsive font-bold text-blue-600 uppercase tracking-wider block mb-1 text-xs sm:text-sm">
                {item.category}
              </span>
              <h3 className="text-body-large sm:text-card-title text-slate-900 group-hover:text-blue-600 transition-colors mb-2 sm:mb-3">
                {item.title}
              </h3>
            </div>

            <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-slate-100 text-body-regular text-xs sm:text-sm">
              <span className="font-bold text-blue-600">{item.salary}</span>
              <span className="text-slate-500 font-medium">{item.location}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
