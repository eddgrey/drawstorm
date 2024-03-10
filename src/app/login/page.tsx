"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { FormEvent } from "react";

const font = Poppins({ subsets: ["latin"], weight: "600" });

export default function LoginPage() {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

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
          <p className="text-base text-gray-600">Enter your email to login</p>
        </div>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="w-full flex flex-col gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Email" />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-500 shadow-md shadow-indigo-500 px-8 lg:px-12 py-2 rounded-lg text-white text-lg font-semibold flex justify-center items-center"
          >
            Login
          </button>
        </form>

        <span className="flex bg-gray-200 h-[2px] w-full my-12" />

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <Button className="flex-1 gap-2" variant="outline">
            <Image
              src="/icons/google.png"
              alt="google-icon"
              width={20}
              height={20}
            />
            Login with Google
          </Button>
          <Button className="flex-1 gap-2" variant="outline">
            <Image
              src="/icons/github.svg"
              alt="github-icon"
              width={20}
              height={20}
            />
            Login with GitHub
          </Button>
        </div>

        <p className="text-center text-sm text-gray-500">
          Not registered?{" "}
          <span className="hover:underline hover:text-indigo-500 cursor-pointer">
            Do it here
          </span>
        </p>
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
