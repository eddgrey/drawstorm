"use client";

import { fetchBoards, fetchTeams } from "@/lib/api";
import { createClient } from "@/lib/supabase/client";
import { createTeam, getUser, getUserTeams } from "@/lib/supabase/queries";
import { getRandomId } from "@/lib/utils";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  use,
  useContext,
  useEffect,
  useState,
} from "react";

interface UserContextData {
  auth: {
    loginWithGithub: () => Promise<void>;
    loginAsGuest: () => Promise<void>;
    signOut: () => Promise<void>;
    isPending: boolean;
  };
  currentUser: User | null;
  teams: Team[] | null;
  createNewTeam: (title: string) => Promise<void>;
  boards: Board[] | null;
  setBoards: Dispatch<SetStateAction<Board[] | null>>;
  activeTeam: string | null;
  addBoard: (board: Board) => void;
  renameBoard: (boardId: string, newTitle: string) => void;
  selectTeam: (id: string) => void;
  getBoardsByTeamId: (teamId: string) => Board[] | null;
}

const UserContext = createContext<UserContextData | undefined>(undefined);

export function UserContextProvider({ children }: { children: ReactNode }) {
  const supabase = createClient();

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthPending, setIsAuthPending] = useState(false);

  useEffect(() => {
    getUser().then((user) => setCurrentUser(user));
  }, []);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "INITIAL_SESSION") {
        // handle initial session
      } else if (event === "SIGNED_IN") {
        console.log("Sign in");
        if (session) {
          getUser().then((user) => setCurrentUser(user));
        }
      } else if (event === "SIGNED_OUT") {
        console.log("Sign out");
        setCurrentUser(null);
      }
    });
    return () => data.subscription.unsubscribe();
  }, [supabase]);

  const loginWithGithub = async () => {
    setIsAuthPending(true);
    const { data } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  const loginAsGuest = async () => {
    setIsAuthPending(true);
    const { data, error } = await supabase.auth.signInAnonymously();

    if (error) {
      setIsAuthPending(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const [teams, setTeams] = useState<Team[] | null>(null);
  const [activeTeam, setActiveTeam] = useState<string | null>(null);

  useEffect(() => {
    getUserTeams().then((teams) => {
      setTeams(teams);
      if (teams && teams.length > 0) {
        setActiveTeam(teams[0].id);
      }
    });
  }, []);

  const createNewTeam = async (title: string) => {
    const newTeam = await createTeam(title);

    if (newTeam) {
      setTeams(teams ? [...teams, newTeam] : [newTeam]);
    }
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
        auth: {
          loginWithGithub,
          loginAsGuest,
          signOut,
          isPending: isAuthPending,
        },
        teams,
        createNewTeam,
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
