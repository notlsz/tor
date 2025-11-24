import React from 'react';
import Image from 'next/image';

const testimonials = [
  {
    title: "How Sarah Tripled Her Creator Income Without Platform Fees",
    caseStudyUrl: "#",
    videoUrl: "https://cdn.prod.website-files.com/68a308040885623f1668ef83%2F68a5bea812a93d477d2586e8_Rand-transcode.mp4",
    logoUrl: "https://cdn.prod.website-files.com/68a5b5825c246cf03b0c3c5e/68a5cd61749f4430ad4c60e3_688a6062813b981b9c67dd3f_rand%2520logo%2520-%2520weraise%2520(1).png",
    logoAlt: "Creator logo",
    founderName: "Sarah Chen",
    founderTitle: "Content Creator",
    quote: "I used to lose 45% to platforms and agencies. With Directory, I keep everything and the token appreciation means I'm actually building wealth, not just earning.",
  },
  {
    title: "How Marcus Connected With 100+ Brands in One Month",
    caseStudyUrl: "#",
    videoUrl: "https://cdn.prod.website-files.com/68a308040885623f1668ef83%2F68a5bf08aae43745d557d88f_Verteel-transcode.mp4",
    logoUrl: "https://cdn.prod.website-files.com/68a5b5825c246cf03b0c3c5e/68a5cd61a9a8dbe8999f87d8_67b8d531952cbc9eeff1dc5d_Copy%2520of%2520Untitled%2520(1080%2520x%25201080%2520px)%2520(1).png",
    logoAlt: "Creator logo",
    founderName: "Marcus Williams",
    founderTitle: "Video Creator",
    quote: "Within the first month on Directory, I had direct conversations with over 100 brands—no middleman, no cut. Just pure collaboration.",
  },
  {
    title: "How Elena Built a Creator Network That Shares Value",
    caseStudyUrl: "#",
    videoUrl: "https://cdn.prod.website-files.com/68a308040885623f1668ef83%2F68a5bd82fc8483f0a35ef3c7_CHCK%20AI-transcode.mp4",
    logoUrl: "https://cdn.prod.website-files.com/68a5b5825c246cf03b0c3c5e/68a5cd624dd9087a3cd46782_685a317ec234b0aef01c4244_Vector.png",
    logoAlt: "Creator logo",
    founderName: "Elena Rodriguez",
    founderTitle: "Multi-Platform Creator",
    quote: "Directory connected me with creators I never imagined collaborating with. The experience has been incredible, and the tokenomics mean we all win together.",
  },
  {
    title: "How Brand X Found Authentic Talent in 48 Hours",
    caseStudyUrl: "#",
    videoUrl: "https://cdn.prod.website-files.com/68a308040885623f1668ef83%2F68a5be55623b556f3b58af40_Logic-transcode.mp4",
    logoUrl: "https://cdn.prod.website-files.com/68a5b5825c246cf03b0c3c5e/68a5cd62ae16291f859a0f2c_67b8cc133e0da946a7cdccdb_Copy%2520of%2520Untitled%2520(1080%2520x%25201080%2520px).png",
    logoAlt: "Brand logo",
    founderName: "James Park",
    founderTitle: "Brand Marketing Director",
    quote: "We found perfect creator matches in 48 hours. No agency fees, direct communication, and better relationships. The ROI is unmatched.",
  },
  {
    title: "How Mia Saved 20 Hours Per Week on Creator Management",
    caseStudyUrl: "#",
    videoUrl: "https://cdn.prod.website-files.com/68a308040885623f1668ef83%2F68a5bee80e329805eb916567_SYZL-transcode.mp4",
    logoUrl: "https://cdn.prod.website-files.com/68a5b5825c246cf03b0c3c5e/68a5cd627ddfbfd83c3e88a6_685a327f1007e78475e47bb8_syzl.png",
    logoAlt: "Creator logo",
    founderName: "Mia Thompson",
    founderTitle: "Creator & Entrepreneur",
    quote: "Directory saved me 20+ hours per week. It's perfectly suited for creators who are wearing a million hats and need efficient direct connections.",
  },
  {
    title: "How David Built Wealth While Creating Content",
    caseStudyUrl: "#",
    videoUrl: "https://cdn.prod.website-files.com/68a308040885623f1668ef83%2F68a5be869dd6b05715c3b71b_MIDAS-transcode.mp4",
    logoUrl: "https://cdn.prod.website-files.com/68a5b5825c246cf03b0c3c5e/68a5cd641076a4342149f82b_679c8d1569a3afaf671c7d25_Midias.svg",
    logoAlt: "Creator logo",
    founderName: "David Kim",
    founderTitle: "Tech Content Creator",
    quote: "The team is proactive and supportive. But the real game-changer is the tokenomics—I'm not just earning, I'm building real wealth as the network grows.",
  },
];

