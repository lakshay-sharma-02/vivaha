# Navigation Bar

> Navigation is not a menu. It is the user's anchor throughout the Vivah experience.

---

# Purpose

The Navigation Bar establishes orientation.

It should immediately answer

Where am I?

What can I do?

How do I return?

Users should never think about navigation.

It should feel invisible.

---

# Philosophy

Imagine entering a beautiful home.

You instinctively know

where the entrance is,

where the living room is,

where to continue.

Nobody places giant signboards everywhere.

Architecture guides naturally.

The Navigation Bar should behave the same way.

---

# Emotional Objective

The Navigation should communicate

Stability

↓

Confidence

↓

Control

↓

Comfort

Never

Urgency

Excitement

Marketing

Distraction

---

# Responsibilities

The Navigation has only five responsibilities.

• Brand Identity

• Primary Navigation

• Search Entry

• User Account

• Primary Call To Action

Everything else belongs somewhere else.

---

# Structure

Desktop

```
Logo

↓

Primary Navigation

↓

Search

↓

User Actions

↓

Primary CTA
```

---

Mobile

```
Logo

↓

Primary Action

↓

Menu

```

Navigation should never become crowded.

---

# Logo

The logo should always remain visible.

It is the user's home button.

It should never animate excessively.

Hover behaviour should remain subtle.

---

# Navigation Items

Maximum

5 primary destinations.

Recommended

Home

Discover

Messages

Membership

Profile

Avoid adding unnecessary items.

Complexity belongs inside pages.

Not inside navigation.

---

# Primary CTA

Only one.

Examples

Create Profile

Complete Profile

Upgrade Membership

The CTA should adapt to user state.

Never show multiple competing actions.

---

# Search

Search should remain immediately accessible.

Do not dominate the navigation.

Desktop

Inline.

Mobile

Accessible through a dedicated action.

---

# User Area

Contains

Avatar

Notifications

Settings

Logout

Dropdowns should remain minimal.

---

# Sticky Behaviour

Navigation should remain visible.

When scrolling

Reduce height slightly.

Increase background opacity.

Maintain readability.

Never dramatically change appearance.

---

# Visual Style

The Navigation should feel

Light.

Architectural.

Refined.

Background

Soft ivory.

Warm blur when required.

Thin bottom border.

Minimal shadow.

Never heavy.

---

# Active State

Active navigation should communicate

Location.

Not excitement.

Use

Typography.

Primary colour.

Small underline or indicator.

Avoid

Large pills.

Heavy backgrounds.

Aggressive highlights.

---

# Hover State

Hover should indicate

Availability.

Never celebration.

Allowed

Soft colour transition.

Tiny underline.

Small opacity adjustment.

Forbidden

Scaling.

Bounce.

Glow.

Rotation.

---

# Dropdown Behaviour

Dropdowns should appear

Immediately.

Soft fade.

Small elevation.

Keyboard accessible.

Dismiss naturally.

Never require precise mouse movement.

---

# Responsive Behaviour

Desktop

Full navigation.

Tablet

Reduced spacing.

Mobile

Compact menu.

Never hide essential actions.

Only reorganise them.

---

# Accessibility

Support

Keyboard navigation.

Tab order.

Escape key.

ARIA labels.

Visible focus states.

Screen readers.

Navigation landmarks.

Accessibility is mandatory.

---

# Performance

Navigation loads immediately.

No layout shift.

Minimal JavaScript.

Avoid unnecessary re-renders.

Navigation should remain responsive on low-end devices.

---

# Frontend Implementation

Recommended structure

```
Navbar/

Navbar.tsx

Logo.tsx

DesktopNav.tsx

MobileNav.tsx

SearchButton.tsx

UserMenu.tsx

Notifications.tsx

CTAButton.tsx

index.ts
```

Consume

Color Tokens

Spacing Tokens

Typography Tokens

Motion Tokens

Surface Tokens

Never hardcode values.

---

# AI Implementation Rules

Always include

Logo

Primary Navigation

Primary CTA

User Menu

Responsive behaviour

Accessibility support

Never include

Mega menus.

Animated backgrounds.

Multiple CTAs.

Marketing banners.

Auto-expanding navigation.

Navigation should remain quiet.

---

# Review Checklist

□ Can users immediately understand where they are?

□ Is there only one primary CTA?

□ Is the navigation uncluttered?

□ Does it remain accessible?

□ Does it remain responsive?

□ Is motion subtle?

□ Does it feel architectural?

□ Would users stop noticing it after a few minutes?

Only if every answer is "Yes" should the Navigation Bar be approved.

---

*"The best navigation is the one users never have to think about."*

**Version 1.0**