# Modal System

> A modal is an interruption. It should only appear when the user's full attention is genuinely required.

---

# Purpose

Modals temporarily pause the current experience.

They exist to help users make important decisions safely.

They should never be used for marketing.

They should never interrupt users unnecessarily.

Every modal should answer

"Why can't this happen inside the page?"

If there is no strong answer,

the modal should not exist.

---

# Philosophy

Imagine someone politely asking

"May I have your attention for a moment?"

Not

"STOP EVERYTHING."

Vivah modals should feel respectful.

Never disruptive.

---

# Emotional Objective

Every modal should create

Attention

↓

Understanding

↓

Confidence

↓

Resolution

Never

Urgency

Pressure

Confusion

Manipulation

---

# Modal Principles

A modal should

Explain.

Confirm.

Protect.

Guide.

Never advertise.

Never surprise.

Never interrupt meaningful work.

---

# When To Use A Modal

Use a modal when

Deleting an account.

Blocking a user.

Reporting a profile.

Viewing an enlarged image.

Confirming payment.

Accepting important permissions.

Critical errors.

Do NOT use a modal for

Membership advertisements.

Newsletters.

Announcements.

Cookie banners.

Feature tours.

General navigation.

---

# Modal Hierarchy

Vivah supports six modal types.

```
Confirmation

↓

Information

↓

Form

↓

Media Viewer

↓

Critical Action

↓

Full Screen Flow
```

Each serves a distinct purpose.

---

# Confirmation Modal

Purpose

Confirm user intent.

Examples

Delete Conversation

Block User

Logout

Leave Onboarding

Keep content short.

One decision.

Two actions.

---

# Information Modal

Purpose

Provide additional context.

Examples

Membership Benefits

Verification Process

Privacy Policy Summary

Support Information

Users should always be able to close it easily.

---

# Form Modal

Purpose

Collect a small amount of information.

Examples

Report Profile

Rename Saved Search

Quick Feedback

Large forms belong on dedicated pages.

---

# Media Viewer

Purpose

View profile photos and documents.

Support

Zoom.

Keyboard navigation.

Swipe on mobile.

Close easily.

The media remains the focus.

---

# Critical Action Modal

Purpose

Actions with permanent consequences.

Examples

Delete Account

Cancel Membership

Remove Verification

Requirements

Clear explanation.

Consequences.

Recovery options.

Explicit confirmation.

---

# Full Screen Flow

Reserved for

Image cropping.

Identity verification.

Future onboarding fragments.

Never use fullscreen unless absolutely necessary.

---

# Modal Anatomy

Every modal follows the same hierarchy.

```
Backdrop

↓

Container

↓

Header

↓

Content

↓

Primary Action

↓

Secondary Action
```

Nothing else.

---

# Header

Contains

Title

Optional description.

Close button.

Titles should clearly describe the purpose.

---

# Content

Content should answer

What happened?

Why?

What should I do?

Avoid long paragraphs.

Use lists when appropriate.

---

# Actions

Maximum

Two actions.

Primary

Confirm.

Secondary

Cancel.

Never display three equally important buttons.

---

# Close Behaviour

Support

Escape.

Backdrop click (except critical actions).

Close button.

Keyboard focus.

Users should never feel trapped.

---

# Backdrop

The backdrop separates the modal from the page.

Use

Soft blur.

Low opacity overlay.

Never use opaque black backgrounds.

The page should remain visible.

---

# Width

Small

Confirmation.

Medium

Information.

Large

Forms.

Fullscreen

Exceptional cases only.

Never create arbitrary sizes.

---

# Motion

Opening

Soft fade.

Small upward motion.

Closing

Gentle fade.

Small downward motion.

Duration

180–250ms.

Never

Bounce.

Zoom dramatically.

Spin.

Rotate.

---

# Focus Management

When opened

Move focus into the modal.

Trap keyboard focus.

Return focus when closed.

Accessibility is mandatory.

---

# Error Handling

Validation should appear inline.

Never close a modal after an error.

Preserve entered information.

Explain the problem clearly.

---

# Accessibility

Support

Keyboard navigation.

Screen readers.

ARIA Dialog.

Focus trap.

Escape key.

Visible focus.

Accessible labels.

Announcements.

---

# Performance

Render only when needed.

Lazy load heavy content.

Avoid expensive animations.

Prevent layout shifts.

Keep interaction responsive.

---

# Responsive Behaviour

Desktop

Centered dialog.

Tablet

Centered with larger width.

Mobile

Bottom sheet or fullscreen depending on context.

Do not simply shrink desktop modals.

Design for mobile intentionally.

---

# Frontend API

```tsx
<Modal
  open={open}
  onClose={onClose}
  size="medium"
>
  ...
</Modal>
```

Supported Sizes

```
small

medium

large

fullscreen
```

---

# File Structure

```
Modal/

Modal.tsx

ModalHeader.tsx

ModalBody.tsx

ModalFooter.tsx

ConfirmationModal.tsx

MediaViewer.tsx

Modal.types.ts

index.ts
```

---

# Token Consumption

Consume

Surface Tokens

Spacing Tokens

Typography Tokens

Motion Tokens

Shadow Tokens

Radius Tokens

Color Tokens

Never introduce local values.

---

# Common Mistakes

Never

Open multiple stacked modals.

Display advertisements.

Interrupt onboarding.

Require unnecessary confirmations.

Use large animations.

Trap users.

Hide the close action.

Create modal-only workflows that should be pages.

---

# AI Implementation Rules

Always

Use the correct modal type.

Provide clear actions.

Support keyboard navigation.

Trap focus correctly.

Consume Design Tokens.

Respect accessibility.

Never

Invent modal styles.

Hardcode dimensions.

Use modals for marketing.

Overcomplicate interactions.

Interrupt users unnecessarily.

---

# Review Checklist

□ Is a modal truly necessary?

□ Does it have one purpose?

□ Are there no more than two actions?

□ Is accessibility complete?

□ Is focus managed correctly?

□ Is motion subtle?

□ Can users dismiss it easily?

□ Would this interaction feel respectful?

Only if every answer is "Yes" should the modal be approved.

---

*"A modal borrows the user's attention.*

*Vivah should always return it with respect."*

**Version 1.0**