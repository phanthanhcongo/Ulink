import { Mail, ArrowRight } from 'lucide-react';

const processSteps = [
  { step: '01', title: 'Sàng lọc hồ sơ', desc: 'Phản hồi trong vòng 3 ngày làm việc.' },
  { step: '02', title: 'Phỏng vấn sơ bộ với Trưởng phòng KD', desc: 'Trao đổi online 30 phút.' },
  { step: '03', title: 'Bài tập tình huống kinh doanh', desc: 'Case study thực tế, hoàn thành trong 3 giờ.' },
  { step: '04', title: 'Phỏng vấn trực tiếp tại văn phòng', desc: '2 vòng trao đổi trong cùng ngày tại Hà Nội.' },
  { step: '05', title: 'Đề nghị mức lương', desc: 'Trong vòng 3 ngày làm việc sau vòng cuối.' }
];

export function JobDetailProcess() {
  return (
    <section className="py-6 sm:py-8 border-t border-slate-100" id="apply">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="h-4 w-1 bg-[#1769E2] rounded-full" />
          <h2 className="text-[#162233] font-semibold text-lg lg:text-[20px] leading-[28px]">
            Quy trình tuyển dụng
          </h2>
        </div>
        <span className="text-[#617084] font-semibold text-xs lg:text-[12px] uppercase tracking-wider bg-[#F5F8FC] px-3 py-1 rounded-[2px]">
          ~ 2 TUẦN TỔNG THỜI GIAN
        </span>
      </div>

      {/* 5 Process Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        {processSteps.map((s, idx) => (
          <div
            key={idx}
            className="group flex flex-col rounded-[2px] bg-white p-4 border border-[#DDE3E8] shadow-xs transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:ring-1 hover:ring-[#1769E2]/30 cursor-pointer"
          >
            <span className="text-[#1769E2] font-semibold text-base lg:text-[16px] mb-1.5 transition-transform duration-200 group-hover:scale-110 w-fit">
              {s.step}
            </span>
            <h3 className="text-[#162233] font-semibold text-sm lg:text-[14px] leading-snug">
              {s.title}
            </h3>
            <p className="mt-1.5 text-[#617084] font-normal text-xs lg:text-[13px] leading-relaxed">
              {s.desc}
            </p>
          </div>
        ))}
      </div>

      {/* HR Contact Box */}
      <div className="mt-6 rounded-[12px] bg-[#EFF8FF] p-4 sm:p-6 border border-[#BCE0FF] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 flex-1">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-[#1769E2] text-white">
            <Mail className="h-5 w-5 stroke-[2.25]" />
          </div>
          <div className="flex flex-col">
            <h4 className="text-[#162233] font-semibold text-sm lg:text-[15px]">
              Có câu hỏi trước khi ứng tuyển?
            </h4>
            <p className="text-[#617084] font-normal text-xs lg:text-[14px] leading-relaxed mt-0.5">
              Gửi email đến <a href="mailto:careers@ulinkindustries.com" className="text-[#1769E2] font-medium hover:underline">careers@ulinkindustries.com</a> — đội tuyển dụng sẽ phản hồi trong vòng 2 ngày làm việc.
            </p>
          </div>
        </div>

        <a
          href="mailto:careers@ulinkindustries.com"
          className="w-full sm:w-auto inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#1769E2] hover:bg-[#1257BD] px-5 py-2.5 text-white font-semibold text-xs lg:text-[14px] shadow-xs transition-all hover:scale-[1.02] active:scale-95"
        >
          <span>Gửi email thắc mắc</span>
          <ArrowRight className="h-4 w-4 stroke-[2.25]" />
        </a>
      </div>
    </section>
  );
}
