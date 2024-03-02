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
import { Hint } from "@/components/ui/hint";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/context/user-context";
import { Plus } from "lucide-react";

export default function NewButton() {
  const { addTeam } = useUser();

  const handleAddTeam = () => {
    const name = "fjdal";
    addTeam({ id: "fa", name });
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
          <p>img</p>

          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" type="text" placeholder="my-new-team" />
          </div>
          <DialogClose asChild>
            <Button className="self-end" onClick={handleAddTeam}>
              Create Team
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
