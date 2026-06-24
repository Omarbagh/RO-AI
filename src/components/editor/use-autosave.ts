"use client";

import { useEffect, useRef, useState } from "react";
import { saveResumeAction } from "@/lib/resume/actions";
import type { ResumeData } from "@/lib/resume/schema";

export type SaveState = "idle" | "saving" | "saved" | "error";

/**
 * Debounced autosave of the editor's content. Skips the initial render and
 * is a no-op (reports "saved") in demo mode where persistence is disabled.
 */
export function useAutosave({
  resumeId,
  data,
  title,
  enabled,
  delay = 1200,
}: {
  resumeId: string;
  data: ResumeData;
  title: string;
  enabled: boolean;
  delay?: number;
}): SaveState {
  const [state, setState] = useState<SaveState>("idle");
  const isFirst = useRef(true);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!enabled) return;
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    setState("saving");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      const res = await saveResumeAction(resumeId, data, title);
      setState(res.ok ? "saved" : "error");
    }, delay);

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [resumeId, data, title, enabled, delay]);

  return state;
}
