# Frontend-Hosted Image Paths Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Store paths for all website images in Directus while serving actual files from `frontend/public/images`.

**Architecture:** Add one shared resolver for frontend paths, update all image consumers and seed/import flows, then migrate and validate data.

**Tech Stack:** Next.js App Router, TypeScript/React, Directus REST API, Node.js, Node test runner.

## Global Constraints

- Image fields store relative paths such as `/images/products/foo.webp`.
- Actual website images live under `frontend/public/images`.
- Product, marketing, hub, partner, article, and team images are in scope.
- Product documents and other non-image files remain in Directus.
- Missing paths retain existing placeholder behavior.
- No active content-image code constructs `/assets/{directusFileId}` after migration except documented compatibility code.

---

### Task 1: Inventory image fields and source files

**Files:**
- Inspect: `directus/docs/SCHEMA.md`, `directus/seed/`, `directus/seed-v2/`, `frontend/public/images/`
- Create: `docs/superpowers/migrations/2026-09-15-image-path-inventory.md`

- [ ] Enumerate image-bearing Directus fields and frontend consumers with `rg -n "hero|gallery|cover|logo|image|photo|/assets/" directus frontend/src`.
- [ ] Map each field to a concrete `/images/...` path, marking unresolved and duplicate files.
- [ ] Commit the inventory.

### Task 2: Add and test the shared image resolver

**Files:**
- Create: `frontend/src/lib/image-url.ts`
- Test: `frontend/src/lib/image-url.test.ts`

**Interface:** `resolveImageUrl(value: unknown, frontendOrigin?: string): string | null`.

- [ ] Write failing tests for root-relative paths, origin-relative paths, absolute URLs, and empty values.
- [ ] Run the focused test and confirm it fails because the resolver does not exist.
- [ ] Implement normalization: preserve root-relative and absolute URLs, resolve non-prefixed paths against the frontend origin, and return null for blank values.
- [ ] Run the focused test, then commit.

### Task 3: Update product image data flow

**Files:**
- Modify: `frontend/src/lib/product-data.ts`
- Modify: `frontend/src/components/solutions/catalog-showcase.tsx`
- Modify: `frontend/src/app/[locale]/(main)/solutions/listProduct/page.tsx`
- Modify: `frontend/src/app/[locale]/(main)/solutions/listProduct/[slug]/page.tsx`
- Modify: `frontend/src/components/product/product-image-gallery.tsx`
- Modify: `frontend/src/components/solutions/product-card.tsx`

- [ ] Add failing assertions that product hero/gallery paths render unchanged.
- [ ] Replace Directus asset URL construction with `resolveImageUrl`.
- [ ] Preserve placeholder behavior for null image fields.
- [ ] Run product tests and commit.

### Task 4: Update transactional and admin consumers

**Files:**
- Modify: `frontend/src/components/cart/cart-client.tsx`
- Modify: `frontend/src/components/checkout/checkout-client.tsx`
- Modify: `frontend/src/components/rfq/quick-order-client.tsx`
- Modify: `frontend/src/components/order-confirmation/order-confirmation-client.tsx`
- Modify: `frontend/src/components/order-tracking/order-tracking-client.tsx`
- Modify: `frontend/src/components/payment-invoice/payment-invoice-client.tsx`
- Modify: `frontend/src/components/admin/products-client.tsx`
- Modify: `frontend/src/components/admin/articles-client.tsx`

- [ ] Replace each content-image `/assets/` expression with the shared resolver.
- [ ] Ensure null results use the current placeholder/fallback UI.
- [ ] Run `npm test` and `npm run build` from `frontend`.
- [ ] Commit the consumer migration.

### Task 5: Update remaining content image consumers

**Files:**
- Inspect/modify: `frontend/src/components/industries/industry-detail-client.tsx`
- Inspect/modify: `frontend/src/components/news/news-detail-client.tsx`
- Inspect/modify: relevant homepage, hub, partner, category, and article pages
- Modify: `frontend/src/lib/assets.ts` where canonical paths are missing

- [ ] Scan remaining references with `rg -n "/assets/|directusUrl.*image|image.*directus|hero.*directus" frontend/src directus`.
- [ ] Convert remaining image fields to frontend paths and resolver calls.
- [ ] Keep intentional static constants in `ASSETS`.
- [ ] Commit and rerun the scan.

### Task 6: Update Directus seed/import/migration scripts

**Files:**
- Modify: `directus/seed/seed_images.mjs`
- Modify: `directus/seed-v2/seed_images.mjs` if present
- Modify: `directus/bootstrap.mjs`
- Modify: `directus/scripts/remote-upload-images.mjs`
- Modify: `directus/scripts/upload-v2-images.mjs`
- Create: `directus/scripts/migrate-image-file-ids-to-paths.mjs`

- [ ] Write a failing test for File ID-to-path mapping and unresolved records.
- [ ] Implement a dry-run migration that reports unresolved and duplicate mappings before writing.
- [ ] Change seed/import scripts to write paths and skip website-image uploads to Directus.
- [ ] Run dry-run against local data, review the report, then run the write migration.
- [ ] Commit scripts and the migration report.

### Task 7: Populate and validate frontend image files

**Files:**
- Add/rename: `frontend/public/images/**`
- Modify: `frontend/public/images/README.md`
- Create: `docs/superpowers/migrations/2026-09-15-image-path-migration-report.md`

- [ ] Copy missing source images into deterministic web-safe paths.
- [ ] Verify every stored path maps to an existing file under `frontend/public`.
- [ ] Check filename case and duplicate paths.
- [ ] Commit assets and the migration report.

### Task 8: Full verification and deployment documentation

**Files:**
- Modify: `directus/docs/SCHEMA.md`
- Modify: `directus/docs/railway-reseed-guide.md`
- Modify: deployment docs describing image uploads

- [ ] Run `npm test` from `frontend`.
- [ ] Run `npm run build` from `frontend`.
- [ ] Confirm no undocumented `/assets/` content-image references remain.
- [ ] Run `git diff --check`, review changed files, and commit documentation.

