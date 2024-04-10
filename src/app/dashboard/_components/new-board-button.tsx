"use client";

import { useUser } from "@/context/user-context";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface NewBoardButtonProps {
  teamId: string;
  disabled?: boolean;
}

export default function NewBoardButton({ disabled }: NewBoardButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { createNewBoard } = useUser();

  const handleAddBoard = async () => {
    setIsLoading(true);
    const id = await createNewBoard();

    if (id) {
      toast.success("Board created successfully!");
      router.push(`/board/${id}`);
    } else {
      toast.error("Something went wrong");
      setIsLoading(false);
    }
  };

  return (
    <button
      disabled={disabled}
      onClick={handleAddBoard}
      className={cn(
        "col-span-1 aspect-[100/127] bg-indigo-600 rounded-lg hover:bg-indigo-800 flex flex-col items-center justify-center py-6",
        (isLoading || disabled) &&
          "opacity-75 hover:bg-indigo-600 cursor-not-allowed"
      )}
    >
      <div />
      <Plus className="h-12 w-12 text-white stroke-1" />
      <p className="text-xs text-white font-light">New board</p>
    </button>
  );
}
