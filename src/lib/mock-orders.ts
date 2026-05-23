import type { OrderDetail, OrderListItem } from "../types/order.types";
import type { OrderStatus } from "../constants/order-status";

const customers = [
  { name: "Budi Santoso", email: "budi@example.com", phone: "+62 812 3456 7890" },
  { name: "Siti Nurhaliza", email: "siti@example.com", phone: "+62 813 1234 5678" },
  { name: "Andi Pratama", email: "andi@example.com", phone: "+62 821 9876 5432" },
  { name: "Dewi Lestari", email: "dewi@example.com", phone: "+62 856 1111 2222" },
  { name: "Rangga Wijaya", email: "rangga@example.com", phone: "+62 877 3333 4444" },
  { name: "Maya Kusuma", email: "maya@example.com", phone: "+62 818 5555 6666" },
  { name: "Faris Arif", email: "faris@example.com", phone: "+62 819 7777 8888" },
  { name: "Citra Dewi", email: "citra@example.com", phone: "+62 822 9999 0000" },
];

const outlets = [
  { id: "outlet-1", name: "Outlet Kemang" },
  { id: "outlet-2", name: "Outlet Senopati" },
  { id: "outlet-3", name: "Outlet Sudirman" },
];

const laundryItems = [
  { id: "item-1", name: "Kaos" },
  { id: "item-2", name: "Celana Panjang" },
  { id: "item-3", name: "Celana Pendek" },
  { id: "item-4", name: "Celana Dalam" },
  { id: "item-5", name: "Kemeja" },
  { id: "item-6", name: "Jaket" },
];

const drivers = [
  { id: "driver-1", name: "Andi Setiawan" },
  { id: "driver-2", name: "Joko Susilo" },
];

const workers = [
  { id: "worker-1", name: "Budi Hartono", workerStation: "WASHING" as const },
  { id: "worker-2", name: "Dewi Anggraini", workerStation: "IRONING" as const },
  { id: "worker-3", name: "Sari Wulandari", workerStation: "PACKING" as const },
];

const outletAdmins = [
  { id: "admin-1", name: "Sari Admin" },
  { id: "admin-2", name: "Reza Admin" },
];

const statuses: OrderStatus[] = [
  "MENUNGGU_PENJEMPUTAN",
  "MENUJU_OUTLET",
  "SAMPAI_OUTLET",
  "SEDANG_DICUCI",
  "SEDANG_DISETRIKA",
  "SEDANG_DIPACKING",
  "MENUNGGU_PEMBAYARAN",
  "SIAP_DIANTAR",
  "SEDANG_DIKIRIM",
  "DITERIMA_CUSTOMER",
];

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateOrderNumber(index: number, date: Date): string {
  const ymd = date.toISOString().slice(0, 10).replace(/-/g, "");
  const seq = String(index + 1).padStart(4, "0");
  return `INV-${ymd}-${seq}`;
}

export function generateMockOrders(count = 50): OrderListItem[] {
  return Array.from({ length: count }).map((_, i) => {
    const status = randomFrom(statuses);
    const outlet = randomFrom(outlets);
    const customer = randomFrom(customers);
    const daysAgo = Math.floor(Math.random() * 30);
    const createdAt = new Date(Date.now() - daysAgo * 86400000);
    const pickupAt = new Date(createdAt.getTime() + 3600000);

    const hasAmount = ![
      "MENUNGGU_PENJEMPUTAN",
      "MENUJU_OUTLET",
    ].includes(status);

    return {
      id: `order-${i + 1}`,
      orderNumber: generateOrderNumber(i, createdAt),
      customerId: `customer-${i + 1}`,
      customerName: customer.name,
      outletId: outlet.id,
      outletName: outlet.name,
      status,
      totalWeightKg: hasAmount ? Math.round((Math.random() * 9 + 1) * 10) / 10 : null,
      totalAmount: hasAmount ? Math.floor(Math.random() * 200 + 30) * 1000 : null,
      paidAt: ["SIAP_DIANTAR", "SEDANG_DIKIRIM", "DITERIMA_CUSTOMER"].includes(status)
        ? new Date(createdAt.getTime() + 7200000).toISOString()
        : null,
      pickupScheduledAt: pickupAt.toISOString(),
      createdAt: createdAt.toISOString(),
      updatedAt: createdAt.toISOString(),
    };
  });
}

