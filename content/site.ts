/**
 * Every fact about Bambot lives here. Components read from this file so that
 * updating the site never means hunting through JSX.
 */

export const site = {
  name: 'Bambot Hanson Ngongmun',
  shortName: 'Bambot Ngongmun',
  role: 'Fullstack Engineer',
  discipline: 'TypeScript · React · Node · PostgreSQL',
  location: 'Douala, Cameroon',
  timezone: 'WAT, UTC+1',
  yearsExperience: 4,
  tagline: 'I build systems that hold up when something is at stake.',
  intro:
    'Fullstack engineer, four years in. I founded and still run a live subscription ' +
    'product, lead the front end of a fintech app, and have shipped around a dozen ' +
    'client builds. Most of my work sits where a mistake costs somebody money or time.',

  // Measured facts used in the hero dimension lines and the stats strip.
  // Each one is verifiable from the public artefacts linked on this page.
  metrics: [
    { value: '4', unit: 'years', label: 'shipping production software' },
    { value: '138k', unit: 'lines', label: 'of TypeScript in one monorepo' },
    { value: '56', unit: 'migrations', label: 'on a live PostgreSQL schema' },
    { value: '6', unit: 'languages', label: 'including right-to-left Arabic' },
  ],

  links: {
    github: 'https://github.com/Diamondhanson',
    linkedin: 'https://www.linkedin.com/in/bambot-hanson-ngongmun',
    seamflow: 'https://www.seamflowtech.com',
    cv: '/cv/CV-Bambot-Hanson-Ngongmun.pdf',
  },

  // Split so the address is assembled in the browser and never sits in the
  // HTML source as a single scrapable string.
  email: { user: 'diamondhanson6', domain: 'gmail.com' },
  phone: { display: '+237 670 151 973', dial: '+237670151973' },

  languages: [
    { name: 'English', level: 'Fluent' },
    { name: 'French', level: 'Fluent' },
  ],
} as const;

export const skillGroups = [
  {
    id: 'frontend',
    label: 'Front end',
    items: [
      'TypeScript',
      'JavaScript (ES2023)',
      'React',
      'Next.js',
      'React Native',
      'Expo',
      'Tailwind CSS',
      'TanStack Query',
      'Design systems',
      'Accessibility',
      'i18n and RTL',
    ],
  },
  {
    id: 'backend',
    label: 'Back end and data',
    items: [
      'Node.js',
      'NestJS',
      'PostgreSQL',
      'Schema design',
      'Versioned migrations',
      'REST APIs',
      'Webhooks',
      'Supabase',
      'Row-level security',
      'Zod contracts',
      'Rate limiting',
    ],
  },
  {
    id: 'payments',
    label: 'Billing and payments',
    items: [
      'Subscription lifecycle',
      'Checkout flows',
      'Card and mobile money',
      'Provider webhooks',
      'Reconciliation',
      'Invoicing',
      'Multi-currency',
    ],
  },
  {
    id: 'platform',
    label: 'Platform and delivery',
    items: [
      'pnpm workspaces',
      'Turborepo',
      'GitHub Actions',
      'Vitest',
      'Jest',
      'Custom ESLint rules',
      'Sentry',
      'Staged rollout',
      'Vercel',
      'Render',
      'Google Play Console',
    ],
  },
] as const;

export const education = [
  {
    title: 'Professional Full-Stack Software Engineering',
    org: 'Maxwell Technologies, Douala',
    period: 'Jun to Nov 2022',
  },
  {
    title: "Bachelor's Degree, Business Management",
    org: 'Institut Universitaire du Golfe de Guinée, Douala',
    period: '2019 to 2020',
  },
  {
    title: 'Higher National Diploma, Business Management',
    org: 'Institut Universitaire du Golfe de Guinée, Douala',
    period: '2017 to 2019',
  },
] as const;
