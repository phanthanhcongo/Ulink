import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ForgotPasswordForm } from '@/components/auth/forgot-password-form';
import { getCurrentUser } from '@/lib/auth-helpers';

type Props = { params: { locale: string } };

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'auth' });
  return { title: t('forgotPassword') };
}

// Server-side guard: if the visitor is already logged in, they don't need to
// reset a password — send them home.
export default async function ForgotPasswordPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const user = await getCurrentUser();
  if (user) redirect('/');
  return (
    <div className="mx-auto w-full max-w-md rounded-[5px] bg-white p-6 sm:p-10 border border-slate-100 shadow-sm">
      <ForgotPasswordForm />
    </div>
  );
}
