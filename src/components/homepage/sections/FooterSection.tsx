import Link from "next/link";

export function FooterSection() {
  return (
    <footer className="relative w-full bg-[#F2F1EC] pt-24 pb-12 px-6 z-10 overflow-hidden">
      {/* Lighting System: Evening courtyard lighting (warm, soft ambient glow from below) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[50%] bg-[radial-gradient(ellipse_at_bottom,_rgba(255,248,235,0.4)_0%,_transparent_70%)] pointer-events-none z-0 blur-3xl" />

      {/* Material Suggestion: Warm stone/taupe architecture */}
      <div 
        className="absolute inset-0 opacity-[0.02] mix-blend-multiply pointer-events-none z-0" 
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.6%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col space-y-20">
        
        {/* Top: Brand & Navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          
          {/* Brand */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <Link href="/" className="text-3xl font-display text-[var(--color-text-primary)] tracking-tight">
              Vivaha
            </Link>
            <p className="text-md text-[var(--color-text-secondary)] max-w-sm leading-relaxed">
              Helping individuals and families build meaningful lifelong relationships through trust, respect and thoughtful matchmaking.
            </p>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-10">
            <div className="flex flex-col space-y-5">
              <h4 className="text-xs font-semibold text-[var(--color-text-primary)] uppercase tracking-widest">Platform</h4>
              <Link href="#" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary-700)] transition-colors">How It Works</Link>
              <Link href="#" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary-700)] transition-colors">Membership</Link>
              <Link href="#" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary-700)] transition-colors">Success Stories</Link>
            </div>
            
            <div className="flex flex-col space-y-5">
              <h4 className="text-xs font-semibold text-[var(--color-text-primary)] uppercase tracking-widest">Company</h4>
              <Link href="#" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary-700)] transition-colors">About Us</Link>
              <Link href="#" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary-700)] transition-colors">Careers</Link>
              <Link href="#" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary-700)] transition-colors">Press</Link>
            </div>

            <div className="flex flex-col space-y-5">
              <h4 className="text-xs font-semibold text-[var(--color-text-primary)] uppercase tracking-widest">Support</h4>
              <Link href="#" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary-700)] transition-colors">Help Centre</Link>
              <Link href="#" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary-700)] transition-colors">Contact Us</Link>
            </div>

            <div className="flex flex-col space-y-5">
              <h4 className="text-xs font-semibold text-[var(--color-text-primary)] uppercase tracking-widest">Legal</h4>
              <Link href="#" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary-700)] transition-colors">Privacy Policy</Link>
              <Link href="#" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary-700)] transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>

        {/* Bottom: Trust & Copyright */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pt-8 border-t border-black/[0.04] gap-6">
          <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--color-text-secondary)] font-medium tracking-wide">
            <span>Verified Profiles</span>
            <span className="w-1 h-1 rounded-full bg-black/10"></span>
            <span>Privacy First</span>
            <span className="w-1 h-1 rounded-full bg-black/10"></span>
            <span>Secure Conversations</span>
            <span className="w-1 h-1 rounded-full bg-black/10"></span>
            <span>Family Friendly</span>
          </div>
          <p className="text-xs text-[var(--color-text-secondary)] font-medium">
            © {new Date().getFullYear()} Vivaha. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
