# Design Guidelines & CSS System (ULink B2B Platform)

> **Foundational design system configuration for ULink B2B platform: design principles, color palette, typography, spacing scale, border radius standards, responsive grid, visual effects, and component specifications (Extracted from Getting Started, Design Foundations, Component Overview & Button Specs).**

---

## 0. Core Principles (Getting Started Principles)

> *This Design System serves as the universal reference for the ULink Industries website and digital products. Always prioritize semantic tokens and component instances over raw hex colors or custom ad-hoc cards.*

### 04 Mandatory Usage Rules:

1. **Semantic First**:
   - Always use semantic tokens for colors: `color/bg`, `color/text`, and `color/border` in components (`bg-background`, `text-foreground`, `border-border`, `bg-brand`).
   - DO NOT hardcode raw Hex color values directly inside component JSX/TSX.
2. **Components over Copies**:
   - Utilize existing UI Component instances (`.ui-btn`, `.ui-surface`, `.ui-input`) and customize via component properties/variants.
   - DO NOT detach components or build duplicate custom cards/buttons unless strictly necessary.
3. **Industrial Clarity**:
   - Prioritize clear visual hierarchy, generous whitespace, and easily scannable content for B2B procurement managers and industrial clients.
4. **Accessible by Default**:
   - **Minimum Touch Target of 44px** for all interactive areas (buttons, form inputs).
   - Clear focus indicators (`focus-visible:ring-2 focus-visible:ring-brand`) and compliant contrast ratios per WCAG standards.

---

### UI Development Workflow
`Start from Foundations` → `Select Component` → `Configure Properties / Variants` → `Verify Light/Dark & Contrast before Handoff.`

---

## 1. Color Palette (Colors)

### 1.1. Brand & Accent Palette
- **Brand Main (ULink Blue)**: `#1769E2` (`hsl(214 78% 49%)`) — Primary brand color for main CTAs, primary buttons, links, and key accents.
- **Brand Dark Navy**: `#1A2D49` (`hsl(210 49% 19%)`) — Background for Header, Navbar, and Primary Headings.
- **Brand Hover**: `#1257BD` (`hsl(214 78% 41%)`) — Hover state for primary buttons.
- **Brand Active**: `#0E4497` (`hsl(214 78% 32%)`) — Click/Pressed state for primary buttons.
- **Brand Light Tint**: `#EBF3FE` (`hsl(214 100% 96%)`) — Highlight background, selected row background, message/notification badges.

### 1.2. Neutral & Surface
- **Background Main**: `#FFFFFF` (`hsl(0 0% 100%)`) — Main page background and primary card surfaces.
- **Surface Muted**: `#F8FAFC` (`hsl(210 40% 98%)`) — Secondary section background, admin panel wrapper, input/textarea background.
- **Industrial Silver (Border)**: `#B8C0CC` (`hsl(216 16% 76%)`) — Card border, form input border, table divider line.
- **Deep Onyx (Text Primary)**: `#141414` (`hsl(0 0% 8%)`) — Standard body text color across all UI text.
- **Muted Text (Slate)**: `#64748B` (`hsl(215 16% 47%)`) — Secondary text, descriptions, captions, placeholders.

### 1.3. Functional / Semantic Colors
- **Success (Green)**: `#22C55E` — Success status, in-stock indicator, order confirmed.
- **Warning (Amber/Orange)**: `#F59E0B` — Pending approval status, low stock alert, warnings.
- **Danger (Red)**: `#EF4444` — System errors, order cancellation, delete action, out of stock.

---

## 2. Typography Guidelines

### 2.1. Font Families
- **Primary UI Font (Headings & Body)**: `Archivo` — applied globally via `--font-sans` CSS variable. Use `font-sans` class.
- **Monospace Font (Code, SKU, Pricing, Data Tables)**: `Archivo` (same font — use `font-mono` for semantic distinction only, renders as Archivo).

### 2.2. Typography Hierarchy

