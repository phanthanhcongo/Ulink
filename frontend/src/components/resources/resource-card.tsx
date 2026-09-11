import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { ResourceItem } from './types';
import { getResourceHref } from './resource-utils';

interface ResourceCardProps {
  resource: ResourceItem;
  locale: 'vi' | 'en' | 'ja';
}

const L_CARD = {
  readMore: {
    vi: 'Đọc thêm',
    en: 'Read more',
    ja: '続きを読む'
  }
};

const getBadgeColorClass = (category: string) => {
  switch (category) {
    case 'guide':
      return 'bg-blue-600 text-white';
    case 'standard':
      return 'bg-emerald-600 text-white';
    case 'case-study':
      return 'bg-purple-600 text-white';
    case 'news':
      return 'bg-rose-600 text-white';
    case 'event':
      return 'bg-slate-800 text-white';
    default:
      return 'bg-slate-600 text-white';
  }
};

export function ResourceCard({ resource, locale }: ResourceCardProps) {
  return (
    <Link
      href={getResourceHref(resource)}
      className="ui-card-hover flex flex-col bg-white border border-slate-100 rounded-[6px] overflow-hidden shadow-[0_4px_16px_rgba(10,26,59,0.09)] cursor-pointer hover:shadow-md transition-all duration-300"
    >
      {/* Top Image area with Badge */}
      <div className="relative aspect-[16/10] w-full bg-slate-50 overflow-hidden">
        <Image
          src={resource.image}
          alt={resource.title[locale]}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
        <div
          className={cn(
            'absolute top-4 left-4 z-10 text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-xs',
            getBadgeColorClass(resource.category)
          )}
        >
          {resource.badge[locale]}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-3">
        <div className="space-y-2">
          {/* Title - Figma: 15px / Bold 700 / #0a1a3b */}
          <h3 className="text-[15px] font-bold text-[#0a1a3b] line-clamp-2 leading-[140%] group-hover:text-blue-600 transition-colors">
            {resource.title[locale]}
          </h3>

          {/* Description - Figma: 13px / Regular 400 / #6b7a99 */}
          <p className="text-[13px] font-normal text-[#6b7a99] leading-[150%] line-clamp-2">
            {resource.description[locale]}
          </p>

          {/* Date - Figma: 12px / Regular 400 / #9ca3af */}
          <div className="text-[12px] font-normal text-[#9ca3af] pt-1">
            {resource.date}
          </div>
        </div>

        {/* Read More button - Figma: 13px / Bold 700 / #1858c1 */}
        <div className="pt-2">
          <div className="inline-flex items-center justify-center px-4 py-2 bg-[#1858c1] hover:bg-[#1257bd] text-white font-bold rounded-[4px] text-[13px] transition-colors shadow-xs">
            {L_CARD.readMore[locale]}
          </div>
        </div>
      </div>
    </Link>
  );
}
