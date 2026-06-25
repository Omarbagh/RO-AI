import type { ReactNode } from "react";

// Full-screen editor shell — intentionally NOT the app sidebar layout.
export default function EditorLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      {children}
    </div>
  );
}
