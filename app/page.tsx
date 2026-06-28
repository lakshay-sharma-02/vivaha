"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShieldCheck, HeartHandshake, Users, ArrowRight, Lock, Sparkles, MapPin, EyeOff, CheckCircle } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
}

function FloatingProfileCard({ className, delay = 0, rotate = 0 }: { className?: string, delay?: number, rotate?: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50, rotate: rotate - 10 }}
      animate={{ opacity: 1, y: 0, rotate: rotate }}
      transition={{ duration: 1, delay, type: "spring", bounce: 0.4 }}
      whileHover={{ y: -10, scale: 1.02, rotate: 0 }}
      className={`relative bg-card/60 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-2xl rounded-3xl p-5 w-64 overflow-hidden group ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Blurred image placeholder */}
      <div className="flex gap-4 items-center mb-5">
        <div className="w-14 h-14 rounded-full bg-muted/80 overflow-hidden relative ring-2 ring-background shadow-inner flex items-center justify-center">
          <Lock className="w-5 h-5 text-muted-foreground/50" />
        </div>
        <div>
          <div className="h-3 w-20 bg-foreground/10 rounded-full mb-2" />
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <MapPin className="w-3 h-3" /> <div className="h-2 w-12 bg-foreground/10 rounded-full" />
          </div>
        </div>
      </div>
      
      <div className="space-y-2.5">
        <div className="h-2 w-full bg-foreground/10 rounded-full" />
        <div className="h-2 w-4/5 bg-foreground/10 rounded-full" />
        <div className="h-2 w-5/6 bg-foreground/10 rounded-full" />
      </div>
      
      <div className="mt-5 flex items-center justify-between border-t border-border/50 pt-4">
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
          <ShieldCheck className="w-3.5 h-3.5" /> <span>Verified</span>
        </div>
        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <ArrowRight className="w-3.5 h-3.5 -rotate-45" />
        </div>
      </div>
    </motion.div>
  )
}

export default function LandingPage() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] })
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150])

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden selection:bg-primary/20 selection:text-primary">
      
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 w-full z-50 bg-background/70 backdrop-blur-xl border-b border-white/10"
      >
        <div className="container mx-auto px-4 h-20 flex items-center justify-between max-w-6xl">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-tr from-primary to-primary/60 text-primary-foreground rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <span className="text-2xl font-serif font-bold tracking-tight">Vivaha</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors hidden sm:block">
              Sign In
            </Link>
            <Button asChild className="rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300">
              <Link href="/login">Create Profile</Link>
            </Button>
          </div>
        </div>
      </motion.nav>

      <main className="flex-1 pt-20">
        
        {/* HERO SECTION */}
        <section className="relative pt-24 pb-32 lg:pt-36 lg:pb-40 overflow-hidden min-h-[90vh] flex items-center">
          {/* Animated Mesh Gradients */}
          <div className="absolute inset-0 w-full h-full -z-20 overflow-hidden">
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-[10%] -right-[10%] w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] bg-primary/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-overlay" 
            />
            <motion.div 
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [0, -90, 0],
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-[20%] -left-[10%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] bg-secondary/15 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-overlay" 
            />
          </div>

          <div className="container mx-auto px-4 max-w-7xl relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            <motion.div 
              className="text-center lg:text-left pt-10 lg:pt-0"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center rounded-full bg-background/50 backdrop-blur-md px-4 py-1.5 text-sm font-medium text-primary mb-8 ring-1 ring-inset ring-primary/20 shadow-sm">
                <Sparkles className="w-4 h-4 mr-2" />
                The Premium Matrimony Experience
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-serif font-bold tracking-tight mb-6 leading-[1.1]">
                Find trusted matches from <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-secondary-foreground">your community.</span>
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Vivaha replaces endless scrolling with deeply verified, hyper-local introductions. Because family reputation and trust matter more than algorithms.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Button asChild size="lg" className="h-14 px-8 rounded-full text-base shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all w-full sm:w-auto group">
                  <Link href="/login">
                    Start Your Search
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <div className="flex items-center gap-3 text-sm text-muted-foreground px-4">
                  <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm" />
                        <CheckCircle className="w-4 h-4 text-primary" />
                      </div>
                    ))}
                  </div>
                  <span>Join 500+ verified families</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right side floating cards */}
            <div className="relative h-[500px] hidden lg:block perspective-1000">
              <motion.div style={{ y: y1 }} className="absolute right-[10%] top-[10%] z-20">
                <FloatingProfileCard delay={0.2} rotate={-6} />
              </motion.div>
              <motion.div style={{ y: y2 }} className="absolute right-[40%] top-[40%] z-10">
                <FloatingProfileCard className="scale-90 opacity-60" delay={0.4} rotate={8} />
              </motion.div>
              <motion.div style={{ y: y1 }} className="absolute right-[5%] bottom-[5%] z-30">
                <FloatingProfileCard delay={0.6} rotate={3} />
              </motion.div>
            </div>
          </div>
        </section>

        {/* BENTO GRID FEATURES SECTION */}
        <section className="py-32 bg-background relative z-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="text-center mb-20"
            >
              <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-serif font-bold mb-6">Quality over Quantity</motion.h2>
              <motion.p variants={fadeInUp} className="text-xl text-muted-foreground max-w-2xl mx-auto">We designed Vivaha for parents, guardians, and serious individuals who value authenticity.</motion.p>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8 auto-rows-[320px]">
              
              {/* Feature 1 */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="md:col-span-2 bg-gradient-to-br from-card to-card/50 border border-white/10 dark:border-white/5 rounded-[2.5rem] p-10 relative overflow-hidden group hover:border-primary/30 transition-colors"
              >
                <div className="absolute right-0 bottom-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 shadow-inner ring-1 ring-primary/20">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-serif font-semibold mb-4">100% Manually Verified</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-md">Every profile requires Aadhaar validation and manual admin approval before joining our network. No fake accounts, ever.</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Feature 2 */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gradient-to-br from-secondary/30 to-background border border-white/10 dark:border-white/5 rounded-[2.5rem] p-10 relative overflow-hidden group hover:border-secondary-foreground/20 transition-colors"
              >
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="w-14 h-14 bg-background text-foreground rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-border">
                    <HeartHandshake className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif font-semibold mb-3">Family Friendly</h3>
                    <p className="text-muted-foreground leading-relaxed">Built for parents to comfortably search on behalf of their children.</p>
                  </div>
                </div>
              </motion.div>

              {/* Feature 3 */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-card border border-white/10 dark:border-white/5 rounded-[2.5rem] p-10 relative overflow-hidden group hover:border-primary/30 transition-colors"
              >
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                    <Lock className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif font-semibold mb-3">Privacy First</h3>
                    <p className="text-muted-foreground leading-relaxed">Contact details and photos remain blurred until explicitly unlocked.</p>
                  </div>
                </div>
              </motion.div>

              {/* Feature 4 */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="md:col-span-2 bg-gradient-to-br from-background to-muted/30 border border-white/10 dark:border-white/5 rounded-[2.5rem] p-10 relative overflow-hidden group hover:border-border transition-colors"
              >
                <div className="absolute right-0 top-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="w-14 h-14 bg-background text-foreground rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-border">
                    <Users className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-serif font-semibold mb-4">Hyper-Local Connections</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-md">Find matches strictly within your own town, community, and caste. Because shared background is the strongest foundation for trust.</p>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* HOW IT WORKS (Timeline) */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 -skew-y-3 transform origin-top-left -z-10" />
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">A Simple, Transparent Journey</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">No subscriptions. Pay a one-time fee only when you find someone you want to connect with.</p>
            </div>
            
            <div className="space-y-12">
              {[
                { step: "01", title: "Create Your Profile", desc: "Sign up for free and fill out your details, family background, and partner preferences." },
                { step: "02", title: "Admin Verification", desc: "Submit your Aadhaar. Our team manually verifies every detail to ensure absolute safety." },
                { step: "03", title: "Browse Securely", desc: "Explore verified profiles matching your criteria. Sensitive data remains locked and blurred." },
                { step: "04", title: "Unlock & Connect", desc: "Pay a one-time fee to unlock full contact details, horoscopes, and family history." }
              ].map((item, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  key={i} 
                  className="flex flex-col md:flex-row gap-6 md:gap-10 items-start group"
                >
                  <div className="flex-shrink-0 text-6xl font-serif font-bold text-primary/20 group-hover:text-primary transition-colors duration-500">
                    {item.step}
                  </div>
                  <div className="pt-2">
                    <h3 className="text-2xl font-semibold mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-32 relative">
          <div className="container mx-auto px-4 max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary to-primary/80 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-primary/20"
            >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
              <div className="relative z-10 text-primary-foreground">
                <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-white">Ready to find your match?</h2>
                <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto text-white/90">Join the fastest growing verified matrimony network tailored perfectly to your community.</p>
                <Button asChild size="lg" className="h-16 px-10 rounded-full text-lg bg-white text-primary hover:bg-white/90 hover:scale-105 transition-all shadow-xl">
                  <Link href="/login">Create Your Profile Now</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-background py-12 border-t border-border">
        <div className="container mx-auto px-4 max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all">
            <HeartHandshake className="w-6 h-6 text-primary" />
            <span className="text-xl font-serif font-bold tracking-tight">Vivaha</span>
          </div>
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Vivaha Matrimony. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm font-medium text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
