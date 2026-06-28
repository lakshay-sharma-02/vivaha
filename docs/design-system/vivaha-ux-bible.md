# Vivaha UX Bible: The Architecture of Trust

This document is the definitive User Experience (UX) blueprint for Vivaha. It dictates the psychological, architectural, and interaction principles that separate Vivaha from conventional dating applications and legacy matrimonial websites. Our true competitors are not other matrimonial apps—our competitors for attention and trust are Aman Resorts, Apple, and private wealth managers.

---

## 1. User Personas

Vivaha serves a diverse but specific demographic. Our design must respect traditional family involvement while empowering modern independence.

### 1.1 The Modern Independent (Young Professionals, Doctors, Engineers)
- **Goals:** Find an equal partner with aligned life goals without wasting time on casual dating.
- **Pain Points:** Overwhelmed by endless swiping, superficial profiles, and fake accounts on standard apps.
- **Motivations:** Wants a curated, highly vetted pool of serious individuals.
- **Digital Behavior:** High mobile usage, expects Apple-level fluidity, values dark mode, skims content quickly.
- **Trust Concerns:** Privacy of their photos and professional details.

### 1.2 The Dedicated Parent (Creating a profile for a child)
- **Goals:** Ensure their child marries into a respectable, culturally aligned family.
- **Pain Points:** Finds modern UI confusing. Frustrated by incomplete family details on other apps.
- **Motivations:** Security, pedigree, and deep cultural alignment.
- **Digital Behavior:** Tablet or Desktop usage. Reads everything carefully. 
- **Trust Concerns:** Worried about scams, unverified claims of education/income.

### 1.3 The Global NRI (Non-Resident Indian)
- **Goals:** Connect with someone from their cultural roots who understands a global lifestyle.
- **Pain Points:** Timezone differences, geographical filtering, inability to verify international credentials.
- **Digital Behavior:** Heavy mobile usage, expects high performance regardless of network latency.

---

## 2. Information Architecture

The platform is divided into distinct, strictly isolated zones to maintain context and security.

### 2.1 Public Website (Marketing)
`Home` → `About Us` → `How It Works` → `Membership Tiers` → `Success Stories` → `Legal (Privacy/Terms)`

### 2.2 Authentication & Onboarding
`Login / Signup` → `OTP / 2FA` → `Identity Verification (ID Upload)` → `Onboarding Flow (6 Steps)` → `Approval Pending State`

### 2.3 Dashboard (Authenticated App)
`Home (Curated Matches)` 
`Discover (Advanced Search & Filters)`
`Messages (Encrypted Inbox)`
`Profile (My Details, Preferences, Settings, Privacy Controls)`
`Notifications`

### 2.4 Admin Portal (Strictly Isolated)
`Overview` → `Verification Queue` → `User Moderation` → `Financials` → `Support Tickets`

---

## 3 & 4. Screen Inventory & Detailed Explanations

Every screen in Vivaha is designed with extreme intentionality. Below is the blueprint for core screens.

### 3.1 Marketing Homepage
- **Purpose:** Establish absolute premium authority. Convert visitors into applicants.
- **Target User:** Prospective members and their parents.
- **Information Hierarchy:** 1. Hero Statement (Quiet confidence) 2. "Why Vivaha" (Trust pillars) 3. Social Proof (Anonymized success stats).
- **Primary CTA:** "Apply for Membership" (Not "Sign Up").
- **Motion:** Parallax scroll on editorial imagery. Slow, 800ms fade-ins for text.
- **Empty/Error States:** N/A.

### 3.2 Onboarding: Verification Step
- **Purpose:** Weed out bad actors immediately. Build psychological safety for the user.
- **Information Hierarchy:** 1. Explanation of *why* we require ID. 2. Secure upload zone. 3. Privacy reassurance lock icon.
- **Primary CTA:** "Upload Government ID". **Secondary CTA:** "Why is this required?"
- **Friction:** **INTENTIONAL FRICTION.** We want this to feel like opening a bank account, not a social media profile.

### 3.3 Dashboard: Home (Curated Matches)
- **Purpose:** Present a highly curated, daily selection of matches. Avoid the "infinite scroll" fatigue.
- **Target User:** Approved members.
- **Information Hierarchy:** 1. "Today's Curated Matches" (Max 3-5 profiles). 2. Key compatibility highlights.
- **Primary CTA:** "View Full Profile". **Secondary CTA:** "Pass".
- **Empty State:** "You have reviewed all curated matches for today. Quality takes time." (Calm, reassuring).

### 3.4 Profile Details View
- **Purpose:** Allow deep, thoughtful evaluation of a potential partner.
- **Information Hierarchy:** 1. High-quality imagery gallery. 2. Verification Badges (Education, Income). 3. Narrative bio. 4. Family & Lifestyle details.
- **Primary CTA:** "Express Interest". **Secondary CTA:** "Save for Later".
- **Motion:** Image gallery smoothly scales on scroll. 
- **Privacy Edge Case:** If the viewing user does not match the target's privacy filters, images are elegantly blurred (Glassmorphism) with a lock icon.

### 3.5 Messaging Inbox
- **Purpose:** Facilitate calm, meaningful conversation without notification anxiety.
- **Layout:** Standard dual-pane (Desktop/Tablet) or List-to-Detail (Mobile). 
- **Empty State:** A beautiful line-art illustration of two chairs, "Connections start with a single word."

---

## 5. User Journeys

