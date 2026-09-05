# Responsive Typography Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply `.agents/rules/typography-responsive-rules.md` consistently across `frontend/src/app` without changing page behavior.

**Architecture:** Add a small global class layer in `frontend/src/app/globals.css` for typography roles, section/container rhythm, and card hover. Then migrate UI files from ad hoc Tailwind text/layout classes to those global utilities in risk-ranked batches. Keep page-specific layout in page files.

**Tech Stack:** Next.js 14, React 18, TypeScript, Tailwind CSS 3, `@layer components` in global CSS, PowerShell, `rg`, `npm run lint`, `npm run typecheck`, `npm run build`.

## Global Constraints

- Mobile breakpoint: default `<640px`; small phone refinement uses `min-[375px]:`.
- Tablet breakpoint: `sm:` at `>=640px`; `md:` at `>=768px`.
- Desktop breakpoint: `lg:` at `>=1024px`.
- Desktop XL breakpoint: `xl:` at `>=1280px`.
- Main section container: `mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16`.
- Section vertical padding: `py-8 sm:py-10 lg:py-12`.
- Section header wrapper: `text-center max-w-3xl mx-auto space-y-1 sm:space-y-2`.
- Card grid default: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8`.
- Card hover: `transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)]`.
- Do not move every page style into global CSS. Only shared design primitives go global.
- Do not change API route files or action files for this task.

---

## File Structure

- Modify `frontend/src/app/globals.css`: define canonical reusable classes under `@layer components`; update existing shared classes that conflict with the rule.
- Modify high-risk page files in `frontend/src/app/[locale]/(main)` and `frontend/src/app/[locale]/admin`: replace local typography/container/hover classes with global utilities.
- Add `frontend/scripts/check-responsive-typography.mjs`: static guard for repeated violations.
- Modify `frontend/package.json`: add `check:typography`.
- Optional after migration: update `frontend/RESPONSIVE_STANDARDS.md` to reference the new utility classes.

## Canonical Global Classes

Add these classes to `frontend/src/app/globals.css` inside existing `@layer components`:

```css
.page-container {
  @apply mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16;
}

.section-padding {
  @apply py-8 sm:py-10 lg:py-12;
}

.section-header {
  @apply mx-auto max-w-3xl space-y-1 text-center sm:space-y-2;
}

.text-hero-title {
  @apply text-[28px] font-extrabold leading-tight tracking-tight sm:text-[36px] lg:text-[44px] lg:leading-[52px] xl:text-[56px] xl:leading-[64px];
}

.text-section-title {
  @apply text-[16px] font-semibold leading-tight tracking-tight min-[375px]:text-[18px] sm:text-[24px] sm:leading-[32px] lg:text-[28px] lg:leading-[36px] xl:text-[32px] xl:leading-[40px];
}

.text-eyebrow {
  @apply text-[12px] font-semibold tracking-tight sm:text-[14px] lg:text-[15px] xl:text-[16px];
}

.text-card-title {
  @apply text-[16px] font-bold leading-snug sm:text-[18px] lg:text-[20px] xl:text-[24px];
}

.text-body-large {
  @apply text-[14px] leading-[20px] sm:text-[15px] sm:leading-[22px] lg:text-[16px] lg:leading-[24px] xl:text-[18px] xl:leading-[28px];
}

.text-body-regular {
  @apply text-[13px] font-normal leading-[20px] sm:text-[14px] sm:leading-[22px] lg:text-[15px] lg:leading-[24px] xl:text-[16px];
}

.text-button-responsive {
  @apply text-[13px] font-semibold sm:text-[14px] lg:text-[15px] xl:text-[16px];
}

.text-caption-responsive {
  @apply text-[11px] font-medium sm:text-[12px] lg:text-[13px] xl:text-[14px];
}

