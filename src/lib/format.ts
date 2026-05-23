import { format } from "date-fns";

/**
 * Format ke Rupiah - "Rp 25.000"
 */
export function formatCurrency(amount: number | null | undefined): string {
  if (amount === null || amount === undefined) return "-";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format date - "15 May 2026"
 */
export function formatDate(date: string | Date | null | undefined): string {
  if (!date) return "-";
  return format(new Date(date), "dd MMM yyyy");
}

/**
 * Format datetime - "15 May 2026, 14:30"
 */
export function formatDateTime(date: string | Date | null | undefined): string {
  if (!date) return "-";
  return format(new Date(date), "dd MMM yyyy, HH:mm");
}

/**
 * Format date untuk input type="date" - "2026-05-15"
 */
export function formatDateInput(date: string | Date | null | undefined): string {
  if (!date) return "";
  return format(new Date(date), "yyyy-MM-dd");
}

/**
 * Format weight - "2.5 kg" atau "-"
 */
export function formatWeight(kg: number | null | undefined): string {
  if (kg === null || kg === undefined) return "-";
  return `${kg.toFixed(1)} kg`;
}
