import { Button } from "@/shared/ui";
import { BadgeCheck } from "lucide-react";

export function DiscoverPreviewSection() {
  const profiles = [
    { id: 1, name: "Aditi", age: 28, city: "Mumbai", profession: "Architect", highlight: "Family-Oriented", verified: true },
    { id: 2, name: "Rohan", age: 31, city: "Bengaluru", profession: "Software Engineer", highlight: "Shared Values", verified: true },
    { id: 3, name: "Priya", age: 27, city: "Delhi", profession: "Doctor", highlight: "Similar Interests", verified: true },
    { id: 4, name: "Vikram", age: 33, city: "Pune", profession: "Professor", highlight: "Common Languages", verified: true },
    { id: 5, name: "Meera", age: 29, city: "Chennai", profession: "Designer", highlight: "Family-Oriented", verified: true },
    { id: 6, name: "Karan", age: 30, city: "Hyderabad", profession: "Lawyer", highlight: "Shared Values", verified: true },
  ];

  return (
    <section className="w-full h-full flex flex-col items-center justify-center px-6 text-center bg-surface-secondary">
      <div className="max-w-6xl mx-auto flex flex-col items-center space-y-12 w-full">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-5xl text-text-primary">
            Meet Thoughtful Individuals
          </h2>
          <p className="text-md md:text-lg text-text-secondary max-w-[680px] mx-auto">
            Every profile emphasizes authenticity, shared values, and meaningful compatibility.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {profiles.map((profile) => (
            <div key={profile.id} className="group relative flex flex-col items-start text-left p-6 rounded-[var(--radius-xl)] bg-surface shadow-[var(--shadow-low)] transition-all duration-[var(--animate-fast)] hover:shadow-[var(--shadow-medium)] hover:-translate-y-1">
              <div className="w-full h-48 bg-neutral-100 rounded-[var(--radius-lg)] mb-4 overflow-hidden">
                {/* Image Placeholder - Natural Photography will go here */}
                <div className="w-full h-full flex items-center justify-center text-neutral-400 bg-neutral-200">
                  <span className="text-sm">Authentic Photo</span>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-semibold text-text-primary">{profile.name}, {profile.age}</h3>
                {profile.verified && <BadgeCheck className="w-5 h-5 text-success-500" />}
              </div>
              <p className="text-sm text-text-secondary mb-3">{profile.profession} • {profile.city}</p>
              <div className="mt-auto px-3 py-1 bg-primary-50 rounded-full text-xs font-medium text-primary-700">
                {profile.highlight}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4">
          <Button variant="secondary" size="lg">Explore Profiles</Button>
        </div>
      </div>
    </section>
  );
}
