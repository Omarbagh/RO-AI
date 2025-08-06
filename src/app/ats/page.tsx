'use client';

import React, { useState, ChangeEvent } from "react";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";

const PDFHighlightViewer = dynamic(() => import("./PDFHighlightViewer"), { ssr: false });

interface Suggestion {
  text: string;
  indices: [number, number][];
  page?: number;
  bbox?: { x1: number; y1: number; x2: number; y2: number };
}

export default function ATSCheckPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [scoreReason, setScoreReason] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    if (selected && selected.type === "application/pdf") {
      setFile(selected);
      analyzePDF(selected);
    } else {
      alert("Please upload a PDF file.");
    }
  };

  const analyzePDF = async (pdfFile: File) => {
    setLoading(true);
    setScore(null);
    setScoreReason("");
    setContent("");
    setSuggestions([]);

    const formData = new FormData();
    formData.append("file", pdfFile);

    try {
      const res = await fetch("/api/ats-check", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setScore(data.score);
      setScoreReason(data.score_reason);
      setContent(data.content);
      setSuggestions(data.suggestions);
    } catch (error) {
      console.error(error);
      alert("Error analyzing CV. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Highlight suggestions in text preview
  const renderHighlighted = () => {
    if (suggestions.length === 0) return <p>{content}</p>;
    const fragments: React.ReactNode[] = [];
    let lastIndex = 0;

    const allRanges = suggestions
      .flatMap(s => s.indices.map(range => ({ start: range[0], end: range[1] })))
      .sort((a, b) => a.start - b.start);

    allRanges.forEach((range, i) => {
      if (lastIndex < range.start) {
        fragments.push(content.slice(lastIndex, range.start));
      }
      fragments.push(
        <u key={i} className="bg-yellow-200 underline decoration-wavy">{content.slice(range.start, range.end)}</u>
      );
      lastIndex = range.end;
    });
    if (lastIndex < content.length) {
      fragments.push(content.slice(lastIndex));
    }

    return <div className="prose whitespace-pre-wrap">{fragments}</div>;
  };

  // Voor PDF-highlights
  const pdfHighlights = suggestions
    .filter((s) => s.page && s.bbox)
    .map((s, i) => ({
      id: String(i),
      text: s.text,
      page: s.page!,
      bbox: s.bbox!,
    }));

  return (
    <div className="flex h-full gap-6">
      {/* Left: Upload & resultaat */}
      <div className="w-1/2 p-4 border-r">
        <h2 className="text-lg font-semibold mb-4">Upload je CV (PDF)</h2>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="mb-4"
        />
        {loading && (
          <div className="flex items-center gap-2">
            <Loader2 className="animate-spin" />
            <span>Analyzing...</span>
          </div>
        )}
        {score !== null && (
          <div className="mt-4">
            <h3 className="text-md font-medium">ATS Score: {score}%</h3>
            <Progress value={score} max={100} className="mt-2" />
            {scoreReason && (
              <p className="mt-2 text-sm text-gray-500">{scoreReason}</p>
            )}
          </div>
        )}
        {content && (
          <div className="mt-6">
            <h4 className="font-semibold mb-1">CV Tekst met highlights</h4>
            {renderHighlighted()}
          </div>
        )}
      </div>

      {/* Right: PDF met highlights */}
      <div className="w-1/2 p-4 overflow-auto">
        <h2 className="text-lg font-semibold mb-4">CV Preview (PDF met highlights)</h2>
        {file ? (
          <PDFHighlightViewer file={file} highlights={pdfHighlights} />
        ) : (
          !loading && <p>Geen CV geüpload.</p>
        )}
      </div>
    </div>
  );
}
