import { User, ShieldCheck, Compass, MessageSquare, Heart } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      title: "Create Profile",
      description: "Help others understand you.",
      icon: <User className="w-6 h-6 text-primary-600" strokeWidth={1.5} />,
    },
    {
      title: "Verification",
      description: "Identity and profile review.",
      icon: <ShieldCheck className="w-6 h-6 text-primary-600" strokeWidth={1.5} />,
    },
    {
      title: "Discover Profiles",
      description: "Meaningful information and shared values.",
      icon: <Compass className="w-6 h-6 text-primary-600" strokeWidth={1.5} />,
    },
    {
      title: "Conversations",
      description: "Respectful and secure messaging.",
      icon: <MessageSquare className="w-6 h-6 text-primary-600" strokeWidth={1.5} />,
    },
    {
      title: "Build A Journey",
      description: "The journey continues offline.",
      icon: <Heart className="w-6 h-6 text-primary-600" strokeWidth={1.5} />,
    },
  ];

  return (
    <section className="w-full h-full flex flex-col items-center justify-center px-6 text-center bg-background">
      <div className="max-w-6xl mx-auto flex flex-col items-center space-y-16 w-full">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-5xl text-text-primary">
            A Thoughtful Journey
          </h2>
          <p className="text-md md:text-lg text-text-secondary max-w-[680px] mx-auto">
            Vivaha guides people through a respectful matchmaking journey.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-8 lg:gap-4">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center space-y-4 max-w-[180px] relative">
              <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center mb-2">
                {step.icon}
              </div>
              <h3 className="text-lg font-medium text-text-primary">{step.title}</h3>
              <p className="text-sm text-text-secondary">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
