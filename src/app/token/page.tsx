import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function TokenPage() {
  return (
    <>
      <Navigation />
      <main className="pt-32">
        {/* Hero Section */}
        <section className="container py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="hero-headline">
              The engine behind a fair creator economy
            </h1>
            <p className="text-2xl md:text-3xl text-secondary-text">
              The Tor token isn't a gimmick. It's infrastructure.
            </p>
          </div>
        </section>

        {/* Intro */}
        <section className="container py-12">
          <div className="max-w-3xl mx-auto">
            <p className="body-large text-secondary-text">
              Every transaction on Directory — every deal between a brand and a creator — flows through it.
            </p>
            <p className="text-2xl md:text-3xl font-medium mt-8">
              Here's why that matters.
            </p>
          </div>
        </section>

        {/* Token Features */}
        <section className="container py-12 md:py-20">
          <div className="max-w-3xl mx-auto space-y-16">
            {/* Feature 1 */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="text-5xl font-light text-muted-foreground">1.</span>
                <div className="space-y-4 pt-2">
                  <h3 className="text-3xl md:text-4xl font-medium">
                    Direct value exchange
                  </h3>
                  <div className="space-y-4 body-large text-secondary-text">
                    <p>
                      When a brand pays a creator, the payment settles instantly on-chain — no waiting, no middlemen, no 30-day holds.
                    </p>
                    <p>
                      Creators receive 100% of what they earn, in a transparent, verifiable way.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="text-5xl font-light text-muted-foreground">2.</span>
                <div className="space-y-4 pt-2">
                  <h3 className="text-3xl md:text-4xl font-medium">
                    Shared upside
                  </h3>
                  <div className="space-y-4 body-large text-secondary-text">
                    <p>
                      As more deals happen, token demand increases.
                    </p>
                    <p>
                      That means creators aren't just participants — they're shareholders in the network's growth.
                    </p>
                    <p>
                      The more value they create, the more valuable the ecosystem becomes, and the stronger their own position gets.
                    </p>
                    <p className="font-medium text-foreground pt-4">
                      It's how value should work in the creator economy:<br />
                      The people who build the culture own a piece of it.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="text-5xl font-light text-muted-foreground">3.</span>
                <div className="space-y-4 pt-2">
                  <h3 className="text-3xl md:text-4xl font-medium">
                    Smart incentives
                  </h3>
                  <div className="space-y-3 body-large text-secondary-text">
                    <p>• Brands save on fees, so they run more campaigns.</p>
                    <p>• More campaigns mean more creator payouts.</p>
                    <p>• More payouts mean more token velocity.</p>
                    <p>• More velocity drives token demand — strengthening the system for everyone.</p>
                    <p className="font-medium text-foreground pt-4">
                      That's the flywheel: every deal makes the network faster, fairer, and more valuable.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="text-5xl font-light text-muted-foreground">4.</span>
                <div className="space-y-4 pt-2">
                  <h3 className="text-3xl md:text-4xl font-medium">
                    Transparent economics
                  </h3>
                  <div className="space-y-4 body-large text-secondary-text">
                    <p>
                      The Tor token runs on open, auditable infrastructure.
                    </p>
                    <p>
                      No opaque fees. No surprise deductions.
                    </p>
                    <p>
                      Every transaction is visible — and every participant can verify exactly where value flows.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="text-5xl font-light text-muted-foreground">5.</span>
                <div className="space-y-4 pt-2">
                  <h3 className="text-3xl md:text-4xl font-medium">
                    Designed for longevity
                  </h3>
                  <div className="space-y-4 body-large text-secondary-text">
                    <p>
                      This isn't a "token launch."
                    </p>
                    <p>
                      It's the foundation of a new financial layer for creative work.
                    </p>
                    <p>
                      A system where value flows directly between the people who create and the people who appreciate.
                    </p>
                    <p className="font-medium text-foreground pt-4">
                      The more creators get paid, the stronger the token becomes.<br />
                      The stronger the token becomes, the more creators get paid.
                    </p>
                    <p className="font-medium text-foreground">
                      That's Tor's economic loop — simple, honest, unstoppable.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <p className="text-3xl md:text-4xl font-medium flex items-center justify-center gap-3">
                <ArrowRight className="h-8 w-8" />
                Learn more about how the Tor token powers the Directory.
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