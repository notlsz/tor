import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HelpPage() {
  const helpTopics = [
    {
      icon: "👤",
      title: "Account Setup",
      description: "Guides for creating a profile, verifying identity, and linking your wallet."
    },
    {
      icon: "💳",
      title: "Payments",
      description: "Step-by-step help for sending, receiving, and tracking payments through the Tor token."
    },
    {
      icon: "📢",
      title: "Campaigns",
      description: "Learn how to post opportunities, negotiate terms, and finalize collaborations."
    },
    {
      icon: "🔒",
      title: "Security",
      description: "Understand how Tor protects your data, wallets, and transactions with open, verifiable protocols."
    },
    {
      icon: "🛠️",
      title: "Troubleshooting",
      description: "Most issues resolve in minutes. Search our knowledge base or reach out directly — real humans respond."
    }
  ];

  return (
    <>
      <Navigation />
      <main className="pt-32">
        {/* Hero Section */}
        <section className="container py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="text-5xl mb-4">🛠️</div>
            <h1 className="hero-headline">
              Help Center
            </h1>
            <p className="text-2xl md:text-3xl text-secondary-text">
              Need a hand? We've got you.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="container py-12 md:py-20">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="grid md:grid-cols-2 gap-8">
              {helpTopics.map((topic, index) => (
                <div 
                  key={index} 
                  className="bg-secondary p-8 md:p-10 rounded-3xl hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="text-5xl mb-6">{topic.icon}</div>
                  <h3 className="text-2xl md:text-3xl font-semibold mb-4">
                    {topic.title}
                  </h3>
                  <p className="body-large text-secondary-text">
                    {topic.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-primary text-primary-foreground p-10 md:p-12 rounded-3xl text-center">
              <h2 className="text-3xl md:text-4xl font-medium mb-4">
                Still stuck?
              </h2>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                → Contact Support
              </p>
              <Button size="lg" className="text-lg px-12 py-6 h-auto bg-background text-foreground hover:bg-secondary" asChild>
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}