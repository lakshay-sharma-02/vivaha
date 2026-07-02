import { Button } from "@/shared/ui";
import { Check } from "lucide-react";

export function MembershipSection() {
  const plans = [
    {
      name: "Basic",
      description: "Begin your journey thoughtfully.",
      price: "Free",
      features: [
        "Verified Profile",
        "Profile Discovery",
        "Interest Requests",
        "Secure Messaging"
      ],
      cta: "Begin With Basic",
      recommended: false,
    },
    {
      name: "Premium",
      description: "Enhanced tools for meaningful discovery.",
      price: "₹2,499",
      period: "/month",
      features: [
        "Everything in Basic",
        "Advanced Filters",
        "Priority Discovery",
        "Read Receipts",
        "Profile Insights"
      ],
      cta: "Choose Premium",
      recommended: true,
    },
    {
      name: "Elite",
      description: "Dedicated support for your family.",
      price: "₹9,999",
      period: "/month",
      features: [
        "Everything in Premium",
        "Relationship Consultant",
        "Priority Verification",
        "Dedicated Support",
        "Exclusive Events"
      ],
      cta: "Choose Elite",
      recommended: false,
    }
  ];

  return (
    <section className="w-full h-full flex flex-col items-center justify-center px-6 text-center bg-background">
      <div className="max-w-6xl mx-auto flex flex-col items-center space-y-16 w-full">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-5xl text-text-primary">
            Membership That Respects Your Journey.
          </h2>
          <p className="text-md md:text-lg text-text-secondary max-w-[680px] mx-auto">
            Every person can begin their journey. Membership simply provides additional convenience and support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={`flex flex-col text-left p-8 rounded-[var(--radius-xl)] bg-surface shadow-[var(--shadow-low)] transition-all duration-[var(--animate-fast)] hover:-translate-y-1 relative ${plan.recommended ? 'ring-1 ring-primary-200 shadow-[var(--shadow-medium)]' : 'hover:shadow-[var(--shadow-medium)]'}`}
            >
              {plan.recommended && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-50 text-primary-700 text-xs font-medium px-3 py-1 rounded-full border border-primary-100">
                  Recommended
                </div>
              )}
              <h3 className="text-2xl font-semibold text-text-primary mb-2">{plan.name}</h3>
              <p className="text-sm text-text-secondary mb-6 h-10">{plan.description}</p>
              
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-display text-text-primary">{plan.price}</span>
                {plan.period && <span className="text-sm text-text-secondary">{plan.period}</span>}
              </div>

              <div className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary-500 shrink-0" strokeWidth={2} />
                    <span className="text-sm text-text-primary">{feature}</span>
                  </div>
                ))}
              </div>

              <Button variant={plan.recommended ? "primary" : "secondary"} className="w-full">
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
