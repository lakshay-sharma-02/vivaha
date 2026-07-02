# Footer Component

> The Footer is not the end of a page. It is the final reassurance before a user leaves.

---

# Purpose

The Footer concludes the Vivaha experience gracefully.

It should never feel like an afterthought.

Instead, it reinforces trust,

answers remaining questions,

and provides clear paths forward.

After reaching the Footer,

users should feel

"In good hands."

---

# Philosophy

Imagine leaving the home of a gracious host.

They don't overwhelm you with information at the door.

They simply remind you

how to stay in touch,

where to find help,

and wish you well.

The Footer should create the same feeling.

---

# Emotional Objective

The Footer should communicate

Closure

↓

Trust

↓

Reliability

↓

Belonging

Never

Marketing

Urgency

Visual Noise

Sales Pressure

---

# Responsibilities

The Footer has only six responsibilities.

• Reinforce the brand.

• Help users navigate.

• Provide support.

• Build trust.

• Explain legal information.

• End the experience gracefully.

Everything else belongs elsewhere.

---

# Footer Architecture

Every Footer follows the same hierarchy.

```
Brand

↓

Navigation

↓

Trust

↓

Support

↓

Legal

↓

Copyright
```

Never change this structure.

---

# Brand Section

Contains

Logo

Short brand statement

Mission

Maximum

Two lines of text.

Do not repeat the Hero.

Simply reinforce why Vivaha exists.

Example

"Helping individuals and families build meaningful lifelong relationships through trust, privacy and thoughtful matchmaking."

---

# Navigation

Organize navigation into clear groups.

Examples

Platform

Discover

Membership

Verification

Safety

Company

About

Contact

Careers

Resources

Support

Help Centre

Privacy

Terms

Community Guidelines

Maximum

Five groups.

Avoid overwhelming users.

---

# Trust Section

Highlight the principles that define Vivaha.

Examples

Verified Profiles

Privacy First

Secure Communication

Family Friendly

Transparent Membership

No exaggerated claims.

No fake counters.

---

# Support Section

Support should always remain visible.

Include

Help Centre

Email

Phone (if available)

Support Hours

Users should never wonder how to get help.

---

# Legal Section

Include

Privacy Policy

Terms of Service

Cookie Policy

Refund Policy

Community Standards

Legal links should remain accessible,

never hidden.

---

# Social Links

Social links are optional.

If present,

they should communicate credibility,

not popularity.

Examples

LinkedIn

Instagram

YouTube

Avoid displaying follower counts.

---

# Newsletter

Vivaha should not aggressively collect emails.

If a newsletter exists,

position it as

Relationship advice.

Marriage guidance.

Product updates.

Never use manipulative copy.

---

# Visual Design

Background

Slightly darker than the page.

Warm neutral.

Typography

Comfortable contrast.

Generous spacing.

Minimal decoration.

The Footer should feel calm.

---

# Layout

Desktop

Multi-column.

Tablet

Reduced columns.

Mobile

Single-column.

Logical reading order.

Do not simply stack desktop layouts.

Design intentionally for smaller screens.

---

# Motion

Allowed

Link colour transitions.

Small underline.

Gentle opacity changes.

Forbidden

Animated backgrounds.

Moving logos.

Floating icons.

Parallax.

The Footer should feel stable.

---

# Accessibility

Support

Keyboard navigation.

Visible focus.

Screen readers.

Semantic footer element.

Readable contrast.

Logical heading hierarchy.

Large touch targets.

---

# Performance

No heavy JavaScript.

No autoplay media.

No unnecessary API requests.

Icons should be optimized.

Footer should never become a performance bottleneck.

---

# Responsive Behaviour

Desktop

Editorial layout.

Tablet

Balanced layout.

Mobile

Single-column hierarchy.

Maintain generous spacing across every device.

---

# Frontend API

```tsx
<Footer
  navigation={navigation}
  support={support}
  legal={legal}
/>
```

---

# File Structure

```
Footer/

Footer.tsx

FooterBrand.tsx

FooterNavigation.tsx

FooterSupport.tsx

FooterLegal.tsx

FooterSocial.tsx

FooterNewsletter.tsx

index.ts
```

---

# Token Consumption

Consume

Color Tokens

Typography Tokens

Spacing Tokens

Surface Tokens

Motion Tokens

Shadow Tokens

Radius Tokens

Never introduce local values.

---

# Common Mistakes

Never

Overload the Footer.

Repeat navigation unnecessarily.

Display advertisements.

Use large animations.

Hide legal information.

Use bright colours.

Treat the Footer as unused space.

---

# AI Implementation Rules

Always

Maintain hierarchy.

Keep the Footer calm.

Support accessibility.

Consume Design Tokens.

Use semantic HTML.

Never

Invent layouts.

Hardcode values.

Use marketing banners.

Distract users at the end of the journey.

---

# Review Checklist

□ Does the Footer reinforce trust?

□ Is navigation organized?

□ Is support easy to find?

□ Are legal links accessible?

□ Is the layout responsive?

□ Does it remain visually calm?

□ Is accessibility complete?

□ Does it provide a graceful ending?

Only if every answer is "Yes" should the Footer be approved.

---

*"The final impression is often remembered the longest.*

*Vivaha should end every journey with the same care with which it begins."*

**Version 1.0**