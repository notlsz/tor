import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CreatorsPage() {
  return (
    <>
      <Navigation />
      <main className="pt-32">
        {/* Hero Section */}
        <section className="container py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="hero-headline">
              Keep what you earn.<br />
              Build what you own.
            </h1>
          </div>
        </section>

        {/* Main Content */}
        <section className="container py-12 md:py-20">
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="space-y-6">
              <p className="body-large text-secondary-text">
                The creator economy is worth $500 billion, yet most of it never reaches creators.
              </p>
              <p className="body-large text-secondary-text">
                Platforms and agencies take 30–50% cuts
              </p>
              <p className="body-large text-secondary-text font-medium">
                For doing what? Sending an email?
              </p>
            </div>

            <div className="space-y-6 pt-8">
              <h2 className="text-4xl md:text-5xl font-medium">
                Directory changes that.
              </h2>
              
              <div className="space-y-4 body-large text-secondary-text">
                <p>Connect directly with brands that need your voice.</p>
                <p>Close deals instantly.</p>
                <p>Get paid in full — no middlemen, no hidden fees, no waiting weeks for a payout.</p>
              </div>
            </div>

            <div className="space-y-6 pt-8 bg-secondary rounded-3xl p-8 md:p-12">
              <p className="body-large text-secondary-text">
                Every deal on Directory uses our token.
              </p>
              <p className="body-large text-secondary-text">
                Meaning you're not just earning income, you're building wealth.
              </p>
              <p className="body-large text-secondary-text">
                As the network grows, your upside grows with it.
              </p>
            </div>

            <div className="space-y-6 pt-8">
              <p className="text-2xl md:text-3xl font-medium">
                Because if you're the one creating the value, you should share in the value.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <p className="text-3xl md:text-4xl font-medium flex items-center justify-center gap-3">
                <ArrowRight className="h-8 w-8" />
                Join Directory.
              </p>
              <p className="text-3xl md:text-4xl font-medium">
                Own your worth.
              </p>
              <p className="text-3xl md:text-4xl font-medium">
                Own your future.
              </p>
            </div>
            <div className="pt-8">
              <Button size="lg" className="text-lg px-12 py-6 h-auto" asChild>
                <Link href="/join">Join Directory</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}