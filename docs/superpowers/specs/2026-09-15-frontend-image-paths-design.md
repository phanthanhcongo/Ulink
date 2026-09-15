# Frontend-Hosted Image Paths Design

## Goal

Move all website images out of Directus file storage. Directus will store only
relative frontend paths, while the actual image files will live under
`frontend/public/images` and be served by the frontend deployment.

## Data contract

Image fields in Directus store paths such as:

```text
/images/products/gloves/nitrile-blue.webp
/images/home/section1/homeBanner.svg
```

The frontend image resolver accepts relative paths, absolute URLs, and empty
values. Relative paths are resolved against the frontend origin; absolute URLs
remain unchanged for compatibility during migration.

## Scope

Update all image-bearing content, including product hero/gallery/SKU images,
home and marketing banners, partner logos, regional hub images, article covers,
and team/member photos. Product documents and other non-image files remain in
Directus unless they are explicitly migrated separately.

The frontend must stop constructing `/assets/{directusFileId}` URLs for content
images. Existing static images already under `frontend/public/images` remain
usable and become the canonical file location.

## Migration

1. Inventory current Directus image references and matching files.
2. Copy or rename image files into deterministic paths under
   `frontend/public/images`.
3. Update Directus image fields and junction records to store those paths.
4. Update seed/import scripts so new records write paths and never require
   Directus image uploads.
5. Keep a compatibility path for old File IDs during the transition, with a
   report for unresolved records; remove it after all data is migrated.

## Frontend behavior

Centralize URL normalization in one helper used by product cards, detail pages,
cart, checkout, admin previews, articles, hubs, and other image consumers.
Missing paths show the existing no-image/placeholder state. The resolver must
avoid turning an already absolute URL or root-relative path into a malformed
Directus URL.

## Deployment and operations

Image files are versioned with the frontend and included in its build/deploy.
Directus upload storage is no longer part of the website-image serving path.
Image paths must be case-sensitive and use web-safe filenames. The migration
must document any duplicate or missing source files.

## Verification

- Unit tests cover relative paths, absolute URLs, empty values, and legacy IDs.
- Product listing/detail, gallery, SKU, cart, checkout, article, hub, and admin
  previews render images from the frontend origin.
- A repository scan confirms no active content-image code constructs
  `/assets/{id}` except the explicitly documented compatibility code.
- Production build and existing automated tests pass.
