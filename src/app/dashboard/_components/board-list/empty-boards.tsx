"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/user-context";
import { getRandomBoardImage, getRandomId } from "@/lib/utils";
import { toast } from "sonner";

export default function EmptyBoards() {
  const { currentUser, addBoard, activeTeam } = useUser();

  const handleAddBoard = () => {
    if (!activeTeam) return;
    addBoard({
      id: getRandomId(),
      authorId: currentUser.id,
      authorName: currentUser.name,
      teamId: activeTeam,
      title: "Untitled",
      createdAt: new Date().toISOString(),
      isFavorite: false,
      imageUrl: getRandomBoardImage(),
    });

    toast.success("Board created successfully!");
    //TODO: Redirect to board/{id}
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image
        src="/empty-boards.svg"
        alt="Empty Board"
        width={110}
        height={110}
      />
      <h2 className="text-2xl font-semibold mt-6">Create your first board!</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Start by creating a board for your project
      </p>
      <div className="mt-6">
        <Button size="lg" onClick={handleAddBoard}>
          Create a board
        </Button>
      </div>
    </div>
  );
}
