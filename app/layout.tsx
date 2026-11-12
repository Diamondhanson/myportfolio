import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, IBM_Plex_Mono } from 'next/font/google';
import { site } from '@/content/site';
import './globals.css';
import './sections.css';

const grotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-grotesk',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-mono-plex',
});

const description =
  `${site.role} in ${site.location}. ${site.yearsExperience} years building production ` +
  'software in TypeScript, React, React Native, Node and PostgreSQL. Founder of SeamFlow.';

export const metadata: Metadata = {
  metadataBase: new URL('https://bambot.dev'),
  title: {
    default: `${site.name} · ${site.role}`,
    template: `%s · ${site.shortName}`,
  },
  description,
  keywords: [
    'fullstack engineer',
    'React',
    'React Native',
    'TypeScript',
    'Node.js',
    'PostgreSQL',
    'Next.js',
    'Cameroon',
    'remote',
  ],
  authors: [{ name: site.name, url: site.links.github }],
  creator: site.name,
  openGraph: {
    type: 'website',
    title: `${site.name} · ${site.role}`,
    description,
    siteName: site.name,
    locale: 'en',
  },
  twitter: { card: 'summary_large_image', title: site.name, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f2f1ec' },
    { media: '(prefers-color-scheme: dark)', color: '#0b1a2b' },
  ],
};

/**
 * Applies the stored theme before first paint so the page never flashes the
 * wrong ground colour. Kept tiny and defensive: private browsing can throw.
 */
const themeBootstrap = `
try {
  var t = localStorage.getItem('bp-theme');
  if (t === 'light' || t === 'dark') document.documentElement.dataset.theme = t;
} catch (e) {}
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${grotesk.variable} ${plexMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
