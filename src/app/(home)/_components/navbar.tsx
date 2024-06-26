"use client";

import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { useUser } from "@/context/user-context";
import { Button } from "@/components/ui/button";
import MobileMenu from "./mobile-menu";

const font = Poppins({ subsets: ["latin"], weight: "600" });

const links = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Use cases", href: "/#use-cases" },
  { label: "Demo", href: "/#demo" },
  { label: "FAQ", href: "/#faq" },
];

export default function Navbar() {
  const { currentUser, auth } = useUser();

  return (
    <div className="fixed z-50 w-full h-20 border-b-2 border-gray-200 bg-white flex items-center justify-center">
      <nav className="h-full w-full max-w-screen-xl flex justify-between items-center px-12">
        <Link href="/">
          <div className="flex items-center gap-x-2">
            <Image
              src="/logo.svg"
              alt="DrawStorm Logo"
              width={54}
              height={54}
            />
            <span className={cn("font-semibold text-2xl", font.className)}>
              DrawStorm
            </span>
          </div>
        </Link>

        <MobileMenu />

        <div className="hidden lg:flex flex-1 justify-center gap-x-8">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-base text-gray-500 font-medium hover:text-indigo-500 hover:underline hover:underline-offset-4 decoration-2"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex gap-x-4">
          {currentUser ? (
            <>
              <Button
                variant="secondary"
                onClick={auth.signOut}
                size="lg"
                className="bg-indigo-100 hover:bg-indigo-50 text-indigo-500 font-semibold text-base"
              >
                Logout
              </Button>

              <Button
                size="lg"
                className="bg-indigo-600 hover:bg-indigo-700 font-bold text-base"
                asChild
              >
                <Link href="/dashboard">Go Dashboard</Link>
              </Button>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </nav>
    </div>
  );
}
