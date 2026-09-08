# So Sánh CSS Layout & UI/UX: Figma vs React Component

## 📊 Tóm Tắt So Sánh

### ✅ Điểm Giống Nhau
- Font family: Archivo (Figma) vs hệ thống (React)
- Font weights: Semibold (600) / Medium (500) / Regular (400) được áp dụng tương tự
- Border radius: 3px (Figma `border-radius-xs`) được dùng cho button, input
- Màu sắc: #1769e2 (Brand Blue), #f5f8fc (Surface), #10b981 (Success Green)
- Layout 3-column: Left (Image) | Center (Info) | Right (Sidebar)
- Component hierarchy: Price → Attributes → Quantity → Discount Table → Total

### ⚠️ Điểm Khác Biệt Chính

---

## 1️⃣ TYPOGRAPHY (Phông Chữ)

### Figma Design (Desktop)
```css
.price-currency {
  font-size: 28px;           /* Heading H3 */
  font-weight: 600;
  line-height: 36px;
}

.price-unit {
  font-size: 20px;           /* Heading H4 */
  font-weight: 600;
  line-height: 28px;
}

.size-title {
  font-size: 14px;           /* Label M */
  font-weight: 600;
  line-height: 20px;
}

.tax-info {
  font-size: 12px;           /* Label S */
  font-weight: 600;
  line-height: 16px;
}
```

### React Component (Desktop - lg breakpoint)
```jsx
// Price Display
<span className="text-[24px] font-bold">
  {/* Heading thực: 24px, expected: 28px */}

<span className="text-[16px] font-medium">
  {/* Price unit: 16px, expected: 20px */}

// Label
<p className="text-[14px] font-bold">
  {/* Size title: 14px ✅ Match */}

<p className="text-[14px] font-medium">
  {/* Tax info: 14px, expected: 12px */}
```

### Bảng So Sánh Chi Tiết

| Component | Figma (Desktop) | React (lg) | Responsive |
|-----------|-----------------|-----------|------------|
| **Price** | 28px, weight:600 | 24px, weight:700 | 20→22→24px |
| **Price Unit** | 20px, weight:600 | 16px, weight:500 | 14→15→16px |
| **Label (Title)** | 14px, weight:600 | 14px, weight:700 | 12→13→14px ✅ |
| **Label (Secondary)** | 12px, weight:600 | 14px, weight:500 | 12→13→14px ⚠️ |
| **Button Text** | 14px, weight:600 | 15px, weight:700 | 13→14→15px |

---

## 2️⃣ SPACING & GAPS

### Figma Design
```css
.right-column-sidebar {
  padding: 24px;              /* All sides */
  gap: 20px;                  /* Between sections */
}

.price-block {
  gap: 4px;                   /* Between price & unit */
}

.size-picker {
  gap: 8px;                   /* Between title & options */
}

.size-options {
  gap: 8px;                   /* Between size buttons */
}

.discount-table {
  gap: 0px;                   /* No gap between rows */
}
```

### React Component
```jsx
<div className="space-y-6">       {/* 24px gap */}
  <div className="space-y-1.5">  {/* 6px gap */}
  <div className="space-y-2.5">  {/* 10px gap */}
  <div className="space-y-3">    {/* 12px gap */}
  
{/* Tailwind space-y classes */}
// space-y-6 = 1.5rem = 24px ✅ Match
// space-y-2.5 = 0.625rem = 10px ⚠️ (Figma: 8px)
// space-y-1.5 = 0.375rem = 6px ⚠️ (Figma: 4px)
```

### Bảng Spacing

| Element | Figma | React (Tailwind) | Điều Chỉnh |
|---------|-------|-----------------|-----------|
| Sidebar padding | 24px | space-y-6 (24px) ✅ | ✅ Match |
| Price block gap | 4px | space-y-1.5 (6px) | -2px |
| Size picker gap | 8px | space-y-2.5 (10px) | +2px |
| Section gap | 20px | space-y-6 (24px) | +4px |
| Row divide | 0px | divide-y-0 | ✅ Match |

---

