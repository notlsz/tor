import Link from 'next/link';

const TorLogoWhite = () => (
  <div style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '32px', fontWeight: 'bold', color: 'white' }}>
    Tor
  </div>
);

const TorLogoPattern = () => (
  <div style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '24px', fontWeight: 'bold', color: 'white', opacity: 0.15 }}>
    Tor
  </div>
);

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li>
    <Link href={href} className="text-sm text-gray-300 hover:text-white transition-colors duration-200">
      {children}
    </Link>
  </li>
);

export default function Footer() {
  const marqueeItems = Array(20).fill(0);
  
  return (
    <footer className="bg-black text-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          <div className="flex-shrink-0">
            <Link href="/">
              <TorLogoWhite />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 flex-grow">
            <div>
              <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2.5">Platform</h3>
              <ul className="space-y-2">
                <FooterLink href="/creators">For Creators</FooterLink>
                <FooterLink href="/brands">For Brands</FooterLink>
                <FooterLink href="/how-it-works">How It Works</FooterLink>
                <FooterLink href="/token">Token Economics</FooterLink>
              </ul>
            </div>
            <div>
              <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2.5">Resources</h3>
              <ul className="space-y-2">
                <FooterLink href="/about">About Directory</FooterLink>
                <FooterLink href="/manifesto">Manifesto</FooterLink>
                <FooterLink href="/faq">FAQ</FooterLink>
              </ul>
            </div>
            <div>
              <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2.5">Support</h3>
              <ul className="space-y-2">
                <FooterLink href="/help">Help Center</FooterLink>
                <FooterLink href="/contact">Contact Us</FooterLink>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 py-8 w-full inline-flex flex-nowrap overflow-hidden">
          <div className="flex items-center justify-center animate-marquee">
            {marqueeItems.map((_, i) => (
              <div key={`marquee1-${i}`} className="mx-4">
                <TorLogoPattern />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center animate-marquee" aria-hidden="true">
            {marqueeItems.map((_, i) => (
              <div key={`marquee2-${i}`} className="mx-4">
                <TorLogoPattern />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-y-4">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of service</Link>
          </div>
          <div className="text-center">
            © 2025 Tor – The Creator Platform. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}