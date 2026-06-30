# API Key Permission Safety

Automated trading projects should start from the smallest practical API permission set. This reduces account risk and makes the implementation easier to audit.

## Recommended permission model

| Permission | Default | Why |
| --- | --- | --- |
| Read account and positions | Required | Needed for balances, positions, orders, fills, and reconciliation. |
| Trade or order placement | Scope-specific | Required only when the system must place or cancel orders. |
| Market data | Scope-specific | Depends on whether the system validates prices or subscribes to order status streams. |
| Withdrawals or transfers | Do not grant | Not needed for execution software and should stay outside the system. |
| Admin or account owner access | Avoid | Deployment access and account control should remain with the client. |

## Practical controls

- Use IP allowlists when the platform supports them.
- Separate paper, test, and live credentials.
- Store secrets in environment variables or a managed secret store, not in source code.
- Rotate credentials after contractor access or deployment handoff.
- Disable unused permissions after validation.
- Keep an audit log for every signal, rejected action, order request, and alert.

## Handoff expectations

At delivery time, the client should know:

- Where credentials are configured.
- How to rotate or disable credentials.
- Which permissions are required for the current system.
- Which permissions are explicitly not required.
- How the system behaves when authorization fails.

SignalCraft Labs does not need withdrawal permissions, does not custody funds, and does not request full account control for standard delivery.

