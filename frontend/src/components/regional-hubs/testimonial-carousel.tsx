'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, User } from 'lucide-react';
import Image from 'next/image';

interface TestimonialItem {
  id: number;
  company: string;
  logo: React.ReactNode;
  quote: string;
  name: string;
  role: string;
}

interface TestimonialCarouselProps {
  labels: {
    eyebrow: string;
    title: string;
    subtitle: string;
    company1: string;
    quote1: string;
    name1: string;
    role1: string;
    company2: string;
    quote2: string;
    name2: string;
    role2: string;
    company3: string;
    quote3: string;
    name3: string;
    role3: string;
    company4: string;
    quote4: string;
    name4: string;
    role4: string;
  };
}

export default function TestimonialCarousel({ labels }: TestimonialCarouselProps) {
  const testimonials: TestimonialItem[] = [
    {
      id: 1,
      company: labels.company1,
      logo: (
        <div className="flex items-center gap-2">
          <Image
            src="/images/regional_hubs/Group 46.png"
            alt={labels.company1}
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
          />
          <span className="text-[18px] font-extrabold text-[#4A5568] tracking-tight">
            {labels.company1}
          </span>
        </div>
      ),
      quote: labels.quote1,
      name: labels.name1,
      role: labels.role1
    },
    {
      id: 2,
      company: labels.company2,
      logo: (
        <div className="flex items-center gap-2">
          <Image
            src="/images/regional_hubs/Vector.png"
            alt={labels.company2}
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
          />
          <span className="text-[18px] font-extrabold text-[#4A5568] tracking-tight">
            {labels.company2}
          </span>
        </div>
      ),
      quote: labels.quote2,
      name: labels.name2,
      role: labels.role2
    },
    {
      id: 3,
      company: labels.company3,
      logo: (
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center bg-orange-600 text-white font-extrabold text-[11px] rounded-[3px]">
            HP
          </div>
          <span className="text-[18px] font-extrabold text-[#4A5568] tracking-tight">
            {labels.company3}
          </span>
        </div>
      ),
      quote: labels.quote3,
      name: labels.name3,
      role: labels.role3
    },
    {
      id: 4,
      company: labels.company4,
      logo: (
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center bg-teal-600 text-white font-extrabold text-[11px] rounded-[3px]">
            VA
          </div>
          <span className="text-[18px] font-extrabold text-[#4A5568] tracking-tight">
            {labels.company4}
          </span>
        </div>
      ),
      quote: labels.quote4,
      name: labels.name4,
      role: labels.role4
    }
  ];

  // Extended array for infinite looping
  // [T3, T4, T1, T2, T3, T4, T1, T2]
  const extendedTestimonials = [
    testimonials[2], // T3
    testimonials[3], // T4
    ...testimonials,
    testimonials[0], // T1
    testimonials[1]  // T2
  ];

  const [activeIndex, setActiveIndex] = useState(2); // Starts at real T1 (index 2)
  const [isMobile, setIsMobile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [disableTransition, setDisableTransition] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const dragStart = useRef(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset coordinates instantly after transitioning into clones
  const handleTransitionEnd = () => {
    if (activeIndex >= 6) {
      setDisableTransition(true);
      setActiveIndex(activeIndex - 4); // Loops back to 2 (T1) or 3 (T2)
    } else if (activeIndex <= 1) {
      setDisableTransition(true);
      setActiveIndex(activeIndex + 4); // Loops back to 5 (T4) or 4 (T3)
    }
  };

  // Re-enable CSS transition after coordinates jump
  useEffect(() => {
    if (disableTransition) {
      const timer = setTimeout(() => {
        setDisableTransition(false);
      }, 20);
      return () => clearTimeout(timer);
    }
  }, [disableTransition]);

  // Autoplay every 3s
  useEffect(() => {
    if (isDragging || disableTransition) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, [isDragging, disableTransition]);

  // Real-time Drag & Touch swiping logic
  const handleDragStart = (clientX: number) => {
    if (disableTransition) return;
    setIsDragging(true);
    dragStart.current = clientX;
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const diff = clientX - dragStart.current;
    setDragOffset(diff);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = 75; // px threshold
    if (sliderRef.current) {
      const width = sliderRef.current.clientWidth;
      const itemWidth = isMobile ? width : (width / 2);
      const dragSlides = Math.round(dragOffset / itemWidth);

      if (dragSlides !== 0) {
        setActiveIndex((prev) => prev - dragSlides);
      } else if (dragOffset < -threshold) {
        setActiveIndex((prev) => prev + 1);
      } else if (dragOffset > threshold) {
        setActiveIndex((prev) => prev - 1);
      }
    }

    setDragOffset(0);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    handleDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
      handleDragMove(e.clientX);
    }
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  const handleMouseLeave = () => {
    if (isDragging) handleDragEnd();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  const nextSlide = () => {
    if (disableTransition) return;
    setActiveIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (disableTransition) return;
    setActiveIndex((prev) => prev - 1);
  };

  const goToSlide = (index: number) => {
    if (disableTransition) return;
    setActiveIndex(index + 2);
  };

  const activeDotIndex = (activeIndex - 2 + testimonials.length) % testimonials.length;
  const sliderRef = useRef<HTMLDivElement | null>(null);

  return (
    <section className="w-full bg-[#F4F6F9] py-16 sm:py-20 border-t border-slate-200/60 overflow-hidden">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-16">
        {/* === Header Section === */}
        <div className="text-center mb-12">
          <span className="text-[13px] sm:text-[14px] lg:text-[16px] font-bold text-brand tracking-wider uppercase block">
            {labels.eyebrow}
          </span>
          <h2 className="mt-3 text-[22px] sm:text-[24px] md:text-[26px] lg:text-[28px] xl:text-[30px] font-extrabold text-[#0B192C] leading-tight">
            {labels.title}
          </h2>
          <p className="mt-1 text-[22px] sm:text-[24px] md:text-[26px] lg:text-[28px] xl:text-[30px] font-extrabold text-[#0B192C] leading-tight">
            {labels.subtitle}
          </p>
        </div>

        {/* === Carousel Container === */}
        <div className="relative flex items-center justify-center">
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute left-0 lg:-left-6 z-20 hidden md:flex h-10 w-10 items-center justify-center rounded-full bg-white/80 hover:bg-white text-slate-600 transition-colors shadow-sm border border-slate-100 focus:outline-none"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6 stroke-[2.5]" />
          </button>

          {/* Slider Content Wrapper */}
          <div
            ref={sliderRef}
            className="w-full overflow-hidden max-w-[1100px] px-6 py-6 -my-6 select-none cursor-grab active:cursor-grabbing"
          >
            <div
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onTransitionEnd={handleTransitionEnd}
              className={`flex -mx-4 ${isDragging || disableTransition ? 'transition-none' : 'transition-transform duration-500'}`}
              style={{
                transform: `translateX(calc(-${activeIndex * (isMobile ? 100 : 50)}% + ${dragOffset}px))`,
                transitionTimingFunction: isDragging || disableTransition ? 'none' : 'cubic-bezier(0.25, 1, 0.5, 1)'
              }}
            >
              {extendedTestimonials.map((item, idx) => (
                <div
                  key={`${item.id}-${idx}`}
                  className="w-full md:w-1/2 shrink-0 px-4 flex flex-col"
                >
                  <div className="group bg-white rounded-[3px] border border-slate-100 shadow-sm p-5 sm:p-8 flex flex-col justify-between items-center text-center min-h-[360px] md:min-h-[380px] h-full transition-all duration-300 hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)] hover:-translate-y-1 hover:scale-[1.02]">
                    {/* Company Logo & Name */}
                    <div className="mb-4 flex justify-center h-8 shrink-0">{item.logo}</div>

                    {/* Testimonial Quote */}
                    <p className="text-[13px] sm:text-[14px] leading-relaxed text-slate-600 font-medium italic px-2 sm:px-4 flex-1 flex items-center justify-center overflow-hidden transition-colors duration-200 group-hover:text-slate-800">
                      {"\""}{item.quote}{"\""}
                    </p>

                    {/* User Profile */}
                    <div className="mt-6 flex flex-col items-center shrink-0">
                      <div className="h-10 w-10 rounded-full flex items-center justify-center bg-[#F1F5F9] text-slate-400 mb-2 border border-slate-100 transition-colors duration-200 group-hover:bg-brand/10 group-hover:text-brand group-hover:border-brand/20">
                        <User className="h-5.5 w-5.5 stroke-[1.5]" />
                      </div>
                      <span className="text-[15px] sm:text-[16px] lg:text-[18px] font-semibold text-[#0B192C] leading-none transition-colors duration-200 group-hover:text-brand">{item.name}</span>
                      <span className="text-[12px] sm:text-[13px] text-slate-500 font-medium mt-1 leading-none">{item.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute right-0 lg:-right-6 z-20 hidden md:flex h-10 w-10 items-center justify-center rounded-full bg-white/80 hover:bg-white text-slate-600 transition-colors shadow-sm border border-slate-100 focus:outline-none"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6 stroke-[2.5]" />
          </button>
        </div>

        {/* Paging Dots (Mobile Only) */}
        <div className="flex md:hidden justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${activeDotIndex === index ? 'bg-brand w-4' : 'bg-slate-300'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
