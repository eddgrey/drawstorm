import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";

import { boardImages } from "@/data";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandomBoardImage() {
  const randomIndex = Math.floor(Math.random() * boardImages.length);
  return boardImages[randomIndex];
}

export function getRandomId() {
  return uuidv4();
}
