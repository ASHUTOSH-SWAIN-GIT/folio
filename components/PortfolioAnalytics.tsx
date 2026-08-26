"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const visitKey = "folio_visit_started";
const engagedKey = "folio_visit_engaged";

function sendEvent(type: "visit" | "pageview" | "engaged", path: string) {
  const body = JSON.stringify({ type, path });
  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/analytics", new Blob([body], { type: "application/json" }));
    return;
  }

  void fetch("/api/analytics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  });
}

export default function PortfolioAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/metrics-dashboard")) return;

    sendEvent("pageview", pathname);
    if (!sessionStorage.getItem(visitKey)) {
      sessionStorage.setItem(visitKey, "1");
      sendEvent("visit", pathname);
    }

    if (sessionStorage.getItem(engagedKey)) return;
    const timer = window.setTimeout(() => {
      sessionStorage.setItem(engagedKey, "1");
      sendEvent("engaged", pathname);
    }, 10_000);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  return null;
}
