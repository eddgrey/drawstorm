"use client";

import { fetchBoards, fetchTeams } from "@/lib/api";
import { getRandomId } from "@/lib/utils";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface UserContextData {
  currentUser: User;
  teams: Team[] | null;
  boards: Board[] | null;
  setBoards: Dispatch<SetStateAction<Board[] | null>>;
  activeTeam: string | null;
  createTeam: (name: string) => void;
  addBoard: (board: Board) => void;
  renameBoard: (boardId: string, newTitle: string) => void;
  selectTeam: (id: string) => void;
  getBoardsByTeamId: (teamId: string) => Board[] | null;
}

const UserContext = createContext<UserContextData | undefined>(undefined);

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User>({
    id: "b786ec72-71fe-415c-9a58-82c9269e304c",
    name: "Jhon Cooper",
  });

  const [teams, setTeams] = useState<Team[] | null>(null);

  useEffect(() => {
    fetchTeams().then((data) => {
      setTeams(data);
    });
  }, []);

  const [activeTeam, setActiveTeam] = useState<string | null>(
    teams ? teams[0].id : null
  );

  const createTeam = (name: string) => {
    const newTeam: Team = {
      id: getRandomId(),
      name,
      members: [],
    };
    setTeams(teams ? [...teams, newTeam] : [newTeam]);
  };

  const selectTeam = (id: string) =>
    setActiveTeam(id === activeTeam ? null : id);

  // boards
  const [boards, setBoards] = useState<Board[] | null>(null);

  useEffect(() => {
    fetchBoards().then((data) => {
      setBoards(data);
    });
  }, []);

  const addBoard = (board: Board) => {
    setBoards(boards ? [...boards, board] : [board]);
  };

  const renameBoard = (boardId: string, newTitle: string) => {
    setBoards(
      boards!.map((board) => {
        if (board.id === boardId) {
          return { ...board, title: newTitle };
        }
        return board;
      })
    );
  };

  const getBoardsByTeamId = (teamId: string) => {
    if (!boards) return null;

    return boards.filter((board) => board.teamId === teamId);
  };

  const [favoriteBoards, setFavoriteBoards] = useState<string[]>([]);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        teams,
        createTeam,
        activeTeam,
        selectTeam,
        boards,
        setBoards,
        addBoard,
        renameBoard,
        getBoardsByTeamId,
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
