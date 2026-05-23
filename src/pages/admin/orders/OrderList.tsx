import { useMemo, useState } from "react";
import { Link } from "react-router";
import { Eye, Package } from "lucide-react";
import PageHeader from "../../../components/admin/common/PageHeader";
import Card from "../../../components/admin/ui/Card";
import EmptyState from "../../../components/admin/common/EmptyState";
import FilterBar from "../../../components/admin/common/FilterBar";
import Select from "../../../components/admin/ui/Select";
import Pagination from "../../../components/admin/common/Pagination";
import OrderStatusBadge from "../../../components/admin/common/OrderStatusBadge";
import StatusBadge from "../../../components/admin/ui/StatusBadge";
import { TableRowSkeleton } from "../../../components/admin/common/Skeleton";
import { useIsSuperAdmin, useUser } from "../../../store/auth.store";
import { useDebounce } from "../../../hooks/useDebounce";
import { formatCurrency, formatDate, formatWeight } from "../../../lib/format";
import { ORDER_STATUS_LABELS } from "../../../constants/order-status";
import { generateMockOrders, MOCK_OUTLETS } from "../../../lib/mock-orders";

// Mock data generated once at module load
const ALL_MOCK_ORDERS = generateMockOrders(45);
const PER_PAGE = 10;

const STATUS_OPTIONS = Object.entries(ORDER_STATUS_LABELS).map(
  ([value, label]) => ({ value, label })
);
const OUTLET_OPTIONS = MOCK_OUTLETS.map((o) => ({ value: o.id, label: o.name }));
const SORT_OPTIONS = [
  { value: "createdAt-desc", label: "Terbaru" },
  { value: "createdAt-asc", label: "Terlama" },
  { value: "totalAmount-desc", label: "Total Tertinggi" },
  { value: "totalAmount-asc", label: "Total Terendah" },
];

