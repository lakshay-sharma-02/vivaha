import Link from "next/link";
import { Button } from "@/shared/ui/button/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 text-center relative overflow-hidden">
      {/* 
        The AmbientBackground component (in layout.tsx) handles the moving 
        silk aura and film grain, so we just need to let it shine through. 
      */}
      
      <div className="relative z-10 glass rounded-3xl p-10 md:p-16 max-w-2xl mx-auto flex flex-col items-center shadow-2xl">
        <h1 className="font-playfair text-5xl md:text-7xl font-semibold tracking-tight text-foreground mb-6">
          Vivaha
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-lg font-light leading-relaxed">
          The most exclusive matrimonial network for ambitious, cultured, and high-net-worth individuals.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link href="/login" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-48 text-[15px] tracking-wide">
              Sign In
            </Button>
          </Link>
          <Link href="/register" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-48 text-[15px] tracking-wide">
              Apply for Membership
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="absolute bottom-8 text-sm text-muted-foreground/60 font-light">
        © {new Date().getFullYear()} Vivaha Elite. Invitation Only.
      </div>
    </div>
  );
}
