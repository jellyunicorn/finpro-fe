import type {
  BypassRequestDetail,
  BypassRequestListItem,
  BypassStatus,
  WorkerStation,
} from "../types/bypass.types";

const stations: WorkerStation[] = ["WASHING", "IRONING", "PACKING"];
const statuses: BypassStatus[] = ["PENDING", "APPROVED", "REJECTED"];

const outlets = [
  { id: "outlet-1", name: "Outlet Kemang" },
  { id: "outlet-2", name: "Outlet Senopati" },
  { id: "outlet-3", name: "Outlet Sudirman" },
];

const workersByStation: Record<WorkerStation, { id: string; name: string }[]> = {
  WASHING: [
    { id: "worker-1", name: "Budi Hartono" },
    { id: "worker-2", name: "Joko Susilo" },
  ],
  IRONING: [
    { id: "worker-3", name: "Dewi Anggraini" },
    { id: "worker-4", name: "Rina Putri" },
  ],
  PACKING: [
    { id: "worker-5", name: "Sari Wulandari" },
    { id: "worker-6", name: "Andi Pratama" },
  ],
};

const sampleScenarios = [
  {
    workerNotes: "Celana dalam yang dititip cuma 9 pcs, tapi di sistem tercatat 10 pcs.",
    items: [
      { laundryItemId: "item-1", laundryItemName: "Kaos", expectedQty: 2, actualQty: 2 },
      { laundryItemId: "item-2", laundryItemName: "Celana Panjang", expectedQty: 1, actualQty: 1 },
      { laundryItemId: "item-4", laundryItemName: "Celana Dalam", expectedQty: 10, actualQty: 9 },
    ],
  },
  {
    workerNotes: "Kaos kelebihan 1 pcs, kemungkinan ada yang nyangkut.",
    items: [
      { laundryItemId: "item-1", laundryItemName: "Kaos", expectedQty: 3, actualQty: 4 },
      { laundryItemId: "item-5", laundryItemName: "Kemeja", expectedQty: 2, actualQty: 2 },
    ],
  },
  {
    workerNotes: "Handuk hilang 1 pcs, sudah dicek di keranjang washing kosong.",
    items: [
      { laundryItemId: "item-8", laundryItemName: "Handuk", expectedQty: 3, actualQty: 2 },
      { laundryItemId: "item-1", laundryItemName: "Kaos", expectedQty: 5, actualQty: 5 },
    ],
  },
  {
    workerNotes: "Celana pendek ada 2 lebih banyak. Sudah confirm ke driver.",
    items: [
      { laundryItemId: "item-3", laundryItemName: "Celana Pendek", expectedQty: 2, actualQty: 4 },
      { laundryItemId: "item-2", laundryItemName: "Celana Panjang", expectedQty: 1, actualQty: 1 },
    ],
  },
];

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateOrderNumber(daysAgo: number, seq: number): string {
  const date = new Date(Date.now() - daysAgo * 86400000);
  const ymd = date.toISOString().slice(0, 10).replace(/-/g, "");
  return `INV-${ymd}-${String(seq).padStart(4, "0")}`;
}

export function generateMockBypassRequests(count = 15): BypassRequestListItem[] {
  return Array.from({ length: count }).map((_, i) => {
    const station = randomFrom(stations);
    const worker = randomFrom(workersByStation[station]);
    const outlet = randomFrom(outlets);
    const status = randomFrom(statuses);
    const daysAgo = Math.floor(Math.random() * 14);
    const createdAt = new Date(Date.now() - daysAgo * 86400000);
    const scenario = sampleScenarios[i % sampleScenarios.length];
    const mismatchCount = scenario.items.filter(
      (item) => item.expectedQty !== item.actualQty
    ).length;

    return {
      id: `bypass-${i + 1}`,
      orderId: `order-${i + 1}`,
      orderNumber: generateOrderNumber(daysAgo, i + 1),
      outletId: outlet.id,
      outletName: outlet.name,
      workerId: worker.id,
      workerName: worker.name,
      workerStation: station,
      status,
      workerNotes: scenario.workerNotes,
      itemCount: mismatchCount,
      createdAt: createdAt.toISOString(),
    };
  });
}

// Generate detail data for 1 bypass request (dipanggil di Review Modal)
export function getMockBypassDetail(bypassId: string): BypassRequestDetail | null {
  const all = generateMockBypassRequests(15);
  const base = all.find((b) => b.id === bypassId);
  if (!base) return null;

  const idx = parseInt(bypassId.split("-")[1]);
  const scenario = sampleScenarios[(idx - 1) % sampleScenarios.length];

  return {
    ...base,
    items: scenario.items,
    reviewedByAdminId: base.status !== "PENDING" ? "admin-1" : null,
    reviewedByAdminName: base.status !== "PENDING" ? "Sari Admin" : null,
    adminNotes:
      base.status === "APPROVED"
        ? "Bypass disetujui, lanjut ke station berikutnya."
        : base.status === "REJECTED"
          ? "Worker diminta cek ulang quantity."
          : null,
    reviewedAt:
      base.status !== "PENDING"
        ? new Date(new Date(base.createdAt).getTime() + 1800000).toISOString()
        : null,
  };
}
