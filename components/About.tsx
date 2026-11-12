import { site, education } from '@/content/site';
import { SectionHead } from './SectionHead';
import { Reveal } from './Reveal';

export function About() {
  return (
    <section className="section" id="about">
      <div className="shell">
        <SectionHead num="03" title="Notes on the draughtsman" />

        <div className="about">
          <Reveal className="aboutText">
            <p className="aboutLead">
              I am a self-taught engineer in Douala, Cameroon, and most of what I know
              came from needing something to exist and then having to build it.
            </p>

            <p className="prose">
              My first degrees are in business management, not computer science. That
              turns out to be useful more often than it sounds. It means I tend to ask
              what a feature is actually for before I ask how to build it, and I am
              comfortable in the conversations where scope, cost and deadlines get
              decided rather than only in the ones about code.
            </p>

            <p className="prose">
              I learned to build by building. A training programme in 2022, then client
              work, then a job leading the front end of a fintech app, then founding a
              product of my own and discovering how much of software is the part after
              you ship: the support ticket, the duplicated webhook, the migration that
              has to run against real data at two in the morning. I would rather work on
              things where that pressure exists. It is the only reliable teacher I have
              found.
            </p>

            <p className="prose">
              I work in English and French interchangeably, which in this part of the
              world is not a nicety. I run on UTC+1, which overlaps the whole European
              day and the American morning, and I have worked asynchronously with
              distributed teams for years because there was never an alternative.
            </p>
          </Reveal>

          <Reveal className="aboutAside" delay={120}>
            <div className="asideBlock">
              <p className="label">Education</p>
              <ol className="timeline">
                {education.map((e) => (
                  <li key={e.title}>
                    <span className="timelinePeriod">{e.period}</span>
                    <span className="timelineTitle">{e.title}</span>
                    <span className="timelineOrg">{e.org}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="asideBlock">
              <p className="label">Languages</p>
              <ul className="plainList">
                {site.languages.map((l) => (
                  <li key={l.name}>
                    <span>{l.name}</span>
                    <span className="muted">{l.level}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="asideBlock">
              <p className="label">Working hours</p>
              <p className="prose asideNote">
                {site.timezone}. Overlaps Europe in full and the United States each
                morning.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
