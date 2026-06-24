import Link from "next/link";
import { Sparkles, Target, Wand2, Check, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MarketingHeader } from "@/components/marketing/marketing-header";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { MarketingFaq } from "@/components/marketing/marketing-faq";

// TODO: wire to Supabase (real template list, live stats, plan pricing)

const FEATURES = [
  {
    icon: Sparkles,
    iconWrap: "bg-accent-soft text-primary",
    title: "AI-tekstassistent",
    body: "Herschrijf zwakke zinnen tot krachtige, resultaatgerichte bullets — in jouw toon.",
  },
  {
    icon: Target,
    iconWrap: "bg-success-soft text-success",
    title: "Live ATS-score",
    body: "Zie direct hoe goed je cv door geautomatiseerde filters komt, en hoe je scoort.",
  },
  {
    icon: Wand2,
    iconWrap: "bg-warning-soft text-warning",
    title: "Tailor naar vacature",
    body: "Plak een vacature en CVhero stemt je cv automatisch af op de juiste trefwoorden.",
  },
];

const EDITOR_POINTS = [
  "Realtime preview op elke wijziging",
  "Wissel template zonder data te verliezen",
  "Inline AI-suggesties terwijl je typt",
];

const TESTIMONIALS = [
  {
    quote:
      "Binnen 15 minuten een cv waar ik trots op was. De ATS-score gaf me eindelijk vertrouwen.",
    initials: "MV",
    avatar: "bg-accent-soft text-primary",
    name: "Mark V.",
    role: "Data Analist",
  },
  {
    quote:
      "De AI herschreef mijn saaie bullets tot iets dat écht overtuigt. Drie gesprekken in een week.",
    initials: "LK",
    avatar: "bg-success-soft text-success",
    name: "Lisa K.",
    role: "Marketeer",
  },
  {
    quote:
      "Als starter wist ik niet waar te beginnen. De LinkedIn-import deed het zware werk voor me.",
    initials: "SK",
    avatar: "bg-warning-soft text-warning",
    name: "Sem K.",
    role: "Recent afgestudeerd",
  },
];

const FREE_FEATURES = [
  { label: "1 cv", muted: false },
  { label: "5 basistemplates", muted: false },
  { label: "PDF-export met watermerk", muted: false },
  { label: "Beperkte AI-suggesties", muted: true },
];

