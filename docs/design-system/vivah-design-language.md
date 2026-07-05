# Vivah Design Language & Motion System

This document is the **single source of truth** for Vivah's visual identity. It defines the brand personality, design tokens, typography, motion philosophy, and structural guidelines that elevate Vivah from a standard software application into a world-class, premium digital experience.

---

## 1. Context & Brand Personality

Vivah is a premium matrimonial platform built on trust, privacy, verification, and meaningful relationships. It is the antithesis of a casual dating app. 

**If Vivah were a person:**
- **How would it speak?** With quiet confidence, warmth, and precision. It never shouts, never uses slang, and never rushes the user. It speaks like a highly trusted, elite matchmaker guiding a client in a private, warmly-lit library.
- **How would it dress?** In bespoke, timeless tailoring. Clean lines, impeccable fabrics, neutral tones with understated gold or jewel-tone accents.
- **How would it behave?** Respectfully, attentively, and securely. It anticipates needs without being intrusive. It protects user privacy fiercely.
- **What emotions does it create?** Calmness, trust, exclusivity, hope, and safety.
- **What emotions should it never create?** Anxiety, FOMO (Fear Of Missing Out), urgency, overwhelm, or cheapness.

---

## 2. Design Principles

1. **Space is Luxury:** High-end brands do not crowd their displays. Generous negative space focuses the eye and creates a feeling of exclusivity and calm.
2. **Typography as Identity:** Because imagery in this space can be unpredictable (user-uploaded photos), typography carries the weight of the brand's elegance.
3. **Motion Should Guide, Never Distract:** Animation must mimic the physical world—smooth, deliberate, and intentional. Nothing bounces aggressively; everything settles gracefully.
4. **Trust Before Conversion:** We do not use dark patterns. Privacy toggles are prominent. Verification badges are clear. Earning trust is more important than rushing a profile completion.
5. **Simplicity Over Decoration:** Remove unnecessary lines, heavy shadows, and decorative backgrounds. If an element does not serve a purpose, remove it.
6. **Every Interaction is Intentional:** The transition from hovering a button to clicking it should feel tactile and satisfying, reinforcing quality through micro-interactions.
7. **Timelessness Over Trends:** We avoid fleeting UI trends (e.g., extreme neobrutalism, excessive 3D gradients) in favor of editorial, classic graphic design principles.

---

## 3. Semantic Design Tokens

Colors are defined purely by semantic tokens using the OKLCH color space for perceptually uniform luminance.

### **Surfaces & Backgrounds**
- **Background Base:** The foundational color of the app. (Dark: Deep Midnight Charcoal, Light: Soft Ivory).
- **Surface:** For standard cards and containers resting on the background. Slightly elevated luminance.
- **Elevated Surface:** For dropdowns, popovers, and sticky headers.
- **Glass Surface:** Used when depth is required without blocking content behind it. (50% opacity with heavy backdrop blur).

### **Typography**
- **Text Primary:** For headings and crucial data. (Off-white in Dark, Deep Ink in Light). Never pure #FFF or #000 to reduce eye strain.
- **Text Secondary:** For standard body copy. Highly legible but sits back in the visual hierarchy.
- **Text Muted:** For captions, timestamps, and placeholder text.
- **Text Inverse:** Text that sits on top of Primary or Accent blocks.

### **Borders & Dividers**
- **Border Subdued:** Very faint borders (e.g., 5% opacity) to separate content softly.
- **Border Strong:** Used for active inputs or selected cards.

### **Interactive & Status Tokens**
- **Action Primary:** The brand's signature Champagne Gold. Used strictly for primary calls to action (e.g., "Send Request", "Verify Profile").
- **Action Hover:** A slightly brighter/warmer shift of the primary action.
- **Action Disabled:** Muted, low-contrast, entirely unclickable appearance.
- **Status Success:** Emerald green, desaturated to feel elegant, not neon.
- **Status Warning:** Warm amber/gold.
- **Status Error:** Rose/crimson. Used sparingly. Never aggressive red.
- **Premium Highlight:** A subtle gradient or distinct metallic gold token reserved solely for membership features or verified badges.

---

## 4. Typography System

**Primary UI Font:** `Geist` (or `Inter`). Highly legible, geometric sans-serif for functional UI.
**Display Font:** `Playfair Display`. A high-contrast transitional serif that brings editorial elegance, tradition, and sophistication. 

