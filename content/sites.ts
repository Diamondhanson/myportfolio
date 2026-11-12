export type LiveSite = {
  id: string;
  name: string;
  /** Shown in the fake address bar. */
  host: string;
  url: string;
  blurb: string;
  stack: readonly string[];
  preview: string;
  /** Which pen colours this card. 1 violet, 2 blue, 3 green, 4 magenta. */
  pen: 1 | 2 | 3 | 4;
  /**
   * Whether the site permits being framed. Checked against the live response
   * headers, not assumed: seamflowtech.com sends X-Frame-Options: DENY and
   * frame-ancestors 'none', so its card stays a still and links out instead of
   * rendering an empty box.
   */
  embeddable: boolean;
};

export const liveSites: readonly LiveSite[] = [
  {
    id: 'careflow',
    name: 'CareFlow',
    host: 'careflowoperation.com',
    url: 'https://www.careflowoperation.com',
    blurb:
      'Hospital operations from intake to discharge on one shared record, with a ' +
      'live status board across intake, consultation, treatment and discharge. ' +
      'Bilingual and built to keep working offline.',
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    preview: '/previews/careflow.jpg',
    pen: 2,
    embeddable: true,
  },
  {
    id: 'seamflow-web',
    name: 'SeamFlow',
    host: 'seamflowtech.com',
    url: 'https://www.seamflowtech.com',
    blurb:
      'The product site for my own SaaS, in six languages including right-to-left ' +
      'Arabic. Static-rendered on Next.js and deployed on Vercel.',
    stack: ['Next.js', 'TypeScript', 'i18n', 'Vercel'],
    preview: '/previews/seamflow-web.jpg',
    pen: 1,
    embeddable: false,
  },
  {
    id: 'unique-hospital',
    name: 'Unique Hospital',
    host: 'hospital.uniquecorporation.org',
    url: 'https://hospital.uniquecorporation.org/en',
    blurb:
      'Public site for a hospital in Bonabéri, Douala. Bilingual English and ' +
      'French throughout, with appointment booking and a light and dark theme.',
    stack: ['React', 'TypeScript', 'i18n', 'Responsive'],
    preview: '/previews/unique-hospital.jpg',
    pen: 3,
    embeddable: true,
  },
  {
    id: 'intentional-woman',
    name: 'Intentional Woman',
    host: 'iwomanlife.com',
    url: 'https://www.iwomanlife.com',
    blurb:
      "Programme, community and resource site for a women's development " +
      'organisation, built around a long editorial scroll and a full-bleed hero.',
    stack: ['React', 'TypeScript', 'CMS content', 'Responsive'],
    preview: '/previews/intentional-woman.jpg',
    pen: 4,
    embeddable: true,
  },
] as const;
