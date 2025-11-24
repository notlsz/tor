import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function BrandsPage() {
  return (
    <>
      <Navigation />
      <main className="pt-32">
        {/* Hero Section */}
        <section className="container py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="hero-headline">
              Find creators.<br />
              Not middlemen.
            </h1>
          </div>
        </section>

        {/* Main Content */}
        <section className="container py-12 md:py-20">
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="space-y-6">
              <p className="body-large text-secondary-text font-medium">
                Influencer marketing is broken.
              </p>
              <p className="body-large text-secondary-text">
                You pay 40% more than you should — not because creators cost that much, but because intermediaries do.
              </p>
            </div>

            <div className="space-y-6 pt-8">
              <h2 className="text-4xl md:text-5xl font-medium">
                Directory fixes that.
              </h2>
              
              <div className="space-y-4 body-large text-secondary-text">
                <p>One search connects you directly to verified creators.</p>
                <p>You see real engagement data, pricing, and audience insights — instantly.</p>
                <p>No markups. No agency lag. Just faster, smarter, cheaper deals.</p>
              </div>
            </div>

            <div className="space-y-6 pt-8 bg-secondary rounded-3xl p-8 md:p-12">
              <p className="body-large text-secondary-text">
                When you pay a creator, they get 100% of it.
              </p>
              <p className="body-large text-secondary-text">
                That means better talent, faster response times, and authentic partnerships that actually convert.
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
                Access the most efficient creator marketplace ever built.
              </p>
            </div>
            <div className="pt-8">
              <Button size="lg" className="text-lg px-12 py-6 h-auto" asChild>
                <Link href="/join">Get Started</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}