"use client";

import { useUser } from "@/context/user-context";
import BoardList from "./_components/board-list";
import EmtpyTeam from "./_components/board-list/empty-team";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface DashboardPageProps {
  searchParams: {
    search?: string;
    favorite?: string;
  };
}

export default function DashboardPage({ searchParams }: DashboardPageProps) {
  const router = useRouter();
  const { activeTeam, currentUser } = useUser();

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    }
  }, [currentUser, router]);

  return (
    <div className="flex-1 h-[calc(100%-80px)] p-6">
      {!activeTeam ? (
        <EmtpyTeam />
      ) : (
        <BoardList teamId={activeTeam} query={searchParams} />
      )}
    </div>
  );
}
