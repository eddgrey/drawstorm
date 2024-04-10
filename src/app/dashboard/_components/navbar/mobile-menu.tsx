import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useUser } from "@/context/user-context";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Menu, Star } from "lucide-react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import TeamSwitcher from "../team-switcher";
import InviteButton from "./invite-button";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function MobileMenu() {
  const searchParams = useSearchParams();
  const favorites = searchParams.get("favorites");
  const { auth } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="lg:hidden"
          onClick={() => setIsOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="mb-12">
          <SheetTitle>
            <Link href="/">
              <div className="flex items-center gap-x-2">
                <Image src="/logo.svg" alt="logo" height={60} width={60} />
                <span className={cn("font-semibold, text-2xl", font.className)}>
                  DrawStorm
                </span>
              </div>
            </Link>
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-1 w-full">
          <Button
            asChild
            variant={favorites ? "ghost" : "secondary"}
            size="lg"
            className="font-normal justify-start px-2 w-full"
            onClick={() => setIsOpen(false)}
          >
            <Link href="/dashboard">
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Team boards
            </Link>
          </Button>

          <Button
            asChild
            variant={favorites ? "secondary" : "ghost"}
            size="lg"
            className="font-normal justify-start px-2 w-full"
            onClick={() => setIsOpen(false)}
          >
            <Link href={{ pathname: "/dashboard", query: { favorites: true } }}>
              <Star className="h-4 w-4 mr-2" />
              Favorite boards
            </Link>
          </Button>
        </div>
        <div className="bg-slate-200 h-0.5 w-full my-4" />

        <div className="flex flex-1 w-full">
          <InviteButton />
        </div>

        <SheetFooter className="mt-auto">
          <Button
            variant="secondary"
            onClick={auth.signOut}
            size="lg"
            className="bg-indigo-100 hover:bg-indigo-50 text-indigo-500 font-semibold text-base"
          >
            Logout
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
