import { Mail } from 'lucide-react';

const processSteps = [
  { num: '01', title: 'Ứng tuyển', desc: 'Gửi CV ứng tuyển trực tiếp tại website hoặc email HR.' },
  {
    num: '02',
    title: 'Sàng lọc hồ sơ',
    desc: 'Phòng HR tiếp nhận và phản hồi ứng viên trong 48h.'
  },
  { num: '03', title: 'Phỏng vấn', desc: 'Phỏng vấn chuyên môn 1-2 vòng với Trưởng phòng.' },
  { num: '04', title: 'Nhận việc', desc: 'Gửi Offer Letter và làm thủ tục Onboarding.' }
];

export function JobDetailProcess() {
  return (
    <section className="py-4 sm:py-5 lg:py-6 border-t border-slate-100" id="apply">
      <h2 className="text-base sm:text-lg lg:text-section-title font-bold text-slate-900 mb-3 sm:mb-4 border-l-4 border-blue-600 pl-3">
        Quy trình ứng tuyển
      </h2>

      <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {processSteps.map((s, idx) => (
          <div
            key={idx}
            className="flex flex-col rounded-[3px] bg-slate-50 p-3 sm:p-4 border border-slate-100"
          >
            <span className="text-xs sm:text-body-regular font-bold uppercase tracking-wider text-blue-600 mb-1">{s.num}</span>
            <h3 className="text-sm sm:text-card-title font-bold text-slate-900">{s.title}</h3>
            <p className="mt-1 text-xs sm:text-body-regular leading-relaxed text-slate-600">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* HR Support Note Box */}
      <div className="mt-4 sm:mt-6 rounded-[3px] bg-blue-50 p-3 sm:p-5 border border-blue-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-start sm:items-center gap-2 sm:gap-3 flex-1">
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-[3px] bg-blue-600 text-white mt-0.5 sm:mt-0">
            <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <div>
            <span className="block text-xs sm:text-body-regular font-bold text-slate-900">
              Liên hệ trực tiếp Phòng Nhân sự ULink
            </span>
            <span className="text-xs sm:text-body-regular leading-relaxed text-slate-600">
              Email: hr@ulink.vn | Hotline: 024 7300 9899
            </span>
          </div>
        </div>

        <a
          href="mailto:hr@ulink.vn"
          className="w-full sm:w-auto inline-flex shrink-0 items-center justify-center rounded-[3px] bg-blue-600 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-body-regular font-semibold text-white shadow-sm hover:bg-blue-700 transition-all"
        >
          Gửi CV qua Email
        </a>
      </div>
    </section>
  );
}
