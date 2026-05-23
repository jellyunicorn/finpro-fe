import { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  TrendingUp,
  Package,
  Receipt,
  Trophy,
  Calendar,
  Download,
} from "lucide-react";
import PageHeader from "../../../components/admin/common/PageHeader";
import Card from "../../../components/admin/ui/Card";
import Select from "../../../components/admin/ui/Select";
import Button from "../../../components/admin/ui/Button";
import MetricCard from "../../../components/admin/common/MetricCard";
import { useIsSuperAdmin, useUser } from "../../../store/auth.store";
import { formatCurrency, formatDateInput } from "../../../lib/format";
import {
  getMockSalesReport,
  getDefaultDateRange,
  MOCK_OUTLETS_REPORT,
  type GroupBy,
} from "../../../lib/mock-sales";

// Brand color palette buat chart
const CHART_COLORS = ["#296FDA", "#A7F3D0", "#FED7AA", "#F87171", "#BAD6F5"];
const PRIMARY_COLOR = "#296FDA";

const GROUP_BY_OPTIONS = [
  { value: "day", label: "Per Hari" },
  { value: "month", label: "Per Bulan" },
  { value: "year", label: "Per Tahun" },
];

const OUTLET_OPTIONS = MOCK_OUTLETS_REPORT.map((o) => ({
  value: o.id,
  label: o.name,
}));

