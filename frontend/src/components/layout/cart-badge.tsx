'use client';

import { useEffect, useState } from 'react';

export function CartBadge() {
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

  if (count === 0) return null;

  return (
    <span className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-brand px-1 text-[10px] font-bold leading-none text-white shadow-xs animate-in zoom-in duration-200">
      {count}
    </span>
  );
}
