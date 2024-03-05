"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/context/user-context";
import { FormEventHandler, useState } from "react";
import { useCreateTeamModal } from "@/store/use-create-team-modal";
import { toast } from "sonner";

export default function CreateTeamModal() {
  const { isOpen, onClose, initialValues } = useCreateTeamModal();
  const [title, setTitle] = useState(initialValues.title);
  const { createTeam } = useUser();

  const handleCreateTeam: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    createTeam(title);
    toast.success("Team created successfully");
    setTitle("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className=" bg-white border-none max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create New Team</DialogTitle>
        </DialogHeader>
        <DialogDescription>Enter a title for your new team</DialogDescription>
        <form onSubmit={handleCreateTeam} className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            minLength={2}
            maxLength={24}
            placeholder="my-new-team"
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" className="self-end mt-6">
                Create Team
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
