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

  // Extended array with 4 full sets (16 cards) for 100% smooth infinite 1-2-3-4-1-2-3-4 looping
  const extendedTestimonials = [
    ...testimonials, // Set 1: idx 0..3 (T1, T2, T3, T4)
    ...testimonials, // Set 2: idx 4..7 (T1, T2, T3, T4) <-- Main active set
    ...testimonials, // Set 3: idx 8..11 (T1, T2, T3, T4)
    ...testimonials  // Set 4: idx 12..15 (T1, T2, T3, T4)
  ];

  const [activeIndex, setActiveIndex] = useState(4); // Starts at Set 2, T1 (index 4)
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

  // Guarantee continuous 1->2->3->4->1->2->3->4 wrap-around after transition finishes
  useEffect(() => {
    if (activeIndex >= 8) {
      // Slid past T4 (idx 7) to T1 (idx 8) -> wait 500ms for slide to finish, then reset to Set 2 T1 (idx 4)
      const timer = setTimeout(() => {
        setDisableTransition(true);
        setActiveIndex(4);
      }, 500); // 500ms matches CSS transition duration 500ms
      return () => clearTimeout(timer);
    } else if (activeIndex <= 0) {
      // Slid left past T1 (idx 4) -> wait 500ms for slide to finish, then reset to Set 2 T1 (idx 4)
      const timer = setTimeout(() => {
        setDisableTransition(true);
        setActiveIndex(4);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [activeIndex]);

  // Re-enable CSS transition safely after DOM repaint
  useEffect(() => {
    if (disableTransition) {
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setDisableTransition(false);
        });
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [disableTransition]);

  // Autoplay with 2.0s static delay between slides (2500ms total)
  useEffect(() => {
    if (isDragging || disableTransition) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => prev + 1);
    }, 4400);
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
    setActiveIndex(index + 4);
  };

  const activeDotIndex = (activeIndex % testimonials.length);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  return (
    <section className="w-full bg-[#F4F6F9] py-16 sm:py-20 border-t border-slate-200/60 overflow-hidden">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-16">
        {/* === Header Section === */}
        <div className="text-center mb-12">
          <span className="text-[20px] sm:text-[24px] lg:text-[28px] font-bold text-brand tracking-[0.5px] uppercase block leading-tight">
            {labels.eyebrow}
          </span>
          <h2 className="mt-3 text-[24px] sm:text-[28px] font-semibold text-[#212529] leading-tight sm:leading-[38px] tracking-[-0.3px]">
            {labels.title}
          </h2>
          <p className="mt-1 text-[24px] sm:text-[28px] font-semibold text-[#212529] leading-tight sm:leading-[38px] tracking-[-0.3px]">
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
              className="flex -mx-4"
              style={{
                transform: `translateX(calc(-${activeIndex * (isMobile ? 100 : 50)}% + ${dragOffset}px))`,
                transition: isDragging || disableTransition ? 'none' : 'transform 500ms cubic-bezier(0.2, 0.8, 0.2, 1)'
              }}
            >
              {extendedTestimonials.map((item, idx) => (
                <div
                  key={`${item.id}-${idx}`}
                  className="w-full md:w-1/2 shrink-0 px-4 flex flex-col"
                >
                  <div className="group bg-white rounded-[2px] border border-[#ced4da] shadow-sm p-6 sm:p-8 flex flex-col justify-between items-center text-center min-h-[350px] md:min-h-[370px] h-full transition-[transform,box-shadow,border-color] duration-150 ease-out hover:shadow-md hover:border-brand hover:-translate-y-1 hover:scale-[1.015] cursor-pointer">
                    {/* Company Logo & Name */}
                    <div className="mb-4 flex justify-center h-8 shrink-0">{item.logo}</div>

                    {/* Testimonial Quote */}
                    <p className="text-[14px] sm:text-[15px] leading-[24px] text-[#495057] font-normal italic px-2 sm:px-4 flex-1 flex items-center justify-center overflow-hidden transition-colors duration-150 group-hover:text-[#212529]">
                      {"\""}{item.quote}{"\""}
                    </p>

                    {/* User Profile */}
                    <div className="mt-6 flex flex-col items-center shrink-0">
                      <div className="h-10 w-10 rounded-full flex items-center justify-center bg-[#f5f8fc] text-[#1769e2] mb-2 transition-colors duration-150 group-hover:bg-brand group-hover:text-white">
                        <User className="h-5.5 w-5.5 stroke-[1.5]" />
                      </div>
                      <span className="text-[16px] sm:text-[18px] font-semibold text-[#212529] leading-tight transition-colors duration-150 group-hover:text-brand">{item.name}</span>
                      <span className="text-[13px] text-[#6c757d] font-normal mt-1 leading-tight">{item.role}</span>
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
