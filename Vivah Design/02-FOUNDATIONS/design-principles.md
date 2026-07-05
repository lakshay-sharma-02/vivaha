# Design Principles

> The fundamental principles that govern every frontend design decision in Vivah.

---

# Purpose

The Design Principles translate the Constitution and UX Research into practical frontend design decisions.

They answer one question:

> "How should Vivah look, behave and communicate?"

Unlike the Constitution, these principles directly influence layouts, typography, components, spacing, motion and interaction.

Every page must satisfy these principles.

Every component must satisfy these principles.

---

# Principle 01

# Design For Trust Before Beauty

Visual beauty attracts attention.

Trust earns commitment.

Whenever beauty and trust compete,

trust wins.

A trustworthy interface is always beautiful.

---

# Principle 02

# Every Screen Has One Emotional Goal

Every screen should create exactly one dominant emotion.

Examples

Homepage

↓

Comfort

Discover

↓

Curiosity

Profile

↓

Confidence

Verification

↓

Security

Messaging

↓

Connection

Settings

↓

Control

Never attempt to communicate multiple emotions equally.

---

# Principle 03

# Every Viewport Has One Primary Action

Every visible screen should answer

"What should the user do next?"

One viewport.

One action.

Never force users to choose between multiple equally important actions.

---

# Principle 04

# Remove Before Adding

When a screen feels crowded,

remove elements before introducing new ones.

Whitespace is a solution.

Not empty space.

---

# Principle 05

# Information Has Hierarchy

Users should understand a screen in this order.

```
Purpose

↓

Headline

↓

Supporting Information

↓

Primary Action

↓

Secondary Information

↓

Decoration
```

Decoration always comes last.

---

# Principle 06

# Components Earn Their Place

Every component should justify its existence.

Ask

What purpose does this solve?

If the answer is unclear,

remove it.

---

# Principle 07

# Motion Explains

Motion exists only to

Guide

Teach

Confirm

Connect

Never animate simply because movement is possible.

---

# Principle 08

# Interfaces Should Breathe

Crowded interfaces reduce confidence.

Every layout should contain generous breathing room.

Spacing is communication.

Not decoration.

---

# Principle 09

# Typography Creates Structure

Typography communicates importance.

Not colour.

Not animation.

Not decoration.

Users should understand hierarchy even without colour.

---

# Principle 10

# Images Support Content

Photography should reinforce meaning.

Never replace it.

Users should understand every screen without depending entirely on imagery.

---

# Principle 11

# Users Should Never Feel Lost

Every page should immediately answer

Where am I?

What can I do?

What happens next?

Navigation should remain predictable.

---

# Principle 12

# Progressive Disclosure

Never show everything immediately.

Reveal complexity gradually.

Examples

Profile Preview

↓

About

↓

Lifestyle

↓

Family

↓

Compatibility

↓

Conversation

Understanding grows naturally.

---

# Principle 13

# Calm Beats Excitement

Vivah is not entertainment.

Avoid interfaces that seek attention.

Create interfaces that create confidence.

---

# Principle 14

# Consistency Creates Confidence

Buttons.

Spacing.

Typography.

Cards.

Navigation.

Everything should behave consistently.

Users should never relearn the interface.

---

# Principle 15

# Accessibility Improves Everyone's Experience

Accessibility is not for edge cases.

Readable typography.

Large touch targets.

Keyboard navigation.

Reduced motion.

Clear contrast.

These improve usability for everyone.

---

# Principle 16

# Performance Is Part Of Design

Animations.

Images.

Fonts.

Scripts.

Everything contributes to perceived quality.

Fast experiences communicate competence.

---

# Principle 17

# Design For Real Life

Users may

Receive calls.

Lose internet.

Pause onboarding.

Return days later.

Use old phones.

Use bright sunlight.

Use the platform with family.

Design should embrace reality.

---

# Principle 18

# Empty States Should Create Hope

Empty states should never punish.

Instead of

"No Results"

Prefer

"We'll help you discover meaningful connections."

Every empty state should encourage progress.

---

# Principle 19

# Success Should Feel Quiet

Users expect software to work.

Celebrate softly.

A small confirmation.

A gentle animation.

A reassuring message.

Avoid spectacle.

---

# Principle 20

# Timelessness Over Trends

Every design decision should answer

"Will this still feel correct five years from now?"

If uncertain,

simplify.

Timeless interfaces age gracefully.

---

# Frontend Design Implications

These principles influence

Layout

Spacing

Typography

Components

Navigation

Animation

Forms

Cards

Photography

Illustration

Every frontend decision should trace back to one or more principles.

---

# Implementation Notes

Every component specification should reference the relevant principles.

When introducing new UI patterns,

ensure they strengthen the Design System rather than fragment it.

These principles guide implementation but should not replace engineering best practices.

---

# AI Implementation Rules

When generating frontend code,

always ask

• What is the primary action?

• What is the emotional objective?

• Does the layout reduce cognitive load?

• Does every component have a purpose?

Prefer simpler layouts over visually impressive ones.

Respect whitespace.

Maintain consistency.

Never invent new interaction patterns without updating the Design System.

---

# Review Checklist

□ Does the screen have one emotional objective?

□ Does every viewport have one primary action?

□ Is visual hierarchy obvious?

□ Is unnecessary complexity removed?

□ Does spacing improve readability?

□ Is the interface accessible?

□ Does the page feel calm?

□ Is the experience performant?

□ Would this still feel modern in five years?

Only if every answer is "Yes"

should implementation continue.

---

*"The best interface is not the one with the most features.*

*It is the one that makes the user feel the most confident."*

**Version 1.0**