| Level | Mobile (<640px) | Tablet (640-1024px) | Desktop (>1024px) | Font Weight | Primary Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display / H1** | `28px` / `1.2` | `36px` / `1.2` | `48-52px` / `1.12` | `Extrabold (800)` | Hero title, Main Page Title |
| **H2** | `20-22px` / `1.3` | `24-26px` / `1.3` | `28-32px` / `1.3` | `Extrabold (800)` | Section title, Category title |
| **H3** | `16-18px` / `1.4` | `18-20px` / `1.4` | `22-24px` / `1.4` | `Bold (700)` | Card title, Modal title |
| **H4** | `15-16px` / `1.4` | `16-18px` / `1.4` | `18-20px` / `1.4` | `Semibold (600)` | Sub-section title, Widget header |
| **Body Large / Lead** | `14-15px` / `1.5` | `15-16px` / `1.5` | `16-18px` / `1.5` | `Medium (500)` | Intro paragraph, lead text, Hero description |
| **Body Base** | `13-14px` / `1.5` | `14px` / `1.5` | `14-15px` / `1.5` | `Regular (400)` | Standard body content |
| **Body Small** | `12px` / `1.4` | `12-13px` / `1.4` | `13-14px` / `1.4` | `Regular (400)` / `Medium (500)` | Description, footnote, timestamp |
| **Eyebrow / Label** | `11-12px` / `1.2` | `12-13px` / `1.2` | `13px` / `1.2` | `Bold (700)` + `UPPERCASE` | Category label, section tag |
| **Mono Code / SKU** | `12-13px` | `13-14px` | `14px` | `Medium (500)` (IBM Plex Mono) | SKU, Order ID, Price table |

### 2.3. Responsive Font Size Pattern
Apply responsive font sizes using Tailwind breakpoints in this order:

```
text-{mobile} sm:text-{tablet} lg:text-{desktop}
```

Examples:
- **H1 Hero**: `text-[28px] sm:text-[36px] md:text-[44px] lg:text-[50px] xl:text-[52px]`
- **H2 Section**: `text-[22px] sm:text-[26px] lg:text-[30px]`
- **H3 Card**: `text-[16px] sm:text-[18px] lg:text-[22px]`
- **Body Large**: `text-[14px] sm:text-[15px] lg:text-[16px]`
- **Body Base**: `text-[13px] sm:text-[14px]`
- **Eyebrow**: `text-[11px] sm:text-[12px] lg:text-[13px]`

---

## 3. Spacing & Radius System

### 3.1. Spacing Scale (Tailwind Spacing Scale)
Based on an **8-point / 4-point grid system**:
- `2px` (`space-0.5`) | `4px` (`space-1`) | `8px` (`space-2`) | `12px` (`space-3`)
- `16px` (`space-4`) | `20px` (`space-5`) | `24px` (`space-6`) | `32px` (`space-8`)
- `40px` (`space-10`) | `48px` (`space-12`) | `64px` (`space-16`) | `80px` (`space-20`)

### 3.2. Strict Border Radius Rule (3px or Square)
> **Core Border Radius Rule**: All rounded elements across the UI strictly use a uniform **`3px`** radius (`rounded-[3px]`). Any element that is not rounded MUST remain completely **`0px` square** (`rounded-none`). No other arbitrary intermediate radius scale (2px, 4px, 8px, 12px) is permitted.

- **`3px` (`radius-base / Standard`)**: Uniformly applied to ALL rounded UI elements including **Action Buttons (`Button`), Product Cards (`Product Card`), Form Fields (`Input / Select / Textarea`), Modals, Badges, & Panels**.
- **`0px` (`rounded-none / Square`)**: Applied to all elements specified to have sharp, unrounded industrial corners.

---

## 4. Responsive Grid System

- **Mobile (`<640px` - `sm`)**:
  - Grid: `4 Columns`
  - Margin Padding: `16px` (`px-4`)
  - Gap: `16px` (`gap-4`)
- **Tablet (`640px - 1024px` - `md` / `lg`)**:
  - Grid: `8 Columns`
  - Margin Padding: `24px - 32px` (`px-6 sm:px-8`)
  - Gap: `20px - 24px` (`gap-5 lg:gap-6`)
