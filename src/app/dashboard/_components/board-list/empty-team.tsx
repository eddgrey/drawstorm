"use client";

import { Button } from "@/components/ui/button";
import { useCreateTeamModal } from "@/store/use-create-team-modal";
import Image from "next/image";

export default function EmtpyTeam() {
  const { onOpen } = useCreateTeamModal();
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src="/elements.svg" alt="empty" height={200} width={200} />
      <h2 className="text-2xl font-semibold mt-6">Welcome to Drawstorm</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Create a team to get started
      </p>
      <div className="mt-6">
        <Button onClick={() => onOpen()} size="lg">
          Create Team
        </Button>
      </div>
    </div>
  );
}
