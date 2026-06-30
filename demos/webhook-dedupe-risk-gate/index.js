const fs = require("node:fs");
const path = require("node:path");

const config = {
  sharedSecret: "demo-secret",
  allowedSymbols: new Set(["BTCUSDT", "ETHUSDT"]),
  maxQuantityBySymbol: {
    BTCUSDT: 0.1,
    ETHUSDT: 1
  },
  cooldownMs: 60_000,
  mode: "dry-run"
};

const seenEventIds = new Set();
const lastAcceptedAt = new Map();

function eventId(alert) {
  return [alert.strategy, alert.symbol, alert.action, alert.barTime].join(":");
}

function normalizeAlert(alert) {
  return {
    secret: String(alert.secret || ""),
    strategy: String(alert.strategy || "unknown"),
    symbol: String(alert.symbol || "").toUpperCase(),
    action: String(alert.action || "").toLowerCase(),
    quantity: Number(alert.quantity),
    barTime: String(alert.barTime || "")
  };
}

function reject(reason, alert, extra = {}) {
  return {
    event: "signal.rejected",
    reason,
    event_id: eventId(alert),
    symbol: alert.symbol,
    action: alert.action,
    quantity: alert.quantity,
    ...extra
  };
}

function accept(alert) {
  const id = eventId(alert);
  seenEventIds.add(id);
  lastAcceptedAt.set(`${alert.symbol}:${alert.action}`, Date.parse(alert.barTime));

  return {
    event: "order.prepared",
    mode: config.mode,
    event_id: id,
    symbol: alert.symbol,
    action: alert.action,
    quantity: alert.quantity,
    route: "demo-router",
    note: "dry-run only; no broker or exchange request was sent"
  };
}

function evaluate(alert) {
  const normalized = normalizeAlert(alert);
  const id = eventId(normalized);

  if (normalized.secret !== config.sharedSecret) {
    return reject("invalid_secret", normalized);
  }

  if (seenEventIds.has(id)) {
    return reject("duplicate_event", normalized);
  }

  if (!config.allowedSymbols.has(normalized.symbol)) {
    return reject("symbol_not_allowed", normalized);
  }

  if (!Number.isFinite(normalized.quantity) || normalized.quantity <= 0) {
    return reject("invalid_quantity", normalized);
  }

  const maxQuantity = config.maxQuantityBySymbol[normalized.symbol];
  if (normalized.quantity > maxQuantity) {
    return reject("quantity_exceeds_limit", normalized, { max_quantity: maxQuantity });
  }

  const key = `${normalized.symbol}:${normalized.action}`;
  const previous = lastAcceptedAt.get(key);
  const current = Date.parse(normalized.barTime);
  if (Number.isFinite(previous) && Number.isFinite(current) && current - previous < config.cooldownMs) {
    return reject("cooldown_active", normalized, { cooldown_ms: config.cooldownMs });
  }

  return accept(normalized);
}

function main() {
  const samplePath = path.join(__dirname, "sample-alerts.json");
  const alerts = JSON.parse(fs.readFileSync(samplePath, "utf8"));

  for (const alert of alerts) {
    const result = evaluate(alert);
    console.log(JSON.stringify(result));
  }
}

main();

