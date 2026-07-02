export function HowItWorksSection() {
  const steps = [
    { num: "01", title: "Create Profile", desc: "Help others understand you." },
    { num: "02", title: "Verification", desc: "Identity and profile review." },
    { num: "03", title: "Discover Profiles", desc: "Meaningful information." },
    { num: "04", title: "Conversations", desc: "Respectful messaging." },
    { num: "05", title: "Build A Journey", desc: "The journey continues offline." },
  ];

  return (
    <section className="relative w-full h-full flex flex-col items-center justify-center px-6 text-center overflow-hidden bg-[#F9F8F6]">
      {/* Material Suggestion: Inherits the stone from Trust */}
      <div 
        className="absolute inset-0 opacity-[0.02] mix-blend-multiply pointer-events-none z-0" 
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />

      {/* Lighting System: Open garden daylight washing over the pathway */}
      <div className="absolute top-0 right-0 w-[70%] h-full bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.6)_0%,_transparent_70%)] pointer-events-none z-0 blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center space-y-24 w-full">
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl text-[var(--color-text-primary)] font-display tracking-tight">
            A Thoughtful Journey
          </h2>
          <p className="text-md md:text-lg text-[var(--color-text-secondary)] max-w-[640px] mx-auto leading-relaxed">
            Vivaha guides people through a respectful matchmaking journey.
          </p>
        </div>
        
        {/* Pathway Layout: Clarity first, but visually connected like stepping stones without sacrificing readability */}
        <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between w-full max-w-5xl gap-12 lg:gap-4 before:absolute before:top-1/2 before:left-0 before:w-full before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-[var(--color-border)] before:to-transparent before:hidden lg:before:block">
          {steps.map((step, index) => (
            <div key={index} className="relative flex flex-col items-center text-center space-y-6 w-full lg:w-48 group">
              {/* Stepping Stone Node */}
              <div className="w-16 h-16 rounded-full bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] border border-black/[0.02] flex items-center justify-center transition-transform duration-[var(--animate-slow)] group-hover:-translate-y-1 z-10 relative">
                <span className="text-lg font-display text-[var(--color-text-secondary)]">{step.num}</span>
                {/* Glow behind the stone on hover */}
                <div className="absolute inset-0 rounded-full bg-[var(--color-primary-100)] opacity-0 group-hover:opacity-20 transition-opacity blur-md -z-10" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-[var(--color-text-primary)]">{step.title}</h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed px-4 lg:px-0">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Continuity Transition: The bright garden light transitions into the editorial studio light of the Discover section */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#FAFAFA] to-transparent z-0 pointer-events-none" />
    </section>
  );
}
