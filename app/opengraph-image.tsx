import { ogAlt, ogContentType, ogSize, renderOgImage } from '@/components/og-card';

export const alt = ogAlt;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage();
}
