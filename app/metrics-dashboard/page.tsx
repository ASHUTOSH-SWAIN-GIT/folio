import type { Metadata } from "next";
import { cookies } from "next/headers";
import MetricsLogin from "@/components/MetricsLogin";
import PrivateMetricsDashboard from "@/components/PrivateMetricsDashboard";
import { dashboardCookieName, verifyDashboardSession } from "@/lib/dashboard-auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Private Metrics",
  robots: { index: false, follow: false },
};

export default async function MetricsDashboardPage() {
  const cookieStore = await cookies();
  const authenticated = verifyDashboardSession(cookieStore.get(dashboardCookieName)?.value);
  return authenticated ? <PrivateMetricsDashboard /> : <MetricsLogin />;
}
