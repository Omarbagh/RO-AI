/**
 * Anthropic (Claude) client factory. Server-only — the API key never reaches
 * the client bundle. All AI features call Claude through this.
 */
import "server-only";
import Anthropic from "@anthropic-ai/sdk";

export const ANTHROPIC_MODEL = process.env.ANTHROPIC_MODEL ?? "claude-opus-4-8";

let client: Anthropic | null = null;

export function getAnthropic(): Anthropic {
  if (!client) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error("ANTHROPIC_API_KEY is not set");
    }
    client = new Anthropic({ apiKey });
  }
  return client;
}
