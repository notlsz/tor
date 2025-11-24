import React from 'react';

const FeaturesIntro: React.FC = () => {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-[1200px] px-10 xl:px-20">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-4 inline-block rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground">
            No fees. No middlemen. Just direct.
          </div>
          <h2 className="text-balance text-center text-primary text-[40px] font-bold leading-tight lg:text-[56px] lg:leading-[1.15]">
            Directory Does Two Things
          </h2>
        </div>
      </div>
    </section>
  );
};

export default FeaturesIntro;