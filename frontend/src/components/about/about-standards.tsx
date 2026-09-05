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
      <div className="page-container">
        <div className="flex flex-col items-start text-left mb-8">
          <span className="text-eyebrow font-bold text-blue-600 mb-1.5">
            Đạt chuẩn chất lượng
          </span>
          <h2 className="text-section-title font-black text-slate-900">
            Vận hành theo tiêu chuẩn quốc tế
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {standards.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group flex flex-col rounded-[3px] bg-white p-6 shadow-sm border border-slate-100 card-hover-standard"
              >
                <div
                  className={`mb-4 flex h-10 w-10 items-center justify-center rounded-[3px] border ${item.color}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <span className={`text-caption-responsive font-bold ${item.tagColor} mb-1.5`}>
                  {item.tag}
                </span>
                <h3 className="text-card-title font-extrabold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-body-regular text-slate-500">
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
