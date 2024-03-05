"use client";

import { useSelf } from "@/liveblocks.config";
import Info from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";

interface CanvasProps {
  boardId: string;
}

export default function Canvas({ boardId }: CanvasProps) {
  const info = useSelf();
  console.log(info);
  return (
    <div className="h-full w-full relative bg-neutral-200 touch-none">
      <Info />
      <Participants />
      <Toolbar />
    </div>
  );
}
