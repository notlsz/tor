import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HowItWorksPage() {
  return (
    <>
      <Navigation />
      <main className="pt-32">
        {/* Hero Section */}
        <section className="container py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="hero-headline">
              How It Works
            </h1>
            <p className="text-3xl md:text-4xl font-medium text-secondary-text">
              Two paths. One network.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="container py-12 md:py-20">
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="space-y-6">
              <p className="body-large text-secondary-text">
                Tor's Directory is built for both types of collaboration — Creators who want to work with each other, and brands who want to partner directly with creators.
              </p>
              <p className="body-large text-secondary-text">
                Every interaction runs on the same foundation: instant matching, direct deals, transparent payments.
              </p>
            </div>

            {/* Creator to Creator */}
            <div className="space-y-8 pt-12">
              <div className="flex items-center gap-3">
                <span className="text-4xl">🧩</span>
                <h2 className="text-3xl md:text-4xl font-medium">Creator ↔ Creator Collaboration</h2>
              </div>
              
              <p className="body-large text-secondary-text italic">
                For creators building together — content, projects, or growth.
              </p>

              <div className="space-y-6 pl-4 md:pl-8">
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-2">Step 1: Discover</h3>
                  <p className="body-large text-secondary-text">Browse or search the network to find other verified creators by niche, platform, or location.</p>
                </div>

                <div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-2">Step 2: Connect</h3>
                  <p className="body-large text-secondary-text">Start a chat instantly inside Directory. No external DMs. No middle layers.</p>
                </div>

                <div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-2">Step 3: Collaborate</h3>
                  <p className="body-large text-secondary-text">Agree on terms — shoutouts, cross-posts, co-productions, whatever you need. Everything is transparent and recorded in-platform.</p>
                </div>

                <div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-2">Step 4: Transact</h3>
                  <p className="body-large text-secondary-text">If money changes hands, payment happens instantly through the Tor token. No 30-day waits, no payment processors, no lost invoices.</p>
                </div>

                <div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-2">Step 5: Grow</h3>
                  <p className="body-large text-secondary-text">Each collab strengthens your reputation and reach. Directory learns what types of partnerships drive growth, and recommends new matches over time.</p>
                </div>

                <div className="bg-secondary rounded-3xl p-8 md:p-12 mt-8">
                  <p className="body-large font-semibold">Result: Faster creative partnerships. Zero friction. Full ownership.</p>
                </div>
              </div>
            </div>

            {/* Brand to Creator */}
            <div className="space-y-8 pt-12">
              <div className="flex items-center gap-3">
                <span className="text-4xl">💼</span>
                <h2 className="text-3xl md:text-4xl font-medium">Brand ↔ Creator Collaboration</h2>
              </div>
              
              <p className="body-large text-secondary-text italic">
                For brands running campaigns directly with verified creators.
              </p>

              <div className="space-y-6 pl-4 md:pl-8">
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-2">Step 1: Post</h3>
                  <p className="body-large text-secondary-text">Brands publish an open or invite-only brief on Directory — scope, goals, and budget.</p>
                </div>

                <div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-2">Step 2: Match</h3>
                  <p className="body-large text-secondary-text">The platform instantly surfaces creators who fit — based on engagement quality, style, and audience match.</p>
                </div>

                <div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-2">Step 3: Deal</h3>
                  <p className="body-large text-secondary-text">Creators apply or accept. Both parties agree on deliverables, timelines, and pricing inside the platform — no agency markup.</p>
                </div>

                <div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-2">Step 4: Pay</h3>
                  <p className="body-large text-secondary-text">Payment clears instantly via the Tor token, verified on-chain. Creators keep 100% of their earnings. Brands see exactly where every dollar goes.</p>
                </div>

                <div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-2">Step 5: Measure</h3>
                  <p className="body-large text-secondary-text">Directory tracks completion, engagement, and repeat-collab potential — giving both sides data for smarter future deals.</p>
                </div>

                <div className="bg-secondary rounded-3xl p-8 md:p-12 mt-8">
                  <p className="body-large font-semibold">Result: Faster campaigns. Better matches. Lower costs.</p>
                </div>
              </div>
            </div>

            {/* Flywheel */}
            <div className="space-y-6 pt-12 bg-primary text-primary-foreground rounded-3xl p-8 md:p-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">🔁</span>
                <h2 className="text-3xl md:text-4xl font-medium">One flywheel, two entry points</h2>
              </div>
              
              <p className="body-large">
                Whether it's creator-to-creator or brand-to-creator, every deal feeds the same network loop:
              </p>

              <ol className="list-decimal list-inside space-y-3 body-large pl-4">
                <li>More collaborations → more on-chain transactions</li>
                <li>More transactions → stronger token economy</li>
                <li>Stronger economy → higher creator earnings and faster deal flow</li>
                <li>Which brings in more creators and brands</li>
              </ol>

              <p className="body-large mt-6">
                The system learns, improves, and compounds — automatically.
              </p>
            </div>

            <div className="text-center pt-8">
              <p className="text-2xl md:text-3xl font-medium mb-8">→ The network is live next month.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="pt-8">
              <Button size="lg" className="text-lg px-12 py-6 h-auto" asChild>
                <Link href="/join">Join the Waitlist</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}