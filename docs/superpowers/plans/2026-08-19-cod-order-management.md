# COD Order Management Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let authenticated customers place real orders without online payment, using cash-on-delivery only, while Sales/Admin confirm delivery, record cash collection, and manage order status in a dedicated admin console.

**Architecture:** The checkout path becomes a Next.js BFF that validates the cart, creates a real order in Directus, and returns a durable order code. Order state lives in Directus, with a separate status-history collection for audit and timeline rendering. Customer-facing pages read from the order snapshot, while a protected admin workspace is the only place where Sales/Admin can move the order forward after delivery and mark cash as collected.

**Tech Stack:** Next.js App Router, Directus SDK, Directus bootstrap/RBAC, Zod, next-intl, Playwright, Node test runner, TypeScript.

## Global Constraints

- No online payment gateway in this scope.
- Payment method is cash-on-delivery only.
- Customers can create orders, but only Sales/Admin can confirm delivery and mark cash collected.
- Order and invoice data remain row-level private to the owning customer.
- Money values remain integer minor units or fixed decimal, never floating point.
- Reuse existing Next.js + Directus patterns; do not add a second backend service.

---

### Task 1: Lock the COD data model and permissions

**Files:**
- Modify: `directus/docs/SCHEMA.md`
- Modify: `docs/specs/SPEC-03-data-model.md`
- Modify: `docs/specs/SPEC-04-api-spec.md`
- Modify: `docs/specs/SPEC-09-security-rbac.md`
- Create: `docs/decisions/ADR-0009-cod-order-flow.md`
- Modify: `directus/bootstrap.mjs`
- Modify: `directus/rbac/permissions.mjs`
- Modify: `directus/rbac/roles.mjs`
- Create: `directus/sql/migrations/2026-08-19-add-cod-order-fields.sql`
- Create: `directus/sql/migrations/2026-08-19-add-order-status-history.sql`
- Modify: `directus/testing/verify_bootstrap.mjs`
- Modify: `directus/testing/rbac_verify.mjs`
- Modify: `frontend/src/lib/directus.ts`

**Interfaces:**
- Adds `orders.payment_method` with a fixed COD value, `orders.collection_status`, `orders.collected_at`, `orders.collected_by`, `orders.confirmed_at`, `orders.shipped_at`, `orders.delivered_at`, and `orders.completed_at`.
- Adds a new `order_status_history` collection with `order`, `from_status`, `to_status`, `note`, `changed_by`, and `changed_at`.
- Keeps `orders.status` as the domain lifecycle field and uses history rows for timeline/audit rendering.
- Updates Directus permissions so customer rows stay read-only for order lifecycle data, while Sales/Admin can CRUD orders, deliveries, invoices, and status history.

- [ ] **Step 1: Write the failing contract test**

Add a regression check in `directus/testing/rbac_verify.mjs` that asserts:
- Sales can create and update orders.
- Customers can read only their own orders and history rows.
- Customers cannot update order status or cash-collection fields.

- [ ] **Step 2: Run the verification and confirm the current model fails**

Run:
`cd directus && npm run rbac:verify`

Expected:
The new COD assertions fail because the schema and permissions do not yet expose the required fields and history collection.

- [ ] **Step 3: Implement the schema and permission changes**

Add the new fields and `order_status_history` collection in `directus/bootstrap.mjs`, the SQL migrations, and the RBAC definitions. Update the schema docs and the ADR so the COD flow is documented as the active ordering model, not a future payment integration.

- [ ] **Step 4: Run the Directus checks again**

Run:
`cd directus && npm run verify`
`cd directus && npm run rbac:verify`

Expected:
Both commands pass, and the new COD fields and history rows are present in the generated schema.

- [ ] **Step 5: Commit**

```bash
git add directus/docs/SCHEMA.md docs/specs/SPEC-03-data-model.md docs/specs/SPEC-04-api-spec.md docs/specs/SPEC-09-security-rbac.md docs/decisions/ADR-0009-cod-order-flow.md directus/bootstrap.mjs directus/rbac/permissions.mjs directus/rbac/roles.mjs directus/sql/migrations/2026-08-19-add-cod-order-fields.sql directus/sql/migrations/2026-08-19-add-order-status-history.sql directus/testing/verify_bootstrap.mjs directus/testing/rbac_verify.mjs frontend/src/lib/directus.ts
git commit -m "feat: add cod order schema"
```

