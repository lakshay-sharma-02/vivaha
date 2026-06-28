import { ShieldCheck, MapPin, Briefcase, GraduationCap, Users } from "lucide-react"
import { Button } from "@/shared/ui/button/button"
import { ProfileGallery } from "@/features/profile/components/profile-gallery"

export default async function ProfileDetailsPage({ params }: { params: { id: string } }) {
  // In a real implementation, we would fetch the profile by params.id here.
  // Mock data representing a highly verified, premium profile.
  const profile = {
    name: "Priya Sharma",
    age: 28,
    location: "Mumbai, India",
    profession: "Lead Architect",
    education: "M.Arch, IIT Bombay",
    height: "5'6\" (168cm)",
    religion: "Hindu, Brahmin",
    bio: "Passionate about sustainable architecture and creating spaces that bring people together. Outside of work, I enjoy classical music, weekend hikes, and spending time with my close-knit family. I am looking for an equal partner who values ambition and family traditions alike.",
    family: "I come from a nuclear family. My father is a retired diplomat and my mother is an educator. I have one younger brother who works in tech.",
    images: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=1600",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1600",
    ]
  }

  return (
    <div className="mx-auto max-w-5xl space-y-12 pb-24">
      {/* Cinematic Hero Gallery */}
      <ProfileGallery images={profile.images} />

      {/* Profile Header & Actions */}
      <div className="flex flex-col gap-8 border-b border-border/50 pb-8 md:flex-row md:items-end md:justify-between">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <h1 className="font-playfair text-5xl font-semibold tracking-tight text-foreground">
              {profile.name}, {profile.age}
            </h1>
            <ShieldCheck className="h-8 w-8 text-primary" />
          </div>
          
          <div className="flex flex-wrap items-center gap-6 text-[16px] text-muted-foreground">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>{profile.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Briefcase className="h-5 w-5" />
              <span>{profile.profession}</span>
            </div>
          </div>
        </div>

        <div className="flex w-full space-x-4 md:w-auto">
          <Button variant="outline" className="h-12 flex-1 px-8 text-[15px] md:flex-none">Pass</Button>
          <Button className="h-12 flex-1 px-8 text-[15px] shadow-lg shadow-primary/20 md:flex-none">
            Express Interest
          </Button>
        </div>
      </div>

      {/* Deep Dive Profile Content */}
      <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
        {/* Main Narrative Content */}
        <div className="space-y-12 md:col-span-2">
          <section className="space-y-5">
            <h2 className="font-playfair text-3xl font-semibold text-foreground">About Me</h2>
            <p className="text-[17px] leading-relaxed text-muted-foreground">
              {profile.bio}
            </p>
          </section>

          <section className="space-y-5">
            <h2 className="font-playfair text-3xl font-semibold text-foreground">Family Background</h2>
            <p className="text-[17px] leading-relaxed text-muted-foreground">
              {profile.family}
            </p>
          </section>
        </div>

        {/* Quick Facts Sidebar */}
        <div>
          <div className="sticky top-24 space-y-8 rounded-2xl border border-border/40 bg-card/30 p-8 backdrop-blur-xl">
            <h3 className="font-medium text-lg border-b border-border/50 pb-4">At a Glance</h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <GraduationCap className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Education</p>
                  <p className="text-sm text-muted-foreground mt-1">{profile.education}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Users className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Community</p>
                  <p className="text-sm text-muted-foreground mt-1">{profile.religion}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex h-5 w-5 items-center justify-center text-primary mt-0.5">
                  <span className="font-semibold text-[11px]">HT</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Height</p>
                  <p className="text-sm text-muted-foreground mt-1">{profile.height}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
