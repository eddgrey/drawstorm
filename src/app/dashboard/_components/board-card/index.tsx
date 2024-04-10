"use client";

import Image from "next/image";
import Link from "next/link";
import Overlay from "./overlay";

import { formatDistanceToNow } from "date-fns";
import Footer from "./footer";
import Actions from "@/components/actions";
import { MoreHorizontal } from "lucide-react";
import { useUser } from "@/context/user-context";
import { getBoardFavorite, toogleFavoriteBoard } from "@/lib/supabase/queries";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface BoardCardProps {
  board: Board;
}

export default function BoardCard({ board }: BoardCardProps) {
  const { boards, currentUser } = useUser();
  const { id, team_id, title, author_id, author_name, created_at } = board;

  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getBoardFavorite(id, team_id).then((board) => setIsFavorite(!!board));
  }, [id, team_id]);

  const authorLabel = currentUser?.id === author_id ? "You" : author_name;
  const createdAtLabel = formatDistanceToNow(created_at, {
    addSuffix: true,
  });

  const toogleFavorite = async () => {
    if (!boards) return;
    setIsLoading(true);
    await toogleFavoriteBoard(id, team_id);
    getBoardFavorite(id, team_id).then((board) => setIsFavorite(!!board));
    setIsLoading(false);
    router.refresh();
  };

  return (
    <Link href={`/board/${id}`}>
      <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
        <div className="relative flex-1 bg-blue-100">
          <Image
            src={board.image_url}
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
          onClick={toogleFavorite}
          isFavorite={isFavorite}
          disabled={isLoading}
        />
      </div>
    </Link>
  );
}
