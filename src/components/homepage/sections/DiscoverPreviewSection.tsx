import { Button } from "@/shared/ui";

export function DiscoverPreviewSection() {
  const featuredProfile = { id: 1, name: "Aditi", age: 28, city: "Mumbai", profession: "Architect", highlight: "Family-Oriented", verified: true };
  const secondaryProfiles = [
    { id: 2, name: "Rohan", age: 31, city: "Bengaluru", profession: "Software Engineer", highlight: "Shared Values", verified: true },
    { id: 3, name: "Priya", age: 27, city: "Delhi", profession: "Doctor", highlight: "Similar Interests", verified: true },
  ];
  const gridProfiles = [
    { id: 4, name: "Vikram", age: 33, city: "Pune", profession: "Professor", highlight: "Common Languages", verified: true },
    { id: 5, name: "Meera", age: 29, city: "Chennai", profession: "Designer", highlight: "Family-Oriented", verified: true },
    { id: 6, name: "Karan", age: 30, city: "Hyderabad", profession: "Lawyer", highlight: "Shared Values", verified: true },
  ];

  return (
    <section className="relative w-full h-full flex flex-col items-center justify-center px-6 text-center overflow-hidden bg-[#FAFAFA]">
      {/* Lighting System: Editorial studio daylight (soft, neutral diffusion from above) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[60%] bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,1)_0%,_transparent_80%)] pointer-events-none z-0 blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center space-y-20 w-full pt-12">
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl text-[var(--color-text-primary)] font-display tracking-tight">
            Meet Thoughtful Individuals
          </h2>
          <p className="text-md md:text-lg text-[var(--color-text-secondary)] max-w-[640px] mx-auto leading-relaxed">
            Every profile emphasizes authenticity, shared values, and meaningful compatibility.
          </p>
        </div>
        
        {/* Editorial Layout: Hierarchical, structured, magazine-like */}
        <div className="flex flex-col space-y-8 w-full">
          
          {/* Top Row: 1 Featured, 2 Secondary */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
            {/* Featured Profile */}
            <div className="lg:col-span-6 group relative flex flex-col items-start text-left rounded-[var(--radius-xl)] bg-transparent">
              <div className="w-full h-96 bg-neutral-200/50 rounded-[var(--radius-lg)] mb-6 overflow-hidden relative">
                <div className="w-full h-full flex items-center justify-center text-neutral-400 mix-blend-multiply">Authentic Photography</div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-[var(--animate-slow)]" />
              </div>
              <div className="flex items-center justify-between w-full mb-2">
                <h3 className="text-3xl font-display text-[var(--color-text-primary)]">{featuredProfile.name}, {featuredProfile.age}</h3>
                <div className="px-4 py-1.5 bg-white shadow-sm border border-black/[0.03] rounded-full text-xs font-medium text-[var(--color-text-secondary)]">
                  {featuredProfile.highlight}
                </div>
              </div>
              <p className="text-md text-[var(--color-text-secondary)] tracking-wide">{featuredProfile.profession} • {featuredProfile.city}</p>
            </div>

            {/* Secondary Profiles */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {secondaryProfiles.map(profile => (
                <div key={profile.id} className="group relative flex flex-col items-start text-left rounded-[var(--radius-xl)] bg-transparent">
                  <div className="w-full h-64 bg-neutral-200/40 rounded-[var(--radius-lg)] mb-5 overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center text-neutral-400 text-sm mix-blend-multiply">Photography</div>
                  </div>
                  <h3 className="text-xl font-medium text-[var(--color-text-primary)] mb-1">{profile.name}, {profile.age}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-3">{profile.profession} • {profile.city}</p>
                  <div className="text-xs text-[var(--color-text-secondary)] font-medium border-b border-border pb-1">{profile.highlight}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Row: Balanced Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full pt-8 border-t border-black/[0.03]">
            {gridProfiles.map(profile => (
              <div key={profile.id} className="group flex items-center gap-4 text-left">
                <div className="w-20 h-20 bg-neutral-200/40 rounded-[var(--radius-md)] flex-shrink-0 flex items-center justify-center text-neutral-400 text-xs mix-blend-multiply">Photo</div>
                <div className="flex flex-col">
                  <h3 className="text-md font-medium text-[var(--color-text-primary)]">{profile.name}, {profile.age}</h3>
                  <p className="text-xs text-[var(--color-text-secondary)] mb-1">{profile.profession}</p>
                  <span className="text-[10px] uppercase tracking-widest text-[var(--color-primary-600)]">{profile.highlight}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-12">
          <Button variant="secondary" size="lg" className="px-12 bg-white/60 backdrop-blur-md">Explore Profiles</Button>
        </div>
      </div>

      {/* Continuity Transition: Editorial studio transitions into the warm golden living space */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#FFFDF9] to-transparent z-0 pointer-events-none" />
    </section>
  );
}
