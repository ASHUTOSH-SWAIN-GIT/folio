export type Project = {
  title: string;
  description: string;
  link: string;
  demo?: string;
  tags: string[];
  year: string;
  status?: string;
  kind?: "systems" | "infra" | "product" | "tool";
  featured?: boolean;
};

export type Blog = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  link?: string;
};

export type Experience = {
  company: string;
  role: string;
  focus: string;
  timeframe: string;
  image?: string;
  link?: string;
};

export const projects: Project[] = [
  {
    title: "skyforge",
    description:
      "A collaborative database schema design tool. Design, visualize, and share schemas with real-time collaboration over ER diagrams.",
    link: "https://github.com/ASHUTOSH-SWAIN-GIT/skyforge",
    demo: "https://skyforge.lowkeydev.me/",
    tags: ["Next.js", "TypeScript", "Go", "Database"],
    year: "2025",
    status: "Active",
    kind: "product",
    featured: true,
  },
  {
    title: "casper",
    description:
      "An MCP server that gives agents a live, queryable view of your Terraform infrastructure. Graph queries, drift detection, policy gates and blast-radius simulation before apply.",
    link: "https://github.com/ASHUTOSH-SWAIN-GIT/casper-mcp",
    demo: "https://casper.lowkeydev.me/",
    tags: ["Go", "MCP", "Terraform", "Infra"],
    year: "2026",
    status: "Active",
    kind: "infra",
    featured: true,
  },
  {
    title: "maxim",
    description:
      "A TUI for managing local databases. Browse schemas, run queries, edit rows without leaving the terminal. Built on Bubble Tea.",
    link: "https://github.com/ASHUTOSH-SWAIN-GIT/maxim",
    tags: ["Go", "Bubble Tea", "TUI", "CLI"],
    year: "2026",
    kind: "tool",
    featured: true,
  },
  {
    title: "coja",
    description:
      "A full-text search engine written in Go. Inverted indexes, tokenization, ranking. Built from scratch to understand how Lucene-style search actually works.",
    link: "https://github.com/ASHUTOSH-SWAIN-GIT/coja",
    tags: ["Go", "Search", "Systems Programming"],
    year: "2026",
    kind: "systems",
  },
  {
    title: "kansi",
    description:
      "A ZooKeeper-style coordination service implemented in Go. Distributed consensus, ephemeral nodes, watches. Exploring the primitives behind every distributed system you depend on.",
    link: "https://github.com/ASHUTOSH-SWAIN-GIT/Kansi",
    tags: ["Go", "Distributed Systems", "Consensus"],
    year: "2026",
    kind: "systems",
  },
  {
    title: "golancer",
    description:
      "A high-performance HTTP load balancer in Go. Round-robin balancing, active health checks, connection tracking, graceful failover.",
    link: "https://github.com/ASHUTOSH-SWAIN-GIT/golancer",
    tags: ["Go", "Load Balancing", "Networking"],
    year: "2026",
    kind: "systems",
  },
  {
    title: "torrent",
    description:
      "A BitTorrent client written in Go. Bencode parsing, peer protocol, piece selection, swarm orchestration. Read the spec, shipped the bytes.",
    link: "https://github.com/ASHUTOSH-SWAIN-GIT/torrent",
    tags: ["Go", "P2P", "Networking"],
    year: "2026",
    kind: "systems",
  },
  {
    title: "godis",
    description:
      "A Redis-compatible in-memory key-value store built from scratch in Go. RESP protocol, expiry, pub/sub primitives.",
    link: "https://github.com/ASHUTOSH-SWAIN-GIT/godis",
    tags: ["Go", "Redis", "Database"],
    year: "2025",
    kind: "systems",
  },
  {
    title: "godht",
    description:
      "A Distributed Hash Table using the Kademlia protocol. XOR distance, k-buckets, peer discovery. The substrate behind every serious P2P network.",
    link: "https://github.com/ASHUTOSH-SWAIN-GIT/godht",
    tags: ["Go", "DHT", "P2P"],
    year: "2025",
    kind: "systems",
  },
  {
    title: "dahmer",
    description:
      "A tiny CLI to kill whatever process is hogging a port. One command, zero ceremony.",
    link: "https://github.com/ASHUTOSH-SWAIN-GIT/dahmer",
    tags: ["Go", "CLI"],
    year: "2026",
    kind: "tool",
  },
  {
    title: "zora",
    description:
      "A CLI to download specific folders from public GitHub repositories without cloning the whole project. Fast, single-binary, zero-config.",
    link: "https://github.com/ASHUTOSH-SWAIN-GIT/zora",
    tags: ["Go", "CLI", "Git"],
    year: "2026",
    kind: "tool",
  },
  {
    title: "shortify",
    description:
      "A URL shortener in Go. Custom slug support, click tracking, sane defaults. Small enough to read end-to-end in one sitting.",
    link: "https://github.com/ASHUTOSH-SWAIN-GIT/shortify",
    tags: ["Go", "Web API"],
    year: "2025",
    kind: "systems",
  },
  {
    title: "podstore",
    description:
      "A Riverside.fm-style platform for recording high-quality video call sessions. Local recording per participant, then uploaded server-side.",
    link: "https://github.com/ASHUTOSH-SWAIN-GIT/podstore",
    demo: "https://held-icecream-bca.notion.site/RIVERSIDE-CLONE-PROJECT-POW-23e11bbd1f3d8002acded7256497f9af",
    tags: ["Next.js", "TypeScript", "WebRTC", "Multimedia"],
    year: "2025",
    kind: "product",
  },
];

export const blogs: Blog[] = [
  {
    slug: "bittorrent-protocol",
    title: "BitTorrent Protocol",
    date: "2025",
    excerpt:
      "An overview of the BitTorrent protocol, its peer-to-peer architecture, and how data flows across the swarm.",
    link: "https://medium.com/@ashutoshswain7383/bittorrent-protocol-4463bcb1953a",
  },
  {
    slug: "understanding-googles-borg",
    title: "Understanding Google's Borg",
    date: "2024",
    excerpt:
      "A deep dive into Google's cluster management system that inspired Kubernetes.",
    link: "https://lowkeydev.hashnode.dev/understanding-googles-borg",
  },
  {
    slug: "understanding-amazons-dynamodb-architecture",
    title: "Understanding Amazon's DynamoDB Architecture",
    date: "2024",
    excerpt:
      "Exploring the distributed key-value store that powers Amazon's massive scale.",
    link: "https://medium.com/@ashutoshswain7383/understanding-amazons-dynamodb-architecture-babf95f1f7a0",
  },
];

export const experience: Experience[] = [
  {
    company: "Commenda",
    role: "Software Engineering Intern",
    focus: "Backend and observability.",
    timeframe: "2026 · 6 months",
    image: "/images/commenda.jpeg",
    link: "https://www.commenda.io/",
  },
];

export const stack = {
  daily: ["Go", "TypeScript", "Next.js", "Postgres", "Terraform"],
  exploring: ["Distributed Systems", "MCP", "Observability"],
};

export const nowBuilding = "casper, an MCP server for live Terraform infrastructure context.";
