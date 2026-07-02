import { WorldManager } from "@/components/webgl/WorldManager";
import { HTMLOverlay } from "@/components/ui/HTMLOverlay";
import { AudioController } from "@/components/audio/AudioController";

export default function Home() {
  return (
    <main className="relative bg-black min-h-screen text-white selection:bg-amber-500/30 selection:text-amber-200 antialiased overflow-x-hidden">
      <WorldManager />
      <HTMLOverlay />
      <AudioController />
    </main>
  );
}
