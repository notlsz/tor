"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Users, TrendingUp, Network } from 'lucide-react';
import { useSession } from '@/lib/auth-client';

const StatCard = ({
  numberText,
  description,
  icon: Icon,
  className
}) => {
  return (
    <div
      className={`absolute bg-white rounded-2xl shadow-2xl p-4 sm:p-5 w-48 sm:w-[220px] text-center flex flex-col items-center ${className}`}>
      <div className="text-4xl sm:text-5xl font-bold text-gray-900">{numberText}</div>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
      <div className="mt-4 h-[80px] flex items-center justify-center">
        <Icon className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300" strokeWidth={1.5} />
      </div>
    </div>);

};

export default function HeroSection() {
  const { data: session, isPending } = useSession();

  return (
    <section className="relative bg-background pt-32 pb-32 md:pt-40 md:pb-64 overflow-hidden">
      <div className="absolute inset-x-0 bottom-0 h-full">
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/90 to-transparent z-[2]" />
        <Image
          src="https://cdn.prod.website-files.com/68a308040885623f1668ef83/68df7eda52eaf191864268f9_mountain%20copy.webp"
          alt="Wireframe mountain landscape"
          layout="fill"
          objectFit="cover"
          objectPosition="bottom"
          quality={100}
          className="z-[1]" />
      </div>

      <div className="hidden md:block absolute inset-0 z-[5]">
        <div className="relative h-full w-full max-w-6xl mx-auto">
          <StatCard
            numberText="100%"
            description="Invite-Only Network"
            icon={Network}
            className="bottom-[10%] left-[calc(50%-28rem)] transform -rotate-[4deg]" />

          <StatCard
            numberText="Direct"
            description="Creator Connections"
            icon={Users}
            className="bottom-[20%] left-1/2 -translate-x-1/2 z-10" />

          <StatCard
            numberText="Zero"
            description="Platform Fees"
            icon={TrendingUp}
            className="bottom-[8%] right-[calc(50%-28rem)] transform rotate-[3deg]" />
        </div>
      </div>

      <div className="relative z-10 container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-black font-bold text-5xl md:text-7xl !leading-tight tracking-[-0.02em]">
          The Creator Network
          <br className="hidden md:block" />
          Built on Trust
        </h1>
        <p className="mt-6 md:mt-8 text-lg md:text-xl text-muted-foreground mx-auto max-w-2xl">
          Invite-only community where creators connect, collaborate, and build together.
          <br />
          No middlemen. No platform fees. Just direct creator-to-creator collaboration.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          {!isPending && session ?
          <Button asChild className="h-14 px-10 font-medium text-lg">
              <Link href="/discover">
                Discover Creators
              </Link>
            </Button> :

          <>
              <Button asChild className="h-14 px-10 font-medium text-lg">
                <Link href="/register" className="!whitespace-pre-line !whitespace-pre-line">Join Tor

              </Link>
              </Button>
              <Button asChild variant="outline" className="h-14 px-10 font-medium text-lg">
                <Link href="/sign-in">
                  Sign In
                </Link>
              </Button>
            </>
          }
        </div>

        <p className="mt-8 text-sm text-gray-500">

        </p>
      </div>
    </section>);

}