# 🔍 Font Size Audit - Product Detail Page

## Figma Typography Spec
```
Display XL:  64px, weight 800
Display L:   48px, weight 700
Heading H2:  38px, weight 700
Heading H3:  28px, weight 600 ✅ (Fixed)
Heading H4:  20px, weight 600
Body L:      18px, weight 400
Body M:      16px, weight 400
Body S:      14px, weight 400
Label M:     14px, weight 600
Label S:     12px, weight 600
Label XS:    10px, weight 500
```

---

## 📊 Issues Found

### 1. Category Badge (Line 221)
**Current:** `text-caption-responsive font-bold`
- Desktop: 15px, weight 700 ❌

**Figma Spec:** Label M
- Desktop: 14px, weight 600 ❌

**Fix:** Change to `text-[12px] sm:text-[13px] lg:text-[14px] font-semibold`

---

### 2. SKU & Rating Row (Line 232)
**Current:** `text-caption-responsive font-semibold`
- Desktop: 15px, weight 600 ❌

**Figma Spec:** Label S
- Desktop: 12px, weight 600 ❌

**Fix:** Change to `text-[12px] sm:text-[12px] lg:text-[12px] font-semibold`

---

### 3. Rating Value (Line 236)
**Current:** `font-bold` (inherited size)
- Size: Unknown ❌

**Figma Spec:** Label M
- Desktop: 14px, weight 600 ❌

**Fix:** Add `text-[12px] sm:text-[13px] lg:text-[14px] font-semibold`

---

### 4. Product Description (Line 253)
**Current:** `text-caption-responsive font-medium`
- Desktop: 15px, weight 500 ❌

**Figma Spec:** Body S
- Desktop: 14px, weight 400 ❌

**Fix:** Change to `text-[12px] sm:text-[13px] lg:text-[14px] font-normal`

---

### 5. Feature Badge Labels (Lines 264, 273, 282, 291)
**Current:** `text-caption-responsive font-bold`
- Desktop: 15px, weight 700 ❌

**Figma Spec:** Label S
- Desktop: 12px, weight 600 ❌

**Fix:** Change to `text-[11px] sm:text-[12px] lg:text-[12px] font-semibold`

---

### 6. Spec Section Labels (Lines 302, 311, 320, 331)
**Current:** `text-caption-responsive font-semibold`
- Desktop: 15px, weight 600 ❌

**Figma Spec:** Label S
- Desktop: 12px, weight 600 ❌

**Fix:** Change to `text-[11px] sm:text-[12px] lg:text-[12px] font-semibold`

---

### 7. Spec Section Values (Lines 305, 314, 323, 334)
**Current:** `text-caption-responsive font-bold`
- Desktop: 15px, weight 700 ❌

**Figma Spec:** Label M
- Desktop: 14px, weight 600 ❌

**Fix:** Change to `text-[12px] sm:text-[13px] lg:text-[14px] font-semibold`

---

### 8. Quality Standards Title (Line 345)
**Current:** `text-caption-responsive font-bold`
- Desktop: 15px, weight 700 ❌

**Figma Spec:** Label M
- Desktop: 14px, weight 600 ❌

**Fix:** Change to `text-[12px] sm:text-[13px] lg:text-[14px] font-semibold`

---

### 9. Standard Card Title (Line 360)
**Current:** `text-caption-responsive font-bold`
- Desktop: 15px, weight 700 ❌

**Figma Spec:** Label S
- Desktop: 12px, weight 600 ❌

**Fix:** Change to `text-[11px] sm:text-[12px] lg:text-[12px] font-semibold`

---

### 10. Standard Card Description (Line 364)
**Current:** `text-caption-responsive font-semibold`
- Desktop: 15px, weight 600 ❌

**Figma Spec:** Label XS
- Desktop: 10px, weight 500 ❌

**Fix:** Change to `text-[9px] sm:text-[10px] lg:text-[10px] font-medium`

---

## 📋 Comparison Table

| Element | Line | Current | Figma | Status |
|---------|------|---------|-------|--------|
| Product Title | 227 | text-hero-title | 28px H3 | ✅ FIXED |
| Category Badge | 221 | 15px (caption) | 14px (Label M) | ❌ |
| SKU/Rating | 232 | 15px (caption) | 12px (Label S) | ❌ |
| Rating Value | 236 | inherit | 14px (Label M) | ❌ |
| Description | 253 | 15px (caption) | 14px (Body S) | ❌ |
| Feature Labels | 264+ | 15px (caption) | 12px (Label S) | ❌ |
| Spec Labels | 302+ | 15px (caption) | 12px (Label S) | ❌ |
| Spec Values | 305+ | 15px (caption) | 14px (Label M) | ❌ |
| Quality Title | 345 | 15px (caption) | 14px (Label M) | ❌ |
| Standard Title | 360 | 15px (caption) | 12px (Label S) | ❌ |
| Standard Desc | 364 | 15px (caption) | 10px (Label XS) | ❌ |

---

## 🎯 Summary

**Total Issues:** 10  
**Fixed:** 1 (Product Title)  
**Remaining:** 9

**Pattern:** `text-caption-responsive` class size (12px → 15px) được dùng khắp nơi, nhưng Figma yêu cầu:
- Some at 10px (Label XS)
- Some at 12px (Label S)
- Some at 14px (Label M)
- Some at 14px (Body S)
- Some at 16px (Body M)

**Solution:** Replace với explicit responsive sizes cho từng element
