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
    <section className="py-4 sm:py-6 lg:py-8">
      {/* Header section with grid/flex alignment */}
      <div className="flex flex-col gap-2 mb-6 sm:mb-8 lg:mb-10">
        <span className="text-[#1769E2] font-semibold text-base lg:text-[20px] leading-tight lg:leading-[28px] uppercase tracking-wider">
          • VĂN HÓA & GIÁ TRỊ CỐT LÕI
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          <h2 className="text-[#0E1116] font-semibold text-2xl lg:text-[28px] leading-snug lg:leading-[36px] tracking-[-0.0107em]">
            Sáu giá trị<br />cốt lõi của chúng tôi.
          </h2>
          <p className="text-[#3B4148] font-normal text-base lg:text-[18px] leading-[28px] max-w-lg">
            Các giá trị ULink Industries cam kết thực hiện trong mọi hành động để hướng đến thành
            công vượt trội, bao gồm:
          </p>
        </div>
      </div>

      {/* Grid container with 1px border lines */}
      <div className="border border-slate-200 bg-slate-200 gap-[1px] grid grid-cols-1 md:grid-cols-3 rounded-[2px] shadow-xs">
        {values.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="group relative z-0 hover:z-10 flex flex-col bg-white p-4 sm:p-6 lg:p-8 rounded-[2px] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_-4px_rgba(23,105,226,0.25)] hover:ring-1 hover:ring-[#1769E2]"
            >
              <div className="text-[#1769E2] mb-6 transition-colors duration-200 group-hover:text-[#1769E2]">
                <Icon className="h-8 w-8" />
              </div>
              <span className="text-[#6B7280] font-semibold text-sm lg:text-[14px] leading-[20px] uppercase tracking-wider">
                {item.number}
              </span>
              <h3 className="text-[#212529] font-semibold text-lg lg:text-[20px] leading-[28px] mt-2 transition-colors duration-200 group-hover:text-[#1769E2]">
                {item.title}
              </h3>
              <p className="mt-3 text-[#495057] font-normal text-base lg:text-[16px] leading-[24px]">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

