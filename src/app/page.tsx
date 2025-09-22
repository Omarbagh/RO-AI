"use client";

import TypewriterTexts from "@/components/TypewriterTexts";
import { Button } from "@/components/ui/button";
import {
  Award,
  DownloadCloud,
  FileCheck2,
  Gauge,
  Palette,
  Shield,
  Sparkles,
  Upload,
  User,
  Wand2,
  FileText,
  TrendingUp,
  Activity,
  Plus,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { PricingTable, SignUpButton } from "@clerk/nextjs";
import LandingFooter from "@/components/LandingFooter";

function useReveal() {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(16px)";
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
        el.style.transition = "opacity .6s ease, transform .6s ease";
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return ref;
}

export default function Index() {
  const howRef = useReveal();
  const featuresRef = useReveal();
  const pricingRef = useReveal();

  return (
    <div className="bg-gradient-to-b from-background via-background to-background min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden aurora">
        {/* Background decorations */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="bg-dot-grid absolute inset-0 opacity-[0.35]" />
          <div className="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-600/30 via-primary/30 to-fuchsia-500/30 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 h-56 w-56 rounded-full bg-primary/10 blur-2xl" />
          <div className="absolute -right-10 top-10 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 pb-16 pt-24 md:pt-28">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
              <Award className="h-3.5 w-3.5" />
              #1 AI Resume Builder
              <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                <Sparkles className="h-3 w-3" /> AI-powered
              </span>
            </div>

            {/* Heading - All on one line */}
            <h1 className="text-balance text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              <span className="bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Create a{" "}
                <span className="relative inline-block">
                  <TypewriterTexts
                    texts={[
                      "job‑winning",
                      "ATS‑friendly",
                      "modern",
                      "AI‑optimized",
                    ]}
                    className="bg-gradient-to-r from-[#4F46E5] to-indigo-400 bg-clip-text text-transparent"
                  />
                </span>
                resume in under{" "}
                <span className="underline decoration-[#4F46E5]/50 decoration-4 underline-offset-4">
                  5 minutes
                </span>
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 text-lg text-muted-foreground">
              Create a standout resume in minutes with the power of AI –
              beautifully designed, fully tailored to your experience, and
              optimized to help you land your next big opportunity with
              confidence.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <SignUpButton>
                <Button
                  size="lg"
                  className="px-8 bg-gradient-to-r from-[#4F46E5] to-[#7E22CE] hover:from-[#5B51E8] hover:to-[#8B5CF6] text-white"
                >
                  Get Started Today
                </Button>
              </SignUpButton>
              <Button asChild size="lg" variant="outline">
                <a href="#pricing">View Pricing</a>
              </Button>
            </div>

            {/* Social proof */}
            <div className="mt-8 text-xs uppercase tracking-widest text-muted-foreground/80">
              Trusted by candidates from
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <span className="opacity-80">Google</span>
              <span className="opacity-80">Microsoft</span>
              <span className="opacity-80">Stripe</span>
              <span className="opacity-80">Shopify</span>
              <span className="opacity-80">Airbnb</span>
            </div>
          </div>

          {/* Real Dashboard Preview */}
          <div className="relative mx-auto mt-14 max-w-6xl rounded-3xl bg-gradient-to-r from-[#4F46E5]/30 via-indigo-400/30 to-fuchsia-400/30 p-[1px] shadow-2xl ring-1 ring-black/5">
            <div className="rounded-[calc(theme(borderRadius.2xl)+2px)] bg-white/90 backdrop-blur-md p-6">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Resume Dashboard
                  </h3>
                  <p className="text-gray-600 text-sm flex items-center gap-1">
                    <Sparkles className="h-3 w-3 text-[#4F46E5]" />
                    AI-powered resume management
                  </p>
                </div>
                <div className="bg-[#4F46E5] text-white px-4 py-2 rounded-lg text-sm font-medium">
                  <Plus className="h-4 w-4 inline mr-1" />
                  Create New
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-br from-white to-indigo-50/50 rounded-lg p-4 border border-gray-200/50">
                  <div className="flex items-center">
                    <div className="p-2 rounded-lg bg-indigo-100">
                      <FileText className="h-4 w-4 text-[#4F46E5]" />
                    </div>
                    <div className="ml-3">
                      <p className="text-xs text-gray-600">Total Resumes</p>
                      <p className="text-lg font-bold text-gray-900">3</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-white to-green-50/50 rounded-lg p-4 border border-gray-200/50">
                  <div className="flex items-center">
                    <div className="p-2 rounded-lg bg-green-100">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-xs text-gray-600">Last Activity</p>
                      <p className="text-lg font-bold text-gray-900">Today</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-white to-blue-50/50 rounded-lg p-4 border border-gray-200/50">
                  <div className="flex items-center">
                    <div className="p-2 rounded-lg bg-blue-100">
                      <Activity className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-xs text-gray-600">Recent Actions</p>
                      <p className="text-lg font-bold text-gray-900">5</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resume Cards Preview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Software Engineer
                      </h4>
                      <p className="text-xs text-gray-500">
                        Updated 2 hours ago
                      </p>
                    </div>
                    <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Active
                    </div>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full mb-2">
                    <div className="h-full bg-[#4F46E5] rounded-full w-3/4"></div>
                  </div>
                  <p className="text-xs text-gray-600">Completion: 75%</p>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Product Manager
                      </h4>
                      <p className="text-xs text-gray-500">Created yesterday</p>
                    </div>
                    <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      Draft
                    </div>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full mb-2">
                    <div className="h-full bg-[#4F46E5] rounded-full w-1/2"></div>
                  </div>
                  <p className="text-xs text-gray-600">Completion: 50%</p>
                </div>
              </div>

              {/* AI Suggestions */}
              <div className="mt-4 bg-gradient-to-r from-[#4F46E5]/5 to-indigo-400/5 rounded-lg p-4 border border-[#4F46E5]/20">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-4 w-4 text-[#4F46E5]" />
                  <span className="text-sm font-medium text-[#4F46E5]">
                    AI Suggestions
                  </span>
                </div>
                <p className="text-xs text-gray-600">
                  Your Software Engineer resume could be improved with more
                  quantifiable achievements. Try our AI optimizer!
                </p>
              </div>
            </div>

            {/* Clouds */}
            <div aria-hidden className="pointer-events-none">
              <div className="absolute -left-10 -top-6 h-24 w-24 rounded-full bg-[#4F46E5]/10 blur-2xl" />
              <div className="absolute -bottom-8 right-20 h-28 w-28 rounded-full bg-indigo-400/20 blur-2xl" />
            </div>
          </div>

          {/* Templates marquee */}
          <div className="mt-14">
            <div className="text-center text-sm font-medium text-muted-foreground">
              Premium templates
            </div>
            <div className="marquee mt-4">
              <div className="marquee-inner">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className="h-36 w-[300px] rounded-xl bg-gradient-to-br from-[#4F46E5]/15 via-background to-indigo-400/15 p-[1px]"
                  >
                    <div className="h-full w-full rounded-[11px] bg-card" />
                  </div>
                ))}
                {[...Array(10)].map((_, i) => (
                  <div
                    key={`dup-${i}`}
                    className="h-36 w-[300px] rounded-xl bg-gradient-to-br from-[#4F46E5]/15 via-background to-indigo-400/15 p-[1px]"
                  >
                    <div className="h-full w-full rounded-[11px] bg-card" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        ref={howRef as any}
        className="relative container mx-auto px-4 py-24"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-10 top-10 h-40 w-40 rounded-full bg-[#4F46E5]/10 blur-2xl" />
          <div className="absolute right-16 bottom-0 h-48 w-48 rounded-full bg-indigo-400/10 blur-3xl" />
        </div>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            How It Works
          </h2>
          <p className="mt-4 text-muted-foreground">
            Upload your resume or start from scratch. Enter details, pick a
            style, and let AI optimize it. Download and apply with confidence!
          </p>
        </div>
        <div className="relative mt-12">
          <div className="hidden lg:block absolute left-0 right-0 top-14 h-px bg-gradient-to-r from-transparent via-[#4F46E5]/30 to-transparent" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Upload,
                title: "Upload or Start Fresh",
                desc: "Import your resume or begin in minutes.",
              },
              {
                icon: User,
                title: "Tell Us About You",
                desc: "Add roles, skills, and achievements.",
              },
              {
                icon: Wand2,
                title: "Let AI Optimize",
                desc: "Enhance impact and pass ATS scans.",
              },
              {
                icon: DownloadCloud,
                title: "Export & Apply",
                desc: "One‑click download in PDF or DOCX.",
              },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div
                key={title}
                className="relative rounded-2xl bg-gradient-to-br from-[#4F46E5]/20 via-transparent to-indigo-400/20 p-[1px] transition-shadow hover:shadow-xl"
              >
                <div className="rounded-[15px] border border-border bg-card p-6">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-[#4F46E5]/20 blur-sm" />
                      <div className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#4F46E5]/10 text-[#4F46E5] ring-1 ring-[#4F46E5]/30">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-muted-foreground">
                      Step {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
                </div>
                <div className="hidden lg:block absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#4F46E5]/40" />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 flex items-center justify-center">
          <SignUpButton>
            <Button
              size="lg"
              className="px-8 bg-gradient-to-r from-[#4F46E5] to-[#7E22CE] hover:from-[#5B51E8] hover:to-[#8B5CF6] text-white"
            >
              Begin Your AI Resume Journey
            </Button>
          </SignUpButton>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        ref={featuresRef as any}
        className="relative container mx-auto px-4 py-24"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/3 top-0 h-56 w-56 rounded-full bg-[#4F46E5]/10 blur-3xl" />
          <div className="absolute right-1/4 bottom-6 h-48 w-48 rounded-full bg-indigo-400/10 blur-3xl" />
        </div>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Key Features
          </h2>
          <p className="mt-4 text-muted-foreground">
            Effortlessly create professional resumes with AI-driven content
            suggestions, customizable templates, real-time feedback, and
            one-click downloads. Stand out with tailored achievements, modern
            design, and seamless editing—all in one place.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: FileCheck2,
              title: "ATS‑Friendly",
              desc: "Built to pass applicant tracking systems.",
            },
            {
              icon: Sparkles,
              title: "AI Bullet Points",
              desc: "Generated, quantified, and tailored.",
            },
            {
              icon: Palette,
              title: "Modern Templates",
              desc: "Curated designs that recruiters love.",
            },
            {
              icon: Gauge,
              title: "Real‑time Scoring",
              desc: "Instant feedback to improve impact.",
            },
            {
              icon: DownloadCloud,
              title: "One‑Click Export",
              desc: "PDF and DOCX downloads anytime.",
            },
            {
              icon: Shield,
              title: "Privacy First",
              desc: "Your data is encrypted and secure.",
            },
          ].map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#4F46E5]/20 via-transparent to-indigo-400/20 p-[1px] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="relative rounded-[15px] border border-border bg-card p-6">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-md bg-[#4F46E5]/10 text-[#4F46E5]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
                {i === 1 && (
                  <span className="absolute right-4 top-4 rounded-full bg-[#4F46E5]/10 px-2 py-0.5 text-[10px] font-semibold text-[#4F46E5]">
                    New
                  </span>
                )}
              </div>
              <div
                className="pointer-events-none absolute -inset-16 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-40"
                style={{
                  background:
                    "radial-gradient(600px circle at var(--x,50%) var(--y,50%), hsl(var(--primary)/.35), transparent 40%)",
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section with Clerk PricingTable */}
      <section
        id="pricing"
        ref={pricingRef as any}
        className="relative container mx-auto px-4 py-24"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/4 top-10 h-48 w-48 rounded-full bg-[#4F46E5]/10 blur-3xl" />
          <div className="absolute right-1/4 bottom-10 h-56 w-56 rounded-full bg-indigo-400/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-xl text-muted-foreground">
            Choose the plan that works best for you. All plans include our core
            AI features.
          </p>
        </div>

        {/* Clerk PricingTable Component */}
        <div className="mt-16 flex justify-center">
          <div className="w-full max-w-6xl">
            <PricingTable />
          </div>
        </div>

        {/* Additional Pricing Info */}
        <div className="mt-12 text-center">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-gradient-to-br from-[#4F46E5]/5 to-indigo-400/5 p-6">
              <Sparkles className="h-8 w-8 text-[#4F46E5] mx-auto mb-4" />
              <h4 className="font-semibold">Free Trial</h4>
              <p className="text-sm text-muted-foreground mt-2">
                14-day free trial on all paid plans
              </p>
            </div>
            <div className="rounded-lg bg-gradient-to-br from-[#4F46E5]/5 to-indigo-400/5 p-6">
              <Shield className="h-8 w-8 text-[#4F46E5] mx-auto mb-4" />
              <h4 className="font-semibold">No Risk</h4>
              <p className="text-sm text-muted-foreground mt-2">
                Cancel anytime, no hidden fees
              </p>
            </div>
            <div className="rounded-lg bg-gradient-to-br from-[#4F46E5]/5 to-indigo-400/5 p-6">
              <DownloadCloud className="h-8 w-8 text-[#4F46E5] mx-auto mb-4" />
              <h4 className="font-semibold">Instant Access</h4>
              <p className="text-sm text-muted-foreground mt-2">
                Get started immediately after signup
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-4 pb-28">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#4F46E5]/15 via-indigo-400/15 to-fuchsia-400/15 p-[1px]">
          <div className="rounded-[22px] border border-border/60 bg-card/70 px-6 py-10 md:px-12 md:py-14 backdrop-blur">
            <div className="mx-auto max-w-3xl text-center">
              <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                Ready to land your next big opportunity?
              </h3>
              <p className="mt-3 text-muted-foreground">
                Build a polished, AI‑optimized resume in minutes.
              </p>
              <div className="mt-6 flex items-center justify-center">
                <SignUpButton>
                  <Button
                    size="lg"
                    className="px-8 bg-gradient-to-r from-[#4F46E5] to-[#7E22CE] hover:from-[#5B51E8] hover:to-[#8B5CF6] text-white"
                  >
                    Get Started Today
                  </Button>
                </SignUpButton>
              </div>
            </div>
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full bg-[#4F46E5]/20 blur-2xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-6 -bottom-6 h-32 w-32 rounded-full bg-indigo-400/20 blur-2xl"
          />
        </div>
      </section>

      {/* Landing Footer */}
      <LandingFooter />

      {/* Marquee Animation Styles */}
      <style jsx global>{`
        .marquee {
          overflow: hidden;
          position: relative;
        }

        .marquee-inner {
          display: flex;
          width: max-content;
          animation: marquee 40s linear infinite;
        }

        .marquee-inner > * {
          margin-right: 1rem;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .bg-dot-grid {
          background-image: radial-gradient(
            circle,
            currentColor 1px,
            transparent 1px
          );
          background-size: 24px 24px;
          color: hsl(var(--muted) / 0.2);
        }

        /* Scroll animations */
        [data-animate] {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease-out;
        }

        [data-animate].animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        /* Clerk Pricing Table Custom Styles */
        .cl-pricing-table {
          border: none !important;
          background: transparent !important;
        }

        .cl-card {
          background: linear-gradient(
            135deg,
            rgba(79, 70, 229, 0.05) 0%,
            rgba(99, 102, 241, 0.05) 100%
          ) !important;
          backdrop-filter: blur(10px) !important;
          border: 1px solid rgba(79, 70, 229, 0.2) !important;
        }
      `}</style>
    </div>
  );
}
