import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-center">
      <h2 className="text-4xl font-bold">404</h2>
      <p className="text-[color:var(--muted)]">Page not found.</p>
      <Link href="/" className="text-[color:var(--accent)] hover:text-[color:var(--foreground)] underline underline-offset-4">
        Return Home
      </Link>
    </div>
  );
}
