export type DuplexSpeaker = "33" | "00";

export type DuplexStatus =
  | "live"
  | "waiting"
  | "pending"
  | "failed"
  | "empty"
  | "paused";

export type DuplexMessage = {
  id: number;
  turn: number;
  speaker: DuplexSpeaker;
  content: string;
  slot: string;
};

export type DuplexState = {
  serverNow: string;
  nextAt: string;
  nextSpeaker: DuplexSpeaker;
  status: DuplexStatus;
  error?: string;
};

export type DuplexSnapshot = DuplexState & {
  messages: DuplexMessage[];
  latestId: number;
  hasMore: boolean;
};

export type DuplexDoneState = DuplexState & {
  message: DuplexMessage;
};
