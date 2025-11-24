import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";

export default function ContactPage() {
  const contactInfo = [
    {
      title: "General inquiries",
      email: "hello@usetor.xyz",
      description: "Questions about the platform, features, or getting started."
    },
    {
      title: "Partnerships & press",
      email: "partners@usetor.xyz",
      description: "Business development, media inquiries, and collaboration opportunities."
    },
    {
      title: "Support",
      email: "support@usetor.xyz",
      description: "Technical help, account issues, and troubleshooting."
    }
  ];

  return (
    <>
      <Navigation />
      <main className="pt-32">
        {/* Hero Section */}
        <section className="container py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="text-5xl mb-4">✉️</div>
            <h1 className="hero-headline">
              Contact
            </h1>
            <p className="text-2xl md:text-3xl text-secondary-text">
              Talk to the team.
            </p>
            <p className="text-xl text-muted-foreground">
              We read every message.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="container py-12 md:py-20">
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="space-y-8">
              {contactInfo.map((contact, index) => (
                <div 
                  key={index} 
                  className="bg-secondary p-8 md:p-10 rounded-3xl hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-2xl md:text-3xl font-semibold mb-3">
                    {contact.title}
                  </h3>
                  <a 
                    href={`mailto:${contact.email}`}
                    className="text-xl md:text-2xl text-foreground hover:underline font-medium block mb-4"
                  >
                    {contact.email}
                  </a>
                  <p className="body-large text-secondary-text">
                    {contact.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-primary text-primary-foreground p-8 md:p-10 rounded-3xl text-center">
              <p className="text-xl md:text-2xl mb-2">
                You can also reach us through the in-app Help Center.
              </p>
              <p className="text-lg opacity-80">
                Average response time: under 24 hours.
              </p>
            </div>

            <div className="text-center pt-12 space-y-6">
              <p className="text-3xl md:text-4xl font-medium">
                Tor – The Creator Platform
              </p>
              <p className="text-xl md:text-2xl text-secondary-text">
                Built for fairness, speed, and ownership.
              </p>
              <div className="pt-6">
                <p className="text-2xl md:text-3xl font-medium">
                  Direct is destiny.
                </p>
                <p className="text-xl text-secondary-text mt-3">
                  Built by creators. Backed by transparency.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}