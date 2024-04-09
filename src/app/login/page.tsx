"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Poppins } from "next/font/google";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { useUser } from "@/context/user-context";
import { cn } from "@/lib/utils";

const font = Poppins({ subsets: ["latin"], weight: "600" });

export default function LoginPage() {
  const router = useRouter();

  const { currentUser, auth } = useUser();

  useEffect(() => {
    if (currentUser) {
      router.replace("/dashboard");
    }
  }, [currentUser, router]);

  return (
    <div className="bg-gray-50 w-full h-full flex justify-center items-center relative px-12">
      <div className="absolute top-6">
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
      </div>
      <div className="bg-white shadow-lg border-2 border-gray-100 max-w-lg w-full py-14 px-12 rounded-lg">
        <div className="flex flex-col items-center w-full gap-y-1 mb-6">
          <h1 className="text-3xl font-semibold">Welcome back!</h1>
        </div>
        <form className="space-y-6">
          <button
            onClick={auth.loginAsGuest}
            disabled={auth.isPending}
            className="w-full bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-500 shadow-md shadow-indigo-500 px-8 lg:px-12 py-2 rounded-lg text-white text-lg font-semibold flex justify-center items-center"
          >
            Login as Guest
          </button>

          <span className="flex bg-gray-200 h-[2px] w-full my-12" />

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <Button
              onClick={auth.loginWithGithub}
              disabled={auth.isPending}
              className="flex-1 gap-2"
              variant="outline"
            >
              <Image
                src="/icons/github.svg"
                alt="github-icon"
                width={20}
                height={20}
              />
              Login with GitHub
            </Button>
          </div>
        </form>
      </div>

      <div className="absolute bottom-6 max-w-xl w-full space-y-2 px-4">
        <h3 className="font-semibold text-sm text-gray-500 text-center">
          DrawStorm
        </h3>
        <p className="text-xs text-gray-400 text-center text-pretty">
          Shape your ideas and share them with others. Start creating boards,
          inviting team members, and collaborating in real-time.
        </p>
      </div>
    </div>
  );
}
