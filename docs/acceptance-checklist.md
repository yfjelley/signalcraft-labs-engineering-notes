# Delivery Acceptance Checklist

This checklist is used to keep software delivery separate from trading performance. It is not an investment result checklist.

## Source and configuration

- Source code is delivered in a repository or archive.
- Environment variable examples are included.
- API keys and customer secrets are not committed.
- Configuration files separate test, paper, and live environments.
- Version and deployment notes are documented.

## Signal and risk behavior

- Valid signal payloads are accepted.
- Invalid secrets are rejected.
- Duplicate signals are rejected or ignored.
- Cooldown rules are enforced.
- Maximum quantity or notional rules are enforced.
- Reduce-only or pause modes are tested when relevant.

## Order and status handling

- Dry-run mode is available before live order routing.
- Order request logs include symbol, side, quantity, route, and decision.
- Rejections from the broker, exchange, or FIX venue are logged.
- Partial fill and cancel flows are handled when in scope.
- Manual pause or kill-switch behavior is tested.

## Logs and alerts

- Each signal has a traceable event id.
- Accepted and rejected decisions are both logged.
- Alerts are sent for failures, authorization issues, and paused execution.
- Log retention and rotation are documented.

## Deployment handoff

- Deployment commands are documented.
- Restart and rollback steps are documented.
- The client controls server access and credentials.
- The client understands what is included and not included in ongoing maintenance.
- Grey release or paper-trading validation is complete before live expansion.

