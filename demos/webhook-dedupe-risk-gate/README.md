# Webhook De-duplication and Risk Gate Demo

This demo shows a dry-run implementation pattern for TradingView-style webhook execution:

- Validate a shared secret.
- Normalize alert payloads.
- Create a stable event id.
- Reject duplicate events.
- Enforce cooldown, quantity, and allowlist rules.
- Produce audit logs without sending any live order.

Run:

```bash
node index.js
```

The demo uses `sample-alerts.json` and only prints local dry-run events.

