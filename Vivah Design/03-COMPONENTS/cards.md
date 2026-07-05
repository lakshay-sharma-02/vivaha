# Card System

> Cards are architectural containers. They organize information, establish hierarchy, and create moments of focus without becoming the focus themselves.

---

# Purpose

Cards group related information into meaningful units.

A card should never exist because "every website has cards."

It exists only when grouping information improves understanding.

Every card should answer one question.

"What belongs together?"

If there is no clear answer,

the card should not exist.

---

# Philosophy

Imagine walking through a modern home.

Every room has walls,

not to separate people,

but to organize experiences.

Cards serve the same purpose.

They create structure,

not separation.

---

# Emotional Objective

Every card should communicate

Clarity

↓

Comfort

↓

Order

↓

Trust

Never

Visual noise

Decoration

Complexity

Competition

---

# Principles

Cards should

Organize information.

Improve readability.

Create hierarchy.

Support interaction.

Respect whitespace.

Never become decorative objects.

---

# Card Hierarchy

Vivah contains four card types.

```
Informational Card

↓

Interactive Card

↓

Profile Card

↓

Feature Card
```

Each exists for a different purpose.

Never mix responsibilities.

---

# Informational Card

Purpose

Display information.

Examples

Membership Benefits

Verification Steps

Support Articles

Announcements

Interaction should be optional.

---

# Interactive Card

Purpose

Encourage an action.

Examples

Saved Searches

Recommendations

Notifications

Membership Upgrade

Cards remain calm.

Not promotional.

---

# Profile Card

Defined separately in

profile-card.md

Never duplicate those specifications.

---

# Feature Card

Purpose

Explain platform capabilities.

Examples

Verification

Privacy

Family Profiles

Secure Messaging

Maximum

One idea per card.

---

# Card Anatomy

Every card follows the same structure.

```
Container

↓

Header

↓

Content

↓

Optional Divider

↓

Actions
```

Never rearrange this hierarchy.

---

# Container

The container defines

Spacing

Surface

Radius

Elevation

Nothing else.

The container should disappear behind the content.

---

# Header

Contains

Title

Optional Icon

Optional Badge

Headers should remain concise.

Maximum

Two lines.

---

# Content

Content communicates the message.

Typography should dominate.

Not graphics.

Use

Text

Illustrations

Photography

Charts only when necessary.

---

# Actions

Cards should contain

Zero

or

One

primary action.

Avoid multiple competing actions.

---

# Elevation

Cards consume Surface Tokens.

Default

Surface Level 2

Hover

Surface Level 3

Never create floating cards.

---

# Borders

Cards may use

Subtle border

or

Subtle shadow

Never both aggressively.

Restraint communicates quality.

---

# Radius

Consume Radius Tokens.

Never define custom values.

All cards should belong to the same visual family.

---

# Internal Spacing

Internal spacing follows

Spacing Tokens only.

Maintain

Consistent padding.

Consistent vertical rhythm.

Never compress information.

---

# Images

Images support content.

Never dominate content.

Aspect ratios remain consistent.

Avoid unpredictable image heights.

---

# Icons

Icons clarify meaning.

Not decoration.

Maximum

One primary icon.

Avoid icon overload.

---

# Badges

Badges communicate status.

Examples

Verified

Premium

New

Recommended

Never use badges for decoration.

---

# Hover Behaviour

Allowed

Soft elevation.

Tiny shadow change.

Subtle border emphasis.

Very small scale (maximum 1.01).

Forbidden

Bounce.

Glow.

Rotation.

Large transforms.

---

# Motion

Cards should transition gently.

Allowed

Opacity.

Elevation.

Shadow.

Small transform.

Forbidden

Flip.

3D.

Slide-in content.

Animated borders.

---

# Responsive Behaviour

Desktop

Generous spacing.

Tablet

Balanced density.

Mobile

Single-column layouts where appropriate.

Never reduce readability.

---

# Empty Cards

If content is unavailable,

replace with

Skeleton.

Placeholder.

Helpful empty state.

Never show empty containers.

---

# Accessibility

Cards must support

Keyboard navigation.

Logical reading order.

Screen readers.

Visible focus.

Interactive cards should expose proper roles.

---

# Performance

Lazy load media.

Avoid nested shadows.

Use CSS transforms.

Minimize layout shifts.

Cards should remain lightweight.

---

# Frontend API

```tsx
<Card
  variant="interactive"
  elevation="medium"
>
  ...
</Card>
```

Supported variants

```
information

interactive

feature

profile
```

---

# File Structure

```
Card/

Card.tsx

CardHeader.tsx

CardContent.tsx

CardFooter.tsx

CardSkeleton.tsx

Card.types.ts

index.ts
```

---

# Token Consumption

Consume

Surface Tokens

Spacing Tokens

Typography Tokens

Radius Tokens

Shadow Tokens

Color Tokens

Motion Tokens

Never hardcode design values.

---

# Common Mistakes

Never

Overfill cards.

Create unnecessary borders.

Mix unrelated information.

Use decorative shadows.

Use multiple primary actions.

Create inconsistent heights without purpose.

Treat cards as decorative boxes.

---

# AI Implementation Rules

Always

Use consistent spacing.

Consume Design Tokens.

Maintain hierarchy.

Support accessibility.

Use one purpose per card.

Never

Invent card variants.

Hardcode spacing.

Ignore surface hierarchy.

Create decorative layouts.

---

# Review Checklist

□ Does the card have one clear purpose?

□ Is information easy to scan?

□ Is whitespace generous?

□ Is hierarchy obvious?

□ Is elevation subtle?

□ Does the card feel consistent?

□ Does it remain accessible?

□ Would removing the card reduce clarity?

Only if every answer is "Yes" should the card be approved.

---

*"A card should frame information, never compete with it.*

*Users should remember what was inside the card—not the card itself."*

**Version 1.0**