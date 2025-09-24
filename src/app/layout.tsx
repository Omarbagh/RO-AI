"use client";

import { useState, ReactNode } from "react";
import {
  ClerkProvider,
  SignInButton,
  UserButton,
  SignUpButton,
  useUser,
} from "@clerk/nextjs";
import { Poppins } from "next/font/google";
import Providers from "./providers";
import { Button } from "@/components/ui/button";
import "../app/styles/globals.css";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Sparkles, Menu, X } from "lucide-react";

type RootLayoutProps = {
  children: ReactNode;
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

// Professional Navbar Component
function ProfessionalNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isSignedIn } = useUser();

  // Handle scroll effect
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setIsScrolled(window.scrollY > 10);
    });
  }

  const navItems = [
    { name: "Features", href: "#features" },
    { name: "Templates", href: "#templates" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Pricing", href: "#pricing" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-transparent backdrop-blur-md shadow-lg border-b border-gray-200/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-[#4F46E5] to-[#7E22CE] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#4F46E5] to-[#7E22CE] bg-clip-text text-transparent">
              CVHero
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-[#4F46E5] transition-colors font-medium text-sm"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isSignedIn ? (
              <div className="flex items-center space-x-4">
                <Link href="/dashboard">
                  <Button
                    variant="ghost"
                    className="text-gray-700 hover:text-[#4F46E5]"
                  >
                    Dashboard
                  </Button>
                </Link>
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <>
                <SignInButton>
                  <Button
                    variant="ghost"
                    className="text-gray-700 hover:text-[#4F46E5]"
                  >
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button className="bg-gradient-to-r from-[#4F46E5] to-[#7E22CE] hover:from-[#5B51E8] hover:to-[#8B5CF6] text-white text-sm">
                    Get Started Free
                  </Button>
                </SignUpButton>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200/50 shadow-xl">
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-gray-700 hover:text-[#4F46E5] transition-colors font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              <div className="pt-4 border-t border-gray-200/50 space-y-3">
                {isSignedIn ? (
                  <>
                    <Link href="/dashboard" className="block w-full">
                      <Button
                        variant="outline"
                        className="w-full justify-center"
                      >
                        Dashboard
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <SignInButton>
                      <Button
                        variant="outline"
                        className="w-full justify-center"
                      >
                        Sign In
                      </Button>
                    </SignInButton>
                    <SignUpButton>
                      <Button className="w-full justify-center bg-gradient-to-r from-[#4F46E5] to-[#7E22CE] text-white">
                        Get Started Free
                      </Button>
                    </SignUpButton>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default function RootLayout({ children }: RootLayoutProps) {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  return (
    <ClerkProvider>
      <html lang="en" className={poppins.variable}>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta
            name="description"
            content="Create professional, ATS-friendly resumes in minutes with AI-powered optimization."
          />
        </head>
        <body className="font-[var(--font-poppins)] antialiased bg-white text-gray-900">
          {/* Conditionally render navbar based on route */}
          {isLandingPage ? <ProfessionalNavbar /> : ""}

          {/* Main content with appropriate padding */}
          <main className={isLandingPage ? "pt-16" : ""}>
            <Providers>{children}</Providers>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
