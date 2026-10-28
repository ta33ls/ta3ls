"use client";

import { useEffect, useState } from "react";
import { useRadio } from "@/components/radio/radio-provider";

export function SiteHeader() {
  const { playing, toggle } = useRadio();
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState("--:--:--");
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now);
      setTime(formatted);
      setDateTime(now.toISOString());
    };

    updateClock();
    const interval = window.setInterval(updateClock, 1000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`site-header${scrolled ? " is-scrolled" : ""}`}
      id="siteHeader"
    >
      <a className="brand" href="#top" aria-label="ta3ls.dev — back to top">
        <span className="brand__mark">
          33<span>.</span>0
        </span>
        <span className="brand__word">
          <b>ta3ls.dev</b>
        </span>
      </a>

      <nav className="site-nav" aria-label="Main navigation">
        <a href="#work">WORK</a>
        <a href="#profile">PROFILE</a>
        <a href="#contact">CONTACT</a>
      </nav>

      <div className="header-tools">
        <span className="on-air" aria-label="Broadcasting">
          <span className="on-air__lamp" aria-hidden="true" />
          ON AIR
        </span>
        <time className="clock" id="clock" dateTime={dateTime}>
          {time}
        </time>
        <button
          className="sound-toggle"
          id="soundToggle"
          type="button"
          aria-pressed={playing}
          aria-label={playing ? "Turn sound off" : "Turn sound on"}
          onClick={toggle}
        >
          <span className="eq" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="sound-toggle__label">
            SOUND <b>{playing ? "ON" : "OFF"}</b>
          </span>
        </button>
      </div>
    </header>
  );
}
