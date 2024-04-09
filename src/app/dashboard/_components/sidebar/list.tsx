"use client";

import { useUser } from "@/context/user-context";
import Item from "./item";

export default function List() {
  const { teams } = useUser();

  if (!teams) return;

  return (
    <ul className="space-y-4">
      {teams.map(({ id, title }) => (
        <Item key={id} id={id} name={title} imageUrl="" />
      ))}
    </ul>
  );
}
