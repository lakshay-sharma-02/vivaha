import Link from "next/link";

export function FooterSection() {
  return (
    <footer className="w-full bg-surface-secondary py-16 px-6 border-t border-border z-10 relative">
      <div className="max-w-7xl mx-auto flex flex-col space-y-16">
        
        {/* Top: Brand & Navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <Link href="/" className="text-2xl font-display font-semibold text-text-primary">
              Vivaha
            </Link>
            <p className="text-sm text-text-secondary max-w-sm">
              Helping individuals and families build meaningful lifelong relationships through trust, respect and thoughtful matchmaking.
            </p>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col space-y-4">
              <h4 className="text-sm font-semibold text-text-primary">Platform</h4>
              <Link href="#" className="text-sm text-text-secondary hover:text-primary-700 transition-colors">How It Works</Link>
              <Link href="#" className="text-sm text-text-secondary hover:text-primary-700 transition-colors">Membership</Link>
              <Link href="#" className="text-sm text-text-secondary hover:text-primary-700 transition-colors">Success Stories</Link>
            </div>
            
            <div className="flex flex-col space-y-4">
              <h4 className="text-sm font-semibold text-text-primary">Company</h4>
              <Link href="#" className="text-sm text-text-secondary hover:text-primary-700 transition-colors">About Us</Link>
              <Link href="#" className="text-sm text-text-secondary hover:text-primary-700 transition-colors">Careers</Link>
              <Link href="#" className="text-sm text-text-secondary hover:text-primary-700 transition-colors">Press</Link>
            </div>

            <div className="flex flex-col space-y-4">
              <h4 className="text-sm font-semibold text-text-primary">Support</h4>
              <Link href="#" className="text-sm text-text-secondary hover:text-primary-700 transition-colors">Help Centre</Link>
              <Link href="#" className="text-sm text-text-secondary hover:text-primary-700 transition-colors">support@vivaha.com</Link>
              <Link href="#" className="text-sm text-text-secondary hover:text-primary-700 transition-colors">+91 800 000 0000</Link>
            </div>

            <div className="flex flex-col space-y-4">
              <h4 className="text-sm font-semibold text-text-primary">Legal</h4>
              <Link href="#" className="text-sm text-text-secondary hover:text-primary-700 transition-colors">Privacy Policy</Link>
              <Link href="#" className="text-sm text-text-secondary hover:text-primary-700 transition-colors">Terms of Service</Link>
              <Link href="#" className="text-sm text-text-secondary hover:text-primary-700 transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>

        {/* Bottom: Trust & Copyright */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pt-8 border-t border-border gap-4">
          <div className="flex flex-wrap items-center gap-4 text-xs text-text-secondary font-medium">
            <span>Verified Profiles</span>
            <span className="w-1 h-1 rounded-full bg-border"></span>
            <span>Privacy First</span>
            <span className="w-1 h-1 rounded-full bg-border"></span>
            <span>Secure Conversations</span>
            <span className="w-1 h-1 rounded-full bg-border"></span>
            <span>Family Friendly</span>
          </div>
          <p className="text-xs text-text-secondary">
            © {new Date().getFullYear()} Vivaha. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
