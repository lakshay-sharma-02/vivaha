# Discover Blueprint

> The Discover page transforms curiosity into meaningful exploration.

---

# Reference Implementation

This page inherits all global specifications from

```
reference-implementation/

README.md

information-architecture.md

responsive.md

motion.md

accessibility.md

implementation.md
```

It also consumes

```
02-FOUNDATIONS/*

03-COMPONENTS/*
```

No behaviour should contradict those documents.

Only page-specific behaviour is defined here.

---

# Purpose

The Discover page exists to help users thoughtfully explore compatible people.

Its objective is not endless browsing.

Its objective is confident decision-making.

Users should leave this page thinking

"I'd like to know this person."

Never

"I've looked at hundreds of profiles."

---

# User Psychology

Users arrive with curiosity.

The page should guide them toward confidence.

```
Curiosity

↓

Exploration

↓

Understanding

↓

Confidence

↓

Action
```

---

# Information Architecture

```
Navigation

↓

Search

↓

Quick Filters

↓

Advanced Filters

↓

Recommendation Summary

↓

Profile Grid

↓

Pagination

↓

Footer
```

---

# Search

Reuse

```
03-COMPONENTS/search.md
```

No modifications.

---

# Filtering

Quick filters

Age

City

Religion

Education

Profession

Verification

Advanced filters open inside a Drawer.

Avoid overwhelming first-time users.

---

# Recommendation Summary

Display a short explanation.

Example

"We found people who closely match your preferences."

Never display

Compatibility %

Ranking Score

Algorithm Score

---

# Profile Grid

Reuse

```
03-COMPONENTS/profile-card.md
```

Desktop

3 columns

Tablet

2 columns

Mobile

1 column

Never infinite scroll.

Use pagination.

---

# Sorting

Recommended

Recently Active

Newest Profiles

Recently Verified

Distance

Never sort by popularity.

---

# Empty States

When no profiles match

Explain why.

Suggest relaxing filters.

Offer a reset button.

Never show an empty page.

---

# Loading

Reuse Skeleton components.

Do not use spinners for page loading.

---

# Performance

Server-render first page.

Virtualize only when required.

Optimize profile images.

Lazy load below the fold.

---

# Accessibility

Inherited from

reference-implementation/accessibility.md

---

# Motion

Inherited from

reference-implementation/motion.md

Only additional animation

Soft profile card reveal.

Nothing else.

---

# AI Implementation Rules

Always

Reuse Profile Cards.

Reuse Search.

Reuse Navigation.

Reuse Footer.

Never

Invent layouts.

Change spacing.

Duplicate components.

---

# Review Checklist

□ Is searching effortless?

□ Are filters understandable?

□ Are profiles easy to compare?

□ Does the page avoid endless scrolling?

□ Is pagination clear?

□ Is accessibility inherited?

□ Does the page encourage thoughtful discovery?

Only if every answer is "Yes"

should implementation begin.

---

*"People should leave Discover with fewer doubts.*

*Not with more options."*

**Version 1.0**