/**
 * Shared helpers to resolve Directus content translations.
 *
 * Each translatable collection stores a `translations` O2M relation
 * with rows like { languages_code: 'en', name: '...', description: '...' }.
 * These helpers look up the matching locale row and fall back to the
 * base (Vietnamese) field value when no translation is found.
 */

export interface TranslationRow {
  languages_code: string;
  [field: string]: unknown;
}

/**
 * Resolve a single translated field from an item's translations array.
 * Falls back to the base field value on the item itself.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getTranslatedField(item: any, field: string, locale: string): string {
  if (item?.translations && Array.isArray(item.translations)) {
    const row = (item.translations as TranslationRow[]).find((t) => t.languages_code === locale);
    if (row && row[field] != null && row[field] !== '') {
      return String(row[field]);
    }
  }
  // Fallback to base field
  const base = item?.[field];
  return base != null ? String(base) : '';
}

/**
 * Shorthand: resolve translated `name` field.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getTranslatedName(item: any, locale: string): string {
  return getTranslatedField(item, 'name', locale);
}

/**
 * Shorthand: resolve translated `description` field.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getTranslatedDescription(item: any, locale: string): string {
  return getTranslatedField(item, 'description', locale);
}

/**
 * Resolve a translated JSON object field (e.g. `specifications`, a key/value map).
 * Falls back to the base JSON value when the locale row has no (non-empty) value.
 * Strings that look like JSON are parsed defensively.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function coerceObject(value: unknown): Record<string, string> | null {
  if (value == null) return null;
  if (typeof value === 'object' && !Array.isArray(value)) {
    return value as Record<string, string>;
  }
  if (typeof value === 'string' && value.trim().startsWith('{')) {
    try {
      const parsed = JSON.parse(value);
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        return parsed as Record<string, string>;
      }
    } catch {
      /* not JSON */
    }
  }
  return null;
}

/**
 * Resolve the translated `specifications` map for a product.
 * Returns the locale-specific map when present, otherwise the base map.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getTranslatedSpecifications(
  item: any,
  locale: string
): Record<string, string> {
  if (item?.translations && Array.isArray(item.translations)) {
    const row = (item.translations as TranslationRow[]).find(
      (t) => t.languages_code === locale
    );
    const translated = coerceObject(row?.specifications);
    if (translated && Object.keys(translated).length > 0) {
      return translated;
    }
  }
  return coerceObject(item?.specifications) ?? {};
}

/**
 * Resolve a translated field on a SKU (e.g. `unit`, `pack_size`, `name`).
 * SKUs carry their own `translations` O2M relation.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getTranslatedSkuField(sku: any, field: string, locale: string): string {
  return getTranslatedField(sku, field, locale);
}
