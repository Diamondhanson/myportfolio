import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

/* Shared drawing primitives. Everything is plain SVG so the linework can be
   animated stroke by stroke and stays crisp at any size. */

const STROKE = 'var(--draw)';
const ACCENT = 'var(--accent)';

function Box({
  x,
  y,
  w,
  h,
  title,
  sub,
  accent = false,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  sub?: string;
  accent?: boolean;
}) {
  const color = accent ? ACCENT : STROKE;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="3"
        fill="none"
        stroke={color}
        strokeWidth="1.4"
        strokeDasharray={accent ? '5 3' : undefined}
        style={accent ? { strokeDashoffset: 0 } : undefined}
        className={accent ? 'noDraw' : undefined}
      />
      <text
        x={x + w / 2}
        y={sub ? y + h / 2 - 3 : y + h / 2 + 4}
        textAnchor="middle"
        fill={color}
        fontSize="12.5"
        fontFamily="var(--font-mono)"
      >
        {title}
      </text>
      {sub ? (
        <text
          x={x + w / 2}
          y={y + h / 2 + 14}
          textAnchor="middle"
          fill="var(--ink-faint)"
          fontSize="10"
          fontFamily="var(--font-mono)"
        >
          {sub}
        </text>
      ) : null}
    </g>
  );
}

function Arrow({
  d,
  label,
  labelX,
  labelY,
  accent = false,
  anchor = 'middle',
}: {
  d: string;
  label?: string;
  labelX?: number;
  labelY?: number;
  accent?: boolean;
  anchor?: 'start' | 'middle' | 'end';
}) {
  const color = accent ? ACCENT : STROKE;
  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="1.3"
        markerEnd={accent ? 'url(#headAccent)' : 'url(#head)'}
      />
      {label && labelX !== undefined && labelY !== undefined ? (
        <text
          x={labelX}
          y={labelY}
          textAnchor={anchor}
          fill={accent ? ACCENT : 'var(--ink-faint)'}
          fontSize="10"
          fontFamily="var(--font-mono)"
          letterSpacing="0.04em"
        >
          {label}
        </text>
      ) : null}
    </g>
  );
}

function Defs() {
  return (
    <defs>
      <marker id="head" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
        <path d="M0,0 L7,3 L0,6" fill="none" stroke={STROKE} strokeWidth="1.2" />
      </marker>
      <marker
        id="headAccent"
        markerWidth="9"
        markerHeight="9"
        refX="7"
        refY="3"
        orient="auto"
      >
        <path d="M0,0 L7,3 L0,6" fill="none" stroke={ACCENT} strokeWidth="1.2" />
      </marker>
    </defs>
  );
}

