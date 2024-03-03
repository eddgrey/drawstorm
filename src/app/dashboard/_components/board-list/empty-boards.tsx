import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function EmptyBoards() {
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
        <Button size="lg">Create a board</Button>
      </div>
    </div>
  );
}