### **Typographic Hierarchy**
* **Display XL:** Playfair Display, 72px, Regular, tight tracking (-2%). Use: Major marketing landing heroes.
* **Display Large:** Playfair Display, 60px, Regular. Use: Editorial page headers.
* **Display Medium:** Playfair Display, 48px, Regular. Use: Onboarding step titles.
* **Hero Title:** Geist, 36px, Medium, tight tracking (-1%). Use: Dashboard greetings.
* **Section Title:** Geist, 24px, Medium. Use: Grouping sections (e.g., "Preferences").
* **Card Title:** Geist, 18px, Medium. Use: Match names, article titles.
* **Body Large:** Geist, 18px, Regular, 160% line height. Use: Long-form bio text.
* **Body Base:** Geist, 16px, Regular, 150% line height. Use: Standard UI text.
* **Caption/Label:** Geist, 14px, Medium, uppercase with wide tracking (4%). Use: Overlines, tiny statuses.
* **Button Text:** Geist, 15px, Medium.

*Rules:* Never use Playfair Display for body text (it becomes illegible at small sizes). Never use bold weights for Playfair Display; rely on its inherent contrast.

---

## 5. Spacing System

Vivah uses a strict **8-point grid** to ensure a predictable vertical and horizontal rhythm. 
*A premium feel is achieved by using the larger spacing values generously.*

- **Space 1 (4px):** Micro-spacing (icon to text).
- **Space 2 (8px):** Tight UI groupings (input label to input field).
- **Space 3 (16px):** Standard component padding (inside buttons, list items).
- **Space 4 (24px):** Comfortable component padding (inside standard cards).
- **Space 5 (32px):** Loose component padding (inside feature cards, hero inputs).
- **Space 6 (48px):** Section internal flow (between a heading and a card grid).
- **Space 7 (64px):** Sub-section spacing (between distinct topic areas on a page).
- **Space 8 (96px+):** Major section spacing (between completely different narrative blocks).

**Widths:**
- **Reading Width:** Max 65 characters (approx. 640px) for optimal readability on biographies and text.
- **Container Width:** Max 1280px to prevent UI from stretching infinitely.

---

## 6. Elevation System

Shadows in a luxury brand are never harsh, dark, or artificial. We use layered, diffused shadows to simulate physical light.

- **Level 0 (Background):** Flat against the canvas.
- **Level 1 (Card):** No shadow. Instead, a 1px ultra-subtle border and a 2% luminance shift.
- **Level 2 (Dropdown/Popover):** Soft, diffused shadow. Simulates an object hovering 2 inches above the desk. 
- **Level 3 (Modal/Dialog):** Large, highly diffused shadow, combined with a page-wide scrim (dark overlay) that dims the background to 40% opacity with a heavy backdrop blur.
- **Level 4 (Toast/Floating Action):** Sharp, distinct shadow to immediately draw the eye over all other elements.

---

## 7. Motion System & Bible

Motion at Vivah is calm, deliberate, and physical. 
**Rule:** Animation must never feel bouncy, fast, or chaotic. It should feel like heavy, high-quality mechanisms smoothly gliding into place (like a luxury car door closing).

### **Physics Config (Springs)**
- **Standard Glide:** Stiffness: 100, Damping: 20 (Smooth, no bounce).
- **Snappy UI (Toggles):** Stiffness: 250, Damping: 25.

### **Animation Definitions**
- **Page Transitions:** Entire page fades in (0 to 1 opacity) over 400ms. No dramatic sliding.
- **Section Reveal (Scroll):** Elements fade in and slide up exactly 20px. Easing: `[0.22, 1, 0.36, 1]` over 600ms.
- **Button Hover:** Background color shifts over 200ms.
- **Button Press (Tap):** Button scales down to `0.97` instantly, and smoothly scales back to `1.0` on release.
- **Modal Opening:** Scrim fades in (300ms). Modal scales from `0.95` to `1.0` and fades in simultaneously (400ms).
- **Image Loading:** Images reveal via a slow crossfade from a solid muted token color (or blurred placeholder) over 800ms. Never jarring flashes.
- **Skeletons:** A slow, elegant shimmer moving left to right. Cycle takes 2 seconds.

*When NOT to animate:* Text content changes inside a data table, error message appearances (these should appear instantly to aid the user).

---

## 8. Grid & Layout System

- **Desktop (1024px+):** 12-column grid. Fluid margins. Dashboard utilizes a persistent left navigation (3 cols) and content area (9 cols).
- **Tablet (768px - 1023px):** 8-column grid. Navigation shifts to a collapsible sidebar or bottom bar.
- **Mobile (< 768px):** 4-column grid. 16px outer margins. Total focus on vertical scrolling and full-width cards. Profile views become immersive, full-screen vertical stacks.

---

## 9. Icon System

- **Weight:** Consistent 1.5px stroke. 2px feels too heavy/clunky; 1px is too fragile.
- **Filled States:** Icons are strictly outlined. The *only* exception is a state change (e.g., outlining a "Bookmark" icon, but filling it when saved).
- **Usage:** Icons must always be accompanied by a text label in primary navigation to ensure accessibility and clarity.

