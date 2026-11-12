import Image from 'next/image';
import type { Project } from '@/content/projects';
import { diagramMap } from './Diagrams';
import { Reveal } from './Reveal';

export function CaseStudy({ project }: { project: Project }) {
  const Diagram = project.diagram ? diagramMap[project.diagram] : null;

  // Each sheet gets its own pen. Overriding one variable recolours the sheet
  // number, the rules, the diagram's accent strokes and the links together,
  // so the section stays coherent while the page gains colour.
  const pen = (Number(project.sheet) - 1) % 4 + 1;
  // One still means a landscape site capture rather than a row of phones.
  const wide = project.shots.length === 1;

  return (
    <article
      className="case"
      id={project.id}
      style={
        {
          ['--accent' as string]: `var(--pen-${pen})`,
          ['--accent-text' as string]: `var(--pen-${pen}-text)`,
        } as React.CSSProperties
      }
    >
      <Reveal className="caseHead">
        <div className="caseSheet">
          <span className="caseNum">{project.sheet}</span>
          <span className="caseRule" aria-hidden />
        </div>

        <div className="caseTitle">
          <h3>{project.name}</h3>
          <p className="label caseKind">{project.kind}</p>
          <p className="caseSummary">{project.summary}</p>

          <dl className="caseMeta">
            <div>
              <dt>Role</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt>Period</dt>
              <dd>{project.period}</dd>
            </div>
          </dl>

          {project.links.length > 0 ? (
            <p className="caseLinks">
              {project.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="caseLink"
                >
                  {l.label}
                  <span aria-hidden> ↗</span>
                </a>
              ))}
            </p>
          ) : null}
        </div>
      </Reveal>

      <div className="caseBody">
        <Reveal className="caseText">
          <section className="caseBlock">
            <p className="label">The situation</p>
            <p className="prose">{project.problem}</p>
          </section>

          <section className="caseBlock">
            <p className="label">What I built</p>
            <ul className="specList">
              {project.approach.map((line, i) => (
                <li key={line}>
                  <span className="specNum" aria-hidden>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="caseBlock">
            <p className="label">Where it stands</p>
            <ul className="outcomeList">
              {project.outcome.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </section>

          <p className="caseStack">
            {project.stack.map((s) => (
              <span className="chip" key={s}>
                {s}
              </span>
            ))}
          </p>

          {project.confidential ? (
            <p className="annotation caseConfidential">
              <span aria-hidden>※ </span>
              {project.confidential}
            </p>
          ) : null}
        </Reveal>

        <div className="caseVisual">
          {Diagram ? <Diagram /> : null}

          {project.shots.length > 0 ? (
            <Reveal
              className={wide ? 'shots shots--single' : 'shots'}
              delay={120}
            >
              {project.shots.map((shot, i) => (
                <figure className="shot" key={shot.src} data-i={i}>
                  {/* Phone screenshots come in threes and are portrait; a lone
                      still is a landscape site capture and gets the full column,
                      so the two cases need different intrinsic sizes. */}
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    width={wide ? 800 : 270}
                    height={wide ? 500 : 480}
                    sizes={wide ? '(max-width: 900px) 92vw, 540px' : '(max-width: 700px) 42vw, 200px'}
                  />
                </figure>
              ))}
            </Reveal>
          ) : null}
        </div>
      </div>
    </article>
  );
}