## 3️⃣ BUTTON & INPUT SIZING

### Figma Design (Price Sidebar Buttons)

#### Attribute/Size Buttons
```css
.size-btn-s, .size-btn-m-active, .size-btn-l {
  width: 48px;
  height: 32px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
}

.size-btn-m-active {
  border: 2px solid #1769e2;
  background: #f5f8fc;
}

.size-btn-s {
  border: 1px solid #dce0e5;
  background: #ffffff;
}
```

#### Quantity Selector
```css
.quantity-picker {
  display: flex;
  gap: 8px;
  align-items: center;
}

.decrement, .increment {
  width: 32px;
  height: 32px;
  border: 1px solid #dce0e5;
  border-radius: 4px;
}

.qty-val {
  font-size: 16px;
  font-weight: 600;
  text-align: center;
}
```

### React Component

#### Attribute Buttons
```jsx
<button className={cn(
  'px-3.5 py-2 text-[12px] sm:text-[13px] lg:text-[14px] rounded-[3px]',
  isSelected
    ? 'border-2 border-[#1769e2] bg-white text-[#1769e2] font-bold'
    : 'border border-slate-200 bg-white text-slate-700 font-medium'
)}>
  {/* 
    Width: auto (flex-based) vs Figma: 48px fixed
    Height: py-2 (16px) vs Figma: 32px
    Border radius: 3px ✅ vs Figma: 4px ⚠️
  */}
</button>

{/* Quantity Input */}
<div className="flex items-center w-full bg-white rounded-[3px] border border-slate-200">
  <button className="w-10 sm:w-11 h-9 sm:h-10">
    {/* 
      Mobile: 40px × 36px vs Figma: 32px × 32px
      Tablet: 44px × 40px vs Figma: 32px × 32px
    */}
  </button>
</div>
```

### Bảng Button Sizing

| Component | Figma | React (Mobile) | React (Tablet) | React (Desktop) | Status |
|-----------|-------|---|---|---|---|
| Size Button - Width | 48px | auto | auto | auto | ⚠️ Flexible |
| Size Button - Height | 32px | py-2 (16px) | py-2 (16px) | py-2 (16px) | ⚠️ Smaller |
| Qty Button - Width | 32px | w-10 (40px) | w-11 (44px) | w-11 (44px) | ⚠️ Larger |
| Qty Button - Height | 32px | h-9 (36px) | h-10 (40px) | h-10 (40px) | ⚠️ Larger |
| Button Border Radius | 4px | 3px | 3px | 3px | ⚠️ Smaller |

---

## 4️⃣ COLORS & BACKGROUNDS

### Figma Design
```css
/* Sidebar Background */
.right-column-sidebar {
  background: #f5f8fc;            /* Color Surface */
  border: 1px solid #dce0e5;      /* Border Default */
  border-radius: 8px;
}

/* Active State */
.size-btn-m-active {
  background: #f5f8fc;
  border: 2px solid #1769e2;
  color: #1769e2;
}

/* Discount Table Active Row */
.tier-row-highlight {
  background: rgba(234, 243, 255, 0.5);  /* #eaf3ff/50 */
  color: #1769e2;
}

/* Success Indicator */
.green-dot {
  background: #10b981;
  width: 8px;
  height: 8px;
}

.stock-status {
  color: #10b981;
}
```

### React Component
```jsx
{/* Sidebar Background */}
<div className="bg-[#F5F8FC] border border-slate-200/80 rounded-[3px]">
  {/* ✅ Color match: #F5F8FC */}
  {/* ⚠️ Border radius: 3px vs Figma: 8px */}

{/* Active Button State */}
<button className="border-2 border-[#1769e2] bg-white text-[#1769e2]">
  {/* ⚠️ Background: white vs Figma: #f5f8fc */}

{/* Active Discount Tier */}
<div className="bg-[#eaf3ff]/80">
  {/* ✅ Color match: #eaf3ff/80 */}

{/* Success Indicator */}
<span className="h-2 w-2 rounded-full bg-emerald-500">
  {/* ⚠️ Size: 8px vs Figma: 8px ✅ */}
  {/* ⚠️ Color: emerald-500 vs Figma: #10b981 (tương tự) */}
```