.card-hover-standard {
  @apply transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)];
}
```

## Task 1: Global Utility Layer

**Files:**
- Modify: `frontend/src/app/globals.css`

**Interfaces:**
- Produces CSS classes: `.page-container`, `.section-padding`, `.section-header`, `.text-hero-title`, `.text-section-title`, `.text-eyebrow`, `.text-card-title`, `.text-body-large`, `.text-body-regular`, `.text-button-responsive`, `.text-caption-responsive`, `.card-hover-standard`.
- Later tasks consume those classes directly in `className`.

- [ ] **Step 1: Inspect current component layer**

Run:

```powershell
Select-String -LiteralPath frontend\src\app\globals.css -Pattern "@layer components|container-page|admin-page|section-title|card-hover" -Context 2,4
```

Expected: shows existing shared component classes and exact insertion point.

- [ ] **Step 2: Update conflicting shared classes**

In `frontend/src/app/globals.css`, set these existing classes to rule-compatible values:

```css
.container-page {
  @apply mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16;
}

.admin-page {
  @apply mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12 xl:px-16;
}

.card-hover {
  @apply transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)];
}
```

- [ ] **Step 3: Add canonical classes**

Add the classes from `Canonical Global Classes` in the same `@layer components` block.

- [ ] **Step 4: Verify CSS compiles**

Run:

```powershell
Set-Location frontend
npm run typecheck
```

Expected: TypeScript passes; Tailwind class strings in CSS do not break compilation.

- [ ] **Step 5: Commit**

```powershell
git add frontend/src/app/globals.css
git commit -m "style: add responsive typography utilities"
```

## Task 2: Static Typography Guard

**Files:**
- Create: `frontend/scripts/check-responsive-typography.mjs`
- Modify: `frontend/package.json`

**Interfaces:**
- Produces command: `npm run check:typography`.
- Script exits `1` when high-confidence violations remain in `frontend/src/app`.

- [ ] **Step 1: Create guard script**

Create `frontend/scripts/check-responsive-typography.mjs`:

```js
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const appRoot = join(process.cwd(), 'src', 'app');
const ignoredSegments = [`${join('src', 'app', 'api')}`, `${join('src', 'app')}\\api`];
const textScale = /\btext-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl)\b/g;
const badContainer = /\blg:px-16\b/g;
const badSectionPadding = /\b(md:)?py-1[246]\b/g;
const badHover = /hover:(shadow-md|-translate-y-1|scale-\[1\.02\])/g;

function walk(dir) {
  const result = [];
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    const stats = statSync(path);
    if (stats.isDirectory()) {
      result.push(...walk(path));
    } else if (/\.(tsx|css)$/.test(entry)) {
      result.push(path);
    }
  }
  return result;
}

const checks = [
  ['native text scale', textScale],
  ['lg:px-16 container padding', badContainer],
  ['oversized section padding', badSectionPadding],
  ['non-standard card hover', badHover],
];

const violations = [];

for (const file of walk(appRoot)) {
  if (ignoredSegments.some((segment) => file.includes(segment))) continue;
  const source = readFileSync(file, 'utf8');
  if (!/className=|@apply|<h[1-6]|<p|<span|<button|<Link/.test(source)) continue;

  for (const [label, pattern] of checks) {
    pattern.lastIndex = 0;
    const matches = [...source.matchAll(pattern)];
    for (const match of matches) {
      const line = source.slice(0, match.index).split('\n').length;
      violations.push(`${file}:${line} ${label}: ${match[0]}`);
    }
  }
}

if (violations.length > 0) {
  console.error(`Responsive typography violations: ${violations.length}`);
  console.error(violations.slice(0, 120).join('\n'));
  if (violations.length > 120) {
    console.error(`...and ${violations.length - 120} more`);
  }
  process.exit(1);
}

