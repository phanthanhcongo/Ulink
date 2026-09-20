const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function getDirectusAssetsUrl(): string {
  const base = process.env.NEXT_PUBLIC_DIRECTUS_URL || process.env.DIRECTUS_PUBLIC_URL || 'http://localhost:8055';
  return base.replace(/\/$/, '');
}

export function resolveImageUrl(value: unknown, frontendOrigin?: string): string | null {
  // Handle arrays: pick the first element
  if (Array.isArray(value)) {
    return value.length > 0 ? resolveImageUrl(value[0], frontendOrigin) : null;
  }

  if (typeof value !== 'string' || !value.trim()) return null;

  const imagePath = value.trim();

  // Handle JSON string arrays: '["/images/...", ...]'
  if (imagePath.startsWith('[')) {
    try {
      const parsed = JSON.parse(imagePath);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return resolveImageUrl(parsed[0], frontendOrigin);
      }
    } catch (e) {
      // Not valid JSON, continue with raw string
    }
  }

  // Handle Directus file UUIDs
  if (UUID_RE.test(imagePath)) {
    return `${getDirectusAssetsUrl()}/assets/${imagePath}`;
  }

  if (/^(https?:|data:|blob:)/i.test(imagePath) || imagePath.startsWith('/')) {
    return imagePath;
  }

  if (!frontendOrigin) return `/${imagePath}`;
  return `${frontendOrigin.replace(/\/$/, '')}/${imagePath}`;
}
