import { ProfileCard } from "@/shared/ui/profile-card/profile-card"

// Mock data to demonstrate the layout
const CURATED_MATCHES = [
  {
    id: "1",
    name: "Priya",
    age: 28,
    location: "Mumbai, India",
    profession: "Architect",
    education: "IIT Bombay",
    matchPercentage: 94,
    imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "2",
    name: "Ananya",
    age: 27,
    location: "New York, USA",
    profession: "Investment Banker",
    education: "Columbia University",
    matchPercentage: 89,
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "3",
    name: "Rohan",
    age: 30,
    location: "London, UK",
    profession: "Software Engineer",
    education: "Imperial College",
    matchPercentage: 91,
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800",
  }
]

export default function HomePage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-playfair text-4xl font-semibold tracking-tight text-foreground">
          Curated For You
        </h1>
        <p className="mt-3 text-[15px] text-muted-foreground">
          Your daily selection of highly compatible, verified matches.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        {CURATED_MATCHES.map((match) => (
          <ProfileCard
            key={match.id}
            name={match.name}
            age={match.age}
            location={match.location}
            profession={match.profession}
            education={match.education}
            matchPercentage={match.matchPercentage}
            imageUrl={match.imageUrl}
          />
        ))}
      </div>
      
      <div className="pt-12 text-center text-sm font-medium text-muted-foreground">
        You have reviewed all curated matches for today. Quality takes time.
      </div>
    </div>
  )
}
