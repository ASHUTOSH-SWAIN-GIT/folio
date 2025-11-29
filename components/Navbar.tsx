import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center py-8 mb-16">
      <Link href="/" className="text-xl font-bold font-mono hover:text-gray-300 transition-colors">
        LowKeyDev
      </Link>
      <div className="flex gap-6 text-sm font-medium">
        <Link href="/" className="hover:text-gray-300 transition-colors">
          Home
        </Link>
        <Link href="/projects" className="hover:text-gray-300 transition-colors">
          Projects
        </Link>
        <Link href="/blog" className="hover:text-gray-300 transition-colors">
          Blog
        </Link>
      </div>
    </nav>
  );
}