### Bảng Colors

| Element | Figma | React | Status |
|---------|-------|-------|--------|
| Sidebar BG | #f5f8fc | #F5F8FC | ✅ Match |
| Active Button BG | #f5f8fc | white | ⚠️ Mismatch |
| Active Button Border | #1769e2 | #1769e2 | ✅ Match |
| Discount Active BG | #eaf3ff/50 | #eaf3ff/80 | ⚠️ Opacity |
| Success Green | #10b981 | emerald-500 | ✅ Match |
| Border Default | #dce0e5 | slate-200 | ⚠️ Close |

---

## 5️⃣ BORDER RADIUS

### Figma Design
```css
.right-column-sidebar {
  border-radius: 8px;         /* Radius MD */
}

.size-btn-s, .size-btn-m, .size-btn-l {
  border-radius: 4px;         /* Radius XS */
}

.main-image-frame, .thumb-active {
  border-radius: 4px;         /* Radius XS */
}

.feature-badge {
  border-radius: 3px;         /* Radius XS - mỏng */
}
```

### React Component
```jsx
<div className="bg-[#F5F8FC] border border-slate-200/80 rounded-[3px]">
  {/* Sidebar: 3px vs Figma: 8px ⚠️ */}

<button className="rounded-[3px]">
  {/* Size buttons: 3px vs Figma: 4px ⚠️ */}

<div className="border border-slate-200 rounded-[3px]">
  {/* Discount table: 3px vs Figma: 4px ⚠️ */}
```

### Bảng Border Radius

| Component | Figma | React | Khác Biệt |
|-----------|-------|-------|----------|
| Sidebar Card | 8px | 3px | -5px ⚠️ |
| Size Buttons | 4px | 3px | -1px ⚠️ |
| Quantity Input | 4px | 3px | -1px ⚠️ |
| Feature Badges | 3px | 3px | ✅ Match |
| Input Fields | 4px | 3px | -1px ⚠️ |

---

## 6️⃣ LAYOUT STRUCTURE

### Figma Design

#### Sidebar Container
```css
.right-column-sidebar {
  width: 340px;               /* Fixed width */
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px;
  position: sticky;           /* No sticky in Figma, but mentioned */
}
```

#### Discount Table Row
```css
.tier-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #e9eff6;
}
```

### React Component

#### Sidebar Container
```jsx
<div className="lg:col-span-3">
  <div className="bg-[#F5F8FC] border border-slate-200/80 rounded-[3px] p-6 sticky top-6 space-y-6">
    {/* 
      Width: lg:col-span-3 (responsive) vs Figma: 340px fixed
      Gap: space-y-6 (24px) ✅
      Padding: p-6 (24px) ✅
      Sticky: ✅ Có
    */}
  </div>
</div>

{/* Discount Table */}
<div className="border border-slate-200 rounded-[3px] overflow-hidden bg-white divide-y divide-slate-100">
  {priceTiers.map((tier, idx) => (
    <div className="flex justify-between items-center px-3.5 sm:px-4 py-2.5 sm:py-3">
      {/* ✅ Flex layout match */}
      {/* Padding: 14-16px (responsive) vs Figma: 16px */}
    </div>
  ))}
</div>
```

### Bảng Layout

| Property | Figma | React | Status |
|----------|-------|-------|--------|
| Sidebar Width | 340px | auto (col-span-3) | ⚠️ Responsive |
| Container Gap | 20px | 24px (space-y-6) | ⚠️ +4px |
| Container Padding | 24px | 24px (p-6) | ✅ Match |
| Sidebar Sticky | No | Yes (top-6) | ✅ Better |
| Discount Row Padding | 16px | 14→16px | ⚠️ Responsive |
| Row Divider | #e9eff6 | slate-100 | ⚠️ Slightly different |

---

## 7️⃣ FORM ELEMENTS

