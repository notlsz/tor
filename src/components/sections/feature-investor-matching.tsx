import React from 'react';
import { ChevronDown, TrendingUp } from 'lucide-react';

const FeatureInvestorMatching = () => {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-x-16 gap-y-24 lg:grid-cols-2">
          <div className="flex flex-col">
            <h2 className="text-[40px] font-bold leading-tight text-neutral-900">
              Creators connect directly with other creators
            </h2>
            <p className="mt-6 max-w-lg text-lg text-neutral-500">
              No platform fees, just pure networking. Build your network, collaborate on projects, and grow together without anyone taking a cut.
            </p>
          </div>

          <div className="relative min-h-[380px]">
            {/* Main Dashboard Card */}
            <div className="absolute left-0 top-0 w-full max-w-[500px] rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
              {/* Filters */}
              <div className="flex items-center space-x-6">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Category</span>
                  <div className="flex items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-gray-800" />
                    <span className="font-medium text-gray-800">All Creators</span>
                    <ChevronDown size={16} className="text-gray-500" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Platform</span>
                  <div className="flex items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-gray-800" />
                    <span className="font-medium text-gray-800">All</span>
                    <ChevronDown size={16} className="text-gray-500" />
                  </div>
                </div>
              </div>

              <div className="my-4 border-t border-gray-100" />

              {/* Table */}
              <div>
                <div className="flex items-center justify-between px-2 py-1 text-xs font-medium text-gray-400">
                  <button className="flex items-center gap-1">
                    <span>Creator</span>
                    <ChevronDown size={14} />
                  </button>
                  <div className="flex w-[45%] justify-between">
                    <span>Platform</span>
                    <span>Match score</span>
                  </div>
                </div>

                <div className="mt-2 flex items-center justify-between rounded-lg bg-white p-3 ring-1 ring-gray-100/50 shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
                  <div className="flex flex-1 items-center gap-3">
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black" />
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-[#10C9A0]">
                      <span className="font-bold text-white text-sm">TC</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Top Creator</p>
                      <p className="text-xs text-gray-500">@topcreator</p>
                    </div>
                  </div>
                  <div className="flex w-[45%] items-center justify-between">
                    <span className="text-sm text-gray-600">Multi</span>
                    <div className="flex items-center space-x-2">
                      <div className="h-1.5 w-16 rounded-full bg-gray-200">
                        <div className="h-1.5 rounded-full bg-[#10C9A0]" style={{ width: '92%' }} />
                      </div>
                      <span className="text-sm font-semibold text-gray-800">92%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Metrics Card */}
            <div className="absolute -bottom-12 right-0 w-[240px] rounded-2xl border border-gray-200 bg-white p-4 shadow-2xl">
              <p className="text-sm text-gray-600">Active Connections</p>
              <p className="my-2 text-3xl font-bold text-gray-900">50k+</p>
              <div className="flex items-end justify-between">
                <div className="flex items-center text-sm">
                  <span className="flex items-center text-green-600">
                    <TrendingUp size={16} className="mr-1" />
                    28%
                  </span>
                  <span className="ml-1 text-gray-500">this month</span>
                </div>
                <svg width="70" height="25" viewBox="0 0 70 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 24C10.3333 13.5 22.4 -2.3 32.5 5C42.6 12.3 54.8333 13.1667 61.5 5.5" stroke="#10C9A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureInvestorMatching;