"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { createTeam } from "@/lib/supabase/queries";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/hint";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function NewButton() {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateTeam = async () => {
    console.log("NEW button sidebar");
    setIsLoading(true);
    if (value.length > 2) {
      await createTeam(value.trim());
    }
    setIsLoading(false);
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
              minLength={2}
              maxLength={24}
              required
              placeholder="my-new-team"
            />
          </form>
          <DialogClose asChild>
            <Button type="submit" disabled={isLoading} className="self-end">
              Create Team
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
