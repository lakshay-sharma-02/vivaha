import { Button } from "@/shared/ui";

export function FamilySection() {
  const principles = [
    { title: "Respect", description: "Every individual makes their own decisions." },
    { title: "Transparency", description: "Families understand the journey together." },
    { title: "Privacy", description: "Personal information remains protected." },
    { title: "Communication", description: "Open conversations build stronger relationships." },
  ];

  return (
    <section className="relative w-full h-full flex flex-col items-center justify-center px-6 text-center bg-[#FFFDF9] overflow-hidden">
      {/* Lighting System: Golden living room sunlight from a window */}
      <div className="absolute top-0 right-0 w-[60%] h-full bg-[radial-gradient(ellipse_at_center_right,_rgba(255,235,180,0.15)_0%,_transparent_60%)] pointer-events-none z-0 blur-3xl" />
      
      {/* Environmental Storytelling: Soft curtain shadow suggesting a living room window */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-bl from-black/[0.01] to-transparent pointer-events-none z-0 blur-2xl transform -skew-x-6 opacity-60 mix-blend-multiply" />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col lg:flex-row items-center lg:items-stretch lg:text-left gap-16 w-full pt-12">
        {/* Left: Editorial Photography - Living Room Warmth */}
        <div className="w-full lg:w-1/2 flex flex-col order-2 lg:order-1 relative">
          <div className="w-full h-[500px] lg:h-[600px] bg-[#F5F2EC] rounded-[var(--radius-xl)] flex items-center justify-center text-[var(--color-text-secondary)] shadow-sm overflow-hidden relative">
            <span className="text-sm font-medium tracking-wide mix-blend-multiply opacity-50">Natural Living Room Photography</span>
            {/* Sun flare over the image placeholder */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Right: Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-12 order-1 lg:order-2">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl text-[var(--color-text-primary)] font-display tracking-tight leading-tight">
              Designed For<br />Families.
            </h2>
            <p className="text-md md:text-lg text-[var(--color-text-secondary)] max-w-[600px] leading-relaxed">
              Vivaha supports both individuals and families throughout the matchmaking journey. Every relationship remains based on mutual understanding and consent.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {principles.map((principle, index) => (
              <div key={index} className="flex flex-col space-y-3 group border-l border-black/[0.05] pl-4 transition-colors hover:border-[var(--color-primary-200)]">
                <h3 className="text-lg font-medium text-[var(--color-text-primary)]">
                  {principle.title}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-8">
            <Button variant="text" size="lg" className="px-0 text-[var(--color-text-primary)] hover:opacity-80 underline underline-offset-8 decoration-1 decoration-black/20">
              Understand How Vivaha Works
            </Button>
          </div>
        </div>
      </div>

      {/* Continuity Transition: Golden living room transitions into the soft paper of the Invitation room */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#FDFBF7] to-transparent z-0 pointer-events-none" />
    </section>
  );
}
