import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function copied from `shadcn` template. Merges Tailwind classes
 * with conditional variants while preserving the Tailwind precedence order.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}
