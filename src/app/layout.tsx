'use client';

import { useState, ReactNode } from 'react';
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import { Poppins } from 'next/font/google';
import Providers from './providers';
import { Button } from '@/components/ui/button';
import '../app/styles/globals.css';
import { usePathname } from 'next/navigation';

type RootLayoutProps = {
  children: ReactNode;
};

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-poppins',
});

export default function RootLayout({ children }: RootLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <ClerkProvider>
      <html lang="en" className={poppins.variable}>
        <body className="font-sans antialiased bg-white text-gray-900">
          {/* Header */}
          {pathname === "/" ? (
            <>
              <header
                className={`
                  flex items-center px-4 md:px-20 py-4 h-16 mt-5 relative
                `}
                style={{
                  transition:
                    'box-shadow 0.3s cubic-bezier(.4,0,.2,1), transform 0.3s cubic-bezier(.4,0,.2,1), margin-top 0.3s cubic-bezier(.4,0,.2,1)',
                }}
              >
                {/* Logo */}
                <div className="flex-1 flex justify-center items-center md:justify-start md:static absolute left-0 right-0 mx-auto md:mx-0 md:relative pointer-events-none md:pointer-events-auto z-10 md:z-auto">
                  <img
                    className="block md:hidden animate-fade-in"
                    src="/RO_logo.png"
                    alt="Logo"
                    style={{ height: '32px', width: 'auto', maxWidth: '150px', objectFit: 'contain' }}
                  />
                </div>

                {/* Hamburger (mobile) */}
                <button
                  className="md:hidden flex items-center px-3 py-2 border rounded text-white border-gray-700 mr-2 transition-colors duration-200 focus:ring-2 focus:ring-[#818CF8]"
                  onClick={() => setMenuOpen(!menuOpen)}
                  aria-label="Toggle navigation"
                  style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.7)' }}
                >
                  <svg
                    className="fill-current h-6 w-6 transition-transform duration-300"
                    style={{ transform: menuOpen ? 'rotate(90deg)' : 'none' }}
                    viewBox="0 0 20 20"
                  >
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                  </svg>
                </button>

                {/* Desktop Nav */}
                <nav className="flex-1 hidden md:flex justify-center items-center" style={{ fontFamily: 'Poppins, sans-serif', paddingTop: '4px' }}>
                  <ul className="flex gap-6">
                    {['Home', 'Features', 'How it works', 'Pricing', 'FAQ'].map((item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className={`
                            text-black hover:text-[#818CF8] transition-colors font-normal
                            relative
                            after:content-[''] after:block after:h-[2px] after:bg-[#818CF8] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left
                          `}
                          style={{ whiteSpace: item === 'How it works' ? 'nowrap' : 'normal' }}
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* Mobile Nav Dropdown */}
                <div
                  className={`absolute top-full left-0 w-full bg-black shadow-md md:hidden z-50 transition-all duration-300 overflow-hidden
                  ${menuOpen ? 'max-h-96 opacity-100 pointer-events-auto' : 'max-h-0 opacity-0 pointer-events-none'}`}
                  style={{ transition: 'max-height 0.4s cubic-bezier(.4,0,.2,1), opacity 0.3s cubic-bezier(.4,0,.2,1)' }}
                >
                  <ul className="flex flex-col gap-2 p-4">
                    {['Home', 'Features', 'How it works', 'Pricing', 'FAQ'].map((item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className={`block text-[#CBD5E1] hover:text-[#818CF8] transition-colors font-normal ${item === 'FAQ' ? 'text-[#64748B] hover:text-[#4F46E5]' : ''}`}
                          style={{ whiteSpace: item === 'How it works' ? 'nowrap' : 'normal' }}
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Auth Buttons */}
                <div className="flex-1 flex justify-end items-center gap-4">
                  <SignedOut>
                    <SignInButton>
                      <Button className="w-[100px] h-[36px] rounded-full bg-black py-2 px-3 text-sm md:w-[170px] md:h-[40px] md:px-4 md:text-sm transition-transform duration-200 text-white" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
                        <span className="hidden sm:inline">Get Started Today</span>
                      </Button>
                    </SignInButton>
                  </SignedOut>
                  <SignedIn>
                    <div className="transition-transform duration-200 hover:scale-105">
                      <UserButton afterSignOutUrl="/" />
                    </div>
                  </SignedIn>
                </div>
              </header>
              <main>
                <Providers>{children}</Providers>
              </main>
            </>
          ) : (
            <main>
              <Providers>{children}</Providers>
            </main>
          )}
        </body>
      </html>
    </ClerkProvider>
  );
}
