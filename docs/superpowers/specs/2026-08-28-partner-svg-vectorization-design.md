# Design Spec: Vectorization of Partner_1.svg

Recreate the partner/certification logo stripe (`Partner_1.svg`) with 100% clean, high-resolution vector paths instead of embedding compressed raster images. This dramatically improves clarity, sharpness (nét), and reduces page load sizes in the footer marquee.

## 1. Logo Sequence Analysis
The original `Partner_1.svg` collage consists of 6 logos arranged in the following order:
1. **Samsung** (original file: `Samsung-Logo-Blue.jpg`)
2. **Canon** (original file: `logo canon.png`)
3. **Panasonic** (original file: `panasonic-logo-.jpg`)
4. **IBM** (original file: `logo-ibm-vector-06.jpg`)
5. **Traphaco** (original file: `9383_Traphaco.png`)
6. **Coca-Cola** (original file: `coca-cola-logo.jpg`)

## 2. Proposed Vector Sources
- **Samsung**: Wikimedia Commons official vector logo (clean blue `#1428a0` text wordmark).
- **Canon**: Official vector logo (red `#E30613` text wordmark).
- **Panasonic**: Official vector logo (blue `#0a2240` wordmark).
- **IBM**: Official 8-bar blue vector logo (`#1f70c1`).
- **Traphaco**: High-resolution image mask extracted from the official CDN and traced using OpenCV contour detection (`cv2.findContours` + `cv2.approxPolyDP` for smooth bezier approximations) filled with Traphaco green `#11934f`.
- **Coca-Cola**: Official Coca-Cola script vector path in brand red `#e61d2b`.

## 3. Layout and Grid Specifications
- **Master SVG Dimensions**: 1280px width, 138px height.
- **Columns**: 6 background white rectangles of 212px width each, separated by 1px gaps (matching the layout of the original SVG).
- **Proportional Centering**: Each logo is embedded using a nested `<svg>` element with a specific `viewBox` and `preserveAspectRatio="xMidYMid meet"`, positioned exactly at the center of its 212px column width and 138px column height:
  - **Samsung**: Width 150px, height 23px, y = 57, x = 31
  - **Canon**: Width 120px, height 25px, y = 56, x = 259
  - **Panasonic**: Width 150px, height 23px, y = 57, x = 457
  - **IBM**: Width 120px, height 45px, y = 46, x = 685
  - **Traphaco**: Width 140px, height 26px, y = 56, x = 888
  - **Coca-Cola**: Width 140px, height 44px, y = 47, x = 1101

## 4. Verification Plan
- **XML Validation**: Verify the final SVG compiles and parses cleanly without namespace errors.
- **Visual Display**: Validate scale, alignment, and responsiveness in the browser marquee.
