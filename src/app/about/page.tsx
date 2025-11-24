import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="pt-32">
        {/* Hero Section */}
        <section className="container py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="hero-headline">
              Tor – The Creator Platform
            </h1>
            <p className="text-3xl md:text-4xl font-medium">
              Direct is destiny.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="container py-12 md:py-20">
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="space-y-6">
              <p className="body-large text-secondary-text">
                The creator economy has outgrown the platforms that built it.
              </p>
              <p className="body-large text-secondary-text">
                Billions flow through agencies, managers, and ad networks — while the people creating the value see half of it vanish.
              </p>
            </div>

            <div className="space-y-6 pt-8">
              <h2 className="text-4xl md:text-5xl font-medium">
                Tor exists to fix that imbalance.
              </h2>
            </div>

            <div className="space-y-6 pt-8">
              <p className="body-large text-secondary-text">
                At its core is Directory — a direct network where creators and brands connect, collaborate, and transact without middlemen.
              </p>
              <p className="body-large text-secondary-text">
                No commissions. No gatekeepers. Just direct value exchange.
              </p>
            </div>

            <div className="space-y-6 pt-8 bg-secondary rounded-3xl p-8 md:p-12">
              <p className="body-large text-secondary-text">
                Each deal is powered by Tor's token — a native unit of value that grows as the network grows.
              </p>
              <p className="body-large text-secondary-text">
                So when creators win, the entire ecosystem wins.
              </p>
            </div>

            <div className="space-y-8 pt-8">
              <h3 className="text-3xl md:text-4xl font-medium">
                Our mission is simple:
              </h3>
              <div className="space-y-4 body-large text-secondary-text pl-6 border-l-4 border-primary">
                <p>To make creative work profitable again.</p>
                <p>To give ownership back to the people who make culture move.</p>
              </div>
            </div>

            <div className="pt-12">
              <p className="text-2xl md:text-3xl font-medium">
                Tor is empowering the road to creator marketing dominance.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-8">
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