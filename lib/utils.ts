import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a YYYY-MM-DD date string into "Jan 15, 2025"
 */
export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  try {
    // Force local timezone by appending midnight
    const date = new Date(`${dateStr}T00:00:00`);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

/**
 * Formats a HH:MM 24-hour time string into "2:30 PM"
 */
export function formatTime(timeStr: string): string {
  if (!timeStr) return "";
  try {
    const [h, m] = timeStr.split(":").map(Number);
    const period = h >= 12 ? "PM" : "AM";
    const hour = h % 12 || 12;
    return `${hour}:${String(m).padStart(2, "0")} ${period}`;
  } catch {
    return timeStr;
  }
}
