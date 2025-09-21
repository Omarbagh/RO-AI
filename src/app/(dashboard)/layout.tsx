"use client";

import AppLayout from "./Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full">
      <AppLayout>{children}</AppLayout>
    </div>
  );
}