import "server-only";
import {
  deepSeek,
  type DeepSeekLanguageModelChatOptions,
} from "@ai-sdk/deepseek";
import { streamText } from "ai";
import { buildDuplexPrompt, DUPLEX_PROMPT_VERSION, PERSONAS } from "./personas";
import type { DuplexMessage, DuplexSpeaker } from "./types";

const MODEL = process.env.DEEPSEEK_MODEL?.trim() || "deepseek-flash";

export function createDuplexStream({
  speaker,
  messages,
  signal,
}: {
  speaker: DuplexSpeaker;
  messages: Array<Pick<DuplexMessage, "speaker" | "content">>;
  signal: AbortSignal;
}) {
  const persona = PERSONAS[speaker];
  const result = streamText({
    model: deepSeek(MODEL),
    instructions: persona.system,
    prompt: buildDuplexPrompt({ speaker, messages }),
    temperature: 1.05,
    topP: 0.95,
    maxOutputTokens: 180,
    abortSignal: signal,
    providerOptions: {
      deepseek: {
        thinking: { type: "disabled" },
      } satisfies DeepSeekLanguageModelChatOptions,
    },
    onError: ({ error }) => {
      console.error("[duplex] stream error", error);
    },
  });

  return {
    result,
    model: MODEL,
    promptVersion: DUPLEX_PROMPT_VERSION,
  };
}
