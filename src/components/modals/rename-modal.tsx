"use client";

import { FormEventHandler, useEffect, useState } from "react";
import { useRenameModal } from "@/store/use-rename-modal";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { renameBoard } from "@/lib/supabase/queries";
import { useUser } from "@/context/user-context";

export default function RenameModal() {
  const { refreshBoards } = useUser();
  const { isOpen, onClose, initialValues } = useRenameModal();
  const [title, setTitle] = useState(initialValues.title);

  const pending = false;

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const board = await renameBoard(initialValues.id, title);
    if (board) {
      refreshBoards().then(() => {
        toast.success("Board renamed");
        onClose();
      });
    } else {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    setTitle(initialValues.title);
  }, [initialValues.title]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit board title</DialogTitle>
        </DialogHeader>
        <DialogDescription>Enter a new title for this board</DialogDescription>
        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            disabled={pending}
            required
            maxLength={60}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Board title"
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={pending}>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
