# Typography Page Section QA Checklist

Scope: verify responsive typography rules from `.agents/rules/typography-responsive-rules.md`.

Route source: pasted "Danh Sách Trang & Đường Dẫn (URL Route Map) - ULink B2B Platform".

Total pages: 61.
- Main customer pages: 38.
- Auth pages: 7.
- Admin pages: 16.

Viewports to check:
- Mobile: `375px`
- Tablet: `768px`
- Desktop: `1024px`
- Desktop XL: `1440px`

Check each section for:
- H1 uses hero scale: `28px / 36px`, `sm:36px`, `lg:44px`, `xl:56px`.
- H2 uses section scale: `16-20px`, `sm:24px`, `lg:28px`, `xl:32px`.
- Card title uses card scale: `16px`, `sm:18px`, `lg:20px`, `xl:24px`.
- Body uses `13px`, `sm:14px`, `lg:15px`, `xl:16px`.
- Caption/meta uses `11px`, `sm:12px`, `lg:13px`, `xl:14px`.
- Container padding uses `px-4 sm:px-8 lg:px-12 xl:px-16`.
- Section padding uses `py-8 sm:py-10 lg:py-12` unless page has intentional asymmetric hero spacing.
- Card hover uses blue glow, `hover:-translate-y-0.5`, `hover:scale-[1.01]`.
- No text overlap or clipped text in Vietnamese, English, Japanese.

## Home

Route: `/vi`

File: `frontend/src/app/[locale]/(main)/page.tsx`

Sections:
- [ ] Hero banner: `frontend/src/components/home/hero-banner.tsx`
- [ ] Feature value bar: `frontend/src/components/home/feature-value-bar.tsx`
- [ ] Product categories: `frontend/src/components/home/product-categories.tsx`
- [ ] Industry solutions: `frontend/src/components/home/industry-solutions.tsx`
- [ ] About section: `frontend/src/components/home/about-section.tsx`
- [ ] Target segments: `frontend/src/components/home/target-segments.tsx`
- [ ] Partners certifications: `frontend/src/components/home/partners-certifications.tsx`
- [ ] Case studies: `frontend/src/components/home/case-studies.tsx`
- [ ] Working process: `frontend/src/components/home/working-process.tsx`
- [ ] Resources news: `frontend/src/components/home/resources-news.tsx`
- [ ] Document section: `frontend/src/components/home/doc-section.tsx`
- [ ] Support section: `frontend/src/components/home/support-section.tsx`
- [ ] About contact: `frontend/src/components/about/about-contact.tsx`

## Main Pages

- [ ] `/vi/about`: `frontend/src/app/[locale]/(main)/about/page.tsx`
  Sections: breadcrumb/header, company overview, CTA/contact block.
- [ ] `/vi/about/sustainability`: `frontend/src/app/[locale]/(main)/about/sustainability/page.tsx`
  Sections: hero, impact stats, commitments, framework cards, CTA.
- [ ] `/vi/about/standards`: `frontend/src/app/[locale]/(main)/about/standards/page.tsx`
  Sections: breadcrumb/header, standards content, CTA/contact block.
- [ ] `/vi/about/news`: `frontend/src/app/[locale]/(main)/about/news/page.tsx`
  Sections: listing header, news list/cards.
- [ ] `/vi/about/news/[id]`: `frontend/src/app/[locale]/(main)/about/news/[id]/page.tsx`
  Sections: article hero/meta, article content, related/sidebar cards.
- [ ] `/vi/about/contact-success`: `frontend/src/app/[locale]/(main)/about/contact-success/page.tsx`
  Sections: success message, CTA buttons.
- [ ] `/vi/about/careers`: `frontend/src/app/[locale]/(main)/about/careers/page.tsx`
  Sections: header, careers list/cards.
- [ ] `/vi/about/careers/[slug]`: `frontend/src/app/[locale]/(main)/about/careers/[slug]/page.tsx`
  Sections: job header/meta, job content, apply CTA.
- [ ] `/vi/about/careers/[slug]/apply`: `frontend/src/app/[locale]/(main)/about/careers/[slug]/apply/page.tsx`
  Sections: form header, application form.
- [ ] `/vi/about/careers/apply-success`: `frontend/src/app/[locale]/(main)/about/careers/apply-success/page.tsx`
  Sections: success message, CTA buttons.
- [ ] `/vi/contact`: `frontend/src/app/[locale]/(main)/contact/page.tsx`
  Sections: breadcrumb/header, contact form, contact info.
