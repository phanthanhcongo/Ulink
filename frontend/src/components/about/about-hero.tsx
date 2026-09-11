import Image from 'next/image';

export function AboutHero() {
  return (
    <section className="py-6 lg:py-8 xl:py-10">
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-12">
        <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6 lg:col-span-7">
          <span className="text-base lg:text-lg xl:text-[20px] xl:leading-[28px] font-semibold text-[#1769e2]">
            Trung tâm phân phối Hà Nam
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[48px] xl:leading-[56px] font-bold tracking-[-1px] text-[#162233]">
            Hub Hà Nam - Cung ứng vật tư cho Doanh nghiệp sản xuất
          </h1>
          <p className="text-sm sm:text-base xl:text-[18px] xl:leading-[28px] font-normal text-[#617084]">
            Trung tâm phân phối Hà Nam của ULink Industries được xây dựng với định hướng trở thành
            nơi trung tâm phân phối hiện đại, ứng dụng công nghệ tiên tiến và vận hành theo các tiêu
            chuẩn quốc tế mới nhất.
          </p>
          <p className="text-sm sm:text-base xl:text-[18px] xl:leading-[28px] font-normal text-[#617084]">
            Chúng tôi cam kết mang đến dịch vụ chất lượng cao, đáp ứng linh hoạt mọi yêu cầu của
            khách hàng trong và ngoài nước.
          </p>
        </div>
        <div className="lg:col-span-5">
          <div className="ui-card-hover relative aspect-[4/3] w-full overflow-hidden rounded-[3px] shadow-xl ring-1 ring-slate-900/10">
            <Image
              src="/images/about/gallery/image.png"
              alt="Hub Hà Nam - Trung tâm vật tư ULink"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
