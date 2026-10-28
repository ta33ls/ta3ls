"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { skillBands, type SkillBand } from "@/lib/site-data";
import { RadioEngine } from "@/lib/radio";

const AUTO_ADVANCE_MS = 9000;

type RadioContextValue = {
  station: number;
  band: SkillBand;
  playing: boolean;
  started: boolean;
  hint: string;
  selectStation: (index: number, playIfNeeded?: boolean) => void;
  toggle: () => void;
  replay: () => void;
};

type AutoContextValue = {
  autoEnabled: boolean;
  countdown: number;
  toggleAuto: () => void;
};

const RadioContext = createContext<RadioContextValue | null>(null);
const AutoContext = createContext<AutoContextValue | null>(null);

export function RadioProvider({ children }: { children: ReactNode }) {
  const [station, setStation] = useState(2);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [hint, setHint] = useState("");
  const [autoEnabled, setAutoEnabled] = useState(true);
  const [countdown, setCountdown] = useState(
    Math.ceil(AUTO_ADVANCE_MS / 1000)
  );
  const engineRef = useRef<RadioEngine | null>(null);
  const hintTimer = useRef<number | null>(null);
  const stationRef = useRef(station);
  const band = skillBands[station];

  useEffect(() => {
    stationRef.current = station;
  }, [station]);

  const showHint = useCallback((message: string) => {
    setHint(message);
    if (hintTimer.current) window.clearTimeout(hintTimer.current);
    hintTimer.current = window.setTimeout(() => setHint(""), 3000);
  }, []);

  const getEngine = useCallback(() => {
    if (!engineRef.current) engineRef.current = new RadioEngine();
    return engineRef.current;
  }, []);

  const play = useCallback(
    async (index = stationRef.current) => {
      const nextBand = skillBands[index];
      try {
        await getEngine().start(nextBand);
        setPlaying(true);
        setStarted(true);
        showHint(
          `Connected to ${nextBand.freq} ${nextBand.name} · Headphones recommended`
        );
      } catch {
        setPlaying(false);
        showHint("Signal unavailable — try again later");
      }
    },
    [getEngine, showHint]
  );

  const pause = useCallback(() => {
    engineRef.current?.stop();
    setPlaying(false);
    showHint("Muted · The signal is still drifting");
  }, [showHint]);

  const toggle = useCallback(() => {
    if (playing) {
      pause();
    } else {
      void play();
    }
  }, [playing, pause, play]);

  const selectStation = useCallback(
    (index: number, playIfNeeded = true, silent = false) => {
      const normalized = (index + skillBands.length) % skillBands.length;
      const nextBand = skillBands[normalized];

      stationRef.current = normalized;
      setStation(normalized);
      setCountdown(Math.ceil(AUTO_ADVANCE_MS / 1000));
      engineRef.current?.tune(nextBand, normalized);

      if (playIfNeeded && !playing) {
        void play(normalized);
      } else if (playing && !silent) {
        showHint(`Tuned to ${nextBand.freq} ${nextBand.name} · Signal locked`);
      }
    },
    [playing, play, showHint]
  );

  const toggleAuto = useCallback(() => {
    setCountdown(Math.ceil(AUTO_ADVANCE_MS / 1000));
    setAutoEnabled((enabled) => !enabled);
  }, []);

  useEffect(() => {
    if (!autoEnabled) return;

    const startedAt = Date.now();
    const interval = window.setInterval(() => {
      const remaining = AUTO_ADVANCE_MS - (Date.now() - startedAt);
      setCountdown(Math.max(0, Math.ceil(remaining / 1000)));
    }, 250);
    const timer = window.setTimeout(() => {
      selectStation(station + 1, false, true);
    }, AUTO_ADVANCE_MS);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timer);
    };
  }, [autoEnabled, selectStation, station]);

  const replay = useCallback(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });

    if (!playing) {
      void play();
    } else {
      showHint("Still receiving · The signal is stable");
    }
  }, [playing, play, showHint]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--accent", band.accent);
    root.style.setProperty("--accent-2", band.accent2);
  }, [band]);

  useEffect(() => {
    document.body.classList.toggle("is-audio", playing);
  }, [playing]);

  useEffect(() => {
    return () => {
      engineRef.current?.close();
      engineRef.current = null;
      if (hintTimer.current) window.clearTimeout(hintTimer.current);
    };
  }, []);

  const radioValue = useMemo<RadioContextValue>(
    () => ({
      station,
      band,
      playing,
      started,
      hint,
      selectStation,
      toggle,
      replay,
    }),
    [station, band, playing, started, hint, selectStation, toggle, replay]
  );

  const autoValue = useMemo<AutoContextValue>(
    () => ({
      autoEnabled,
      countdown,
      toggleAuto,
    }),
    [autoEnabled, countdown, toggleAuto]
  );

  return (
    <RadioContext.Provider value={radioValue}>
      <AutoContext.Provider value={autoValue}>
        {children}
      </AutoContext.Provider>
    </RadioContext.Provider>
  );
}

export function useRadio() {
  const context = useContext(RadioContext);
  if (!context) {
    throw new Error("useRadio must be used inside RadioProvider");
  }
  return context;
}

export function useAuto() {
  const context = useContext(AutoContext);
  if (!context) {
    throw new Error("useAuto must be used inside RadioProvider");
  }
  return context;
}
