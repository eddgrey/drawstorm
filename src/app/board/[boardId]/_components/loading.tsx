import { Loader2 } from "lucide-react";
import { InfoSkeleton } from "./info";
import { ParticipantsSkeleton } from "./participants";
import { ToolbarSkeleton } from "./toolbar";

export default function Loading() {
  return (
    <div className="h-full w-full relative bg-neutral-200 touch-none flex items-center justify-center">
      <Loader2 className="h-6 w-6 text-muted-foreground animate-spin" />
      <InfoSkeleton />
      <ParticipantsSkeleton />
      <ToolbarSkeleton />
    </div>
  );
}
