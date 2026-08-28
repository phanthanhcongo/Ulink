'use client';

import { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HeaderRfqButtonProps {
  label: string;
}

export function HeaderRfqButton({ label }: HeaderRfqButtonProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    function updateCount() {
      try {
        const raw = localStorage.getItem('rfq-cart');
        if (raw) {
          const items = JSON.parse(raw);
          if (Array.isArray(items)) {
            setCount(items.length);
            return;
          }
        }
      } catch (err) {
        console.error('Failed to parse rfq-cart count', err);
      }
      setCount(0);
    }

    updateCount();

    window.addEventListener('storage', updateCount);
    window.addEventListener('rfq-cart-changed', updateCount);

    return () => {
      window.removeEventListener('storage', updateCount);
      window.removeEventListener('rfq-cart-changed', updateCount);
    };
  }, []);

  return (
    <Link
      href="/quick-order"
      className={cn(
        buttonVariants({ variant: 'primary', size: 'sm' }),
        'hidden h-[42px] items-center px-5 text-[13px] sm:text-[14px] font-semibold shadow-xs xl:inline-flex transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)]'
      )}
    >
      <span>{label}</span>
    </Link>
  );
}
