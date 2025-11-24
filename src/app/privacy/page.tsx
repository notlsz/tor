import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";

export default function PrivacyPage() {
  return (
    <>
      <Navigation />
      <main className="pt-32">
        {/* Hero Section */}
        <section className="container py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="hero-headline">
              Privacy Policy
            </h1>
          </div>
        </section>

        {/* Main Content */}
        <section className="container py-12 md:py-20">
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="space-y-6">
              <p className="body-large text-secondary-text">
                Effective Date: October 17, 2025<br />
                Last Updated: October 17, 2025
              </p>
              <p className="body-large text-secondary-text">
                Welcome to Tor ("Tor," "we," "our," "us"), the creator platform at usetor.xyz. This Privacy Policy explains how we collect, use, and disclose personal information. California residents also see the "California Privacy Notice" below for rights and disclosures required by the CCPA/CPRA.
              </p>
              <p className="body-large text-secondary-text">
                Contact: privacy@usetor.xyz
              </p>
            </div>

            <div className="space-y-6 pt-8">
              <h2 className="text-4xl md:text-5xl font-medium">
                Notice at Collection (California)
              </h2>
              
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-medium">What we collect and why</h3>
                <ul className="space-y-3 body-large text-secondary-text list-disc pl-6">
                  <li><strong>Identifiers:</strong> name, email, wallet address, device identifiers. Purpose: account, security, payments, support, fraud prevention, product analytics.</li>
                  <li><strong>Commercial/transaction:</strong> deals, settlements, subscription status. Purpose: operate the Service, tax/accounting, fraud prevention.</li>
                  <li><strong>Internet/network activity:</strong> pages, clicks, session time, referral source, IP. Purpose: secure logins, troubleshoot, privacy‑friendly analytics.</li>
                  <li><strong>Geolocation (coarse, derived from IP):</strong> city/region level only. Purpose: abuse/fraud controls, regional settings.</li>
                  <li><strong>User content/communications:</strong> support tickets, feedback. Purpose: support, product improvement.</li>
                  <li><strong>Verification data (optional/if applicable):</strong> ID/KYC for verified creators/brands. Purpose: compliance, trust & safety.</li>
                  <li><strong>Sensitive personal information (only if you choose to provide and only for limited purposes):</strong> government ID for verification. Purpose: to verify identity or comply with law; not used to infer characteristics.</li>
                </ul>
              </div>

              <div className="space-y-4 pt-6">
                <h3 className="text-2xl md:text-3xl font-medium">Retention (high level)</h3>
                <ul className="space-y-3 body-large text-secondary-text list-disc pl-6">
                  <li><strong>Account:</strong> retained while your account is active; deleted/anonymized within 90 days of closure unless needed for legal obligations.</li>
                  <li><strong>Transactions/financial records:</strong> 5–7 years (tax/accounting).</li>
                  <li><strong>Support tickets:</strong> 24 months.</li>
                  <li><strong>On‑chain:</strong> public/immutable; we minimize what we write.</li>
                </ul>
              </div>

              <div className="space-y-4 pt-6">
                <h3 className="text-2xl md:text-3xl font-medium">Do we sell or share?</h3>
                <ul className="space-y-3 body-large text-secondary-text list-disc pl-6">
                  <li>We do not sell personal information for money.</li>
                  <li>We do not "share" personal information for cross‑context behavioral advertising. If this changes, we will provide a Do Not Sell/Share link and honor Global Privacy Control (GPC) signals.</li>
                </ul>
              </div>
            </div>

            <div className="space-y-6 pt-8">
              <h2 className="text-4xl md:text-5xl font-medium">
                1) Information We Collect
              </h2>
              <ul className="space-y-3 body-large text-secondary-text list-disc pl-6">
                <li><strong>You provide:</strong> name, email, wallet address, profile details, communications, verification info (if you seek verification).</li>
                <li><strong>Automatically:</strong> usage and device data, IP‑derived region, cookies/local storage for secure sessions and analytics.</li>
                <li><strong>On‑chain:</strong> wallet addresses and transactions that interact with Tor's services.</li>
                <li><strong>From partners:</strong> analytics providers, payment/settlement processors, verification vendors (limited scoped data).</li>
              </ul>
            </div>

            <div className="space-y-6 pt-8">
              <h2 className="text-4xl md:text-5xl font-medium">
                2) How We Use Information
              </h2>
              <ul className="space-y-3 body-large text-secondary-text list-disc pl-6">
                <li>Operate and improve the Service.</li>
                <li>Facilitate creator–brand connections and deals.</li>
                <li>Process/verify transactions and prevent fraud.</li>
                <li>Provide support and security notices.</li>
                <li>Comply with legal obligations and enforce Terms.</li>
                <li>Build new features using aggregated insights.</li>
              </ul>
              <p className="body-large text-secondary-text pt-4">
                We do not use personal information to infer characteristics beyond what's needed to provide the Service. We do not use or disclose sensitive personal information for purposes other than permitted limited purposes (e.g., verification, security, compliance).
              </p>
            </div>

            <div className="space-y-6 pt-8">
              <h2 className="text-4xl md:text-5xl font-medium">
                3) On‑Chain Transparency
              </h2>
              <p className="body-large text-secondary-text">
                Public blockchains are viewable by anyone and data is typically immutable. We minimize on‑chain personal information and only record what's necessary for settlement/authenticity.
              </p>
            </div>

            <div className="space-y-6 pt-8">
              <h2 className="text-4xl md:text-5xl font-medium">
                4) Cookies and Analytics
              </h2>
              <ul className="space-y-3 body-large text-secondary-text list-disc pl-6">
                <li><strong>Essential cookies/local storage:</strong> authentication, preferences, security.</li>
                <li><strong>Privacy‑friendly analytics:</strong> used to understand aggregate usage; not for cross‑context behavioral ads.</li>
                <li>You can adjust browser settings; some features may be limited.</li>
              </ul>
            </div>

            <div className="space-y-6 pt-8">
              <h2 className="text-4xl md:text-5xl font-medium">
                5) How We Disclose Information
              </h2>
              <p className="body-large text-secondary-text">
                We disclose personal information to service providers and contractors under written agreements that restrict processing to our instructions:
              </p>
              <ul className="space-y-3 body-large text-secondary-text list-disc pl-6">
                <li>Payments/crypto settlement (e.g., processors, on‑chain relayers).</li>
                <li>Verification/KYC (if you opt in/are required for verification).</li>
                <li>Analytics and error monitoring.</li>
                <li>Cloud hosting and infrastructure.</li>
                <li>Legal/regulatory disclosures when required.</li>
              </ul>
              <p className="body-large text-secondary-text pt-4">
                We do not permit vendors to use personal information for their own marketing.
              </p>
            </div>

            <div className="space-y-6 pt-8">
              <h2 className="text-4xl md:text-5xl font-medium">
                6) Security
              </h2>
              <p className="body-large text-secondary-text">
                TLS in transit; encryption at rest for databases; least‑privilege, role‑based access; rate‑limited APIs; audit logging; periodic access reviews; annual third‑party penetration testing. If a breach creates a risk to you, we will notify you and regulators as required.
              </p>
            </div>

            <div className="space-y-6 pt-8">
              <h2 className="text-4xl md:text-5xl font-medium">
                7) Data Retention
              </h2>
              <p className="body-large text-secondary-text">
                See "Notice at Collection" for durations. When data is no longer needed, we delete or de‑identify it, subject to legal requirements.
              </p>
            </div>

            <div className="space-y-6 pt-8">
              <h2 className="text-4xl md:text-5xl font-medium">
                8) Your Choices
              </h2>
              <ul className="space-y-3 body-large text-secondary-text list-disc pl-6">
                <li><strong>Email settings:</strong> unsubscribe from marketing; transactional/security emails continue.</li>
                <li><strong>Cookies:</strong> manage in browser settings.</li>
                <li><strong>Do Not Sell/Share:</strong> not applicable today; if this changes, we will provide a link and honor GPC signals.</li>
              </ul>
            </div>

            <div className="space-y-6 pt-8">
              <h2 className="text-4xl md:text-5xl font-medium">
                9) Children's Privacy
              </h2>
              <p className="body-large text-secondary-text">
                Tor is not directed to children under 16. We do not knowingly collect personal information from children. If we learn we have, we will delete it.
              </p>
            </div>

            <div className="space-y-6 pt-8">
              <h2 className="text-4xl md:text-5xl font-medium">
                10) International Transfers
              </h2>
              <p className="body-large text-secondary-text">
                We may process data in the United States and other countries. We use appropriate safeguards (e.g., SCCs) where required.
              </p>
            </div>

            <div className="space-y-6 pt-8">
              <h2 className="text-4xl md:text-5xl font-medium">
                11) Changes to This Policy
              </h2>
              <p className="body-large text-secondary-text">
                We will post updates here and adjust the "Last Updated" date. For material changes, we will provide additional notice.
              </p>
            </div>

            <div className="space-y-6 pt-8">
              <h2 className="text-4xl md:text-5xl font-medium">
                12) Contact
              </h2>
              <p className="body-large text-secondary-text">
                privacy@usetor.xyz (We operate remotely and do not accept postal mail.)
              </p>
            </div>

            <div className="space-y-6 pt-8">
              <h2 className="text-4xl md:text-5xl font-medium">
                California Privacy Notice (CCPA/CPRA)
              </h2>
              
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-medium">Categories disclosed for business purposes in the past 12 months</h3>
                <ul className="space-y-3 body-large text-secondary-text list-disc pl-6">
                  <li><strong>Identifiers (e.g., email, wallet address):</strong> service providers (hosting, payments, verification), contractors (analytics), legal authorities (when required).</li>
                  <li><strong>Commercial/transaction information:</strong> payment/settlement processors; tax/accounting.</li>
                  <li><strong>Internet/network activity:</strong> analytics and security vendors.</li>
                  <li><strong>Geolocation (coarse, IP‑derived):</strong> security/abuse prevention vendors.</li>
                  <li><strong>User content/communications:</strong> support providers.</li>
                  <li><strong>Sensitive personal information (verification IDs, if provided):</strong> verification vendors and compliance counsel; limited purpose only.</li>
                </ul>
              </div>

              <div className="space-y-4 pt-6">
                <h3 className="text-2xl md:text-3xl font-medium">Sale/Share</h3>
                <p className="body-large text-secondary-text">
                  We do not sell or share personal information as defined by the CCPA/CPRA. If that changes, we will:
                </p>
                <ul className="space-y-3 body-large text-secondary-text list-disc pl-6">
                  <li>Provide a "Do Not Sell or Share My Personal Information" link,</li>
                  <li>Honor Global Privacy Control (GPC) signals, and</li>
                  <li>Offer opt‑out across all browsers/devices we can reasonably link.</li>
                </ul>
              </div>

              <div className="space-y-4 pt-6">
                <h3 className="text-2xl md:text-3xl font-medium">Right to Know, Delete, Correct, Limit Use of Sensitive PI, and Opt‑Out</h3>
                <p className="body-large text-secondary-text">
                  California residents can:
                </p>
                <ul className="space-y-3 body-large text-secondary-text list-disc pl-6">
                  <li><strong>Request to know:</strong> the categories and specific pieces of personal information collected, sources, purposes, and third parties.</li>
                  <li><strong>Request deletion:</strong> we will delete and direct our service providers to delete, subject to legal exceptions.</li>
                  <li><strong>Request correction:</strong> correct inaccurate personal information.</li>
                  <li><strong>Limit use/disclosure of sensitive personal information:</strong> we already restrict use to limited, necessary purposes.</li>
                  <li><strong>Opt‑out of sale/share:</strong> not applicable today; will be provided if this ever changes.</li>
                  <li><strong>Non‑discrimination:</strong> we will not discriminate against you for exercising your rights.</li>
                </ul>
              </div>

              <div className="space-y-4 pt-6">
                <h3 className="text-2xl md:text-3xl font-medium">How to exercise your rights</h3>
                <ul className="space-y-3 body-large text-secondary-text list-disc pl-6">
                  <li>Email privacy@usetor.xyz with subject "California Privacy Request."</li>
                  <li>Provide the email and/or wallet you used with Tor and the request type (Know, Delete, Correct, Limit).</li>
                  <li><strong>Verification:</strong> we may require you to reply from the account email or sign a message from your wallet.</li>
                  <li><strong>Timing:</strong> we typically respond within 45 days; we may extend by 45 days where permitted and will let you know.</li>
                </ul>
              </div>

              <div className="space-y-4 pt-6">
                <h3 className="text-2xl md:text-3xl font-medium">Authorized agents</h3>
                <p className="body-large text-secondary-text">
                  You may use an authorized agent. We may require proof of the agent's authorization and verification of your identity.
                </p>
              </div>

              <div className="space-y-4 pt-6">
                <h3 className="text-2xl md:text-3xl font-medium">Data retention and minimization</h3>
                <p className="body-large text-secondary-text">
                  We retain personal information only for the periods stated above to operate Tor, meet legal obligations, and prevent fraud, then delete or de‑identify it.
                </p>
              </div>

              <div className="space-y-4 pt-6">
                <h3 className="text-2xl md:text-3xl font-medium">Financial incentives</h3>
                <p className="body-large text-secondary-text">
                  We do not offer programs that provide price or service differences in exchange for personal information. If this changes, we will provide a required notice describing the material terms.
                </p>
              </div>

              <div className="space-y-4 pt-6">
                <h3 className="text-2xl md:text-3xl font-medium">Notice for Do Not Track (DNT) and GPC</h3>
                <p className="body-large text-secondary-text">
                  We do not respond to legacy DNT signals. If we ever sell/share data, we will honor Global Privacy Control (GPC) signals as opt‑outs.
                </p>
              </div>

              <div className="space-y-4 pt-6">
                <h3 className="text-2xl md:text-3xl font-medium">Vendor list</h3>
                <p className="body-large text-secondary-text">
                  We maintain a current list of service providers and contractors and will update material changes in this Policy. All vendors are bound by contracts that restrict processing to our instructions.
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