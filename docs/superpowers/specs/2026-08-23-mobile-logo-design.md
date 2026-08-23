# Mobile Design Spec: Partners & Certifications

This document specifies the design changes to make the **Partners & Certifications** component mobile-responsive, addressing the currently hidden parts (Row 2 and ISO Certifications) on viewports smaller than `sm` (640px).

## Goal
Ensure a premium, dynamic, and fully responsive experience on mobile viewports for the Partners & Certifications section.

## User Requirements & Choice
* **Partner Logos**: Double-row infinite marquee (auto-scroll) to display all 12 partner logos without cluttering the screen or requiring manual swiping.
* **ISO block**: Stacked layout featuring the title and description card at the top, followed by a 2x2 grid below for the 4 certificates.

---

## Detailed Design

### 1. Partner Logos Section
* **Desktop (`>= 640px`)**: Keep the current layout of 2 manual-scrolling rows (or grid-like rows with hover interactions).
* **Mobile (`< 640px`)**:
  * Combine the logos into two distinct tracks:
    * **Row 1**: Samsung, Canon, Panasonic, IBM, Traphaco, Coca-Cola
    * **Row 2**: VinFast, LG, Amkor, Vinamilk, 3M, BYD
  * Render each track as an infinite horizontal marquee:
    * **Row 1** scrolls from right to left.
    * **Row 2** scrolls from left to right.
  * Duplicate the arrays in code to create a seamless looping effect when translated by `-50%` horizontally.
  * Implement custom CSS keyframe animations for `.animate-marquee-left` and `.animate-marquee-right` in Tailwind or global styles.
  * Logo cards size on mobile: `w-[140px] h-[80px]` with flex alignment, white background, and standard border.
  * Apply a horizontal linear gradient fade mask to the marquee viewport edges:
    ```css
    mask-image: linear-gradient(to right, transparent, white 10%, white 90%, transparent)
    ```

### 2. Certifications & ISO Standards Section
* **Desktop (`>= 640px`)**: Keep current horizontal single-row flex layout.
* **Mobile (`< 640px`)**:
  * Display a unified title card on top (full width).
  * Render a `grid grid-cols-2 gap-2` containing the 4 certificates:
    * **Col 1**: ISO 9001:2015
    * **Col 2**: SGS
    * **Col 3**: RoHS Compliant
    * **Col 4**: MSDS
  * Card size on mobile: `h-[100px] flex items-center justify-center p-4 bg-white border border-gray-100 rounded shadow-sm`.
  * Ensure images are contained properly inside the card frames using `object-contain`.

---

## Verification Plan

### Manual Verification
1. Open the home page (`/`) on mobile viewport using Chrome/Edge DevTools responsive mode (e.g. 375px/390px/430px wide).
2. Verify that Row 1 and Row 2 of Partner Logos auto-scroll continuously in opposite directions.
3. Verify that the ISO block is fully visible, showing a top card for text followed by a 2x2 grid of certificate images below it.
4. Test hover/click effects on both mobile and desktop sizes.