function Sheet({
  caption,
  viewBox,
  children,
}: {
  caption: string;
  viewBox: string;
  children: ReactNode;
}) {
  return (
    <figure className="diagram">
      <Reveal variant="drawable" as="div" className="diagramCanvas">
        <svg viewBox={viewBox} role="img" aria-label={caption} style={{ '--len': 2400 } as React.CSSProperties}>
          <Defs />
          {children}
        </svg>
      </Reveal>
      <figcaption className="annotation diagramCaption">{caption}</figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */

/** How the SeamFlow assistant is allowed to touch live business data. */
export function AssistantDiagram() {
  return (
    <Sheet
      viewBox="0 0 560 470"
      caption="Fig. 01 — the model proposes, the person decides, and the write goes down the same path as any button in the app."
    >
      <Box x={200} y={10} w={160} h={42} title="Tailor asks" />
      <Arrow d="M280,52 L280,86" />

      <Box x={200} y={86} w={160} h={44} title="Model" sub="bounded rounds" />

      {/* Reads loop freely. */}
      <Arrow d="M360,100 L446,100 L446,128" label="reads" labelX={400} labelY={92} />
      <Box x={386} y={128} w={120} h={40} title="10 read tools" />
      <Arrow d="M386,148 L330,148 L330,130" label="result" labelX={446} labelY={184} />

      {/* Writes stop and become a proposal. */}
      <Arrow d="M280,130 L280,172" label="proposes a write" labelX={288} labelY={158} anchor="start" accent />
      <Box x={170} y={172} w={220} h={46} title="Typed ActionPreview" sub="built server side, turn ends" accent />

      <Arrow d="M280,218 L280,258" accent />
      <Box x={170} y={258} w={220} h={48} title="Confirm card" sub="exactly what will change" accent />

      <Arrow d="M170,282 L96,282 L96,330" label="cancel" labelX={88} labelY={308} anchor="end" />
      <Box x={36} y={330} w={120} h={38} title="Nothing saved" />

      <Arrow d="M280,306 L280,346" label="confirm" labelX={292} labelY={330} anchor="start" />
      <Box
        x={150}
        y={346}
        w={260}
        h={46}
        title="The same typed API client"
        sub="as the equivalent button elsewhere"
      />

      <Arrow d="M280,392 L280,424" />
      <Box x={200} y={424} w={160} h={38} title="PostgreSQL" />
    </Sheet>
  );
}

/** The withdrawal journey at Victoi, before and after. */
export function WithdrawalDiagram() {
  const steps = ['Amount', 'Method', 'Link account', 'Confirm', 'PIN'];
  return (
    <Sheet
      viewBox="0 0 560 330"
      caption="Fig. 02 — five places to abandon, reduced to one. Same validation, fewer exits."
    >
      <text x="0" y="16" fill="var(--ink-faint)" fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.12em">
        BEFORE
      </text>

      {steps.map((s, i) => (
        <g key={s}>
          <Box x={i * 112} y={34} w={96} h={54} title={`${i + 1}`} sub={s} />
          {i < steps.length - 1 ? (
            <Arrow d={`M${i * 112 + 96},61 L${i * 112 + 112},61`} />
          ) : null}
          {/* Every boundary is an exit. */}
          <path
            d={`M${i * 112 + 48},88 L${i * 112 + 48},112`}
            stroke={ACCENT}
            strokeWidth="1"
            strokeDasharray="3 3"
            fill="none"
            className="noDraw"
          />
          <text
            x={i * 112 + 48}
            y={124}
            textAnchor="middle"
            fill={ACCENT}
            fontSize="9"
            fontFamily="var(--font-mono)"
          >
            drop-off
          </text>
        </g>
      ))}

      <path d="M0,160 L560,160" stroke="var(--rule)" strokeWidth="1" strokeDasharray="4 4" fill="none" className="noDraw" />

      <text x="0" y="192" fill="var(--ink-faint)" fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.12em">
        AFTER
      </text>

      <Box x={0} y={210} w={320} h={96} title="One form" sub="amount · method · account · confirm" />
      <Arrow d="M320,258 L402,258" />
      <Box x={402} y={234} w={140} h={46} title="Submitted" />

      <text x={0} y={326} fill="var(--ink-faint)" fontSize="10" fontFamily="var(--font-mono)">
        The whole commitment is visible at once, rather than revealed a screen at a time.
      </text>
    </Sheet>
  );
}

/** Three disconnected systems collapsed into one relational schema. */
export function RecordsDiagram() {
  return (
    <Sheet
      viewBox="0 0 560 300"
      caption="Fig. 03 — one visit was three records in three systems. Modelled once, it is a single row with relations."
    >
      <text x="0" y="16" fill="var(--ink-faint)" fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.12em">
        BEFORE
      </text>
      <Box x={0} y={32} w={160} h={48} title="Records" sub="paper + files" />
      <Box x={196} y={32} w={160} h={48} title="Scheduling" sub="separate" />
      <Box x={392} y={32} w={160} h={48} title="Billing" sub="separate" />
      <text x={276} y={102} textAnchor="middle" fill={ACCENT} fontSize="10" fontFamily="var(--font-mono)">
        same patient entered three times, three chances to disagree
      </text>

      <path d="M0,132 L560,132" stroke="var(--rule)" strokeWidth="1" strokeDasharray="4 4" fill="none" className="noDraw" />

      <text x="0" y="164" fill="var(--ink-faint)" fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.12em">
        AFTER
      </text>
      <Box x={196} y={182} w={164} h={44} title="patient" />
      <Arrow d="M278,226 L278,250" />
      <Box x={196} y={250} w={164} h={42} title="visit" />
      <Arrow d="M196,271 L132,271" />
      <Box x={0} y={250} w={128} h={42} title="appointment" />
      <Arrow d="M360,271 L424,271" />
      <Box x={424} y={250} w={128} h={42} title="invoice" />
    </Sheet>
  );
}

/** Two payment rails, one subscription state. */
export function BillingDiagram() {
  return (
    <Sheet
      viewBox="0 0 560 300"
      caption="Fig. 04 — providers are adapters. Subscription state lives in one place, so adding a rail does not fork the logic."
    >
      <Box x={0} y={20} w={170} h={48} title="Mobile money" sub="XAF · Cameroon" />
      <Box x={0} y={92} w={170} h={48} title="Card" sub="USD · elsewhere" />

      <Arrow d="M170,44 L240,44 L240,150" />
      <Arrow d="M170,116 L205,116 L205,150" />

      <Box x={150} y={150} w={190} h={52} title="Adapter boundary" sub="one shape in, one out" accent />
      <Arrow d="M340,176 L404,176" accent />
      <Box x={404} y={150} w={156} h={52} title="Subscription state" sub="single source of truth" />

      <Arrow d="M482,202 L482,240" />
      <Box x={380} y={240} w={180} h={46} title="Renewal · expiry · invoice" />

      <text x={0} y={240} fill="var(--ink-faint)" fontSize="10" fontFamily="var(--font-mono)">
        Webhooks arrive twice, or never.
      </text>
      <text x={0} y={258} fill="var(--ink-faint)" fontSize="10" fontFamily="var(--font-mono)">
        Reconciliation sits at the boundary,
      </text>
      <text x={0} y={276} fill="var(--ink-faint)" fontSize="10" fontFamily="var(--font-mono)">
        not in every call site.
      </text>
    </Sheet>
  );
}

export const diagramMap = {
  assistant: AssistantDiagram,
  billing: BillingDiagram,
  withdrawal: WithdrawalDiagram,
  records: RecordsDiagram,
} as const;