---

## 10. Border Radius System

To maintain geometric harmony:
- **Sharp (0px):** Strictly for edge-to-edge images on mobile.
- **Subtle (4px):** Badges, tiny tags, tooltips.
- **Standard (8px):** Buttons, inputs, standard cards, dropdown menus.
- **Soft (16px):** Large feature cards, modals, dialogs.
- **Pill (9999px):** Status indicators, floating action buttons.

---

## 11. Component Language

### **Buttons**
- **Default:** Solid background (Champagne Gold), Inverse Text. 
- **Hover:** Background shifts 5% lighter.
- **Active:** Scale down to 97%.
- **Disabled:** Muted background, muted text, no hover effect, `cursor-not-allowed`.

### **Inputs**
- **Default:** 1px subdued border, transparent background.
- **Focus:** Border transitions to Champagne Gold, subtle outer ring appears. Label remains legible.
- **Error:** Border transitions to Rose Red, error text appears below with an icon.

### **Cards (Profile Cards)**
- **Behavior:** The entire card is clickable, but specific actions (Like, Skip) take precedence.
- **Hover:** The image slowly scales up to `1.05` within its container (overflow hidden) over 600ms, creating a slow, cinematic zoom effect.

---

## 12. Glassmorphism Rules

Glass effects create a sense of depth and modernity but can destroy legibility if abused.
- **Opacity:** Background is typically 40%-60% opaque.
- **Blur:** Minimum `12px` backdrop blur to obscure text behind it effectively.
- **Border:** Must always have a `1px` solid border of `white/10` (or `black/5` in light mode) to define the edge of the glass.
- **When to use:** Sticky headers, modal overlays, floating action bars.
- **When NOT to use:** Body cards, inputs, standard buttons.

---

## 13. Imagery Style

Imagery dictates the emotional resonance of Vivah. 
- **Photography:** Editorial, candid, high contrast. Focus on connection, architectural backdrops, warm lighting (golden hour), and authentic human moments.
- **What to Avoid:** Cheesy stock photos, artificial studio lighting, holding hands in a field, bright neon colors.
- **Treatments:** All images should be passed through a subtle warming filter or have a 10% black overlay applied via CSS to ensure white text placed on top is always legible.

---

## 14. Accessibility

Luxury design is inclusive design.
- **Contrast Ratios:** All primary text must meet WCAG AAA (7:1). Secondary text must meet WCAG AA (4.5:1).
- **Focus Rings:** Keyboard navigation must reveal a sharp, highly visible 2px focus ring around active elements. 
- **Reduced Motion:** If the user's OS has `prefers-reduced-motion` enabled, all spring animations, page transitions, and hover scales are instantly disabled.
- **Touch Targets:** No clickable element on mobile will be smaller than `44x44px`.

---

## 15. Responsive Philosophy

Vivah does not merely "shrink" for mobile; it transforms.
- **Desktop:** Expansive, multi-column. Heavy use of hover states to reveal actions.
- **Tablet:** Focuses on touch targets. Hover states are converted to explicit action buttons.
- **Mobile:** Immersive. Bottom-sheet dialogs replace center-screen modals. Navigation moves to the bottom for thumb reachability. The design feels like a native iOS application.

---

## 16. Performance Guidelines

A slow app shatters the illusion of luxury.
- **Target:** 95+ Lighthouse Score. 60 FPS minimum for all animations.
- **Fonts:** Preload `Geist` and `Playfair Display`. Use `next/font` for zero layout shift (CLS).
- **Images:** All profile imagery must be optimized via `next/image` in WebP/AVIF formats, strictly sized, with `blurDataURL` placeholders.
- **Animations:** Only animate `transform` and `opacity`. Never animate `width`, `height`, or `margin` to prevent main-thread layout thrashing.

---

## 17. Design QA Checklist

Before any screen or feature is merged, it must satisfy this checklist:
- [ ] **Tokens Only:** Are all colors and spacings using semantic tokens instead of hardcoded values?
- [ ] **Hierarchy:** Does the typography properly lead the eye to the most important information?
- [ ] **Motion:** Do transitions feel deliberate and calm? Is there any unnecessary bouncing?
- [ ] **Accessibility:** Do all texts pass contrast checks? Can the feature be navigated via keyboard?
- [ ] **Responsiveness:** Does the UI feel native on mobile and expansive on desktop?
- [ ] **Consistency:** Are buttons, inputs, and borders utilizing the shared component primitives?
- [ ] **The "Premium Test":** Does this screen evoke trust, warmth, and exclusivity? If it feels cluttered, reduce it.
