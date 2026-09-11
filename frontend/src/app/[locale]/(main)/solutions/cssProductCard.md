# Product Card CSS Structure

## Overview
Product Card component được thiết kế dựa trên Figma design, với responsive layout cho Desktop, Tablet, và Mobile.

---

## Component Hierarchy

```
├── Outer Container
│   └── bg-white rounded-[3px] border border-slate-200/50
│       ├── Link Wrapper
│       │   └── IMAGE SECTION
│       │       ├── image-wrap
│       │       │   ├── aspect-[4/3] (4:3 ratio)
│       │       │   ├── bg-gradient-to-b from-slate-100 to-slate-50
│       │       │   └── Image Component
│       │       │       └── object-cover group-hover:scale-105
│       │       │
│       │       └── BOTTOM INFO SECTION
│       │           ├── bottom-info (flex-1, flex flex-col gap-3)
│       │           │
│       │           ├── PRODUCT TITLE
│       │           │   ├── title3
│       │           │   └── h3
│       │           │       ├── text-body-small (mobile)
│       │           │       ├── sm:text-body-regular (tablet+)
│       │           │       ├── font-bold text-slate-900
│       │           │       ├── line-clamp-2
│       │           │       └── hover:text-blue-600
│       │           │
│       │           ├── PRICE INFO
│       │           │   ├── info-main
│       │           │   └── price-wrap
│       │           │       ├── price (bold, slate-900)
│       │           │       └── price-old (medium, slate-400)
│       │           │
│       │           ├── MOQ / STATUS INFO
│       │           │   ├── info-main
│       │           │   └── price-wrap
│       │           │       ├── price (semibold, slate-700)
│       │           │       └── price-old2 (medium, slate-500)
│       │           │
│       │           ├── LOCATION
│       │           │   ├── frame-1030
│       │           │   ├── MapPin icon
│       │           │   └── location text
│       │           │
│       │           └── ACTION BUTTONS
│       │               ├── frame-10302
│       │               ├── Order Button
│       │               │   ├── bg-blue-600 hover:bg-blue-700
│       │               │   └── flex-1
│       │               └── Bookmark / Save Button
│       │                   ├── bg-slate-50 (default)
│       │                   ├── bg-blue-50 (saved)
│       │                   └── Bookmark icon with fill toggle
```

---

## Responsive Breakpoints

### Mobile (< 640px)
```css
/* Padding */
p-4                    /* 16px padding */

/* Typography */
text-body-small       /* Smaller font for title */
text-caption-responsive /* Small captions */

/* Button sizing */
py-2                  /* 8px vertical padding */
p-2                   /* 8px padding on wishlist */

/* Gap spacing */
gap-4 sm:gap-5       /* 16px gap */
```

### Tablet (640px - 1023px)
```css
/* Padding */
sm:p-5                /* 20px padding */

/* Typography */
sm:text-body-regular  /* Regular font for title */
sm:text-body-small    /* Price text */

/* Button sizing */
sm:py-2.5            /* 10px vertical padding */
sm:p-2.5             /* 10px padding on wishlist */

/* Icon sizing */
sm:h-4 sm:w-4        /* Standard icon size */

/* Grid layout */
sm:grid-cols-2       /* 2 columns */
sm:gap-5             /* 20px gap */
```

### Desktop (1024px+)
```css
/* Grid layout */
lg:grid-cols-4       /* 4 columns */
lg:gap-6             /* 24px gap */

/* Smooth transitions */
transition-shadow
transition-transform
```

---

## Key CSS Classes

### Container
```css
.card-outer
  bg-white
  rounded-[3px]          /* 3px radius */
  border border-slate-200/50
  overflow-hidden
  hover:shadow-lg        /* Hover effect */
  transition-shadow
  duration-300
  h-full                 /* Full height in grid */
  flex flex-col
  group                  /* For child hover effects */
```

### Image Section
```css
.image-wrap
  relative
  w-full
  aspect-[4/3]          /* Fixed 4:3 ratio */
  overflow-hidden
  bg-gradient-to-b
  from-slate-100
  to-slate-50
  flex items-center justify-center
  group

.product-image
  object-cover
  group-hover:scale-105  /* Hover zoom */
  transition-transform
  duration-300
```

### Bottom Info Section
```css
.bottom-info
  flex-1               /* Takes remaining space */
  p-4 sm:p-5          /* Responsive padding */
  flex flex-col
  gap-3               /* Space between sections */
```

### Product Title
```css
.title3 > h3
  text-body-small sm:text-body-regular
  font-bold
  text-slate-900
  line-clamp-2         /* Max 2 lines */
  hover:text-blue-600  /* Hover color */
  transition-colors
```

