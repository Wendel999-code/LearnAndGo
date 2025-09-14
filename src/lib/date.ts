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
