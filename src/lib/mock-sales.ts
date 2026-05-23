import {
  format,
  startOfDay,
  endOfDay,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  eachDayOfInterval,
  eachMonthOfInterval,
  eachYearOfInterval,
  subDays,
  subMonths,
} from "date-fns";

export type GroupBy = "day" | "month" | "year";

export interface SalesDataPoint {
  period: string; // formatted label (e.g. "15 May", "May 2026", "2026")
  date: string; // ISO date untuk sorting
  revenue: number;
  orderCount: number;
}

export interface OutletRevenue {
  outletId: string;
  outletName: string;
  revenue: number;
  orderCount: number;
}

export interface SalesReportData {
  totalRevenue: number;
  totalOrders: number;
  avgOrderValue: number;
  topOutlet: OutletRevenue | null;
  timeSeries: SalesDataPoint[];
  byOutlet: OutletRevenue[];
}

const outlets = [
  { id: "outlet-1", name: "Outlet Kemang" },
  { id: "outlet-2", name: "Outlet Senopati" },
  { id: "outlet-3", name: "Outlet Sudirman" },
];

// Seeded pseudo-random untuk hasil konsisten
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function generateRevenueForPeriod(date: Date, outletIdx: number, groupBy: GroupBy): { revenue: number; orderCount: number } {
  // Seed berdasarkan tanggal + outlet
  const seed = date.getTime() / 1000000 + outletIdx * 7;
  const baseOrders = groupBy === "day" ? 8 : groupBy === "month" ? 200 : 2400;
  const variance = seededRandom(seed) * 0.4 + 0.8; // 0.8 - 1.2 multiplier
  const orderCount = Math.floor(baseOrders * variance);
  const avgPerOrder = 50000 + seededRandom(seed + 1) * 80000;
  const revenue = Math.floor(orderCount * avgPerOrder);
  return { revenue, orderCount };
}

export interface SalesQuery {
  outletId?: string;
  startDate: Date;
  endDate: Date;
  groupBy: GroupBy;
}

export function getMockSalesReport(query: SalesQuery): SalesReportData {
  const { outletId, startDate, endDate, groupBy } = query;

  // Filter outlets - kalo specific outlet, cuma 1
  const filteredOutlets = outletId
    ? outlets.filter((o) => o.id === outletId)
    : outlets;

  // Generate time intervals berdasarkan groupBy
  let intervals: Date[] = [];
  let formatStr = "";
  if (groupBy === "day") {
    intervals = eachDayOfInterval({ start: startDate, end: endDate });
    formatStr = "d MMM";
  } else if (groupBy === "month") {
    intervals = eachMonthOfInterval({ start: startDate, end: endDate });
    formatStr = "MMM yyyy";
  } else {
    intervals = eachYearOfInterval({ start: startDate, end: endDate });
    formatStr = "yyyy";
  }

  // Generate time series - sum across outlets per period
  const timeSeries: SalesDataPoint[] = intervals.map((date) => {
    let totalRev = 0;
    let totalOrd = 0;
    filteredOutlets.forEach((outlet) => {
      const idx = outlets.findIndex((o) => o.id === outlet.id);
      const { revenue, orderCount } = generateRevenueForPeriod(date, idx, groupBy);
      totalRev += revenue;
      totalOrd += orderCount;
    });
    return {
      period: format(date, formatStr),
      date: date.toISOString(),
      revenue: totalRev,
      orderCount: totalOrd,
    };
  });

  // Aggregate per outlet (across whole date range)
  const byOutlet: OutletRevenue[] = filteredOutlets.map((outlet) => {
    const idx = outlets.findIndex((o) => o.id === outlet.id);
    let totalRev = 0;
    let totalOrd = 0;
    intervals.forEach((date) => {
      const { revenue, orderCount } = generateRevenueForPeriod(date, idx, groupBy);
      totalRev += revenue;
      totalOrd += orderCount;
    });
    return {
      outletId: outlet.id,
      outletName: outlet.name,
      revenue: totalRev,
      orderCount: totalOrd,
    };
  });

  // Summary metrics
  const totalRevenue = timeSeries.reduce((sum, d) => sum + d.revenue, 0);
  const totalOrders = timeSeries.reduce((sum, d) => sum + d.orderCount, 0);
  const avgOrderValue = totalOrders > 0 ? Math.floor(totalRevenue / totalOrders) : 0;
  const topOutlet =
    byOutlet.length > 0
      ? [...byOutlet].sort((a, b) => b.revenue - a.revenue)[0]
      : null;

  return {
    totalRevenue,
    totalOrders,
    avgOrderValue,
    topOutlet,
    timeSeries,
    byOutlet,
  };
}

// Helper: get default date range based on groupBy
export function getDefaultDateRange(groupBy: GroupBy): { startDate: Date; endDate: Date } {
  const today = new Date();
  switch (groupBy) {
    case "day":
      return {
        startDate: startOfDay(subDays(today, 29)), // 30 hari terakhir
        endDate: endOfDay(today),
      };
    case "month":
      return {
        startDate: startOfMonth(subMonths(today, 11)), // 12 bulan terakhir
        endDate: endOfMonth(today),
      };
    case "year":
      return {
        startDate: startOfYear(new Date(today.getFullYear() - 4, 0, 1)), // 5 tahun terakhir
        endDate: endOfYear(today),
      };
  }
}

export const MOCK_OUTLETS_REPORT = outlets;
