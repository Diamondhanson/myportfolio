import Image from 'next/image';
import type { Project } from '@/content/projects';
import { diagramMap } from './Diagrams';
import { Reveal } from './Reveal';

export function CaseStudy({ project }: { project: Project }) {
  const Diagram = project.diagram ? diagramMap[project.diagram] : null;

  return (
    <article className="case" id={project.id}>
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
            <Reveal className="shots" delay={120}>
              {project.shots.map((shot, i) => (
                <figure className="shot" key={shot.src} data-i={i}>
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    width={270}
                    height={480}
                    sizes="(max-width: 700px) 42vw, 200px"
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
