"use client";

import { getRandomBoardImage } from "@/lib/utils";
import { ReactNode, createContext, useContext, useState } from "react";

interface UserContextData {
  teams: Team[];
  boards: Board[];
  activeTeam: string;
  addTeam: (team: Team) => void;
  addBoard: (board: Board) => void;
  selectTeam: (id: string) => void;
  getBoardsByProjectId: (projectId: string) => Board[];
}

const UserContext = createContext<UserContextData | undefined>(undefined);

export function UserContextProvider({ children }: { children: ReactNode }) {
  const initialValues: Team[] = [
    {
      id: "1",
      name: "FrontEnd",
    },
    {
      id: "2",
      name: "BackEnd",
    },
  ];
  const [teams, setTeams] = useState(initialValues);
  const [activeTeam, setActiveTeam] = useState(teams[0].id);
  const addTeam = (team: Team) => setTeams([...teams, team]);
  const selectTeam = (id: string) => setActiveTeam(id);

  // boards

  const [boards, setBoards] = useState<Board[]>([]);

  const addBoard = (board: Board) => {
    const randomImageUrl = getRandomBoardImage();

    setBoards([...boards, { ...board, imageUrl: randomImageUrl }]);
  };

  const getBoardsByProjectId = (projectId: string) => {
    return boards.filter((board) => board.projectId === projectId);
  };

  return (
    <UserContext.Provider
      value={{
        teams,
        addTeam,
        activeTeam,
        selectTeam,
        boards,
        addBoard,
        getBoardsByProjectId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw Error("UserContextProvider required");
  }

  return context;
}
