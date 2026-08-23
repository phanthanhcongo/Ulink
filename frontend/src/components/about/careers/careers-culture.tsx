import { LayoutGrid, Cpu, Users, Leaf, Briefcase, Scale } from 'lucide-react';

const values = [
  {
    number: '01',
    icon: LayoutGrid,
    title: 'Chất lượng là nền tảng',
    desc: 'Cam kết vượt chuẩn: Chúng tôi đặt chất lượng sản phẩm và dịch vụ lên hàng đầu, đảm bảo mỗi giải pháp đều đạt tiêu chuẩn ISO và yêu cầu khách hàng.'
  },
  {
    number: '02',
    icon: Cpu,
    title: 'Đổi mới công nghệ',
    desc: 'Tiên phong dẫn đầu: Chúng tôi không ngừng nghiên cứu và ứng dụng công nghệ mới để tạo ra những giải pháp kết nối vượt trội.'
  },
  {
    number: '03',
    icon: Users,
    title: 'Khách hàng là đối tác',
    desc: 'Đồng hành lâu dài: Chúng tôi xây dựng mối quan hệ đối tác bền vững, lắng nghe và đáp ứng nhu cầu thực tiễn của khách hàng.'
  },
  {
    number: '04',
    icon: Leaf,
    title: 'Phát triển bền vững',
    desc: 'Trách nhiệm với tương lai: Chúng tôi cam kết phát triển hài hòa giữa tăng trưởng kinh doanh và bảo vệ môi trường.'
  },
  {
    number: '05',
    icon: Briefcase,
    title: 'Đoàn kết và hợp tác',
    desc: 'Sức mạnh tập thể: Chúng tôi phát huy tinh thần đồng đội, kết nối mọi nguồn lực để cùng đạt mục tiêu chung.'
  },
  {
    number: '06',
    icon: Scale,
    title: 'Chính trực và minh bạch',
    desc: 'Nền tảng niềm tin: Chúng tôi hành động trung thực, minh bạch trong mọi giao dịch và cam kết với các bên liên quan.'
  }
];

export function CareersCulture() {
  return (
    <section className="py-12 lg:py-16">
      {/* Header section with grid/flex alignment */}
      <div className="flex flex-col gap-2 mb-10">
        <span className="text-[13px] sm:text-[14px] lg:text-[16px] font-bold uppercase tracking-wider text-blue-600">
          • VĂN HÓA & GIÁ TRỊ CỐT LÕI
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          <h2 className="text-[30px] sm:text-[38px] md:text-[44px] lg:text-[50px] xl:text-[52px] font-extrabold tracking-tight text-slate-900 leading-tight">
            Sáu giá trị<br />cốt lõi của chúng tôi.
          </h2>
          <p className="text-[15px] sm:text-[16px] leading-relaxed text-slate-500 max-w-lg">
            Các giá trị ULink Industries cam kết thực hiện trong mọi hành động để hướng đến thành
            công vượt trội, bao gồm:
          </p>
        </div>
      </div>

      {/* Grid container with 1px border lines */}
      <div className="border border-slate-200 bg-slate-200 gap-[1px] grid grid-cols-1 md:grid-cols-3 rounded-[3px] overflow-hidden shadow-xs">
        {values.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="group flex flex-col bg-white p-8 sm:p-10 transition-all duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)] hover:bg-white"
            >
              <div className="text-blue-600 mb-6 transition-colors duration-200 group-hover:text-[#1769E2]">
                <Icon className="h-8 w-8" />
              </div>
              <span className="text-[13px] sm:text-[14px] lg:text-[16px] font-bold uppercase tracking-wider text-slate-400">
                {item.number}
              </span>
              <h3 className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] font-bold text-slate-800 mt-2 transition-colors duration-200 group-hover:text-[#1769E2]">
                {item.title}
              </h3>
              <p className="mt-3 text-[13px] sm:text-[14px] leading-relaxed text-slate-500">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

