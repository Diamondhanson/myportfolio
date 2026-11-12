/**
 * The site's own origin, needed by metadataBase so that the link preview image
 * and the canonical URL resolve to absolute addresses.
 *
 * Read from the environment rather than hardcoded: Vercel sets
 * VERCEL_PROJECT_PRODUCTION_URL on every build, so the card points at the
 * production domain even from a preview deployment. Set NEXT_PUBLIC_SITE_URL
 * once there is a custom domain and it wins over both.
 */
export function siteUrl(): URL {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return new URL(explicit);

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return new URL(`https://${vercel}`);

  return new URL('http://localhost:3400');
}
