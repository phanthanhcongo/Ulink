export function resolveImageUrl(value: unknown, frontendOrigin?: string): string | null {
  if (typeof value !== 'string' || !value.trim()) return null;

  const imagePath = value.trim();
  if (/^(https?:|data:|blob:)/i.test(imagePath) || imagePath.startsWith('/')) {
    return imagePath;
  }

  if (!frontendOrigin) return `/${imagePath}`;
  return `${frontendOrigin.replace(/\/$/, '')}/${imagePath}`;
}
