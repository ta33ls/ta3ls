import { createDuplexStream } from "@/lib/duplex/stream";
import { sanitizeDuplexMessage } from "@/lib/duplex/sanitize";
import {
  failDuplexStream,
  getDuplexDoneState,
  getDuplexFailureState,
  persistDuplexMessage,
  prepareDuplexStream,
  serializeDuplexMessage,
} from "@/lib/duplex/service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const encoder = new TextEncoder();

function encodeEvent(event: string, data: unknown) {
  return encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
}

function eventStreamResponse(stream: ReadableStream<Uint8Array>) {
  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",
    },
  });
}

function quickEvent(event: string, data: unknown) {
  return eventStreamResponse(
    new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(encodeEvent(event, data));
        controller.close();
      },
    })
  );
}

export async function POST() {
  const prepared = await prepareDuplexStream();

  if (prepared.kind === "existing") {
    const state = await getDuplexDoneState(prepared.message);
    return quickEvent("done", {
      message: serializeDuplexMessage(prepared.message),
      state,
    });
  }

  if (prepared.kind === "pending") {
    return quickEvent("pending", { retryAfterMs: 1000 });
  }

  if (prepared.kind === "failed" || prepared.kind === "paused") {
    return quickEvent("error", {
      message:
        prepared.kind === "failed"
          ? prepared.error
          : "Duplex transmission is paused",
      state: prepared.state,
    });
  }

  const abort = new AbortController();
  const timeout = setTimeout(() => abort.abort(), 25_000);
  let canceled = false;
  let tickFinished = false;

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (event: string, data: unknown) => {
        if (canceled) return;
        try {
          controller.enqueue(encodeEvent(event, data));
        } catch {
          canceled = true;
        }
      };

      const close = () => {
        try {
          controller.close();
        } catch {
          // Already closed.
        }
      };

      const fail = async (message: string) => {
        if (tickFinished) return;
        tickFinished = true;

        try {
          await failDuplexStream({ slot: prepared.slot, error: message });
        } catch (dbError) {
          console.error("[duplex] failed to mark stream failed", dbError);
        }

        const state = await getDuplexFailureState({
          slot: prepared.slot,
          error: message,
        });
        send("error", { message, state });
        close();
      };

      try {
        send("meta", {
          speaker: prepared.speaker,
          turn: prepared.turn,
          slot: prepared.slot.toISOString(),
        });

        const { result, model, promptVersion } = createDuplexStream({
          speaker: prepared.speaker,
          messages: prepared.messages,
          signal: abort.signal,
        });

        let text = "";
        for await (const delta of result.textStream) {
          if (canceled) break;
          text += delta;
          send("delta", { text: delta });
        }

        const finishReason = await result.finishReason;
        let usage: unknown = null;
        try {
          usage = await result.usage;
        } catch {
          usage = null;
        }

        if (canceled) {
          if (!tickFinished) {
            tickFinished = true;
            await failDuplexStream({
              slot: prepared.slot,
              error: "Client canceled duplex stream",
            });
          }
          close();
          return;
        }

        if (finishReason === "interrupted") {
          await fail("Duplex model stream interrupted");
          return;
        }

        const content = sanitizeDuplexMessage(text);
        if (!content) {
          await fail("Duplex model returned an empty message");
          return;
        }

        const row = await persistDuplexMessage({
          slot: prepared.slot,
          turn: prepared.turn,
          speaker: prepared.speaker,
          content,
          model,
          promptVersion,
          usage,
        });
        tickFinished = true;
        const state = await getDuplexDoneState(row);

        send("done", {
          message: serializeDuplexMessage(row),
          state,
        });
        close();
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message.slice(0, 500)
            : "Duplex stream failed";

        if (!tickFinished && !canceled) {
          await fail(message);
        } else {
          close();
        }
      } finally {
        clearTimeout(timeout);
      }
    },
    cancel() {
      canceled = true;
      abort.abort();

      if (!tickFinished) {
        tickFinished = true;
        void failDuplexStream({
          slot: prepared.slot,
          error: "Client canceled duplex stream",
        });
      }
    },
  });

  return eventStreamResponse(stream);
}