export default function SalesReport() {
  const isSuperAdmin = useIsSuperAdmin();
  const user = useUser();

  const [groupBy, setGroupBy] = useState<GroupBy>("month");
  const defaultRange = useMemo(() => getDefaultDateRange("month"), []);
  const [startDate, setStartDate] = useState(
    formatDateInput(defaultRange.startDate),
  );
  const [endDate, setEndDate] = useState(formatDateInput(defaultRange.endDate));
  const [outletFilter, setOutletFilter] = useState<string>("");

  // Outlet admin auto-filter ke outlet sendiri (gak bisa ubah)
  const effectiveOutletId = isSuperAdmin
    ? outletFilter || undefined
    : user?.outletId || undefined;

  const reportData = useMemo(
    () =>
      getMockSalesReport({
        outletId: effectiveOutletId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        groupBy,
      }),
    [effectiveOutletId, startDate, endDate, groupBy],
  );

  const handleGroupByChange = (newGroup: GroupBy) => {
    setGroupBy(newGroup);
    // Auto-adjust date range to sensible default
    const range = getDefaultDateRange(newGroup);
    setStartDate(formatDateInput(range.startDate));
    setEndDate(formatDateInput(range.endDate));
  };

  return (
    <div className="font-dmsans space-y-4">
      <PageHeader
        title="Sales Report"
        description={
          isSuperAdmin
            ? "Laporan income semua outlet"
            : `Laporan income outlet ${user?.outletId ?? "Anda"}`
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
        <div className="flex items-end gap-3 flex-wrap">
          <div className="flex-1 min-w-[140px]">
            <label className="text-xs font-medium text-neutral-500 mb-1 block">
              Group By
            </label>
            <Select
              value={groupBy}
              onChange={(e) => handleGroupByChange(e.target.value as GroupBy)}
              options={GROUP_BY_OPTIONS}
              className="w-full"
            />
          </div>
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
        </div>
      </Card>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Total Revenue"
          value={formatCurrency(reportData.totalRevenue)}
          icon={TrendingUp}
        />
        <MetricCard
          label="Total Orders"
          value={reportData.totalOrders.toLocaleString("id-ID")}
          icon={Package}
        />
        <MetricCard
          label="Avg Order Value"
          value={formatCurrency(reportData.avgOrderValue)}
          icon={Receipt}
        />
        <MetricCard
          label="Top Outlet"
          value={
            reportData.topOutlet
              ? reportData.topOutlet.outletName.replace("Outlet ", "")
              : "-"
          }
          icon={Trophy}
        />
      </div>

      {/* Bar Chart - Revenue per Period */}
      <Card variant="bordered">
        <h3 className="text-base font-medium text-[#296FDA] mb-4 flex items-center gap-2">
          <Calendar className="size-4" />
          Revenue per{" "}
          {groupBy === "day" ? "Hari" : groupBy === "month" ? "Bulan" : "Tahun"}
        </h3>
        <div style={{ width: "100%", height: 320 }}>
          <ResponsiveContainer>
            <BarChart
              data={reportData.timeSeries}
              margin={{ top: 10, right: 20, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
              <XAxis
                dataKey="period"
                tick={{ fontSize: 11, fill: "#6B7280" }}
                angle={-30}
                textAnchor="end"
                height={60}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#6B7280" }}
                tickFormatter={(value) =>
                  value >= 1_000_000
                    ? `${(value / 1_000_000).toFixed(1)}M`
                    : value >= 1_000
                      ? `${(value / 1_000).toFixed(0)}K`
                      : value.toString()
                }
              />
              <Tooltip
                formatter={(value) => [
                  formatCurrency(Number(value ?? 0)),
                  "Revenue",
                ]}
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #BAD6F5",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Bar
                dataKey="revenue"
                fill={PRIMARY_COLOR}
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Line Chart - Orders Trend */}
      <Card variant="bordered">
        <h3 className="text-base font-medium text-[#296FDA] mb-4 flex items-center gap-2">
          <Package className="size-4" />
          Orders Trend
        </h3>
        <div style={{ width: "100%", height: 280 }}>
          <ResponsiveContainer>
            <LineChart
              data={reportData.timeSeries}
              margin={{ top: 10, right: 20, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
              <XAxis
                dataKey="period"
                tick={{ fontSize: 11, fill: "#6B7280" }}
                angle={-30}
                textAnchor="end"
                height={60}
              />
              <YAxis tick={{ fontSize: 11, fill: "#6B7280" }} />
              <Tooltip
                formatter={(value) => [
                  Number(value ?? 0).toLocaleString("id-ID"),
                  "Orders",
                ]}
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #BAD6F5",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Line
                type="monotone"
                dataKey="orderCount"
                stroke={PRIMARY_COLOR}
                strokeWidth={2}
                dot={{ fill: PRIMARY_COLOR, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Pie Chart - Revenue per Outlet (super admin only & kalo gak filter outlet) */}
      {isSuperAdmin && !outletFilter && reportData.byOutlet.length > 1 && (
        <Card variant="bordered">
          <h3 className="text-base font-medium text-[#296FDA] mb-4 flex items-center gap-2">
            <Trophy className="size-4" />
            Revenue per Outlet
          </h3>
          <div style={{ width: "100%", height: 320 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={reportData.byOutlet}
                  dataKey="revenue"
                  nameKey="outletName"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={50}
                  label={(props) =>
                    `${(props as any).outletName ?? ""}: ${(((props as any).percent ?? 0) * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                >
                  {reportData.byOutlet.map((_, idx) => (
                    <Cell
                      key={`cell-${idx}`}
                      fill={CHART_COLORS[idx % CHART_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => formatCurrency(Number(value ?? 0))}
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #BAD6F5",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}

      {/* Detail Table */}
      <Card className="p-0 overflow-hidden">
        <div className="px-5 py-4 border-b border-[#BAD6F5]">
          <h3 className="text-base font-medium text-[#296FDA]">
            Detail Breakdown
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#BAD6F5]/30 border-b border-[#BAD6F5]">
              <tr>
                <Th>Period</Th>
                <Th align="right">Orders</Th>
                <Th align="right">Revenue</Th>
                <Th align="right">Avg / Order</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {reportData.timeSeries.map((row) => (
                <tr
                  key={row.date}
                  className="hover:bg-neutral-50 transition-colors"
                >
                  <Td>{row.period}</Td>
                  <Td align="right">
                    {row.orderCount.toLocaleString("id-ID")}
                  </Td>
                  <Td align="right" className="font-medium">
                    {formatCurrency(row.revenue)}
                  </Td>
                  <Td align="right">
                    {formatCurrency(
                      row.orderCount > 0
                        ? Math.floor(row.revenue / row.orderCount)
                        : 0,
                    )}
                  </Td>
                </tr>
              ))}
              <tr className="bg-[#E6F1FB] font-semibold">
                <Td>Total</Td>
                <Td align="right">
                  {reportData.totalOrders.toLocaleString("id-ID")}
                </Td>
                <Td align="right" className="text-[#185FA5]">
                  {formatCurrency(reportData.totalRevenue)}
                </Td>
                <Td align="right">
                  {formatCurrency(reportData.avgOrderValue)}
                </Td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
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
  className = "",
}: {
  children: React.ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
}) {
  return (
    <td
      className={`px-4 py-3 text-sm text-neutral-700 text-${align} ${className}`}
    >
      {children}
    </td>
  );
}