### Task 2: Add the order submission BFF

**Files:**
- Create: `frontend/src/lib/order-submit.ts`
- Create: `frontend/src/lib/order-submit.test.ts`
- Create: `frontend/src/app/api/orders/route.ts`
- Modify: `frontend/src/lib/auth-helpers.ts`
- Modify: `frontend/src/lib/directus.ts`
- Modify: `frontend/package.json`

**Interfaces:**
- Exposes `submitCodOrder(input)` as the shared server-side helper for checkout submission.
- Accepts a validated payload with cart lines, recipient/contact fields, shipping address, note, and optional hub selection.
- Returns `{ orderId, orderCode }` on success and a normalized error envelope on validation or persistence failure.
- Creates `orders` and `order_items` only; fulfillment and invoice records are created later by Sales/Admin.

- [ ] **Step 1: Write the failing API/helper test**

Create `frontend/src/lib/order-submit.test.ts` with cases that cover:
- invalid cart lines are rejected,
- missing shipping/contact fields are rejected,
- a valid COD payload returns a created order code,
- line items are normalized into the stored order payload.

- [ ] **Step 2: Run the new test and confirm it fails**

Run:
`cd frontend && node --import tsx --test src/lib/order-submit.test.ts`

Expected:
The helper does not exist yet and the test fails.

- [ ] **Step 3: Implement the helper and route**

Add `submitCodOrder` in `frontend/src/lib/order-submit.ts` with Zod validation, authenticated Directus writes, and deterministic COD defaults:
- `payment_method = cash`
- `collection_status = pending`
- `status = pending`

Wire `frontend/src/app/api/orders/route.ts` to call the helper and return the created order code for redirect.
Append the new order tests to `frontend/package.json` so the standard frontend test command covers the COD flow.

- [ ] **Step 4: Run the helper/API test again**

Run:
`cd frontend && node --import tsx --test src/lib/order-submit.test.ts`

Expected:
The helper test passes and the route compiles with the new payload contract.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/lib/order-submit.ts frontend/src/lib/order-submit.test.ts frontend/src/app/api/orders/route.ts frontend/src/lib/auth-helpers.ts frontend/src/lib/directus.ts frontend/package.json
git commit -m "feat: add cod order submission api"
```

### Task 3: Replace the mock checkout with real order submission

**Files:**
- Modify: `frontend/src/components/cart/cart-client.tsx`
- Modify: `frontend/src/components/checkout/checkout-client.tsx`
- Modify: `frontend/src/app/[locale]/(main)/cart/page.tsx`
- Modify: `frontend/src/app/[locale]/(main)/checkout/page.tsx`
- Modify: `frontend/messages/vi.json`
- Modify: `frontend/messages/en.json`
- Modify: `frontend/messages/ja.json`
- Create: `test/ui/checkout-cod.spec.ts`

**Interfaces:**
- Checkout submits the cart to `POST /api/orders` instead of cycling fake success/failure modals.
- The UI clearly labels the flow as cash-on-delivery and removes payment-gateway language.
- Success redirects to the new confirmation view with the created order code.
- Error handling keeps the cart intact so the customer can retry.

- [ ] **Step 1: Write the failing UI test**

Create `test/ui/checkout-cod.spec.ts` to verify that:
- the checkout page shows COD copy,
- submitting a valid cart calls the order API,
- success clears the cart and redirects to order confirmation,
- validation errors stay on the page and preserve the cart.

- [ ] **Step 2: Run the UI test and confirm it fails**

Run:
`npx playwright test test/ui/checkout-cod.spec.ts`

Expected:
The test fails because checkout still uses mock modal logic.

- [ ] **Step 3: Replace the mock flow with the real submit flow**

Update `checkout-client.tsx` to:
- send the checkout payload to `/api/orders`,
- display a loading state while the order is being created,
- keep the submitted cart only until the API responds,
- clear local storage and redirect only after a successful response.

Update `cart-client.tsx` and the locale files so the CTA and summary copy say COD, not online payment.

- [ ] **Step 4: Run the UI test again**

Run:
`npx playwright test test/ui/checkout-cod.spec.ts`

Expected:
The checkout test passes and the flow no longer shows fake payment states.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/components/cart/cart-client.tsx frontend/src/components/checkout/checkout-client.tsx frontend/src/app/[locale]/(main)/cart/page.tsx frontend/src/app/[locale]/(main)/checkout/page.tsx frontend/messages/vi.json frontend/messages/en.json frontend/messages/ja.json test/ui/checkout-cod.spec.ts
git commit -m "feat: submit cod orders from checkout"
```

