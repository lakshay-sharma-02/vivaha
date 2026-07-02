# Button Component

> Buttons are commitments. Every click should feel intentional.

---

# Purpose

Buttons represent the user's intention to move forward.

They are not decorative elements.

They communicate confidence, clarity, and progress.

Every button should answer one question:

"What happens when I click this?"

If the answer is unclear,

the button has failed.

---

# Philosophy

Buttons should feel like someone politely opening a door for you.

Never like someone pushing you through it.

Vivaha never pressures users.

Buttons invite.

They never demand.

---

# Emotional Objective

Every button should communicate

Confidence

↓

Safety

↓

Progress

↓

Completion

Never

Pressure

Urgency

Aggression

Marketing

---

# Design Principles

Buttons should

Feel tappable.

Be highly readable.

Remain accessible.

Use consistent sizing.

Respect whitespace.

Support keyboard navigation.

Never rely on colour alone.

---

# Button Hierarchy

Vivaha contains six button variants.

```
Primary

↓

Secondary

↓

Ghost

↓

Text

↓

Premium

↓

Danger
```

Each variant has one responsibility.

---

# Primary Button

Purpose

Represents the single most important action on a screen.

Examples

Create Profile

Send Interest

Continue

Save Changes

Rules

Only one primary button per viewport.

Never place two competing primary buttons together.

---

# Secondary Button

Purpose

Supporting actions.

Examples

Learn More

Back

Cancel

View Details

Secondary buttons should never visually compete with the primary button.

---

# Ghost Button

Purpose

Low-emphasis actions.

Examples

Skip

Dismiss

Maybe Later

Should remain subtle.

---

# Text Button

Purpose

Navigation and lightweight actions.

Examples

View All

Read More

Edit

Never use for destructive actions.

---

# Premium Button

Purpose

Membership upgrades.

Premium features.

Exclusive actions.

Rules

Use sparingly.

Should communicate refinement.

Never use gradients outside the Premium variant.

---

# Danger Button

Purpose

Destructive actions.

Examples

Delete Account.

Remove Photo.

Block User.

Always require confirmation before executing destructive actions.

---

# Button Sizes

Small

Compact interface actions.

Medium

Default.

Large

Primary CTAs.

Extra Large

Hero CTA only.

Never invent custom sizes.

---

# Width

Buttons should size according to context.

Inline

Content width.

Forms

Content width unless primary action.

Hero

Fixed comfortable width.

Never stretch buttons unnecessarily.

---

# Padding

Horizontal padding should exceed vertical padding.

Buttons should feel comfortable to tap.

Not oversized.

---

# Radius

All buttons consume Radius Tokens.

Never define custom radius values.

Buttons should visually belong to the Surface System.

---

# Typography

Title Case.

Medium weight.

Body typeface.

Never

ALL CAPS.

Decorative fonts.

Condensed typography.

Typography should remain readable at every size.

---

# Icons

Icons support meaning.

Never replace text.

Preferred

Arrow

Search

Check

Edit

Download

Avoid excessive icon usage.

Maximum one icon per side.

---

# States

Every button supports

Default

Hover

Focus

Pressed

Loading

Disabled

Success (optional)

Error (optional)

Every state must be visually distinct.

---

# Hover

Hover communicates readiness.

Allowed

Slight elevation.

Soft colour transition.

Tiny shadow adjustment.

Forbidden

Bounce.

Glow.

Large scaling.

Rotation.

---

# Focus

Focus is mandatory.

Visible.

High contrast.

Keyboard friendly.

Never remove focus rings.

Replace them only with an equally accessible alternative.

---

# Loading

Loading communicates progress.

Use

Spinner.

Progress indicator.

Loading label.

Disable repeated clicks.

Never leave users uncertain.

---

# Disabled

Disabled buttons should remain readable.

Never reduce opacity so much that labels become difficult to read.

Users should understand why an action is unavailable.

Where possible,

provide explanation.

---

# Success

Success should communicate reassurance.

Examples

Saved.

Interest Sent.

Verification Complete.

Prefer icon and label changes over dramatic animation.

---

# Motion

Button animations should complete quickly.

Use Motion Tokens.

No bounce.

No elastic.

No exaggerated scaling.

Every interaction should feel calm.

---

# Accessibility

Minimum touch target

44 × 44 px.

Support

Keyboard.

Screen readers.

Focus order.

Contrast.

ARIA labels.

Buttons must remain usable without colour perception.

---

# Performance

Avoid JavaScript for simple hover effects.

Use CSS transitions whenever practical.

Keep animations GPU-friendly.

Avoid unnecessary re-renders.

---

# Frontend API

Recommended React API

```tsx
<Button
  variant="primary"
  size="lg"
  loading={false}
  disabled={false}
  leftIcon={<ArrowRight />}
>
  Create Profile
</Button>
```

Supported variants

```
primary

secondary

ghost

text

premium

danger
```

Supported sizes

```
sm

md

lg

xl
```

---

# File Structure

```
Button/

Button.tsx

Button.styles.ts

Button.types.ts

Button.test.tsx

index.ts
```

---

# Token Consumption

Buttons consume

Color Tokens

Typography Tokens

Spacing Tokens

Radius Tokens

Shadow Tokens

Motion Tokens

Never define local design values.

---

# Common Mistakes

Do not

Use two primary buttons together.

Invent new button colours.

Create custom sizes.

Use gradients outside Premium.

Animate excessively.

Use icon-only buttons without accessible labels.

Use vague labels like

Submit

Click Here

Continue

Prefer explicit actions.

---

# AI Implementation Rules

Always

Use the approved variants.

Consume design tokens.

Respect accessibility.

Provide loading states.

Support keyboard navigation.

Never

Invent new variants.

Hardcode values.

Use multiple primary buttons.

Ignore disabled or loading states.

---

# Review Checklist

□ Is there only one primary button in the viewport?

□ Is the action immediately understandable?

□ Is the button accessible?

□ Are all interaction states implemented?

□ Are tokens consumed?

□ Does motion remain subtle?

□ Does the button communicate confidence?

□ Would users immediately understand what happens after clicking?

Only if every answer is "Yes" should the button be approved.

---

*"A button is not an invitation to click.*

*It is a promise about what happens next."*

**Version 1.0**