- [ ] `/vi/industries`: `frontend/src/app/[locale]/(main)/industries/page.tsx`
  Sections: hero, industry cards, CTA blocks.
- [ ] `/vi/industries/[slug]`: `frontend/src/app/[locale]/(main)/industries/[slug]/page.tsx`
  Sections: hero, overview, solution/content cards, CTA.
- [ ] `/vi/solutions`: `frontend/src/app/[locale]/(main)/solutions/page.tsx`
  Sections: hero/header, solution modules.
- [ ] `/vi/solutions/listProduct`: `frontend/src/app/[locale]/(main)/solutions/listProduct/page.tsx`
  Sections: product listing shell.
- [ ] `/vi/solutions/listProduct/[slug]`: `frontend/src/app/[locale]/(main)/solutions/listProduct/[slug]/page.tsx`
  Sections: product hero, specs, attributes, CTA/action panels.
- [ ] `/vi/solutions/searchProduct`: `frontend/src/app/[locale]/(main)/solutions/searchProduct/page.tsx`
  Sections: search shell/results.
- [ ] `/vi/resources`: `frontend/src/app/[locale]/(main)/resources/page.tsx`
  Sections: header, resources tabs/lists/cards.
- [ ] `/vi/resources/[slug]`: `frontend/src/app/[locale]/(main)/resources/[slug]/page.tsx`
  Sections: resource detail hero, content, related.
- [ ] `/vi/resources/news/[slug]`: `frontend/src/app/[locale]/(main)/resources/news/[slug]/page.tsx`
  Sections: news detail hero, article body, related.
- [ ] `/vi/resources/events`: `frontend/src/app/[locale]/(main)/resources/events/page.tsx`
  Sections: events list header, event cards.
- [ ] `/vi/resources/events/[slug]`: `frontend/src/app/[locale]/(main)/resources/events/[slug]/page.tsx`
  Sections: event hero/media, overview, schedule, location, agenda, benefits, speakers, host, organizer, sidebar CTA.
- [ ] `/vi/resources/events/[slug]/register`: `frontend/src/app/[locale]/(main)/resources/events/[slug]/register/page.tsx`
  Sections: registration header, event summary, bank info, QR/payment panel, form.
- [ ] `/vi/regional-hubs`: `frontend/src/app/[locale]/(main)/regional-hubs/page.tsx`
  Sections: regional hub listing shell.
- [ ] `/vi/regional-hubs/cum-1`: `frontend/src/app/[locale]/(main)/regional-hubs/cum-1/page.tsx`
  Sections: hero, hub overview, facilities/cards, CTA.
- [ ] `/vi/regional-hubs/cum-2`: `frontend/src/app/[locale]/(main)/regional-hubs/cum-2/page.tsx`
  Sections: hero, hub overview, facilities/cards, CTA.

## Commerce And Account Pages

- [ ] `/vi/cart`: `frontend/src/app/[locale]/(main)/cart/page.tsx`
  Sections: cart header, item list, summary panel, CTA.
- [ ] `/vi/checkout`: `frontend/src/app/[locale]/(main)/checkout/page.tsx`
  Sections: checkout header, address/form, order summary.
- [ ] `/vi/order-confirmation`: `frontend/src/app/[locale]/(main)/order-confirmation/page.tsx`
  Sections: confirmation header, order details, CTA.
- [ ] `/vi/order-tracking`: `frontend/src/app/[locale]/(main)/order-tracking/page.tsx`
  Sections: tracking header, status timeline, detail cards.
- [ ] `/vi/order-tracking/delivery-confirmation`: `frontend/src/app/[locale]/(main)/order-tracking/delivery-confirmation/page.tsx`
  Sections: delivery confirmation, order info, CTA.
- [ ] `/vi/order-tracking/payment-invoice`: `frontend/src/app/[locale]/(main)/order-tracking/payment-invoice/page.tsx`
  Sections: invoice/payment detail.
- [ ] `/vi/payment-invoice`: `frontend/src/app/[locale]/(main)/payment-invoice/page.tsx`
  Sections: invoice/payment detail.
- [ ] `/vi/quick-order`: `frontend/src/app/[locale]/(main)/quick-order/page.tsx`
  Sections: quick-order header, SKU entry/table, summary/actions.
- [ ] `/vi/my-rfqs`: `frontend/src/app/[locale]/(main)/my-rfqs/page.tsx`
  Sections: RFQ list header, filters, cards/table.