const PRO_FEATURES = [
  "Onbeperkt cv's",
  "Alle 28 premium templates",
  "Onbeperkte AI & tailoring",
  "Cover letters + DOCX-export",
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingHeader />

      <main>
        {/* ===== HERO ===== */}
        <section className="mx-auto grid max-w-[1140px] grid-cols-1 items-center gap-14 px-5 pt-16 pb-14 sm:px-8 lg:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-[13px] py-1.5 text-[12.5px] text-text-body shadow-xs">
              <Sparkles className="size-3.5 text-primary" />
              AI-gedreven · ATS-geoptimaliseerd
            </div>
            <h1 className="text-[44px] font-semibold leading-[1.05] tracking-[-0.025em] sm:text-[56px] lg:text-[62px] lg:leading-[1.02]">
              Een cv dat <span className="text-primary italic">overtuigt</span> —
              in minuten.
            </h1>
            <p className="mt-5 max-w-[460px] text-lg leading-relaxed text-muted-foreground">
              CVhero schrijft mee, optimaliseert voor ATS-systemen en houdt alles
              strak. Jij houdt de regie — wij doen het zware werk.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button size="lg" asChild className="shadow-[0_4px_16px_-4px_rgba(47,107,255,.5)]">
                <Link href="/sign-up">
                  Maak gratis je cv
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/templates">Bekijk templates</Link>
              </Button>
            </div>
            <div className="mt-7 flex items-center gap-3.5">
              <div className="flex">
                <span className="flex size-8 items-center justify-center rounded-full border-2 border-background bg-accent-soft text-xs font-semibold text-primary">
                  JD
                </span>
                <span className="-ml-2.5 flex size-8 items-center justify-center rounded-full border-2 border-background bg-success-soft text-xs font-semibold text-success">
                  MV
                </span>
                <span className="-ml-2.5 flex size-8 items-center justify-center rounded-full border-2 border-background bg-warning-soft text-xs font-semibold text-warning">
                  SK
                </span>
                <span className="-ml-2.5 flex size-8 items-center justify-center rounded-full border-2 border-background bg-ink text-[11px] font-semibold text-white">
                  +
                </span>
              </div>
              <div className="text-[13px] leading-snug text-muted-foreground">
                ⭐ 4,9/5 ·{" "}
                <strong className="text-foreground">36.000+</strong> cv&apos;s
                gemaakt
              </div>
            </div>
          </div>

          {/* Hero resume visual */}
          <div className="relative">
            <div className="absolute -right-5 -top-8 z-0 size-[300px] rounded-full bg-[radial-gradient(circle,rgba(47,107,255,.13),transparent_70%)]" />
            <div className="relative z-[1] rotate-[1.2deg] overflow-hidden rounded-[12px] bg-card shadow-[0_24px_70px_-20px_rgba(20,20,30,.32)]">
              <div className="bg-ink px-7 pt-6 pb-5 text-white">
                <div className="text-2xl font-semibold">Sanne Bakker</div>
                <div className="mt-0.5 text-xs text-[#9DB6FF]">
                  Senior Product Marketeer
                </div>
              </div>
              <div className="px-7 pt-[22px] pb-[26px]">
                <div className="eyebrow mb-[7px] text-[10px] tracking-[0.12em] text-primary">
                  Profiel
                </div>
                <div className="mb-1.5 h-2 rounded bg-border-subtle" />
                <div className="mb-[18px] h-2 w-[85%] rounded bg-border-subtle" />
                <div className="eyebrow mb-[9px] text-[10px] tracking-[0.12em] text-primary">
                  Werkervaring
                </div>
                <div className="mb-[5px] flex justify-between">
                  <div className="h-[9px] w-[120px] rounded bg-ink/15" />
                  <div className="h-[9px] w-[50px] rounded bg-border-subtle" />
                </div>
                <div className="mb-[5px] h-[7px] rounded bg-border-subtle" />
                <div className="mb-4 h-[7px] w-[90%] rounded bg-border-subtle" />
                <div className="flex flex-wrap gap-1.5">
                  <span className="h-[18px] w-16 rounded-[5px] bg-muted" />
                  <span className="h-[18px] w-[50px] rounded-[5px] bg-muted" />
                  <span className="h-[18px] w-[72px] rounded-[5px] bg-muted" />
                </div>
              </div>
            </div>

            {/* Floating ATS chip */}
            <div className="absolute -left-4 bottom-6 z-[2] flex items-center gap-[11px] rounded-[12px] border border-border bg-card px-3.5 py-3 shadow-[0_12px_32px_-10px_rgba(20,20,30,.22)] sm:-left-6">
              <div className="relative size-[38px]">
                <svg width="38" height="38" viewBox="0 0 38 38">
                  <circle
                    cx="19"
                    cy="19"
                    r="15"
                    fill="none"
                    stroke="#EEF1F8"
                    strokeWidth="4"
                  />
                  <circle
                    cx="19"
                    cy="19"
                    r="15"
                    fill="none"
                    stroke="#1E9E6A"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray="94"
                    strokeDashoffset="8"
                    transform="rotate(-90 19 19)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-[11px] font-bold">
                  92
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold">ATS-score</div>
                <div className="text-[11px] text-success">Sterk ✓</div>
              </div>
            </div>

            {/* Floating AI chip */}
            <div className="absolute -right-3 top-8 z-[2] flex items-center gap-[9px] rounded-[11px] bg-ink px-[13px] py-2.5 shadow-[0_12px_32px_-10px_rgba(20,20,30,.3)] sm:-right-5">
              <Sparkles className="size-[13px] text-[#5C86FF]" />
              <span className="text-xs font-medium text-white">
                AI verbeterde 3 zinnen
              </span>
            </div>
          </div>
        </section>

        {/* ===== SOCIAL PROOF ===== */}
        <section className="border-y border-border-subtle bg-card">
          <div className="mx-auto flex max-w-[1140px] flex-wrap items-center justify-center gap-x-10 gap-y-4 px-5 py-[26px] sm:px-8">
            <span className="eyebrow text-[11px] text-subtle">
              Vertrouwd door professionals bij
            </span>
            <div className="flex flex-wrap items-center gap-9 opacity-55">
              <span className="text-[17px] font-bold tracking-[-0.02em]">
                Mollie
              </span>
              <span className="text-[17px] font-bold tracking-[-0.02em]">
                Adyen
              </span>
              <span className="text-[17px] font-extrabold tracking-[-0.04em]">
                bol.
              </span>
              <span className="text-[17px] font-semibold tracking-[0.04em]">
                PICNIC
              </span>
              <span className="text-[17px] font-bold tracking-[-0.02em]">
                Coolblue
              </span>
            </div>
          </div>
        </section>

        {/* ===== FEATURES ===== */}
        <section id="features" className="mx-auto max-w-[1140px] px-5 pt-20 pb-10 sm:px-8">
          <div className="mx-auto mb-12 max-w-[600px] text-center">
            <div className="eyebrow mb-3 text-primary">
              Alles wat je nodig hebt
            </div>
            <h2 className="text-[34px] font-semibold leading-[1.1] tracking-[-0.02em] sm:text-[42px]">
              Sneller schrijven, slimmer solliciteren
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="rounded-[16px] border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-[3px] hover:shadow-lg"
                >
                  <div
                    className={`mb-4 flex size-[42px] items-center justify-center rounded-[11px] ${feature.iconWrap}`}
                  >
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mb-[7px] text-lg font-semibold">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {feature.body}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ===== SPLIT FEATURE (editor showcase) ===== */}
        <section className="mx-auto max-w-[1140px] px-5 py-12 sm:px-8">
          <div className="relative grid grid-cols-1 items-center gap-12 overflow-hidden rounded-[24px] bg-ink p-8 sm:p-13 lg:grid-cols-2 lg:p-[52px]">
            <div className="pointer-events-none absolute -bottom-20 -right-20 size-[340px] rounded-full bg-[radial-gradient(circle,rgba(47,107,255,.2),transparent_70%)]" />
            <div className="relative z-[1]">
              <div className="eyebrow mb-3.5 text-[#5C86FF]">De editor</div>
              <h2 className="text-[30px] font-semibold leading-[1.1] tracking-[-0.02em] text-white sm:text-[38px]">
                Schrijf links, zie rechts
              </h2>
              <p className="mt-[18px] text-base leading-relaxed text-[#B8BACB]">
                Een split-view editor met live preview. Wat je typt verschijnt
                direct op je cv — geen verrassingen bij het exporteren.
              </p>
              <div className="mt-[26px] flex flex-col gap-[13px]">
                {EDITOR_POINTS.map((point) => (
                  <div
                    key={point}
                    className="flex items-center gap-[11px] text-[14.5px] text-[#E8E8F0]"
                  >
                    <Check className="size-4 shrink-0 text-[#5C86FF]" />
                    {point}
                  </div>
                ))}
              </div>
            </div>
            {/* Editor mock */}
            <div className="relative z-[1] rounded-[12px] bg-card p-3.5 shadow-[0_24px_60px_-16px_rgba(0,0,0,.5)]">
              <div className="flex gap-2.5">
                <div className="flex-1">
                  <div className="mb-2.5 h-2 w-14 rounded bg-accent-soft" />
                  <div className="mb-2 h-[34px] rounded-[7px] border border-border bg-muted" />
                  <div className="mb-2 h-[34px] rounded-[7px] border-[1.5px] border-primary bg-card shadow-[0_0_0_3px_rgba(47,107,255,.14)]" />
                  <div className="h-14 rounded-[7px] border border-accent-soft-border bg-[#F6F8FF]" />
                </div>
                <div className="flex-1 rounded-[8px] bg-ink p-3">
                  <div className="mb-2 h-[7px] w-[60px] rounded bg-[#5C86FF]" />
                  <div className="mb-[5px] h-1.5 rounded bg-white/15" />
                  <div className="mb-3 h-1.5 w-[80%] rounded bg-white/15" />
                  <div className="mb-2 h-1.5 w-[50px] rounded bg-[#5C86FF]" />
                  <div className="mb-[5px] h-1.5 rounded bg-white/10" />
                  <div className="h-1.5 w-[70%] rounded bg-white/10" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== TEMPLATE SHOWCASE ===== */}
        <section id="templates" className="mx-auto max-w-[1140px] px-5 pt-16 pb-10 sm:px-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <div className="eyebrow mb-3 text-primary">Templates</div>
              <h2 className="text-[34px] font-semibold leading-[1.1] tracking-[-0.02em] sm:text-[42px]">
                Professioneel, op elk niveau
              </h2>
            </div>
            <Link
              href="/templates"
              className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-sm font-semibold text-primary hover:underline"
            >
              Bekijk alle 28
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {/* t1 Modern */}
            <Link
              href="/templates"
              className="overflow-hidden rounded-[13px] border border-border bg-card shadow-sm transition-all hover:-translate-y-[3px] hover:shadow-lg"
            >
              <div className="aspect-[3/4] bg-card p-3.5">
                <div className="-mx-3.5 -mt-3.5 mb-2.5 h-[42px] rounded-[3px] bg-ink px-3.5 py-2.5">
                  <div className="mb-1 h-2 w-[70px] rounded-[3px] bg-white" />
                  <div className="h-[5px] w-[50px] rounded-[3px] bg-[#9DB6FF]" />
                </div>
                <div className="mb-1.5 h-[5px] w-10 rounded-sm bg-primary" />
                <div className="mb-1 h-[5px] rounded-sm bg-[#EFEDE7]" />
                <div className="mb-3 h-[5px] w-[85%] rounded-sm bg-[#EFEDE7]" />
                <div className="mb-1.5 h-[5px] w-[50px] rounded-sm bg-primary" />
                <div className="mb-1 h-[5px] rounded-sm bg-[#EFEDE7]" />
                <div className="h-[5px] w-[75%] rounded-sm bg-[#EFEDE7]" />
              </div>
              <div className="flex items-center justify-between border-t border-border-subtle px-3.5 py-3">
                <span className="text-[13px] font-semibold">Modern</span>
                <span className="rounded-[5px] bg-accent-soft px-[7px] py-[3px] text-[11px] font-semibold text-primary">
                  Populair
                </span>
              </div>
            </Link>

            {/* t2 Classic */}
            <Link
              href="/templates"
              className="overflow-hidden rounded-[13px] border border-border bg-card shadow-sm transition-all hover:-translate-y-[3px] hover:shadow-lg"
            >
              <div className="aspect-[3/4] bg-card p-3.5 text-center">
                <div className="mx-auto mb-1 mt-1 h-[9px] w-[90px] rounded-[3px] bg-foreground" />
                <div className="mx-auto mb-2.5 h-[5px] w-[60px] rounded-sm bg-subtle" />
                <div className="mb-2.5 h-px bg-border-strong" />
                <div className="mb-1 h-[5px] rounded-sm bg-[#EFEDE7]" />
                <div className="mb-1 h-[5px] rounded-sm bg-[#EFEDE7]" />
                <div className="mx-auto mb-3 h-[5px] w-[80%] rounded-sm bg-[#EFEDE7]" />
                <div className="mx-auto mb-1.5 h-[5px] w-[50px] rounded-sm bg-foreground" />
                <div className="mb-1 h-[5px] rounded-sm bg-[#EFEDE7]" />
                <div className="mx-auto h-[5px] w-[70%] rounded-sm bg-[#EFEDE7]" />
              </div>
              <div className="border-t border-border-subtle px-3.5 py-3">
                <span className="text-[13px] font-semibold">Classic</span>
              </div>
            </Link>

            {/* t3 Sidebar */}
            <Link
              href="/templates"
              className="overflow-hidden rounded-[13px] border border-border bg-card shadow-sm transition-all hover:-translate-y-[3px] hover:shadow-lg"
            >
              <div className="flex aspect-[3/4] bg-card">
                <div className="w-[38%] bg-ink px-2.5 py-3">
                  <div className="mx-auto mb-2.5 size-[26px] rounded-full bg-[#5C86FF]" />
                  <div className="mb-1 h-1 rounded-sm bg-white/20" />
                  <div className="mb-3 h-1 w-[70%] rounded-sm bg-white/20" />
                  <div className="mb-[5px] h-1 w-1/2 rounded-sm bg-[#5C86FF]" />
                  <div className="mb-[3px] h-1 rounded-sm bg-white/15" />
                  <div className="h-1 w-[80%] rounded-sm bg-white/15" />
                </div>
                <div className="flex-1 p-3">
                  <div className="mb-[7px] h-[5px] w-[50px] rounded-sm bg-primary" />
                  <div className="mb-[3px] h-1 rounded-sm bg-[#EFEDE7]" />
                  <div className="mb-3 h-1 w-[85%] rounded-sm bg-[#EFEDE7]" />
                  <div className="mb-[7px] h-[5px] w-[50px] rounded-sm bg-primary" />
                  <div className="mb-[3px] h-1 rounded-sm bg-[#EFEDE7]" />
                  <div className="h-1 w-[70%] rounded-sm bg-[#EFEDE7]" />
                </div>
              </div>
              <div className="border-t border-border-subtle px-3.5 py-3">
                <span className="text-[13px] font-semibold">Sidebar</span>
              </div>
            </Link>

            {/* t4 Minimal */}
            <Link
              href="/templates"
              className="overflow-hidden rounded-[13px] border border-border bg-card shadow-sm transition-all hover:-translate-y-[3px] hover:shadow-lg"
            >
              <div className="aspect-[3/4] bg-card p-4">
                <div className="mb-[3px] h-2.5 w-20 rounded-[3px] bg-foreground" />
                <div className="mb-4 h-[5px] w-[55px] rounded-sm bg-subtle" />
                <div className="mb-[7px] h-1 w-[42px] rounded-sm bg-foreground" />
                <div className="mb-1 h-1 rounded-sm bg-[#EFEDE7]" />
                <div className="mb-3.5 h-1 w-[90%] rounded-sm bg-[#EFEDE7]" />
                <div className="mb-[7px] h-1 w-[42px] rounded-sm bg-foreground" />
                <div className="mb-1 h-1 rounded-sm bg-[#EFEDE7]" />
                <div className="h-1 w-[75%] rounded-sm bg-[#EFEDE7]" />
              </div>
              <div className="border-t border-border-subtle px-3.5 py-3">
                <span className="text-[13px] font-semibold">Minimalist</span>
              </div>
            </Link>
          </div>
        </section>

        {/* ===== PRICING ===== */}
        <section id="pricing" className="mx-auto max-w-[1140px] px-5 pt-18 pb-10 sm:px-8">
          <div className="mx-auto mb-11 max-w-[560px] text-center">
            <div className="eyebrow mb-3 text-primary">Prijzen</div>
            <h2 className="text-[34px] font-semibold leading-[1.1] tracking-[-0.02em] sm:text-[42px]">
              Begin gratis. Upgrade als je klaar bent.
            </h2>
          </div>
          <div className="mx-auto grid max-w-[780px] grid-cols-1 gap-[22px] md:grid-cols-2">
            {/* Free */}
            <div className="rounded-[18px] border border-border bg-card p-[30px] shadow-sm">
              <div className="text-sm font-semibold text-muted-foreground">
                Free
              </div>
              <div className="mb-1 mt-3 flex items-baseline gap-1">
                <span className="text-[46px] font-semibold">€0</span>
                <span className="text-sm text-subtle">/maand</span>
              </div>
              <p className="mb-[22px] text-[13.5px] text-muted-foreground">
                Perfect om te starten en je eerste cv te maken.
              </p>
              <Button variant="secondary" className="mb-[22px] w-full" asChild>
                <Link href="/sign-up">Gratis beginnen</Link>
              </Button>
              <div className="flex flex-col gap-[11px]">
                {FREE_FEATURES.map((item) => (
                  <div
                    key={item.label}
                    className={`flex gap-2.5 text-[13.5px] ${
                      item.muted ? "text-subtle" : "text-text-body"
                    }`}
                  >
                    <Check
                      className={`size-4 shrink-0 ${
                        item.muted ? "text-disabled-text" : "text-success"
                      }`}
                    />
                    {item.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Pro */}
            <div className="relative overflow-hidden rounded-[18px] bg-ink p-[30px] shadow-[0_20px_50px_-16px_rgba(20,20,30,.4)]">
              <div className="pointer-events-none absolute -right-12 -top-12 size-[200px] rounded-full bg-[radial-gradient(circle,rgba(47,107,255,.27),transparent_70%)]" />
              <div className="relative z-[1]">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#9DB6FF]">
                    Pro
                  </span>
                  <span className="rounded-[6px] bg-[#5C86FF] px-2.5 py-1 text-[11px] font-semibold text-ink">
                    Aanbevolen
                  </span>
                </div>
                <div className="mb-1 mt-3 flex items-baseline gap-1">
                  <span className="text-[46px] font-semibold text-white">
                    €9
                  </span>
                  <span className="text-sm text-[#A4A6BC]">/maand</span>
                </div>
                <p className="mb-[22px] text-[13.5px] text-[#B8BACB]">
                  Alles wat je nodig hebt om de baan te krijgen.
                </p>
                <Button
                  className="mb-[22px] w-full shadow-[0_4px_16px_-4px_rgba(47,107,255,.6)]"
                  asChild
                >
                  <Link href="/sign-up">Word Pro</Link>
                </Button>
                <div className="flex flex-col gap-[11px]">
                  {PRO_FEATURES.map((label) => (
                    <div
                      key={label}
                      className="flex gap-2.5 text-[13.5px] text-[#E8E8F0]"
                    >
                      <Check className="size-4 shrink-0 text-[#5C86FF]" />
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== TESTIMONIALS ===== */}
        <section className="mx-auto max-w-[1140px] px-5 pt-16 pb-10 sm:px-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="rounded-[16px] border border-border bg-card p-6 shadow-sm"
              >
                <div className="mb-[18px] text-[15px] leading-relaxed text-foreground">
                  &ldquo;{t.quote}&rdquo;
                </div>
                <div className="flex items-center gap-[11px]">
                  <div
                    className={`flex size-9 items-center justify-center rounded-full text-sm font-semibold ${t.avatar}`}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold">{t.name}</div>
                    <div className="text-xs text-subtle">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section id="faq" className="mx-auto max-w-[760px] px-5 pt-16 pb-10 sm:px-8">
          <h2 className="mb-9 text-center text-[30px] font-semibold tracking-[-0.02em] sm:text-[36px]">
            Veelgestelde vragen
          </h2>
          <MarketingFaq />
        </section>

        {/* ===== CTA BAND ===== */}
        <section className="mx-auto max-w-[1140px] px-5 pt-12 pb-20 sm:px-8">
          <div className="relative overflow-hidden rounded-[24px] bg-ink p-10 text-center sm:p-14">
            <div className="pointer-events-none absolute -top-24 left-1/2 size-[400px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(47,107,255,.2),transparent_70%)]" />
            <div className="relative z-[1]">
              <h2 className="mx-auto max-w-[560px] text-[34px] font-semibold leading-[1.1] tracking-[-0.02em] text-white sm:text-[42px]">
                Klaar om op te vallen?
              </h2>
              <p className="mx-auto mt-4 max-w-[440px] text-[17px] text-[#B8BACB]">
                Maak vandaag nog je cv. Gratis, geen creditcard nodig.
              </p>
              <Button
                size="lg"
                className="mt-7 shadow-[0_4px_20px_-4px_rgba(47,107,255,.6)]"
                asChild
              >
                <Link href="/sign-up">
                  Maak gratis je cv
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
