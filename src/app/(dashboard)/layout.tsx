"use client";

import AppLayout from "./Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <AppLayout>{children}</AppLayout>
    </div>
  );
}