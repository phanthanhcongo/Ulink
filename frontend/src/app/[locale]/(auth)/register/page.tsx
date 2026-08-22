import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { RegisterForm } from '@/components/auth/register-form';
import { getCurrentUser } from '@/lib/auth-helpers';

type Props = { params: { locale: string } };

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'auth' });
  return { title: t('tabRegister') };
}

// Server-side guard: a logged-in visitor shouldn't see the register form —
// they have nothing to register. Send them home.
export default async function RegisterPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const user = await getCurrentUser();
  if (user) redirect('/');
  return (
    <div className="mx-auto w-full max-w-xl rounded-[3px] bg-white p-6 sm:p-10 border border-slate-100 shadow-sm">
      <RegisterForm />
    </div>
  );
}
