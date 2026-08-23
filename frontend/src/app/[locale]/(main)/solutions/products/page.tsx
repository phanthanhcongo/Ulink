import { redirect } from '@/i18n/navigation';

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function ProductsRedirectPage({ params }: PageProps) {
  const { locale } = await params;
  redirect({ href: '/solutions/products/list', locale });
  return null;
}