export default function OrderList() {
  const user = useUser();
  const isSuperAdmin = useIsSuperAdmin();

  const [searchInput, setSearchInput] = useState("");
  const search = useDebounce(searchInput, 400);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [outletFilter, setOutletFilter] = useState<string>("");
  const [sortKey, setSortKey] = useState<string>("createdAt-desc");
  const [page, setPage] = useState(1);
  const [isLoading] = useState(false);

  // CLIENT-SIDE filtering buat MOCK data.
  // Pas integrate ke backend:
  //   const { data } = useQuery({ queryKey: [...], queryFn: () => orderApi.list({...}) })
  const filteredAndSorted = useMemo(() => {
    let result = [...ALL_MOCK_ORDERS];

    if (!isSuperAdmin && user?.outletId) {
      result = result.filter((o) => o.outletId === user.outletId);
    } else if (outletFilter) {
      result = result.filter((o) => o.outletId === outletFilter);
    }

    if (statusFilter) {
      result = result.filter((o) => o.status === statusFilter);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (o) =>
          o.orderNumber.toLowerCase().includes(q) ||
          o.customerName.toLowerCase().includes(q)
      );
    }

    const [field, order] = sortKey.split("-");
    result.sort((a, b) => {
      const aVal =
        field === "totalAmount"
          ? a.totalAmount || 0
          : new Date(a.createdAt).getTime();
      const bVal =
        field === "totalAmount"
          ? b.totalAmount || 0
          : new Date(b.createdAt).getTime();
      return order === "desc" ? bVal - aVal : aVal - bVal;
    });

    return result;
  }, [search, statusFilter, outletFilter, sortKey, isSuperAdmin, user]);

  const totalItems = filteredAndSorted.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PER_PAGE));
  const paginatedOrders = filteredAndSorted.slice(
    (page - 1) * PER_PAGE,
    page * PER_PAGE
  );

  const hasFilters =
    !!search || !!statusFilter || !!outletFilter || sortKey !== "createdAt-desc";

  const handleClearFilters = () => {
    setSearchInput("");
    setStatusFilter("");
    setOutletFilter("");
    setSortKey("createdAt-desc");
    setPage(1);
  };

  return (
    <div className="font-dmsans">
      <PageHeader
        title="Orders"
        description={
          isSuperAdmin
            ? "Lihat dan kelola semua order dari seluruh outlet"
            : "Kelola order outlet Anda"
        }
      />

      <FilterBar
        searchValue={searchInput}
        onSearchChange={(v) => {
          setSearchInput(v);
          setPage(1);
        }}
        searchPlaceholder="Cari nomor order atau nama customer..."
        hasFilters={hasFilters}
        onClear={handleClearFilters}
      >
        <Select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          placeholder="Semua Status"
          options={STATUS_OPTIONS}
        />
        {isSuperAdmin && (
          <Select
            value={outletFilter}
            onChange={(e) => {
              setOutletFilter(e.target.value);
              setPage(1);
            }}
            placeholder="Semua Outlet"
            options={OUTLET_OPTIONS}
          />
        )}
        <Select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
          options={SORT_OPTIONS}
        />
      </FilterBar>

      <Card className="p-0 overflow-hidden">
        {paginatedOrders.length === 0 && !isLoading ? (
          <div className="p-6">
            <EmptyState
              icon={Package}
              title={hasFilters ? "Tidak ada order yang sesuai filter" : "Belum ada order"}
              description={
                hasFilters
                  ? "Coba ubah filter atau reset filter untuk melihat semua order."
                  : "Order yang masuk dari customer akan tampil di sini."
              }
            />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#BAD6F5]/30 border-b border-[#BAD6F5]">
                  <tr>
                    <Th>Order Number</Th>
                    <Th>Customer</Th>
                    {isSuperAdmin && <Th>Outlet</Th>}
                    <Th>Status</Th>
                    <Th>Weight</Th>
                    <Th>Total</Th>
                    <Th>Payment</Th>
                    <Th>Pickup Date</Th>
                    <Th align="center">Aksi</Th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {isLoading
                    ? Array.from({ length: 5 }).map((_, i) => (
                        <TableRowSkeleton key={i} columns={isSuperAdmin ? 9 : 8} />
                      ))
                    : paginatedOrders.map((order) => (
                        <tr
                          key={order.id}
                          className="hover:bg-neutral-50 transition-colors"
                        >
                          <Td>
                            <span className="font-mono text-xs font-medium text-[#296FDA]">
                              {order.orderNumber}
                            </span>
                          </Td>
                          <Td>{order.customerName}</Td>
                          {isSuperAdmin && (
                            <Td>
                              <span className="text-sm text-neutral-600">
                                {order.outletName}
                              </span>
                            </Td>
                          )}
                          <Td>
                            <OrderStatusBadge status={order.status} />
                          </Td>
                          <Td>{formatWeight(order.totalWeightKg)}</Td>
                          <Td className="font-medium">
                            {formatCurrency(order.totalAmount)}
                          </Td>
                          <Td>
                            {order.paidAt ? (
                              <StatusBadge variant="mint">Paid</StatusBadge>
                            ) : order.totalAmount ? (
                              <StatusBadge variant="peach">Unpaid</StatusBadge>
                            ) : (
                              <span className="text-xs text-neutral-400">-</span>
                            )}
                          </Td>
                          <Td>{formatDate(order.pickupScheduledAt)}</Td>
                          <Td align="center">
                            <Link
                              to={`/admin/orders/${order.id}`}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[#296FDA] hover:bg-[#BAD6F5]/40 transition-colors text-sm font-medium"
                            >
                              <Eye className="size-4" />
                              Detail
                            </Link>
                          </Td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t border-[#BAD6F5]/40">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
                totalItems={totalItems}
                perPage={PER_PAGE}
              />
            </div>
          </>
        )}
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
    <td className={`px-4 py-3 text-sm text-neutral-700 text-${align} ${className}`}>
      {children}
    </td>
  );
}
