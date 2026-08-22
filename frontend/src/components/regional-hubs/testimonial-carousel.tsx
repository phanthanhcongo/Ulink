'use client';

import React, { useState, useEffect } from 'react';
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
          <div className="flex h-8 w-8 items-center justify-center bg-orange-600 text-white font-extrabold text-[11px] rounded-none">
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
          <div className="flex h-8 w-8 items-center justify-center bg-teal-600 text-white font-extrabold text-[11px] rounded-none">
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
  // Original array indices mapping in extended list:
  // [S3, S4, S1, S2, S3, S4, S1, S2]
  // Index 0: S3 (Clone)
  // Index 1: S4 (Clone)
  // Index 2: S1 (Original Start)
  // Index 3: S2 (Original)
  // Index 4: S3 (Original)
  // Index 5: S4 (Original End)
  // Index 6: S1 (Clone)
  // Index 7: S2 (Clone)
  const extendedTestimonials = [
    testimonials[2], // S3
    testimonials[3], // S4
    ...testimonials,
    testimonials[0], // S1
    testimonials[1]  // S2
  ];

  const [activeIndex, setActiveIndex] = useState(2); // Start at original S1
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isJumping, setIsJumping] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle endless loop resets after sliding animation concludes
  useEffect(() => {
    if (activeIndex === 6) {
      setIsJumping(true);
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setActiveIndex(2); // Reset to real S1
        setTimeout(() => {
          setIsTransitioning(true);
          setIsJumping(false);
        }, 20);
      }, 500);
      return () => clearTimeout(timer);
    }

    if (activeIndex === 1) {
      setIsJumping(true);
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setActiveIndex(5); // Reset to real S4
        setTimeout(() => {
          setIsTransitioning(true);
          setIsJumping(false);
        }, 20);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [activeIndex]);

  const nextSlide = () => {
    if (isJumping) return;
    setActiveIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (isJumping) return;
    setActiveIndex((prev) => prev - 1);
  };

  const activeDotIndex = (activeIndex - 2 + testimonials.length) % testimonials.length;

  return (
    <section className="w-full bg-[#F4F6F9] py-16 sm:py-20 border-t border-slate-200/60 overflow-hidden">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-16">
        {/* === Header Section === */}
        <div className="text-center mb-12">
          <span className="text-[13px] font-bold text-brand tracking-wider uppercase block">
            {labels.eyebrow}
          </span>
          <h2 className="mt-3 text-[22px] sm:text-[26px] font-extrabold text-[#0B192C] leading-tight">
            {labels.title}
          </h2>
          <p className="mt-1 text-[20px] sm:text-[24px] font-extrabold text-[#0B192C] leading-tight">
            {labels.subtitle}
          </p>
        </div>

        {/* === Carousel Container === */}
        <div className="relative flex items-center justify-center">
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute left-0 lg:-left-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 hover:bg-white text-slate-600 transition-colors shadow-sm border border-slate-100 focus:outline-none"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6 stroke-[2.5]" />
          </button>

          {/* Slider Content Wrapper */}
          <div className="w-full overflow-hidden max-w-[1100px] px-6">
            <div
              className={`flex ${isTransitioning ? 'transition-transform duration-500 ease-out' : ''} -mx-4`}
              style={{
                transform: `translateX(-${activeIndex * (isMobile ? 100 : 50)}%)`
              }}
            >
              {extendedTestimonials.map((item, idx) => (
                <div
                  key={`${item.id}-${idx}`}
                  className="w-full md:w-1/2 shrink-0 px-4"
                >
                  <div className="bg-white rounded-none border border-slate-100 shadow-sm p-8 flex flex-col justify-between items-center text-center h-[340px] md:h-[360px] transition-all duration-300 hover:shadow-md">
                    {/* Company Logo & Name */}
                    <div className="mb-4 flex justify-center h-8 shrink-0">{item.logo}</div>

                    {/* Testimonial Quote */}
                    <p className="text-[13px] sm:text-[14px] leading-relaxed text-slate-600 font-medium italic px-4 flex-1 flex items-center justify-center overflow-hidden line-clamp-5">
                      {"\""}{item.quote}{"\""}
                    </p>

                    {/* User Profile */}
                    <div className="mt-6 flex flex-col items-center shrink-0">
                      <div className="h-10 w-10 rounded-full flex items-center justify-center bg-[#F1F5F9] text-slate-400 mb-2 border border-slate-100">
                        <User className="h-5.5 w-5.5 stroke-[1.5]" />
                      </div>
                      <span className="text-[14px] font-bold text-[#0B192C] leading-none">{item.name}</span>
                      <span className="text-[11px] text-slate-500 font-medium mt-1 leading-none">{item.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute right-0 lg:-right-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 hover:bg-white text-slate-600 transition-colors shadow-sm border border-slate-100 focus:outline-none"
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
              onClick={() => setActiveIndex(index + 2)}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                activeDotIndex === index ? 'bg-brand w-4' : 'bg-slate-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
