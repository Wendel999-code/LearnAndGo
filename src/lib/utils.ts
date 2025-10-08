import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatToMDY(date: Date | null | undefined): string | null {
  if (!date) return null;
  return format(date, "MM/dd/yyyy");
}


export function formatToMDYWithTime(date: Date | null | undefined): string | null {
  if (!date) return null;
  return format(date, "MM/dd/yyyy h:mm a");
}

export function generateReferenceId(prefix = "LAG"): string {

  const randomPart = Math.floor(10000000 + Math.random() * 90000000);
  return `${prefix}-${randomPart}`;
}

// Format ranges to readable labels like "7–9 AM"
  export const formatTime = (range: string) => {
    const [start, end] = range.split("-");
    const format = (t: string) => {
      let [h, m] = t.split(":").map(Number);
      const suffix = h >= 12 ? "PM" : "AM";
      if (h > 12) h -= 12;
      return `${h}${m ? `:${m.toString().padStart(2, "0")}` : ""} ${suffix}`;
    };
    return `${format(start)} – ${format(end)}`;
  };


  
