'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Link } from '@/i18n/navigation';

interface AddToCartToastProps {
  productName: string | null;
  locale: string;
}

export function AddToCartToast({ productName, locale }: AddToCartToastProps) {
  if (!productName) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 text-white p-4 rounded-[3px] shadow-2xl border border-slate-800 animate-in slide-in-from-bottom duration-300">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
        <CheckCircle2 className="h-5 w-5" />
      </div>
      <div className="text-caption-responsive min-w-0">
        <p className="font-bold text-white">Đã thêm vào giỏ hàng!</p>
        <p className="text-slate-300 truncate max-w-[220px] font-medium mt-0.5">{productName}</p>
      </div>
      <Link
        href="/cart"
        className="ml-2 px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-caption-responsive rounded-[3px] transition-colors shrink-0 shadow-sm"
      >
        Xem giỏ hàng &gt;
      </Link>
    </div>
  );
}
