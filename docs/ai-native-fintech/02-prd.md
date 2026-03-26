# Product Requirements Document (PRD)

## Scope
Create a fintech platform with:
- user identity and KYC onboarding,
- wallet/accounts,
- double-entry ledger,
- payment initiation and settlement tracking,
- risk scoring and fraud review,
- AI assistant for end-user and internal operations.

## In-scope modules
1. Identity and access management.
2. Customer onboarding + KYC status orchestration.
3. Wallet/account management.
4. Ledger service (immutable postings).
5. Payment orchestration (bank transfer/card rail adapters abstracted).
6. Risk and fraud decisioning.
7. Notification and statement generation.
8. AI copilot layer (customer + internal).

## Out of scope (phase 1)
- crypto custody.
- international remittance corridors beyond one pilot region.
- lending and credit underwriting.

## Functional requirements

### FR-1 Account onboarding
- Users can register, verify email/phone, submit KYC fields, and receive onboarding status.
- KYC status transitions must be auditable.

### FR-2 Wallet and ledger
- A user can hold one or more wallets.
- All monetary changes must post through immutable double-entry ledger records.
- No balance mutation without a corresponding posting set.

### FR-3 Payments
- User can initiate transfer between internal wallets and external beneficiaries.
- System supports states: `created`, `authorized`, `processing`, `settled`, `failed`, `reversed`.

### FR-4 Risk checks
- Each payment receives risk score and policy decision before execution.
- High-risk transactions route to manual review.

### FR-5 AI assistant
- Provide user-facing transaction Q&A, spending summaries, anomaly highlights.
- Provide operator-facing case summary and recommended next action.
- AI output must include confidence and cited internal evidence IDs.

### FR-6 Auditability
- Every state transition emits an event with actor, timestamp, correlation ID.

## Non-functional requirements
- Availability target: 99.9% for core APIs.
- P95 API latency: < 300ms for read APIs, < 500ms for payment initiation.
- End-to-end observability with logs, traces, metrics.
- Encryption in transit (TLS 1.2+) and at rest (KMS-backed keys).

## Acceptance criteria snapshot
- End-to-end happy path: onboard -> fund -> pay -> settle -> statement.
- Reconciliation report between ledger and payment processor balances.
- AI assistant can explain last 30 days spend with category confidence.
