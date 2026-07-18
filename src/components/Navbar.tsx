import React from "react";
import Link from "next/link";
import { getNavbarData } from "@/app/actions/navbar";
import { createClient } from "@/shared/lib/supabase/server";

export default async function Navbar() {
  const { data } = await getNavbarData();
  
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const isAuthed = !!user;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gold/20 bg-maroon-deep/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-display gold-text">
              Vivah
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="text-sm font-body text-cream/80 hover:text-gold transition-colors italic">
              Home
            </Link>
            
            <div className="relative group">
              <button className="text-sm font-body text-cream/80 hover:text-gold transition-colors flex items-center gap-1 italic">
                Browse
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              
              <div className="absolute left-0 mt-2 w-screen max-w-md bg-maroon-deep border border-gold/30 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-6 grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="label text-gold mb-3">Marital Status</h3>
                    <ul className="space-y-2">
                      <li>
                        <Link href="/matches?marital_status=unmarried" className="text-sm text-cream/70 hover:text-gold flex justify-between italic">
                          <span>Unmarried</span>
                          <span className="text-xs bg-gold/10 text-gold-light px-2 py-0.5 rounded-full">{data.maritalStats.unmarried_count}</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/matches?marital_status=divorced" className="text-sm text-cream/70 hover:text-gold flex justify-between italic">
                          <span>Divorced</span>
                          <span className="text-xs bg-gold/10 text-gold-light px-2 py-0.5 rounded-full">{data.maritalStats.divorced_count}</span>
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="label text-gold mb-3">Top Castes</h3>
                    <ul className="space-y-2">
                      {data.castes.length > 0 ? data.castes.map((caste: any) => (
                        <li key={caste.id}>
                          <Link href={`/matches?caste=${caste.id}`} className="text-sm text-cream/70 hover:text-gold flex justify-between italic">
                            <span>{caste.name}</span>
                            <span className="text-xs bg-gold/10 text-gold-light px-2 py-0.5 rounded-full">{caste.count}</span>
                          </Link>
                        </li>
                      )) : (
                        <li className="text-xs text-cream/40 italic">No data available</li>
                      )}
                    </ul>
                  </div>

                  <div className="col-span-2 mt-2">
                    <h3 className="label text-gold mb-3">Top Regions</h3>
                    <div className="flex flex-wrap gap-2">
                      {data.states.length > 0 ? data.states.map((state: any) => (
                        <Link key={state.id} href={`/matches?state=${state.id}`} className="text-xs text-cream/70 bg-maroon/60 border border-gold/20 hover:bg-gold/10 transition-colors px-3 py-1.5 rounded-full flex gap-2 items-center italic">
                          {state.name} <span className="text-[10px] text-gold-light">{state.count}</span>
                        </Link>
                      )) : (
                        <span className="text-xs text-cream/40 italic">No regions mapped</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Link href="/success-stories" className="text-sm font-body text-cream/80 hover:text-gold transition-colors italic">
              Success Stories
            </Link>
            <Link href="/premium" className="text-sm font-medium text-gold hover:text-gold-light transition-colors font-display">
              Premium
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {isAuthed ? (
              <>
                <Link href="/dashboard" className="text-sm font-body text-cream/80 hover:text-gold transition-colors italic">
                  Dashboard
                </Link>
                <Link href="/dashboard/settings" className="text-sm font-body text-cream/80 hover:text-gold transition-colors italic">
                  Settings
                </Link>
                <form action="/auth/signout" method="post">
                  <button type="submit" className="text-sm font-body text-cream/60 hover:text-cream transition-colors italic">
                    Log Out
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm font-body text-cream/80 hover:text-gold transition-colors italic">
                  Log In
                </Link>
                <Link href="/register" className="text-sm font-body border border-gold text-gold px-4 py-2 rounded-full hover:bg-gold hover:text-maroon-deep transition-colors italic">
                  Create Account
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
