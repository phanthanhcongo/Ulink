import Link from 'next/link';

interface ProductContactCtaProps {
  locale: string;
}

export default function ProductContactCta({ locale }: ProductContactCtaProps) {
  const isVietnamese = locale === 'vi';

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#17265f] via-[#2747b7] to-[#3159d8] py-10 sm:py-12 lg:py-14">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[58%] bg-[#9bc5ff]/20 [clip-path:polygon(0_0,100%_100%,0_100%)]" />
      <div className="page-container relative z-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <div className="max-w-2xl text-left">
          <span className="text-section-title font-bold uppercase tracking-wide text-blue-200">
            {isVietnamese ? 'LIÊN HỆ' : 'CONTACT'}
          </span>
          <h2 className="mt-2 text-section-title font-bold leading-tight text-white">
            {isVietnamese ? 'Kết nối với ULink Industries' : 'Connect with ULink Industries'}
          </h2>
          <p className="mt-3 text-[18px] leading-relaxed text-blue-100/90">
            {isVietnamese
              ? 'Hãy để chúng tôi đồng hành cùng bạn trên hành trình tối ưu hoá chuỗi cung ứng và vận tải. Đội ngũ chuyên gia ULink luôn sẵn sàng hỗ trợ.'
              : 'Let us support you in optimizing your supply chain and logistics. Our ULink experts are ready to help.'}
          </p>
        </div>

        <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-[2px] border border-white px-6 py-3 text-[20px] font-semibold text-white transition-colors hover:bg-white/10"
          >
            {isVietnamese ? 'Kết nối với Chúng tôi' : 'Connect with Us'}
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-[2px] bg-[#3f70ed] px-6 py-3 text-[20px] font-semibold text-white transition-colors hover:bg-[#5280f2]"
          >
            {isVietnamese ? 'Đặt lịch ngay' : 'Schedule Now'}
          </Link>
        </div>
      </div>
    </section>
  );
}
