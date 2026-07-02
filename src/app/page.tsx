import { CinematicSection } from "@/components/homepage/animations/cinematic-layout";
import { HeroSection } from "@/components/homepage/sections/HeroSection";
import { TrustSection } from "@/components/homepage/sections/TrustSection";
import { HowItWorksSection } from "@/components/homepage/sections/HowItWorksSection";
import { DiscoverPreviewSection } from "@/components/homepage/sections/DiscoverPreviewSection";
import { SuccessStoriesSection } from "@/components/homepage/sections/SuccessStoriesSection";
import { FamilySection } from "@/components/homepage/sections/FamilySection";
import { MembershipSection } from "@/components/homepage/sections/MembershipSection";
import { FAQSection } from "@/components/homepage/sections/FAQSection";
import { FooterSection } from "@/components/homepage/sections/FooterSection";

export default function Home() {
  return (
    <main className="w-full bg-background text-text-primary">
      {/* 01: Hero */}
      <CinematicSection index={0}>
        <HeroSection />
      </CinematicSection>

      {/* 02: Trust */}
      <CinematicSection index={1}>
        <TrustSection />
      </CinematicSection>

      {/* 03: How Vivaha Works */}
      <CinematicSection index={2}>
        <HowItWorksSection />
      </CinematicSection>

      {/* 04: Discover Preview */}
      <CinematicSection index={3}>
        <DiscoverPreviewSection />
      </CinematicSection>

      {/* 05: Success Stories */}
      <CinematicSection index={4}>
        <SuccessStoriesSection />
      </CinematicSection>

      {/* 06: Family Experience */}
      <CinematicSection index={5}>
        <FamilySection />
      </CinematicSection>

      {/* 07: Membership */}
      <CinematicSection index={6}>
        <MembershipSection />
      </CinematicSection>

      {/* 08: Frequently Asked Questions */}
      <CinematicSection index={7}>
        <FAQSection />
      </CinematicSection>

      {/* 09: Footer */}
      <FooterSection />
    </main>
  );
}
