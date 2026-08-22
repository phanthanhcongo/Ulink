import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { LoginForm } from '@/components/auth/login-form';
import { getCurrentUser } from '@/lib/auth-helpers';

type Props = { params: { locale: string } };

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'auth' });
  return { title: t('tabLogin') };
}

export default async function LoginPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const user = await getCurrentUser();
  if (user) redirect('/');

  return (
    <div className="w-full max-w-xl rounded-[3px] bg-white p-6 sm:p-10 border border-slate-100 shadow-sm flex flex-col justify-between mx-auto lg:max-w-none">
      <LoginForm />
    </div>
  );
}
