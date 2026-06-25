import type { Metadata } from "next";
import { CoverLetterGenerator } from "@/components/cover-letter-generator";

export const metadata: Metadata = {
  title: "Cover letters",
};

export default function CoverLettersPage() {
  return (
    <div>
      <header className="mb-7">
        <h1 className="text-2xl font-semibold tracking-tight">Cover letters</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Genereer een sollicitatiebrief op basis van je cv en de vacature.
        </p>
      </header>

      <CoverLetterGenerator />

      {/* TODO: wire generate to the Claude cover-letter endpoint; persist + list
          previously generated letters per user. */}
    </div>
  );
}
