export interface MockLaundryItem {
  id: string;
  name: string;
  isActive: boolean;
}

// Mock data - real implementation pakai laundryItemApi.list()
export const MOCK_LAUNDRY_ITEMS: MockLaundryItem[] = [
  { id: "item-1", name: "Kaos", isActive: true },
  { id: "item-2", name: "Celana Panjang", isActive: true },
  { id: "item-3", name: "Celana Pendek", isActive: true },
  { id: "item-4", name: "Celana Dalam", isActive: true },
  { id: "item-5", name: "Kemeja", isActive: true },
  { id: "item-6", name: "Jaket", isActive: true },
  { id: "item-7", name: "Kaos Kaki", isActive: true },
  { id: "item-8", name: "Handuk", isActive: true },
  { id: "item-9", name: "Sprei", isActive: true },
  { id: "item-10", name: "Selimut", isActive: true },
];

// Pricing constants - real implementation dari outlet.pricePerKg
export const PRICE_PER_KG = 12000;
export const DELIVERY_FEE = 8000;
