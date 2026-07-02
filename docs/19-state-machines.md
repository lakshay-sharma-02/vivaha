# 19 - State Machines

Defining the explicit lifecycles of core entities prevents invalid state transitions (e.g., verifying a banned user).

## User Profile Status (`verification_status`)
```text
Unverified ──> Pending (Docs Submitted) ──> Verified
    │                 │                        │
    └─────────────────┼────────────────────────┘
                      ▼
                   Rejected
```

## Match Status (`status` in `matches` table)
```text
(User A likes B)
Unmatched ──> Pending
                │
                ├─> (User B likes A) ──> Accepted ──> (User A/B unmatches) ──> Unmatched (or Deleted)
                │
                └─> (User B passes A) ──> Rejected
```

## Payment / Membership Status
```text
             (Payment Service)
Draft Order ──> Pending Gateway ──> Successful
                                        │
                                        ▼
                             (Membership Activated) ──> Expired / Cancelled
```

## Report Resolution Status (`status` in `reports` table)
```text
Pending ──> Reviewing (Admin Assigned) ──> Resolved (Action Taken)
                                         └─> Dismissed (False Report)
```

## Engineering Decisions
State machines are enforced via Enum types in PostgreSQL (e.g., `CREATE TYPE match_status AS ENUM ('pending', 'accepted', 'rejected')`) and validated in Zod. Future iterations may include strict database trigger checks to prevent impossible transitions (e.g., `Verified` -> `Pending`).
