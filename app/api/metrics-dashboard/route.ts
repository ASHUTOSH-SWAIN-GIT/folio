import { cookies } from "next/headers";
import { dashboardCookieName, verifyDashboardSession } from "@/lib/dashboard-auth";
import { getMetricsSnapshot } from "@/lib/prometheus";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const cookieStore = await cookies();
  if (!verifyDashboardSession(cookieStore.get(dashboardCookieName)?.value)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const values = await getMetricsSnapshot();
    return Response.json(
      { values, checkedAt: new Date().toISOString() },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return Response.json({ error: "Metrics backend unavailable" }, { status: 503 });
  }
}
