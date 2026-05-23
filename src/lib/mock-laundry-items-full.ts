import type { LaundryItem } from "../types/laundry-item.types";

const baseItems = [
  { name: "Kaos", description: "Kaos pendek/panjang biasa" },
  { name: "Celana Panjang", description: "Celana jeans, chino, formal" },
  { name: "Celana Pendek", description: "Celana pendek casual" },
  { name: "Celana Dalam", description: null },
  { name: "Kemeja", description: "Kemeja kantor / formal" },
  { name: "Jaket", description: "Jaket biasa, tidak termasuk leather/winter coat" },
  { name: "Kaos Kaki", description: null },
  { name: "Handuk", description: "Handuk mandi ukuran standard" },
  { name: "Sprei", description: "Sprei single/double" },
  { name: "Selimut", description: "Selimut tipis (bedcover terpisah)" },
  { name: "Sajadah", description: null },
  { name: "Tas", description: "Outdated - sebaiknya laundry khusus" },
];

export const MOCK_LAUNDRY_ITEMS_FULL: LaundryItem[] = baseItems.map((item, i) => ({
  id: `item-${i + 1}`,
  name: item.name,
  description: item.description,
  isActive: i < 10, // Last 2 items (Sajadah, Tas) inactive
  createdAt: new Date(Date.now() - (60 - i * 2) * 86400000).toISOString(),
  updatedAt: new Date(Date.now() - (10 - i) * 86400000).toISOString(),
}));
