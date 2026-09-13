# Admin Dashboard Charts Implementation Plan

**Goal:** Make the admin dashboard more visual with a 30-day order/revenue trend, stock by hub, and order-status distribution.

**Architecture:** The server dashboard aggregates Directus data into compact chart datasets. A small client component renders responsive SVG/CSS charts without adding a chart dependency.

**Tech Stack:** Next.js 14, React, TypeScript, Tailwind CSS, SVG.

## Global Constraints

- Keep the existing compact Figma-inspired admin styling.
- Do not add a charting dependency.
- Missing or empty data must render an informative empty state.

### Task 1: Dashboard chart data and rendering

**Files:**
- Create: `frontend/src/components/admin/dashboard-charts.tsx`
- Modify: `frontend/src/app/[locale]/admin/page.tsx`
- Test: `frontend/src/lib/dashboard-charts.test.ts`

- [ ] Add pure helpers to aggregate orders by day, stock by hub, and order statuses.
- [ ] Add tests covering 30-day zero-filled trend and status/stock aggregation.
- [ ] Render responsive SVG line/bar/donut visualizations with tooltips via accessible labels.
- [ ] Query the required order and inventory fields in the dashboard page and pass normalized datasets to the client chart component.
- [ ] Run the focused tests, full test suite, `git diff --check`, and typecheck.
- [ ] Commit with `feat: add admin dashboard charts`.
