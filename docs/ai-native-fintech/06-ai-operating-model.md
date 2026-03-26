# AI-Native Operating Model

## AI roles
1. **Customer Copilot**
   - Explains transactions, spending trends, and account activity.
2. **Risk Analyst Copilot**
   - Summarizes signals and recommended case actions.
3. **Engineering Delivery Agent**
   - Generates code scaffolds, tests, migrations, and docs.
4. **Ops Automation Agent**
   - Detects incident anomalies and proposes runbook steps.

## Guardrails
- Retrieval-only mode for policy/compliance responses.
- No autonomous funds movement.
- High-risk actions require human confirmation with explicit rationale.
- Prompt and response logging with redaction of secrets/PII.

## Evaluation framework
- Offline eval set for fraud-case summarization.
- Hallucination rate and citation coverage tracked weekly.
- Production shadow mode before full user exposure.

## Human-in-the-loop checkpoints
- Manual approval for risk deny actions.
- Escalation rules for low-confidence model outputs.
- Periodic model governance review (monthly).

## Telemetry requirements
- Token usage, latency, confidence scores, and fallback counts.
- Outcome metrics tied to business KPIs (chargeback reduction, faster support resolution).
