const MAX_LENGTH = 280;

const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;
const BIDI_CHARS = /[\u202A-\u202E\u2066-\u2069]/g;
const NAME_PREFIX = /^(?:33|00|A|B)\s*[:：]\s*/i;

export function sanitizeDuplexMessage(raw: string): string | null {
  let text = raw.trim();

  text = text.replace(/^```[\w-]*\s*/i, "").replace(/```$/i, "").trim();
  text = text.replace(NAME_PREFIX, "");
  text = text.replace(/^["“”'‘’《》]+|["“”'‘’《》]+$/g, "").trim();
  text = text.replace(CONTROL_CHARS, "").replace(BIDI_CHARS, "");
  text = text.replace(/[\r\n\t]+/g, " ");
  text = text.replace(/\s+/g, " ").trim();

  if (!text) return null;

  const characters = Array.from(text);
  if (characters.length > MAX_LENGTH) {
    text = characters
      .slice(0, MAX_LENGTH)
      .join("")
      .replace(/[，、；：,;:\s]+$/g, "")
      .trim();
  }

  return text || null;
}