- **Desktop (`>1024px` - `xl` / `2xl`)**:
  - Grid: `12 Columns`
  - Max Width Container: `1440px` (`max-w-[1440px]`)
  - Margin Padding: `64px` (`lg:px-16`)
  - Gap: `24px - 32px` (`gap-6 lg:gap-8`)

### 4.1. Standard Page Container Padding (Khung lề tiêu chuẩn cho các Section)
Toàn bộ các Section nội dung trên trang chủ và trang con (trừ các phần đặc biệt có banner nền tràn màn hình như Hero Banner) bắt buộc phải bọc nội dung trong một Container tiêu chuẩn sau để đảm bảo căn thẳng hàng lề 2 bên một cách chính xác tuyệt đối trên mọi loại thiết bị:

```html
<section className="w-full ...">
  <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16">
    <!-- Nội dung của Section -->
  </div>
</section>
```

**Quy chuẩn lề tương ứng:**
* **Mobile (< 640px):** Lề `16px` (`px-4`)
* **Tablet (>= 640px):** Lề `32px` (`sm:px-8`)
* **Laptop (>= 1024px):** Lề `48px` (`lg:px-12`)
* **Desktop (>= 1280px):** Lề `64px` (`xl:px-16`)
* **Màn hình cực rộng (> 1440px):** Nội dung dừng giãn ở chiều rộng tối đa `1440px` (`max-w-[1440px]`) và tự động căn giữa (`mx-auto`).

---

## 5. Visual Effects & Interactive States

### 5.1. Box Shadows
- **`Shadow Sm`**: `0 1px 2px 0 rgba(0, 0, 0, 0.05)` — Resting state for Product Cards and Form Elements.
- **`Shadow Md`**: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)` — Hover state for Cards, Dropdown menus, Popovers.
- **`Shadow Lg`**: `0 10px 15px -3px rgba(0, 0, 0, 0.1)` — Modal dialogs, Sidebar drawers.

### 5.2. Focus Ring & Transitions
- **Focus Outline**: 2px focus outline in Brand Blue `#1769E2`: `focus-visible:ring-2 focus-visible:ring-[#1769E2] focus-visible:outline-none`.
- **Touch Target Minimum**: Minimum height for all interactive elements is **`44px`** (`min-h-[44px]` / `py-2.5`).
- **Transitions**: Smooth state transitions using `transition-colors duration-200 ease-in-out`.

---

## 6. Component Specification: ULink Button Library Spec

> **Component Action Button**: Used for primary and secondary actions in B2B user experience. `Primary` style is reserved for the single highest priority action per viewport; `Secondary` and `Ghost` styles reduce visual emphasis.

### 6.1. Sizes
- **Size M (Medium)**: Height `44px` (`h-[44px]` / `py-2.5 px-4`). Touch target compliant `≥44px`.
- **Size L (Large)**: Height `52px` (`h-[52px]` / `py-3.5 px-6`). Used for Hero CTAs and main Checkout forms.

### 6.2. Styles
- **Primary**: Solid Brand Blue `#1769E2` (`bg-brand`), white text (`text-white`), border radius `3px`. Only 1 Primary button allowed per main viewport section.
- **Secondary**: White background (`bg-white`), Brand/Silver border (`border border-brand` or `border-border`), Brand Blue text (`text-[#1769E2]`).
- **Ghost**: Transparent background (`bg-transparent`), Brand Blue text (`text-[#1769E2]`), used for inline link actions or subtle secondary interactions.

### 6.3. Button State Matrix (Variant Matrix - 24 Variants)

