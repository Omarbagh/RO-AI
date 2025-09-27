// components/SummaryAIField.tsx
import { useState, useRef, useEffect } from "react";

interface SummaryAIFieldProps {
  onFill: (text: string) => void;
  onAiGenerate: () => boolean; 
  isProUser: boolean; 
  aiUsageCount: number; 
}

export function SummaryAIField({ onFill, onAiGenerate, isProUser, aiUsageCount }: SummaryAIFieldProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("English");
  const [customLanguage, setCustomLanguage] = useState("");
  const [about, setAbout] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [tone, setTone] = useState("Professional");
  const [length, setLength] = useState("Medium");

  const dialogRef = useRef<HTMLDivElement | null>(null);

  const MAX_CHARS = 600;
  const charsLeft = MAX_CHARS - about.length;

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const currentLanguage =
    language === "Custom" && customLanguage.trim()
      ? customLanguage.trim()
      : language;

  const handleGenerate = async () => {
    setError(null);
    
    // Check if user can generate (free users limited to 1 use)
    if (!onAiGenerate()) {
      setError("Free users can only generate one AI summary. Upgrade to Pro for unlimited usage.");
      return;
    }
    
    if (!currentLanguage) return setError("Please select or enter a language.");
    if (!about.trim())
      return setError(
        "Please describe briefly what the summary should be about.",
      );

    try {
      setLoading(true);
      const promptText = `Write a ${tone.toLowerCase()} one-paragraph CV summary of ${length.toLowerCase()} length based on this information: ${about.trim()}. Please respond in ${currentLanguage}. Do not use bullet points or line breaks.`;

      const res = await fetch("/api/ai-generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: promptText,
          context: "You are a professional international CV writer.",
        }),
      });

      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || "Something went wrong on the server.");
      }

      let text = await res.text();
      if (
        (text.startsWith('"') && text.endsWith('"')) ||
        (text.startsWith("'") && text.endsWith("'"))
      ) {
        text = text.slice(1, -1);
      }

      onFill(text);
      setOpen(false);
      setAbout("");
      setCustomLanguage("");
      setLanguage("English");
      setTone("Professional");
      setLength("Medium");
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Unknown error.");
      }
    } finally {
      setLoading(false);
    }
  };

  const applyPreset = (preset: string) => {
    setAbout((prev) => (prev ? prev + "\n\n" : "") + preset);
  };

  // Check if user can generate more AI content
  const canGenerateMore = isProUser || aiUsageCount === 0;

  return (
    <div className="inline-flex">
      <button
        type="button"
        onClick={() => setOpen(true)}
        disabled={loading || !canGenerateMore}
        style={{ letterSpacing: "0.03em", cursor: canGenerateMore ? "pointer" : "not-allowed" }}
        className="group relative inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4 text-sm font-semibold
                  bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 text-white shadow-md
                  hover:via-indigo-400 hover:to-indigo-500
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500
                  disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
      >
        {/* AI icon */}
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 2v2m6.364 1.636l-1.414 1.414M20 12h-2M17.364 18.364l-1.414-1.414M12 20v-2M6.636 18.364l1.414-1.414M4 12h2M6.636 5.636l1.414 1.414" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </span>

        {/* Button text */}
        {loading ? "AI is thinking..." : 
         !canGenerateMore ? "AI Assist (Limit Reached)" : 
         "AI Assist – Generate Description"}

        {/* Usage counter for free users */}
        {!isProUser && (
          <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
            {aiUsageCount}/1
          </span>
        )}

        {/* Subtle gloss effect */}
        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100]"
          aria-modal="true"
          role="dialog"
          aria-labelledby="cvhero-ai-title"
          aria-describedby="cvhero-ai-desc"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Modal container */}
          <div
            ref={dialogRef}
            className="absolute inset-0 flex items-start justify-center p-4 mt-20"
          >
            <div className="w-full max-w-2xl rounded-3xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.15)] ring-1 ring-black/5 overflow-hidden">
              {/* Header */}
              <div className="relative p-6 border-b border-gray-100 bg-gradient-to-b from-gray-50 to-white">
                <div className="flex items-start justify-between">
                  <div>
                    <h2
                      id="cvhero-ai-title"
                      className="text-xl font-semibold tracking-tight text-gray-900"
                    >
                      Generate CV Summary
                    </h2>
                    <p
                      id="cvhero-ai-desc"
                      className="text-sm text-gray-600 mt-1"
                    >
                      Provide language, tone and key details. We&apos;ll craft a
                      single professional paragraph (no bullet points).
                      {!isProUser && (
                        <span className="block mt-1 text-orange-600 font-medium">
                          Free users: {1 - aiUsageCount} generation{1 - aiUsageCount === 1 ? '' : 's'} remaining
                        </span>
                      )}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="p-2 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                    aria-label="Close"
                  >
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 6L6 18" />
                      <path d="M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-6">
                {/* Usage limit warning */}
                {!canGenerateMore && (
                  <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
                    <div className="flex items-center gap-2">
                      <svg className="h-5 w-5 text-orange-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                      <span className="text-orange-800 font-medium">
                        Free usage limit reached. Upgrade to Pro for unlimited AI generations.
                      </span>
                    </div>
                  </div>
                )}

                {/* Grid: language + tone + length */}
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Language
                    </label>
                    <div className="flex gap-2">
                      <select
                        className="w-full rounded-2xl border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        disabled={!canGenerateMore}
                      >
                        <option value="English">English</option>
                        <option value="Dutch">Dutch / Nederlands</option>
                        <option value="Deutsch">Deutsch</option>
                        <option value="French">French / Français</option>
                        <option value="Spanish">Spanish / Español</option>
                        <option value="Italian">Italiano</option>
                        <option value="Custom">Other…</option>
                      </select>
                    </div>
                    {language === "Custom" && (
                      <input
                        type="text"
                        placeholder="e.g. Portuguese / Português"
                        className="mt-2 w-full rounded-2xl border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                        value={customLanguage}
                        onChange={(e) => setCustomLanguage(e.target.value)}
                        disabled={!canGenerateMore}
                      />
                    )}
                  </div>

                  <div className="sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tone
                    </label>
                    <select
                      className="w-full rounded-2xl border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                      value={tone}
                      onChange={(e) => setTone(e.target.value)}
                      disabled={!canGenerateMore}
                    >
                      <option>Professional</option>
                      <option>Executive</option>
                      <option>Friendly</option>
                      <option>Concise</option>
                      <option>Impactful</option>
                    </select>
                  </div>

                  <div className="sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Length
                    </label>
                    <select
                      className="w-full rounded-2xl border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      disabled={!canGenerateMore}
                    >
                      <option>Short</option>
                      <option>Medium</option>
                      <option>Long</option>
                    </select>
                  </div>
                </div>

                {/* Details */}
                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      What should the description include?
                    </label>
                    <span
                      className={`text-xs ${charsLeft < 0 ? "text-red-600" : "text-gray-500"}`}
                    >
                      {Math.max(charsLeft, 0)} chars left
                    </span>
                  </div>
                  <textarea
                    className={`w-full min-h-[140px] rounded-2xl border ${charsLeft < 0 ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"} text-sm px-3 py-2`}
                    placeholder="Add relevant details: experience, sector, achievements (with metrics), skills, tech stack, certifications, languages, career goals, and target role."
                    value={about}
                    onChange={(e) =>
                      setAbout(e.target.value.slice(0, MAX_CHARS))
                    }
                    disabled={!canGenerateMore}
                  />
                  <p className="mt-1 text-[11px] text-gray-500">
                    Tip: concrete facts (years, tools, KPIs) make the summary
                    stronger.
                  </p>

                  {/* Preset chips */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {[
                      "5+ years in SaaS sales; quota attainment 120% in 2024; led 3 AEs; fluent in Dutch & English",
                      "Full‑stack JS (React, Node, PostgreSQL); built B2B product used by 15k users; AWS Certified",
                      "HR professional; payroll & talent acquisition; improved time‑to‑hire by 30%; Workday & Greenhouse",
                    ].map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => applyPreset(p)}
                        className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
                        title="Click to insert example"
                        disabled={!canGenerateMore}
                      >
                        + Insert example
                      </button>
                    ))}
                  </div>
                </div>

                {error && (
                  <div
                    className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-2xl p-3"
                    role="alert"
                    aria-live="polite"
                  >
                    {error}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-6 flex items-center justify-between gap-3 border-t border-gray-100 bg-white">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  {loading ? (
                    <>
                      <svg
                        className="h-4 w-4 animate-spin"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                          opacity="0.25"
                        />
                        <path
                          d="M22 12a10 10 0 0 1-10 10"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                      </svg>
                      <span>Generating your summary…</span>
                    </>
                  ) : (
                    <span className="flex items-center gap-1">
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      One paragraph, no bullet points
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="px-3 py-2 rounded-2xl text-sm font-medium text-gray-700 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleGenerate}
                    disabled={loading || !about.trim() || !canGenerateMore}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-indigo-600 text-white font-semibold shadow-sm hover:bg-indigo-700 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                  >
                    {loading && (
                      <svg
                        className="h-4 w-4 animate-spin"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                          opacity="0.25"
                        />
                        <path
                          d="M22 12a10 10 0 0 1-10 10"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                      </svg>
                    )}
                    Generate
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}