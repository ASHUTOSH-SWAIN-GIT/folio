const eventTypes = new Set(["visit", "pageview", "engaged"]);

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { type?: string; path?: string } | null;
  if (!body?.type || !eventTypes.has(body.type) || !body.path?.startsWith("/") || body.path.length > 160) {
    return Response.json({ error: "Invalid event" }, { status: 400 });
  }

  const baseUrl = process.env.PROMETHEUS_BASE_URL?.replace(/\/$/, "");
  const token = process.env.PROMETHEUS_API_TOKEN;
  if (!baseUrl || !token) return new Response(null, { status: 204 });

  try {
    const response = await fetch(`${baseUrl}/analytics/event`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type: body.type, path: body.path }),
      cache: "no-store",
      signal: AbortSignal.timeout(3000),
    });

    if (!response.ok) throw new Error("Collector rejected event");
  } catch {
    return new Response(null, { status: 202 });
  }

  return new Response(null, { status: 204 });
}
