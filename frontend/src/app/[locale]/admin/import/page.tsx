import { setRequestLocale } from 'next-intl/server';

import { CommercialImportWorkbench } from '@/components/admin/commercial-import-workbench';

export default function CommercialImportPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(0,106,167,0.16),_transparent_40%),linear-gradient(180deg,_rgba(255,255,255,0.92),_rgba(248,250,252,1))]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/50 to-transparent" />

      <div className="admin-page flex flex-col gap-8">
        <div className="max-w-3xl">
          <p className="text-caption-responsive font-semibold uppercase tracking-[0.22em] text-brand">
            Internal tools
          </p>
          <h1 className="mt-3 text-hero-title font-semibold tracking-tight text-foreground">
            Commercial data import, staged and traceable.
          </h1>
          <p className="mt-4 text-body-regular leading-7 text-muted-foreground">
            Preview or commit customers, orders, invoices, and deliveries through the
            Directus-backed import engine. The workbench keeps nested order lines atomic and
            surfaces row-level failure details for quick cleanup.
          </p>
        </div>

        <CommercialImportWorkbench />
      </div>
    </section>
  );
}

