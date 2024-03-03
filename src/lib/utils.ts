import { boardImages } from "@/data";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandomBoardImage() {
  const randomIndex = Math.floor(Math.random() * boardImages.length);
  return boardImages[randomIndex];
}
