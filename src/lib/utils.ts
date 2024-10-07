import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (value: string) => {
  const numericValue = Number(value.replace(/,/g, ""));
  if (isNaN(numericValue)) {
    return "";
  }
  return numericValue.toLocaleString("en-US", {
    style: "decimal",
    maximumFractionDigits: 0,
  });
};

export function formatVNDCurrency(amount: string | number) {
  if (typeof amount === "string") {
    amount = parseFloat(amount);
  }

  if (isNaN(amount)) {
    throw new Error("Invalid number format");
  }

  // Format the number as VND currency
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}
