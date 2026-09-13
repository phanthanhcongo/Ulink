import Image from 'next/image';

const row1Photos = [
  { src: '/images/Career/career (1).png', alt: 'Không gian làm việc sáng tạo' },
  { src: '/images/Career/career (2).png', alt: 'Thảo luận nhóm cởi mở' },
  { src: '/images/Career/career (3).png', alt: 'Khu vực pantry hiện đại' }
];

const row2Photos = [
  { src: '/images/Career/career (4).png', alt: 'Hội họp chuyên nghiệp' },
  { src: '/images/Career/career (5).png', alt: 'Tập trung nghiên cứu giải pháp' },
  { src: '/images/Career/career (9).png', alt: 'Trao đổi ý tưởng đột phá' },
  { src: '/images/Career/career (10).png', alt: 'Môi trường làm việc năng động' }
];

export function CareersGallery() {
  return (
    <section className="py-4 sm:py-6 lg:py-8">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-6 sm:mb-8 lg:mb-10">
        <span className="text-[#1769E2] font-semibold text-xl lg:text-[28px] leading-tight lg:leading-[36px] uppercase tracking-wider">
          Không gian làm việc
        </span>
        <h2 className="text-[#263A4D] font-bold text-2xl sm:text-3xl lg:text-[38px] leading-tight lg:leading-[46px] tracking-tight mt-1">
          Môi trường làm việc
        </h2>
        <p className="mt-2 text-[#7F878F] font-normal text-base lg:text-[16px] leading-[24px] max-w-3xl">
          Môi trường được thiết kế để truyền cảm hứng sáng tạo và kết nối con người
        </p>
      </div>

      {/* Row 1: 3 columns (aspect-square) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        {row1Photos.map((p, idx) => (
          <div
            key={idx}
            className="group relative aspect-square w-full overflow-hidden rounded-[2px] shadow-xs border border-slate-100 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:ring-1 hover:ring-[#1769E2]/30 cursor-pointer"
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-4">
              <span className="text-caption-responsive font-semibold text-white transition-transform duration-300 translate-y-2 group-hover:translate-y-0">{p.alt}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Row 2: 4 columns (aspect-[3/4]) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mt-4 sm:mt-5 lg:mt-6">
        {row2Photos.map((p, idx) => (
          <div
            key={idx}
            className="group relative aspect-[3/4] w-full overflow-hidden rounded-[2px] shadow-xs border border-slate-100 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:ring-1 hover:ring-[#1769E2]/30 cursor-pointer"
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-4">
              <span className="text-caption-responsive font-semibold text-white transition-transform duration-300 translate-y-2 group-hover:translate-y-0">{p.alt}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