const QuoteIcon = () => (
    <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-auto text-gray-200 flex-shrink-0 mt-1">
      <path d="M8.25301 19.5C6.19124 19.5 4.36839 18.7848 2.78446 17.3544C1.20054 15.924 0.353012 14.1561 0.241897 12.0506C0.130782 9.88608 0.768397 7.78481 2.15301 5.74684L4.85301 0.5H10.1919L7.49189 8.60759C8.3684 8.71519 9.09189 9.06329 9.66207 9.6519C10.2322 10.2405 10.5173 10.981 10.5173 11.8734C10.5173 12.9494 10.1475 13.8418 9.40794 14.5506C8.66839 15.2595 7.79189 15.6835 6.77979 15.8228L6.45301 15.8861V19.5H8.25301ZM21.953 19.5C19.8912 19.5 18.0684 18.7848 16.4845 17.3544C14.9005 15.924 14.053 14.1561 13.9419 12.0506C13.8308 9.88608 14.4684 7.78481 15.853 5.74684L18.553 0.5H23.8919L21.1919 8.60759C22.0684 8.71519 22.7919 9.06329 23.3621 9.6519C23.9322 10.2405 24.2173 10.981 24.2173 11.8734C24.2173 12.9494 23.8475 13.8418 23.1079 14.5506C22.3684 15.2595 21.4919 15.6835 20.4798 15.8228L20.153 15.8861V19.5H21.953Z" fill="currentColor"/>
    </svg>
);

const TestimonialsGrid = () => {
    return (
        <section className="bg-secondary py-20 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-4xl lg:text-5xl font-normal text-primary-text">Hear From Our Community</h2>
                    <p className="mt-4 body-text text-secondary-text">
                        Hear how creators are keeping more of their earnings and building wealth with Directory.
                    </p>
                </div>
                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-card rounded-2xl border border-border flex flex-col p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
                            <div className="flex-grow">
                                <h3 className="h4 font-medium text-primary-text mb-4 leading-tight">{testimonial.title}</h3>
                                <a href={testimonial.caseStudyUrl} className="button-text inline-block py-2 px-3 border border-border rounded-lg text-secondary-text bg-white hover:bg-secondary transition-colors">
                                    View success story
                                </a>
                                <a href="#" className="mt-6 block relative rounded-xl overflow-hidden aspect-video">
                                    <video
                                        src={testimonial.videoUrl}
                                        loop
                                        muted
                                        autoPlay
                                        playsInline
                                        className="w-full h-full object-cover"
                                        poster=""
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                        <img src={testimonial.logoUrl} alt={testimonial.logoAlt} className="h-8 max-w-[120px] w-auto mb-3" />
                                        <div className="font-semibold text-base">{testimonial.founderName}</div>
                                        <div className="body-small text-gray-200">{testimonial.founderTitle}</div>
                                    </div>
                                </a>
                                <div className="mt-6 flex gap-3 items-start">
                                  <QuoteIcon />
                                  <p className="body-text text-secondary-text">{testimonial.quote}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-16 text-center">
                    <a
                        href="#"
                        className="inline-block bg-primary text-primary-foreground py-3 px-6 rounded-lg font-medium text-base hover:opacity-90 transition-opacity button-text"
                    >
                        Load More Stories
                    </a>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsGrid;