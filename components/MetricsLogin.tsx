"use client";

import { LockKeyhole } from "lucide-react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function MetricsLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    const response = await fetch("/api/metrics-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      setError(response.status === 401 ? "That password is not correct." : "Dashboard access is not configured.");
      setSubmitting(false);
      return;
    }

    router.refresh();
  }

  return (
    <div className="flex min-h-[58vh] items-center justify-center pb-16">
      <section className="w-full max-w-sm border-y border-hairline py-10">
        <LockKeyhole size={22} className="mb-7 text-accent" aria-hidden="true" />
        <p className="mb-2 font-mono text-xs uppercase text-subtle">Restricted telemetry</p>
        <h1 className="text-2xl font-semibold tracking-normal">Metrics access</h1>
        <form className="mt-8" onSubmit={submit}>
          <label htmlFor="metrics-password" className="mb-2 block text-xs text-muted">
            Dashboard password
          </label>
          <input
            id="metrics-password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="h-11 w-full border border-hairline-strong bg-transparent px-3 font-mono text-sm outline-none transition-colors focus:border-[color:var(--accent)]"
          />
          {error && <p className="mt-3 text-sm text-accent">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="mt-5 h-11 w-full bg-[color:var(--foreground)] px-4 text-sm text-[color:var(--background)] transition-opacity hover:opacity-85 disabled:opacity-50"
          >
            {submitting ? "Checking access" : "Open dashboard"}
          </button>
        </form>
      </section>
    </div>
  );
}
