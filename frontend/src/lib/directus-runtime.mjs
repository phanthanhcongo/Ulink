function resolveUrl(...candidates) {
  for (const candidate of candidates) {
    if (typeof candidate === 'string') {
      const trimmed = candidate.trim();
      if (trimmed) {
        return trimmed;
      }
    }
  }
  return 'http://localhost:8055';
}

export function getDirectusUrl(url = process.env.DIRECTUS_URL ?? process.env.DIRECTUS_PUBLIC_URL) {
  let finalUrl = resolveUrl(url, process.env.DIRECTUS_URL, process.env.DIRECTUS_PUBLIC_URL);
  
  // Remove accidental literal quotes (e.g. if the env var was set as "https://..." in Vercel)
  finalUrl = finalUrl.replace(/^["']|["']$/g, '').trim();
  
  if (finalUrl && !finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
    finalUrl = 'https://' + finalUrl;
  }
  
  return finalUrl;
}

export function getDirectusUrlClient(
  url = process.env.NEXT_PUBLIC_DIRECTUS_URL ?? process.env.NEXT_PUBLIC_SITE_URL
) {
  let finalUrl = resolveUrl(url, process.env.NEXT_PUBLIC_DIRECTUS_URL, process.env.NEXT_PUBLIC_SITE_URL);

  finalUrl = finalUrl.replace(/^["']|["']$/g, '').trim();

  if (finalUrl && !finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
    finalUrl = 'https://' + finalUrl;
  }

  return finalUrl;
}

export function requireDirectusToken(token = process.env.DIRECTUS_TOKEN) {
  if (!token) {
    throw new Error('DIRECTUS_TOKEN is required for server-side RFQ writes.');
  }

  return token;
}
