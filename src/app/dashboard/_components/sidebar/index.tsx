"use client";

import { Hint } from "@/components/hint";
import List from "./list";
import { Plus } from "lucide-react";
import { useCreateTeamModal } from "@/store/use-create-team-modal";

export default function Sidebar() {
  const { onOpen } = useCreateTeamModal();
  return (
    <aside className="fixed z-10 left-0 bg-indigo-950 h-full w-16 flex p-3 flex-col gap-y-4">
      <List />
      <Hint label="Create Team" side="right" align="start" sideOffset={18}>
        <button
          onClick={() => onOpen()}
          className="bg-white/25 aspect-square w-full rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition"
        >
          <Plus className="text-white" />
        </button>
      </Hint>
    </aside>
  );
}
