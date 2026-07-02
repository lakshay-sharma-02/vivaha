import { Button } from "@/shared/ui";

export function SuccessStoriesSection() {
  return (
    <section className="relative w-full h-full flex flex-col items-center justify-center px-6 text-center overflow-hidden bg-[#FAFAFA]">
      {/* Lighting System: Soft, warm diffusion carrying over from the editorial studio lighting */}
      <div className="absolute top-0 right-0 w-[40%] h-[50%] bg-[radial-gradient(circle_at_center,_rgba(255,245,230,0.4)_0%,_transparent_70%)] pointer-events-none z-0 blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center space-y-24 w-full pt-12">
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl text-[var(--color-text-primary)] font-display tracking-tight">
            Real Stories.
          </h2>
          <p className="text-md md:text-lg text-[var(--color-text-secondary)] max-w-[640px] mx-auto leading-relaxed">
            Every meaningful relationship begins with a single conversation. Vivaha simply creates that opportunity.
          </p>
        </div>

        {/* Featured Story - Editorial Magazine Layout */}
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-center text-left">
          <div className="md:col-span-7 w-full h-80 md:h-[500px] bg-neutral-200/50 rounded-[var(--radius-xl)] flex items-center justify-center text-neutral-400 overflow-hidden relative">
            <span className="text-sm mix-blend-multiply opacity-50">Natural Couple Photography</span>
            <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent pointer-events-none" />
          </div>
          <div className="md:col-span-5 flex flex-col justify-center space-y-8">
            <div>
              <h3 className="text-4xl font-display text-[var(--color-text-primary)] mb-2">Ananya & Rahul</h3>
              <p className="text-xs text-[var(--color-text-secondary)] uppercase tracking-[0.2em]">Mumbai, Maharashtra</p>
            </div>
            <p className="text-lg md:text-xl text-[var(--color-text-primary)] font-display italic leading-relaxed text-neutral-700">
              "We found someone who truly understood our family. Our conversations felt natural from the very beginning. It was never about ticking boxes."
            </p>
          </div>
        </div>

        {/* Additional Stories - Unboxed Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8 w-full max-w-5xl pt-8 border-t border-black/[0.03]">
          <div className="flex flex-col text-left space-y-4 group cursor-pointer">
            <div className="w-full h-64 bg-neutral-200/40 rounded-[var(--radius-lg)] flex items-center justify-center text-neutral-400 group-hover:opacity-90 transition-opacity">Photo</div>
            <div>
              <h4 className="text-xl font-display text-[var(--color-text-primary)] mb-1">Sneha & Arjun</h4>
              <p className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wider mb-3">Bengaluru</p>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">A shared passion for architecture led to a conversation that lasted five hours. A year later, they walked down the aisle.</p>
            </div>
          </div>
          <div className="flex flex-col text-left space-y-4 group cursor-pointer">
            <div className="w-full h-64 bg-neutral-200/40 rounded-[var(--radius-lg)] flex items-center justify-center text-neutral-400 group-hover:opacity-90 transition-opacity">Photo</div>
            <div>
              <h4 className="text-xl font-display text-[var(--color-text-primary)] mb-1">Neha & Siddharth</h4>
              <p className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wider mb-3">Delhi</p>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">Their families connected first, but it was their mutual respect for each other's career goals that sealed their bond permanently.</p>
            </div>
          </div>
          <div className="flex flex-col text-left space-y-4 group cursor-pointer hidden lg:flex">
            <div className="w-full h-64 bg-neutral-200/40 rounded-[var(--radius-lg)] flex items-center justify-center text-neutral-400 group-hover:opacity-90 transition-opacity">Photo</div>
            <div>
              <h4 className="text-xl font-display text-[var(--color-text-primary)] mb-1">Kavya & Rohan</h4>
              <p className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wider mb-3">Pune</p>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">Introduced through a common appreciation for classical music, their journey blossomed quietly without any external pressure.</p>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <Button variant="text" size="lg" className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]">Read More Stories</Button>
        </div>
      </div>

      {/* Continuity Transition: Transitions into the golden living room light of Family section */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#FFFDF9] to-transparent z-0 pointer-events-none" />
    </section>
  );
}
