# Design Tokens

> Design Tokens are the single source of truth for every visual decision in Vivaha.

---

# Purpose

Design Tokens translate the Vivaha Design System into implementation.

Every color.

Every spacing value.

Every radius.

Every shadow.

Every typography size.

Every animation.

Every breakpoint.

Should originate from Design Tokens.

Components never define their own values.

Pages never define their own values.

Everything references tokens.

---

# Philosophy

The Design System defines principles.

Design Tokens implement them.

Changing a token should improve the entire product.

Never modify individual components when a token should be updated.

One source.

Infinite consistency.

---

# Token Hierarchy

```
Foundation Tokens

↓

Semantic Tokens

↓

Component Tokens

↓

Runtime Values
```

Foundation Tokens never know about components.

Components consume semantic tokens.

---

# Foundation Tokens

Foundation Tokens describe physical values.

Examples

Color

Spacing

Radius

Shadow

Typography

Motion

Opacity

Breakpoint

Z-Index

These tokens never reference UI elements.

---

# Semantic Tokens

Semantic Tokens describe intention.

Examples

Primary Background

Primary Text

Secondary Text

Card Background

Surface Border

Button Primary

Success

Error

Warning

Information

They should describe meaning.

Not appearance.

---

# Component Tokens

Components consume semantic tokens.

Example

Primary Button

Background

↓

color.primary

Padding

↓

spacing.md

Radius

↓

radius.md

Shadow

↓

surface.low

Never hardcode values inside components.

---

# Naming Convention

Use predictable names.

Good

```
color.primary

color.text.primary

spacing.8

radius.md

shadow.medium

motion.fast

font.heading

z.overlay
```

Avoid

```
blue1

bigShadow

mainSpace

buttonColor

goldThing

headerSpacing
```

Tokens describe systems.

Not individual designs.

---

# Color Tokens

Foundation

```
color.neutral.0

color.neutral.50

color.neutral.100

...

color.primary.500

color.primary.600

color.success

color.warning

color.error

color.info
```

Semantic

```
color.background

color.surface

color.surface.secondary

color.text.primary

color.text.secondary

color.border

color.action.primary

color.action.secondary
```

---

# Typography Tokens

```
font.family.display

font.family.body

font.size.xs

font.size.sm

font.size.md

font.size.lg

font.size.xl

font.weight.regular

font.weight.medium

font.weight.semibold

font.weight.bold

font.line.body

font.line.heading

font.letter.tight
```

Typography should scale through tokens only.

---

# Spacing Tokens

```
spacing.0

spacing.1

spacing.2

spacing.3

spacing.4

spacing.6

spacing.8

spacing.10

spacing.12

spacing.16

spacing.20

spacing.24

spacing.32

spacing.40
```

Never invent spacing.

---

# Radius Tokens

```
radius.none

radius.sm

radius.md

radius.lg

radius.xl

radius.full
```

Every component inherits from these values.

---

# Shadow Tokens

```
shadow.none

shadow.low

shadow.medium

shadow.high
```

Only four levels.

No additional shadows.

---

# Motion Tokens

```
motion.instant

motion.fast

motion.normal

motion.slow

motion.ambient
```

Easing

```
motion.ease.standard

motion.ease.enter

motion.ease.exit

motion.ease.emphasized
```

---

# Opacity Tokens

```
opacity.disabled

opacity.hover

opacity.overlay

opacity.backdrop
```

Never use arbitrary opacity values.

---

# Breakpoint Tokens

```
screen.mobile

screen.tablet

screen.laptop

screen.desktop

screen.wide
```

All responsive behaviour should reference these.

---

# Z-Index Tokens

```
z.base

z.dropdown

z.sticky

z.overlay

z.modal

z.toast

z.tooltip
```

Never use arbitrary z-index values.

---

# Container Tokens

```
container.sm

container.md

container.lg

container.xl

container.max
```

Page architecture depends on these.

---

# Component Consumption

Example

```
Button

↓

color.action.primary

↓

spacing.4

↓

radius.md

↓

shadow.low

↓

motion.fast
```

Components never know actual values.

Only token names.

---

# Token Governance

Every new token must answer

Why does this token exist?

Can an existing token solve this?

Will this improve consistency?

If not,

do not create the token.

---

# Versioning

Breaking changes require

Major Version

New semantic aliases require

Minor Version

Internal implementation improvements require

Patch Version

Tokens should remain stable.

---

# Accessibility

Accessibility should never depend on individual components.

Accessibility should be guaranteed by token values.

Contrast.

Spacing.

Typography.

Motion.

Should all satisfy accessibility requirements.

---

# Performance

Tokens should be implemented using

CSS Variables

Tailwind Theme

TypeScript Constants

Never duplicate values.

---

# Frontend Implementation

Recommended structure

```
tokens/

colors.ts

spacing.ts

typography.ts

motion.ts

radius.ts

shadow.ts

breakpoints.ts

z-index.ts

index.ts
```

All UI imports from this directory.

---

# AI Implementation Rules

Never invent token values.

Never hardcode visual properties.

Always consume existing tokens.

If a required token does not exist,

propose adding it to the Design System before implementation.

Maintain one source of truth.

---

# Review Checklist

□ Does every component consume tokens?

□ Are values centralized?

□ Are semantic names used?

□ Is accessibility preserved?

□ Are duplicate values removed?

□ Would changing one token update the entire interface?

Only if every answer is "Yes" should the token system be approved.

---

*"A mature design system is measured not by the number of components it has, but by the number of values it does not duplicate."*

**Version 1.0**