console.log('Responsive typography check passed.');
```

- [ ] **Step 2: Add package script**

In `frontend/package.json`, add:

```json
"check:typography": "node scripts/check-responsive-typography.mjs"
```

Keep JSON commas valid.

- [ ] **Step 3: Verify guard fails before migration**

Run:

```powershell
Set-Location frontend
npm run check:typography
```

Expected: FAIL while unmigrated files still exist. Use output as migration punch list.

- [ ] **Step 4: Commit**

```powershell
git add frontend/scripts/check-responsive-typography.mjs frontend/package.json
git commit -m "chore: add responsive typography check"
```

## Task 3: Container And Section Rhythm Migration

**Files:**
- Modify: `frontend/src/app/[locale]/(main)/about/page.tsx`
- Modify: `frontend/src/app/[locale]/(main)/about/standards/page.tsx`
- Modify: `frontend/src/app/[locale]/(main)/about/contact-success/page.tsx`
- Modify: `frontend/src/app/[locale]/(main)/about/careers/page.tsx`
- Modify: `frontend/src/app/[locale]/(main)/about/careers/[slug]/page.tsx`
- Modify: `frontend/src/app/[locale]/(main)/about/careers/[slug]/apply/page.tsx`
- Modify: `frontend/src/app/[locale]/(main)/about/careers/apply-success/page.tsx`
- Modify: `frontend/src/app/[locale]/(main)/contact/page.tsx`
- Modify: `frontend/src/app/[locale]/(auth)/layout.tsx`
- Modify: checkout/order/sample/quick-order pages using `py-12` or `lg:px-16`

**Interfaces:**
- Consumes: `.page-container`, `.section-padding`.
- Produces: consistent page padding without changing rendered content.

- [ ] **Step 1: Find exact container violations**

Run:

```powershell
rg -n "mx-auto w-full max-w-\\[1440px\\] px-4 sm:px-8 lg:px-16|lg:px-16|\\bpy-12\\b|\\bpy-16\\b|md:py-16" frontend/src/app
```

Expected: list of files and line numbers to edit.

- [ ] **Step 2: Replace full container class where exact match exists**

Replace:

```tsx
className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-16"
```

with:

```tsx
className="page-container"
```

When class has extra spacing, keep it:

```tsx
className="page-container py-4"
```

- [ ] **Step 3: Replace naked `lg:px-16`**

Change:

```tsx
className="... px-4 sm:px-8 lg:px-16 ..."
```

to:

```tsx
className="... px-4 sm:px-8 lg:px-12 xl:px-16 ..."
```

- [ ] **Step 4: Normalize section padding**

For normal sections, replace:

```tsx
className="... py-12 md:py-16 ..."
```

with:

```tsx
className="... section-padding ..."
```

If section already has `pt-*` and `pb-*` for asymmetric layout, use:

```tsx
className="... py-8 sm:py-10 lg:py-12 ..."
```

- [ ] **Step 5: Verify no layout guard violations for container/padding**

Run:

```powershell
rg -n "lg:px-16|\\bpy-16\\b|md:py-16" frontend/src/app
```

Expected: no matches in UI page files; matches in docs or false positives are ignored only after manual review.

- [ ] **Step 6: Commit**

```powershell
git add frontend/src/app
git commit -m "style: normalize app container spacing"
```

## Task 4: Typography Migration For Highest-Risk Pages

**Files:**
- Modify: `frontend/src/app/[locale]/(main)/resources/events/[slug]/page.tsx`
- Modify: `frontend/src/app/[locale]/admin/page.tsx`
- Modify: `frontend/src/app/[locale]/(main)/solutions/listProduct/[slug]/page.tsx`
- Modify: `frontend/src/app/[locale]/(main)/about/news/[id]/page.tsx`
- Modify: `frontend/src/app/[locale]/(main)/resources/events/[slug]/register/page.tsx`

**Interfaces:**
- Consumes: `.text-hero-title`, `.text-section-title`, `.text-eyebrow`, `.text-card-title`, `.text-body-large`, `.text-body-regular`, `.text-button-responsive`, `.text-caption-responsive`.
- Produces: responsive text scale matching role matrix.

- [ ] **Step 1: Locate native text classes**

Run:

```powershell
rg -n "\\btext-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl)\\b" frontend/src/app/[locale]/`(main`)/resources/events/[slug]/page.tsx frontend/src/app/[locale]/admin/page.tsx frontend/src/app/[locale]/`(main`)/solutions/listProduct/[slug]/page.tsx frontend/src/app/[locale]/`(main`)/about/news/[id]/page.tsx frontend/src/app/[locale]/`(main`)/resources/events/[slug]/register/page.tsx
```

Expected: list of exact lines.

- [ ] **Step 2: Map each text element by semantic role**

Use this mapping:

```text
h1 page title: text-hero-title
h2 section heading: text-section-title
h3/h4 card or small module heading: text-card-title
lead paragraph under h1: text-body-large
normal paragraph/list text: text-body-regular
button/link call-to-action: text-button-responsive
date/status/meta/company label: text-caption-responsive
eyebrow/category/sub-header: text-eyebrow
```

- [ ] **Step 3: Replace native text classes**

Example replacements:

```tsx
<h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight text-left">
```

becomes:

```tsx
<h2 className="text-section-title font-black text-slate-900 text-left">
```

```tsx
<p className="mt-4 text-slate-600 leading-relaxed text-sm sm:text-base text-justify whitespace-pre-line font-sans">
```

becomes:

```tsx
<p className="mt-4 text-body-regular text-slate-600 text-justify whitespace-pre-line font-sans">
```

```tsx
<span className="text-xs sm:text-sm font-extrabold tracking-widest text-slate-400 uppercase">
```

becomes:

```tsx
<span className="text-caption-responsive font-extrabold text-slate-400 uppercase">
```

- [ ] **Step 4: Keep color and layout tokens**

Do not remove semantic classes such as:

```text
text-slate-900
text-brand
font-bold
uppercase
text-center
text-left
mt-4
space-y-2
```

Only replace sizing, leading, and conflicting tracking.

- [ ] **Step 5: Verify high-risk files clean**

Run:

```powershell
rg -n "\\btext-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl)\\b|tracking-widest|tracking-wider" frontend/src/app/[locale]/`(main`)/resources/events/[slug]/page.tsx frontend/src/app/[locale]/admin/page.tsx frontend/src/app/[locale]/`(main`)/solutions/listProduct/[slug]/page.tsx frontend/src/app/[locale]/`(main`)/about/news/[id]/page.tsx frontend/src/app/[locale]/`(main`)/resources/events/[slug]/register/page.tsx
```

Expected: no matches, except intentional logo/initial/avatar fallback text after manual review.

- [ ] **Step 6: Commit**

```powershell
git add frontend/src/app
git commit -m "style: migrate key pages to responsive typography"
```

## Task 5: Typography Migration For Remaining App UI

**Files:**
- Modify: all remaining UI files reported by `npm run check:typography`

**Interfaces:**
- Consumes: global utility classes from Task 1.
- Produces: clean static typography guard across `frontend/src/app`.

- [ ] **Step 1: Generate remaining punch list**

Run:

```powershell
Set-Location frontend
npm run check:typography
```

Expected: FAIL with only remaining lower-risk files.

- [ ] **Step 2: Migrate one file at a time**

For each reported TSX/CSS file, replace native text class by role:

```text
text-xs -> text-caption-responsive
text-sm or text-sm sm:text-base on paragraphs -> text-body-regular
text-lg/text-xl in card headings -> text-card-title
text-2xl/text-3xl in section headings -> text-section-title
text-3xl/text-4xl/text-5xl in h1 -> text-hero-title
```

- [ ] **Step 3: Handle admin screens conservatively**

For dense tables/forms, keep compact semantic intent:

```tsx
<span className="text-caption-responsive text-muted-foreground">...</span>
<p className="text-body-regular text-muted-foreground">...</p>
<h2 className="text-section-title text-primary">...</h2>
```

Do not inflate table cell text to hero/section sizes.

- [ ] **Step 4: Run guard after each 3-5 files**

Run:

```powershell
Set-Location frontend
npm run check:typography
```

Expected: violation count decreases after every batch.

- [ ] **Step 5: Commit**

```powershell
git add frontend/src/app
git commit -m "style: complete responsive typography migration"
```

## Task 6: Card Hover Standardization

**Files:**
- Modify: files reported by `rg -n "hover:shadow-md|hover:-translate-y-1|hover:scale-\\[1\\.02\\]" frontend/src/app`

**Interfaces:**
- Consumes: `.card-hover-standard`.
- Produces: consistent hover effect for cards.

- [ ] **Step 1: Find non-standard card hover**

Run:

```powershell
rg -n "hover:shadow-md|hover:-translate-y-1|hover:scale-\\[1\\.02\\]" frontend/src/app
```

Expected: list of card-like containers.

- [ ] **Step 2: Replace card container hover**

Change:

```tsx
className="... transition-shadow hover:shadow-md ..."
```

to:

```tsx
className="... card-hover-standard ..."
```

Change:

```tsx
className="... transition-all duration-200 hover:-translate-y-1 hover:scale-[1.02] ..."
```

to:

```tsx
className="... card-hover-standard ..."
```

- [ ] **Step 3: Preserve non-card hover**

If hover is on a button, tab, nav item, or icon-only control, do not replace it with `.card-hover-standard`. Remove from guard only if guard false-positive handling is needed.

- [ ] **Step 4: Verify**

Run:

```powershell
rg -n "hover:shadow-md|hover:-translate-y-1|hover:scale-\\[1\\.02\\]" frontend/src/app
```

Expected: no matches on card containers.

- [ ] **Step 5: Commit**

```powershell
git add frontend/src/app
git commit -m "style: standardize card hover states"
```

## Task 7: Final Verification

**Files:**
- Read: `frontend/src/app/globals.css`
- Read: migrated page files

**Interfaces:**
- Consumes: all prior tasks.
- Produces: verified migration ready for review.

- [ ] **Step 1: Run static guard**

```powershell
Set-Location frontend
npm run check:typography
```

Expected: `Responsive typography check passed.`

- [ ] **Step 2: Run lint**

```powershell
Set-Location frontend
npm run lint
```

Expected: no lint errors.

- [ ] **Step 3: Run typecheck**

```powershell
Set-Location frontend
npm run typecheck
```

Expected: no TypeScript errors.

- [ ] **Step 4: Build**

```powershell
Set-Location frontend
npm run build
```

Expected: production build completes.

- [ ] **Step 5: Manual viewport smoke test**

Run dev server:

```powershell
Set-Location frontend
npm run dev
```

Open these pages at 375px, 768px, 1024px, and 1440px widths:

```text
/vi
/vi/resources/events/sample-event-slug
/vi/admin
/vi/solutions/listProduct/sample-product-slug
/vi/about/news/sample-news-id
/vi/resources/events/sample-event-slug/register
```

Verify:

```text
No text overlaps.
H1 scales from 28px mobile to 56px XL.
Section titles do not exceed 32px XL.
Body text stays readable at 13-16px.
Container padding is 16px mobile, 32px tablet, 48px desktop, 64px XL.
Cards use blue glow hover, 2px lift, 1.01 scale.
```

- [ ] **Step 6: Commit final verification metadata if docs changed**

```powershell
git add frontend/RESPONSIVE_STANDARDS.md docs/superpowers/plans/2026-09-05-responsive-typography.md
git commit -m "docs: document responsive typography rollout"
```

Only run this commit if documentation files changed after Task 1-6.

## Self-Review

- Spec coverage: typography matrix, breakpoints, container padding, section padding, section header, grid spacing, and card hover all mapped to tasks.
- Placeholder scan: no `TBD`, no `TODO`, no unspecified implementation step.
- Type consistency: CSS class names are defined once in Task 1 and reused unchanged in later tasks.
- Known risk: `check-responsive-typography.mjs` is strict and may flag intentional dense admin table text. Resolve by converting to semantic compact classes first; only add script allowlist for a reviewed false positive.

