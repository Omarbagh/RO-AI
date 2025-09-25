"use client";

import { useEffect, useRef } from "react";
import { Shield, FileText, Lock, Eye, User, DownloadCloud, Mail, Building } from "lucide-react";
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

export default function PrivacyPolicy() {
  const headerRef = useReveal();
  const contentRef = useReveal();
  const contactRef = useReveal();

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
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
              <Shield className="h-3.5 w-3.5" />
              Your Privacy Matters
            </div>

            {/* Heading */}
            <h1 className="text-balance text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              <span className="bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Privacy Policy
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Transparency and trust are at the core of everything we do. 
              Learn how we protect your data and respect your privacy.
            </p>

            {/* Last Updated */}
            <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#4F46E5]/10 px-4 py-2 text-sm text-[#4F46E5]">
              <FileText className="h-4 w-4" />
              Last updated: {currentDate}
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section ref={contentRef as any} className="relative container mx-auto px-4 py-16">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-10 top-10 h-40 w-40 rounded-full bg-[#4F46E5]/10 blur-2xl" />
          <div className="absolute right-16 bottom-0 h-48 w-48 rounded-full bg-indigo-400/10 blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="mb-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              📜 Privacy Policy – CVHero (by Nova Web Studio)
            </h2>
            <p className="text-lg text-muted-foreground">
              CVHero is a service provided by Nova Web Studio. 
              We respect your privacy and are committed to protecting your personal data.
            </p>
          </div>

          {/* Policy Sections */}
          <div className="space-y-8">
            {/* Section 1 */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#4F46E5]/10 via-transparent to-indigo-400/10 p-[1px]">
              <div className="rounded-[15px] bg-white p-6 md:p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-[#4F46E5]/10">
                    <User className="h-6 w-6 text-[#4F46E5]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">1. Information We Collect</h3>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p><strong>Personal Information:</strong> name, email address, contact details, and any data you choose to include in your CV or profile.</p>
                  <p><strong>Usage Data:</strong> IP address, browser type, device information, and interactions with our website.</p>
                  <p><strong>Cookies & Tracking:</strong> small data files used to improve user experience, analytics, and preferences.</p>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#4F46E5]/10 via-transparent to-indigo-400/10 p-[1px]">
              <div className="rounded-[15px] bg-white p-6 md:p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-green-500/10">
                    <DownloadCloud className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">2. How We Use Your Information</h3>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p>To provide and improve our services (CV creation, storage, and sharing).</p>
                  <p>To communicate with you (updates, customer support, notifications).</p>
                  <p>To ensure security and prevent fraud.</p>
                  <p>To comply with legal obligations.</p>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#4F46E5]/10 via-transparent to-indigo-400/10 p-[1px]">
              <div className="rounded-[15px] bg-white p-6 md:p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-blue-500/10">
                    <Eye className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">3. How We Share Information</h3>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p><strong>We do not sell or rent your personal information.</strong> We may share data only with:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Service providers (hosting, analytics, payment processing) engaged by Nova Web Studio.</li>
                    <li>Legal authorities when required by law.</li>
                    <li>With your explicit consent.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#4F46E5]/10 via-transparent to-indigo-400/10 p-[1px]">
              <div className="rounded-[15px] bg-white p-6 md:p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-purple-500/10">
                    <Lock className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">4. Data Retention</h3>
                </div>
                <p className="text-gray-700">
                  We keep your data only as long as necessary to provide our services or comply with legal obligations.
                </p>
              </div>
            </div>

            {/* Section 5 */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#4F46E5]/10 via-transparent to-indigo-400/10 p-[1px]">
              <div className="rounded-[15px] bg-white p-6 md:p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-orange-500/10">
                    <Shield className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">5. Your Rights</h3>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p>Depending on your location, you may have the right to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Access, correct, or delete your data.</li>
                    <li>Withdraw consent at any time.</li>
                    <li>Request data portability.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 6 */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#4F46E5]/10 via-transparent to-indigo-400/10 p-[1px]">
              <div className="rounded-[15px] bg-white p-6 md:p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-red-500/10">
                    <Lock className="h-6 w-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">6. Security</h3>
                </div>
                <p className="text-gray-700">
                  Nova Web Studio applies reasonable technical and organizational measures to protect your personal information, but no system is 100% secure.
                </p>
              </div>
            </div>

            {/* Section 7 - Company Information */}
            <div ref={contactRef as any} className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#4F46E5]/20 via-transparent to-indigo-400/20 p-[1px]">
              <div className="rounded-[15px] bg-white p-6 md:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-lg bg-[#4F46E5]/10">
                    <Building className="h-6 w-6 text-[#4F46E5]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">7. Company Information</h3>
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
                      <p className="text-gray-600">Pieter van den Hoogenbandstraat 23, 3118JV, Schiedam</p>
                    </div>
                    <div className="flex items-center gap-3">
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
              <Shield className="h-12 w-12 text-[#4F46E5] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Your Trust is Our Priority</h3>
              <p className="text-muted-foreground">
                We're committed to being transparent about our data practices and keeping your information secure.
                If you have any questions about this policy, please don't hesitate to contact us.
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
          color: #4F46E5;
        }
      `}</style>
    </div>
  );
}