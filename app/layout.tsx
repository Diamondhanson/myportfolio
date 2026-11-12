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
var d = document.documentElement;
try {
  var t = localStorage.getItem('bp-theme');
  if (t === 'light' || t === 'dark') d.dataset.theme = t;
} catch (e) {}

// Only now, with scripting proven, do we let the stylesheet hide anything.
d.classList.add('js');

// Failsafe: if React never gets far enough to reveal the page (a bundle that
// fails to load, a hydration error, a browser we did not anticipate), show
// everything anyway. A visible page beats a faithful animation.
setTimeout(function () {
  if (!d.querySelector('.reveal[data-shown="true"]')) d.classList.add('reveal-disarmed');
}, 2500);
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // The bootstrap script below sets data-theme before React hydrates, which is
    // the whole point of it. That attribute is therefore expected to differ from
    // the server HTML, and only on this element.
    <html
      lang="en"
      className={`${grotesk.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
