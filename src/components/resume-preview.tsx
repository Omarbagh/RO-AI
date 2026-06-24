"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { getTemplate, resolveAccent } from "@/lib/templates/registry";
import type { ResumeData } from "@/lib/resume/schema";

/** A4 width in CSS px at 96dpi (210mm). Templates render at this fixed width. */
const PAGE_WIDTH = 794;

/**
 * Renders the resume's selected template (the real render engine) scaled to fit
 * the parent's width. Used by the editor live preview and gallery thumbnails —
 * what you see here is what gets exported.
 */
export function ResumePreview({
  data,
  className,
}: {
  data: ResumeData;
  className?: string;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const [innerHeight, setInnerHeight] = useState(PAGE_WIDTH * 1.414);

  useLayoutEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const measure = () => {
      setScale(outer.clientWidth / PAGE_WIDTH);
      setInnerHeight(inner.scrollHeight);
    };
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(outer);
    ro.observe(inner);
    return () => ro.disconnect();
  }, [data]);

  const { Html } = getTemplate(data.settings.templateId);
  const accent = resolveAccent(data);

  return (
    <div ref={outerRef} className={className} style={{ width: "100%" }}>
      {/* spacer reserves the scaled height so surrounding layout flows correctly */}
      <div style={{ height: scale ? innerHeight * scale : undefined }}>
        <div
          ref={innerRef}
          style={{
            width: PAGE_WIDTH,
            transform: scale ? `scale(${scale})` : undefined,
            transformOrigin: "top left",
            // hide until first measure to avoid a flash at scale 1
            visibility: scale ? "visible" : "hidden",
          }}
        >
          <Html data={data} accent={accent} />
        </div>
      </div>
    </div>
  );
}
