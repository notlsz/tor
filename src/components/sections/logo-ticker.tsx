import Image from "next/image";

const logos = [
  {
    src: "https://cdn.prod.website-files.com/68a308040885623f1668ef83/68a48b5e1e43d7644310e1a5_plug%20and%20play.svg",
    alt: "Plug and Play",
  },
  {
    src: "https://cdn.prod.website-files.com/68a308040885623f1668ef83/68a48b5ece240f9aea4928e8_village%20global.svg",
    alt: "Village Global",
  },
  {
    src: "https://cdn.prod.website-files.com/68a308040885623f1668ef83/68a48b5efa1dd9be21794a73_ycombinator.svg",
    alt: "Y Combinator",
  },
  {
    src: "https://cdn.prod.website-files.com/68a308040885623f1668ef83/68a48b5ef14a337e1155ab2e_accel.svg",
    alt: "Accel",
  },
  {
    src: "https://cdn.prod.website-files.com/68a308040885623f1668ef83/68a48b5e0b6c2ab26b3f5e13_a16z.svg",
    alt: "a16z",
  },
  {
    src: "https://cdn.prod.website-files.com/68a308040885623f1668ef83/68a48b5e73058ac815c645a0_500.svg",
    alt: "500",
  },
  {
    src: "https://cdn.prod.website-files.com/68a308040885623f1668ef83/68a48b5e1863792628eb5ca4_sequoia.svg",
    alt: "Sequoia",
  },
  {
    src: "https://cdn.prod.website-files.com/68a308040885623f1668ef83/68a48b5e5e94443c4c767a24_nfx.svg",
    alt: "NFX",
  },
];

const LogoList = ({ isDuplicate = false }: { isDuplicate?: boolean }) => (
  <div
    className="flex-shrink-0 flex items-center"
    aria-hidden={isDuplicate}
  >
    {logos.map((logo, index) => (
      <div key={index} className="px-10">
        <Image
          src={logo.src}
          alt={logo.alt}
          width={158}
          height={40}
          className="h-10 w-auto object-contain"
        />
      </div>
    ))}
  </div>
);

export default function LogoTicker() {
  return (
    <div className="bg-[#F9FAFB] py-16 sm:py-20 lg:py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="body-text text-[#525560]">
            Trusted by leading creators and top brands across every platform.
          </p>
        </div>
        <div className="mt-16 overflow-hidden">
          <style>
            {`
              @keyframes marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-25%); }
              }
              .animate-marquee {
                animation: marquee 80s linear infinite;
              }
            `}
          </style>
          <div className="flex animate-marquee">
            <LogoList />
            <LogoList isDuplicate />
            <LogoList isDuplicate />
            <LogoList isDuplicate />
          </div>
        </div>
      </div>
    </div>
  );
}