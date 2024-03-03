"use client";

import { useUser } from "@/context/user-context";
import EmptyProject from "./_components/board-list/empty-project";
import BoardList from "./_components/board-list";

interface DashboardPageProps {
  searchParams: {
    search?: string;
    favorite?: string;
  };
}

export default function DashboardPage({ searchParams }: DashboardPageProps) {
  const { activeTeam } = useUser();
  return (
    <div className="bg-purple-200 flex-1 h-[calc(100%-80px)] p-6">
      {!activeTeam ? (
        <EmptyProject />
      ) : (
        <BoardList projectId={activeTeam} query={searchParams} />
      )}
    </div>
  );
}
