import Link from 'next/link';

const jobs = [
  {
    id: '1',
    category: 'Khối Sản Xuất - Công Nghệ Cao',
    title: 'Kỹ Sư Giám Sát Chất Lượng QA/QC (Phòng Sạch)',
    salary: '14 - 20M VND',
    location: 'Đại Cương, Hà Nam',
    href: '/about/careers/qa-qc-engineer'
  },
  {
    id: '2',
    category: 'Phòng Logistics & HUB',
    title: 'Chuyên Viên Logistics & Điều Phối Chuỗi Cung Ứng',
    salary: '12 - 18M VND',
    location: 'HUB Hà Nam',
    href: '/about/careers/logistics-spec'
  }
];

export function ApplySuccessRecommendations() {
  return (
    <section className="py-8 sm:py-12 max-w-4xl mx-auto border-t border-slate-200/80 px-4 mt-6">
      <div className="flex flex-col items-center text-center mb-6 sm:mb-8">
        <h2 className="text-[#162233] font-bold text-xl sm:text-2xl lg:text-[24px] tracking-tight">
          Cơ hội nghề nghiệp tương tự dành cho bạn
        </h2>
        <p className="mt-1.5 text-[#617084] font-normal text-sm sm:text-base lg:text-[15px]">
          Các vị trí đang mở tuyển có yêu cầu kỹ năng tương ứng với hồ sơ của bạn
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {jobs.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="group flex flex-col justify-between rounded-[2px] bg-white p-6 border border-[#CAD5E2] shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-1 hover:ring-[#1769E2] cursor-pointer"
          >
            <div className="flex flex-col gap-2">
              <span className="text-[#1257C0] font-semibold text-xs lg:text-[13px] uppercase tracking-wider">
                {item.category}
              </span>
              <h3 className="text-[#162233] font-bold text-base lg:text-[16px] group-hover:text-[#1769E2] transition-colors leading-snug">
                {item.title}
              </h3>
            </div>

            <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100">
              <span className="bg-[#DBEAFE] text-[#1257C0] px-2.5 py-1 rounded-[2px] font-bold text-xs lg:text-[13px]">
                {item.salary}
              </span>
              <span className="text-[#617084] font-normal text-xs lg:text-[13px]">{item.location}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