### Task 4: Build the Sales/Admin order management workspace

**Files:**
- Create: `frontend/src/app/[locale]/admin/orders/page.tsx`
- Create: `frontend/src/app/[locale]/admin/orders/actions.ts`
- Create: `frontend/src/components/admin/orders-client.tsx`
- Create: `frontend/src/components/admin/order-detail-modal.tsx`
- Modify: `frontend/src/components/admin/admin-sidebar.tsx`
- Modify: `frontend/src/lib/directus.ts`
- Modify: `frontend/messages/vi.json`
- Modify: `frontend/messages/en.json`
- Modify: `frontend/messages/ja.json`
- Create: `test/ui/admin-orders.spec.ts`

**Interfaces:**
- Adds a protected admin list page for `Sales/Admin` only.
- Supports filters for status, collection status, customer, hub, and date.
- Opens a detail view that shows order items, customer info, delivery info, invoice info, and the status history timeline.
- Exposes actions for `confirm order`, `mark shipped`, `mark delivered`, `mark cash collected`, `cancel order`, and `save internal note`.
- When Sales/Admin confirms an order, the action creates or updates the associated `deliveries` and `invoices` records if they do not yet exist.

- [ ] **Step 1: Write the failing admin UI test**

Create `test/ui/admin-orders.spec.ts` with scenarios for:
- filtering the list,
- opening a detail record,
- changing status,
- marking cash collected,
- blocking access for non-sales users.

- [ ] **Step 2: Run the UI test and confirm it fails**

Run:
`npx playwright test test/ui/admin-orders.spec.ts`

Expected:
The test fails because the admin orders workspace does not exist yet.

- [ ] **Step 3: Implement the admin workspace and actions**

Add the admin list page, detail modal, and server actions. Reuse the existing RFQ admin layout patterns so the new workspace fits the app. Ensure all status changes write an `order_status_history` row and keep the Directus data as the source of truth.

- [ ] **Step 4: Run the admin UI test again**

Run:
`npx playwright test test/ui/admin-orders.spec.ts`

