"use client";

import Image from "next/image";
import Link from "next/link";
import Overlay from "./overlay";

import { formatDistanceToNow } from "date-fns";
import Footer from "./footer";
import Actions from "@/components/actions";
import { MoreHorizontal } from "lucide-react";

interface BoardCardProps {
  board: Board;
}

export default function BoardCard({ board }: BoardCardProps) {
  const { id, title, authorId, authorName, createdAt, isFavorite } = board;
  const authorLabel = authorId === "userId" ? "You" : authorName;
  const createdAtLabel = formatDistanceToNow(createdAt, {
    addSuffix: true,
  });

  return (
    <Link href={`/board/${id}`}>
      <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
        <div className="relative flex-1 bg-blue-100">
          <Image
            src={board.imageUrl}
            alt={title}
            className="object-fill"
            fill
          />
          <Overlay />
          <Actions id={id} title={title} side="right">
            <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
              <MoreHorizontal className="text-white opacity-75 hover:opacity-100 transition-opacity" />
            </button>
          </Actions>
        </div>
        <Footer
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          onClick={() => {}}
          isFavorite={isFavorite}
          disabled={false}
        />
      </div>
    </Link>
  );
}
