import { getObservabilitySnapshot } from "@/lib/prometheus";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const snapshot = await getObservabilitySnapshot();

  return Response.json(
    { ...snapshot, checkedAt: new Date().toISOString() },
    { headers: { "Cache-Control": "no-store" } },
  );
}
