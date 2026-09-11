import { ShieldCheck, Leaf, ClipboardCheck } from 'lucide-react';
import { AboutSectionHeader } from './about-section-header';

const standards = [
  {
    icon: ShieldCheck,
    title: 'Hệ thống quản lý chất lượng',
    tag: 'ISO 9001:2015',
    desc: 'Đảm bảo chất lượng đồng đều trong mọi khâu dịch vụ và sản xuất.',
    color: 'text-[#1769e2] bg-[#1769e2]/10',
    tagColor: 'text-[#1769e2]'
  },
  {
    icon: Leaf,
    title: 'Hệ thống quản lý môi trường',
    tag: 'ISO 14001:2015',
    desc: 'Cam kết tối ưu năng lượng và bảo vệ môi trường sinh thái.',
    color: 'text-[#10b981] bg-[#10b981]/10',
    tagColor: 'text-[#10b981]'
  },
  {
    icon: ClipboardCheck,
    title: 'Hệ thống quản lý an toàn & sức khỏe',
    tag: 'ISO 45001:2018',
    desc: 'Đảm bảo an toàn tuyệt đối cho người lao động tại nơi làm việc.',
    color: 'text-[#ef4444] bg-[#ef4444]/10',
    tagColor: 'text-[#ef4444]'
  }
];

export function AboutStandards() {
  return (
    <section className="w-full bg-[#f5f8fc] border-y border-slate-200/60 py-10 lg:py-16 my-6">
      <div className="page-container">
        <AboutSectionHeader
          eyebrow="Đạt chuẩn chất lượng"
          title="Vận hành theo tiêu chuẩn quốc tế"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {standards.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group flex flex-col rounded-[6px] bg-white p-6 shadow-sm border border-slate-200/80 gap-4 transition-all duration-300 hover:shadow-md"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-[8px] ${item.color}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex flex-col gap-2">
                  <span className={`text-base sm:text-lg lg:text-[20px] lg:leading-[28px] font-semibold ${item.tagColor}`}>
                    {item.tag}
                  </span>
                  <h3 className="text-base sm:text-lg lg:text-[20px] lg:leading-[28px] font-semibold text-[#162233]">
                    {item.title}
                  </h3>
                  <p className="text-sm lg:text-[16px] lg:leading-[24px] font-normal text-[#617084]">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
