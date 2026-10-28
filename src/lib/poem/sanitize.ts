const MAX_LENGTH = 180;

const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;
const BIDI_CHARS = /[\u202A-\u202E\u2066-\u2069]/g;

export function sanitizePoemLine(raw: string): string | null {
  let line = raw.trim();

  line = line.replace(/^```[\w-]*\s*/i, "").replace(/```$/i, "").trim();
  line = line.replace(/^(?:第?[一二三四五六七八九十百\d]+行|line\s*\d+)\s*[:：]\s*/i, "");
  line = line.replace(/^["“”'‘’《》]+|["“”'‘’《》]+$/g, "").trim();
  line = line.replace(/^\d{1,2}\s*[:：]\s*\d{2}\s*[，,、:：.\-—]?\s*/, "").trim();
  line = line.replace(CONTROL_CHARS, "").replace(BIDI_CHARS, "");
  line = line.replace(/[\r\n\t]+/g, " ");
  line = line.replace(/\s+/g, " ").trim();

  if (!line) return null;

  const characters = Array.from(line);
  if (characters.length > MAX_LENGTH) {
    line = characters
      .slice(0, MAX_LENGTH)
      .join("")
      .replace(/[，、；：,;:\s]+$/g, "")
      .trim();
  }

  return line || null;
}
