"use client";

import * as React from "react";
import { Minus, Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExportDialog } from "@/components/export-dialog";
import { EditorTopbar } from "@/components/editor/editor-topbar";
import { EditorSectionList } from "@/components/editor/editor-section-list";
import { AiPanel } from "@/components/editor/ai-panel";
import { CvPreview } from "@/components/editor/cv-preview";
import { SAMPLE_CV } from "@/components/editor/sample-cv";

const TEMPLATE_TONES = [
  { id: "ink", label: "Ink", className: "bg-ink" },
  { id: "blue", label: "Blauw", className: "bg-primary" },
  { id: "green", label: "Groen", className: "bg-success" },
  { id: "graphite", label: "Grafiet", className: "bg-[#3b3a42]" },
];

const FONT_OPTIONS = ["Compact", "Standaard", "Ruim"];

// TODO: wire to Supabase — load CV by id (from the route param) + autosave.
export default function EditorPage() {
  const [title, setTitle] = React.useState(SAMPLE_CV.title);
  const [exportOpen, setExportOpen] = React.useState(false);
  const [tab, setTab] = React.useState("content");
  const [accent, setAccent] = React.useState("ink");
  const [spacing, setSpacing] = React.useState("Standaard");

  return (
    <>
      <EditorTopbar
        title={title}
        onTitleChange={setTitle}
        onExport={() => setExportOpen(true)}
        onOpenAi={() => setTab("ai")}
      />

      <div className="flex min-h-0 flex-1">
        {/* ── LEFT: editing panel (scrollable) ─────────────── */}
        <div className="flex w-full flex-none flex-col border-r border-border bg-card md:w-[440px] lg:w-[480px]">
          <Tabs
            value={tab}
            onValueChange={setTab}
            className="flex min-h-0 flex-1 flex-col gap-0"
          >
            <TabsList className="flex-none gap-6 px-7 pt-4">
              <TabsTrigger value="content">Inhoud</TabsTrigger>
              <TabsTrigger value="style">Stijl</TabsTrigger>
              <TabsTrigger value="ai">AI</TabsTrigger>
            </TabsList>

            <div className="min-h-0 flex-1 overflow-y-auto px-7 pb-16 pt-6">
              <TabsContent value="content" className="pt-0">
                <EditorSectionList cv={SAMPLE_CV} />
              </TabsContent>

              <TabsContent value="style" className="pt-0">
                <div className="flex flex-col gap-6">
                  <div>
                    <div className="eyebrow mb-3 text-[11px] text-subtle">
                      Accentkleur
                    </div>
                    <div className="flex gap-2.5">
                      {TEMPLATE_TONES.map((tone) => (
                        <button
                          key={tone.id}
                          type="button"
                          aria-label={tone.label}
                          onClick={() => setAccent(tone.id)}
                          // TODO: apply accent to template render engine
                          className={cn(
                            "size-9 rounded-full ring-offset-2 ring-offset-card transition-shadow",
                            tone.className,
                            accent === tone.id && "ring-2 ring-primary",
                          )}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="eyebrow mb-3 text-[11px] text-subtle">
                      Regelafstand
                    </div>
                    <div className="inline-flex rounded-[9px] bg-surface-2 p-[3px]">
                      {FONT_OPTIONS.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setSpacing(opt)}
                          // TODO: apply spacing to template render engine
                          className={cn(
                            "rounded-[7px] px-[14px] py-[6px] text-[13px] transition-colors",
                            spacing === opt
                              ? "bg-card font-semibold text-ink shadow-xs"
                              : "font-medium text-muted-foreground hover:text-foreground",
                          )}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[13px] border border-border p-4">
                    <div className="text-[13px] font-semibold text-ink">
                      Template wisselen
                    </div>
                    <p className="mt-1 text-xs leading-snug text-muted-foreground">
                      Kies een andere lay-out uit de templategalerij. Je inhoud
                      blijft behouden.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="ai" className="pt-0">
                <AiPanel />
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* ── RIGHT: live preview (sticky paper) ───────────── */}
        <div className="hidden min-w-0 flex-1 overflow-y-auto bg-surface-2 p-8 md:block">
          <div className="sticky top-0 flex flex-col items-center">
            <div className="mb-[18px] flex items-center gap-2.5">
              <span className="eyebrow text-xs text-subtle">Live preview</span>
              <span className="text-xs text-subtle">·</span>
              <span className="text-xs text-muted-foreground">
                Modern · pagina 1/1
              </span>
              <div className="ml-2 inline-flex items-center rounded-[8px] border border-border bg-card p-0.5">
                <button
                  type="button"
                  aria-label="Uitzoomen"
                  // TODO: wire preview zoom
                  className="flex size-6 items-center justify-center rounded-[6px] text-subtle hover:text-foreground"
                >
                  <Minus className="size-3.5" />
                </button>
                <span className="px-1.5 text-xs font-semibold text-text-body">
                  100%
                </span>
                <button
                  type="button"
                  aria-label="Inzoomen"
                  // TODO: wire preview zoom
                  className="flex size-6 items-center justify-center rounded-[6px] text-subtle hover:text-foreground"
                >
                  <Plus className="size-3.5" />
                </button>
              </div>
            </div>

            <CvPreview cv={SAMPLE_CV} />
            <div className="h-8 flex-none" />
          </div>
        </div>
      </div>

      <ExportDialog
        open={exportOpen}
        onOpenChange={setExportOpen}
        fileName={title}
        // TODO: pass real Pro status + wire download to PDF export
      />
    </>
  );
}
