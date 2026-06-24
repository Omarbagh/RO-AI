"use client";

import * as React from "react";
import { Download } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

type ExportFormat = "pdf" | "docx" | "txt";

interface FormatOption {
  value: ExportFormat;
  label: string;
  sub: string;
  disabled?: boolean;
}

const FORMATS: FormatOption[] = [
  { value: "pdf", label: "PDF", sub: "Aanbevolen" },
  { value: "docx", label: "DOCX", sub: "Bewerkbaar" },
  { value: "txt", label: "TXT", sub: "Plain", disabled: true },
];

interface ExportDialogProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  fileName?: string;
  isPro?: boolean;
  onDownload?: (format: ExportFormat) => void;
}

export function ExportDialog({
  open,
  onOpenChange,
  fileName,
  isPro,
  onDownload,
}: ExportDialogProps) {
  const [selectedFormat, setSelectedFormat] =
    React.useState<ExportFormat>("pdf");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Exporteer je cv</DialogTitle>
          <DialogDescription>
            Geoptimaliseerd voor ATS-systemen en print.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-5">
          <div className="mb-[9px] text-xs font-semibold text-text-body">
            Formaat
          </div>
          <div className="flex gap-[10px]">
            {FORMATS.map((format) => {
              const selected = selectedFormat === format.value;
              return (
                <button
                  key={format.value}
                  type="button"
                  disabled={format.disabled}
                  onClick={() => setSelectedFormat(format.value)}
                  className={cn(
                    "flex-1 rounded-[11px] p-[14px] text-center transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-primary/25",
                    selected
                      ? "border-[1.5px] border-primary bg-accent-soft"
                      : "border border-border-strong",
                    format.disabled
                      ? "cursor-not-allowed opacity-60"
                      : "cursor-pointer",
                  )}
                >
                  <div className="text-sm font-semibold text-ink">
                    {format.label}
                  </div>
                  <div className="mt-0.5 text-[11px] text-muted-foreground">
                    {format.sub}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-[11px]">
          <div className="flex items-center justify-between">
            <span className="text-[13.5px] text-text-body">Paginaformaat</span>
            <span className="rounded-[8px] border border-border-strong px-[10px] py-[5px] text-[13px] font-medium text-foreground">
              A4 ▾
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[13.5px] text-text-body">Foto opnemen</span>
            <Switch defaultChecked />
          </div>
          <div
            className={cn(
              "flex items-center justify-between",
              !isPro && "opacity-60",
            )}
          >
            <span className="text-[13.5px] text-text-body">
              Watermerk verwijderen
            </span>
            <div className="flex items-center gap-2">
              {!isPro && <Badge>Pro</Badge>}
              <Switch defaultChecked={isPro} disabled={!isPro} />
            </div>
          </div>
        </div>

        <Button
          type="button"
          onClick={() => onDownload?.(selectedFormat)}
          className="mt-6 w-full shadow-[0_4px_16px_-4px_rgba(47,107,255,.5)]"
        >
          <Download className="size-4" />
          Download {selectedFormat.toUpperCase()}
        </Button>

        <div className="eyebrow mt-[10px] text-center text-[11px] text-subtle">
          {fileName ?? "cv"} · 1 pagina
        </div>
      </DialogContent>
    </Dialog>
  );
}
