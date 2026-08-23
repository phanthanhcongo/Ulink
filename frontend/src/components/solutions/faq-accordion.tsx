'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  sectionTitle: string;
  sectionSubtitle: string;
  items: FaqItem[];
}

export default function FaqAccordion({ sectionTitle, sectionSubtitle, items }: FaqAccordionProps) {
  const [openId, setOpenId] = useState<number | null>(1); // default first item open

  const toggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="w-full bg-[#F2F4F8] border-t border-b border-slate-100 py-16 lg:py-24 mt-16 lg:mt-24">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-[22px] sm:text-[24px] md:text-[26px] lg:text-[28px] xl:text-[30px] font-extrabold text-primary tracking-tight">
            {sectionTitle}
          </h2>
          <p className="text-[13px] sm:text-[14px] leading-relaxed text-slate-500 font-medium mt-2">{sectionSubtitle}</p>
        </div>

        {/* Accordion Container */}
        <div className="max-w-4xl mx-auto border border-slate-100 rounded-[3px] overflow-hidden bg-[#FFFFFF] shadow-xs">
          {items.map((item, index) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="border-b border-slate-100 last:border-0 transition-colors duration-200 bg-[#FFFFFF]"
              >
                {/* Question Button */}
                <button
                  onClick={() => toggle(item.id)}
                  className="w-full flex items-center justify-between text-left px-6 sm:px-8 py-5 hover:bg-slate-50/50 transition-colors focus:outline-none"
                >
                  <span className="text-[15px] sm:text-[16px] lg:text-[18px] font-bold text-primary pr-4 leading-snug">
                    {index + 1}. {item.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>

                {/* Answer Box */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 sm:px-8 pb-6 text-[13px] sm:text-[14px] leading-relaxed text-slate-500 font-medium">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

