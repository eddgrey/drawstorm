import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { UserContextProvider } from "@/context/user-context";
import { Toaster } from "@/components/ui/sonner";
import ModalProvider from "@/providers/modal-provider";
import { Suspense } from "react";
import Loader from "@/components/loader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DrawStorm",
  description: "Collaborate wiht others and visualize your ideas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={cn("h-full", inter.className)}>
        <Suspense fallback={<Loader />}>
          <UserContextProvider>
            <Toaster />
            <ModalProvider />
            <main className="h-full min-h-screen">{children}</main>
          </UserContextProvider>
        </Suspense>
      </body>
    </html>
  );
}
