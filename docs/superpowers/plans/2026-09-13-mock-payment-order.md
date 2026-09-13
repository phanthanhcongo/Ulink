# Mock Payment to Order Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make checkout create a real confirmed order and order items after a simulated successful payment.

**Architecture:** Add a server-side Next.js `/api/orders` endpoint that validates checkout input and writes `orders` and `order_items` through the existing Directus helpers. Update checkout to call the endpoint and only clear the local RFQ cart after a successful response.

**Tech Stack:** Next.js App Router, TypeScript, Directus SDK, Zod, Vitest.

## Global Constraints

- Payment is simulated and always succeeds only after order creation succeeds.
- Guests must provide full name, email, phone, and address.
- New orders use status `confirmed`.
- Do not add a real payment gateway, account creation, inventory decrement, or ERP side effect.

### Task 1: Order payload and server endpoint

**Files:**
- Create: `frontend/src/lib/order-submit.ts`
- Create: `frontend/src/lib/order-submit.test.ts`
- Create: `frontend/src/app/api/orders/route.ts`

- [ ] Write failing tests for mapping a valid payload to one order and its order items, and rejecting an empty cart or missing guest fields.
- [ ] Run `npm test -- order-submit.test.ts` and verify the new tests fail because the submit logic does not exist.
- [ ] Implement a typed `submitOrder` service using injected Directus create functions; serialize contact/delivery/payment details into `orders.notes`, set status `confirmed`, then create each `order_items` row.
- [ ] Add `POST /api/orders` to parse JSON, call the service with the existing Directus client, and return `{ data: { id, code } }` or a 4xx/5xx error response.
- [ ] Run the focused tests and verify they pass.

### Task 2: Connect checkout to order creation

**Files:**
- Modify: `frontend/src/components/checkout/checkout-client.tsx`
- Test: `frontend/src/lib/order-submit.test.ts`

- [ ] Add a failing test for the checkout submission contract: successful API response returns an order id and failed API response does not clear the cart.
- [ ] Run the focused test and verify it fails for the current mock click-count behavior.
- [ ] Replace the click-count modal simulation with an async request to `/api/orders`, including cart lines, buyer data, shipping method, payment method, and calculated totals.
- [ ] Keep the cart on API failure, set an error message, and clear/persist an empty cart only after success; redirect with the returned order id.
- [ ] Run unit tests and the relevant frontend typecheck/lint command from `frontend/package.json`.

### Task 3: Confirmation and regression verification

**Files:**
- Modify: `frontend/src/app/[locale]/(main)/order-confirmation/page.tsx` only if needed to display the returned order code.
- Modify: `frontend/messages/vi.json`, `frontend/messages/en.json`, `frontend/messages/ja.json` only if new error/loading copy is required.

- [ ] Verify the order confirmation route accepts the order id query parameter without breaking its existing rendering.
- [ ] Run the focused unit tests, frontend typecheck, and the existing RFQ/order UI tests if available.
- [ ] Inspect `git diff` to confirm unrelated user changes remain untouched.
- [ ] Commit only the feature files with `feat: create order after mock payment`.
