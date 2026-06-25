import type { Metadata } from "next";
import { SettingsView } from "@/components/settings/settings-view";

export const metadata: Metadata = { title: "Instellingen" };

export default function SettingsPage() {
  return (
    <main className="mx-auto max-w-[680px] px-6 py-10">
      <SettingsView />
    </main>
  );
}
