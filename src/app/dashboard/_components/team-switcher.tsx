"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useUser } from "@/context/user-context";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, Users } from "lucide-react";
import { useState } from "react";

export default function TeamSwitcher() {
  const [open, setOpen] = useState(false);
  const { teams, activeTeam, selectTeam } = useUser();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full max-w-xs"
        >
          <Users className="h-5 w-5 mr-2" />
          {teams.find((team) => team.id === activeTeam)?.name}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandInput placeholder="Search team" />
          <CommandEmpty>No team found.</CommandEmpty>
          <CommandGroup>
            {teams.map(({ id, name }) => (
              <CommandItem
                key={id}
                value={id}
                onSelect={(currentTeam) => {
                  selectTeam(currentTeam);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    activeTeam === id ? "opacity-100" : "opacity-0"
                  )}
                />
                {name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