/**
 * Generate detail data buat 1 order (dipanggil dari OrderDetail page).
 * Pakai orderId buat seed-konsisten — sama orderId selalu hasilin data sama.
 */
export function getMockOrderDetail(orderId: string): OrderDetail | null {
  const all = generateMockOrders(45);
  const base = all.find((o) => o.id === orderId);
  if (!base) return null;

  const customer = customers.find((c) => c.name === base.customerName) ?? customers[0];
  const itemPicks = laundryItems.slice(0, Math.floor(Math.random() * 4) + 2);
  const orderItems = itemPicks.map((item, idx) => ({
    id: `oi-${orderId}-${idx}`,
    orderId,
    laundryItemId: item.id,
    laundryItemName: item.name,
    quantity: Math.floor(Math.random() * 8) + 1,
  }));

  const createdAt = new Date(base.createdAt);
  const t = (offsetMs: number) =>
    new Date(createdAt.getTime() + offsetMs).toISOString();

  // Lifecycle timestamps - berdasarkan status saat ini
  const statusOrder: OrderStatus[] = [
    "MENUNGGU_PENJEMPUTAN",
    "MENUJU_OUTLET",
    "SAMPAI_OUTLET",
    "SEDANG_DICUCI",
    "SEDANG_DISETRIKA",
    "SEDANG_DIPACKING",
    "MENUNGGU_PEMBAYARAN",
    "SIAP_DIANTAR",
    "SEDANG_DIKIRIM",
    "DITERIMA_CUSTOMER",
  ];
  const currentIdx = statusOrder.indexOf(base.status);

  return {
    ...base,
    pickupAddressSnapshot: {
      label: "Rumah",
      recipientName: customer.name,
      recipientPhone: customer.phone,
      fullAddress: "Jl. Kemang Selatan No. 12, Bangka",
      city: "Jakarta Selatan",
      province: "DKI Jakarta",
      postalCode: "12730",
      latitude: -6.2615,
      longitude: 106.8131,
    },
    pickupLatitude: -6.2615,
    pickupLongitude: 106.8131,
    notes: null,
    customer: {
      id: base.customerId,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
    },
    pickupDriver: currentIdx >= 1 ? drivers[0] : null,
    deliveryDriver: currentIdx >= 8 ? drivers[1] : null,
    washingWorker: currentIdx >= 3 ? workers[0] : null,
    ironingWorker: currentIdx >= 4 ? workers[1] : null,
    packingWorker: currentIdx >= 5 ? workers[2] : null,
    orderItems,
    pickedUpAt: currentIdx >= 1 ? t(3600000) : null,
    arrivedAtOutletAt: currentIdx >= 2 ? t(5400000) : null,
    processedByAdminAt: currentIdx >= 3 ? t(7200000) : null,
    washingCompletedAt: currentIdx >= 4 ? t(10800000) : null,
    ironingCompletedAt: currentIdx >= 5 ? t(14400000) : null,
    packingCompletedAt: currentIdx >= 6 ? t(18000000) : null,
    deliveryStartedAt: currentIdx >= 8 ? t(21600000) : null,
    deliveredAt: currentIdx >= 9 ? t(25200000) : null,
    confirmedAt: null,
    cancelledAt: null,
  };
}

/**
 * Get admin/system actor for a status change (untuk timeline display).
 */
export function getStatusActor(status: OrderStatus, detail: OrderDetail): string {
  switch (status) {
    case "MENUNGGU_PENJEMPUTAN":
      return "System";
    case "MENUJU_OUTLET":
      return detail.pickupDriver?.name ?? "Driver";
    case "SAMPAI_OUTLET":
      return outletAdmins[0].name;
    case "SEDANG_DICUCI":
      return detail.washingWorker?.name ?? "Washing Worker";
    case "SEDANG_DISETRIKA":
      return detail.ironingWorker?.name ?? "Ironing Worker";
    case "SEDANG_DIPACKING":
      return detail.packingWorker?.name ?? "Packing Worker";
    case "MENUNGGU_PEMBAYARAN":
      return "System";
    case "SIAP_DIANTAR":
      return "System";
    case "SEDANG_DIKIRIM":
      return detail.deliveryDriver?.name ?? "Delivery Driver";
    case "DITERIMA_CUSTOMER":
      return detail.customer.name;
    default:
      return "System";
  }
}

export const MOCK_OUTLETS = outlets;
