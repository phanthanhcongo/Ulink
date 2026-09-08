import { setRequestLocale, getTranslations } from 'next-intl/server';

export default async function AboutNewsPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('aboutSidebar');

  return (
    <div className="w-full bg-white">
      <div className="page-container py-2 sm:py-3 lg:py-4 px-3 sm:px-4">
        <h1 className="mt-1 sm:mt-1.5 lg:mt-2 text-section-title sm:text-section-title font-bold text-primary">{t('news')}</h1>
      </div>
    </div>
  );
}
