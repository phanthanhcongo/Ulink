import React from 'react';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { Armchair, Warehouse, Pill, Utensils, Wrench, Cpu, Check, ArrowRight } from 'lucide-react';

const IconMap: Record<string, React.ComponentType<any>> = {
  Armchair: Armchair,
  Warehouse: Warehouse,
  Pill: Pill,
  Utensils: Utensils,
  Wrench: Wrench,
  Cpu: Cpu
};

// Map slug → image (use Figma images if available, fallback to existing)
const ImageMap: Record<string, string> = {
  furniture: '/images/industries/furniture.png',
  logistics: '/images/industries/logistics.png',
  pharmaceutical: '/images/industries/pharmaceutical.png',
  food: '/images/industries/food.png',
  manufacturing: '/images/industries/manufacturing.png',
  electronics: '/images/industries/electronics.png'
};

export interface IndustryGridItem {
  slug: string;
  name: string;
  icon: string;
  image: string;
  description: string;
  bullets: string[];
}

interface IndustryGridProps {
  industriesList: IndustryGridItem[];
  viewDetailsLabel: string;
}

export default function IndustryGrid({ industriesList, viewDetailsLabel }: IndustryGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {industriesList.map((ind, index) => {
        const IconComponent = IconMap[ind.icon] || Cpu;
        const figmaImage = ImageMap[ind.slug] || ind.image;
        return (
          <div
            key={index}
            className="group bg-white rounded-[3px] border border-[#DDE1E6] overflow-hidden shadow-[0_4px_12px_0_rgba(0,0,0,0.05)] flex flex-col hover:shadow-[0_8px_24px_0_rgba(0,0,0,0.1)] transition-shadow duration-300"
          >
            {/* Photo - Figma: height 200px, object-fit cover */}
            <Link
              href={`/industries/${ind.slug}`}
              className="relative h-[200px] w-full overflow-hidden block shrink-0"
            >
              <Image
                src={figmaImage}
                alt={ind.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </Link>

            {/* Content - Figma: padding 24px, gap 10px */}
            <div className="p-6 flex flex-col flex-1">
              {/* Header Group - gap 12px */}
              <div className="flex flex-col gap-3">
                {/* Title Row - icon 24x24 + H4 20px SemiBold */}
                <Link
                  href={`/industries/${ind.slug}`}
                  className="flex items-center gap-3 group/title"
                >
                  <IconComponent className="h-6 w-6 text-[#0B153D] shrink-0" strokeWidth={1.5} />
                  <h3 className="text-[20px] leading-[28px] font-semibold text-[#0B153D] group-hover/title:text-blue-600 transition-colors">
                    {ind.name}
                  </h3>
                </Link>

                {/* Description - Body/M 16px, color #162233 */}
                <p className="text-[16px] leading-[24px] font-normal text-[#162233]">
                  {ind.description}
                </p>
              </div>

              {/* Checklist - separator line + items */}
              <div className="flex flex-col gap-2.5 mt-3 flex-1">
                {/* Separator line - Figma: #ECEFF2 */}
                <div className="w-full h-px bg-[#ECEFF2]" />

                {/* Checklist items - Body/S 14px, color #495057 */}
                {ind.bullets.map((bullet, bIdx) => (
                  <div
                    key={bIdx}
                    className="flex items-center gap-2"
                  >
                    <Check className="h-4 w-4 text-[#495057] shrink-0" strokeWidth={2} />
                    <span className="text-[14px] leading-[20px] font-normal text-[#495057]">
                      {bullet}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Button - Figma: "Xem chi tiết", 14px SemiBold, #1257C0 */}
              <div className="mt-auto pt-4">
                <Link
                  href={`/industries/${ind.slug}`}
                  className="group/link inline-flex items-center gap-2 rounded-[3px] bg-white px-4 py-2.5 text-[14px] leading-[20px] font-semibold text-[#1257C0] hover:text-[#0E4A9E] transition-colors tracking-[0.007em]"
                >
                  {viewDetailsLabel}
                  <ArrowRight className="h-2.5 w-2.5 transition-transform duration-200 group-hover/link:translate-x-0.5" strokeWidth={2.5} />
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