- [ ] `/vi/sample-requests`: `frontend/src/app/[locale]/(main)/sample-requests/page.tsx`
  Sections: request list header, sample cards/table.
- [ ] `/vi/sample-requests/[id]`: `frontend/src/app/[locale]/(main)/sample-requests/[id]/page.tsx`
  Sections: detail header, status/details, actions.

## Auth Pages

- [ ] `/vi/login`: `frontend/src/app/[locale]/(auth)/login/page.tsx`
  Sections: auth card header, form fields, buttons, helper links.
- [ ] `/vi/register`: `frontend/src/app/[locale]/(auth)/register/page.tsx`
  Sections: auth card header, registration form, CTA/helper links.
- [ ] `/vi/register/confirm`: `frontend/src/app/[locale]/(auth)/register/confirm/page.tsx`
  Sections: confirmation header, form/status, CTA.
- [ ] `/vi/verify-otp`: `frontend/src/app/[locale]/(auth)/verify-otp/page.tsx`
  Sections: OTP header, input form, CTA/helper text.
- [ ] `/vi/forgot-password`: `frontend/src/app/[locale]/(auth)/forgot-password/page.tsx`
  Sections: form card, helper text, CTA.
- [ ] `/vi/reset-password`: `frontend/src/app/[locale]/(auth)/reset-password/page.tsx`
  Sections: form card, password fields, CTA.
- [ ] `/vi/change-password`: `frontend/src/app/[locale]/(auth)/change-password/page.tsx`
  Sections: form card, password fields, CTA.

## Admin Pages

- [ ] `/vi/admin`: `frontend/src/app/[locale]/admin/page.tsx`
  Sections: dashboard header, metric cards, module cards.
- [ ] `/vi/admin/users`: `frontend/src/app/[locale]/admin/users/page.tsx`
  Sections: header, table/list, action controls.
- [ ] `/vi/admin/subscribers`: `frontend/src/app/[locale]/admin/subscribers/page.tsx`
  Sections: header, table/list, filters/actions.
- [ ] `/vi/admin/articles`: `frontend/src/app/[locale]/admin/articles/page.tsx`
  Sections: header, article table/cards, actions.
- [ ] `/vi/admin/skus`: `frontend/src/app/[locale]/admin/skus/page.tsx`
  Sections: header, SKU table/list, filters/actions.
- [ ] `/vi/admin/sample-requests`: `frontend/src/app/[locale]/admin/sample-requests/page.tsx`
  Sections: header, request table/list, filters/actions.
- [ ] `/vi/admin/sample-requests/[id]`: `frontend/src/app/[locale]/admin/sample-requests/[id]/page.tsx`
  Sections: detail header, request detail, status/action panels.
- [ ] `/vi/admin/rfqs`: `frontend/src/app/[locale]/admin/rfqs/page.tsx`
  Sections: header, RFQ table/list, filters/actions.
- [ ] `/vi/admin/products`: `frontend/src/app/[locale]/admin/products/page.tsx`
  Sections: header, product table/list, filters/actions.
- [ ] `/vi/admin/industrial-zones`: `frontend/src/app/[locale]/admin/industrial-zones/page.tsx`
  Sections: header, zone table/list, filters/actions.
- [ ] `/vi/admin/import`: `frontend/src/app/[locale]/admin/import/page.tsx`
  Sections: import header, upload panel, import status/results.
- [ ] `/vi/admin/hubs`: `frontend/src/app/[locale]/admin/hubs/page.tsx`
  Sections: header, hub table/list, filters/actions.
- [ ] `/vi/admin/contact-requests`: `frontend/src/app/[locale]/admin/contact-requests/page.tsx`
  Sections: header, request table/list, filters/actions.
- [ ] `/vi/admin/contact-requests/[id]`: `frontend/src/app/[locale]/admin/contact-requests/[id]/page.tsx`
  Sections: detail header, contact detail, action panels.
- [ ] `/vi/admin/categories`: `frontend/src/app/[locale]/admin/categories/page.tsx`
  Sections: header, category table/list, actions.
- [ ] `/vi/admin/attributes`: `frontend/src/app/[locale]/admin/attributes/page.tsx`
  Sections: header, attribute table/list, actions.

## Commands

Run before manual QA:

```powershell
Set-Location frontend
npm run check:typography
npm run typecheck
npm run lint
npm run build
```
