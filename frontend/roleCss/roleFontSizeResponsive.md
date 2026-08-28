# Responsive System — ULink B2B Platform

> **Mobile-first**: Mặc định là mobile (`<640px`), dùng `sm:`, `md:`, `lg:`, `xl:` để override lên màn hình lớn hơn.

---

## 1. Breakpoints

| Name | Min-width | Tailwind | Target devices |
| :--- | :--- | :--- | :--- |
| **Mobile** | `0` | _(default)_ | Smartphone dọc (<640px) |
| **Tablet nhỏ** | `640px` | `sm:` | Smartphone ngang, tablet dọc |
| **Tablet lớn** | `768px` | `md:` | Tablet ngang, laptop nhỏ |
| **Desktop** | `1024px` | `lg:` | Desktop chuẩn |
| **Desktop lớn** | `1280px` | `xl:` | Màn hình rộng (>1280px) |

### Layout container
```
max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16
```

### Grid columns
- Mobile: `grid-cols-1`
- Tablet: `sm:grid-cols-2` / `md:grid-cols-3`
- Desktop: `lg:grid-cols-4` / `xl:grid-cols-6`

---

## 2. Typography Hierarchy

| Level | Mobile | `sm:` | `md:` | `lg:` / `xl:` | Weight | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **H1 / Display** | `28px` | `34px` | `38px` | `42-44px` | `Extrabold (800)` | Hero title |
| **H2** | `22px` | `26px` | `30px` | `36px` | `Extrabold (800)` | Section title |
| **H3** | `16px` | `18px` | `20px` | `22-24px` | `Bold (700)` | Card title |
| **H4** | `15px` | `16px` | `17px` | `18-20px` | `Semibold (600)` | Sub-section title |
| **Body Large** | `15px` | `16px` | — | `18px` | `Medium (500)` | Lead, Hero desc |
| **Body Base** | `13px` | `14px` | — | `14-15px` | `Regular (400)` | Standard body |
| **Body Small** | `12px` | `13px` | — | `13-14px` | `Regular / Medium` | Footnote |
| **Eyebrow** | `13px` | `14px` | — | `16px` | `Bold (700)` + UPPERCASE | Tag label |
| **Eyebrow Sub** | `14px` | `15px` | — | `18px` | `Extrabold (800)` + UPPERCASE | Sub tag |
| **Mono / SKU** | `12px` | `13px` | — | `14px` | `Medium (500)` | Code, SKU |

### Tailwind Examples

#### H1 — Hero
```
text-[28px] sm:text-[34px] md:text-[38px] lg:text-[42px] xl:text-[44px] font-extrabold leading-[1.15] tracking-tight
```

#### H2 — Section title
```
text-[22px] sm:text-[26px] md:text-[30px] lg:text-[36px] font-extrabold leading-tight
```

#### H3 — Card title
```
text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] font-bold leading-snug
```

#### H4 — Sub-section title
```
text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px] xl:text-[20px] font-semibold
```

#### Body Large — Lead / Hero description
```
text-[15px] sm:text-[16px] lg:text-[18px] font-medium leading-relaxed
```

#### Body Base — Standard content
```
text-[13px] sm:text-[14px] leading-relaxed
```

#### Body Small — Secondary / Footnote
```
text-[12px] sm:text-[13px] leading-relaxed
```

#### Eyebrow — Section tag
```
text-[13px] sm:text-[14px] lg:text-[16px] font-bold uppercase tracking-wider
```

#### Eyebrow Sub — Sub tag
```
text-[14px] sm:text-[15px] lg:text-[18px] font-extrabold uppercase tracking-wider
```

#### Mono / SKU
```
text-[12px] sm:text-[13px] lg:text-[14px] font-medium
```

---

## 3. Button Sizes

| Button | Height | Padding X | Font Size | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Large** | `h-[52px]` | `px-7` | `16-17px` | Hero CTA |
| **Medium** | `h-11` | `px-5` | `14px` | Standard button |
| **Small** | `h-9` | `px-3` | `13px` | Secondary action |

---

## 4. Section Header Spacing

```
eyebrow (mb-3)
  ↓
title (mt-1)
  ↓
subtitle / desc (mt-2)
```

Standard:
- Eyebrow → Title: `mt-3`
- Title → Subtitle: `mt-1`
- Title → Description: `mt-2`
- Section header → Content grid: `mt-8 sm:mt-10 lg:mt-12`

---

## 5. Image Aspect Ratios

| Context | Ratio | Tailwind |
| :--- | :--- | :--- |
| Card banner | `16:10` | `aspect-[16/10]` |
| Hero | `16:9` / `1440:500` | `aspect-[16/9]` |
| Product image | `1:1` | `aspect-square` |
| Video showcase | `16:9` | `aspect-[16/9]` |

---

## 6. Z-Index Layers

| Layer | Value | Usage |
| :--- | :--- | :--- |
| Base content | `z-0` | Cards, text |
| Dropdown | `z-50` | Nav dropdown, autocomplete |
| Sticky header | `z-40` | Site header |
| Modal | `z-50` | Dialog, modal |
| Toast | `z-50` | Notification toast |
| Overlay | `z-30` | Hero glass card |

---

## 7. Font Weight Mapping

| Weight | Tailwind | Usage |
| :--- | :--- | :--- |
| `400` | `font-normal` | Body text |
| `500` | `font-medium` | Body strong, descriptions |
| `600` | `font-semibold` | Nav links, button text |
| `700` | `font-bold` | H3, card titles, labels |
| `800` | `font-extrabold` | H1, H2, eyebrow sub, KPI values |

---

## 8. Spacing System

| Property | Mobile | `sm:` | `md:` | `lg:` | `xl:` |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Section padding Y** | `py-10` | `py-12` | — | `py-16` | `py-20` |
| **Section margin top** | `mt-8` | `mt-10` | — | `mt-12` | `mt-16` |
| **Card padding** | `p-4` | `p-5` | — | `p-6` | `p-8` |
| **Grid gap** | `gap-4` | `gap-5` | — | `gap-6` | `gap-8` |
| **Container padding X** | `px-4` | `px-8` | — | `px-12` | `px-16` |

---

## 9. Card Hover (Standard)

### 4.1. No Image — Border Glow Only
```
group transition-all duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)]
```

### 4.2. With Image — Border Glow + Image Overlay
Card wrapper:
```
group transition-all duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)]
```

Image overlay (sibling of `<Image>`):
```html
<div className="absolute inset-0 bg-gradient-to-t from-[#1769E2]/40 to-[#1769E2]/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
```

Image zoom: `group-hover:scale-105`

### 4.3. Icon Container
```
group-hover:shadow-sm
```

### 4.4. Child Text/Icon Color
```
transition-colors duration-200 group-hover:text-{color}
```

---

## 10. Border Radius
**3px** cho mọi rounded element: `rounded-[3px]`
**0px** cho square element: `rounded-none`

---

## 11. Shadows

| State | Shadow |
| :--- | :--- |
| Resting | `shadow-sm` |
| Hover (no glow) | `hover:shadow-md` |
| Hover (card chuẩn) | `hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)]` |
| Modal / Dropdown | `shadow-lg` |

---

## 12. Focus Ring
```
focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none
```

---

## 13. Touch Target
Minimum **44px** cho interactive elements: `min-h-[44px]` / `h-11` / `py-2.5`
