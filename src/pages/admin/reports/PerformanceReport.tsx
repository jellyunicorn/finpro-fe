import { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  Trophy,
  Users,
  Truck,
  Briefcase,
  Crown,
  Medal,
  Download,
} from "lucide-react";
import PageHeader from "../../../components/admin/common/PageHeader";
import Card from "../../../components/admin/ui/Card";
import Select from "../../../components/admin/ui/Select";
import Button from "../../../components/admin/ui/Button";
import MetricCard from "../../../components/admin/common/MetricCard";
import StatusBadge from "../../../components/admin/ui/StatusBadge";
import EmptyState from "../../../components/admin/common/EmptyState";
import { useIsSuperAdmin, useUser } from "../../../store/auth.store";
import { formatDateInput } from "../../../lib/format";
import {
  getMockPerformanceReport,
  MOCK_OUTLETS_PERFORMANCE,
  type EmployeePerformance,
} from "../../../lib/mock-performance";
import { subDays, startOfMonth, endOfMonth } from "date-fns";
import { STATION_LABELS } from "../../../types/user.types";

const PRIMARY_COLOR = "#296FDA";
const TOP_3_COLORS = ["#FDBA10", "#94A3B8", "#CD7F32"]; // gold, silver, bronze

const OUTLET_OPTIONS = MOCK_OUTLETS_PERFORMANCE.map((o) => ({
  value: o.id,
  label: o.name,
}));

const ROLE_OPTIONS = [
  { value: "WORKER", label: "Worker" },
  { value: "DRIVER", label: "Driver" },
];

const ROLE_VARIANT: Record<"WORKER" | "DRIVER", "mint" | "info"> = {
  WORKER: "mint",
  DRIVER: "info",
};

