# Vivaha — Product Requirements Document (MVP)

## Overview

Vivaha is a hyper-local matrimony platform designed for families and individuals seeking marriage matches within their own town, community, caste, religion, and cultural background.

Unlike large national matrimony platforms, Vivaha focuses on trust, familiarity, manual verification, and family involvement.

Every profile is reviewed and approved by a human administrator before becoming visible to other members.

The platform operates on a simple business model: users can browse verified profiles, but must pay a one-time fee to unlock complete profile details and contact information.

---

# Vision

To become the most trusted local matrimony network for communities where family reputation, cultural compatibility, and personal trust matter more than algorithms.

---

# Target Audience

### Primary Users

* Unmarried men and women seeking marriage
* Families searching on behalf of their children
* Community members seeking verified local matches

### Geographic Focus

Initially:

* Single town
* Single community

Examples:

* Jat Matrimony (Rohtak)
* Aggarwal Matrimony (Panipat)
* Brahmin Matrimony (Hisar)

Expand only after validating demand.

---

# Core Principles

### Trust First

Every profile is manually reviewed.

### Family Friendly

Parents and guardians should feel comfortable using the platform.

### Human Over Algorithm

Users browse and choose themselves.

No complicated matching scores.

### Quality Over Quantity

A smaller number of verified profiles is better than thousands of unverified accounts.

---

# User Journey

## 1. Landing Page

Publicly accessible.

Purpose:

* Explain the platform
* Build trust
* Encourage registration

Sections:

### Hero Section

Headline:

"Find trusted marriage matches from your own community."

Buttons:

* Browse Profiles
* Create Profile

### How It Works

1. Create profile
2. Get verified
3. Browse matches
4. Unlock full details
5. Connect directly

### Trust Section

* Human verification
* Local community focus
* Family-friendly platform

### Preview Profiles

Show sample cards.

Visible:

* Photo
* Age
* Town

No sensitive information.

### Footer

* About
* Privacy Policy
* Terms
* Contact

---

# 2. Authentication

### Login

Email OTP login.

Flow:

User enters email.

OTP sent.

OTP verified.

User logged in.

### Registration

First login automatically creates account.

No password required.

---

# 3. Onboarding

Required before using platform.

Progress saved automatically.

---

## Step 1: Basic Information

Fields:

* Full Name
* Date of Birth
* Gender
* Height
* Profile Photo

---

## Step 2: Community Information

Fields:

* Town
* Religion
* Caste
* Sub-Caste

---

## Step 3: Personal Information

Fields:

* Education
* Profession
* Income Range
* About Me

---

## Step 4: Family Information

Fields:

* Family Type
* Father's Occupation
* Mother's Occupation
* Number of Siblings

---

## Step 5: Horoscope

Optional

Fields:

* Manglik Status
* Horoscope Details

---

## Step 6: Partner Preferences

Fields:

* Preferred Age Range
* Preferred Town
* Preferred Religion
* Preferred Caste

---

## Step 7: Verification

Fields:

* Aadhaar Photo Upload
* Last 4 Aadhaar Digits

Submission sends profile for review.

Status becomes:

PENDING_VERIFICATION

---

# 4. Verification Workflow

Admin reviews profile.

Possible outcomes:

### Approved

Profile becomes visible.

Status:

VERIFIED

### Rejected

User receives reason.

Status:

REJECTED

User can edit and resubmit.

---

# 5. Dashboard

After login.

Shows:

### Profile Status

* Draft
* Pending Verification
* Verified
* Rejected

### Quick Actions

* Edit Profile
* Browse Profiles
* My Unlocks

---

# 6. Browse Profiles

Only verified profiles appear.

Layout:

Responsive card grid.

Each card shows:

* Profile Photo
* First Name
* Age
* Height
* Town

Filters:

* Age
* Religion
* Caste
* Town

Search:

* Name
* Town

Pagination included.

---

# 7. Profile Details (Locked)

When viewing another profile.

Visible:

* Photo
* Age
* Height
* Profession
* Town
* Short Bio

Hidden:

* Phone Number
* Email
* Family Details
* Horoscope
* Partner Preferences

Locked sections appear blurred.

CTA:

Unlock Full Profile — ₹5000

---

# 8. Payment System

Provider:

Razorpay

Price:

₹5000

One-time payment.

Flow:

1. User clicks Unlock
2. Razorpay checkout opens
3. Payment verified server-side
4. Unlock record created
5. Full profile becomes accessible

---

# 9. Profile Details (Unlocked)

Visible:

* Contact Number
* Email Address
* Full Family Details
* Horoscope Details
* Partner Preferences

Additional Section:

### Vivaha Recommendation

Personal note written by admin.

Example:

"Both families belong to nearby towns and have similar educational backgrounds. This profile appears highly compatible based on stated preferences."

---

# 10. Interests System

Users can express interest.

Actions:

### Send Interest

Status:

PENDING

### Accept

Status:

ACCEPTED

### Decline

Status:

DECLINED

Accepted interests appear in dashboard.

---

# 11. User Profile Management

User can:

* Edit Profile
* Change Photo
* Update Preferences
* View Unlock History
* View Sent Interests
* View Received Interests

Any major changes may require re-verification.

---

# 12. Admin Dashboard

Admin-only.

---

## Overview

Shows:

* Total Users
* Verified Profiles
* Pending Profiles
* Revenue
* Total Unlocks

---

## Verification Queue

Admin can:

* View Submitted Profiles
* View Aadhaar Documents
* Approve
* Reject
* Leave Notes

---

## Payment Management

View:

* Payment History
* Amount
* Status
* User

---

## Personalized Notes

Admin can write matchmaking notes for unlocked profiles.

---

# User Roles

## Member

Can:

* Create Profile
* Browse Profiles
* Unlock Profiles
* Send Interests

Cannot:

* Access Verification Documents
* Access Admin Features

---

## Admin

Can:

* Verify Profiles
* Manage Payments
* View Documents
* Write Notes
* Access Analytics

---

# Security Requirements

## Database Security

Use Supabase Row Level Security.

Rules:

### Profiles

Readable by authenticated users.

### Profile Details

Readable only if:

* User owns profile
  OR
* User purchased unlock

### Verification Documents

Admin only.

Never publicly accessible.

### Payments

Visible only to owner and admin.

---

# Monetization

## Primary Revenue

Profile Unlock

Price:

₹5000

One-time payment.

Includes:

* Contact Information
* Family Details
* Horoscope
* Personalized Matchmaking Note

---

# Future Features

Phase 2:

* SMS OTP
* Push Notifications
* Featured Profiles
* Profile Boosts

Phase 3:

* Mobile App
* Multi-City Support
* Family Accounts
* Match Scoring
* Premium Matchmaking Services

---

# MVP Success Criteria

Launch is considered successful when:

* 50+ verified profiles exist
* 10+ profile unlocks occur
* 3+ successful introductions occur
* At least one marriage is facilitated through the platform

The primary objective of the MVP is not scale. The objective is proving that people will pay for trusted, verified, hyper-local matrimonial introductions.