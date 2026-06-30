# SignalCraft Labs Engineering Notes

Public engineering notes and anonymized delivery examples for SignalCraft Labs.

Website: https://pddjf.com/

SignalCraft Labs builds automated trading execution systems and trading API workflows for clients who already have rules, API access, and risk boundaries. These notes show the engineering style behind the work: webhook parsing, duplicate prevention, risk gates, API permission boundaries, logs, alerts, and private deployment handoff.

## What is included

- A runnable dry-run demo for TradingView-style webhook de-duplication and pre-trade risk checks.
- Reference architecture notes for webhook, broker API, exchange API, and FIX API workflows.
- API key permission guidance that avoids withdrawal or custody permissions.
- Acceptance checklists for source delivery, logs, alerts, deployment, and grey release.
- Platform notes for IBKR, Schwab, Alpaca, and FIX API projects.

## What is not included

- No customer data, account identifiers, API keys, order history, or private strategy parameters.
- No investment advice, signal service, stock recommendation, managed account service, or profit claim.
- No claim of partnership, endorsement, or authorization from TradingView, Interactive Brokers, Schwab, Alpaca, any exchange, or any FIX venue.

## Start with the demo

```bash
node demos/webhook-dedupe-risk-gate/index.js
```

Expected output is a set of dry-run audit events showing accepted signals, duplicate rejections, permission failures, and risk rejections. It does not connect to any broker or exchange.

## Useful documents

- [Reference architecture](docs/reference-architecture.md)
- [API key permission safety](docs/api-key-permissions.md)
- [Delivery acceptance checklist](docs/acceptance-checklist.md)
- [Platform implementation notes](docs/platform-notes.md)
- [LinkedIn profile and post drafts](docs/linkedin-drafts.md)

## Service boundary

SignalCraft Labs provides software development and system handoff only. Clients make their own trading decisions, keep custody of funds, control API keys, and accept all market, platform, account, and infrastructure risks.

