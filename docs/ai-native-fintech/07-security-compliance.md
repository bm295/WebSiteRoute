# Security and Compliance Baseline

## Security controls
- MFA for operator/admin accounts.
- RBAC with least privilege and periodic access review.
- Full encryption at rest and in transit.
- Secret management with rotation policy.
- WAF + API rate limiting + bot mitigation.

## Compliance baseline (to adapt by jurisdiction)
- KYC/AML controls for onboarding and transaction monitoring.
- PCI DSS scope reduction via tokenized card handling.
- Data privacy controls (retention, right-to-access/delete where permitted).
- Immutable audit trail for critical events.

## Fintech risk controls
- Transaction limits by risk tier.
- Velocity checks and beneficiary risk profiling.
- Sanctions/PEP screening integration.

## SDLC and supply chain
- Mandatory code review and signed commits for protected branches.
- Dependency scanning and license policy checks.
- SAST/DAST in CI pipelines.

## Incident response
- Severity model (SEV1-SEV4).
- On-call escalation tree.
- Post-incident review with corrective action tracking.
