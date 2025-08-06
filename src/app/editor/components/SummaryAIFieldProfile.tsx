import { useState } from "react";

interface SummaryAIFieldProps {
  onFill: (text: string) => void;
}

export function SummaryAIField({ onFill }: SummaryAIFieldProps) {
  const [loading, setLoading] = useState(false);

  const handleAIClick = async () => {
    const language = prompt(
      "Which language should the profile summary be in? (e.g. Dutch, English, Deutsch, French)"
    );
    if (!language) return;

    const userInput = prompt(
      "Enter key information for your resume profile (skills, experience highlights, career goals):"
    );
    if (!userInput) return;

    setLoading(true);

    const promptText =
      `Write a concise, engaging professional profile summary for a resume based on the following details: "${userInput}". Please respond in ${language}. Do not use bullet points or line breaks.`;

    const res = await fetch("/api/ai-generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: promptText,
        context: "You are a professional international resume writer."
      }),
    });

    const text = await res.text();
    onFill(text);
    setLoading(false);
  };

  return (
    <button
      type="button"
      className="text-xs px-3 py-1 rounded-full mb-2 bg-indigo-600 text-white font-semibold shadow-sm flex items-center gap-1"
      onClick={handleAIClick}
      disabled={loading}
      style={{ letterSpacing: "0.03em", cursor: "pointer" }}
    >
      <span className="inline-block bg-black bg-opacity-20 rounded-full px-2 py-0.5 text-[0.7em] font-bold">
        AI
      </span>
      {loading ? "Thinking..." : "Generate Profile"}
    </button>
  );
}
