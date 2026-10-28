import type { CSSProperties } from "react";
import { profile } from "@/lib/site-data";

const reveal = (index: number) => ({ "--i": index }) as CSSProperties;

export function FieldNotes() {
  return (
    <section
      className="island-notes section"
      id="profile"
      aria-labelledby="profileTitle"
    >
      <div className="island-notes__grid">
        <div className="island-notes__aside" data-reveal>
          <p className="eyebrow">
            $ cat profile.json <span>/</span> PROFILE
          </p>
          <h2 className="section-title" id="profileTitle">
            The 25th hour,
            <br />
            belongs to no time zone.
          </h2>
          <span className="stamp" aria-hidden="true">
            LATE NIGHT
            <br />
            BROADCAST
          </span>
        </div>

        <div className="island-notes__body">
          <p className="lede" data-reveal>
            I used to chase DeFi and smart contracts. 
          </p>
          {/*<p data-reveal style={reveal(1)}>
            Master of Computer Science, with time in Shanghai and Auckland.
            Product manager, blockchain developer, research assistant — now an
            AI Product Manager at NIO.
          </p>*/}

          {/*<dl className="specs" data-reveal style={reveal(2)}>
            <div>
              <dt>ROLE</dt>
              <dd>{profile.role}</dd>
            </div>
            <div>
              <dt>BEFORE</dt>
              <dd>{profile.previousRole}</dd>
            </div>
            <div>
              <dt>EDUCATION</dt>
              <dd>{profile.education}</dd>
            </div>
            <div>
              <dt>LOCATION</dt>
              <dd>{profile.location}</dd>
            </div>
            <div>
              <dt>EXPERIENCE</dt>
              <dd>{profile.experience.join(" · ")}</dd>
            </div>
            <div>
              <dt>SPECIALTIES</dt>
              <dd>{profile.specialties.join(" · ")}</dd>
            </div>
          </dl>*/}

          <blockquote
            className="pull-quote manifesto"
            data-reveal
            style={reveal(3)}
          >
            <del>{profile.statusOld}</del>
            <span>{profile.statusNew}</span>
          </blockquote>

          {/*<p className="signature" data-reveal style={reveal(4)}>
            ta3ls / 33 — friends call me 33
          </p>*/}
        </div>
      </div>
    </section>
  );
}
