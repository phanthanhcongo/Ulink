import Image from 'next/image';
import Link from 'next/link';
import { Leaf } from 'lucide-react';

export function AboutSustainability() {
  return (
    <section className="py-6 lg:py-8 xl:py-10 bg-white">
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-12">
        {/* Left Column: Image */}
        <div className="lg:col-span-6">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[5px] shadow-lg border border-slate-100">
            <Image
              src="/images/about/gallery/sustainability-solar-warehouse.png"
              alt="Phát triển bền vững Hub Hà Nam"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Right Column: Content */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-emerald-600">
            <Leaf className="h-4 w-4 shrink-0" />
            <span className="text-sm font-bold">Phát triển bền vững</span>
          </div>

          <h2 className="text-[24px] sm:text-[32px] font-extrabold tracking-tight text-slate-900 leading-tight">
            Kiến tạo tương lai xanh
          </h2>

          <p className="text-[13px] sm:text-[14px] leading-relaxed text-slate-500 max-w-xl">
            Chúng tôi tự hào áp dụng các giải pháp giảm thiểu khí thải carbon, sử dụng năng lượng
            tái tạo và quản lý thông minh tài nguyên để bảo vệ môi trường sống bền vững cho các thế
            hệ tương lai.
          </p>

          <div className="mt-2">
            <Link
              href="/about/sustainability"
              className="inline-flex items-center gap-1 text-[13px] sm:text-[14px] font-bold text-emerald-600 hover:text-emerald-500 transition-colors"
            >
              Tìm hiểu thêm &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
