'use client';

import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// pdfjs worker instellen (essentieel!)
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFViewerProps {
  file: File | null;
}

export function PDFViewer({ file }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);

  if (!file) return <p>Geen PDF geselecteerd.</p>;

  return (
    <Document
      file={file}
      onLoadSuccess={({ numPages }) => setNumPages(numPages)}
      loading="PDF laden..."
    >
      {Array.from({ length: numPages }, (_, i) => (
        <Page
          key={i}
          pageNumber={i + 1}
          renderTextLayer={true}
          renderAnnotationLayer={false}
        />
      ))}
    </Document>
  );
}
