import "server-only";
import { deepSeek, type DeepSeekLanguageModelChatOptions } from "@ai-sdk/deepseek";
import { generateText } from "ai";
import { buildPoemPrompt, POEM_PROMPT_VERSION, POEM_SYSTEM_PROMPT } from "./prompt";
import { sanitizePoemLine } from "./sanitize";

const MODEL = process.env.DEEPSEEK_MODEL?.trim() || "deepseek-flash";

export async function generatePoemLine({
  lines,
  slot,
}: {
  lines: Array<{ slot: Date | string; line: string }>;
  slot: Date;
}) {
  const prompt = buildPoemPrompt({ lines, slot });

  const { text, usage } = await generateText({
    model: deepSeek(MODEL),
    instructions: POEM_SYSTEM_PROMPT,
    prompt,
    temperature: 1.1,
    topP: 0.95,
    maxOutputTokens: 120,
    abortSignal: AbortSignal.timeout(20_000),
    providerOptions: {
      deepseek: {
        thinking: { type: "disabled" },
      } satisfies DeepSeekLanguageModelChatOptions,
    },
  });

  const line = sanitizePoemLine(text);
  if (!line) {
    throw new Error("DeepSeek returned an empty or invalid poem line");
  }

  return {
    line,
    model: MODEL,
    promptVersion: POEM_PROMPT_VERSION,
    usage,
  };
}
