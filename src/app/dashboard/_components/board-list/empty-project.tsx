import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";

export default function EmptyProject() {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src="/elements.svg" alt="empty" height={200} width={200} />
      <h2 className="text-2xl font-semibold mt-6">Welcome to Drawstorm</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Create a project to get started
      </p>
      <div className="mt-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg">Create project</Button>
          </DialogTrigger>
          <DialogContent className="p-0 bg-transparent border-none max-w-lg"></DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
