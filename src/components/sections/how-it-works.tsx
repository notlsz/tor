import { User } from 'lucide-react';

const TorIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 26 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4 text-black"
  >
    <path
      d="M13.62 25H1.42004V0.800049H20.02C23.98 0.800049 26.22 3.04005 26.22 7.00005C26.22 9.40005 25.12 11.26 23.32 12.3C25.32 13.36 26.62 15.36 26.62 17.8C26.62 21.96 24.38 25 19.82 25H18.22V15.7H19.62C21.32 15.7 22.32 16.66 22.32 18C22.32 19.54 21.12 20.7 19.22 20.7H18.22V25H13.62ZM13.62 11.4H18.22C19.72 11.4 20.72 10.4 20.72 9C20.72 7.60005 19.72 6.50005 18.22 6.50005H13.62V11.4Z"
      fill="currentColor"
    />
  </svg>
);

const Step1Visual = () => (
  <div className="w-full h-full min-h-[250px] bg-white rounded-2xl p-6 relative flex items-center justify-center overflow-hidden">
    <div className="absolute top-8 right-8 text-xs bg-gray-100 text-secondary-text px-2 py-1 rounded-md shadow-sm">
      $150k MRR
    </div>
    <div className="absolute top-20 left-4 text-xs bg-gray-100 text-secondary-text px-2 py-1 rounded-md shadow-sm transform -rotate-6">
      20% moM growth
    </div>
    <div className="absolute bottom-16 left-4 text-xs bg-gray-100 text-secondary-text px-2 py-1 rounded-md shadow-sm transform rotate-3">
      Convertible Note
    </div>
    <div className="absolute bottom-8 right-8 text-xs bg-gray-100 text-secondary-text px-2 py-1 rounded-md shadow-sm transform -rotate-2">
      Impact Investor
    </div>

    <div className="bg-[#F8F9FB] border border-gray-200 rounded-lg p-4 w-64 shadow-md">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
          <User className="w-6 h-6 text-gray-500" />
        </div>
        <div>
          <p className="font-bold text-sm text-black">Richard Hendricks</p>
          <p className="text-xs text-secondary-text">Pied Piper Founder</p>
        </div>
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-secondary-text">Stage</span>
          <span className="bg-white border rounded-md px-2 py-0.5 text-xs font-medium">Seed</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-secondary-text">Traction</span>
          <span className="bg-white border rounded-md px-2 py-0.5 text-xs font-medium">10K+ users</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-secondary-text">Raise Type</span>
          <span className="bg-white border rounded-md px-2 py-0.5 text-xs font-medium">Equity</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-secondary-text">Investor Type</span>
          <span className="bg-white border rounded-md px-2 py-0.5 text-xs font-medium">Angel</span>
        </div>
      </div>
    </div>
  </div>
);

const Step2Visual = () => (
  <div className="w-full h-full min-h-[250px] bg-white rounded-2xl p-6 flex items-center justify-center space-x-4">
    <div className="bg-[#641C3E] text-white p-4 rounded-2xl shadow-lg w-20 h-20 flex items-center justify-center font-bold text-sm">A16Z</div>
    <div className="flex items-center">
      <div className="w-8 h-px bg-gray-300" />
      <div className="bg-white border border-gray-300 rounded-full p-1.5 shadow-sm mx-[-1px] z-10">
        <TorIcon /> 
      </div>
      <div className="w-8 h-px bg-gray-300" />
    </div>
    <div className="bg-[#F8F9FB] border border-gray-200 rounded-lg p-3 w-48 shadow-md">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
          <User className="w-5 h-5 text-gray-500" />
        </div>
        <div>
          <p className="font-bold text-xs text-black">Richard Hendricks</p>
          <p className="text-[10px] text-secondary-text">Pied Piper Founder</p>
        </div>
      </div>
      <div className="mt-2 space-y-1 text-xs">
          <div className="flex justify-between items-center"><span className="text-secondary-text">Stage</span><span className="font-medium">Seed</span></div>
          <div className="flex justify-between items-center"><span className="text-secondary-text">Traction</span><span className="font-medium">10k+ Users</span></div>
          <div className="flex justify-between items-center"><span className="text-secondary-text">Raise Type</span><span className="font-medium">Equity</span></div>
          <div className="flex justify-between items-center"><span className="text-secondary-text">Investor Type</span><span className="font-medium">Angel</span></div>
      </div>
    </div>
  </div>
);

const Step3Visual = () => (
  <div className="w-full h-full min-h-[250px] bg-white rounded-2xl p-6 flex items-center justify-center md:space-x-4">
    <div className="transform -rotate-6">
      <div className="bg-white shadow-lg rounded-lg p-3 w-40 border text-xs leading-snug">
        <p className="font-medium">Name</p>
        <p className="text-secondary-text mb-1.5">info@company.com</p>
        <p className="font-medium">Subject: Excited to connect</p>
        <p className="text-secondary-text mt-1.5">Hi [Investor],<br />We're building an AI platform that helps startups raise smarter. Would love to share more.</p>
        <p className="text-secondary-text mt-1.5">Thanks!</p>
      </div>
    </div>
    <div className="relative z-10 flex items-center justify-center mx-[-1rem] md:mx-0">
      <div className="bg-white border border-gray-300 rounded-full p-2 shadow-sm"><TorIcon /></div>
      <div className="bg-[#0e1111] text-white p-3 rounded-lg shadow-lg w-12 h-12 flex items-center justify-center font-bold text-sm transform -translate-x-4 translate-y-8 rotate-12">Accel</div>
    </div>
    <div className="transform rotate-6 -translate-y-4">
      <div className="bg-white shadow-lg rounded-lg p-3 w-40 border text-xs leading-snug">
        <div className="flex items-start space-x-1.5 mb-1.5">
          <div className="w-6 h-6 bg-gray-300 rounded-full flex-shrink-0 mt-0.5"></div>
          <div><p className="font-medium">Maya Chen</p><p className="text-secondary-text">maya@accel.com</p></div>
        </div>
        <p className="font-medium">Subject: Excited to connect</p>
        <p className="text-secondary-text mt-1.5">Hi Maya,<br />Since Accel backs scaling teams, its love to show how our AI helps them raise more efficiently.</p>
        <p className="text-secondary-text mt-1.5">Thanks!</p>
      </div>
    </div>
  </div>
);

