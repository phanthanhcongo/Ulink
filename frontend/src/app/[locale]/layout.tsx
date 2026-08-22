import type { Metadata } from 'next';
import { Archivo } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { getCurrentUser } from '@/lib/auth-helpers';
import { AuthProvider, type AuthUser } from '@/lib/auth-context';
import { Toaster } from 'react-hot-toast';
import '../globals.css';

const archivo = Archivo({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-sans'
});

export const metadata: Metadata = {
  title: {
    default: 'ULink Industries — B2B Procurement Platform',
    template: '%s · ULink Industries'
  },
  description:
    'Auxiliary materials for cleanroom & packaging, delivered to Northern Vietnam industrial clusters.'
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }
  setRequestLocale(locale);

  // Resolve the session server-side so the initial render is hydration-correct
  // (avoids a client-side flash from "loading" to "authenticated").
  const [messages, initialUser] = await Promise.all([
    getMessages(),
    getCurrentUser() as Promise<AuthUser | null>
  ]);

  return (
    <html lang={locale} className={archivo.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <AuthProvider initialUser={initialUser}>
            {children}
            <Toaster position="top-center" reverseOrder={false} />
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
