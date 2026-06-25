import type { ReactNode } from "react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-6xl items-center justify-center sm:min-h-[calc(100vh-3rem)] lg:min-h-[calc(100vh-4rem)]">
        <div className="grid w-full overflow-hidden rounded-[16px] border border-border bg-card shadow-lg lg:grid-cols-[46%_1fr] lg:min-h-[660px]">
          {/* Brand panel */}
          <aside className="relative hidden flex-col overflow-hidden bg-ink p-11 lg:flex">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-10 h-[300px] w-[300px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(47,107,255,0.2), transparent 70%)",
              }}
            />

            <Link
              href="/"
              className="relative flex items-center gap-2.5"
            >
              <span className="flex size-7 items-center justify-center rounded-[8px] bg-white text-[15px] font-semibold text-ink">
                C
              </span>
              <span className="text-base font-semibold text-white">CVhero</span>
            </Link>

            <div className="flex-1" />

            <div className="relative">
              <h2 className="text-[34px] font-medium leading-[1.12] tracking-[-0.015em] text-white">
                Je volgende baan begint met een{" "}
                <span className="italic text-[#9DB6FF]">sterk</span> cv.
              </h2>

              <figure className="mt-7 rounded-[14px] border border-white/10 bg-white/[0.06] p-[18px]">
                <blockquote className="text-sm leading-[1.55] text-[#E8E8F0]">
                  &ldquo;Binnen 15 minuten een cv waar ik trots op was. De
                  ATS-score gaf me eindelijk vertrouwen.&rdquo;
                </blockquote>
                <figcaption className="mt-3.5 flex items-center gap-2.5">
                  <span className="flex size-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
                    MV
                  </span>
                  <span className="flex flex-col">
                    <span className="text-[13px] font-semibold text-white">
                      Mark V.
                    </span>
                    <span className="text-[11px] text-[#A4A6BC]">
                      Data Analist · aangenomen bij Adyen
                    </span>
                  </span>
                </figcaption>
              </figure>
            </div>
          </aside>

          {/* Form panel */}
          <main className="flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-14">
            {/* Mobile brand mark */}
            <Link
              href="/"
              className="mb-8 flex items-center gap-2.5 lg:hidden"
            >
              <span className="flex size-7 items-center justify-center rounded-[8px] bg-ink text-[15px] font-semibold text-white">
                C
              </span>
              <span className="text-base font-semibold text-foreground">
                CVhero
              </span>
            </Link>

            <div className="mx-auto w-full max-w-[340px]">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
