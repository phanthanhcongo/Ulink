import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { redirect } from '@/i18n/navigation';
import { getCurrentUser } from '@/lib/auth-helpers';
import { MySampleRequestDetail } from '@/components/sample-request/my-sample-request-detail';

type Props = { params: { locale: string; id: string } };

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'sampleRequest.myRequests' });
  return { title: t('detail') };
}

export default async function MySampleRequestDetailPage({ params: { locale, id } }: Props) {
  setRequestLocale(locale);
  const user = await getCurrentUser();
  if (!user) {
    redirect({ href: '/login', locale });
  }

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-background via-background to-muted/30 min-h-screen">
      <div className="page-container flex flex-col gap-6 py-8 sm:gap-8 lg:py-12">
        <MySampleRequestDetail id={id} locale={locale} />
      </div>
    </section>
  );
}

