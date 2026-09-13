import { UserCheck, Coins, Clock, Calendar } from 'lucide-react';

const overviewItems = [
  { label: 'Cấp bậc', value: 'Chuyên viên', icon: UserCheck },
  { label: 'Mức lương', value: '15 - 25M VND', icon: Coins },
  { label: 'Hình thức làm việc', value: 'Toàn thời gian', icon: Clock },
  { label: 'Hạn nộp hồ sơ', value: '30/09/2026', icon: Calendar }
];

const processSteps = [
  { num: 1, title: 'Tiếp nhận hồ sơ' },
  { num: 2, title: 'Lựa chọn CV phù hợp' },
  { num: 3, title: 'Phỏng vấn' },
  { num: 4, title: 'Đánh giá' },
  { num: 5, title: 'Gửi Offer' },
  { num: 6, title: 'Onboarding' }
];

export function ApplySidebar() {
  return (
    <div className="flex flex-col gap-6">
      {/* Card 1: Tóm tắt công việc */}
      <div className="rounded-[2px] bg-white p-5 sm:p-6 border border-[#CAD5E2] shadow-xs flex flex-col gap-5">
        <h3 className="text-[#162233] font-bold text-base lg:text-[18px] border-b border-slate-100 pb-3">
          Tóm tắt công việc
        </h3>

        <div className="flex flex-col gap-4">
          {overviewItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center gap-3.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#1769E2] bg-[#EFF8FF] text-[#1769E2]">
                  <Icon className="h-4.5 w-4.5 stroke-[2.25]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[#617084] font-normal text-xs lg:text-[12px]">{item.label}</span>
                  <span className="text-[#162233] font-semibold text-sm lg:text-[14px]">{item.value}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Card 2: Quy trình tuyển dụng */}
      <div className="rounded-[2px] bg-white p-5 sm:p-6 border border-[#CAD5E2] shadow-xs flex flex-col gap-5">
        <h3 className="text-[#162233] font-bold text-base lg:text-[18px] border-b border-slate-100 pb-3">
          Quy trình tuyển dụng
        </h3>

        <div className="flex flex-col gap-3">
          {processSteps.map((step) => (
            <div key={step.num} className="flex items-center gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#3878F5] text-white font-bold text-xs">
                {step.num}
              </div>
              <span className="text-[#162233] font-semibold text-sm lg:text-[14px]">{step.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

