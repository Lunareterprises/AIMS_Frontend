import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getFirstWordInCaps(text) {
  if (!text) return "";
  
  const [firstWord] = text.trim().split(" ");
  return firstWord.toUpperCase();
}