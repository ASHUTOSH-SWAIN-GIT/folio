import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";

export const dashboardCookieName = "folio_metrics_session";
const sessionLifetimeSeconds = 60 * 60 * 12;

function signature(expiresAt: string) {
  const secret = process.env.METRICS_SESSION_SECRET;
  if (!secret) return null;
  return createHmac("sha256", secret).update(expiresAt).digest("hex");
}

export function verifyDashboardPassword(password: string) {
  const expected = process.env.METRICS_DASHBOARD_PASSWORD;
  if (!expected) return false;

  const actualBuffer = Buffer.from(password);
  const expectedBuffer = Buffer.from(expected);
  return actualBuffer.length === expectedBuffer.length && timingSafeEqual(actualBuffer, expectedBuffer);
}

export function createDashboardSession() {
  const expiresAt = String(Math.floor(Date.now() / 1000) + sessionLifetimeSeconds);
  const signed = signature(expiresAt);
  return signed ? `${expiresAt}.${signed}` : null;
}

export function verifyDashboardSession(value?: string) {
  if (!value) return false;
  const [expiresAt, providedSignature] = value.split(".");
  if (!expiresAt || !providedSignature || Number(expiresAt) < Date.now() / 1000) return false;

  const expectedSignature = signature(expiresAt);
  if (!expectedSignature) return false;

  const actualBuffer = Buffer.from(providedSignature);
  const expectedBuffer = Buffer.from(expectedSignature);
  return actualBuffer.length === expectedBuffer.length && timingSafeEqual(actualBuffer, expectedBuffer);
}

export const dashboardSessionMaxAge = sessionLifetimeSeconds;
