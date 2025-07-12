import { type Metadata } from 'next';
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
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

export const metadata: Metadata = {
  title: 'ResumeAI',
  description: "Bouw moderne AI-cv's met Clerk & Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={poppins.variable}>
        <body className="font-sans antialiased bg-white text-gray-900">
          {/* Header */}
          <header className="flex justify-between items-center px-6 py-4 border-b shadow-sm h-16">
            <div className="text-lg font-semibold text-[#6C47FF]">ResumeAI</div>

            <div className="flex items-center gap-4">
              <SignedOut>
                <SignInButton>
                  <Button
                  >
                    Sign In
                  </Button>
                </SignInButton>

                <SignUpButton>
                  <button
                    className="bg-[#6C47FF] hover:bg-[#5b3bcc] transition-colors duration-200 text-white rounded-md font-medium text-sm px-4 py-2 shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#6C47FF]/50"
                  >
                    Sign Up
                  </button>
                </SignUpButton>
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
