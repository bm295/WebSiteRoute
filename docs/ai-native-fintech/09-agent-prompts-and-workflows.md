# Agent Prompts and Workflows

## Prompt template: feature implementation
"""
You are an AI engineering agent working on a fintech codebase.
Goal: implement <feature>.
Constraints: preserve ledger integrity, idempotency on money movement, full audit logs.
Output:
1) design notes
2) code changes
3) tests
4) migration notes
5) rollback plan
"""

## Prompt template: risk case summary
"""
Summarize this risk case using only provided evidence snippets.
Return: decision options (allow/review/deny), confidence, reasons, missing evidence.
Do not fabricate facts. If uncertain, say UNKNOWN.
"""

## Agent workflow: safe delivery
1. Parse requirement and map to domain entities.
2. Identify compliance/risk implications.
3. Propose patch + tests.
4. Run static checks and test suite.
5. Generate change log with potential side effects.

## Agent workflow: incident triage
1. Detect anomaly from metrics/log alerts.
2. Correlate by service + release + region.
3. Suggest probable root causes with evidence links.
4. Recommend immediate containment action.
5. Create postmortem draft structure.