### 5.1 The "Applicant to Member" Journey
1. **Visitor** lands on Marketing Home.
2. **Clicks "Apply"**. Reaches Signup.
3. **Friction Point:** Must provide phone number and OTP.
4. **Onboarding:** Completes 6 steps of deep, meaningful profiling (Education, Family, Values).
5. **Friction Point:** Uploads Government ID.
6. **Waiting Room:** Account is locked. "Under Review" state shown.
7. **Approval:** Admin approves. User receives a beautifully crafted "Welcome to Vivaha" email.
8. **Dashboard:** User enters the application and sees their first curated matches.

### 5.2 The "Rejected Verification" Journey
1. Admin flags ID as blurry or invalid.
2. User receives an empathetic, clear notification.
3. User opens app, is locked into a "Verification Failed" screen.
4. Clear instructions provided to re-upload. No generic "Error 500" messages.

---

## 6. Navigation System

- **Desktop/Tablet:** Persistent Left Sidebar. Slim, icon + text. Highly stable.
- **Mobile:** Bottom Navigation Bar containing strictly: `Home`, `Discover`, `Messages`, `Profile`. 
- **Scroll Behavior:** On mobile, the Top App Bar (containing the Vivaha logo and Notifications bell) hides on scroll down to maximize screen real estate, and instantly reappears on scroll up.

---

## 7. UX Principles (Friction vs. Flow)

At Vivaha, **Friction is a feature, not a bug.**
- **Where friction SHOULD exist:** Profile creation, ID verification, sending the very first message to a match. We want users to pause and act with intent.
- **Where friction MUST NOT exist:** App performance, image loading, navigating between profiles, filtering search results.
- **Trust Building Moments:** Every time data is saved, a tiny, crisp checkmark appears. Every time a message is sent, delivery status is clear.
- **Premium Delight Moments:** Haptic feedback on mobile when "liking" a profile. Smooth, 60fps glassmorphism transitions.

---

## 8. Component Inventory

A master list of every UI primitive required before building pages:
- **Buttons:** Primary (Gold), Secondary (Glass/Outline), Ghost, Icon.
- **Cards:** Curated Match Card, Standard Profile Card, Pricing/Membership Card, Settings Card.
- **Inputs:** Text Field (with floating labels), Select (Searchable), Multi-select Chips, Date Picker (Age calculation), OTP Input.
- **Feedback:** Toast Notifications, Full-screen Loading Overlay, Skeleton Loaders (shimmer).
- **Navigation:** Sidebar, Bottom Bar, Tabs, Breadcrumbs.
- **Data Display:** Avatars (Circular for users, rounded-square for families), Badges (Verified, Premium), Profile Image Gallery, Timeline (for matching history).
- **Overlays:** Dialogs (Centered), Drawers/Sheets (Sliding from bottom on mobile).

---

## 9. Interaction Inventory

- **Hover:** Buttons shift 5% lighter. Cards lift slightly (shadow increases) and images zoom 1.05x over 600ms.
- **Tap/Press:** Instant 0.97x scale down for physical tactile feedback.
- **Swipe:** On mobile, swipe right on a message thread to archive, swipe left on a profile gallery to see next photo.
- **Image Zoom:** Tapping a profile photo opens a full-screen, pitch-black gallery overlay with fluid, gesture-based pan and zoom.
- **Transitions:** Moving from `Home` to `Profile Details` utilizes a shared-element transition (or fade-through) to avoid jarring context switches.

---

## 10. Design Consistency Rules

- **Copywriting Tone:** Editorial, calm, affirmative. 
  - *Bad:* "Oops! Something went wrong! Try again later! 😢"
  - *Vivaha Standard:* "We were unable to save your changes. Please verify your connection and try again."
- **Typography:** Playfair Display is NEVER used for inputs, buttons, or body text. It is strictly for H1/H2 titles.
- **Empty States:** Never leave a screen blank. Always provide a beautiful illustration and a path forward (e.g., "No messages yet. Explore your matches to start a conversation.").
- **Destructive Actions:** Deleting a profile or blocking a user requires a typed confirmation (e.g., type "DELETE") to prevent accidental trauma.

---

## 11. UX Audit Checklist

Before ANY screen is handed to engineering, the design must pass this gauntlet:
- [ ] **Trust & Privacy:** Does this screen make it explicitly clear who can see this data?
- [ ] **Visual Hierarchy:** Does the eye immediately know what the primary action is? Is there only ONE primary gold button per view?
- [ ] **Accessibility:** Do all text colors pass WCAG AA contrast against their backgrounds?
- [ ] **Component Reuse:** Are we using standard `src/shared/ui` primitives, or did we invent a new button style unnecessarily?
- [ ] **Motion:** Are the transition timings calm (300-600ms) rather than hyperactive (<150ms)?
- [ ] **Emotional Impact:** If a user sees this screen after a long, stressful day at work, will it feel calming and reassuring?

---

## 12. Screen Development Order

To build this application efficiently and minimize rework, engineering must follow this exact sequence:

1. **Global Layouts & Navigation:** Build the Sidebar, Bottom Nav, and Top Bars first. This creates the skeleton.
2. **Authentication Flow (Login/Signup):** The gatekeeper. Requires Supabase integration and standard form components.
3. **Onboarding Flow:** The most complex state management (multi-step forms, image uploads).
4. **Dashboard Home & Discover:** The core read-only data consumption views.
5. **Profile Details:** The complex, media-heavy view of a single user.
6. **Messaging:** Highly interactive, real-time complex UI.
7. **Settings & Membership:** The logistical views.
8. **Marketing Site (Homepage, etc.):** Built last because it can utilize all the UI primitives (Cards, Buttons, Fonts) already perfected in the app.

*Why this order?* Building the core authenticated shell (Layouts -> Auth -> Onboarding) ensures the data pipeline is perfect before trying to render complex UI like Messaging or Profiles. Building the Marketing site last ensures it perfectly reflects the actual product's design language.
