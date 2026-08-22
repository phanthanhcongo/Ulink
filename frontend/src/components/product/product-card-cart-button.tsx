'use client';

import React, { useState, useCallback } from 'react';
import { Plus, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { readCart, persistCart } from '@/components/rfq/cart-types';

interface SkuOption {
  id: number;
  sku_code: string;
  unit: string | null;
  pack_size: string | null;
  attributes: Record<string, string> | null;
}

interface ProductCardCartButtonProps {
  skus: SkuOption[];
  productName: string;
  locale: string;
  fallbackSkuCode?: string;
}

export default function ProductCardCartButton({
  skus,
  productName,
  locale,
  fallbackSkuCode
}: ProductCardCartButtonProps) {
  const [added, setAdded] = useState(false);

  const publishedSkus = skus.filter((s) => s.sku_code);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const cart = readCart();
      const skuCode = publishedSkus[0]?.sku_code || fallbackSkuCode || productName;

      const existingIndex = cart.findIndex(
        (item) => item.sku === skuCode || item.product_name === productName
      );

      if (existingIndex >= 0) {
        cart[existingIndex].quantity += 1;
      } else {
        cart.push({
          sku: skuCode,
          product_name: productName,
          spec: publishedSkus[0]?.pack_size || '',
          unit: publishedSkus[0]?.unit || 'cái',
          quantity: 1,
          note: ''
        });
      }

      persistCart(cart);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    },
    [publishedSkus, fallbackSkuCode, productName]
  );

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        'inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-[3px] text-xs font-extrabold transition-all shadow-2xs cursor-pointer',
        added
          ? 'bg-emerald-600 text-white hover:bg-emerald-700'
          : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-[1.02]'
      )}
    >
      {added ? (
        <>
          <Check className="h-3.5 w-3.5 stroke-[2.5]" />
          {locale === 'vi' ? 'Đã thêm' : locale === 'ja' ? '追加済み' : 'Added'}
        </>
      ) : (
        <>
          <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
          {locale === 'vi' ? 'Đặt hàng' : locale === 'ja' ? 'RFQに追加' : 'Add to RFQ'}
        </>
      )}
    </button>
  );
}
