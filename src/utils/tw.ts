import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

const tw = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
export default tw;
