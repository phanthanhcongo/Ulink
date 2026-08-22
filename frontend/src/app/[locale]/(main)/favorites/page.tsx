import React from 'react';
import { setRequestLocale } from 'next-intl/server';
import { fetchProducts } from '@/lib/product-data';
import FavoritesClient from '@/components/product/favorites-client';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function FavoritesPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Fetch products (all active ones, up to 100) to filter on the client based on local storage
  const { products } = await fetchProducts({ limit: 100 });

  return <FavoritesClient products={products} locale={locale} />;
}
