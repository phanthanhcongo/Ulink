'use client';

const CATEGORY_FILTER_KEY = 'ulink_pending_category_filter';

export function setPendingCategoryFilter(categorySlug: string) {
  if (typeof window !== 'undefined') {
    try {
      sessionStorage.setItem(CATEGORY_FILTER_KEY, categorySlug);
    } catch {
      // Ignore
    }
  }
}

export function getPendingCategoryFilter(): string | null {
  if (typeof window !== 'undefined') {
    try {
      return sessionStorage.getItem(CATEGORY_FILTER_KEY);
    } catch {
      return null;
    }
  }
  return null;
}

export function clearPendingCategoryFilter() {
  if (typeof window !== 'undefined') {
    try {
      sessionStorage.removeItem(CATEGORY_FILTER_KEY);
    } catch {
      // Ignore
    }
  }
}
