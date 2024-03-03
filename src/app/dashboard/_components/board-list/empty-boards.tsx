"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/context/user-context";
import Image from "next/image";
import { toast } from "sonner";

export default function EmptyBoards() {
  const { addBoard, activeTeam } = useUser();

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
    <div className="h-full flex flex-col items-center justify-center">
      <Image
        src="/empty-boards.svg"
        alt="Empty Board"
        width={140}
        height={140}
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
