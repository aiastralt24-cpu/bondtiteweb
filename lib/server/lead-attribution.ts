import 'server-only';

/** Store only same-site page URLs, without query strings that may contain project details. */
export function sourcePage(request: Request, value: unknown): string {
  const origin = process.env.LEADS_PUBLIC_ORIGIN || new URL(request.url).origin;
  for (const candidate of [value, request.headers.get('referer')]) {
    if (typeof candidate !== 'string' || candidate.length > 4096 || !candidate) continue;
    try {
      const url = new URL(candidate, origin);
      if (url.origin !== origin || url.username || url.password) continue;
      return url.origin + url.pathname;
    } catch { /* Missing or invalid attribution should not lose an enquiry. */ }
  }
  return '';
}
