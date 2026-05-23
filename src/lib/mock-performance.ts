import type { WorkerStation } from "../types/user.types";

export interface EmployeePerformance {
  userId: string;
  userName: string;
  role: "WORKER" | "DRIVER";
  outletId: string;
  outletName: string;
  workerStation: WorkerStation | null;
  totalJobs: number;
  washingCount?: number;
  ironingCount?: number;
  packingCount?: number;
  pickupCount?: number;
  deliveryCount?: number;
}

export interface PerformanceReportData {
  totalEmployees: number;
  totalWorkers: number;
  totalDrivers: number;
  totalJobs: number;
  topPerformer: EmployeePerformance | null;
  employees: EmployeePerformance[];
}

const outlets = [
  { id: "outlet-1", name: "Outlet Kemang" },
  { id: "outlet-2", name: "Outlet Senopati" },
  { id: "outlet-3", name: "Outlet Sudirman" },
];

interface EmployeeSeed {
  userId: string;
  userName: string;
  role: "WORKER" | "DRIVER";
  outletIdx: number;
  station: WorkerStation | null;
}

const employees: EmployeeSeed[] = [
  { userId: "w-1", userName: "Budi Hartono", role: "WORKER", outletIdx: 0, station: "WASHING" },
  { userId: "w-2", userName: "Dewi Anggraini", role: "WORKER", outletIdx: 0, station: "IRONING" },
  { userId: "w-3", userName: "Rina Lestari", role: "WORKER", outletIdx: 0, station: "PACKING" },
  { userId: "w-4", userName: "Joko Susilo", role: "WORKER", outletIdx: 1, station: "WASHING" },
  { userId: "w-5", userName: "Maya Putri", role: "WORKER", outletIdx: 1, station: "IRONING" },
  { userId: "w-6", userName: "Sari Wulan", role: "WORKER", outletIdx: 1, station: "PACKING" },
  { userId: "w-7", userName: "Faris Arif", role: "WORKER", outletIdx: 2, station: "WASHING" },
  { userId: "w-8", userName: "Citra Dewi", role: "WORKER", outletIdx: 2, station: "PACKING" },
  { userId: "d-1", userName: "Andi Setiawan", role: "DRIVER", outletIdx: 0, station: null },
  { userId: "d-2", userName: "Bayu Pratama", role: "DRIVER", outletIdx: 0, station: null },
  { userId: "d-3", userName: "Reza Putra", role: "DRIVER", outletIdx: 1, station: null },
  { userId: "d-4", userName: "Hendra Saputra", role: "DRIVER", outletIdx: 2, station: null },
];

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export interface PerformanceQuery {
  outletId?: string;
  startDate: Date;
  endDate: Date;
  role?: "WORKER" | "DRIVER";
}

export function getMockPerformanceReport(
  query: PerformanceQuery
): PerformanceReportData {
  const { outletId, startDate, endDate, role } = query;

  let filteredEmployees = employees;
  if (outletId) {
    const outletIdx = outlets.findIndex((o) => o.id === outletId);
    filteredEmployees = filteredEmployees.filter((e) => e.outletIdx === outletIdx);
  }
  if (role) {
    filteredEmployees = filteredEmployees.filter((e) => e.role === role);
  }

  const daysDiff = Math.max(
    1,
    Math.ceil((endDate.getTime() - startDate.getTime()) / 86400000)
  );

  const performanceList: EmployeePerformance[] = filteredEmployees.map((emp) => {
    const seed = parseInt(emp.userId.split("-")[1]) * 13 + daysDiff;
    const variance = 0.7 + seededRandom(seed) * 0.6;
    const baseJobsPerDay = emp.role === "WORKER" ? 5 : 3;
    const totalJobs = Math.floor(baseJobsPerDay * daysDiff * variance);

    const base: EmployeePerformance = {
      userId: emp.userId,
      userName: emp.userName,
      role: emp.role,
      outletId: outlets[emp.outletIdx].id,
      outletName: outlets[emp.outletIdx].name,
      workerStation: emp.station,
      totalJobs,
    };

    if (emp.role === "WORKER" && emp.station) {
      if (emp.station === "WASHING") base.washingCount = totalJobs;
      else if (emp.station === "IRONING") base.ironingCount = totalJobs;
      else if (emp.station === "PACKING") base.packingCount = totalJobs;
    } else if (emp.role === "DRIVER") {
      base.pickupCount = Math.floor(totalJobs * 0.6);
      base.deliveryCount = totalJobs - base.pickupCount;
    }

    return base;
  });

  performanceList.sort((a, b) => b.totalJobs - a.totalJobs);

  const totalWorkers = performanceList.filter((e) => e.role === "WORKER").length;
  const totalDrivers = performanceList.filter((e) => e.role === "DRIVER").length;
  const totalJobs = performanceList.reduce((sum, e) => sum + e.totalJobs, 0);
  const topPerformer = performanceList.length > 0 ? performanceList[0] : null;

  return {
    totalEmployees: performanceList.length,
    totalWorkers,
    totalDrivers,
    totalJobs,
    topPerformer,
    employees: performanceList,
  };
}

export const MOCK_OUTLETS_PERFORMANCE = outlets;