export default function PerformanceReport() {
  const isSuperAdmin = useIsSuperAdmin();
  const user = useUser();

  // Default: bulan ini
  const today = new Date();
  const [startDate, setStartDate] = useState(
    formatDateInput(startOfMonth(today))
  );
  const [endDate, setEndDate] = useState(formatDateInput(endOfMonth(today)));
  const [outletFilter, setOutletFilter] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<string>("");

  const effectiveOutletId = isSuperAdmin
    ? outletFilter || undefined
    : user?.outletId || undefined;

  const reportData = useMemo(
    () =>
      getMockPerformanceReport({
        outletId: effectiveOutletId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        role: (roleFilter as "WORKER" | "DRIVER") || undefined,
      }),
    [effectiveOutletId, startDate, endDate, roleFilter]
  );

  // Top 5 buat leaderboard
  const top5 = reportData.employees.slice(0, 5);
  // Top 10 buat chart (biar gak overcrowded)
  const top10ChartData = reportData.employees.slice(0, 10).map((e) => ({
    name:
      e.userName.length > 12 ? e.userName.slice(0, 10) + ".." : e.userName,
    fullName: e.userName,
    jobs: e.totalJobs,
    role: e.role,
  }));

  // Quick date range presets
  const setLast7Days = () => {
    setStartDate(formatDateInput(subDays(today, 6)));
    setEndDate(formatDateInput(today));
  };
  const setLast30Days = () => {
    setStartDate(formatDateInput(subDays(today, 29)));
    setEndDate(formatDateInput(today));
  };
  const setThisMonth = () => {
    setStartDate(formatDateInput(startOfMonth(today)));
    setEndDate(formatDateInput(endOfMonth(today)));
  };

  return (
    <div className="font-dmsans space-y-4">
      <PageHeader
        title="Employee Performance Report"
        description={
          isSuperAdmin
            ? "Laporan performa karyawan semua outlet"
            : `Laporan performa karyawan outlet Anda`
        }
        action={
          <Button variant="outline" size="sm">
            <Download className="size-4" />
            Export CSV
          </Button>
        }
      />

      {/* Filter Bar */}
      <Card variant="bordered">
        <div className="flex items-end gap-3 flex-wrap mb-3">
          <div className="flex-1 min-w-[140px]">
            <label className="text-xs font-medium text-neutral-500 mb-1 block">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="h-10 w-full border rounded-lg border-neutral-300 px-3 text-sm focus:border-[#296FDA] focus:outline-none focus:ring-2 focus:ring-[#296FDA]/20"
            />
          </div>
          <div className="flex-1 min-w-[140px]">
            <label className="text-xs font-medium text-neutral-500 mb-1 block">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="h-10 w-full border rounded-lg border-neutral-300 px-3 text-sm focus:border-[#296FDA] focus:outline-none focus:ring-2 focus:ring-[#296FDA]/20"
            />
          </div>
          {isSuperAdmin && (
            <div className="flex-1 min-w-[140px]">
              <label className="text-xs font-medium text-neutral-500 mb-1 block">
                Outlet
              </label>
              <Select
                value={outletFilter}
                onChange={(e) => setOutletFilter(e.target.value)}
                placeholder="Semua Outlet"
                options={OUTLET_OPTIONS}
                className="w-full"
              />
            </div>
          )}
          <div className="flex-1 min-w-[140px]">
            <label className="text-xs font-medium text-neutral-500 mb-1 block">
              Role
            </label>
            <Select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              placeholder="Semua Role"
              options={ROLE_OPTIONS}
              className="w-full"
            />
          </div>
        </div>
        {/* Quick presets */}
        <div className="flex gap-2 text-xs">
          <button
            onClick={setLast7Days}
            className="px-3 py-1 rounded-full bg-[#BAD6F5]/40 text-[#296FDA] hover:bg-[#BAD6F5] transition-colors hover:cursor-pointer"
          >
            7 Hari Terakhir
          </button>
          <button
            onClick={setLast30Days}
            className="px-3 py-1 rounded-full bg-[#BAD6F5]/40 text-[#296FDA] hover:bg-[#BAD6F5] transition-colors hover:cursor-pointer"
          >
            30 Hari Terakhir
          </button>
          <button
            onClick={setThisMonth}
            className="px-3 py-1 rounded-full bg-[#BAD6F5]/40 text-[#296FDA] hover:bg-[#BAD6F5] transition-colors hover:cursor-pointer"
          >
            Bulan Ini
          </button>
        </div>
      </Card>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Total Employees"
          value={reportData.totalEmployees}
          icon={Users}
        />
        <MetricCard
          label="Workers"
          value={reportData.totalWorkers}
          icon={Briefcase}
        />
        <MetricCard
          label="Drivers"
          value={reportData.totalDrivers}
          icon={Truck}
        />
        <MetricCard
          label="Total Jobs"
          value={reportData.totalJobs.toLocaleString("id-ID")}
          icon={Trophy}
        />
      </div>

      {reportData.employees.length === 0 ? (
        <Card>
          <EmptyState
            icon={Users}
            title="Belum ada data performance"
            description="Coba ubah filter date range atau outlet untuk lihat data."
          />
        </Card>
      ) : (
        <>
          {/* Top 5 Leaderboard */}
          <Card variant="bordered">
            <h3 className="text-base font-medium text-[#296FDA] mb-4 flex items-center gap-2">
              <Crown className="size-4 text-amber-500" />
              Top 5 Performers
            </h3>
            <div className="space-y-2">
              {top5.map((emp, idx) => (
                <LeaderboardRow
                  key={emp.userId}
                  rank={idx + 1}
                  employee={emp}
                  maxJobs={top5[0]?.totalJobs ?? 1}
                />
              ))}
            </div>
          </Card>

          {/* Bar Chart */}
          <Card variant="bordered">
            <h3 className="text-base font-medium text-[#296FDA] mb-4 flex items-center gap-2">
              <Trophy className="size-4" />
              Jobs per Employee (Top 10)
            </h3>
            <div style={{ width: "100%", height: 320 }}>
              <ResponsiveContainer>
                <BarChart
                  data={top10ChartData}
                  margin={{ top: 10, right: 20, left: 20, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 11, fill: "#6B7280" }}
                    angle={-30}
                    textAnchor="end"
                  />
                  <YAxis tick={{ fontSize: 11, fill: "#6B7280" }} />
                  <Tooltip
                    formatter={(value) => [
                     `${Number(value ?? 0).toLocaleString("id-ID")} jobs`,
                      "Total",
                    ]}
                    labelFormatter={(_, payload) => {
                      const item = payload[0]?.payload;
                      return item ? `${item.fullName} (${item.role})` : "";
                    }}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #BAD6F5",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="jobs" radius={[6, 6, 0, 0]}>
                    {top10ChartData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          index < 3 ? TOP_3_COLORS[index] : PRIMARY_COLOR
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Detail Table */}
          <Card className="p-0 overflow-hidden">
            <div className="px-5 py-4 border-b border-[#BAD6F5]">
              <h3 className="text-base font-medium text-[#296FDA]">
                Detail Breakdown ({reportData.employees.length} karyawan)
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#BAD6F5]/30 border-b border-[#BAD6F5]">
                  <tr>
                    <Th align="center">Rank</Th>
                    <Th>Nama</Th>
                    <Th>Role</Th>
                    {isSuperAdmin && <Th>Outlet</Th>}
                    <Th>Station / Type</Th>
                    <Th align="right">Total Jobs</Th>
                    <Th>Breakdown</Th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {reportData.employees.map((emp, idx) => (
                    <tr
                      key={emp.userId}
                      className="hover:bg-neutral-50 transition-colors"
                    >
                      <Td align="center">
                        {idx < 3 ? (
                          <Medal
                            className="size-5 inline-block"
                            style={{ color: TOP_3_COLORS[idx] }}
                          />
                        ) : (
                          <span className="text-neutral-400 text-sm">
                            #{idx + 1}
                          </span>
                        )}
                      </Td>
                      <Td>
                        <div className="flex items-center gap-2">
                          <div className="size-8 shrink-0 rounded-full bg-[#BAD6F5] flex items-center justify-center text-xs font-bold text-[#296FDA]">
                            {emp.userName.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-medium">{emp.userName}</span>
                        </div>
                      </Td>
                      <Td>
                        <StatusBadge variant={ROLE_VARIANT[emp.role]}>
                          {emp.role}
                        </StatusBadge>
                      </Td>
                      {isSuperAdmin && (
                        <Td>
                          <span className="text-xs">{emp.outletName}</span>
                        </Td>
                      )}
                      <Td>
                        {emp.workerStation ? (
                          STATION_LABELS[emp.workerStation]
                        ) : emp.role === "DRIVER" ? (
                          <span className="text-xs text-neutral-500">
                            Pickup + Delivery
                          </span>
                        ) : (
                          <span className="text-neutral-400">-</span>
                        )}
                      </Td>
                      <Td align="right">
                        <span className="font-semibold text-[#296FDA]">
                          {emp.totalJobs.toLocaleString("id-ID")}
                        </span>
                      </Td>
                      <Td>
                        <BreakdownCell emp={emp} />
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}

// Leaderboard row dengan progress bar
function LeaderboardRow({
  rank,
  employee,
  maxJobs,
}: {
  rank: number;
  employee: EmployeePerformance;
  maxJobs: number;
}) {
  const percentage = (employee.totalJobs / maxJobs) * 100;
  const isTop3 = rank <= 3;

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-50">
      {/* Rank medal */}
      <div className="w-8 flex justify-center shrink-0">
        {isTop3 ? (
          <Medal
            className="size-6"
            style={{ color: TOP_3_COLORS[rank - 1] }}
          />
        ) : (
          <span className="text-neutral-400 font-semibold">#{rank}</span>
        )}
      </div>

      {/* Avatar */}
      <div className="size-10 shrink-0 rounded-full bg-[#BAD6F5] flex items-center justify-center text-sm font-bold text-[#296FDA]">
        {employee.userName.charAt(0).toUpperCase()}
      </div>

      {/* Name + meta */}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm">{employee.userName}</p>
        <p className="text-xs text-neutral-500">
          {employee.role}
          {employee.workerStation &&
            ` · ${STATION_LABELS[employee.workerStation]}`}
          {" · "}
          {employee.outletName}
        </p>
      </div>

      {/* Jobs + bar */}
      <div className="flex flex-col items-end gap-1 w-32">
        <span className="text-sm font-semibold text-[#296FDA]">
          {employee.totalJobs.toLocaleString("id-ID")} jobs
        </span>
        <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${percentage}%`,
              background: isTop3 ? TOP_3_COLORS[rank - 1] : PRIMARY_COLOR,
            }}
          />
        </div>
      </div>
    </div>
  );
}

// Breakdown cell - tampilkan station/type breakdown
function BreakdownCell({ emp }: { emp: EmployeePerformance }) {
  if (emp.role === "DRIVER") {
    return (
      <div className="flex gap-3 text-xs text-neutral-600">
        <span>
          <span className="text-neutral-400">Pickup:</span>{" "}
          {emp.pickupCount?.toLocaleString("id-ID") ?? 0}
        </span>
        <span>
          <span className="text-neutral-400">Delivery:</span>{" "}
          {emp.deliveryCount?.toLocaleString("id-ID") ?? 0}
        </span>
      </div>
    );
  }
  // Worker
  return (
    <span className="text-xs text-neutral-500 italic">
      {emp.workerStation
        ? `${STATION_LABELS[emp.workerStation]} only`
        : "-"}
    </span>
  );
}

function Th({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "center" | "right";
}) {
  return (
    <th
      className={`px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[#296FDA] text-${align}`}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "center" | "right";
}) {
  return (
    <td className={`px-4 py-3 text-sm text-neutral-700 text-${align}`}>
      {children}
    </td>
  );
}
