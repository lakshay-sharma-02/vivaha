# Chat System

> Conversations are where trust becomes human. The interface should disappear so people can focus entirely on each other.

---

# Purpose

The Chat System enables meaningful conversations between verified matches.

It is not designed for entertainment.

It is not designed for endless messaging.

It exists to help two people understand each other comfortably and respectfully.

The interface should create an environment where conversations feel private,

calm,

and intentional.

---

# Philosophy

Imagine two families sitting together in a peaceful living room.

Nothing in the room competes for attention.

Everything supports conversation.

The Chat System should create the same feeling.

Users should notice the conversation.

Not the interface.

---

# Emotional Objective

Every conversation should create

Safety

↓

Comfort

↓

Trust

↓

Connection

Never

Addiction

Urgency

Competition

Distraction

---

# Core Principles

Every design decision should

Reduce anxiety.

Respect privacy.

Support thoughtful communication.

Avoid unnecessary distractions.

Encourage meaningful conversations.

---

# Conversation Architecture

Every chat consists of

```
Conversation Header

↓

Conversation Timeline

↓

Message Composer

↓

Conversation Tools
```

Everything else is secondary.

---

# Header

Contains

Profile

Verification

Online Status

Last Seen (if permitted)

Call Actions (future)

More Options

The header should remain compact.

Never dominate the conversation.

---

# Conversation Timeline

The conversation is the primary focus.

Messages should breathe.

Generous spacing.

Clear timestamps.

Logical grouping.

Easy scanning.

Never compress messages.

---

# Message Types

Supported

Text

Image

Voice

Document

System Message

Verification Notice

Date Separator

Typing Indicator

Future additions should extend this list,

not replace it.

---

# Message Groups

Messages from the same sender should group naturally.

Reduce repeated avatars.

Reduce repeated timestamps.

Improve reading rhythm.

---

# Message Width

Messages should never span the full width.

Maximum width

≈70%

Reading comfort is more important than density.

---

# Typography

Typography should remain

Simple.

Readable.

Calm.

Body typography only.

No decorative styles.

---

# Time Stamps

Display quietly.

Never dominate messages.

Support

Today

Yesterday

Date separators

Relative times where appropriate.

---

# Delivery States

Every outgoing message supports

Sending

Sent

Delivered

Read

Failed

Users should never wonder whether a message was sent.

---

# Typing Indicator

Typing indicators should remain subtle.

Avoid animated dots that draw excessive attention.

Keep animation calm.

---

# Composer

The composer contains

Text Field

Attachment

Emoji (future)

Voice Message

Send Button

Nothing else.

Never overload the composer.

---

# Send Button

Disabled when appropriate.

Immediately responsive.

Loading state during upload.

Accessible by keyboard.

---

# Attachments

Support

Images

PDF

Documents

Future media

Show upload progress.

Allow cancellation.

Preview before sending.

---

# Voice Messages

Future implementation.

Support

Record.

Pause.

Delete.

Playback.

Waveform.

Duration.

Keep interaction simple.

---

# Empty State

When conversations begin,

encourage respectful introductions.

Example

"Start with a thoughtful introduction."

Avoid generic empty pages.

---

# System Messages

System messages communicate

Verification

Safety reminders

Membership changes

Conversation milestones

They should feel distinct,

but never intrusive.

---

# Safety

Support

Block User

Report User

Mute Notifications

Delete Conversation

Actions remain accessible,

never prominent.

---

# Privacy

Users control

Read receipts.

Last seen.

Online status.

Media downloads.

Notification previews.

Privacy settings should always be understandable.

---

# Motion

Allowed

Message fade.

Small slide.

Composer expansion.

Typing appearance.

Forbidden

Bounce.

Message explosion.

Confetti.

Large transitions.

Conversation should remain calm.

---

# Accessibility

Support

Keyboard navigation.

Screen readers.

Message announcements.

ARIA roles.

Focus management.

Readable contrast.

Large touch targets.

---

# Performance

Virtualized message lists.

Image lazy loading.

Efficient scrolling.

Smooth rendering.

Maintain 60 FPS.

No layout shifts.

---

# Responsive Behaviour

Desktop

Two-column layout.

Conversation list + chat.

Tablet

Flexible split.

Mobile

Conversation first.

Navigation through gestures only where appropriate.

Never sacrifice readability.

---

# Frontend API

```tsx
<Chat
  conversation={conversation}
  messages={messages}
  onSend={handleSend}
  onUpload={handleUpload}
/>
```

---

# File Structure

```
Chat/

Chat.tsx

ConversationHeader.tsx

MessageList.tsx

MessageBubble.tsx

Composer.tsx

TypingIndicator.tsx

SystemMessage.tsx

AttachmentPreview.tsx

ChatSkeleton.tsx

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

Radius Tokens

Shadow Tokens

Never introduce component-specific visual values.

---

# Common Mistakes

Never

Animate every message.

Show advertisements.

Interrupt conversations.

Auto-scroll unexpectedly.

Use noisy backgrounds.

Create cluttered message bubbles.

Hide safety tools.

Turn messaging into social media.

---

# AI Implementation Rules

Always

Prioritize readability.

Support accessibility.

Consume Design Tokens.

Keep conversations calm.

Respect privacy settings.

Support slow networks.

Never

Invent message styles.

Hardcode colours.

Add unnecessary animations.

Complicate the composer.

Prioritize visual effects over conversation.

---

# Review Checklist

□ Does the interface prioritize conversation?

□ Is privacy respected?

□ Are messages easy to read?

□ Are delivery states obvious?

□ Is accessibility complete?

□ Does the composer remain simple?

□ Is motion subtle?

□ Would two families feel comfortable using this conversation interface?

Only if every answer is "Yes" should the Chat System be approved.

---

*"The best conversation interface is the one users stop noticing after the first message.*

*People should remember the conversation—not the software."*

**Version 1.0**