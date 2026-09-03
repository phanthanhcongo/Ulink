'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  Truck,
  Activity,
  ShieldCheck,
  Thermometer,
  Layers,
  Settings,
  Package
} from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SlideItem {
  eyebrow: string;
  title: string;
  feat1: string;
  feat2: string;
  image: string;
  alt: string;
}

interface SolutionCarouselProps {
  slides: SlideItem[];
  labels: {
    rfqButton: string;
    learnMore: string;
  };
}

export default function SolutionCarousel({ slides, labels }: SolutionCarouselProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = slides.length;

  // Function to handle slide change with fade effect
  const changeSlide = (index: number) => {
    if (index === activeSlide || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveSlide(index);
      setIsTransitioning(false);
    }, 300); // match transition duration
  };

  const nextSlide = () => {
    changeSlide((activeSlide + 1) % totalSlides);
  };

  // Setup Autoplay
  const startAutoplay = () => {
    stopAutoplay();
    autoplayRef.current = setInterval(() => {
      nextSlide();
    }, 5000); // 5 seconds
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [activeSlide, isTransitioning]);

  const currentSlide = slides[activeSlide];

  // Helper to render slide-specific icons
  const getFeaturesIcons = (index: number) => {
    switch (index) {
      case 0: // Pallet Wrap
        return {
          icon1: (
            <Image
              src="/images/home/section2/icon-activity.svg"
              alt="Activity Icon"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
          ),
          icon2: (
            <Image
              src="/images/home/section2/icon-car.svg"
              alt="Delivery Car Icon"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
          )
        };
      case 1: // Industrial Gloves
        return {
          icon1: <ShieldCheck className="h-7 w-7 text-brand shrink-0" />,
          icon2: <Truck className="h-7 w-7 text-brand shrink-0" />
        };
      case 2: // Aluminum Tape
        return {
          icon1: <Thermometer className="h-7 w-7 text-brand shrink-0" />,
          icon2: <Truck className="h-7 w-7 text-brand shrink-0" />
        };
      case 3: // Cleanroom Wiper
        return {
          icon1: <Layers className="h-7 w-7 text-brand shrink-0" />,
          icon2: <Package className="h-7 w-7 text-brand shrink-0" />
        };
      case 4: // PE Shrink Film
      default:
        return {
          icon1: <Settings className="h-7 w-7 text-brand shrink-0" />,
          icon2: <ShieldCheck className="h-7 w-7 text-brand shrink-0" />
        };
    }
  };

  const { icon1, icon2 } = getFeaturesIcons(activeSlide);

  return (
    <section
      className="w-full bg-white py-14 border-t border-slate-100"
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-16">
        {/* Carousel Container */}
        <div className="rounded-[3px] border border-slate-200/90 bg-white p-6 sm:p-10 lg:py-[60px] lg:px-[80px] shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-[80px] items-center">
            {/* Left Column: Text & Features */}
            <div
              className={`transition-all duration-300 ${isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}
            >
              {/* Main Headline (28px) */}
              <h2 className="text-[24px] sm:text-[28px] font-semibold text-brand tracking-[-0.3px] uppercase block mb-2">
                {currentSlide.eyebrow}
              </h2>

              {/* Secondary Subtitle / Description (28px) */}
              <p className="text-[24px] sm:text-[28px] font-semibold text-[#212529] leading-[34px] sm:leading-[38px] tracking-[-0.3px] mb-8 lg:mb-[64px] max-w-[580px]">
                {currentSlide.title}
              </p>

              {/* Features Grid (Stacked: Icon on Top of Text) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8 lg:mb-[64px]">
                {/* Feature 1 */}
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-4">
                  <div className="shrink-0 text-brand flex items-center justify-center w-full sm:w-auto">
                    {icon1}
                  </div>
                  <p className="text-[14px] sm:text-[15px] font-normal leading-[22px] text-[#495057]">{currentSlide.feat1}</p>
                </div>

                {/* Feature 2 */}
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-4">
                  <div className="shrink-0 text-brand flex items-center justify-center w-full sm:w-auto">
                    {icon2}
                  </div>
                  <p className="text-[14px] sm:text-[15px] font-normal leading-[22px] text-[#495057]">{currentSlide.feat2}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <Link
                  href="/quick-order"
                  className={cn(
                    buttonVariants({ variant: 'primary', size: 'md' }),
                    'w-full sm:w-auto px-7 py-3 rounded-[3px] bg-brand text-white font-medium text-[15px] sm:text-[16px] flex items-center justify-center gap-2.5 shadow-sm hover:bg-brand/90 text-center'
                  )}
                >
                  {labels.rfqButton}
                  <Image
                    src="/images/home/section2/icon-arrow-right.svg"
                    alt="Arrow Icon"
                    width={20}
                    height={20}
                    className="h-5 w-5 object-contain brightness-0 invert"
                  />
                </Link>
                <Link
                  href="/solutions"
                  className={cn(
                    buttonVariants({ variant: 'secondary', size: 'md' }),
                    'w-full sm:w-auto px-7 py-3 rounded-[3px] bg-white border border-brand text-brand font-medium text-[15px] sm:text-[16px] flex items-center justify-center gap-2.5 hover:bg-blue-50 text-center'
                  )}
                >
                  {labels.learnMore}
                </Link>
              </div>
            </div>

            {/* Right Column: Visual Image */}
            <div className="flex flex-col items-center w-full">
              <div
                className={`relative w-full aspect-[4/3] rounded-[3px] overflow-hidden border border-slate-200/80 bg-slate-50 shadow-md transition-all duration-300 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={currentSlide.image}
                  alt={currentSlide.alt}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Pagination Dots (Centered on its own row below the card container) */}
        <div className="flex justify-center items-center gap-3 mt-6 sm:mt-8">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => changeSlide(i)}
              className={`h-5 w-5 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${activeSlide === i
                ? 'border-brand bg-white shadow-sm scale-110'
                : 'border-slate-300 hover:border-brand/60 bg-white'
                }`}
              aria-label={`Slide ${i + 1}`}
            >
              <span
                className={`rounded-full transition-all duration-300 ${activeSlide === i
                  ? 'h-2 w-2 bg-brand'
                  : 'h-2 w-2 border border-slate-300 bg-transparent'
                  }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

