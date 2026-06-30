# Reference Architecture

This document summarizes common architecture patterns used in automated trading execution projects. It is intentionally platform-neutral and uses anonymized examples.

## TradingView webhook workflow

```text
TradingView Alert
  -> HTTPS webhook endpoint
  -> secret/signature check
  -> schema normalization
  -> duplicate and cooldown check
  -> risk gate
  -> dry-run or order router
  -> audit log
  -> Telegram or email alert
```

Key implementation notes:

- The webhook payload should include strategy name, symbol, action, quantity, timestamp, and a shared secret.
- Duplicate prevention should use a stable event id such as `strategy:symbol:action:bar_time`.
- Cooldown and idempotency should be checked before any order request is prepared.
- Order routing should be disabled by default until dry-run, paper, or small-scope validation passes.

## Broker API workflow

```text
Signal or portfolio rule
  -> account and permission check
  -> position and cash snapshot
  -> order plan
  -> optional manual confirmation
  -> broker API request
  -> execution report sync
  -> audit log and alert
```

Broker projects usually depend on account-specific permissions, regional availability, order type support, trading hours, and the broker's own risk controls. The system must log both accepted and rejected actions.

## Exchange API workflow

```text
Strategy event
  -> API key scope check
  -> precision and symbol metadata
  -> risk gate
  -> order request
  -> websocket or polling status sync
  -> retry or pause policy
  -> audit log and alert
```

Exchange projects should account for request limits, symbol precision, stale prices, partial fills, market closures, websocket gaps, and API outages.

## FIX API workflow

```text
Order intent
  -> pre-trade risk gate
  -> FIX session state check
  -> NewOrderSingle / CancelRequest
  -> ExecutionReport / Reject handling
  -> raw message archive
  -> normalized audit log
```

FIX projects require special attention to session heartbeats, sequence numbers, certificates, UAT environments, custom tags, and counterparty acceptance tests.

## Logging fields

Recommended audit fields:

- `event_id`
- `received_at`
- `source`
- `symbol`
- `action`
- `quantity`
- `risk_decision`
- `risk_reason`
- `router_mode`
- `external_order_id`
- `latency_ms`
- `operator`
- `environment`

These fields make delivery review and incident analysis possible without exposing customer identity or strategy details.

