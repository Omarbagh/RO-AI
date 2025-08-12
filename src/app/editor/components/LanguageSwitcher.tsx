"use client";
import { Globe2 } from "lucide-react";

const LANGS = ["English","Dutch","Deutsch","French","Spanish","Italian"] as const;

export function LanguageSwitcher({
  value,
  onChange,
}: {
  value: string | undefined;
  onChange: (lang: string) => void;
}) {
  return (
    <label className="relative inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-500">
      <Globe2 className="h-4 w-4 text-gray-500" />
      <span className="sr-only">Select language</span>
      <select
        value={value || "English"}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent pr-6 focus:outline-none"
      >
        {LANGS.map((l) => (
          <option key={l} value={l}>{l}</option>
        ))}
      </select>
    </label>
  );
}
