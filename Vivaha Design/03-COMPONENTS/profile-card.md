# Profile Card

> The Profile Card is the digital first impression of a person. It should communicate authenticity before attractiveness.

---

# Purpose

The Profile Card introduces a person.

Not a profile.

Not statistics.

Not an algorithm.

A person.

It should encourage thoughtful exploration rather than rapid judgement.

Users should leave a Profile Card thinking

"I'd like to know more."

Not

"Next."

---

# Philosophy

Most matrimonial platforms treat profile cards as data tables.

Most dating platforms treat profile cards as advertisements.

Vivaha treats profile cards as introductions.

Imagine someone introducing a family member with care.

That is how the card should behave.

---

# Emotional Objective

Every Profile Card should create

Curiosity

↓

Comfort

↓

Trust

↓

Conversation

Never

Comparison

Competition

Urgency

Gamification

---

# Core Principles

The card should communicate

Identity.

Character.

Authenticity.

Respect.

Never

Popularity.

Status.

Luxury.

Perfection.

---

# Card Structure

Every Profile Card follows the same structure.

```
Photography

↓

Verification

↓

Basic Identity

↓

Lifestyle Summary

↓

Compatibility Highlights

↓

Primary Action

↓

Secondary Action
```

Never change this order.

---

# Photography

Photography occupies the highest visual priority.

Images should feel

Natural.

Well lit.

Authentic.

Respectful.

Avoid

Heavy editing.

Wedding shoots.

Fashion photography.

Luxury poses.

Artificial backgrounds.

Photography should communicate life.

Not appearance.

---

# Verification

Verification should be immediately visible.

Never hidden.

Examples

Identity Verified

Phone Verified

Profile Reviewed

Verification should reassure.

Never dominate.

---

# Identity

Immediately visible

Name

Age

Location

Profession

Education

Only essential information.

Avoid long paragraphs.

---

# Lifestyle Summary

Short summary.

Maximum

Two lines.

Focus on

Values.

Interests.

Lifestyle.

Goals.

Not achievements.

---

# Compatibility

Show only the most meaningful insights.

Examples

Shared Values

Common Interests

Lifestyle Match

Language Match

Education Match

Maximum

Three compatibility indicators.

Avoid percentage scores.

Humans understand explanations better than numbers.

---

# Family Context

Family information should never dominate the card.

Present respectfully.

Expand only on the profile page.

---

# Primary Action

Examples

View Profile

Send Interest

Primary action should encourage understanding.

Never pressure.

---

# Secondary Actions

Examples

Save

Share

Report

Block

Secondary actions remain visually quiet.

---

# Card Variants

Search Result

Compact

Recommendation

Saved Profile

Recently Viewed

Each variant changes layout.

Never behaviour.

---

# Information Priority

Users should notice information in this order.

Photography

↓

Identity

↓

Compatibility

↓

Lifestyle

↓

Actions

↓

Supporting Details

---

# Card Height

Cards should remain consistent.

Avoid cards with unpredictable heights.

Consistency improves scanning.

---

# Whitespace

Whitespace separates

Identity

Lifestyle

Compatibility

Actions

Never compress information.

---

# Hover Behaviour

Allowed

Small elevation.

Soft shadow.

Gentle border emphasis.

Tiny image zoom (maximum 1.02).

Forbidden

Large scaling.

Rotation.

Glow.

Aggressive motion.

---

# Motion

Cards should feel alive.

Not animated.

Allowed

Fade.

Opacity.

Elevation.

Small image transition.

Forbidden

Flip animations.

3D rotation.

Bounce.

Sliding content.

---

# Empty States

Missing information should never leave awkward gaps.

Instead

Show placeholders.

Explain missing sections.

Encourage profile completion.

---

# Accessibility

Entire card should be keyboard accessible.

Images require alt text.

Verification badges require labels.

Actions should have descriptive names.

Touch targets minimum

44px.

---

# Performance

Images

Responsive.

Lazy loaded below the fold.

Skeleton while loading.

Avoid layout shifts.

Card rendering should remain lightweight.

---

# Frontend API

```tsx
<ProfileCard
  profile={profile}
  variant="search"
  verified
  compatibility={compatibility}
/>
```

Variants

```
search

featured

saved

recommended

recent
```

---

# File Structure

```
ProfileCard/

ProfileCard.tsx

ProfileCardImage.tsx

ProfileCardInfo.tsx

ProfileCardCompatibility.tsx

ProfileCardActions.tsx

ProfileCardSkeleton.tsx

index.ts
```

---

# Token Consumption

Consume

Color Tokens

Typography Tokens

Spacing Tokens

Motion Tokens

Surface Tokens

Shadow Tokens

Radius Tokens

Never introduce local visual values.

---

# Common Mistakes

Never

Rank people visually.

Display excessive information.

Create clutter.

Overuse badges.

Use flashy colours.

Treat profiles like products.

Encourage endless scrolling.

Show compatibility percentages without explanation.

Use dating-style swipe interactions.

---

# AI Implementation Rules

Always

Prioritize authenticity.

Maintain visual hierarchy.

Show verification.

Use consistent spacing.

Support accessibility.

Consume Design Tokens.

Never

Invent layouts.

Hardcode styles.

Use swipe-card interactions.

Overload the card.

Prioritize aesthetics over readability.

---

# Review Checklist

□ Does the card introduce a person rather than a profile?

□ Is the photography authentic?

□ Is verification visible?

□ Is information easy to scan?

□ Does the layout breathe?

□ Is there only one primary action?

□ Does the card remain accessible?

□ Would a family feel comfortable viewing it together?

Only if every answer is "Yes" should the Profile Card be approved.

---

*"The Profile Card should never persuade users to choose someone.*

*It should encourage them to understand someone."*

**Version 1.0**