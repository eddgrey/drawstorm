"use client";

import { ReactNode, createContext, useContext, useState } from "react";

interface UserContextData {
  teams: Team[];
  addTeam: (team: Team) => void;
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
  const addTeam = (team: Team) => setTeams([...teams, team]);

  return (
    <UserContext.Provider value={{ teams, addTeam }}>
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
