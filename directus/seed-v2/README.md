# Seed V2 — ULink B2B Product Ecosystem

Seed data hoàn chỉnh cho hệ thống product catalog, thay thế seed v1.

## Thứ tự seed (dependency order)

```
1. regional_hubs        → 3 Hub vùng miền
2. industrial_zones     → 24 KCN nổi bật
3. team_members         → 24 nhân sự
4. industries           → 6 ngành công nghiệp
5. standards            → 9 tiêu chuẩn chất lượng
6. attributes           → 3 nhóm thuộc tính + 27 options
7. categories           → 3 cha + 21 con = 24 danh mục
8. products_data        → 31 sản phẩm (đã map category con)
9. skus_data            → 31 SKUs (giá + MOQ)
10. translations        → 62 bản dịch EN/JA
11. links               → Junction tables (SP↔Industry, SP↔Standard, SP↔Hub, SP↔Attribute)
12. inventory_seed      → 93 tồn kho + 93 movements nhập kho
13. documents           → 6 tài liệu (catalog, datasheet, certificate)
```

## Tổng quan số liệu

| Bảng | Records | File |
|------|---------|------|
| `regional_hubs` | 3 | `regional_hubs.mjs` |
| `hub_industrial_zones` | 24 | `industrial_zones.mjs` |
| `hub_team_members` | 24 | `team_members.mjs` |
| `industries` | 6 | `industries.mjs` |
| `standards` | 9 | `standards.mjs` |
| `product_attributes` | 3 | `attributes.mjs` |
| `product_attribute_options` | 27 | `attributes.mjs` |
| `product_categories` | 24 | `categories.mjs` |
| `products` | 31 | `products_data.mjs` |
| `product_skus` | 31 | `skus_data.mjs` |
| `products_translations` | 62 | `translations.mjs` |
| `products_industries` | 44 | `links.mjs` |
| `products_standards` | 24 | `links.mjs` |
| `products_regional_hubs` | 93 | `links.mjs` |
| `products_product_attributes` | 55 | `links.mjs` |
| `inventory_stock` | 93 | `inventory_seed.mjs` |
| `inventory_movements` | 93 | `inventory_seed.mjs` |
| `documents` | 6 | `documents.mjs` |
| **TỔNG** | **~662 records** | **13 files** |

## Hub distribution (tồn kho)

| Hub | Tỷ lệ | Vai trò |
|-----|--------|---------|
| HUB Hà Nam (Bắc) | 100% | Kho chính |
| HUB Miền Nam | ~70% | Kho thứ hai |
| HUB Đà Nẵng (Trung) | ~25% | Kho trung chuyển |

## Cách dùng

```js
import { productCategories } from './categories.mjs';
import { productsToSeed } from './products_data.mjs';
import { skusToSeed } from './skus_data.mjs';
import { industries } from './industries.mjs';
import { standards } from './standards.mjs';
import { productAttributes } from './attributes.mjs';
import { productsIndustries, productsStandards, productsRegionalHubs, productsAttributes } from './links.mjs';
import { productTranslations } from './translations.mjs';
import { inventoryStock, generateInitialMovements } from './inventory_seed.mjs';
import { documents } from './documents.mjs';

// Seed theo thứ tự dependency ở trên
```