const Step4Visual = () => (
  <div className="w-full h-full min-h-[250px] bg-white rounded-2xl p-6 flex flex-col items-center justify-center">
    <div className="w-full max-w-sm relative">
       <div className="absolute -top-4 left-8 bg-white border rounded-md px-2 py-1 text-xs shadow-sm">Outreach Sent</div>
       <div className="w-full h-0.5 bg-gray-200 mt-8"></div>
       <div className="absolute top-[28px] left-1/2 -translate-x-1/2 bg-white border border-gray-300 rounded-full p-2 shadow-sm"><TorIcon /></div>
       <div className="absolute top-[16px] left-[calc(100%-4rem)] w-12 h-12 bg-gray-200 rounded-full opacity-50"></div>
       <div className="flow-line-vertical absolute top-[36px] left-[15%]" style={{height: '70px'}}></div>
    </div>
  </div>
);

const Step5Visual = () => (
  <div className="w-full h-full min-h-[200px] bg-white rounded-2xl p-6 flex items-center justify-center relative">
    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 rounded-full" />
    <div className="absolute top-1/2 left-0 w-1/4 h-0.5 bg-[#0ebd8f] rounded-full" />

    <div className="flex justify-between items-center w-full relative">
      <div className="bg-white border rounded-full p-2 shadow-sm"><TorIcon /></div>
      
      <div className="transform -translate-y-16">
        <div className="relative">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-black font-semibold">0%</div>
          <div className="bg-white shadow-lg rounded-lg p-3 w-48 border text-xs leading-snug">
            <p className="font-medium">Name</p>
            <p className="text-secondary-text mb-1.5">info@company.com</p>
            <p className="font-medium">Subject: Excited to connect</p>
            <p className="text-secondary-text mt-1.5">Hi [Investor], We're building an AI...</p>
          </div>
        </div>
      </div>

      <div className="bg-[#641C3E] text-white p-3 rounded-lg shadow-lg flex items-center justify-center font-bold text-sm w-12 h-12">A16Z</div>
    </div>
  </div>
);


const sections = [
  {
    number: "1.",
    title: "Create Your Creator Profile",
    description: "Start by telling us about your content, audience, and what you're looking for. This becomes your Directory Profile, which helps us connect you with the right creators and brands.",
    visual: <Step1Visual />,
  },
  {
    number: "2.",
    title: "Connect with creators and brands",
    description: "Directory matches you with creators in your niche and brands looking for your expertise. Every connection is direct—no platform fees, no middlemen.",
    visual: <Step2Visual />,
  },
  {
    number: "3.",
    title: "Make deals instantly on-platform",
    description: "Negotiate, agree on terms, and close deals right in Directory. Every transaction uses our token, which means you're not just earning—you're building wealth as the network grows.",
    visual: <Step3Visual />,
  },
  {
    number: "4.",
    title: "Keep 100% of your earnings",
    description: "No 30% cuts. No hidden fees. What you earn is what you keep, plus the appreciation of your token holdings as more creators and brands join.",
    visual: <Step4Visual />,
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-white py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl lg:text-5xl font-bold text-black">
            How Directory Works
          </h2>
        </div>
        <div className="mt-16 lg:mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sections.map((section, index) => (
              <div key={index} className="bg-[#F8F9FB] rounded-3xl p-8 lg:p-10 flex flex-col">
                <div className="text-xl text-secondary-text mb-4">{section.number}</div>
                <div className="flex-shrink-0">
                  <h4 className="text-2xl lg:text-3xl font-bold text-black mb-4">{section.title}</h4>
                  <p className="text-base lg:text-lg text-secondary-text max-w-md">{section.description}</p>
                </div>
                <div className="flex-grow mt-8">
                  {section.visual}
                </div>
              </div>
            ))}
            <div className="lg:col-span-2 bg-[#F8F9FB] rounded-3xl p-8 lg:p-10 flex flex-col md:flex-row md:items-center md:gap-8">
              <div className="flex-shrink-0 md:w-1/2">
                <div className="text-xl text-secondary-text mb-4">5.</div>
                <h4 className="text-2xl lg:text-3xl font-bold text-black mb-4">Build wealth as the network grows</h4>
                <p className="text-base lg:text-lg text-secondary-text max-w-md">As more deals happen, demand for the token increases. You're not just earning—you're invested in the network's success. The people who create the value finally share in the value.</p>
              </div>
              <div className="flex-grow mt-8 md:mt-0 md:flex-1">
                <Step5Visual />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;