### Price / MOQ Info
```css
.info-main
  /* Price line */
  .price
    text-caption-responsive sm:text-body-small
    font-bold
    text-slate-900
  
  .price-old
    text-caption-responsive
    font-medium
    text-slate-400
  
  /* MOQ line */
  .price (MOQ)
    text-caption-responsive
    font-semibold
    text-slate-700
  
  .price-old2
    text-caption-responsive
    font-medium
    text-slate-500
```

### Location Section
```css
.frame-1030
  flex items-center
  gap-2
  
  .location
    text-caption-responsive
    font-medium
    text-slate-600
  
  svg
    h-4 w-4
    text-slate-400
    shrink-0
```

### Action Buttons
```css
.frame-10302
  flex items-center
  gap-2
  mt-auto              /* Push to bottom */
  pt-3
  border-t border-slate-50

/* Order Button */
.button5
  flex-1              /* Takes available space */
  bg-blue-600
  hover:bg-blue-700
  text-white
  font-bold
  text-caption-responsive
  py-2 sm:py-2.5      /* Responsive height */
  rounded-[3px]
  transition-colors
  shadow-xs
  cursor-pointer

/* Wishlist Button */
.button6
  bg-slate-50
  hover:bg-slate-100
  border border-slate-200
  text-slate-400
  hover:text-red-500
  p-2 sm:p-2.5       /* Square button */
  rounded-[3px]
  transition-all
  cursor-pointer
  
  /* Active state */
  &.active
    bg-red-50
    border-red-200
    text-red-500
    hover:bg-red-100
```

---

## Color Palette

### Text Colors
- **slate-900**: Tiêu đề, giá (primary text)
- **slate-700**: MOQ (secondary text)
- **slate-600**: Location (tertiary text)
- **slate-500**: Status (muted text)
- **slate-400**: Unit, icons (light text)

### Background Colors
- **white**: Card background
- **blue-600**: Button/hover (primary)
- **slate-50**: Button backgrounds
- **red-50**: Wishlist active state
- **gradient-slate**: Image placeholder

### Border Colors
- **slate-200/50**: Card border (semi-transparent)
- **slate-50**: Divider line

---

## State Variations

### Default State
```css
border border-slate-200/50
hover:shadow-lg         /* Lift effect */
transition-shadow duration-300
```

### Image Hover
```css
.product-image
  group-hover:scale-105
  transition-transform duration-300
```

### Title Hover
```css
h3:hover
  text-blue-600
  transition-colors
```

### Wishlist Active
```css
.button6.active
  bg-red-50
  border-red-200
  text-red-500
  Heart icon with fill
```

### Button Hover
```css
.button5:hover
  bg-blue-700
  
.button6:hover
  bg-slate-100
  text-red-500
```

---

## Spacing Scales

### Padding
- **p-4** (mobile): 16px
- **sm:p-5** (tablet+): 20px

### Gap
- **gap-3**: 12px (info sections)
- **gap-4 sm:gap-5 lg:gap-6**: Grid gaps

### Border Radius
- **rounded-[3px]**: 3px (card, buttons)

### Typography Sizes
```
text-caption-responsive    12px (mobile), 13px (tablet+)
text-body-small           14px (mobile)
text-body-regular         16px (tablet+)
text-card-title           18px
```

---

## Accessibility Features

- **line-clamp-2**: Truncate long titles
- **group-hover**: Visual feedback on card hover
- **contrast**: High contrast colors (blue-600, slate-900)
- **Icon sizing**: h-4 w-4 for readability
- **Cursor pointer**: Clear clickable states

---

## Animation & Transitions

```css
/* Image zoom on hover */
group-hover:scale-105
transition-transform duration-300

/* Shadow lift on hover */
hover:shadow-lg
transition-shadow duration-300

/* Color transitions */
transition-colors

/* All transitions */
transition-all
```

---

## Usage Example

```tsx
<div className="bg-white rounded-[3px] border border-slate-200/50 overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col group">
  <Link href={productLink} className="flex flex-col h-full">
    
    {/* Image */}
    <div className="image-wrap relative w-full aspect-[4/3] overflow-hidden bg-gradient-to-b from-slate-100 to-slate-50 flex items-center justify-center group">
      <Image
        src={imageUrl}
        alt={name}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </div>

    {/* Info */}
    <div className="bottom-info flex-1 p-4 sm:p-5 flex flex-col gap-3">
      <h3 className="text-body-small sm:text-body-regular font-bold text-slate-900 line-clamp-2 hover:text-blue-600">
        {name}
      </h3>
      {/* ... pricing, location, buttons ... */}
    </div>
    
  </Link>
</div>
```

---

## Notes

- **Grid**: Responsive từ 1 col (mobile) → 2 col (tablet) → 3 col (md) → 4 col (desktop)
- **Image Ratio**: Cố định 4:3 với aspect-[4/3]
- **Flexbox**: Bottom-info dùng flex-1 để push buttons xuống dưới
- **Hover Effects**: Dùng group class để trigger child elements
- **Accessibility**: Đủ contrast, clear clickable areas

