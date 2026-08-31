'use client';

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    toggleVisibility();

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Cuộn lên đầu trang"
      className={`group fixed bottom-6 right-5 z-[9990] flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-slate-200/80 bg-white/90 text-slate-700 shadow-[0_8px_24px_rgba(15,34,58,0.12)] backdrop-blur-md transition-all duration-300 hover:border-[#2168df] hover:bg-[#2168df] hover:text-white hover:shadow-[0_12px_28px_rgba(33,104,223,0.3)] active:scale-95 ${
        isVisible
          ? 'translate-y-0 opacity-100 pointer-events-auto scale-100'
          : 'translate-y-4 opacity-0 pointer-events-none scale-90'
      }`}
    >
      <ChevronUp className="h-5 w-5 stroke-[2.5] transition-transform duration-200 group-hover:-translate-y-0.5" />
    </button>
  );
}