| Variant Row | Default State | Hover State | Pressed (Active) State | Disabled State |
| :--- | :--- | :--- | :--- | :--- |
| **Size M · Primary** | `bg-[#1769E2] text-white` | `bg-[#1257BD]` (arrow slides right) | `bg-[#0E4497]` | `opacity-60 pointer-events-none` |
| **Size M · Secondary** | `bg-white border border-[#1769E2] text-[#1769E2]` | `bg-[#EBF3FE]` (light blue tint bg) | `bg-[#D6E6FE] text-[#0E4497]` | Faded border & text `opacity-50` |
| **Size M · Ghost** | `bg-transparent text-[#1769E2]` | `bg-[#EBF3FE]` (light blue tint bg) | `bg-[#D6E6FE] text-[#0E4497]` | Faded text `opacity-50` |
| **Size L · Primary** | `h-[52px] bg-[#1769E2] text-white` | `bg-[#1257BD]` (arrow slides right) | `bg-[#0E4497]` | `opacity-60 pointer-events-none` |
| **Size L · Secondary** | `h-[52px] bg-white border border-[#1769E2]` | `bg-[#EBF3FE]` | `bg-[#D6E6FE] text-[#0E4497]` | Faded border & text `opacity-50` |
| **Size L · Ghost** | `h-[52px] bg-transparent text-[#1769E2]` | `bg-[#EBF3FE]` | `bg-[#D6E6FE] text-[#0E4497]` | Faded text `opacity-50` |

### 6.4. Accessibility & Icons
- **Touch Target**: All button variants strictly adhere to height $\ge 44px$.
- **Action Arrow Icon**: Arrow `→` smoothly translates right upon `Hover` (`group-hover:translate-x-0.5`).
- **Labeling**: Button labels must explicitly describe the action (e.g., `"View Details →"`, `"Request Quote"`).

---

## 7. Card Hover Effects (Standard)

> **Standard hover effect for ALL cards, metrics, testimonial cards, and interactive surfaces across the platform.**

### 7.1. Core Card Hover Pattern (No Image — Border Glow Only)
Cards **without images** use this exact Tailwind class combination:

```
group transition-all duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)]
```

- **`group`** — Enables child element hover styling via `group-hover:*`
- **`transition-all duration-200`** — Smooth 200ms transition on all properties
- **`hover:-translate-y-1`** — Card lifts 4px upward on hover
- **`hover:scale-[1.02]`** — Card scales up 2% for subtle pop effect
- **`hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)]`** — Brand blue (#1769E2) border glow

### 7.2. Card Hover Pattern (With Image — Border Glow + Image Overlay)
Cards **with images** use core pattern + image overlay:

**Card wrapper:**
```
group transition-all duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)]
```

**Image overlay (inside image container, sibling of `<Image>`):**
```html
<div className="absolute inset-0 bg-gradient-to-t from-[#1769E2]/40 to-[#1769E2]/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
```

**Image zoom:**
```
group-hover:scale-105
```

### 7.3. Icon Container Enhancement
Icon wrapper inside card MUST add:

```
group-hover:shadow-sm
```

### 7.4. Child Color Transitions
Text & icon elements inside the card use:

```
transition-colors duration-200 group-hover:text-{color}-{shade}
```

### 7.5. Example — No Image (Tailwind)
```html
<div className="group transition-all duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)] p-6 flex items-center gap-4 hover:bg-blue-50/80 cursor-default rounded-[3px]">
  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg transition-colors duration-200 group-hover:bg-blue-100 group-hover:shadow-sm">
    <FileText className="h-[28px] w-[28px] text-brand transition-colors duration-200 group-hover:text-blue-700" />
  </div>
  <div>
    <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider transition-colors duration-200 group-hover:text-blue-600">
      Label
    </p>
    <span className="text-[20px] font-bold text-brand transition-colors duration-200 group-hover:text-blue-700">
      Value
    </span>
  </div>
</div>
```

### 7.6. Example — With Image (Tailwind)
```html
<Link className="group flex flex-col overflow-hidden rounded-[3px] border border-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)]">
  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
    <Image src={image} alt="" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
    <div className="absolute inset-0 bg-gradient-to-t from-[#1769E2]/40 to-[#1769E2]/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
  </div>
  <div className="p-5">
    <h3 className="font-bold text-slate-900 group-hover:text-brand transition-colors">Title</h3>
  </div>
</Link>
```
