import { Button } from "@/shared/ui";

export function HeroSection() {
  return (
    <section className="relative w-full h-full flex flex-col items-center justify-center px-6 text-center overflow-hidden bg-[var(--color-background)]">
      {/* Environmental Storytelling: Subtle material texture (suggested, not an image) */}
      <div 
        className="absolute inset-0 opacity-[0.02] mix-blend-multiply pointer-events-none z-0" 
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />

      {/* Lighting System: Morning sunlight from the left */}
      <div className="absolute top-0 left-0 w-[60%] h-full bg-[radial-gradient(ellipse_at_top_left,_rgba(255,246,230,0.7)_0%,_transparent_70%)] pointer-events-none z-0 blur-3xl" />
      
      {/* Architectural Depth: Soft, abstract shadow suggesting a window frame or structural element out of frame */}
      <div className="absolute top-0 right-0 w-[40%] h-full bg-gradient-to-bl from-[var(--color-surface-secondary)] to-transparent opacity-40 pointer-events-none z-0 blur-2xl transform skew-x-12" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center space-y-10 pt-12">
        <div className="space-y-8">
          <h1 className="text-5xl md:text-6xl lg:text-7xl tracking-tight text-[var(--color-text-primary)] font-display leading-[1.1]">
            Meaningful relationships<br />begin with trust.
          </h1>
          <p className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-[640px] mx-auto font-body leading-relaxed">
            Vivaha is a thoughtfully designed space where individuals and families discover lifelong partnerships with confidence and dignity.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
          <Button variant="primary" size="lg" className="px-10 h-14 text-md shadow-[0_2px_10px_-2px_rgba(0,0,0,0.05)]">
            Create Profile
          </Button>
          <Button variant="text" size="lg" className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
            How Vivaha Works
          </Button>
        </div>
      </div>
      
      {/* Continuity Transition: Light spills down into the Trust section */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#FBFBF9] to-transparent z-0 pointer-events-none" />
    </section>
  );
}
