'use client';

import { useState } from 'react';
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import { Poppins } from 'next/font/google';
import { Button } from '@/components/ui/button';
import '../app/styles/globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-poppins',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <ClerkProvider>
      <html lang="en" className={poppins.variable}>
        <body className="font-sans antialiased bg-white text-gray-900">
          {/* Header */}
          <header className="flex items-center px-4 md:px-20 py-4 h-16 mt-5 relative">
            {/* Left: Logo */}
            <div className="flex-1 flex justify-center items-center md:justify-start md:static absolute left-0 right-0 mx-auto md:mx-0 md:relative pointer-events-none md:pointer-events-auto z-10 md:z-auto">
              <img
              className="block md:hidden"
              src="./RO_logo.png"
              alt="Logo"
              style={{
                height: '32px',
                width: 'auto',
                maxWidth: '150px',
                objectFit: 'contain',
                display: 'block',
              }}
              />
            </div>

            {/* Hamburger for mobile (moved to left side) */}
            <button
              className="md:hidden flex items-center px-3 py-2 border rounded text-gray-700 border-gray-300 mr-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation"
              style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }}
            >
              <svg className="fill-current h-6 w-6" viewBox="0 0 20 20">
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>

            {/* Center: Nav */}
            <nav
              className="flex-1 hidden md:flex justify-center items-center"
              style={{
                fontFamily: 'Poppins, sans-serif',
                alignItems: 'flex-end',
                paddingTop: '4px',
              }}
            >
              <ul className="flex gap-6">
                <li>
                  <a href="#" className="text-[#64748B] hover:text-[#4F46E5] transition-colors font-normal">Home</a>
                </li>
                <li>
                  <a href="#" className="text-[#64748B] hover:text-[#4F46E5] transition-colors font-normal">Features</a>
                </li>
                <li>
                  <a href="#" className="text-[#64748B] hover:text-[#4F46E5] transition-colors font-normal whitespace-nowrap">How it works</a>
                </li>
                <li>
                  <a href="#" className="text-[#64748B] hover:text-[#4F46E5] transition-colors font-normal">Pricing</a>
                </li>
                <li>
                  <a href="#" className="text-[#64748B] hover:text-[#4F46E5] transition-colors font-normal">FAQ</a>
                </li>
              </ul>
            </nav>

            {/* Mobile Nav */}
            {menuOpen && (
              <nav className="absolute top-full left-0 w-full bg-white shadow-md md:hidden z-50">
                <ul className="flex flex-col gap-2 p-4">
                  <li>
                    <a href="#" className="block text-[#64748B] hover:text-[#4F46E5] transition-colors font-normal">Home</a>
                  </li>
                  <li>
                    <a href="#" className="block text-[#64748B] hover:text-[#4F46E5] transition-colors font-normal">Features</a>
                  </li>
                  <li>
                    <a href="#" className="block text-[#64748B] hover:text-[#4F46E5] transition-colors font-normal whitespace-nowrap">How it works</a>
                  </li>
                  <li>
                    <a href="#" className="block text-[#64748B] hover:text-[#4F46E5] transition-colors font-normal">Pricing</a>
                  </li>
                  <li>
                    <a href="#" className="block text-[#64748B] hover:text-[#4F46E5] transition-colors font-normal">FAQ</a>
                  </li>
                </ul>
              </nav>
            )}

            {/* Right: Auth buttons */}
            <div className="flex-1 flex justify-end items-center gap-4">
              <SignedOut>
                <SignInButton>
                  <Button
                    className="w-[100px] h-[36px] rounded-full bg-[#4F46E5] py-2 px-3 text-sm md:w-[130px] md:h-[40px] md:px-4 md:text-base"
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 600,
                      fontStyle: 'normal',
                      letterSpacing: '0%',
                      verticalAlign: 'middle',
                    }}
                  >
                    <span className="hidden sm:inline">Login</span>
                    <span className="inline sm:hidden">Log in</span>
                  </Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>
          </header>

          {/* Page content */}
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
