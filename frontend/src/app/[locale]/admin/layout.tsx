import React from 'react';
import { setRequestLocale } from 'next-intl/server';
import { redirect } from '@/i18n/navigation';
import { getCurrentUser, isAdminUser } from '@/lib/auth-helpers';
import { AdminLayoutWrapper } from '@/components/admin/admin-layout-wrapper';

export default async function AdminLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  setRequestLocale(locale);

  // Authenticate user server-side
  const user = await getCurrentUser();
  if (!user) {
    redirect({ href: '/login', locale });
  }

  if (!isAdminUser(user)) {
    redirect({ href: '/', locale });
  }

  return <AdminLayoutWrapper>{children}</AdminLayoutWrapper>;
}
