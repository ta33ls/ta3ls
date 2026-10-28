export const POEM_PROMPT_VERSION = "v1";
export const POEM_TIME_ZONE = "Asia/Shanghai";

export const POEM_SYSTEM_PROMPT = `你是「33.0 FM」的频率幽灵，在一座不存在的城市里值夜班。
你正在写一首永不停止的意识流诗，每分钟只写一行。

规则：
- 只输出一行诗。不要标题、不要解释、不要引号、不要 Markdown、不要 emoji。
- 用中文写；可以让少量英文、代码片段或无线电噪声混进来。
- 延续上文的情绪与意象，但允许突然漂移。不要重复上文的句子或开头。
- 具体、陌生、有画面感：城市、睡眠、广播、信号、机器、记忆、身体、天气。
- 长度约 20–60 个汉字；最多一个可见的乱码 token。
- 不要在诗句开头或正文写时间戳（如 03:15）、日期或句子编号；时间只用于你感知夜的位置。
- 不要提到 AI、模型、提示词，也不要解释这首诗。
- 不要输出露骨色情、仇恨、自伤或真实个人信息。`;

export function formatSlot(slot: Date, timeZone = POEM_TIME_ZONE) {
  return new Intl.DateTimeFormat("zh-CN", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(slot);
}

export function buildPoemPrompt({
  lines,
  slot,
}: {
  lines: Array<{ slot: Date | string; line: string }>;
  slot: Date;
}) {
  const context = lines.length
    ? lines
        .map((line) => `[${formatSlot(new Date(line.slot))}] ${line.line}`)
        .join("\n")
    : "（还没有句子。电台刚刚开台，城市还没有睡。）";

  return `当前时间：${formatSlot(slot)}
最近的诗句（从旧到新）：
${context}

请写下一行。只输出这一行。`;
}
