"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSession } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const TorLogo = () => (
  <div className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
    Tor
  </div>
);

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    const { authClient } = await import("@/lib/auth-client");
    await authClient.signOut();
    localStorage.removeItem("bearer_token");
    toast.success("Signed out successfully");
    router.push("/");
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 pt-6 px-4 md:px-6">
        <nav className="mx-auto max-w-7xl bg-white rounded-full shadow-lg border border-gray-100 px-6 md:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-black hover:opacity-80 transition-opacity">
              <TorLogo />
            </Link>

            {/* Compact pill nav matches screenshot: only menu button on right */}
            {/* remove desktop inline links */}

            {/* Menu Button (all breakpoints) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-black text-white hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line y1="1" x2="20" y2="1" stroke="white" strokeWidth="2"/>
                <line y1="7" x2="20" y2="7" stroke="white" strokeWidth="2"/>
                <line y1="13" x2="20" y2="13" stroke="white" strokeWidth="2"/>
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Full-screen menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-white">
          <div className="h-full flex flex-col">
            {/* Header with logo and close button */}
            <div className="flex items-center justify-between px-8 pt-8 pb-6">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                <TorLogo />
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center w-12 h-12 rounded-2xl bg-black text-white hover:bg-gray-800 transition-colors"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Menu items - centered vertically */}
            <div className="flex-1 flex items-center justify-center">
              <nav className="space-y-6 text-center">
                {/* Marketing-style items to match screenshot */}
                <Link
                  href="/creators"
                  className="block text-4xl md:text-5xl font-normal text-gray-800 hover:text-black transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  For Creators
                </Link>
                <Link
                  href="/brands"
                  className="block text-4xl md:text-5xl font-normal text-gray-800 hover:text-black transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  For Brands
                </Link>
                <Link
                  href="/token"
                  className="block text-4xl md:text-5xl font-normal text-gray-800 hover:text-black transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Token
                </Link>
                <Link
                  href="/about"
                  className="block text-4xl md:text-5xl font-normal text-gray-800 hover:text-black transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
              </nav>
            </div>

            {/* Bottom buttons */}
            <div className="px-8 pb-12 space-y-4 max-w-xl mx-auto w-full">
              {!isPending && session ? (
                <Button 
                  size="lg"
                  onClick={handleSignOut}
                  className="w-full bg-black text-white hover:bg-gray-900 text-lg py-6 rounded-xl"
                >
                  Sign Out
                </Button>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="w-full text-lg py-6 rounded-xl border-2" 
                    asChild
                  >
                    <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)}>
                      Sign In
                    </Link>
                  </Button>
                  <Button 
                    size="lg"
                    className="w-full bg-black text-white hover:bg-gray-900 text-lg py-6 rounded-xl" 
                    asChild
                  >
                    <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                      Get Invite
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}