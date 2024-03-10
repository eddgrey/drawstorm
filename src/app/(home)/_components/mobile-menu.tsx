"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronRight, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const links = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Use cases", href: "/#use-cases" },
  { label: "Demo", href: "/#demo" },
  { label: "FAQ", href: "/#faq" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="felx lg:hidden" variant="boardActive" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="px-0 flex flex-col pb-12">
        <SheetHeader className="border-b-2 border-gray-200 pb-6">
          <SheetTitle className="text-xl ml-8">Menu</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col justify-center gap-4 mt-6 border-b-2 border-gray-200 pb-12 px-8">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between text-lg px-2 py-3 transition text-gray-500 font-medium rounded-md hover:bg-indigo-100 hover:text-indigo-500 hover:underline hover:underline-offset-4 decoration-2"
            >
              {link.label}
              <ChevronRight />
            </Link>
          ))}
        </div>
        <div className="flex-1" />
        <div className="flex flex-col gap-4 px-8">
          <Button
            variant="secondary"
            size="lg"
            className="bg-indigo-100 hover:bg-indigo-50 text-indigo-500 font-semibold text-base"
            asChild
          >
            <Link href="/login">Login</Link>
          </Button>

          <Button
            size="lg"
            className="bg-indigo-600 hover:bg-indigo-700 font-bold text-base"
            asChild
          >
            <Link href="/dashboard">Get started</Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
