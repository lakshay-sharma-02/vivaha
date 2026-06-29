"use client"
import { ProfileCard } from "@/shared/ui/profile-card/profile-card"

const PROFILES = [
  { name: "Aditi",  age: 26, location: "San Francisco", profession: "Data Scientist", education: "Top Tier University" },
  { name: "Karan",  age: 27, location: "London",        profession: "Surgeon",         education: "Top Tier University" },
  { name: "Sneha",  age: 28, location: "Dubai",         profession: "Founder",          education: "Top Tier University" },
  { name: "Vikram", age: 29, location: "Singapore",     profession: "Director",         education: "Top Tier University" },
  { name: "Neha",   age: 30, location: "New York",      profession: "Consultant",       education: "Top Tier University" },
  { name: "Rahul",  age: 31, location: "Mumbai",        profession: "Architect",        education: "Top Tier University" },
]

export function DiscoverGrid() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
      {PROFILES.map((profile) => (
        <ProfileCard
          key={profile.name}
          name={profile.name}
          age={profile.age}
          location={profile.location}
          profession={profile.profession}
          education={profile.education}
          isVerified={true}
        />
      ))}
    </div>
  )
}
