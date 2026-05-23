import { useMemo, useState } from "react";
import { AlertCircle, MessageCircle, Droplet, Shirt, Package } from "lucide-react";
import PageHeader from "../../../components/admin/common/PageHeader";
import Card from "../../../components/admin/ui/Card";
import EmptyState from "../../../components/admin/common/EmptyState";
import FilterBar from "../../../components/admin/common/FilterBar";
import Select from "../../../components/admin/ui/Select";
import Button from "../../../components/admin/ui/Button";
import Pagination from "../../../components/admin/common/Pagination";
import BypassStatusBadge from "./BypassStatusBadge";
import BypassReviewModal from "./BypassReviewModal";
import { useDebounce } from "../../../hooks/useDebounce";
import { useIsSuperAdmin, useUser } from "../../../store/auth.store";
import { formatDateTime } from "../../../lib/format";
import { generateMockBypassRequests } from "../../../lib/mock-bypass";
import { MOCK_OUTLETS } from "../../../lib/mock-orders";
import type { WorkerStation } from "../../../types/bypass.types";

const ALL_MOCK_BYPASS = generateMockBypassRequests(15);
const PER_PAGE = 10;

const STATUS_OPTIONS = [
  { value: "PENDING", label: "Pending" },
  { value: "APPROVED", label: "Approved" },
  { value: "REJECTED", label: "Rejected" },
];

const STATION_OPTIONS = [
  { value: "WASHING", label: "Washing" },
  { value: "IRONING", label: "Ironing" },
  { value: "PACKING", label: "Packing" },
];

const OUTLET_OPTIONS = MOCK_OUTLETS.map((o) => ({ value: o.id, label: o.name }));

const STATION_ICONS: Record<WorkerStation, React.ElementType> = {
  WASHING: Droplet,
  IRONING: Shirt,
  PACKING: Package,
};

export default function BypassRequestList() {
  const user = useUser();
  const isSuperAdmin = useIsSuperAdmin();

  const [searchInput, setSearchInput] = useState("");
  const search = useDebounce(searchInput, 400);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [stationFilter, setStationFilter] = useState<string>("");
  const [outletFilter, setOutletFilter] = useState<string>("");
  const [page, setPage] = useState(1);
  const [reviewBypassId, setReviewBypassId] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const filteredBypass = useMemo(() => {
    let result = [...ALL_MOCK_BYPASS];

    // Outlet admin auto-filter ke outlet sendiri
    if (!isSuperAdmin && user?.outletId) {
      result = result.filter((b) => b.outletId === user.outletId);
    } else if (outletFilter) {
      result = result.filter((b) => b.outletId === outletFilter);
    }

    if (statusFilter) result = result.filter((b) => b.status === statusFilter);
    if (stationFilter)
      result = result.filter((b) => b.workerStation === stationFilter);

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (b) =>
          b.orderNumber.toLowerCase().includes(q) ||
          b.workerName.toLowerCase().includes(q)
      );
    }

    // Sort: pending dulu, terus by createdAt desc
    result.sort((a, b) => {
      if (a.status === "PENDING" && b.status !== "PENDING") return -1;
      if (a.status !== "PENDING" && b.status === "PENDING") return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return result;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, statusFilter, stationFilter, outletFilter, isSuperAdmin, user, refreshKey]);

  const totalItems = filteredBypass.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PER_PAGE));
  const paginatedBypass = filteredBypass.slice(
    (page - 1) * PER_PAGE,
    page * PER_PAGE
  );

  const hasFilters = !!search || !!statusFilter || !!stationFilter || !!outletFilter;
  const pendingCount = ALL_MOCK_BYPASS.filter((b) => b.status === "PENDING").length;

  const handleClearFilters = () => {
    setSearchInput("");
    setStatusFilter("");
    setStationFilter("");
    setOutletFilter("");
    setPage(1);
  };

  return (
    <div className="font-dmsans">
      <PageHeader
        title="Bypass Requests"
        description={`Review request bypass dari worker pas quantity tidak match (${pendingCount} pending)`}
      />

      <FilterBar
        searchValue={searchInput}
        onSearchChange={(v) => {
          setSearchInput(v);
          setPage(1);
        }}
        searchPlaceholder="Cari nomor order atau nama worker..."
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
        <Select
          value={stationFilter}
          onChange={(e) => {
            setStationFilter(e.target.value);
            setPage(1);
          }}
          placeholder="Semua Station"
          options={STATION_OPTIONS}
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
      </FilterBar>

      {paginatedBypass.length === 0 ? (
        <Card>
          <EmptyState
            icon={AlertCircle}
            title={hasFilters ? "Tidak ada bypass yang sesuai filter" : "Belum ada bypass request"}
            description={
              hasFilters
                ? "Coba reset filter untuk lihat semua data."
                : "Request bypass dari worker akan tampil di sini."
            }
          />
        </Card>
      ) : (
        <>
          <div className="space-y-3">
            {paginatedBypass.map((bypass) => {
              const StationIcon = STATION_ICONS[bypass.workerStation];
              return (
                <Card key={bypass.id} variant="bordered" className="p-0 overflow-hidden">
                  <div className="p-5 flex justify-between items-start gap-4 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-xs font-semibold text-[#185FA5]">
                        {bypass.orderNumber}
                      </p>
                      <p className="text-sm font-medium mt-1">
                        Worker: {bypass.workerName}
                      </p>
                      <p className="text-xs text-neutral-500 mt-1 flex items-center gap-1">
                        <StationIcon className="size-3" />
                        {bypass.workerStation} Station ·{" "}
                        {formatDateTime(bypass.createdAt)}
                      </p>
                      {isSuperAdmin && (
                        <p className="text-xs text-neutral-500 mt-0.5">
                          {bypass.outletName}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <BypassStatusBadge status={bypass.status} />
                      <Button
                        size="sm"
                        onClick={() => setReviewBypassId(bypass.id)}
                      >
                        {bypass.status === "PENDING" ? "Review" : "Lihat"}
                      </Button>
                    </div>
                  </div>
                  {bypass.workerNotes && (
                    <div className="px-5 py-3 bg-[#FAEEDA] border-t border-[#FED7AA]">
                      <p className="text-sm text-[#854F0B] flex items-start gap-2">
                        <MessageCircle className="size-4 mt-0.5 shrink-0" />
                        <span>"{bypass.workerNotes}"</span>
                      </p>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>

          <div className="mt-4">
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

      <BypassReviewModal
        bypassId={reviewBypassId}
        onClose={() => setReviewBypassId(null)}
        onReviewed={() => setRefreshKey((k) => k + 1)}
      />
    </div>
  );
}
