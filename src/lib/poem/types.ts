export type PoemStatus =
  | "live"
  | "waiting"
  | "pending"
  | "failed"
  | "paused"
  | "empty";

export type PoemLine = {
  id: number;
  slot: string;
  line: string;
};

export type PoemSnapshot = {
  lines: PoemLine[];
  status: PoemStatus;
  serverNow: string;
  nextAt: string;
  latestId: number;
  hasMore: boolean;
  error?: string;
};

export type PoemTickResponse = {
  newLines: PoemLine[];
  status: PoemStatus;
  serverNow: string;
  nextAt: string;
  generated: boolean;
  error?: string;
};
