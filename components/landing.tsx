"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Heart, Users, Lock, CheckCircle2 } from "lucide-react";

export function LandingHero() {
  return (
    <div className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-foreground">
          Find a Life Partner in a <span className="text-primary">Trusted</span> Community.
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          Sahachar is a marriage platform built on authenticity. Every profile is manually verified, focusing on family values, local connections, and absolute privacy.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/register" className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90 transition-colors">
            Register Free <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          <Link href="/browse" className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-foreground bg-card border border-border rounded-md hover:bg-muted transition-colors">
            Browse Profiles
          </Link>
        </div>
      </div>
    </div>
  );
}

export function TrustBar() {
  const trusts = [
    "Aadhaar Verified Profiles",
    "Manual Profile Screening",
    "Private Phone Numbers",
    "No Fake Accounts"
  ];
  return (
    <div className="border-y border-border bg-muted/30 py-6">
      <div className="container mx-auto px-4 flex flex-wrap justify-center gap-6 md:gap-12">
        {trusts.map((text, i) => (
          <div key={i} className="flex items-center text-sm md:text-base font-medium text-muted-foreground">
            <CheckCircle2 className="w-5 h-5 text-primary mr-2" />
            {text}
          </div>
        ))}
      </div>
    </div>
  );
}

export function HowItWorks() {
  const steps = [
    { num: "1", title: "Create Profile", desc: "Enter your details, family background, and upload your Aadhaar for verification." },
    { num: "2", title: "Manual Review", desc: "Our team reviews your details to ensure authenticity and maintain community trust." },
    { num: "3", title: "Find Matches", desc: "Browse through verified profiles that match your community and preferences." },
    { num: "4", title: "Connect safely", desc: "Send interests. Contact details are only shared when both families agree." },
  ];
  return (
    <div className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How Sahachar Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">A secure process designed to bring families together.</p>
        </div>
        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((step, i) => (
            <div key={i} className="text-center p-6 border border-border rounded-xl bg-card">
              <div className="w-12 h-12 mx-auto bg-primary/10 text-primary rounded-full flex items-center justify-center text-xl font-bold mb-4">
                {step.num}
              </div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function WhySahacharDifferent() {
  const features = [
    { icon: <ShieldCheck />, title: "100% ID Verified", desc: "Every single member must upload government ID. We manually review and approve profiles to eliminate fake accounts." },
    { icon: <Users />, title: "Family & Community Focused", desc: "We provide detailed sections for family background, religion, caste, and gotra to ensure values align." },
    { icon: <Lock />, title: "Absolute Privacy", desc: "Your phone number and premium details are hidden. Only people you mutually accept can see your contact info." },
    { icon: <Heart />, title: "Honest Matchmaking", desc: "No endless swiping or gamification. Just serious profiles looking for a lifelong commitment." }
  ];
  return (
    <div className="py-20 bg-muted/20 border-y border-border">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
          <p className="text-muted-foreground">Built on traditional values, secured by modern technology.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((f, i) => (
            <div key={i} className="flex gap-4 p-6 bg-background border border-border rounded-xl">
              <div className="w-12 h-12 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                {f.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SafetyPrivacy() {
  return null; // Combined with WhySahacharDifferent
}

export function FeaturedProfiles() {
  return null; // Removed fake profiles
}

export function SuccessStories() {
  return null; // Removed fabricated success stories
}

export function FinalCTA() {
  return (
    <div className="py-24 bg-primary/5">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Begin Your Search Today</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
          Join a community of genuine people seeking meaningful marriages.
        </p>
        <Link href="/register" className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90 transition-colors">
          Create Your Profile
        </Link>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="py-12 border-t border-border bg-background text-sm text-muted-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-primary">About Us</Link></li>
              <li><Link href="/" className="hover:text-primary">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="/" className="hover:text-primary">Terms of Service</Link></li>
              <li><Link href="/" className="hover:text-primary">Refund Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Safety</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-primary">Safety Tips</Link></li>
              <li><Link href="/" className="hover:text-primary">Report a Profile</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Sahachar</h4>
            <p className="leading-relaxed">Trusted, verified, and community-focused matchmaking.</p>
          </div>
        </div>
        <div className="text-center pt-8 border-t border-border">
          <p>© {new Date().getFullYear()} Sahachar Matrimony. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
