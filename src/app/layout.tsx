import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./styles/globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: "CVhero — Carrière, scherper",
    template: "%s · CVhero",
  },
  description:
    "Maak in minuten een professioneel, ATS-vriendelijk cv met AI-ondersteuning. Slimme templates, live preview en directe PDF-export.",
  applicationName: "CVhero",
  keywords: ["cv", "resume", "ATS", "sollicitatie", "AI cv maker", "cv builder"],
  openGraph: {
    type: "website",
    siteName: "CVhero",
    title: "CVhero — Carrière, scherper",
    description:
      "Maak in minuten een professioneel, ATS-vriendelijk cv met AI-ondersteuning.",
    url: appUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "CVhero — Carrière, scherper",
    description:
      "Maak in minuten een professioneel, ATS-vriendelijk cv met AI-ondersteuning.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl" className={poppins.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
