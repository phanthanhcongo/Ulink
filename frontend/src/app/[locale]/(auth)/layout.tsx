import { setRequestLocale } from 'next-intl/server';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { LoginHeroCard } from '@/components/auth/login-hero-card';
import { LoginCta } from '@/components/auth/login-cta';
import { PartnersLogosOnly } from '@/components/home';
import { ScrollToTop } from '@/components/layout/scroll-to-top';

export default function AuthLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  setRequestLocale(locale);

  return (
    <div className="flex min-h-screen w-full flex-col relative">
      <SiteHeader />
      <main className="flex-1 py-8 bg-slate-50/50">
        <div className="mx-auto max-w-[1440px]  px-4 sm:px-8 lg:px-16 flex flex-col gap-6">
          {/* Main 2-Column Auth Layout */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-stretch py-2">
            {/* Left Column: Hero Card (5 Cols) - Hidden on mobile/tablet, visible on desktop */}
            <div className="hidden lg:block lg:col-span-5">
              <LoginHeroCard />
            </div>

            {/* Right Column: Dynamic Form Area (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {children}
            </div>
          </div>

          {/* Partners & Certifications Logos Section */}
          <div className="mt-8 border-t border-slate-100 pt-8">
            <PartnersLogosOnly />
          </div>

         
        </div>
      </main>
       {/* Direct Contact CTA Banner */}
          <LoginCta />
      <SiteFooter />
      <ScrollToTop />
    </div>
  );
}
