import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { OtpForm } from '@/components/auth/otp-form';

type Props = { params: { locale: string } };

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'auth' });
  return { title: t('verifyOtp') };
}

export default function VerifyOtpPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  return (
    <div className="mx-auto w-full max-w-md rounded-[3px] bg-white p-4 sm:p-6 lg:p-8 border border-slate-100 shadow-sm">
      <OtpForm />
    </div>
  );
}