### Figma - Quantity Picker
```css
.quantity-picker {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.selector-input {
  display: flex;
  align-items: center;
  height: 40px;
}

.qty-val {
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  flex: 1;
}

.decrement, .increment {
  width: 32px;
  height: 32px;
  border: 1px solid #dce0e5;
  cursor: pointer;
}
```

### React - Quantity Picker
```jsx
<div className="flex items-center w-full bg-white rounded-[3px] border border-slate-200 overflow-hidden shadow-2xs">
  <button className="w-10 sm:w-11 h-9 sm:h-10 flex items-center justify-center">
    <Minus className="h-3.5 w-3.5" />
  </button>
  <input
    type="number"
    className="flex-1 text-center font-bold text-[13px] sm:text-[14px] lg:text-[15px]"
  />
  <button className="w-10 sm:w-11 h-9 sm:h-10">
    <Plus className="h-3.5 w-3.5" />
  </button>
</div>

{/*
  Figma: 3 separate divs for semantic + width 32px
  React: Single flex container + responsive w-10/w-11
  
  Height:
  - Figma: 40px total
  - React: 36px (mobile) → 40px (tablet+)
*/}
```

---

## 8️⃣ RESPONSIVE BEHAVIOR

### Figma Design
- Desktop only: 1440px viewport
- No mobile/tablet breakpoints specified
- Fixed widths: 340px sidebar, 420px images

### React Component
- **Mobile (default)**: 
  - Text: 12-13px
  - Buttons: h-10 (40px), w-10 (40px)
  - Gaps: space-y-2.5 → space-y-3
  
- **Tablet (sm)**:
  - Text: 13-14px
  - Buttons: h-11 (44px), w-11 (44px)
  - Gaps: space-y-2.5 → space-y-3
  
- **Desktop (lg/xl)**:
  - Text: 14-15px
  - Buttons: h-11 (44px), w-11 (44px)
  - Gaps: space-y-6 (24px)

---

## 📋 RECOMMENDATIONS (Đề Xuất Cải Thiện)

### Priority 1: Critical (Cần Sửa Ngay)
- [ ] **Price Display**: Tăng từ 24px lên 28px (desktop)
- [ ] **Sidebar Border Radius**: Tăng từ 3px lên 8px
- [ ] **Active Button Background**: Thay từ white sang #f5f8fc
- [ ] **Discount Table Opacity**: Điều chỉnh từ 80% sang 50%

### Priority 2: Important (Nên Sửa)
- [ ] **Price Unit Font**: Tăng từ 16px lên 20px (desktop)
- [ ] **Size Button Height**: Tăng từ py-2 (16px) lên 32px
- [ ] **Button Border Radius**: Tăng từ 3px lên 4px
- [ ] **Quantity Button**: Giảm từ 40-44px xuống 32px

### Priority 3: Nice to Have (Tối Ưu)
- [ ] **Spacing**: Fine-tune gaps từ 4px/8px sang 6px/10px
- [ ] **Border Colors**: Standardize slate-200 vs #dce0e5
- [ ] **Line Heights**: Match Figma line-height exactly
- [ ] **Sticky Offset**: Adjust top-6 để match viewport

---

## ✅ CONCLUSION

### Tổng Kết So Sánh:
- **Đúng (Match)**: ~40% - colors, spacing overall, layout structure
- **Gần Đúng**: ~35% - sizes với minor adjustments, border radius
- **Khác Biệt**: ~25% - button heights, price text size, sidebar styling

### Lý Do Khác Biệt:
1. **Figma** = Desktop-first, fixed sizes (340px sidebar)
2. **React** = Mobile-first, responsive, flexible (col-span-3)
3. **Tailwind** = Constraint-based design vs Figma's pixel-perfect

### Khi Nào Dùng Cái Nào:
- **Figma**: Visual reference, desktop experience, brand guidelines
- **React**: Responsive adaptation, mobile support, performance optimization

### Best Practice:
✅ Giữ nguyên React responsive approach  
✅ Điều chỉnh desktop values để closer to Figma  
✅ Responsive scaling từ mobile → desktop  
✅ Không break API logic (priority cao nhất)
