"use client";

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExportDialog } from "@/components/export-dialog";
import { ResumePreview } from "@/components/resume-preview";
import { EditorTopbar } from "./editor-topbar";
import { EditorContent } from "./editor-content";
import { StylePanel } from "./style-panel";
import { AiPanel } from "./ai-panel";
import { useAutosave } from "./use-autosave";
import type { ResumeData, ResumeSettings } from "@/lib/resume/schema";

function fileSlug(title: string): string {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "cv"
  );
}

export function EditorWorkspace({
  resumeId,
  initialData,
  initialTitle,
  canPersist,
  isPro = false,
}: {
  resumeId: string;
  initialData: ResumeData;
  initialTitle: string;
  canPersist: boolean;
  isPro?: boolean;
}) {
  const [data, setData] = React.useState<ResumeData>(initialData);
  const [title, setTitle] = React.useState(initialTitle);
  const [tab, setTab] = React.useState("content");
  const [exportOpen, setExportOpen] = React.useState(false);

  useAutosave({ resumeId, data, title, enabled: canPersist });

  const setSettings = (patch: Partial<ResumeSettings>) =>
    setData((d) => ({ ...d, settings: { ...d.settings, ...patch } }));

  return (
    <>
      <EditorTopbar
        title={title}
        onTitleChange={setTitle}
        onExport={() => setExportOpen(true)}
        onOpenAi={() => setTab("ai")}
      />

      <div className="flex min-h-0 flex-1">
        {/* Left: editing panel */}
        <aside className="flex w-[440px] max-w-[44vw] flex-none flex-col border-r border-border bg-background">
          <Tabs
            value={tab}
            onValueChange={setTab}
            className="flex min-h-0 flex-1 flex-col"
          >
            <div className="flex-none px-4 pt-3">
              <TabsList>
                <TabsTrigger value="content">Inhoud</TabsTrigger>
                <TabsTrigger value="style">Stijl</TabsTrigger>
                <TabsTrigger value="ai">AI</TabsTrigger>
              </TabsList>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto p-4">
              <TabsContent value="content" className="mt-0">
                <EditorContent data={data} onChange={setData} />
              </TabsContent>
              <TabsContent value="style" className="mt-0">
                <StylePanel data={data} onSettings={setSettings} isPro={isPro} />
              </TabsContent>
              <TabsContent value="ai" className="mt-0">
                <AiPanel
                  data={data}
                  onApplySummary={(summary) => setData((d) => ({ ...d, summary }))}
                />
              </TabsContent>
            </div>
          </Tabs>
        </aside>

        {/* Right: live preview (exactly what exports) */}
        <main className="min-w-0 flex-1 overflow-y-auto bg-surface-2">
          <div className="mx-auto max-w-[840px] px-6 py-8">
            <div className="overflow-hidden rounded-[4px] bg-white shadow-[0_12px_40px_-12px_rgba(20,20,30,.28)]">
              <ResumePreview data={data} />
            </div>
          </div>
        </main>
      </div>

      <ExportDialog
        open={exportOpen}
        onOpenChange={setExportOpen}
        fileName={fileSlug(title)}
        isPro={isPro}
      />
    </>
  );
}
