// X reads the same card. Declared separately because Next looks for this exact
// filename rather than falling back to the Open Graph one.
import { ogAlt, ogContentType, ogSize, renderOgImage } from '@/components/og-card';

export const alt = ogAlt;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage();
}
