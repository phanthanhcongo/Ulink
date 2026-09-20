'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Package, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

const VIDEO_EXTENSIONS = /\.(mp4|webm|mov|ogg)$/i;
function isVideoSrc(src: string): boolean {
  return VIDEO_EXTENSIONS.test(src);
}

interface GalleryImage {
  src: string;
  alt: string;
  label?: string;
  type?: 'image' | 'video';
}

interface ProductImageGalleryProps {
  images: GalleryImage[];
  productName: string;
}

export function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // If product has NO images in Database
  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-square rounded-[3px] bg-white border border-slate-200/90 shadow-sm flex flex-col items-center justify-center p-8 text-center">
        <div className="w-20 h-20 rounded-[3px] bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300 mb-4">
          <Package className="h-10 w-10 text-slate-400 stroke-[1.5]" />
        </div>
        <p className="text-body-regular font-bold text-slate-700">Chưa có hình ảnh trong Database</p>
        <p className="mt-1 text-caption-responsive text-slate-400 max-w-xs">
          Sản phẩm này chưa được cập nhật hình ảnh trực tiếp trong cơ sở dữ liệu Directus CMS.
        </p>
      </div>
    );
  }

  const currentImage = images[activeIndex] || images[0];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col gap-4 w-full lg:w-[420px] lg:h-[579px]">
      {/* MAIN SLIDE STAGE */}
      <div className="relative w-full aspect-square lg:w-[420px] lg:h-[471px] lg:aspect-auto rounded-[3px] overflow-hidden bg-[#f8fafc] border border-[#dce0e5] shadow-xs flex items-center justify-center group mx-auto lg:mx-0">
        {/* Main Image / Video Container */}
        <div className="relative w-full h-full lg:w-[388px] lg:h-[435px] rounded-[3px] overflow-hidden">
          {(currentImage.type === 'video' || isVideoSrc(currentImage.src)) ? (
            <video
              key={currentImage.src}
              src={currentImage.src}
              controls
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <Image
              src={currentImage.src}
              alt={currentImage.alt || productName}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 388px"
              priority
            />
          )}
        </div>

        {/* Previous Arrow */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-md border border-slate-200/60 opacity-0 group-hover:opacity-100 hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
            aria-label="Previous Image"
          >
            <ChevronLeft className="h-5 w-5 stroke-[2.5]" />
          </button>
        )}

        {/* Next Arrow */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-md border border-slate-200/60 opacity-0 group-hover:opacity-100 hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
            aria-label="Next Image"
          >
            <ChevronRight className="h-5 w-5 stroke-[2.5]" />
          </button>
        )}

        {/* Slide Counter Badge Top Left */}
        {images.length > 1 && (
          <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-[3px] bg-slate-900/70 text-white text-caption-responsive font-bold backdrop-blur-md shadow-xs">
            {activeIndex + 1} / {images.length}
          </span>
        )}
      </div>

      {/* SLIDE THUMBNAILS CAROUSEL BAR */}
      {images.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-thin">
          {images.map((img, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={cn(
                  'relative w-[72px] h-[72px] rounded-[4px] bg-[#f8fafc] flex items-center justify-center overflow-hidden transition-all shrink-0 cursor-pointer',
                  isActive
                    ? 'border-2 border-[#1769e2]'
                    : 'border border-[#dce0e5] hover:border-slate-400 opacity-70 hover:opacity-100'
                )}
              >
                <div className="relative w-[64px] h-[64px]">
                  {(img.type === 'video' || isVideoSrc(img.src)) ? (
                    <>
                      <video
                        src={img.src}
                        muted
                        playsInline
                        className="w-full h-full object-cover rounded-[2px]"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-[2px]">
                        <Play className="h-5 w-5 text-white fill-white" />
                      </div>
                    </>
                  ) : (
                    <Image
                      src={img.src}
                      alt={img.alt || `Thumbnail ${idx + 1}`}
                      fill
                      className="object-cover rounded-[2px]"
                      sizes="64px"
                    />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