Expected:
The admin orders test passes, and Sales/Admin can complete the COD workflow end to end.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/app/[locale]/admin/orders/page.tsx frontend/src/app/[locale]/admin/orders/actions.ts frontend/src/components/admin/orders-client.tsx frontend/src/components/admin/order-detail-modal.tsx frontend/src/components/admin/admin-sidebar.tsx frontend/src/lib/directus.ts frontend/messages/vi.json frontend/messages/en.json frontend/messages/ja.json test/ui/admin-orders.spec.ts
git commit -m "feat: add admin order management"
```

### Task 5: Make customer order pages read live order data

**Files:**
- Modify: `frontend/src/components/order-confirmation/order-confirmation-client.tsx`
- Modify: `frontend/src/app/[locale]/(main)/order-tracking/page.tsx`
- Modify: `frontend/src/components/order-tracking/order-tracking-client.tsx`
- Modify: `frontend/src/app/[locale]/(main)/order-tracking/payment-invoice/page.tsx`
- Modify: `frontend/src/components/payment-invoice/payment-invoice-client.tsx`
- Modify: `frontend/src/app/[locale]/(main)/order-tracking/delivery-confirmation/page.tsx`
- Modify: `frontend/src/components/delivery-confirmation/delivery-confirmation-client.tsx`
- Create: `frontend/src/lib/order-read.ts`
- Create: `frontend/src/lib/order-read.test.ts`
- Create: `frontend/src/app/api/orders/[code]/route.ts`
- Modify: `frontend/src/app/[locale]/(main)/payment-invoice/page.tsx`
- Modify: `frontend/src/app/[locale]/(main)/order-confirmation/page.tsx`

**Interfaces:**
- Confirmation, tracking, invoice, and delivery pages all read the order snapshot from the database instead of hard-coded demo values.
- The tracking lookup accepts an order code plus customer email or the authenticated customer session.
- The invoice page shows the real invoice record if present, or a clear "waiting to be issued" state if Sales/Admin has not created it yet.
- The delivery page shows the real fulfillment state and the current COD collection state.

- [ ] **Step 1: Write the failing read-model test**

Create `frontend/src/lib/order-read.test.ts` with cases that cover:
- an order lookup by code,
- a mismatch between code and customer email,
- a tracking record with no invoice yet,
- a tracking record after delivery and cash collection.

- [ ] **Step 2: Run the read-model test and confirm it fails**

Run:
`cd frontend && node --import tsx --test src/lib/order-read.test.ts`

Expected:
The shared read helper does not exist yet and the test fails.

- [ ] **Step 3: Implement the shared order read helper and public GET route**

Add `frontend/src/lib/order-read.ts` and `frontend/src/app/api/orders/[code]/route.ts` so customer pages can fetch the live order snapshot in a single, reusable place. Replace all hard-coded demo values in the confirmation, tracking, invoice, and delivery components with the live model.

- [ ] **Step 4: Run the read-model test again**

Run:
`cd frontend && node --import tsx --test src/lib/order-read.test.ts`

Expected:
The read helper test passes and the pages render real order data.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/app/[locale]/(main)/order-confirmation/page.tsx frontend/src/components/order-confirmation/order-confirmation-client.tsx frontend/src/app/[locale]/(main)/order-tracking/page.tsx frontend/src/components/order-tracking/order-tracking-client.tsx frontend/src/app/[locale]/(main)/order-tracking/payment-invoice/page.tsx frontend/src/components/payment-invoice/payment-invoice-client.tsx frontend/src/app/[locale]/(main)/order-tracking/delivery-confirmation/page.tsx frontend/src/components/delivery-confirmation/delivery-confirmation-client.tsx frontend/src/lib/order-read.ts frontend/src/lib/order-read.test.ts frontend/src/app/api/orders/[code]/route.ts frontend/src/app/[locale]/(main)/payment-invoice/page.tsx
git commit -m "feat: read live cod order pages"
```

### Task 6: Run end-to-end verification and tighten release notes

**Files:**
- Modify: `docs/guides/GUIDE-02-user-portal-guide.md`
- Modify: `docs/guides/GUIDE-01-cms-admin-guide.md`
- Modify: `docs/testing/TEST-02-test-cases.md`
- Modify: `docs/testing/TEST-03-uat-checklist.md`
- Modify: `docs/specs/SPEC-01-software-requirements.md`
- Modify: `docs/specs/SPEC-02-functional-spec.md`
- Modify: `docs/specs/SPEC-05-information-architecture.md`

**Interfaces:**
- Documents the new COD ordering flow for buyers, Sales, and Admins.
- Updates the test checklist to include cash collection and post-delivery status updates.
- Keeps the public product experience aligned with the portal behavior.

- [ ] **Step 1: Run the whole frontend test set**

Run:
`cd frontend && npm run test`

Expected:
The existing test suite passes, including the new order helper tests that were added to the script in Task 2.

- [ ] **Step 2: Run type and build checks**

Run:
`cd frontend && npm run typecheck`
`cd frontend && npm run build`

Expected:
TypeScript and the production build both pass after the order flow changes.

- [ ] **Step 3: Run the Directus verification again**

Run:
`cd directus && npm run verify`
`cd directus && npm run rbac:verify`

Expected:
The COD schema, status history, and permissions remain valid after the frontend integration work.

- [ ] **Step 4: Update the user-facing docs**

Add a short COD explanation to the portal and admin guides so operators know:
- customers place the order without online payment,
- Sales/Admin confirm delivery,
- Sales/Admin mark cash collected only after delivery is complete.

- [ ] **Step 5: Commit**

```bash
git add docs/guides/GUIDE-02-user-portal-guide.md docs/guides/GUIDE-01-cms-admin-guide.md docs/testing/TEST-02-test-cases.md docs/testing/TEST-03-uat-checklist.md docs/specs/SPEC-01-software-requirements.md docs/specs/SPEC-02-functional-spec.md docs/specs/SPEC-05-information-architecture.md
git commit -m "docs: add cod order operating guide"
```
