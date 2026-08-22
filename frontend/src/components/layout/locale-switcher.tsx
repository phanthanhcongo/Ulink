'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';

const LABELS: Record<Locale, string> = {
  vi: 'Tiếng Việt',
  en: 'English',
  ja: '日本語'
};

function FlagVN({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
      <rect width="640" height="480" fill="#da251d" />
      <polygon
        points="320,80 365,220 500,220 390,300 420,440 320,360 220,440 250,300 140,220 275,220"
        fill="#ff0"
      />
    </svg>
  );
}

function FlagUS({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
      <rect width="640" height="480" fill="#fff" />
      <g fill="#b22234">
        {[0, 2, 4, 6, 8, 10, 12].map((i) => (
          <rect key={i} y={i * 37} width="640" height="37" />
        ))}
      </g>
      <rect width="256" height="259" fill="#3c3b6e" />
    </svg>
  );
}

function FlagJP({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
      <rect width="640" height="480" fill="#fff" />
      <circle cx="320" cy="240" r="120" fill="#bc002d" />
    </svg>
  );
}

const FLAGS: Record<Locale, React.ComponentType<{ className?: string }>> = {
  vi: FlagVN,
  en: FlagUS,
  ja: FlagJP
};

/** Bộ chuyển ngôn ngữ — giữ nguyên trang hiện tại, đổi locale prefix (AD-06 §8). */
export function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  function switchTo(next: Locale) {
    setOpen(false);
    if (next !== locale) router.replace(pathname, { locale: next });
  }

  const ActiveFlag = FLAGS[locale];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-2 border border-border bg-card px-3 py-1 text-xs font-semibold text-slate-600 transition-colors hover:text-slate-900 rounded-[3px]"
      >
        <ActiveFlag className="h-3 w-4 shrink-0 rounded-[3px] object-cover" aria-hidden="true" />
        <span>{LABELS[locale]}</span>
        <ChevronDown
          className={cn('h-3 w-3 text-slate-400 transition-transform', open && 'rotate-180')}
          aria-hidden="true"
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-1.5 w-36 overflow-hidden border border-border bg-card py-1 shadow-lg rounded-[3px]"
        >
          {routing.locales.map((l) => {
            const OptionFlag = FLAGS[l];
            return (
              <li key={l} role="option" aria-selected={l === locale}>
                <button
                  type="button"
                  onClick={() => switchTo(l)}
                  className={cn(
                    'flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-muted',
                    l === locale ? 'font-medium text-brand' : 'text-foreground'
                  )}
                >
                  <OptionFlag className="h-3.5 w-5 shrink-0 rounded-[3px] object-cover" />
                  <span>{LABELS[l]}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
