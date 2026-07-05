# Input Components

> Inputs are conversations. Every field should make users feel guided rather than tested.

---

# Purpose

Input components allow users to communicate information to Vivah.

The interface should never feel like an examination.

It should feel like someone respectfully asking meaningful questions.

Good forms reduce anxiety.

Bad forms create abandonment.

---

# Philosophy

Most forms ask users to fill information.

Vivah helps users tell their story.

Every field should answer

"Why are we asking this?"

If the purpose is unclear,

the field should not exist.

---

# Emotional Objective

Every form should create

Confidence

↓

Progress

↓

Completion

Never

Confusion

Pressure

Frustration

Fatigue

---

# Principles

Inputs should

Be obvious.

Be forgiving.

Be accessible.

Be readable.

Be consistent.

Support correction.

Never punish mistakes.

---

# Input Types

Vivah supports

Text

Textarea

Email

Phone

Password

Date

Search

Number

Select

Multi Select

Radio

Checkbox

Switch

OTP

File Upload

Photo Upload

Every input follows the same visual language.

---

# Input Anatomy

Every input contains

```
Label

↓

Helper Text

↓

Input Field

↓

Validation Message

↓

Success State
```

Labels are mandatory.

Placeholders never replace labels.

---

# Labels

Labels explain purpose.

They should always remain visible.

Examples

First Name

Profession

City

Height

Education

Avoid vague labels like

Enter Here

Information

Value

---

# Placeholder Text

Placeholder text provides examples.

Never instructions.

Good

"e.g. Software Engineer"

Poor

"Enter your profession"

---

# Helper Text

Helper text explains

Why information is needed.

Examples

"This helps us recommend compatible profiles."

Helper text should reduce hesitation.

---

# Required Fields

Mark only genuinely required fields.

Avoid making every field mandatory.

Users should feel trusted.

---

# Optional Fields

Clearly indicate optional information.

Never surprise users with hidden requirements.

---

# Validation

Validation should occur

Immediately when helpful.

Never aggressively.

Validation messages should explain

What happened.

Why.

How to fix it.

Avoid

"Invalid Input"

Prefer

"Please enter a valid phone number."

---

# Success State

Success should reassure.

Use

Check icon.

Soft colour change.

Short confirmation.

Avoid dramatic animations.

---

# Error State

Errors should never blame users.

Preferred tone

Helpful.

Respectful.

Specific.

Example

"We couldn't verify this email address."

Never

"You entered an invalid email."

---

# Focus State

Focus should remain

Visible.

Accessible.

Comfortable.

High contrast.

Focus should communicate

"You are here."

---

# Disabled State

Disabled inputs remain readable.

Explain

Why editing is unavailable.

Avoid extremely low opacity.

---

# Search Fields

Search should encourage exploration.

Suggestions should appear naturally.

Never overwhelm users.

---

# Password Fields

Support

Show/Hide password.

Strength indicator.

Clear requirements.

Never expose passwords by default.

---

# OTP Inputs

Support

Auto paste.

Keyboard navigation.

Auto focus.

Resend timer.

Accessible labels.

---

# File Upload

Explain

Supported formats.

Maximum size.

Upload progress.

Success state.

Users should always understand upload status.

---

# Photo Upload

Photo upload should feel welcoming.

Explain

Preferred lighting.

Natural expressions.

Background recommendations.

Help users succeed.

---

# Date Inputs

Use native pickers where appropriate.

Avoid complicated custom calendars unless necessary.

---

# Dropdowns

Support

Keyboard.

Search.

Clear selection.

Reset.

Consistent spacing.

---

# Form Layout

One column preferred.

Two columns only on large screens where comprehension is not affected.

Never create unnecessarily dense forms.

---

# Progressive Forms

Large forms should be divided into logical steps.

Profile creation should feel like a journey.

Not paperwork.

---

# Motion

Inputs animate only when communicating state.

Allowed

Focus.

Validation.

Expansion.

Forbidden

Bounce.

Shake.

Glow.

Large movement.

---

# Accessibility

Minimum touch target

44px

Support

Keyboard navigation.

Screen readers.

Autocomplete.

Input modes.

ARIA attributes.

Visible focus.

High contrast.

Error announcements.

Accessibility is mandatory.

---

# Performance

Avoid unnecessary re-renders.

Debounce search.

Lazy-load large dropdown data.

Optimise validation.

Forms should remain responsive on low-end devices.

---

# Frontend API

```tsx
<Input
  label="Profession"
  placeholder="e.g. Software Engineer"
  helperText="Used to improve compatibility."
  required
  error={false}
/>
```

---

# File Structure

```
Input/

Input.tsx

Textarea.tsx

Select.tsx

Checkbox.tsx

Radio.tsx

Switch.tsx

OTPInput.tsx

Upload.tsx

FormField.tsx

index.ts
```

---

# Token Consumption

Consume

Color Tokens

Typography Tokens

Spacing Tokens

Surface Tokens

Motion Tokens

Radius Tokens

Never define local values.

---

# Common Mistakes

Never

Hide labels.

Rely on placeholders.

Show generic errors.

Use long forms.

Animate excessively.

Hide validation.

Require unnecessary fields.

Use inconsistent spacing.

---

# AI Implementation Rules

Always

Use labels.

Provide helper text.

Support validation.

Support keyboard navigation.

Consume Design Tokens.

Use semantic HTML.

Never

Replace labels with placeholders.

Invent new field styles.

Hardcode colours.

Ignore accessibility.

Create confusing forms.

---

# Review Checklist

□ Are labels always visible?

□ Is validation helpful?

□ Is helper text useful?

□ Is accessibility complete?

□ Does the form feel calm?

□ Are unnecessary fields removed?

□ Does the layout reduce cognitive load?

□ Would users feel comfortable completing this form?

Only if every answer is "Yes" should the input component be approved.

---

*"Forms should never feel like bureaucracy.*

*They should feel like thoughtful conversations."*

**Version 1.0**