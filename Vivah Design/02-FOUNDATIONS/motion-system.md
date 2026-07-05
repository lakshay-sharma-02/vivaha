# Motion System

> Motion exists to communicate. Never to entertain.

---

# Purpose

Motion is one of the most powerful communication tools in digital products.

In Vivah, motion should never attract attention to itself.

Instead, it should quietly guide users through the experience.

Good motion is rarely noticed.

Poor motion immediately feels distracting.

Every animation should improve understanding, reinforce trust, and create continuity.

---

# Philosophy

Vivah is inspired by architecture and hospitality.

Movement should feel like:

Morning sunlight entering a room.

A curtain moving gently in the breeze.

Leaves responding to wind.

A page turning in a book.

Someone opening a beautiful wooden door.

Motion should feel natural.

Never artificial.

---

# Motion Principles

Every animation must satisfy at least one of these purposes.

Guide attention.

Explain a change.

Confirm an action.

Reduce uncertainty.

Maintain continuity.

Provide feedback.

If an animation satisfies none of these,

it should not exist.

---

# Motion Personality

Vivah motion should always feel

Gentle.

Elegant.

Confident.

Patient.

Organic.

Warm.

Natural.

Never

Energetic.

Playful.

Aggressive.

Mechanical.

Flashy.

Over-designed.

---

# Motion Hierarchy

Motion should exist at four levels.

Ambient Motion

↓

Page Motion

↓

Component Motion

↓

Micro Interaction

Each level should become progressively smaller.

---

# Ambient Motion

Ambient motion creates atmosphere.

Examples

Leaves moving.

Natural light shifting.

Soft floating botanical elements.

Slow background gradients.

Very subtle particles.

Movement should remain almost subconscious.

Users should notice the atmosphere,

not the animation.

---

# Page Motion

Used only during page transitions.

Objectives

Maintain orientation.

Reduce abrupt changes.

Preserve continuity.

Recommended

Soft fade.

Gentle upward movement.

Small blur transitions.

Never

Large zooms.

Spins.

Rotations.

Slides across the screen.

---

# Component Motion

Components should respond naturally.

Examples

Cards.

Buttons.

Inputs.

Dropdowns.

Navigation.

Motion should communicate responsiveness.

Never excitement.

---

# Micro Interactions

Micro interactions create confidence.

Examples

Button pressed.

Checkbox selected.

Saved successfully.

Input focused.

Message sent.

Micro interactions should complete quickly.

They should reassure users.

Not celebrate.

---

# Timing

Short Feedback

100–150ms

Standard Interaction

180–250ms

Page Transition

300–450ms

Ambient Motion

8–20 seconds

Never use unnecessarily long animations.

Users should never wait for animation.

---

# Easing

Preferred

Ease Out

Ease In Out

Gentle Spring

Avoid

Bounce

Elastic

Overshoot

Sharp linear transitions

Motion should slow naturally.

Not mechanically.

---

# Scroll Behaviour

Scrolling should remain predictable.

Avoid

Parallax overload.

Scroll hijacking.

Horizontal scrolling.

Excessive transform effects.

Users control scrolling.

Not the website.

---

# Hover Behaviour

Hover indicates availability.

Not excitement.

Allowed

Soft elevation.

Small shadow.

Gentle colour transition.

Tiny scale (maximum 1.02).

Forbidden

Large scaling.

Rotation.

Bounce.

Glow.

Flash.

---

# Focus Behaviour

Focus should communicate accessibility.

Visible.

Calm.

High contrast.

Immediate.

Never animated dramatically.

---

# Loading States

Waiting should reduce anxiety.

Preferred

Skeleton screens.

Soft shimmer.

Progress indicators.

Status updates.

Avoid

Infinite spinners without explanation.

Loading should communicate progress.

---

# Success States

Success should feel reassuring.

Examples

Saved.

Interest sent.

Verification complete.

Animation should be subtle.

Never celebratory.

---

# Error States

Errors should communicate support.

Motion should gently draw attention.

Never shake violently.

Never flash.

Always explain the problem.

---

# Reduced Motion

Respect user accessibility preferences.

When reduced motion is enabled

Remove decorative animation.

Preserve essential feedback.

Replace movement with opacity changes where possible.

Accessibility always overrides visual design.

---

# Performance

Target

60 FPS.

Use GPU-friendly transforms.

Animate

Opacity.

Transform.

Scale.

Never animate

Width.

Height.

Top.

Left.

Box-shadow repeatedly.

Avoid expensive repaint operations.

---

# Frontend Implications

Motion should be implemented using Framer Motion where appropriate.

Avoid creating custom animation systems.

All motion should reference predefined timing and easing tokens.

---

# Implementation Notes

Motion should inherit from Motion Tokens.

Never define arbitrary durations.

Never define arbitrary easing.

Every animation should be reusable.

Motion belongs to the Design System.

Not individual components.

---

# AI Implementation Rules

When generating interfaces

Always ask

Why does this move?

If the answer is

"It looks cool"

Remove it.

Only animate to

Guide.

Explain.

Confirm.

Reassure.

Respect reduced-motion preferences.

Never invent additional animation styles.

---

# Review Checklist

□ Does this animation communicate something?

□ Does it reduce uncertainty?

□ Does it feel calm?

□ Is it accessible?

□ Is it performant?

□ Does it avoid distracting users?

□ Would the interface still work without it?

Only if every answer is "Yes"

should the animation remain.

---

*"The best animation is the one users never consciously notice.*

*They simply feel that everything behaves naturally."*

**Version 1.0**