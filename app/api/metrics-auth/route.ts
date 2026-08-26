import {
  createDashboardSession,
  dashboardCookieName,
  dashboardSessionMaxAge,
  verifyDashboardPassword,
} from "@/lib/dashboard-auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { password?: string } | null;

  if (!body?.password || !verifyDashboardPassword(body.password)) {
    return Response.json({ error: "Invalid password" }, { status: 401 });
  }

  const session = createDashboardSession();
  if (!session) {
    return Response.json({ error: "Dashboard authentication is not configured" }, { status: 503 });
  }

  const response = Response.json({ ok: true });
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  response.headers.append(
    "Set-Cookie",
    `${dashboardCookieName}=${session}; Path=/; HttpOnly${secure}; SameSite=Strict; Max-Age=${dashboardSessionMaxAge}`,
  );
  return response;
}

export function DELETE() {
  const response = Response.json({ ok: true });
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  response.headers.append(
    "Set-Cookie",
    `${dashboardCookieName}=; Path=/; HttpOnly${secure}; SameSite=Strict; Max-Age=0`,
  );
  return response;
}
