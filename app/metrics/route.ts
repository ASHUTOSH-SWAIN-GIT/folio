import { collectMetrics } from "@/lib/metrics";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export function GET() {
  return new Response(collectMetrics(), {
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "text/plain; version=0.0.4; charset=utf-8",
    },
  });
}
