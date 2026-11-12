import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site-url';

// One page, but a crawler should still be handed it rather than left to guess.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl().toString(),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
