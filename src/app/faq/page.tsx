import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function FAQPage() {
  const faqs = [
    {
      question: "What is Tor?",
      answer: "Tor is the infrastructure layer for the creator economy — powering direct connections, instant payments, and transparent value exchange."
    },
    {
      question: "What is Directory?",
      answer: "Directory is Tor's first product: a marketplace where creators and brands connect and transact without middlemen or platform fees."
    },
    {
      question: "How does the Tor token work?",
      answer: "Every payment on Directory uses the Tor token. As activity increases, demand for the token rises — rewarding creators and brands who fuel the network."
    },
    {
      question: "Are there fees?",
      answer: "No platform commissions. Network-level gas or blockchain fees may apply, but Tor takes nothing from creators or brands."
    },
    {
      question: "Is it safe?",
      answer: "Yes. Transactions occur on secure, auditable infrastructure. Users retain full custody of their wallets and data."
    },
    {
      question: "When can I join?",
      answer: "Directory opens next month. Early access invitations roll out weekly."
    }
  ];

  return (
    <>
      <Navigation />
      <main className="pt-32">
        {/* Hero Section */}
        <section className="container py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="text-5xl mb-4">❓</div>
            <h1 className="hero-headline">
              FAQ
            </h1>
            <p className="text-2xl md:text-3xl text-secondary-text">
              Quick answers. Straight talk.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="container py-12 md:py-20">
          <div className="max-w-3xl mx-auto space-y-12">
            {faqs.map((faq, index) => (
              <div key={index} className="space-y-4 pb-8 border-b border-border last:border-b-0">
                <h3 className="text-2xl md:text-3xl font-semibold">
                  {faq.question}
                </h3>
                <p className="body-large text-secondary-text">
                  {faq.answer}
                </p>
              </div>
            ))}

            <div className="text-center pt-8">
              <p className="text-2xl md:text-3xl font-medium">
                → Join the waitlist to reserve your spot.
              </p>
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