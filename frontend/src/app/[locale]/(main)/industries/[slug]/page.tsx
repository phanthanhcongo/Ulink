import { setRequestLocale } from 'next-intl/server';
import { redirect, notFound } from 'next/navigation';

interface Props {
  params: { locale: string; slug: string };
}

// This page ONLY handles alias redirects. All primary industry routes are static folders.
// Never render content here — it causes hydration conflicts with the static routes.

const STATIC_ROUTES = ['electronics', 'pharmaceutical', 'food', 'logistics', 'furniture', 'construction'];

const ALIAS_MAP: Record<string, string> = {
  'pharmaceutical-cosmetics': 'pharmaceutical',
  'pharma-medical': 'pharmaceutical',
  'cosmetics': 'pharmaceutical',
  'food-beverage': 'food',
  'furniture-wood': 'furniture',
  'manufacturing': 'construction',
  'construction-hvac': 'construction'
};

export default async function IndustrySlugPage({ params: { locale, slug } }: Props) {
  setRequestLocale(locale);

  // Redirect aliases to their canonical static route
  if (ALIAS_MAP[slug]) {
    redirect(`/${locale}/industries/${ALIAS_MAP[slug]}`);
  }

  // If someone lands here with a primary slug, redirect to the static route
  // (this shouldn't happen because Next.js prioritizes static routes, but just in case)
  if (STATIC_ROUTES.includes(slug)) {
    redirect(`/${locale}/industries/${slug}`);
  }

  // Any unknown slug → 404
  notFound();
}
