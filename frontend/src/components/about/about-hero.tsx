import Image from 'next/image';

export function AboutHero() {
  return (
    <section className="py-6 lg:py-8 xl:py-10">
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-12">
        <div className="lg:col-span-6 flex flex-col gap-4">
          <span className="inline-flex w-fit items-center rounded-full bg-blue-50 px-3.5 py-1 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-700/10">
            Trung tâm vật tư Hà Nam
          </span>
          <h1 className="text-[24px] sm:text-[30px] md:text-[34px] lg:text-[34px] xl:text-[40px] 2xl:text-[48px] font-extrabold leading-[1.15] tracking-tight text-slate-900">
            Hub Hà Nam - Cung ứng vật tư cho Doanh nghiệp sản xuất
          </h1>
          <p className="text-[13.5px] sm:text-[14.5px] lg:text-[14.5px] xl:text-[15.5px] 2xl:text-[17px] leading-relaxed text-slate-600">
            Thắt chặt chuỗi cung ứng vật tư công nghiệp với các trung tâm kho bãi tối tân tại các
            vùng công nghiệp trọng điểm.
          </p>
          <p className="text-[13.5px] sm:text-[14.5px] lg:text-[14.5px] xl:text-[15.5px] 2xl:text-[17px] leading-relaxed text-slate-600">
            Cung cấp giải pháp vật tư kỹ thuật tổng thể, tối ưu chi phí và nâng cao hiệu quả vận
            hành cho nhà máy.
          </p>
        </div>
        <div className="lg:col-span-6">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[5px] shadow-xl ring-1 ring-slate-900/10">
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
