"use client";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/user-context";
import { getBoardById } from "@/lib/supabase/queries";
import { cn } from "@/lib/utils";
import { useRenameModal } from "@/store/use-rename-modal";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface InfoProps {
  boardId: string;
}

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

function TabSeparator() {
  return <div className="text-slate-300 px-1.5" />;
}

export function Info({ boardId }: InfoProps) {
  const { boards } = useUser();
  const { onOpen } = useRenameModal();
  const [board, setBoard] = useState<Board | null>(null);

  useEffect(() => {
    getBoardById(boardId).then((board) => setBoard(board));
  }, [boardId, boards]);

  if (!board) return <InfoSkeleton />;

  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
      <Hint label="Go to dashboard" side="bottom" sideOffset={10}>
        <Button asChild variant="board" className="px-2">
          <Link href="/dashboard">
            <Image
              src="/logo.svg"
              alt="DrawStorm Logo"
              height={40}
              width={40}
            />
            <span
              className={cn(
                "font-semibold text-xl ml-2 text-black",
                font.className
              )}
            >
              DrawStorm
            </span>
          </Link>
        </Button>
      </Hint>
      <TabSeparator />
      <Hint label="Edit title" side="bottom" sideOffset={10}>
        <Button
          onClick={() => onOpen(board.id, board.title)}
          variant="board"
          className="text-base font-normal px-2"
        >
          {board.title}
        </Button>
      </Hint>
      <TabSeparator />
      {/* <Actions id={board.id} title={board.title}>
        <div>
          <Hint label="Main menu" side="bottom" sideOffset={10}>
            <Button size="icon" variant="board">
              <Menu />
            </Button>
          </Hint>
        </div>
      </Actions> */}
    </div>
  );
}

export function InfoSkeleton() {
  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 items-center shadow-md w-[300px]" />
  );
}
