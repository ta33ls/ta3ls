import type { CSSProperties } from "react";
import { programs } from "@/lib/site-data";

export function Programs() {
  return (
    <section className="programs section" id="work" aria-labelledby="workTitle">
      <div className="section-head">
        <div>
          <p className="eyebrow">
            TONIGHT ON AIR <span>/</span> WORK
          </p>
          <h2 className="section-title" id="workTitle">
            What is on air,
            <br />
            and what comes next.
          </h2>
        </div>
        <p className="section-note">
          Both frequencies live.
          <br />
          <span>ALL TIMES ARE APPROXIMATE.</span>
        </p>
      </div>

      <div className="program-list">
        {programs.map((program, index) => {
          const reserved = program.status === "reserved";
          const className = `program${reserved ? " is-reserved" : ""}${
            program.status === "live" ? " is-live" : ""
          }`;
          const content = (
            <>
              <span className="program__time">{program.time}</span>
              <div className="program__main">
                <h3>{program.title}</h3>
                <p>{program.description}</p>
              </div>
              <span className="program__tag">{program.tag}</span>
              <span className="program__len">{program.length}</span>
              <span className="program__wave" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
              </span>
            </>
          );

          if (program.href) {
            return (
              <a
                key={program.time}
                className={className}
                href={program.href}
                data-reveal
                style={{ "--i": index } as CSSProperties}
              >
                {content}
              </a>
            );
          }

          return (
            <article
              key={program.time}
              className={className}
              data-reveal
              style={{ "--i": index } as CSSProperties}
            >
              {content}
            </article>
          );
        })}
      </div>
    </section>
  );
}
