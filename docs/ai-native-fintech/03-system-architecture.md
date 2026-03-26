# Target System Architecture

## Architectural style
- Modular monolith in early phase, designed with clear service boundaries for gradual extraction.
- Event-driven integration for money movement lifecycle and audit.

## Core components
1. **API Gateway / BFF**
   - AuthN/AuthZ enforcement.
   - Request shaping and rate limits.
2. **Identity Service**
   - User profile, auth, role mapping.
3. **KYC Service**
   - Workflow orchestration with external verification vendors.
4. **Wallet Service**
   - Wallet metadata and available/held balances.
5. **Ledger Service**
   - Double-entry journal, immutable postings.
6. **Payment Service**
   - Payment instruction lifecycle + external rail adapters.
7. **Risk Service**
   - Rule engine + model scoring.
8. **AI Orchestration Service**
   - Prompt assembly, tool calls, guardrails, response policy checks.
9. **Notification Service**
   - Email/SMS/in-app messaging.
10. **Observability + Audit Pipeline**
   - Centralized logs, traces, immutable audit stream.

## Data stores
- Relational DB (OLTP): users, wallets, payments, cases.
- Ledger DB/schema (append-only entries).
- Cache: session/token/rate limiting.
- Object storage: statements, compliance evidence artifacts.
- Vector index (optional): support AI retrieval over internal policy docs.

## Event topics
- `kyc.status.changed`
- `wallet.balance.changed`
- `ledger.posted`
- `payment.status.changed`
- `risk.case.created`
- `ai.decision.logged`

## Trust boundaries
- Public API boundary.
- Internal service boundary.
- Sensitive processing zone (PII, payment keys).

## Deployment strategy
- Containerized workloads.
- Blue/green or canary release for risk and payment modules.
- Separate environments: dev, staging, production with strict secret isolation.
