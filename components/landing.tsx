"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Heart, Users, Brain, Lock, MessageCircle, Star, Sparkles, CheckCircle2 } from "lucide-react";

export function LandingHero() {
  return (
    <div className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32 bg-background flex flex-col items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-6 inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium tracking-wide"
          >
            <Sparkles className="w-4 h-4 mr-2" /> Elite Matchmaking Network
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 text-transparent bg-clip-text bg-gradient-to-br from-foreground via-foreground to-muted-foreground drop-shadow-sm leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          >
            Find a Life Partner <br className="hidden md:block"/> Who <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent italic pr-2">Truly Matches</span> You.
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Verified profiles, AI-powered compatibility, and family-focused matchmaking designed for modern relationships.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <Link href="/login" className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-primary-foreground bg-primary rounded-full overflow-hidden transition-all shadow-[0_0_40px_-10px_rgba(var(--color-primary),0.5)] hover:shadow-[0_0_60px_-10px_rgba(var(--color-primary),0.7)] hover:-translate-y-1">
              <span className="relative z-10 flex items-center">Create Free Profile <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            </Link>
            <Link href="/browse" className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-foreground bg-card/40 backdrop-blur-xl border border-border/50 rounded-full hover:bg-card/60 transition-all hover:-translate-y-1 hover:border-border">
              Browse Profiles
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10 mix-blend-screen opacity-70 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] -z-10 mix-blend-screen opacity-70" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-20" />
    </div>
  );
}

export function TrustBar() {
  const trusts = [
    "ID Verified Profiles",
    "Private & Secure",
    "No Hidden Contact Sharing",
    "AI-Powered Matching"
  ];
  return (
    <div className="border-y border-border/50 bg-card/20 backdrop-blur-md py-6">
      <div className="container mx-auto px-4 flex flex-wrap justify-center md:justify-between items-center gap-6 md:gap-4 opacity-80">
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
    { num: "1", title: "Create Your Profile", desc: "Share your details, family background, and values in a few simple steps." },
    { num: "2", title: "Discover Matches", desc: "Our algorithm finds highly compatible partners based on your exact preferences." },
    { num: "3", title: "Connect & Build", desc: "Engage in meaningful conversations and take the next step toward your future." },
  ];
  return (
    <div className="py-24 bg-background relative z-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">How Sahachar Works</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Your journey to finding the perfect match, simplified.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="relative p-8 rounded-[2rem] bg-card/40 border border-border/50 backdrop-blur-sm text-center"
            >
              <div className="w-16 h-16 mx-auto bg-primary/10 text-primary rounded-full flex items-center justify-center text-2xl font-bold mb-6 border border-primary/20">
                {step.num}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function WhySahacharDifferent() {
  const features = [
    { icon: <Brain />, title: "AI Compatibility Analysis", desc: "We look way beyond just age and location to find deep psychological and lifestyle matches." },
    { icon: <Users />, title: "Family Compatibility", desc: "Marriage is the union of two families. We help align values, traditions, and expectations." },
    { icon: <ShieldCheck />, title: "Verified Members", desc: "Strict ID verification ensures you are talking to real people with genuine intentions." },
    { icon: <MessageCircle />, title: "Guided Conversations", desc: "Meaningful prompts and discussion points to help you truly know your match before committing." }
  ];
  return (
    <div className="py-24 bg-card/10 border-y border-border/30">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Sahachar Is Different</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">We abandoned the outdated matrimonial search engines to build a platform based on deep human connection.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex gap-6 p-8 rounded-3xl bg-background border border-border/50 hover:border-primary/30 transition-colors">
              <div className="w-14 h-14 shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                {f.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function FeaturedProfiles() {
  return (
    <div className="py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Meet Some of Our Members</h2>
          <p className="text-muted-foreground">Join thousands of verified individuals looking for a serious commitment.</p>
        </div>
        <div className="flex justify-center gap-6 flex-wrap">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-64 h-80 rounded-3xl bg-card border border-border/50 overflow-hidden relative group">
              <div className="absolute inset-0 bg-muted/30 animate-pulse" /> {/* Placeholder for image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 w-full p-6 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-lg">Verified Member</span>
                  <ShieldCheck className="w-4 h-4 text-primary" />
                </div>
                <p className="text-sm text-white/80">Software Engineer • 28</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SuccessStories() {
  return (
    <div className="py-24 bg-card/20 border-y border-border/30">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Success Stories</h2>
          <p className="text-muted-foreground">Real couples who found their forever on Sahachar.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { names: "Rahul & Priya", quote: "Sahachar's family compatibility feature made all the difference. Our parents instantly connected, making the entire process incredibly smooth." },
            { names: "Ankit & Sneha", quote: "I was tired of fake profiles on other apps. The verified badge on Sahachar gave me the confidence to finally start meaningful conversations." }
          ].map((story, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-8 rounded-3xl bg-background border border-border/50 relative">
              <Star className="absolute top-6 right-6 w-8 h-8 text-primary/20" />
              <p className="text-lg italic text-muted-foreground mb-6 leading-relaxed">"{story.quote}"</p>
              <p className="font-semibold">{story.names}</p>
              <p className="text-sm text-primary">Married in 2025</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SafetyPrivacy() {
  return (
    <div className="py-24">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-8">
          <Lock className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-4xl font-bold mb-6">Your Privacy Comes First</h2>
        <p className="text-xl text-muted-foreground mb-12">We understand the importance of discretion in matchmaking.</p>
        <div className="grid sm:grid-cols-2 gap-6 text-left">
          {[
            "Control exactly who sees your photos",
            "Phone number completely hidden by default",
            "Strictly verified members only",
            "End-to-end encrypted secure conversations"
          ].map((text, i) => (
            <div key={i} className="flex items-center p-4 rounded-2xl bg-card border border-border/50">
              <CheckCircle2 className="w-6 h-6 text-primary mr-4 shrink-0" />
              <span className="font-medium">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function FinalCTA() {
  return (
    <div className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5" />
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h2 className="text-5xl font-bold mb-6">Ready to Meet Your Sahachar?</h2>
        <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          Create your profile today and start discovering deeply meaningful connections.
        </p>
        <Link href="/login" className="inline-flex items-center justify-center px-10 py-5 text-xl font-medium text-primary-foreground bg-primary rounded-full hover:scale-105 transition-transform shadow-[0_0_50px_-10px_rgba(var(--color-primary),0.6)]">
          Create Free Profile <ArrowRight className="ml-3 w-6 h-6" />
        </Link>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="py-12 border-t border-border/50 bg-background text-sm text-muted-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2"><li>About Us</li><li>Success Stories</li><li>Contact</li></ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2"><li>Privacy Policy</li><li>Terms of Service</li><li>Refund Policy</li></ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Safety</h4>
            <ul className="space-y-2"><li>Safety Tips</li><li>Community Guidelines</li><li>Report a Profile</li></ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Sahachar</h4>
            <p className="leading-relaxed">The premium destination for verified, meaningful matchmaking.</p>
          </div>
        </div>
        <div className="text-center pt-8 border-t border-border/20">
          <p>© {new Date().getFullYear()} Sahachar Matrimony. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
