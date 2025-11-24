import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ManifestoPage() {
  return (
    <>
      <Navigation />
      <main className="pt-32">
        {/* Hero Section */}
        <section className="container py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="hero-headline">
              Manifesto
            </h1>
            <p className="text-3xl md:text-4xl font-medium text-secondary-text">
              Build the system that pays the people who build the culture.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="container py-12 md:py-20">
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="space-y-6">
              <p className="body-large text-secondary-text">
                The creator economy isn't broken — it's unfinished.
              </p>
              <p className="body-large text-secondary-text">
                Platforms took the power; creators took the risk.
              </p>
            </div>

            <div className="space-y-6 pt-8">
              <h2 className="text-4xl md:text-5xl font-medium">
                It's time to balance that equation.
              </h2>
            </div>

            <div className="space-y-6 pt-8">
              <p className="text-2xl md:text-3xl font-semibold">We believe:</p>
              <div className="space-y-4 body-large text-secondary-text pl-6">
                <p>
                  <strong className="text-foreground">Ownership beats influence.</strong> If you make the value, you should own the value.
                </p>
                <p>
                  <strong className="text-foreground">Transparency beats trust.</strong> Proof is better than promises.
                </p>
                <p>
                  <strong className="text-foreground">Networks beat middlemen.</strong> Connection should never cost a commission.
                </p>
              </div>
            </div>

            <div className="space-y-6 pt-8 bg-secondary rounded-3xl p-8 md:p-12">
              <p className="body-large text-secondary-text">
                Tor exists to give creators and brands a system that reflects those truths.
              </p>
              <p className="body-large text-secondary-text">
                A network where every transaction is fair, every deal is direct, and every participant gains as the network grows.
              </p>
            </div>

            <div className="space-y-6 pt-8">
              <p className="body-large text-secondary-text">
                Because creativity isn't a side hustle. It's an economy.
              </p>
              <p className="body-large text-secondary-text">
                And it deserves infrastructure worthy of its impact.
              </p>
            </div>

            <div className="space-y-4 pt-12 text-center">
              <p className="text-3xl md:text-4xl font-medium">Direct is destiny.</p>
              <p className="text-xl md:text-2xl text-secondary-text">Built by creators. Backed by transparency.</p>
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