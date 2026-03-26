# Engineering Ways of Working (AI-Native)

## Branching and review
- Trunk-based development with short-lived feature branches.
- Required peer review for payment, ledger, and risk modules.
- Architecture Decision Records (ADRs) for critical design changes.

## Definition of done
A task is done only when:
- code is merged,
- tests are green,
- observability instrumentation is added,
- docs are updated,
- rollback plan is documented.

## Testing strategy
- Unit tests for domain invariants.
- Contract tests for external rail adapters.
- End-to-end tests for money movement scenarios.
- Adversarial tests for AI prompt-injection and unsafe actions.

## Release governance
- Feature flags for staged rollout.
- Runbook readiness before enabling payment-affecting features.
- Mandatory canary analysis for risk-scoring model changes.

## Documentation standards
- Keep architecture, PRD, and API contracts versioned in repo.
- Update changelog for every production-facing behavior change.
