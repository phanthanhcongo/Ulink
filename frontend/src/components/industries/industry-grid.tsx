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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {industriesList.map((ind, index) => {
        const IconComponent = IconMap[ind.icon] || Cpu;
        return (
          <div
            key={index}
            className="group bg-white rounded-[5px] border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
          >
            {/* Top Image */}
            <Link
              href={`/industries/${ind.slug}`}
              className="relative aspect-[16/10] w-full bg-slate-50 overflow-hidden block"
            >
              <Image
                src={ind.image}
                alt={ind.name}
                fill
                className="object-cover transition-transform group-hover:scale-105 duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </Link>

            {/* Card Body */}
            <div className="p-6 flex flex-col flex-1">
              {/* Icon & Title */}
              <Link
                href={`/industries/${ind.slug}`}
                className="flex items-center gap-2.5 mb-4 group/title"
              >
                <IconComponent className="h-5.5 w-5.5 text-blue-600 shrink-0" />
                <h3 className="text-base sm:text-lg font-bold text-primary group-hover/title:text-blue-600 leading-tight transition-colors">
                  {ind.name}
                </h3>
              </Link>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed flex-1 font-medium">
                {ind.description}
              </p>

              {/* Bullet Points */}
              <ul className="space-y-2.5 mb-6">
                {ind.bullets.map((bullet, bIdx) => (
                  <li
                    key={bIdx}
                    className="flex items-start gap-2 text-[11px] sm:text-xs text-slate-600 font-medium leading-normal"
                  >
                    <Check className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* View Details Link */}
              <div className="pt-4 border-t border-slate-100 mt-auto">
                <Link
                  href={`/industries/${ind.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  {viewDetailsLabel}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
