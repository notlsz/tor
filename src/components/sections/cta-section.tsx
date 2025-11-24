"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Check } from "lucide-react";

const CtaSection = () => {
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("Oops! Something went wrong while submitting the form.");

  useEffect(() => {
    if (formStatus === 'error' || formStatus === 'success') {
      const timer = setTimeout(() => setFormStatus('idle'), 5000);
      return () => clearTimeout(timer);
    }
  }, [formStatus]);
  
  const resetErrorOnInput = () => {
    if (formStatus === 'error') {
      setFormStatus('idle');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");

    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setErrorMessage("Please provide a valid email address.");
      setFormStatus("error");
      return;
    }

    setFormStatus("success");
    setEmail("");
    setAgreed(false);
  };

  return (
    <section id="section_cta" className="relative bg-background overflow-hidden">
      <div className="py-20 px-10 xl:px-20 max-w-[1200px] mx-auto">
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between lg:gap-16 gap-12">
          
          <div className="w-full lg:w-[55%] text-center lg:text-left">
            <h2 className="text-[3.5rem] font-bold text-primary-text leading-none -tracking-[0.02em]">
              Join Directory
            </h2>
            <p className="mt-4 text-xl text-secondary-text max-w-xl mx-auto lg:mx-0">
              It launches next month. Because why wait?
            </p>

            <div className="mt-10 max-w-lg mx-auto lg:mx-0">
              <form onSubmit={handleSubmit} noValidate>
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      resetErrorOnInput();
                    }}
                    className="flex-grow w-full h-14 px-5 text-base bg-white border border-[#CDCDD2] rounded-xl text-primary-text placeholder:text-[#5B5F6D] focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                    required
                  />
                  <button
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className="flex-shrink-0 w-full sm:w-auto h-14 px-8 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-opacity-80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formStatus === 'submitting' ? 'Submitting...' : 'Get Early Access'}
                  </button>
                </div>
                
                <label htmlFor="checkbox-cta" className="mt-4 flex items-center cursor-pointer w-fit mx-auto lg:mx-0">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      id="checkbox-cta"
                      checked={agreed}
                      onChange={() => {
                        setAgreed(!agreed);
                        resetErrorOnInput();
                      }}
                      className="peer absolute opacity-0 w-5 h-5"
                    />
                    <div className="w-5 h-5 border-2 border-[#ccccd1] rounded-[5px] bg-white flex items-center justify-center transition-all peer-checked:bg-black peer-checked:border-black">
                      <Check
                        className={`w-3.5 h-3.5 text-white transition-opacity ${
                          agreed ? "opacity-100" : "opacity-0"
                        }`}
                        strokeWidth={3}
                      />
                    </div>
                  </div>
                  <span className="ml-2.5 text-sm text-[#5B5F6D]">
                    I agree to receive updates about Directory
                  </span>
                </label>
              </form>

              <div className="mt-4 h-auto min-h-[44px] text-left">
                {formStatus === "success" && (
                  <div className="p-3 bg-[#eaf6ec] rounded-lg text-sm text-[#32a852]">
                    Thank you! Your submission has been received!
                  </div>
                )}
                {formStatus === "error" && (
                  <div className="p-3 bg-[#fde8e8] rounded-lg text-sm text-[#de3939]">
                    {errorMessage}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-[45%] flex items-center justify-center lg:justify-end">
            <Image
              src="https://cdn.prod.website-files.com/68a308040885623f1668ef83/68a5f7a854d887f81cb8efbc_mountain_cta.svg"
              alt="Wireframe mountain illustration"
              width={540}
              height={360}
              className="w-full max-w-md lg:max-w-full h-auto"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default CtaSection;