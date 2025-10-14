import { format, parse } from "date-fns";

export function formattedDate(date: string | Date): string {
  if (!date) return "";
  return format(new Date(date), "MMMM d, yyyy");
}

export function splitDateTime(dateTime: string) {
  // Parse the string into a Date object
  const parsed = parse(dateTime, "yyyy-MM-dd HH:mm:ss", new Date());

  // Format separately
  const date = format(parsed, "MMMM d, yyyy");
  const time = format(parsed, "hh:mm a");

  return { date, time };
}

export function formatToMDY(date: Date | null | undefined): string | null {
  if (!date) return null;
  return format(date, "MM/dd/yyyy");
}

export function formatToMDYWithTime(
  date: Date | null | undefined
): string | null {
  if (!date) return null;
  return format(date, "MM/dd/yyyy");
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
