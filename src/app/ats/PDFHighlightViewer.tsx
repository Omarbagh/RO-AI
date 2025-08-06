'use client';

import React from "react";
import { PdfLoader, PdfHighlighter } from "react-pdf-highlighter";


interface HighlightData {
  id: string;
  text: string;
  page: number;
  bbox: { x1: number; y1: number; x2: number; y2: number };
}

export default function PDFHighlightViewer({
  file,
  highlights,
}: {
  file: File | null;
  highlights: HighlightData[];
}) {
  const [pdfUrl, setPdfUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPdfUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  // Fix: Provide a scrollRef *function*, not a ref object!
  const scrollRef = React.useCallback(
    (
      scrollTo: (
        highlight: {
          id: string;
          position: {
            boundingRect: {
              x1: number;
              y1: number;
              x2: number;
              y2: number;
              width: number;
              height: number;
              pageNumber: number;
            };
            rects: {
              x1: number;
              y1: number;
              x2: number;
              y2: number;
              width: number;
              height: number;
              pageNumber: number;
            }[];
            pageNumber: number;
          };
          comment: { text: string; emoji: string };
          content: { text: string };
        }
      ) => void
    ) => {
      // Sla de scrollTo-functie eventueel ergens op als je wilt scrollen naar een highlight
      // Je hoeft hier niets te doen als je geen eigen scroll-logica gebruikt
    },
    []
  );

  if (!pdfUrl) return <div>Geen PDF gekozen</div>;

  return (
    <PdfLoader url={pdfUrl} beforeLoad={<div>PDF laden...</div>}>
      {(pdfDocument) => (
        <PdfHighlighter
          pdfDocument={pdfDocument}
          enableAreaSelection={() => false}
          highlights={highlights.map((h) => ({
            id: h.id,
            position: {
              boundingRect: {
                x1: h.bbox.x1,
                y1: h.bbox.y1,
                x2: h.bbox.x2,
                y2: h.bbox.y2,
                width: h.bbox.x2 - h.bbox.x1,
                height: h.bbox.y2 - h.bbox.y1,
                pageNumber: h.page,
              },
              rects: [
                {
                  x1: h.bbox.x1,
                  y1: h.bbox.y1,
                  x2: h.bbox.x2,
                  y2: h.bbox.y2,
                  width: h.bbox.x2 - h.bbox.x1,
                  height: h.bbox.y2 - h.bbox.y1,
                  pageNumber: h.page,
                },
              ],
              pageNumber: h.page,
            },
            comment: { text: h.text, emoji: "" },
            content: { text: h.text },
          }))}
          highlightTransform={(
            highlight,
            index,
            setTip,
            hideTip,
            viewportToScaled,
            screenshot,
            isScrolledTo
          ) => (
            <div
              key={index}
              style={{
                background: "rgba(255,255,0,0.4)",
                borderRadius: 4,
                padding: 2,
              }}
            >
              {highlight.content.text}
            </div>
          )}
          onScrollChange={() => {}} // dummy handler
          scrollRef={scrollRef}      // <-- hier is de fix
          onSelectionFinished={() => null} // no-op
        />
      )}
    </PdfLoader>
  );
}
