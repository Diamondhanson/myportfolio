import { skillGroups } from '@/content/site';
import { SectionHead } from './SectionHead';
import { Reveal } from './Reveal';

/**
 * Presented as a drawing's parts list rather than a skills cloud: grouped,
 * numbered, and countable.
 */
export function Toolkit() {
  return (
    <section className="section" id="toolkit">
      <div className="shell">
        <SectionHead num="03" title="Parts list" />

        <div className="toolkit">
          {/* The background lives on the cell, not the revealed content, so the
              grid never flashes as a solid block before the cards fade in. */}
          {skillGroups.map((group, gi) => (
            <div
              className="toolGroup"
              key={group.id}
              style={
                {
                  ['--accent' as string]: `var(--pen-${gi + 1})`,
                  ['--accent-text' as string]: `var(--pen-${gi + 1}-text)`,
                } as React.CSSProperties
              }
            >
              <Reveal delay={gi * 90}>
                <div className="toolGroupHead">
                  <span className="toolGroupNum">{String(gi + 1).padStart(2, '0')}</span>
                  <h3>{group.label}</h3>
                  <span className="toolCount">{group.items.length}</span>
                </div>
                <ul className="toolItems">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
