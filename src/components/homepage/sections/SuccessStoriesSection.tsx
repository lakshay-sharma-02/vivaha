import { Button } from "@/shared/ui";

export function SuccessStoriesSection() {
  return (
    <section className="w-full h-full flex flex-col items-center justify-center px-6 text-center bg-background">
      <div className="max-w-6xl mx-auto flex flex-col items-center space-y-16 w-full">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-5xl text-text-primary">
            Real Stories.
          </h2>
          <p className="text-md md:text-lg text-text-secondary max-w-[680px] mx-auto">
            Every meaningful relationship begins with a single conversation. Vivaha simply creates that opportunity.
          </p>
        </div>

        {/* Featured Story */}
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-left bg-surface rounded-[var(--radius-xl)] p-8 shadow-[var(--shadow-medium)]">
          <div className="w-full h-64 md:h-full bg-neutral-200 rounded-[var(--radius-lg)] flex items-center justify-center text-neutral-400">
            <span>Featured Couple Photograph</span>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <h3 className="text-2xl font-display text-text-primary">Ananya & Rahul</h3>
            <p className="text-sm text-text-secondary uppercase tracking-widest">Mumbai, Maharashtra</p>
            <p className="text-md text-text-primary italic leading-relaxed border-l-2 border-primary-300 pl-4">
              "We found someone who truly understood our family. Our conversations felt natural from the very beginning."
            </p>
          </div>
        </div>

        {/* Additional Stories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
          <div className="flex flex-col text-left space-y-3 group cursor-pointer">
            <div className="w-full h-48 bg-neutral-200 rounded-[var(--radius-lg)] mb-2 flex items-center justify-center text-neutral-400 group-hover:opacity-90 transition-opacity">Photo</div>
            <h4 className="text-lg font-medium text-text-primary">Sneha & Arjun</h4>
            <p className="text-xs text-text-secondary">Bengaluru</p>
            <p className="text-sm text-text-secondary">A shared passion for architecture led to a conversation that lasted five hours. A year later, they walked down the aisle.</p>
          </div>
          <div className="flex flex-col text-left space-y-3 group cursor-pointer">
            <div className="w-full h-48 bg-neutral-200 rounded-[var(--radius-lg)] mb-2 flex items-center justify-center text-neutral-400 group-hover:opacity-90 transition-opacity">Photo</div>
            <h4 className="text-lg font-medium text-text-primary">Neha & Siddharth</h4>
            <p className="text-xs text-text-secondary">Delhi</p>
            <p className="text-sm text-text-secondary">Their families connected first, but it was their mutual respect for each other's career goals that sealed their bond permanently.</p>
          </div>
          <div className="flex flex-col text-left space-y-3 group cursor-pointer hidden lg:flex">
            <div className="w-full h-48 bg-neutral-200 rounded-[var(--radius-lg)] mb-2 flex items-center justify-center text-neutral-400 group-hover:opacity-90 transition-opacity">Photo</div>
            <h4 className="text-lg font-medium text-text-primary">Kavya & Rohan</h4>
            <p className="text-xs text-text-secondary">Pune</p>
            <p className="text-sm text-text-secondary">Introduced through a common appreciation for classical music, their journey blossomed quietly without any external pressure.</p>
          </div>
        </div>

        <div className="pt-8">
          <Button variant="ghost" size="lg">Read More Stories</Button>
        </div>
      </div>
    </section>
  );
}
