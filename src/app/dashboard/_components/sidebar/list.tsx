"use client";

import { useUser } from "@/context/user-context";
import Item from "./item";

export default function List() {
  const { teams } = useUser();

  return (
    <ul className="space-y-4">
      {teams.map(({ id, name }) => (
        <Item key={id} id={id} name={name} imageUrl="" />
      ))}
    </ul>
  );
}
