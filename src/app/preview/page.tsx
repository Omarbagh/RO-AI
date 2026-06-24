"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { ExportDialog } from "@/components/export-dialog";
import { CoverLetterGenerator } from "@/components/cover-letter-generator";
import { SettingsView } from "@/components/settings/settings-view";
import { EmptyState, ErrorState, LoadingState } from "@/components/states";

function Caption({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[13px] font-semibold text-[#23221f] mb-3.5">
      {children}
    </div>
  );
}

export default function PreviewPage() {
  const [exportOpen, setExportOpen] = useState(false);

  return (
    <div className="bg-[#e7e5df] min-h-screen p-8 lg:p-12">
      <div className="flex flex-col gap-12">
        {/* Export — Download-flow */}
        <section>
          <Caption>Export — Download-flow</Caption>
          <div className="flex flex-wrap items-center gap-4">
            <Button onClick={() => setExportOpen(true)}>Open export</Button>
            <p className="text-[13px] text-muted-foreground">
              Opent een modaal exportvenster.
            </p>
          </div>
          <ExportDialog
            open={exportOpen}
            onOpenChange={setExportOpen}
            fileName="senior-product-marketeer.pdf"
          />
        </section>

        {/* Cover letter generator */}
        <section>
          <Caption>Cover letter generator</Caption>
          <div className="max-w-[880px]">
            <CoverLetterGenerator />
          </div>
        </section>

        {/* Account & Billing */}
        <section>
          <Caption>Account &amp; Billing</Caption>
          <div className="bg-[#FBFAF8] rounded-[12px] shadow-md max-w-[620px] p-7">
            <SettingsView />
          </div>
        </section>

        {/* States — empty · loading · error · success */}
        <section>
          <Caption>States — empty · loading · error · success</Caption>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[760px]">
            <div className="bg-card rounded-[12px] shadow-md p-6 min-h-[260px]">
              <EmptyState
                title="Nog geen cv's"
                description="Maak je eerste cv en zie hier je overzicht verschijnen."
                actionLabel="+ Nieuw cv"
              />
            </div>
            <div className="bg-card rounded-[12px] shadow-md p-6 min-h-[260px]">
              <LoadingState />
            </div>
            <div className="bg-card rounded-[12px] shadow-md p-6 min-h-[260px]">
              <ErrorState description="We konden je cv's niet laden. Controleer je verbinding en probeer opnieuw." />
            </div>
            <div className="bg-card rounded-[12px] shadow-md p-6 min-h-[260px] flex flex-col justify-center gap-3">
              <Button
                variant="secondary"
                onClick={() =>
                  toast.success("PDF gedownload", {
                    description: "senior-product-marketeer.pdf",
                  })
                }
              >
                Toon: PDF gedownload
              </Button>
              <Button
                variant="secondary"
                onClick={() =>
                  toast("AI heeft 3 verbeteringen", {
                    description: "Bekijk de suggesties.",
                    action: {
                      label: "Open",
                      onClick: () => {},
                    },
                  })
                }
              >
                Toon: AI-suggesties
              </Button>
              <Button
                variant="secondary"
                onClick={() =>
                  toast.success("Wijzigingen opgeslagen", {
                    description: "Zojuist · automatisch",
                  })
                }
              >
                Toon: Wijzigingen opgeslagen
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
