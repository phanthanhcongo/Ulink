'use client';

import { useRef, useEffect, useState } from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Delay increment between items (ms). Default 100 */
  staggerMs?: number;
};

export function StaggerGrid({ children, className = '', staggerMs = 100 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {visible
        ? children
        : <div className="opacity-0">{children}</div>
      }
    </div>
  );
}

export function StaggerItem({
  children,
  index,
  visible,
  staggerMs = 100,
}: {
  children: React.ReactNode;
  index: number;
  visible: boolean;
  staggerMs?: number;
}) {
  return (
    <div
      className={`transition-all duration-500 ${
        visible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-6 opacity-0'
      }`}
      style={{ transitionDelay: `${index * staggerMs}ms` }}
    >
      {children}
    </div>
  );
}
