import { 
  SiGo, 
  SiRedis, 
  SiNextdotjs, 
  SiReact, 
  SiTailwindcss, 
  SiTypescript, 
  SiWebrtc,
  SiGit 
} from "react-icons/si";
import { 
  Scale, 
  Activity, 
  Network, 
  Coffee, 
  Terminal, 
  TerminalSquare, 
  Database, 
  Cpu, 
  Share2, 
  Server, 
  Users, 
  Globe, 
  DollarSign, 
  Video,
  Zap,
  Code
} from "lucide-react";
import type { ComponentType } from "react";

type IconComponent = ComponentType<{ size?: number; className?: string }>;

const iconMap: Record<string, IconComponent> = {
  "Go": SiGo,
  "Load Balancing": Scale,
  "Concurrency": Activity,
  "Networking": Network,
  "Bubble Tea": Coffee,
  "TUI": Terminal,
  "CLI": TerminalSquare,
  "SQL": Database,
  "Redis": SiRedis,
  "Database": Database,
  "Systems Programming": Cpu,
  "Distributed Systems": Share2,
  "Backend": Server,
  "P2P": Users,
  "DHT": Network,
  "Web API": Globe,
  "Next.js": SiNextdotjs,
  "React": SiReact,
  "Tailwind CSS": SiTailwindcss,
  "Finance": DollarSign,
  "TypeScript": SiTypescript,
  "WebRTC": SiWebrtc,
  "Multimedia": Video,
  "Git": SiGit,
  "Productivity": Zap,
};

export default function TechBadge({ tag }: { tag: string }) {
  const Icon = iconMap[tag] || Code; // Default to Code icon

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-medium leading-none text-white/90 transition-colors hover:bg-white hover:text-black sm:text-xs">
      <Icon size={13} className="shrink-0" />
      {tag}
    </span>
  );
}
