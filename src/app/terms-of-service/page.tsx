"use client";

import { useEffect, useRef } from "react";
import {
  FileText,
  Shield,
  User,
  Lock,
  Scale,
  CreditCard,
  AlertCircle,
  Building,
  Mail,
  Globe,
} from "lucide-react";
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

export default function TermsOfService() {
  const headerRef = useReveal();
  const contentRef = useReveal();
  const contactRef = useReveal();

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-gradient-to-b from-background via-background to-background min-h-screen">
      {/* Header Section */}
      <section className="relative overflow-hidden aurora pt-24 pb-16">
        {/* Background decorations */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="bg-dot-grid absolute inset-0 opacity-[0.35]" />
          <div className="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-600/30 via-primary/30 to-fuchsia-500/30 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 h-56 w-56 rounded-full bg-primary/10 blur-2xl" />
        </div>

        <div className="container mx-auto px-4">
          <div ref={headerRef as any} className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
              <Scale className="h-3.5 w-3.5" />
              Legal Terms
            </div>

            {/* Heading */}
            <h1 className="text-balance text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              <span className="bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Terms of Service
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Understanding our terms helps ensure a smooth experience for
              everyone. Please read these terms carefully before using our
              services.
            </p>

            {/* Last Updated */}
            <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#4F46E5]/10 px-4 py-2 text-sm text-[#4F46E5]">
              <FileText className="h-4 w-4" />
              Last updated: {currentDate}
            </div>
          </div>
        </div>
      </section>

      {/* Terms of Service Content */}
      <section
        ref={contentRef as any}
        className="relative container mx-auto px-4 py-16"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-10 top-10 h-40 w-40 rounded-full bg-[#4F46E5]/10 blur-2xl" />
          <div className="absolute right-16 bottom-0 h-48 w-48 rounded-full bg-indigo-400/10 blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="mb-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              📑 Terms & Conditions – CVHero (by Nova Web Studio)
            </h2>
            <p className="text-lg text-muted-foreground">
              These Terms & Conditions (“Terms”) govern your use of CVHero, a
              service operated by Nova Web Studio. By accessing or using our
              services, you agree to these Terms.
            </p>
          </div>

          {/* Terms Sections */}
          <div className="space-y-8">
            {/* Section 1 */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#4F46E5]/10 via-transparent to-indigo-400/10 p-[1px]">
              <div className="rounded-[15px] bg-white p-6 md:p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-blue-500/10">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    1. Services Provided
                  </h3>
                </div>
                <p className="text-gray-700">
                  CVHero offers tools to create, customize, and share CVs.
                  Features may change or be updated at any time by Nova Web
                  Studio.
                </p>
              </div>
            </div>

            {/* Section 2 */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#4F46E5]/10 via-transparent to-indigo-400/10 p-[1px]">
              <div className="rounded-[15px] bg-white p-6 md:p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-green-500/10">
                    <User className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    2. Eligibility
                  </h3>
                </div>
                <p className="text-gray-700">
                  You must be at least 16 years old, or have the consent of a
                  parent or legal guardian, to use our services (or the minimum
                  legal age in your country).
                </p>
              </div>
            </div>

            {/* Section 3 */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#4F46E5]/10 via-transparent to-indigo-400/10 p-[1px]">
              <div className="rounded-[15px] bg-white p-6 md:p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-purple-500/10">
                    <Shield className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    3. User Responsibilities
                  </h3>
                </div>
                <div className="space-y-3 text-gray-700">
                  <p>
                    You are responsible for the accuracy of the information you
                    provide.
                  </p>
                  <p>
                    You agree not to use CVHero for unlawful, harmful, or
                    fraudulent purposes.
                  </p>
                  <p>
                    You are responsible for keeping your login credentials
                    secure.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#4F46E5]/10 via-transparent to-indigo-400/10 p-[1px]">
              <div className="rounded-[15px] bg-white p-6 md:p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-orange-500/10">
                    <Lock className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    4. Intellectual Property
                  </h3>
                </div>
                <div className="space-y-3 text-gray-700">
                  <p>
                    All content, branding, and design of CVHero are owned by
                    Nova Web Studio.
                  </p>
                  <p>
                    You retain ownership of the content you upload (e.g., CV
                    data), but you grant us a license to use it solely to
                    provide our services.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 5 */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#4F46E5]/10 via-transparent to-indigo-400/10 p-[1px]">
              <div className="rounded-[15px] bg-white p-6 md:p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-teal-500/10">
                    <CreditCard className="h-6 w-6 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    5. Payments (if applicable)
                  </h3>
                </div>
                <div className="space-y-3 text-gray-700">
                  <p>Fees and billing terms will be displayed at checkout.</p>
                  <p>
                    By purchasing, you agree to the listed prices and payment
                    terms set by Nova Web Studio.
                  </p>
                  <p>
                    All subscriptions are non-refundable. You may cancel your
                    subscription at any time, but no refunds or credits will be
                    given for partial billing periods.
                  </p>
                  <p>
                    If you are a consumer in the EU and entitled to a statutory
                    right of withdrawal, this right expires once you agree to
                    the immediate start of the service.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 6 */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#4F46E5]/10 via-transparent to-indigo-400/10 p-[1px]">
              <div className="rounded-[15px] bg-white p-6 md:p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-red-500/10">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    6. Limitation of Liability
                  </h3>
                </div>
                <p className="text-gray-700">
                  CVHero is provided "as is." Nova Web Studio is not liable for
                  any indirect, incidental, or consequential damages arising
                  from your use of our services.
                </p>
              </div>
            </div>

            {/* Section 7 */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#4F46E5]/10 via-transparent to-indigo-400/10 p-[1px]">
              <div className="rounded-[15px] bg-white p-6 md:p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-yellow-500/10">
                    <Shield className="h-6 w-6 text-yellow-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    7. Termination
                  </h3>
                </div>
                <p className="text-gray-700">
                  We reserve the right to suspend or terminate accounts that
                  violate these Terms.
                </p>
              </div>
            </div>

            {/* Section 8 */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#4F46E5]/10 via-transparent to-indigo-400/10 p-[1px]">
              <div className="rounded-[15px] bg-white p-6 md:p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-indigo-500/10">
                    <Globe className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    8. Governing Law
                  </h3>
                </div>
                <p className="text-gray-700">
                  These Terms are governed by the laws of the Netherlands.
                </p>
              </div>
            </div>

            {/* Section 9 */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#4F46E5]/10 via-transparent to-indigo-400/10 p-[1px]">
              <div className="rounded-[15px] bg-white p-6 md:p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-gray-500/10">
                    <FileText className="h-6 w-6 text-gray-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    9. Changes to Terms
                  </h3>
                </div>
                <p className="text-gray-700">
                  Nova Web Studio may update these Terms from time to time.
                  Continued use of the service means you accept the new Terms.
                </p>
              </div>
            </div>

            {/* Section 10 - Company Information */}
            <div
              ref={contactRef as any}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#4F46E5]/20 via-transparent to-indigo-400/20 p-[1px]"
            >
              <div className="rounded-[15px] bg-white p-6 md:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-lg bg-[#4F46E5]/10">
                    <Building className="h-6 w-6 text-[#4F46E5]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    10. Company Information
                  </h3>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p>CVHero is operated by:</p>
                  <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                    <div className="flex items-center gap-3">
                      <Building className="h-5 w-5 text-[#4F46E5]" />
                      <span className="font-semibold">Nova Web Studio</span>
                    </div>
                    <div>
                      <p className="font-medium">KVK:</p>
                      <p className="text-gray-600">95561072</p>
                    </div>
                    <div>
                      <p className="font-medium">Registered Address:</p>
                      <p className="text-gray-600">
                        Pieter van den Hoogenbandstraat 23, 3118JV, Schiedam
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-[#4F46E5]" />
                      <span className="font-medium">Email:</span>
                      <span className="text-gray-600">info@novaweb.studio</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Final Note */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-[#4F46E5]/5 to-indigo-400/5 rounded-2xl p-8 border border-[#4F46E5]/20">
              <Scale className="h-12 w-12 text-[#4F46E5] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Important Legal Notice
              </h3>
              <p className="text-muted-foreground">
                These Terms of Service constitute a legally binding agreement
                between you and Nova Web Studio. By using CVHero, you
                acknowledge that you have read, understood, and agree to be
                bound by these terms.
              </p>
            </div>
          </div>
        </div>
      </section>

      <LandingFooter />

      {/* Global Styles */}
      <style jsx global>{`
        .bg-dot-grid {
          background-image: radial-gradient(
            circle,
            currentColor 1px,
            transparent 1px
          );
          background-size: 24px 24px;
          color: hsl(var(--muted) / 0.2);
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Custom bullet points */
        ul.list-disc li::marker {
          color: #4f46e5;
        }
      `}</style>
    </div>
  );
}
