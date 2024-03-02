"use client";

import { ReactNode, createContext, useContext, useState } from "react";

interface UserContextData {
  teams: Team[];
  activeTeam: string;
  addTeam: (team: Team) => void;
  selectTeam: (id: string) => void;
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

  return (
    <UserContext.Provider value={{ teams, addTeam, activeTeam, selectTeam }}>
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
