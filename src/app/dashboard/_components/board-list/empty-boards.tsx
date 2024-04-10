"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/user-context";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function EmptyBoards() {
  const router = useRouter();
  const { createNewBoard } = useUser();

  const handleAddBoard = async () => {
    const id = await createNewBoard();
    if (id) {
      toast.success("Board created successfully!");
      router.push(`/board/${id}`);
    } else {
      toast.error("Something went wrong");
    }
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
