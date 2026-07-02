import { Button } from "@/shared/ui";
import { Check } from "lucide-react";

export function MembershipSection() {
  const plans = [
    {
      name: "Basic",
      desc: "Begin your journey thoughtfully.",
      price: "Free",
      features: ["Verified Profile", "Profile Discovery", "Interest Requests", "Secure Messaging"],
      recommended: false,
    },
    {
      name: "Premium",
      desc: "Enhanced tools for meaningful discovery.",
      price: "₹2,499",
      period: "monthly",
      features: ["Everything in Basic", "Advanced Filters", "Priority Discovery", "Read Receipts"],
      recommended: true,
    },
    {
      name: "Elite",
      desc: "Dedicated support for your family.",
      price: "₹9,999",
      period: "monthly",
      features: ["Everything in Premium", "Relationship Consultant", "Priority Verification", "Dedicated Support"],
      recommended: false,
    }
  ];

  return (
    <section className="relative w-full h-full flex flex-col items-center justify-center px-6 text-center bg-[#FDFBF7] overflow-hidden">
      {/* Material Suggestion: Thick handcrafted paper texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none z-0" 
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />

      {/* Lighting System: Warm invitation table lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[60%] bg-[radial-gradient(circle_at_top,_rgba(255,248,235,0.8)_0%,_transparent_70%)] pointer-events-none z-0 blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center space-y-20 w-full pt-12">
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl text-[var(--color-text-primary)] font-display tracking-tight">
            Membership That Respects Your Journey.
          </h2>
          <p className="text-md md:text-lg text-[var(--color-text-secondary)] max-w-[640px] mx-auto leading-relaxed">
            Every person can begin their journey. Membership simply provides additional convenience and support without artificial limitations.
          </p>
        </div>

        {/* Elegant Comparison - Apple-style pricing presentation over SaaS cards */}
        <div className="w-full flex flex-col md:flex-row items-stretch justify-center gap-px bg-black/[0.03] p-px rounded-[var(--radius-xl)] overflow-hidden max-w-5xl">
          {plans.map((plan, idx) => (
            <div 
              key={plan.name}
              className={`flex-1 flex flex-col text-left p-10 bg-[#FDFBF7] relative ${plan.recommended ? 'md:z-10' : ''}`}
            >
              {/* Subtle highlight gradient for recommended plan */}
              {plan.recommended && (
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-primary-50)]/50 to-transparent pointer-events-none" />
              )}
              
              <div className="relative z-10 flex flex-col h-full">
                <h3 className="text-2xl font-display text-[var(--color-text-primary)] mb-2">{plan.name}</h3>
                <p className="text-sm text-[var(--color-text-secondary)] mb-8 h-10">{plan.desc}</p>
                
                <div className="flex items-baseline gap-2 mb-10 pb-10 border-b border-black/[0.05]">
                  <span className="text-3xl font-display text-[var(--color-text-primary)]">{plan.price}</span>
                  {plan.period && <span className="text-sm text-[var(--color-text-secondary)]">/ {plan.period}</span>}
                </div>

                <div className="space-y-5 mb-12 flex-grow">
                  {plan.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-4">
                      <div className="mt-0.5">
                        <Check className="w-4 h-4 text-[var(--color-text-secondary)] opacity-50" strokeWidth={1.5} />
                      </div>
                      <span className="text-sm text-[var(--color-text-primary)] leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button variant={plan.recommended ? "primary" : "secondary"} className={`w-full bg-white border border-black/[0.05] shadow-sm ${plan.recommended ? 'bg-[var(--color-text-primary)] text-white hover:bg-black/80' : ''}`}>
                  Choose {plan.name}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Continuity Transition: Invitation room transitions into the soft printed FAQ booklet */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#F8F7F4] to-transparent z-0 pointer-events-none" />
    </section>
  );
}
