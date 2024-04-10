"use client";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/context/user-context";
import {
  createTeamJoinRequest,
  getOwnerTeam,
  getUserRequests,
} from "@/lib/supabase/queries";
import { Clipboard, Loader2, Plus, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ListRequests from "./list-requests";

export default function InviteButton() {
  const { activeTeam, currentUser, requests } = useUser();
  const [isMyTeam, setIsMyTeam] = useState(false);
  const [teamCode, setTeamCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const copyTeamCodeLabel = activeTeam
    ? isMyTeam
      ? "Copy Team Code"
      : "Only The Owner"
    : "No team";

  useEffect(() => {
    if (activeTeam && currentUser) {
      getOwnerTeam(activeTeam).then((ownerId) => {
        if (ownerId === currentUser.id) {
          setIsMyTeam(true);
        }
      });
    }
  }, [activeTeam, currentUser]);

  // const numRequests = requests ? Object.values(requests).length : 0;

  const copyTeamCode = () => {
    if (!activeTeam) return null;
    navigator.clipboard
      .writeText(activeTeam)
      .then(() => toast.success("Link copied"))
      .catch(() => toast.error("Failed to copy"));
  };

  const sendRequest = async () => {
    if (!teamCode) return;

    setIsLoading(true);

    createTeamJoinRequest(teamCode).then((result) => {
      if (result) {
        toast.success(result);
      } else {
        toast.error("Failed to send request");
      }
    });
    setIsLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="relative">
          {requests && Object.keys(requests).length > 0 ? (
            <div className="absolute -top-3 -right-3 border rounded-full h-6 w-6 bg-red-500 flex items-center justify-center">
              <p className="text-white text-sm">{"!"}</p>
            </div>
          ) : null}
          <Plus className="h-4 w-4 mr-2" />
          Invite / Join
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite Members Or Join A Team</DialogTitle>
        </DialogHeader>
        <div className="h-44">
          <div>
            <Label>{"Share Team Code (Only the Owner)"}</Label>
            <div className="flex gap-x-4">
              <Input
                type="password"
                placeholder="**********************"
                disabled
              />
              <Hint label={copyTeamCodeLabel}>
                <Button
                  variant="boardActive"
                  size="icon"
                  onClick={copyTeamCode}
                  disabled={!isMyTeam}
                >
                  <Clipboard className="h-6 w-6" />
                </Button>
              </Hint>
            </div>
          </div>

          <div>
            <Label>Insert a code team to join</Label>
            <div className="flex gap-x-4">
              <Input
                type="text"
                value={teamCode}
                onChange={(e) => setTeamCode(e.target.value)}
              />
              <Hint label="Send request">
                <Button
                  variant="boardActive"
                  size="icon"
                  onClick={sendRequest}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin h-6 w-6" />
                  ) : (
                    <Send className="h-6 w-6" />
                  )}
                </Button>
              </Hint>
            </div>
          </div>
        </div>

        <ListRequests requests={requests} />
      </DialogContent>
    </Dialog>
  );
}
