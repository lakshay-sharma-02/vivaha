import React from "react";
import Link from "next/link";
import { getNavbarData } from "@/app/actions/navbar";

export default async function Navbar() {
  const { data } = await getNavbarData();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E5D9CC] bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-serif font-bold text-[#2A2621]">
              Vivah
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="text-sm font-medium text-[#2A2621] hover:text-[#8C7A6B] transition-colors">
              Home
            </Link>
            
            {/* Browse Dropdown */}
            <div className="relative group">
              <button className="text-sm font-medium text-[#2A2621] hover:text-[#8C7A6B] transition-colors flex items-center gap-1">
                Browse
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              
              {/* Mega Menu Dropdown */}
              <div className="absolute left-0 mt-2 w-screen max-w-md bg-white border border-[#E5D9CC] rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-6 grid grid-cols-2 gap-6">
                  
                  {/* Marital Status */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#8C7A6B] mb-3">Marital Status</h3>
                    <ul className="space-y-2">
                      <li>
                        <Link href="/browse?marital_status=unmarried" className="text-sm text-[#2A2621] hover:text-[#8C7A6B] flex justify-between">
                          <span>Unmarried</span>
                          <span className="text-xs bg-[#F5E6D3] text-[#8C7A6B] px-2 py-0.5 rounded-full">{data.maritalStats.unmarried_count}</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/browse?marital_status=divorced" className="text-sm text-[#2A2621] hover:text-[#8C7A6B] flex justify-between">
                          <span>Divorced</span>
                          <span className="text-xs bg-[#F5E6D3] text-[#8C7A6B] px-2 py-0.5 rounded-full">{data.maritalStats.divorced_count}</span>
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Castes */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#8C7A6B] mb-3">Top Castes</h3>
                    <ul className="space-y-2">
                      {data.castes.length > 0 ? data.castes.map((caste: any) => (
                        <li key={caste.id}>
                          <Link href={`/browse?caste=${caste.id}`} className="text-sm text-[#2A2621] hover:text-[#8C7A6B] flex justify-between">
                            <span>{caste.name}</span>
                            <span className="text-xs bg-[#F5E6D3] text-[#8C7A6B] px-2 py-0.5 rounded-full">{caste.count}</span>
                          </Link>
                        </li>
                      )) : (
                        <li className="text-xs text-gray-400">No data available</li>
                      )}
                    </ul>
                  </div>

                  {/* Regions */}
                  <div className="col-span-2 mt-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#8C7A6B] mb-3">Top Regions</h3>
                    <div className="flex flex-wrap gap-2">
                      {data.states.length > 0 ? data.states.map((state: any) => (
                        <Link key={state.id} href={`/browse?state=${state.id}`} className="text-xs text-[#2A2621] bg-[#FAF7F2] border border-[#E5D9CC] hover:bg-[#F5E6D3] transition-colors px-3 py-1.5 rounded-full flex gap-2 items-center">
                          {state.name} <span className="text-[10px] text-[#8C7A6B]">{state.count}</span>
                        </Link>
                      )) : (
                        <span className="text-xs text-gray-400">No regions mapped</span>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <Link href="/success-stories" className="text-sm font-medium text-[#2A2621] hover:text-[#8C7A6B] transition-colors">
              Success Stories
            </Link>
            <Link href="/premium" className="text-sm font-medium text-[#D4AF37] hover:text-[#B5952F] transition-colors">
              Premium
            </Link>
          </nav>

          {/* User Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-sm font-medium text-[#2A2621] hover:text-[#8C7A6B] transition-colors">
              Log In
            </Link>
            <Link href="/register" className="text-sm font-medium bg-[#2A2621] text-white px-4 py-2 rounded-full hover:bg-[#4A453E] transition-colors">
              Create Account
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}
