"use client";

import { Button } from "@/components/ui/button";
import { acceptRequest, rejectRequest } from "@/lib/supabase/queries";
import { Ban, CheckCircle } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

interface Props {
  requests: Requests | null;
}

export default function ListRequests({ requests }: Props) {
  if (!requests) {
    return null;
  }

  const onAcceptRequest = async (teamId: string, userId: string) => {
    const result = await acceptRequest(teamId, userId);

    if (result) {
      toast.success("User Accepted");
    } else {
      toast.error("Something went wrong");
    }
  };

  const onRejectRequest = async (teamId: string, userId: string) => {
    const result = await rejectRequest(teamId, userId);
    if (result) {
      toast.success("User Rejected");
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <section>
      {Object.entries(requests).map(([key, values]) => (
        <div key={key} className="flex flex-col gap-y-4">
          {values.map((request, index) => (
            <div key={index}>
              <h3 className="font-medium text-lg">Team - {request.teamName}</h3>
              <div className="flex items-center justify-between">
                <div className="flex gap-x-2 items-center">
                  <Image
                    src={request.userAvatarUrl}
                    alt="Avatar"
                    height={30}
                    width={30}
                  />
                  <p>{request.userName}</p>
                </div>
                <div className="flex gap-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onAcceptRequest(key, request.userId)}
                  >
                    <CheckCircle className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="boardActive"
                    size="icon"
                    onClick={() => onRejectRequest(key, request.userId)}
                  >
                    <Ban className="h-6 w-6" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}
