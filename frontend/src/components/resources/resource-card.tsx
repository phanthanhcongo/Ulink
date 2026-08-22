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
      className="flex flex-col bg-white border border-slate-100 rounded-[5px] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer"
    >
      {/* Top Image area with Badge */}
      <div className="relative aspect-[16/10] w-full bg-slate-50 overflow-hidden">
        <Image
          src={resource.image}
          alt={resource.title[locale]}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
        />
        <div
          className={cn(
            'absolute top-4 left-4 z-10 text-[10px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm',
            getBadgeColorClass(resource.category)
          )}
        >
          {resource.badge[locale]}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h3 className="text-base sm:text-lg font-bold text-slate-900 line-clamp-1 leading-snug group-hover:text-blue-600 transition-colors">
            {resource.title[locale]}
          </h3>

          {/* Description */}
          <p className="mt-3 text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-2 font-normal">
            {resource.description[locale]}
          </p>

          {/* Date */}
          <div className="mt-4 text-xs text-slate-400 font-medium">
            {resource.date}
          </div>
        </div>

        {/* Read More visual button */}
        <div className="mt-5 pt-4 border-t border-slate-50">
          <div className="inline-flex items-center justify-center px-5 py-2 bg-blue-600 group-hover:bg-blue-700 text-white font-semibold rounded-lg text-xs sm:text-sm transition-colors shadow-xs">
            {L_CARD.readMore[locale]}
          </div>
        </div>
      </div>
    </Link>
  );
}
