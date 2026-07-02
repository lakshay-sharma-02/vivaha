import { Button } from "@/shared/ui";

export function HeroSection() {
  return (
    <section className="w-full h-full flex flex-col items-center justify-center px-6 text-center">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/50 z-0" />
      
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-7xl tracking-tight text-text-primary">
            Meaningful relationships begin with trust.
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-[680px] mx-auto font-body">
            Vivaha is a thoughtfully designed space where individuals and families discover lifelong partnerships with confidence and dignity.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Button variant="primary" size="lg">
            Create Profile
          </Button>
          <Button variant="ghost" size="lg">
            How Vivaha Works
          </Button>
        </div>
      </div>
    </section>
  );
}
