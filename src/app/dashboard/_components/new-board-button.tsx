"use client";

import { useUser } from "@/context/user-context";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { toast } from "sonner";

interface NewBoardButtonProps {
  projectId: string;
  disabled?: boolean;
}

export default function NewBoardButton({
  projectId,
  disabled,
}: NewBoardButtonProps) {
  const pending = false;
  const { activeTeam, addBoard } = useUser();

  const handleAddBoard = () => {
    if (!activeTeam) return;

    addBoard({
      id: "1",
      authorId: "1",
      authorName: "user",
      projectId: activeTeam,
      title: "Untitled",
      createdAt: new Date().toISOString(),
      isFavorite: false,
      imageUrl: "",
    });

    toast.success("Board created successfully!");
    //TODO: Redirect to board/{id}
  };

  return (
    <button
      disabled={disabled}
      onClick={handleAddBoard}
      className={cn(
        "col-span-1 aspect-[100/127] bg-indigo-600 rounded-lg hover:bg-indigo-800 flex flex-col items-center justify-center py-6",
        (pending || disabled) &&
          "opacity-75 hover:bg-indigo-600 cursor-not-allowed"
      )}
    >
      <div />
      <Plus className="h-12 w-12 text-white stroke-1" />
      <p className="text-xs text-white font-light">New board</p>
    </button>
  );
}
