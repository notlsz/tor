import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";

export default function TermsPage() {
  return (
    <>
      <Navigation />
      <main className="pt-32">
        {/* Hero Section */}
        <section className="container py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="hero-headline">Terms of Service</h1>
            <p className="body-large text-secondary-text">
              Tor / usetor.xyz
            </p>
            <p className="text-lg text-secondary-text">
              Last Updated: October 17, 2025
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="container py-20 md:py-32">
          <div className="max-w-3xl mx-auto space-y-12">
            {/* Section 1 */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-semibold pt-8">
                1. Acceptance of Terms
              </h2>
              <p className="body-large text-secondary-text">
                By accessing or using Tor ("we," "us," "our") through usetor.xyz or any related service, you agree to these Terms of Service ("Terms"). If you do not agree, do not use the platform.
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-semibold pt-8">
                2. Overview
              </h2>
              <p className="body-large text-secondary-text">
                Tor provides tools and infrastructure for creators and brands to connect, collaborate, and transact transparently on-chain. These Terms govern your access to and use of all Tor services, including any blockchain-enabled, token-based, or AI-powered functionality.
              </p>
            </div>

            {/* Section 3 */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-semibold pt-8">
                3. Eligibility
              </h2>
              <p className="body-large text-secondary-text">
                You must be at least 18 years old to use Tor. By using the platform, you represent and warrant that:
              </p>
              <ul className="list-disc pl-8 space-y-3 body-large text-secondary-text">
                <li>You are legally capable of entering into binding agreements;</li>
                <li>You are not located in, or a resident of, a jurisdiction subject to comprehensive sanctions;</li>
                <li>All information you provide is accurate and up to date.</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-semibold pt-8">
                4. Accounts and Security
              </h2>
              <p className="body-large text-secondary-text">
                You are responsible for maintaining the confidentiality of your account, wallet, and authentication credentials. You must immediately notify us of any unauthorized use or security breach. Tor is not liable for any loss of access, assets, or data resulting from your actions, negligence, or third-party compromise.
              </p>
            </div>

            {/* Section 5 */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-semibold pt-8">
                5. Platform Usage
              </h2>
              <p className="body-large text-secondary-text">
                You agree to use Tor solely for lawful, good-faith purposes and in compliance with these Terms. You may not:
              </p>
              <ul className="list-disc pl-8 space-y-3 body-large text-secondary-text">
                <li>Interfere with or disrupt the platform's functionality or underlying blockchain;</li>
                <li>Use the platform for fraudulent, deceptive, or unlawful transactions;</li>
                <li>Attempt to gain unauthorized access to other accounts, smart contracts, or systems.</li>
              </ul>
            </div>

            {/* Section 6 */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-semibold pt-8">
                6. Payments and Transactions
              </h2>
              <p className="body-large text-secondary-text">
                Transactions between brands and creators occur directly on-chain through the Tor token or other approved settlement assets. All transactions are final once confirmed and recorded on the blockchain. Tor does not control, reverse, or guarantee blockchain performance, gas fees, or settlement speed.
              </p>
              <p className="body-large text-secondary-text">
                Platform fees, if applicable, are disclosed prior to any transaction. You are solely responsible for your use of digital assets, gas fees, and any applicable taxes.
              </p>
            </div>

            {/* Section 7 */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-semibold pt-8">
                7. Token Utility
              </h2>
              <p className="body-large text-secondary-text">
                The Tor token functions solely as a utility asset for ecosystem transactions. It does not represent equity, securities, ownership, or any claim on Tor's assets or profits. You are solely responsible for compliance with all applicable digital asset laws and regulations in your jurisdiction.
              </p>
            </div>

            {/* Section 8 */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-semibold pt-8">
                8. Intellectual Property
              </h2>
              <p className="body-large text-secondary-text">
                All code, trademarks, text, designs, and media associated with Tor and usetor.xyz are owned by or licensed to us. You may not copy, modify, distribute, or reproduce any part of the platform without our written consent.
              </p>
            </div>

            {/* Section 9 */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-semibold pt-8">
                9. Creator and Brand Content
              </h2>
              <p className="body-large text-secondary-text">
                Creators and brands retain ownership of their uploaded content. By submitting content, you grant Tor a limited, revocable, non-exclusive license to display and distribute it solely as required for the operation of the platform. You are responsible for ensuring that your content does not infringe on third-party rights or applicable laws.
              </p>
            </div>

            {/* Section 10 */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-semibold pt-8">
                10. Disclaimer of Warranties
              </h2>
              <p className="body-large text-secondary-text">
                Tor is provided "as is" and "as available." We make no express or implied warranties regarding:
              </p>
              <ul className="list-disc pl-8 space-y-3 body-large text-secondary-text">
                <li>Availability, accuracy, or reliability of services;</li>
                <li>Fitness for a particular purpose or uninterrupted operation;</li>
                <li>Compatibility or performance of third-party integrations, wallets, or blockchain networks.</li>
              </ul>
              <p className="body-large text-secondary-text">
                Use of Tor involves inherent technological and security risks. You assume full responsibility for those risks.
              </p>
            </div>

            {/* Section 11 */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-semibold pt-8">
                11. Limitation of Liability
              </h2>
              <p className="body-large text-secondary-text">
                To the maximum extent permitted by law:
              </p>
              <ul className="list-disc pl-8 space-y-3 body-large text-secondary-text">
                <li>Tor, its affiliates, founders, employees, and partners shall not be liable for any indirect, incidental, consequential, or punitive damages arising from your use of the platform.</li>
                <li>Our aggregate liability for any claim shall not exceed the greater of (a) USD $100 or (b) the total platform fees paid by you to Tor in the 12 months preceding the claim.</li>
              </ul>
            </div>

            {/* Section 12 */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-semibold pt-8">
                12. Platform Responsibility Disclaimer
              </h2>
              <p className="body-large text-secondary-text">
                Tor is not an intermediary, broker, escrow, fiduciary, or agent between creators and brands. All transactions occur directly between users on public blockchain infrastructure. Tor does not guarantee performance, deliverables, or payment completion between parties.
              </p>
            </div>

            {/* Section 13 */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-semibold pt-8">
                13. Indemnification
              </h2>
              <p className="body-large text-secondary-text">
                You agree to indemnify and hold harmless Tor, its affiliates, and personnel from any claims, losses, or liabilities arising from:
              </p>
              <ul className="list-disc pl-8 space-y-3 body-large text-secondary-text">
                <li>Your use of the platform;</li>
                <li>Violation of these Terms; or</li>
                <li>Infringement of intellectual property or other rights.</li>
              </ul>
            </div>

            {/* Section 14 */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-semibold pt-8">
                14. Termination
              </h2>
              <p className="body-large text-secondary-text">
                We may suspend or terminate your access at any time, with or without notice, if we believe you have violated these Terms or engaged in unlawful or harmful activity. Upon termination, all rights granted to you under these Terms shall immediately cease.
              </p>
            </div>

            {/* Section 15 */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-semibold pt-8">
                15. Dispute Resolution & Arbitration
              </h2>
              <p className="body-large text-secondary-text">
                Any dispute arising out of or relating to these Terms shall first be attempted to be resolved through informal negotiation. If unresolved, it shall be settled by binding arbitration under the rules of the American Arbitration Association (AAA), held in Los Angeles County, California. You waive any right to participate in a class action or jury trial.
              </p>
            </div>

            {/* Section 16 */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-semibold pt-8">
                16. Changes to Terms
              </h2>
              <p className="body-large text-secondary-text">
                We may update these Terms at any time. The most current version will always be posted on usetor.xyz. Your continued use of Tor after updates take effect constitutes acceptance of the revised Terms.
              </p>
            </div>

            {/* Section 17 */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-semibold pt-8">
                17. Governing Law
              </h2>
              <p className="body-large text-secondary-text">
                These Terms are governed by and construed in accordance with the laws of the State of California, without regard to conflict-of-law principles.
              </p>
            </div>

            {/* Section 18 */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-semibold pt-8">
                18. Contact
              </h2>
              <p className="body-large text-secondary-text">
                For questions or legal correspondence, please contact us through the support form at usetor.xyz/contact.
              </p>
            </div>

            {/* Closing */}
            <div className="text-center pt-12 space-y-4 border-t border-border mt-16">
              <p className="text-2xl md:text-3xl font-medium">
                Tor — The engine behind a fair creator economy.
              </p>
              <p className="text-xl text-secondary-text">
                Simple. Transparent. Built to last.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}