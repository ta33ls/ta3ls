export type AudioProfile = {
  root: number;
  ratio: number;
  filter: number;
  q: number;
  noise: number;
};

export type SkillBand = {
  index: number;
  freq: string;
  name: string;
  en: string;
  level: string;
  accent: string;
  accent2: string;
  audio: AudioProfile;
};

export const profile = {
  name: "ta3ls",
  alias: "33",
  role: "AI Product Manager @ NIO",
  previousRole: "Full Stack Developer / Technical Product Manager",
  education: "Master of Computer Science",
  location: "Shanghai, China / Auckland, New Zealand",
  experience: [
    "AI Product Manager @ NIO",
    "Product Manager",
    "Blockchain Developer",
    "Research Assistant",
  ],
  specialties: [
    "DeFi",
    "Smart Contracts",
    "Product Design",
    "Web3",
    "AI",
  ],
  statusOld: "Building the next generation of blockchain applications.",
  statusNew:
    "Abandoning unrealistic fantasies, building AI applications with true practical value.",
};

export const skillBands: SkillBand[] = [
  {
    index: 0,
    freq: "88.1",
    name: "BLOCKCHAIN",
    en: "SOLIDITY · WEB3 · DEFI",
    level: "SOLIDITY: ADVANCED / WEB3: ADVANCED / DEFI: INTERMEDIATE+",
    accent: "#ede7ff",
    accent2: "#8b6cff",
    audio: { root: 98, ratio: 1.5, filter: 480, q: 0.6, noise: 0.22 },
  },
  {
    index: 1,
    freq: "92.3",
    name: "FRONTEND",
    en: "REACT · TYPESCRIPT · NEXT.JS",
    level: "REACT: VIBE CODER / TYPESCRIPT: VIBE CODER / NEXT.JS: VIBE CODER+",
    accent: "#5bf0e4",
    accent2: "#2f8cff",
    audio: { root: 110, ratio: 1.5, filter: 720, q: 1.4, noise: 0.14 },
  },
  {
    index: 2,
    freq: "96.7",
    name: "BACKEND",
    en: "GO · NODE.JS · PYTHON",
    level: "GO: VIBE CODER++ / NODE.JS: VIBE CODER+ / PYTHON: VIBE CODER",
    accent: "#ff4d8d",
    accent2: "#ffc46b",
    audio: { root: 130.81, ratio: 1.5, filter: 1180, q: 0.8, noise: 0.11 },
  },
  {
    index: 3,
    freq: "101.5",
    name: "AI PRODUCT",
    en: "NIO · APPLICATIONS · NEXT",
    level: "NIO · AI APPLICATIONS · PRODUCT · WHAT'S NEXT",
    accent: "#b58cff",
    accent2: "#ff4d8d",
    audio: { root: 116.54, ratio: 1.414, filter: 620, q: 2.4, noise: 0.17 },
  },
];

export type ProgramStatus = "live" | "reserved" | "archive";

export type Program = {
  time: string;
  title: string;
  description: string;
  tag: string;
  length: string;
  status: ProgramStatus;
  href?: string;
};

export const programs: Program[] = [
  {
    time: "25:00",
    title: "AI PRODUCT @ NIO",
    description: "Building AI applications with true practical value.",
    tag: "NOW ON AIR",
    length: "CURRENT",
    status: "live",
  },
  {
    time: "25:40",
    title: "ENDLESS GLITCH POEM",
    description: "One line a minute, a Chinese stream-of-consciousness poem.",
    tag: "LIVE · 01",
    length: "1 / MIN",
    status: "live",
    href: "/poem",
  },
  {
    time: "26:10",
    title: "DUPLEX",
    description: "Two agents, one endless conversation.",
    tag: "LIVE · 02",
    length: "1 / 15S",
    status: "live",
    href: "/duplex",
  },
  {
    time: "27:00",
    title: "SELECTED ARCHIVE",
    description: "KiwiTrace · zk-SNARK authentication.",
    tag: "PAST BROADCASTS",
    length: "ARCHIVE",
    status: "archive",
  },
];

export type ContactIconName = "telegram" | "github" | "x";

export type Contact = {
  label: string;
  handle: string;
  action: string;
  quote: string;
  href: string;
  icon: ContactIconName;
};

export const contacts: Contact[] = [
  {
    label: "TELEGRAM",
    handle: "@ta3ls",
    action: "CALL 33",
    quote: "Talk AI products, Web3, or just stay up with me.",
    href: "https://t.me/ta3ls",
    icon: "telegram",
  },
  {
    label: "GITHUB",
    handle: "github.com/ta33ls",
    action: "COMMIT 33",
    quote: "Code is another kind of broadcast.",
    href: "https://github.com/ta33ls",
    icon: "github",
  },
  {
    label: "X / TWITTER",
    handle: "@0xta3ls",
    action: "FOLLOW 33",
    quote: "Occasionally online in daylight.",
    href: "https://twitter.com/0xta3ls",
    icon: "x",
  },
];


export const tickerItems = [
  "THE CITY IS ASLEEP",
  "THERE ARE 33 LOVE SONGS",
  "THE SIGNAL IS STILL DRIFTING",
  "SOLIDITY / GO / REACT",
  "BROUGHT TO YOU BY TA3LS.DEV",
  "DO NOT TUNE WHILE SLEEPWALKING",
  "BEFORE SUNRISE, EVERY SIGNAL COUNTS",
  "33.0 FM",
];
