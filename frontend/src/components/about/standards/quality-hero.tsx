import Image from 'next/image';

export function QualityHero() {
  return (
    <section className="py-4 sm:py-6 lg:py-8">
      <div className="flex flex-col gap-2 sm:gap-3 lg:gap-4 max-w-3xl mb-4 sm:mb-6 lg:mb-8 px-3 sm:px-4">
        <span className="inline-flex w-fit items-center rounded-full bg-blue-50 px-2.5 sm:px-3 lg:px-3.5 py-0.5 sm:py-1 text-caption-responsive sm:text-body-regular font-bold uppercase tracking-wider text-blue-700 ring-1 ring-inset ring-blue-700/10">
          CHẤT LƯỢNG & TIÊU CHUẨN
        </span>
        <h1 className="text-section-title sm:text-hero-title font-bold tracking-tight text-slate-900 leading-tight">
          Chất lượng là cam kết. Tiêu chuẩn là nền tảng.
        </h1>
        <p className="text-body-regular sm:text-body-large font-medium leading-relaxed text-slate-600 text-sm sm:text-base">
          Tại ULink B2B Platform, chất lượng sản phẩm và vật tư kỹ thuật không chỉ là mục tiêu kinh
          doanh, mà là lời cam kết sinh tử với hiệu quả vận hành của Khách hàng. Chúng tôi thiết lập
          hệ thống kiểm soát chất lượng đạt chuẩn quốc tế ISO ngay từ khâu lưu kho, kiểm định đến
          khi giao tới dây chuyền sản xuất.
        </p>
      </div>

      <div className="relative aspect-[21/9] w-full overflow-hidden rounded-[3px] shadow-xl ring-1 ring-slate-900/10 mx-3 sm:mx-4">
        <Image
          src="/images/about/kho.png"
          alt="Trung tâm kiểm định chất lượng vật tư ULink"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute bottom-2 sm:bottom-3 lg:bottom-4 right-2 sm:right-3 lg:right-4 flex h-8 sm:h-9 lg:h-10 w-8 sm:w-9 lg:w-10 items-center justify-center rounded-[3px] bg-white/90 p-1 sm:p-1.5 lg:p-2 shadow-md backdrop-blur">
          <span className="text-caption-responsive font-bold text-blue-600 text-xs sm:text-sm">ULINK</span>
        </div>
      </div>
    </section>
  );
}
