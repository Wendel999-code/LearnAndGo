import { clsx, type ClassValue } from "clsx";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleCopy = (ref: string) => {
  navigator.clipboard.writeText(ref);
  toast.success("Copied to clipboard.");
};
