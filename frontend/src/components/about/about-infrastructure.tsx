import Image from 'next/image';

const items = [
  {
    image: '/images/about/gallery/cleanroom-materials-warehouse.png',
    title: 'Hệ thống kho hiện đại',
    desc: 'Thiết kế tối ưu công năng, đảm bảo an toàn, bảo quản vô trùng cho các lô hàng nhạy cảm.'
  },
  {
    image: '/images/about/gallery/smart-wms-warehouse.png',
    title: 'Quản lý thông minh WMS',
    desc: 'Ứng dụng hệ thống quản lý kho tiên tiến, giám sát vị trí hàng hóa và tồn kho theo thời gian thực.'
  },
  {
    image: '/images/about/gallery/logistics-delivery-truck.png',
    title: 'Mạng lưới linh hoạt',
    desc: 'Kết nối nhanh chóng với đội xe vận chuyển nội bộ, tối ưu lộ trình và tiến độ giao nhận.'
  },
  {
    image: '/images/about/gallery/operation-team.png',
    title: 'Đội ngũ chuyên nghiệp',
    desc: 'Kỹ sư và nhân sự vận hành được đào tạo bài bản, sẵn sàng giải quyết bài toán chuỗi cung ứng phức tạp.'
  }
];

export function AboutInfrastructure() {
  return (
    <section className="py-6 lg:py-8 xl:py-10">
      <div className="flex flex-col items-center text-center mb-8">
        <span className="text-sm font-bold text-blue-600 mb-2">
          Vận hành hiện đại – Thông minh
        </span>
        <h2 className="text-[20px] sm:text-[24px] lg:text-[24px] xl:text-[28px] font-bold tracking-tight text-slate-900">
          Hạ tầng kỹ thuật & Hệ thống tối ưu
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="group flex flex-col overflow-hidden rounded-[5px] bg-white border border-slate-100 shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col p-4 sm:p-5 lg:p-4 xl:p-5">
              <h3 className="text-[14px] sm:text-[15px] lg:text-[15px] xl:text-[16px] font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                {item.title}
              </h3>
              <p className="mt-2 text-[11.5px] sm:text-[12px] lg:text-[12px] xl:text-[13px] leading-relaxed text-slate-600">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
