"use client";

import { createClient } from "@/lib/supabase/client";
import {
  createTeam,
  getUser,
  getBoardsByTeamId,
  getUserTeams,
  createBoard,
  getUserRequests,
  getUserBoards,
} from "@/lib/supabase/queries";
import {
  ReactNode,
  createContext,
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
  activeTeam: string | null;
  createNewBoard: () => Promise<string | null>;
  selectTeam: (id: string) => void;
  requests: Requests | null;
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
      if (event === "SIGNED_IN" && session) {
        getUser().then((user) => setCurrentUser(user));
      } else if (event === "SIGNED_OUT") {
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

  useEffect(() => {
    const channel = supabase
      .channel("newTeamMember")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "team_members" },
        (payload) => {
          getUserTeams().then((teams) => {
            setTeams(teams);
            if (teams && teams.length > 0) {
              setActiveTeam(teams[0].id);
            }
          });
        }
      )
      .subscribe();

    // return () => channel.;
  }, [supabase]);

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
    getUserBoards().then((result) => setBoards(result));
  }, []);

  const refreshBoards = async () => {
    if (activeTeam) {
      getBoardsByTeamId(activeTeam).then((boards) => setBoards(boards));
    }
  };
  useEffect(() => {
    const channel = supabase
      .channel("boardChanges")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "boards" },
        (payload) => {
          getUserBoards().then((result) => setBoards(result));
        }
      )
      .subscribe();

    // return () => channel.;
  }, [supabase]);

  const createNewBoard = async () => {
    if (!activeTeam) return null;
    const newBoard = await createBoard(activeTeam);

    return newBoard ? newBoard.id : null;
  };

  const [requests, setRequests] = useState<Requests | null>(null);

  useEffect(() => {
    getUserRequests().then((result) => setRequests(result));
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel("requestChanges")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "team_join_requests" },
        (payload) => {
          getUserRequests().then((result) => setRequests(result));
        }
      )
      .subscribe();

    // return () => channel.;
  }, [supabase]);

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
        createNewBoard,
        requests,
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
