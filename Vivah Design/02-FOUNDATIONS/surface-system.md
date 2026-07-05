# Surface System

> Every visible element in Vivah exists on a surface. Surfaces define depth, hierarchy, comfort, and interaction without relying on excessive decoration.

---

# Purpose

Surfaces create visual hierarchy.

They separate information.

They guide attention.

They communicate interaction.

Unlike shadows or borders alone, surfaces are the complete combination of

Background

Elevation

Border

Radius

Shadow

Texture

Opacity

Every component inherits from this system.

---

# Philosophy

Vivah is inspired by architecture.

Architecture creates depth through

Light

Material

Distance

Layering

Vivah follows the same principle.

Depth should feel natural.

Never exaggerated.

---

# Surface Hierarchy

Vivah contains five surface levels.

```

Level 0

Application Canvas

↓

Level 1

Section Surface

↓

Level 2

Card Surface

↓

Level 3

Interactive Surface

↓

Level 4

Overlay Surface

```

Every surface belongs to exactly one level.

---

# Level 0

## Application Canvas

Purpose

Entire application background.

Characteristics

Warm.

Soft.

Quiet.

Invisible.

The canvas should never compete with content.

---

# Level 1

## Section Surface

Purpose

Group related content.

Examples

Homepage Sections.

Profile Sections.

Dashboard Areas.

Characteristics

Very subtle separation.

Minimal elevation.

Large breathing room.

---

# Level 2

## Card Surface

Purpose

Present individual pieces of information.

Examples

Profile Cards.

Story Cards.

Search Results.

Notifications.

Characteristics

Clear boundary.

Soft radius.

Subtle shadow.

Readable spacing.

Cards should feel approachable.

Never floating.

---

# Level 3

## Interactive Surface

Purpose

Elements users directly interact with.

Examples

Inputs.

Dropdowns.

Buttons.

Search.

Selectors.

Characteristics

Higher contrast.

Clear focus.

Immediate feedback.

Accessibility first.

---

# Level 4

## Overlay Surface

Purpose

Temporary experiences.

Examples

Dialogs.

Modals.

Drawers.

Menus.

Date Pickers.

Characteristics

Highest elevation.

Soft shadow.

Clear separation.

Never dramatic.

---

# Borders

Borders communicate structure.

Never decoration.

Border usage

Inputs

Cards

Tables

Dropdowns

Avoid decorative borders.

---

# Border Thickness

Standard

1px

Strong

2px

Never exceed 2px.

---

# Corner Radius

Vivah prefers soft geometry.

Small Components

10px

Cards

16px

Large Containers

24px

Hero Elements

32px

Never use fully circular cards.

---

# Shadows

Shadows communicate depth.

Never luxury.

Never drama.

Three levels only.

Low

Cards.

Medium

Dropdowns.

High

Modals.

Shadows should be

Large

Soft

Low opacity

Natural

Avoid harsh shadows.

---

# Blur

Blur is used only when supporting hierarchy.

Allowed

Overlay Backdrops.

Drawers.

Dialogs.

Forbidden

Cards.

Buttons.

Inputs.

Navigation.

Blur should remain subtle.

---

# Transparency

Transparency should communicate layering.

Never style.

Opacity should remain high enough to preserve readability.

---

# Surface Transitions

Moving between surfaces should feel effortless.

Elevation increases gradually.

Never suddenly.

---

# Hover Behaviour

Hover should communicate readiness.

Not excitement.

Allowed

Small elevation.

Border emphasis.

Soft shadow.

Tiny colour shift.

Forbidden

Bounce.

Glow.

Large scaling.

Rotation.

---

# Focus Behaviour

Keyboard focus always overrides hover.

Focus indicators must remain clearly visible.

Never remove browser accessibility without replacement.

---

# Surface Consistency

Cards.

Dialogs.

Forms.

Dropdowns.

Menus.

Should all feel like members of the same family.

---

# Responsive Behaviour

Surface hierarchy never changes.

Only spacing adapts.

Users should immediately recognise familiar layers across every device.

---

# Accessibility

Borders alone should never communicate state.

Use

Colour.

Icons.

Labels.

Focus.

ARIA.

Maintain contrast.

Support reduced transparency when required.

---

# Performance

Avoid excessive blur.

Avoid multiple layered shadows.

Prefer simple CSS properties.

Minimise paint cost.

Surfaces should remain GPU friendly.

---

# Implementation Notes

Surfaces consume

Color Tokens

Spacing Tokens

Radius Tokens

Shadow Tokens

Never define local values inside components.

Everything inherits from the Design Tokens.

---

# AI Implementation Rules

Never invent new elevations.

Never invent new radius values.

Never introduce decorative effects.

Always map surfaces to predefined levels.

Respect hierarchy before aesthetics.

---

# Review Checklist

□ Does the surface belong to the correct layer?

□ Is elevation subtle?

□ Are shadows consistent?

□ Is the border necessary?

□ Is interaction obvious?

□ Does the surface remain accessible?

□ Does it feel architectural?

Only if every answer is "Yes" should the surface be approved.

---

*"Depth should quietly organise information.*

*It should never demand attention."*

**Version 1.0**