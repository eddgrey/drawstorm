"use client";

import EmptyBoards from "./empty-boards";
import EmptyFavorites from "./empty-favorites";
import EmptySearch from "./empty-search";
import BoardCard from "../board-card";
import NewBoardButton from "../new-board-button";
import BoardCardSkeleton from "../board-card/skeleton";
import { useEffect, useState } from "react";
import { useUser } from "@/context/user-context";
import {
  getBoardsBySearch,
  getBoardsByTeamId,
  getUserFavoriteBoards,
} from "@/lib/supabase/queries";

interface BoardListProps {
  teamId: string;
  query: {
    search?: string;
    favorites?: string;
  };
}

export default function BoardList({ teamId, query }: BoardListProps) {
  const { boards, activeTeam } = useUser();
  const [teamBoards, setTeamBoards] = useState<Board[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (query.search && boards) {
      getBoardsBySearch(teamId, query.search).then((boards) => {
        setTeamBoards(boards);
        setIsLoading(false);
      });
    } else if (query.favorites) {
      getUserFavoriteBoards(teamId).then((boards) => {
        setTeamBoards(boards);
        setIsLoading(false);
      });
    } else {
      getBoardsByTeamId(teamId).then((boards) => {
        setTeamBoards(boards);
        setIsLoading(false);
      });
    }
  }, [query, teamId, boards, activeTeam]);

  if (isLoading) {
    return (
      <div>
        <h2 className="text-3xl">
          {query.favorites ? "Favorite boards" : "Team Boards"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
          <NewBoardButton teamId="" disabled />
          <BoardCardSkeleton />
          <BoardCardSkeleton />
          <BoardCardSkeleton />
          <BoardCardSkeleton />
        </div>
      </div>
    );
  }

  if (!teamBoards?.length && query.search) {
    return <EmptySearch />;
  }

  if (!teamBoards?.length && query.favorites) {
    return <EmptyFavorites />;
  }

  if (!teamBoards?.length) {
    return <EmptyBoards />;
  }

  return (
    <div>
      <h2 className="text-3xl">
        {query.search
          ? `${teamBoards.length} ${
              teamBoards.length > 1 ? "results" : "result"
            } found`
          : query.favorites
          ? "Favorite boards"
          : "Team Boards"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
        {query.search || query.favorites ? null : <NewBoardButton teamId="" />}
        {teamBoards.map((board) => (
          <BoardCard key={board.id} board={board} />
        ))}
      </div>
    </div>
  );
}
