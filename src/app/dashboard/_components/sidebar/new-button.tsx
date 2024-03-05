"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Hint } from "@/components/hint";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/context/user-context";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function NewButton() {
  const [value, setValue] = useState("");
  const { createTeam } = useUser();

  const handleCreateTeam = () => {
    createTeam(value);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="aspect-square">
          <Hint label="Create Team" side="right" align="start" sideOffset={18}>
            <button className="bg-white/25 h-full w-full rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition">
              <Plus className="text-white" />
            </button>
          </Hint>
        </div>
      </DialogTrigger>
      <DialogContent className=" bg-white border-none max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create New Team</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-8">
          <form onSubmit={handleCreateTeam} className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
              minLength={2}
              maxLength={24}
              placeholder="my-new-team"
            />
          </form>
          <DialogClose asChild>
            <Button type="submit" className="self-end">
              Create Team
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
