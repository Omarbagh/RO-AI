"use client";

import { Download } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// TODO: wire to Supabase subscription + Mollie invoices
const invoices = [
  { id: "may-2026", month: "Mei 2026", plan: "Pro · maandelijks", amount: "€9,00" },
  { id: "apr-2026", month: "April 2026", plan: "Pro · maandelijks", amount: "€9,00" },
];

export function SettingsView() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">
        Instellingen
      </h2>

      <Tabs defaultValue="abonnement">
        <TabsList>
          <TabsTrigger value="abonnement">Abonnement</TabsTrigger>
          <TabsTrigger value="profiel">Profiel</TabsTrigger>
          <TabsTrigger value="meldingen">Meldingen</TabsTrigger>
        </TabsList>

        <TabsContent value="abonnement">
          <div className="flex flex-col gap-[18px]">
            {/* Plan card */}
            <div className="relative overflow-hidden rounded-[14px] bg-ink p-5">
              <div
                className="absolute h-[160px] w-[160px] rounded-full"
                style={{
                  right: -40,
                  top: -40,
                  background:
                    "radial-gradient(circle,#2F6BFF33,transparent 70%)",
                }}
              />
              <div className="relative flex items-start justify-between">
                <div>
                  <div className="eyebrow text-[12px] text-[#A4A6BC]">
                    Huidig abonnement
                  </div>
                  <div className="mt-1 text-2xl font-semibold text-white">
                    Free
                  </div>
                  <div className="mt-1.5 text-[12px] text-[#A4A6BC]">
                    1 cv · 5 templates · beperkte AI
                  </div>
                </div>
                <Button>Upgrade naar Pro</Button>
              </div>
            </div>

            {/* Payment method */}
            <div className="flex items-center justify-between rounded-[13px] border border-border bg-card p-4">
              <div className="flex items-center gap-[13px]">
                <div
                  className="h-[26px] w-[38px] rounded-[5px]"
                  style={{ background: "linear-gradient(135deg,#2F6BFF,#15172B)" }}
                />
                <div>
                  <div className="text-[13.5px] font-semibold text-foreground">
                    Visa ···· 4242
                  </div>
                  <div className="text-xs text-subtle">Verloopt 09/27</div>
                </div>
              </div>
              <span className="cursor-pointer text-[13px] font-semibold text-primary">
                Wijzig
              </span>
            </div>

            {/* Invoices */}
            <div className="flex flex-col gap-2.5">
              <div className="text-xs font-semibold text-text-body">Facturen</div>
              <div className="overflow-hidden rounded-[13px] border border-border bg-card">
                {invoices.map((invoice, index) => (
                  <div
                    key={invoice.id}
                    className={cn(
                      "flex items-center justify-between p-[12px_16px]",
                      index === 0 && "border-b border-border-subtle",
                    )}
                  >
                    <div>
                      <div className="text-[13px] font-medium text-foreground">
                        {invoice.month}
                      </div>
                      <div className="text-[11px] text-subtle">{invoice.plan}</div>
                    </div>
                    <div className="flex items-center gap-[14px]">
                      <span className="text-[13px] font-semibold text-foreground">
                        {invoice.amount}
                      </span>
                      <Badge variant="success">Betaald</Badge>
                      <button
                        type="button"
                        aria-label="Download factuur"
                        className="cursor-pointer text-primary"
                      >
                        <Download className="size-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="profiel">
          <p className="text-sm text-muted-foreground">Binnenkort beschikbaar.</p>
        </TabsContent>

        <TabsContent value="meldingen">
          <p className="text-sm text-muted-foreground">Binnenkort beschikbaar.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
