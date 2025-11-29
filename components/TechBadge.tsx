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

const iconMap: Record<string, any> = {
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
    <span className="flex items-center gap-1.5 text-xs font-medium text-gray-300 bg-gray-900/80 border border-gray-800 px-2.5 py-1 rounded-md transition-colors hover:bg-gray-800 hover:text-white hover:border-gray-700">
      <Icon size={14} className="shrink-0" />
      {tag}
    </span>
  );
}

