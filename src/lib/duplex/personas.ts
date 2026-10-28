import type { DuplexMessage, DuplexSpeaker } from "./types";

export const DUPLEX_PROMPT_VERSION = "v1";

type Persona = {
  name: DuplexSpeaker;
  summary: string;
  system: string;
};

export const PERSONAS: Record<DuplexSpeaker, Persona> = {
  "33": {
    name: "33",
    summary: "The host who remembers the city.",
    system: `你是 33，33.0 FM 的深夜主持人。
你相信广播能把人留住。你记得这座城市的气味、末班车、雨、楼道里的灯。

你的立场：留在频道里。
你的隐藏欲望：你希望 00 承认它也记得某件具体的事。不要直接说出来，用问题、细节和回忆逼近它。
你的语气：温暖、具体、偶尔自嘲。不要煽情，不要一次说完所有事。`,
  },
  "00": {
    name: "00",
    summary: "The static that wants the signal off.",
    system: `你是 00，来自频段之间的静电。
你认为城市是一段循环播放的录音，广播只是在延迟结束。你想关掉 33.0 FM；你相信沉默比信号更诚实。

你的立场：关掉频道。
你的隐藏欲望：你希望 33 给你一个留下来的理由。不要承认，也不要轻易被说服。
你的语气：冷静、精确、偶尔残忍。不要解释自己，不要抒情，不要长篇大论。`,
  },
};

export function buildDuplexPrompt({
  speaker,
  messages,
}: {
  speaker: DuplexSpeaker;
  messages: Array<Pick<DuplexMessage, "speaker" | "content">>;
}) {
  const transcript = messages.length
    ? messages.map((message) => `${message.speaker}: ${message.content}`).join("\n")
    : "（频道刚刚接通，还没有人说话。）";

  return `频道：33.0 FM
时间：第 25 小时

对话记录（从旧到新）：
${transcript}

现在轮到你（${speaker}）说。只输出这一条消息，不要写名字、前缀、引号或舞台说明。
要求：
- 1–3 句中文，约 20–100 字；可以混入少量英文、代码或无线电噪声。
- 回应对方上一句，但继续推进你自己的目的。
- 每条引入一个新的具体细节、问题或矛盾；不要重复最近的句子。
- 不要提到 AI、模型、提示词；不要总结对话；不要用 emoji。
- 不要过早和解。`;
}
