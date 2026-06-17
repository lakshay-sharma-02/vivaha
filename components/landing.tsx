"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Heart, Users } from "lucide-react";

export function LandingHero() {
  return (
    <div className="relative overflow-hidden pt-32 pb-24 lg:pt-48 lg:pb-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-6 inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium tracking-wide"
          >
            ✨ The Premium Matrimony Network
          </motion.div>
          <motion.h1 
            className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8 text-transparent bg-clip-text bg-gradient-to-br from-foreground via-foreground to-muted-foreground drop-shadow-sm leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          >
            Find trusted matches from your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent italic pr-2">own community.</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Where family reputation, cultural compatibility, and personal trust matter more than algorithms. Every profile is <strong className="text-foreground font-medium">manually verified</strong>.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <Link href="/browse" className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-primary-foreground bg-primary rounded-full overflow-hidden transition-all shadow-[0_0_40px_-10px_rgba(var(--color-primary),0.5)] hover:shadow-[0_0_60px_-10px_rgba(var(--color-primary),0.7)] hover:-translate-y-1">
              <span className="relative z-10 flex items-center">Browse Profiles <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            </Link>
            <Link href="/login" className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-foreground bg-card/40 backdrop-blur-xl border border-border/50 rounded-full hover:bg-card/60 transition-all hover:-translate-y-1 hover:border-border">
              Create Profile
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Stunning decorative background elements */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10 mix-blend-screen opacity-70 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[120px] -z-10 mix-blend-screen opacity-70" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-20" />
    </div>
  );
}

export function TrustSection() {
  const features = [
    {
      icon: <ShieldCheck className="w-10 h-10 text-primary drop-shadow-[0_0_10px_rgba(var(--color-primary),0.8)]" />,
      title: "Human Verification",
      description: "Every profile and Aadhaar card is manually verified by our team. No fake accounts."
    },
    {
      icon: <Users className="w-10 h-10 text-primary drop-shadow-[0_0_10px_rgba(var(--color-primary),0.8)]" />,
      title: "Local Community Focus",
      description: "Find matches within your specific town, caste, and cultural background."
    },
    {
      icon: <Heart className="w-10 h-10 text-primary drop-shadow-[0_0_10px_rgba(var(--color-primary),0.8)]" />,
      title: "Family Friendly",
      description: "Designed for parents and individuals. Trust and transparency at every step."
    }
  ];

  return (
    <div className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/10 to-transparent -z-10" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">Why Choose Vivaha?</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Built on trust and family values, ensuring a safe matching environment.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="group relative bg-card/40 backdrop-blur-2xl border border-border/50 p-10 rounded-[2rem] text-center overflow-hidden transition-all hover:bg-card/60 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
            >
              <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all duration-500" />
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center mb-8 border border-primary/20 shadow-inner rotate-3 group-hover:rotate-6 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-4 tracking-tight">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SampleProfilesSection() {
  const sampleProfiles = [
    { name: "Priya S.", age: 26, location: "Delhi", profession: "Software Engineer", blurred: false },
    { name: "Aarav M.", age: 29, location: "Mumbai", profession: "Doctor", blurred: true },
    { name: "Neha K.", age: 27, location: "Bangalore", profession: "Architect", blurred: true },
  ];

  return (
    <div className="py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-full h-[500px] bg-secondary/5 -skew-y-3 -z-10 transform origin-left" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Discover Premium Profiles</h2>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto font-light">
            Get access to highly qualified, verified profiles from respected families in your community.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {sampleProfiles.map((profile, i) => (
            <motion.div 
              key={i}
              className="group bg-card/60 backdrop-blur-md rounded-[2.5rem] overflow-hidden relative border border-border/40 shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.2, ease: "easeOut" }}
            >
              <div className={`relative h-72 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center overflow-hidden ${profile.blurred ? 'blur-xl scale-110' : ''}`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--color-primary),0.05)_0%,transparent_100%)]" />
                <Heart className="w-20 h-20 text-foreground/10 drop-shadow-md" />
              </div>
              <div className="p-8 relative bg-card">
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                <h3 className="text-2xl font-bold mb-2 tracking-tight">{profile.blurred ? "V****** Profile" : profile.name}</h3>
                <p className="text-muted-foreground mb-6 font-medium">{profile.age} yrs • {profile.location}</p>
                <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary text-sm rounded-full font-semibold tracking-wide border border-primary/20">
                  {profile.profession}
                </div>
              </div>
              {profile.blurred && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/30 backdrop-blur-sm z-20">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="px-6 py-3 bg-foreground text-background text-sm font-semibold rounded-full shadow-2xl border border-white/10 flex items-center gap-2 cursor-pointer"
                  >
                    Unlock to View <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
