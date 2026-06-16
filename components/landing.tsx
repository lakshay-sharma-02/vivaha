"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Heart, Users } from "lucide-react";

export function LandingHero() {
  return (
    <div className="relative overflow-hidden pt-[120px] pb-[100px]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold tracking-tight mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Find trusted marriage matches from your <span className="text-primary italic">own community.</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Where family reputation, cultural compatibility, and personal trust matter more than algorithms. Every profile is manually verified.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <Link href="/browse" className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-primary-foreground bg-primary rounded-full hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
              Browse Profiles <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link href="/login" className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-foreground bg-card glass-panel rounded-full hover:bg-card/90 transition-all">
              Create Profile
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10" />
    </div>
  );
}

export function TrustSection() {
  const features = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
      title: "Human Verification",
      description: "Every profile and Aadhaar card is manually verified by our team. No fake accounts."
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Local Community Focus",
      description: "Find matches within your specific town, caste, and cultural background."
    },
    {
      icon: <Heart className="w-8 h-8 text-primary" />,
      title: "Family Friendly",
      description: "Designed for parents and individuals. Trust and transparency at every step."
    }
  ];

  return (
    <div className="py-24 bg-card/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="glass-panel p-8 rounded-2xl text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
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
    <div className="py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Discover Premium Profiles</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get access to highly qualified, verified profiles from respected families.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {sampleProfiles.map((profile, i) => (
            <motion.div 
              key={i}
              className="glass-panel rounded-2xl overflow-hidden relative"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
            >
              <div className={`h-64 bg-muted flex items-center justify-center ${profile.blurred ? 'blur-md' : ''}`}>
                <Heart className="w-16 h-16 text-muted-foreground/30" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">{profile.blurred ? "V****** Profile" : profile.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{profile.age} yrs • {profile.location}</p>
                <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                  {profile.profession}
                </div>
              </div>
              {profile.blurred && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/20 backdrop-blur-[2px]">
                  <div className="px-4 py-2 bg-card/90 text-sm font-medium rounded-full shadow-lg border border-border">
                    Unlock to View
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
