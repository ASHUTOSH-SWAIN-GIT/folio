import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blueprints",
  description: "System architecture sketches and design thinking, drawn in Excalidraw.",
};

export default function BlueprintsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
