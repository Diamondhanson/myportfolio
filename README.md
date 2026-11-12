# Portfolio — Bambot Hanson Ngongmun

Personal site for a fullstack engineer in Douala, Cameroon. Built as a technical
drawing: a measured grid, annotated architecture diagrams, and a title block,
because the work being shown is systems work and the page may as well say so.

Live site: _add the Vercel URL here once deployed_

## Why it looks like this

A portfolio is a work sample whether or not it is presented as one, so this one
is written the way I would write production code rather than assembled from a
template.

- **Diagrams carry the projects that have no screenshots.** Two of the four case
  studies are under confidentiality (a live fintech product and a system holding
  patient data). Rather than pad them with stock imagery or show nothing, each
  gets a hand-drawn SVG of the architecture or the flow that changed. The
  diagram is the evidence.
- **Two real themes.** Light is a draughtsman's paper, dark is a cyanotype
  blueprint. Neither is an afterthought inversion of the other, and the choice
  persists without a flash of the wrong one on reload.
- **Content is data.** Every fact lives in `content/`, so nothing needs editing
  inside JSX. See [Updating the content](#updating-the-content).

## Stack

| | |
|---|---|
| Framework | Next.js 16, App Router, React 19 |
| Language | TypeScript, strict |
| Styling | Hand-written CSS with custom properties. No utility framework. |
| Animation | IntersectionObserver plus CSS transitions. No animation library. |
| Dependencies | Three runtime dependencies: `next`, `react`, `react-dom`. |

Plain CSS was a deliberate choice over Tailwind. The blueprint treatment is
mostly custom SVG stroke animation, a four-layer grid background and a set of
drawing primitives, none of which a utility framework helps with and all of
which read better as named, documented rules.

## Running it

```bash
npm install
npm run dev        # http://localhost:3400
```

```bash
npm run build      # production build, fully static
npm run typecheck  # tsc --noEmit
```

## Project layout

```
app/
  layout.tsx       Fonts, metadata, theme bootstrap
  page.tsx         Section composition
  globals.css      Design tokens, grid, typography, motion primitives
  sections.css     Component styles
components/
  Diagrams.tsx     SVG architecture drawings and their primitives
  CaseStudy.tsx    One project, rendered from data
  Reveal.tsx       Scroll-triggered reveal, degrades to visible
  ThemeToggle.tsx  Paper / blueprint switch
content/
  site.ts          Name, metrics, links, skills, education
  projects.ts      Case studies
public/
  shots/           Product screenshots
  cv/              Downloadable CV
```

## Updating the content

Nothing about the copy requires touching a component.

- **A new project** — add an entry to `projects` in `content/projects.ts`. Set
  `diagram` to one of the keys in `diagramMap`, or `null` for none.
- **A new diagram** — add a component to `components/Diagrams.tsx` using the
  `Box`, `Arrow` and `Sheet` primitives, then register it in `diagramMap`.
- **Skills, metrics, education, links** — `content/site.ts`.
- **The CV** — replace the PDF in `public/cv/` keeping the filename, or update
  `site.links.cv`.

## Accessibility and privacy notes

- `prefers-reduced-motion` is honoured: every reveal and stroke animation is
  disabled rather than shortened.
- The page is readable with JavaScript disabled. The stylesheet only hides a
  revealable block once an inline script has proved scripting is available, and
  a 2.5 second failsafe un-hides everything if the reveal machinery never runs.
  A bundle that fails to load therefore degrades to a static page, not a blank
  one. Verified by removing both classes and confirming nothing stays hidden.
- The email address is assembled in the browser from two halves and never
  appears whole in the served HTML. That is a speed bump against casual
  scrapers, not real protection, and is described as such.

## Licence

Code is MIT. The written content, screenshots and CV are not; please do not
reuse those.
