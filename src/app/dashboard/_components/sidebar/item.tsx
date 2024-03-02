"use client";

import { Hint } from "@/components/ui/hint";
import { useUser } from "@/context/user-context";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ItemProps {
  id: string;
  name: string;
  imageUrl: string;
}

export default function Item({ id, name, imageUrl }: ItemProps) {
  const { activeTeam, selectTeam } = useUser();
  const isActive = activeTeam === id;

  return (
    <div className="aspect-square relative">
      <Hint label={name} side="right" align="start" sideOffset={18}>
        {imageUrl ? (
          <Image
            fill
            alt={name}
            src={imageUrl}
            onClick={() => selectTeam(id)}
            className={cn(
              "rounded-md cursor-pointer opacity-75 hover:opacity-100 transition",
              isActive && "opacity-100"
            )}
          />
        ) : (
          // TODO: dynamic style
          <div
            className={cn(
              "bg-gradient-to-br from-blue-500 to-indigo-700 h-full w-full rounded-md flex justify-center items-center opacity-75 hover:opacity-100 hover:cursor-pointer",
              isActive && "opacity-100"
            )}
            onClick={() => selectTeam(id)}
          >
            <span className="uppercase text-white text-lg font-bold">
              {name[0]}
            </span>
          </div>
        )}
      </Hint>
    </div>
  );
}
