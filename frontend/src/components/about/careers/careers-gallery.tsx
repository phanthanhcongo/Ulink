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
    <section className="py-12 lg:py-16">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-10">
        <span className="text-[13px] sm:text-[14px] lg:text-[16px] font-bold uppercase tracking-wider text-blue-600">
          Không gian làm việc
        </span>
        <h2 className="text-[30px] sm:text-[38px] md:text-[44px] lg:text-[50px] xl:text-[52px] font-extrabold tracking-tight text-slate-900 mt-1">
          Môi trường làm việc
        </h2>
        <p className="mt-2 text-[13px] sm:text-[14px] text-slate-500 max-w-xl">
          Môi trường được thiết kế để truyền cảm hứng sáng tạo và kết nối con người
        </p>
      </div>

      {/* Row 1: 3 columns (aspect-square) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {row1Photos.map((p, idx) => (
          <div
            key={idx}
            className="relative aspect-square w-full overflow-hidden rounded-[3px] shadow-xs border border-slate-100 group"
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-4">
              <span className="text-[12px] sm:text-[13px] font-semibold text-white">{p.alt}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Row 2: 4 columns (aspect-[3/4]) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
        {row2Photos.map((p, idx) => (
          <div
            key={idx}
            className="relative aspect-[3/4] w-full overflow-hidden rounded-[3px] shadow-xs border border-slate-100 group"
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-4">
              <span className="text-[12px] sm:text-[13px] font-semibold text-white">{p.alt}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

