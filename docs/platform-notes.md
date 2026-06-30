# Platform Implementation Notes

These notes describe common engineering considerations. They are not official platform documentation and may become outdated when a platform changes its API.

## IBKR

Common topics:

- TWS Gateway or Client Portal selection.
- Account permissions and market data subscriptions.
- Trading hours and product-specific order support.
- Connection stability, reconnect behavior, and account session handling.
- Rejection codes, unavailable order types, and stale position snapshots.

Validation focus:

- Connection recovery after restart.
- Order, cancel, and execution report logs.
- Position synchronization after partial fills.
- Manual pause behavior before order routing.

## Schwab

Common topics:

- OAuth authorization and token refresh.
- Application review and account visibility.
- Account, order, and portfolio API availability.
- Regional or account-type constraints.
- Authorization expiration and reauthorization flow.

Validation focus:

- Token expiration handling.
- Read-only portfolio sync before order workflow.
- Order permission and account scope checks.
- Clear alerts when authorization fails.

## Alpaca

Common topics:

- Paper trading and live environment separation.
- REST requests for orders and account state.
- WebSocket streams for order status or market events.
- API key scope, data subscription, and rate limits.
- Market session and asset availability.

Validation focus:

- Paper environment dry-run before live.
- WebSocket reconnect and missed event reconciliation.
- Rate-limit handling.
- Order status consistency between REST and stream events.

## FIX API

Common topics:

- FIX version and counterparty rules.
- SenderCompID, TargetCompID, certificates, and network access.
- Heartbeat, sequence number, reset, and reconnect behavior.
- NewOrderSingle, CancelRequest, ExecutionReport, and Reject mapping.
- UAT environment and counterparty acceptance scripts.

Validation focus:

- Logon, heartbeat, logout, and reconnect.
- Sequence reset and message recovery.
- Raw message archive.
- Standardized rejection and execution state logs.

