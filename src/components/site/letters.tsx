import { contacts } from "@/lib/site-data";
import { ContactIcon } from "./contact-icon";

export function Letters() {
  return (
    <section
      className="letters section"
      id="contact"
      aria-labelledby="contactTitle"
    >
      <div className="section-head section-head--letters">
        <div>
          <p className="eyebrow">
            CONTACT <span>/</span> LISTENER LETTERS
          </p>
          <h2 className="section-title" id="contactTitle">
            Pick a channel,
            <br />
            I&apos;m on the other end.
          </h2>
        </div>
        <p className="section-note">
          Direct lines are always open.
          <br />
          <span>TELEGRAM · GITHUB · X</span>
        </p>
      </div>

      <div className="contact-grid">
        {contacts.map((contact) => (
          <a
            key={contact.label}
            className="contact-card"
            href={contact.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="contact-card__top">
              <span className="contact-card__icon">
                <ContactIcon name={contact.icon} />
              </span>
              <span className="contact-card__label">{contact.label}</span>
              <span className="contact-card__arrow" aria-hidden="true">
                ↗
              </span>
            </span>
            <span className="contact-card__body">
              <span className="contact-card__handle">{contact.handle}</span>
              <span className="contact-card__quote">{contact.quote}</span>
            </span>
            <span className="contact-card__meta">{contact.action}</span>
          </a>
        ))}
      </div>

    </section>
  );
}
