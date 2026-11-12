export type Shot = { src: string; alt: string };

export type Project = {
  id: string;
  /** Sheet number, printed like a drawing reference. */
  sheet: string;
  name: string;
  /** One-line classification, shown in the title block. */
  kind: string;
  role: string;
  period: string;
  stack: readonly string[];
  /** One sentence. Appears under the name. */
  summary: string;
  /** The situation before the work. */
  problem: string;
  /** What was actually built. Each line is a decision, not a feature list. */
  approach: readonly string[];
  /** What is true now. Only verifiable claims. */
  outcome: readonly string[];
  /** Which annotated diagram to render alongside. */
  diagram: 'assistant' | 'billing' | 'withdrawal' | 'records' | null;
  shots: readonly Shot[];
  links: readonly { label: string; href: string }[];
  /** Shown as a small note when a client cannot be named. */
  confidential?: string;
};

export const projects: readonly Project[] = [
  {
    id: 'seamflow',
    sheet: '01',
    name: 'SeamFlow',
    kind: 'Subscription SaaS · web and mobile · founded and run solo',
    role: 'Founder and lead engineer',
    period: 'Jan 2025 to present',
    stack: [
      'TypeScript',
      'React Native',
      'Expo',
      'Next.js',
      'NestJS',
      'PostgreSQL',
      'Supabase',
      'Turborepo',
    ],
    summary:
      'A workflow platform for tailors and fashion designers, live on Google Play, ' +
      'built and operated end to end by one person.',
    problem:
      'Independent clothing makers run their businesses on paper notebooks and phone ' +
      'galleries. Measurements get lost, deadlines slip, and nobody can say what they ' +
      'are owed. The constraint that shapes everything: the people using it often have ' +
      'no reliable internet, so the product has to work without a connection and ' +
      'reconcile later.',
    approach: [
      'Five apps and six shared packages in one pnpm and Turborepo monorepo, roughly 138,000 lines of TypeScript.',
      'Offline-first mobile client. TanStack Query persisted to device storage, so work continues with no signal and syncs on reconnect.',
      'A single typed contract. Zod schemas published as a package every client consumes, so changing an API shape breaks the build instead of production.',
      'Subscription billing on two payment rails at once, mobile money in XAF and cards in USD, behind one subscription state with providers as adapters.',
      'An AI assistant that can act on live business data, with a confirmation step that makes it safe. Diagrammed opposite.',
      'Internationalised behind a lint rule that fails CI on any hardcoded string, so a missing translation cannot reach a user.',
    ],
    outcome: [
      'Live on the App Store and Google Play, and in use.',
      '56 versioned migrations against a production database, zero manual edits.',
      'English and French complete, four more scaffolded including right-to-left Arabic.',
      'Billing proven against provider sandboxes before any real money moved.',
    ],
    diagram: 'assistant',
    shots: [
      { src: '/shots/1-home.png', alt: 'SeamFlow home dashboard on a phone' },
      { src: '/shots/2-assistant.png', alt: 'The SeamFlow AI assistant mid-conversation' },
      { src: '/shots/3-orders.png', alt: 'The orders list' },
      { src: '/shots/4-order-detail.png', alt: 'An order detail screen' },
      { src: '/shots/5-calendar.png', alt: 'The fitting calendar' },
      { src: '/shots/6-invoicing.png', alt: 'An invoice being prepared' },
    ],
    links: [
      { label: 'seamflowtech.com', href: 'https://www.seamflowtech.com' },
      {
        label: 'App Store',
        href: 'https://apps.apple.com/app/id6826401334',
      },
      {
        label: 'Google Play',
        href: 'https://play.google.com/store/apps/details?id=com.bambothanson.FashionApp',
      },
    ],
  },

  {
    id: 'victoi',
    sheet: '02',
    name: 'Victoi',
    kind: 'Fintech mobile application · employed role',
    role: 'Lead front-end / mobile developer',
    period: 'Jun 2023 to present',
    stack: ['React Native', 'TypeScript', 'iOS', 'Android'],
    summary:
      'Lead the user-facing side of a money-movement app, working inside a ' +
      'distributed team on an agile cadence.',
    problem:
      'Withdrawing money meant walking through a multi-step wizard that also asked ' +
      'you to link an account along the way. Each additional screen was somewhere ' +
      'a user could stall, reconsider, or simply lose the thread. In a financial ' +
      'product an abandoned flow is not a soft metric. It is somebody who did not ' +
      'get their money.',
    approach: [
      'Traced where users were actually dropping out rather than guessing at it.',
      'Collapsed the withdrawal and account-linking wizard into a single form, so the whole commitment is visible at once instead of revealed step by step.',
      'Kept the validation strict while reducing the number of places it can interrupt you, which is the hard part of merging steps.',
      'Held behaviour and visual parity across iOS and Android rather than letting the two drift.',
      'Run structured usability and performance testing, and document what it finds.',
    ],
    outcome: [
      'Measurably reduced drop-off on the withdrawal journey.',
      'One form where there were several screens, with no loss of validation strictness.',
    ],
    diagram: 'withdrawal',
    shots: [{ src: '/previews/victoi.jpg', alt: 'The Victoi product site home page' }],
    links: [{ label: 'victoi.ai', href: 'https://victoi.ai' }],
    confidential:
      'The still is the public product site. In-app screens are not shown: it is ' +
      'a live financial application and its interface is not mine to publish.',
  },

  {
    id: 'careflow',
    sheet: '03',
    name: 'CareFlow',
    kind: 'Hospital operations platform · built for a clinic, now a product',
    role: 'Sole developer',
    period: '2023 to present',
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Offline-first', 'i18n'],
    summary:
      'Every patient from arrival to discharge on one shared record, with a live ' +
      'board showing where each of them currently is.',
    problem:
      'Patient records, appointments and billing lived in separate places, so the ' +
      'same person was entered more than once and the three were regularly out of ' +
      'step. Nobody could answer the simplest operational question, which is who is ' +
      'in the building right now and what are they waiting on.',
    approach: [
      'Modelled patients, visits, scheduling and billing as one relational schema, so a single visit is one record with relations rather than three records that can disagree.',
      'Gathered requirements directly from the staff who would use it, not from a written brief.',
      'Built a live board across intake, consultation, treatment and discharge, so the state of the floor is visible at a glance instead of assembled by asking people.',
      'Extended it to cover tests, medication, beds and reports, keeping all of it against the same visit record.',
      'Role-based access, because a receptionist and a clinician must not see the same thing, with each hospital’s data isolated from every other.',
      'Offline-capable and bilingual in French and English, because neither the connection nor the language can be assumed in a Cameroonian hospital.',
    ],
    outcome: [
      'Live at careflowoperation.com and open for hospital accounts.',
      'One system replacing three disconnected ones, and the paper between them.',
      'Handed over to staff who had not used software like it before.',
    ],
    diagram: 'records',
    shots: [{ src: '/previews/careflow.jpg', alt: 'The CareFlow home page and live status board' }],
    links: [{ label: 'careflowoperation.com', href: 'https://www.careflowoperation.com' }],
    confidential:
      'No patient data or signed-in screens shown. The public product site is ' +
      'linked instead.',
  },

  {
    id: 'commerce',
    sheet: '04',
    name: 'Commerce and institutional builds',
    kind: 'Freelance · around a dozen projects',
    role: 'Developer and consultant',
    period: '2022 to present',
    stack: ['React', 'TypeScript', 'Next.js', 'Node.js', 'Payment APIs'],
    summary:
      'E-commerce storefronts with real checkout and payment integration, plus ' +
      'business and institutional sites, each scoped and delivered end to end.',
    problem:
      'Small businesses are usually sold either a template they cannot change or a ' +
      'custom build they cannot afford to maintain. The useful answer is in between, ' +
      'and getting there is a conversation before it is a codebase.',
    approach: [
      'Each engagement starts with discovery and a written scope agreed before any code.',
      'Checkout and payment integration built against the provider properly rather than bolted on.',
      'Responsive from the first commit, because the traffic is overwhelmingly mobile.',
      'Ends with handover documentation, so the client is not permanently dependent on me.',
    ],
    outcome: [
      'Around a dozen projects delivered.',
      'Clients across retail, business services and institutions.',
    ],
    diagram: null,
    shots: [],
    links: [],
    // TODO(bambot): if you have permission to name any of these clients, add them
    // here as { label: 'Client name', href: 'https://live-site.com' } and delete
    // the `confidential` line below.
    confidential: 'Individual clients not named pending their permission.',
  },
] as const;
