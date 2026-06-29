import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 bg-background/50 backdrop-blur-xl">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="font-playfair text-2xl font-bold tracking-tight mb-4 inline-block">
              Vivaha
            </Link>
            <p className="text-muted-foreground text-sm max-w-sm font-light leading-relaxed">
              Elevating the standard of matrimony. An exclusive network for those who refuse to compromise on their life partner.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-sm mb-4">Platform</h4>
            <ul className="space-y-3 text-sm text-muted-foreground font-light">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/membership" className="hover:text-primary transition-colors">Membership</Link></li>
              <li><Link href="/concierge" className="hover:text-primary transition-colors">Concierge Services</Link></li>
              <li><Link href="/stories" className="hover:text-primary transition-colors">Success Stories</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-sm mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-muted-foreground font-light">
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Architecture</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/guidelines" className="hover:text-primary transition-colors">Community Guidelines</Link></li>
            </ul>
          </div>
          
        </div>
        
        <div className="border-t border-border/40 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground font-light">
          <p>© {new Date().getFullYear()} Vivaha Elite. All rights reserved.</p>
          <p className="mt-4 md:mt-0 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500/80"></span>
            Systems Operational
          </p>
        </div>
      </div>
    </footer>
  )
}
