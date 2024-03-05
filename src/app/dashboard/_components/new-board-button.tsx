"use client";

import { useUser } from "@/context/user-context";
import { cn, getRandomBoardImage, getRandomId } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface NewBoardButtonProps {
  teamId: string;
  disabled?: boolean;
}

export default function NewBoardButton({
  teamId,
  disabled,
}: NewBoardButtonProps) {
  const router = useRouter();
  const pending = false;
  const { currentUser, activeTeam, addBoard } = useUser();

  const handleAddBoard = () => {
    if (!activeTeam) return;

    const id = getRandomId();
    addBoard({
      id,
      authorId: currentUser.id,
      authorName: currentUser.name,
      teamId: activeTeam,
      title: "Untitled",
      createdAt: new Date().toISOString(),
      isFavorite: false,
      imageUrl: getRandomBoardImage(),
    });

    toast.success("Board created successfully!");
    router.push(`/board/${id}`);
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
