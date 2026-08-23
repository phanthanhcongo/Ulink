import { ShieldCheck, Leaf, ClipboardCheck } from 'lucide-react';

const standards = [
  {
    icon: ShieldCheck,
    title: 'Hệ thống quản lý chất lượng',
    tag: 'ISO 9001:2015',
    desc: 'Đảm bảo chất lượng đồng đều trong mọi khâu dịch vụ và sản xuất.',
    color: 'text-blue-600 bg-blue-50/80 border-blue-100',
    tagColor: 'text-blue-600'
  },
  {
    icon: Leaf,
    title: 'Hệ thống quản lý môi trường',
    tag: 'ISO 14001:2015',
    desc: 'Cam kết tối ưu năng lượng và bảo vệ môi trường sinh thái.',
    color: 'text-emerald-600 bg-emerald-50/80 border-emerald-100',
    tagColor: 'text-emerald-600'
  },
  {
    icon: ClipboardCheck,
    title: 'Hệ thống quản lý an toàn & sức khỏe',
    tag: 'ISO 45001:2018',
    desc: 'Đảm bảo an toàn tuyệt đối cho người lao động tại nơi làm việc.',
    color: 'text-rose-600 bg-rose-50/80 border-rose-100',
    tagColor: 'text-rose-600'
  }
];

export function AboutStandards() {
  return (
    <section className="w-full bg-slate-50 border-y border-slate-100 py-10 lg:py-12 my-6">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-16">
        <div className="flex flex-col items-start text-left mb-8">
          <span className="text-sm font-bold text-blue-600 mb-1.5">
            Đạt chuẩn chất lượng
          </span>
          <h2 className="text-[22px] sm:text-[24px] md:text-[26px] lg:text-[28px] xl:text-[30px] font-black tracking-tight text-slate-900 leading-tight">
            Vận hành theo tiêu chuẩn quốc tế
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {standards.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group flex flex-col rounded-[3px] bg-white p-6 shadow-sm border border-slate-100 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)]"
              >
                <div
                  className={`mb-4 flex h-10 w-10 items-center justify-center rounded-[3px] border ${item.color}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-[12px] sm:text-[13px] font-bold ${item.tagColor} mb-1.5">
                  {item.tag}
                </span>
                <h3 className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] font-extrabold text-slate-900 leading-snug mb-2">
                  {item.title}
                </h3>
                <p className="text-[12px] sm:text-[13px] leading-relaxed text-slate-500">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
