import "server-only";
import type Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { ANTHROPIC_MODEL, getAnthropic } from "./client";

export interface Usage {
  inputTokens: number;
  outputTokens: number;
}

/** Run a tool-use call that returns validated structured JSON. */
export async function runStructured<T extends z.ZodTypeAny>(opts: {
  system: string;
  prompt: string;
  schema: T;
  toolName: string;
  toolDescription?: string;
  maxTokens?: number;
}): Promise<{ data: z.infer<T>; usage: Usage }> {
  const anthropic = getAnthropic();
  const jsonSchema = z.toJSONSchema(opts.schema, {
    target: "draft-7",
  }) as Anthropic.Tool.InputSchema;

  const res = await anthropic.messages.create({
    model: ANTHROPIC_MODEL,
    max_tokens: opts.maxTokens ?? 1600,
    system: opts.system,
    tools: [
      {
        name: opts.toolName,
        description: opts.toolDescription ?? "Geef het gestructureerde resultaat.",
        input_schema: jsonSchema,
      },
    ],
    tool_choice: { type: "tool", name: opts.toolName },
    messages: [{ role: "user", content: opts.prompt }],
  });

  const block = res.content.find((b) => b.type === "tool_use");
  if (!block || block.type !== "tool_use") {
    throw new Error("AI gaf geen gestructureerd resultaat terug.");
  }
  const data = opts.schema.parse(block.input);
  return {
    data,
    usage: {
      inputTokens: res.usage.input_tokens,
      outputTokens: res.usage.output_tokens,
    },
  };
}

/**
 * Stream a plain-text completion as a ReadableStream of UTF-8 chunks.
 * `onFinish` receives final token usage for metering.
 */
export function runStream(opts: {
  system: string;
  prompt: string;
  maxTokens?: number;
  onFinish?: (usage: Usage) => void;
}): ReadableStream<Uint8Array> {
  const anthropic = getAnthropic();
  const encoder = new TextEncoder();

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const stream = anthropic.messages.stream({
          model: ANTHROPIC_MODEL,
          max_tokens: opts.maxTokens ?? 1200,
          system: opts.system,
          messages: [{ role: "user", content: opts.prompt }],
        });

        stream.on("text", (text) => controller.enqueue(encoder.encode(text)));

        const final = await stream.finalMessage();
        opts.onFinish?.({
          inputTokens: final.usage.input_tokens,
          outputTokens: final.usage.output_tokens,
        });
        controller.close();
      } catch (err) {
        controller.error(err);
      }
    },
  });
}
