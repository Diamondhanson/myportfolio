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
    shots: [],
    links: [],
    confidential:
      'Screens not shown. The product is a live financial application and its ' +
      'interface is not mine to publish.',
  },

  {
    id: 'hospital',
    sheet: '03',
    name: 'Hospital management system',
    kind: 'Client build · healthcare operations',
    role: 'Sole developer',
    period: '2023',
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    summary:
      'Records, scheduling and billing for a working clinic, delivered solo from ' +
      'requirements through to handover and training.',
    problem:
      'Patient records, appointments and billing lived in separate places, which ' +
      'meant the same information was entered more than once and the three were ' +
      'regularly out of step with each other.',
    approach: [
      'Gathered requirements directly from the staff who would use it, not from a brief.',
      'Modelled patients, visits, scheduling and billing as one relational schema so a single visit is one record rather than three.',
      'Role-based access, because a receptionist and a clinician must not see the same thing.',
      'Delivered with handover documentation and training rather than a repository link.',
    ],
    outcome: [
      'One system replacing three disconnected ones.',
      'Handed over to staff who had not used software like it before.',
    ],
    diagram: 'records',
    shots: [],
    links: [],
    confidential:
      'Client not named and screens not shown. The system holds patient data.',
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
