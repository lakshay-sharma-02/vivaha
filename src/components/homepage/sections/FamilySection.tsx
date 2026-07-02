import { Button } from "@/shared/ui";

export function FamilySection() {
  const principles = [
    {
      title: "Respect",
      description: "Every individual makes their own decisions.",
    },
    {
      title: "Transparency",
      description: "Families understand the journey together.",
    },
    {
      title: "Privacy",
      description: "Personal information remains protected.",
    },
    {
      title: "Communication",
      description: "Open conversations build stronger relationships.",
    },
  ];

  return (
    <section className="w-full h-full flex flex-col items-center justify-center px-6 text-center bg-surface-secondary">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center lg:items-stretch lg:text-left gap-12 w-full">
        {/* Left: Editorial Photography */}
        <div className="w-full lg:w-1/2 flex flex-col order-2 lg:order-1">
          <div className="w-full h-[400px] lg:h-full bg-neutral-200 rounded-[var(--radius-xl)] flex items-center justify-center text-neutral-400">
            <span>Natural Family Environment Photography</span>
          </div>
        </div>

        {/* Right: Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-10 order-1 lg:order-2">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl text-text-primary">
              Designed For Families.
            </h2>
            <p className="text-md md:text-lg text-text-secondary max-w-[680px]">
              Vivaha supports both individuals and families throughout the matchmaking journey. Every relationship remains based on mutual understanding and consent.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {principles.map((principle, index) => (
              <div key={index} className="flex flex-col space-y-2 group">
                <h3 className="text-lg font-semibold text-text-primary transition-colors group-hover:text-primary-700">
                  {principle.title}
                </h3>
                <p className="text-sm text-text-secondary">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-4 lg:pt-8">
            <Button variant="secondary" size="lg">Understand How Vivaha Works</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
