import React from 'react';
import Image from 'next/image';

const brandsRow1 = [
  { src: 'https://cdn.prod.website-files.com/68a308040885623f1668ef83/68a59be11b8d5c27a5b034f6_Strivepoint%20Capital.svg', alt: 'Strivepoint Capital logo' },
  { src: 'https://cdn.prod.website-files.com/68a308040885623f1668ef83/68a59be0623b556f3b4b74cd_Flux%20Capital.svg', alt: 'Flux Capital logo' },
  { src: 'https://cdn.prod.website-files.com/68a308040885623f1668ef83/68a59be03502c2d385a4df12_M1C.svg', alt: 'M1C logo' },
  { src: 'https://cdn.prod.website-files.com/68a308040885623f1668ef83/68a59be0847494bbf263d07f_Plug%20and%20Play.svg', alt: 'Plug and Play logo' },
  { src: 'https://cdn.prod.website-files.com/68a308040885623f1668ef83/68a59be0938b2e9256206551_SYZL.svg', alt: 'SYZL logo' },
  { src: 'https://cdn.prod.website-files.com/68a308040885623f1668ef83/68a59be019eb0bb68eb21321_MERCATO.svg', alt: 'MERCATO logo' },
  { src: 'https://cdn.prod.website-files.com/68a308040885623f1668ef83/68a59be0992b8d834e2d60f6_DFS%20Lab.svg', alt: 'DFS Lab logo' },
  { src: 'https://cdn.prod.website-files.com/68a308040885623f1668ef83/68a59be057d5917e418bc894_ELOS.svg', alt: 'ELOS logo' },
  { src: 'https://cdn.prod.website-files.com/68a308040885623f1668ef83/68a59be03991d323b35d4e1d_gratia.svg', alt: 'gratia logo' },
  { src: 'https://cdn.prod.website-files.com/68a308040885623f1668ef83/68a59be057d5917e418bc891_Gaingels.svg', alt: 'Gaingels logo' },
  { src: 'https://cdn.prod.website-files.com/68a308040885623f1668ef83/68a59be04716e86744ae3a47_Farm%20and%20Yard.svg', alt: 'Farm and Yard logo' },
  { src: 'https://cdn.prod.website-files.com/68a308040885623f1668ef83/68a5efed284595d27212b3a4_Cratoflow.svg', alt: 'Cratoflow logo' },
];

const brandsRow2 = [
  { src: 'https://cdn.prod.website-files.com/68a308040885623f1668ef83/68a59be08f58bfd8174f4a9f_Fairway%20Finder.svg', alt: 'Fairway Finder logo' },
  { src: 'https://cdn.prod.website-files.com/68a308040885623f1668ef83/68a59be078a2d627fa5f0897_Fuel%20Up.svg', alt: 'Fuel Up logo' },
  { src: 'https://cdn.prod.website-files.com/68a308040885623f1668ef83/68a59be0687e8026b39faa72_The%20Venture%20Dept.svg', alt: 'The Venture Dept logo' },
  { src: 'https://cdn.prod.website-files.com/68a308040885623f1668ef83/68a59be0333e959bbd96c371_EcoAuto.svg', alt: 'EcoAuto logo' },
  { src: 'https://cdn.prod.website-files.com/68a308040885623f1668ef83/68a59be0b709ee2c2958989a_VB.svg', alt: 'VB logo' },
  { src: 'https://cdn.prod.website-files.com/68a308040885623f1668ef83/68a59be0e3ffbc8c6ad48935_Antler.svg', alt: 'Antler logo' },
  { src: 'https://cdn.prod.website-files.com/68a308040885623f1668ef83/68a59be03aa7ec844111e36a_Oral%20Genome.svg', alt: 'Oral Genome logo' },
  { src: 'https://cdn.prod.website-files.com/68a308040885623f1668ef83/68a59be06ad268e6e0e0cdc9_MIDAS.svg', alt: 'MIDAS logo' },
  { src: 'https://cdn.prod.website-files.com/68a308040885623f1668ef83/68a59be03502c2d385a4dedf_Pinwheel.svg', alt: 'Pinwheel logo' },
  { src: 'https://cdn.prod.website-files.com/68a308040885623f1668ef83/68a59be0fbf116549b66a3d7_The%20mon%20factory.svg', alt: 'The mon factory logo' },
  { src: 'https://cdn.prod.website-files.com/68a308040885623f1668ef83/68a59be0f6ab6233436740c4_8228.svg', alt: '8228 logo' },
];

const TrustedBrands = () => {
  return (
    <section className="bg-[#F9FAFB] py-20">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-[#18191f] leading-tight">
            Trusted by Creators & Brands
          </h2>
          <div className="mt-4">
            <p className="text-lg text-[#4F525B] leading-[28.8px] max-w-3xl mx-auto">
              From independent creators to global brands, Directory powers direct connections without the middleman tax.
            </p>
          </div>
        </div>
        <div className="mt-16 overflow-hidden">
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
              {brandsRow1.map((brand, index) => (
                <img
                  key={index}
                  src={brand.src}
                  alt={brand.alt}
                  className="max-h-12 max-w-[140px] h-auto w-auto"
                  loading="lazy"
                />
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
              {brandsRow2.map((brand, index) => (
                <img
                  key={index}
                  src={brand.src}
                  alt={brand.alt}
                  className="max-h-12 max-w-[140px] h-auto w-auto"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBrands;