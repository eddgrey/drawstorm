"use client";

import { Hint } from "@/components/ui/hint";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ItemProps {
  id: string;
  name: string;
  imageUrl: string;
}

export default function Item({ id, name, imageUrl }: ItemProps) {
  const teamActive = "fja";
  const isActive = false;

  const handleOnClick = () => {
    if (!teamActive) return;
    // setActiveTeam(id)
  };
  return (
    <div className="aspect-square relative">
      <Hint label={name} side="right" align="start" sideOffset={18}>
        {imageUrl ? (
          <Image
            fill
            alt={name}
            src={imageUrl}
            onClick={handleOnClick}
            className={cn(
              "rounded-md cursor-pointer opacity-75 hover:opacity-100 transition",
              isActive && "opacity-100"
            )}
          />
        ) : (
          // TODO: dynamic style
          <div className=" bg-gradient-to-br from-blue-500 to-indigo-700 h-full w-full rounded-md flex justify-center items-center hover:cursor-pointer">
            <span className="uppercase text-white text-lg font-bold">
              {name[0]}
            </span>
          </div>
        )}
      </Hint>
    </div>
  );
}
