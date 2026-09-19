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

  if (/^(https?:|data:|blob:)/i.test(imagePath) || imagePath.startsWith('/')) {
    return imagePath;
  }

  if (!frontendOrigin) return `/${imagePath}`;
  return `${frontendOrigin.replace(/\/$/, '')}/${imagePath}`;
}
