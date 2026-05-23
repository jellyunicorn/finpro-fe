import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { Plus, Store, Edit, Trash2, MapPin } from "lucide-react";
import PageHeader from "../../../components/admin/common/PageHeader";
import Card from "../../../components/admin/ui/Card";
import Button from "../../../components/admin/ui/Button";
import EmptyState from "../../../components/admin/common/EmptyState";
import FilterBar from "../../../components/admin/common/FilterBar";
import Select from "../../../components/admin/ui/Select";
import Pagination from "../../../components/admin/common/Pagination";
import StatusBadge from "../../../components/admin/ui/StatusBadge";
import ConfirmDialog from "../../../components/admin/ui/ConfirmDialog";
import { useDebounce } from "../../../hooks/useDebounce";
import { useIsSuperAdmin } from "../../../store/auth.store";
import { formatCurrency } from "../../../lib/format";
import { MOCK_OUTLET_FULL } from "../../../lib/mock-outlets";

const PER_PAGE = 10;

const STATUS_OPTIONS = [
  { value: "true", label: "Aktif" },
  { value: "false", label: "Tidak Aktif" },
];

export default function OutletList() {
  const navigate = useNavigate();
  const isSuperAdmin = useIsSuperAdmin();

  const [searchInput, setSearchInput] = useState("");
  const search = useDebounce(searchInput, 400);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [outlets, setOutlets] = useState(MOCK_OUTLET_FULL);

  const filtered = useMemo(() => {
    let result = [...outlets];

    if (statusFilter !== "") {
      const isActive = statusFilter === "true";
      result = result.filter((o) => o.isActive === isActive);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (o) =>
          o.name.toLowerCase().includes(q) ||
          o.fullAddress.toLowerCase().includes(q) ||
          o.city.toLowerCase().includes(q)
      );
    }

    return result;
  }, [outlets, search, statusFilter]);

  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PER_PAGE));
  const paginatedOutlets = filtered.slice(
    (page - 1) * PER_PAGE,
    page * PER_PAGE
  );

  const hasFilters = !!search || statusFilter !== "";

  const handleClearFilters = () => {
    setSearchInput("");
    setStatusFilter("");
    setPage(1);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      // TODO: ganti ke real API
      // await outletApi.delete(deleteTarget);
      await new Promise((resolve) => setTimeout(resolve, 800));
      setOutlets((prev) => prev.filter((o) => o.id !== deleteTarget));
      toast.success("Outlet berhasil dihapus");
      setDeleteTarget(null);
    } catch {
      toast.error("Gagal hapus outlet");
    } finally {
      setIsDeleting(false);
    }
  };

  const deleteTargetOutlet = outlets.find((o) => o.id === deleteTarget);

  return (
    <div className="font-dmsans">
      <PageHeader
        title="Outlets"
        description={
          isSuperAdmin
            ? "Kelola semua outlet Claundry"
            : "Lihat detail outlet Anda"
        }
        action={
          isSuperAdmin && (
            <Button onClick={() => navigate("/admin/outlets/create")}>
              <Plus className="size-4" />
              Tambah Outlet
            </Button>
          )
        }
      />

      <FilterBar
        searchValue={searchInput}
        onSearchChange={(v) => {
          setSearchInput(v);
          setPage(1);
        }}
        searchPlaceholder="Cari nama outlet atau alamat..."
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
      </FilterBar>

      {paginatedOutlets.length === 0 ? (
        <Card>
          <EmptyState
            icon={Store}
            title={hasFilters ? "Tidak ada outlet sesuai filter" : "Belum ada outlet"}
            description={
              hasFilters
                ? "Coba reset filter untuk lihat semua outlet."
                : "Tambahkan outlet pertama untuk mulai operasi."
            }
            action={
              isSuperAdmin && !hasFilters ? (
                <Button onClick={() => navigate("/admin/outlets/create")}>
                  <Plus className="size-4" />
                  Tambah Outlet
                </Button>
              ) : undefined
            }
          />
        </Card>
      ) : (
        <>
          <Card className="p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#BAD6F5]/30 border-b border-[#BAD6F5]">
                  <tr>
                    <Th>Nama Outlet</Th>
                    <Th>Alamat</Th>
                    <Th>Lokasi</Th>
                    <Th>Radius</Th>
                    <Th>Price/kg</Th>
                    <Th>Status</Th>
                    {isSuperAdmin && <Th align="center">Aksi</Th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {paginatedOutlets.map((outlet) => (
                    <tr key={outlet.id} className="hover:bg-neutral-50 transition-colors">
                      <Td>
                        <Link
                          to={`/admin/outlets/${outlet.id}/edit`}
                          className="font-medium text-[#296FDA] hover:underline"
                        >
                          {outlet.name}
                        </Link>
                      </Td>
                      <Td>
                        <div>
                          <p className="text-sm">{outlet.fullAddress}</p>
                          <p className="text-xs text-neutral-500 mt-0.5">
                            {outlet.city}, {outlet.province}
                          </p>
                        </div>
                      </Td>
                      <Td>
                        <a
                          href={`https://www.openstreetmap.org/?mlat=${outlet.latitude}&mlon=${outlet.longitude}&zoom=15`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-[#296FDA] hover:underline font-mono"
                        >
                          <MapPin className="size-3" />
                          {outlet.latitude.toFixed(4)}, {outlet.longitude.toFixed(4)}
                        </a>
                      </Td>
                      <Td>{outlet.serviceRadiusKm} km</Td>
                      <Td>{formatCurrency(outlet.pricePerKg)}</Td>
                      <Td>
                        {outlet.isActive ? (
                          <StatusBadge variant="mint">Aktif</StatusBadge>
                        ) : (
                          <StatusBadge variant="neutral">Tidak Aktif</StatusBadge>
                        )}
                      </Td>
                      {isSuperAdmin && (
                        <Td align="center">
                          <div className="flex items-center gap-1 justify-center">
                            <button
                              onClick={() => navigate(`/admin/outlets/${outlet.id}/edit`)}
                              className="p-2 rounded-lg text-[#296FDA] hover:bg-[#BAD6F5]/40 hover:cursor-pointer"
                              aria-label="Edit"
                            >
                              <Edit className="size-4" />
                            </button>
                            <button
                              onClick={() => setDeleteTarget(outlet.id)}
                              className="p-2 rounded-lg text-[#F87171] hover:bg-red-50 hover:cursor-pointer"
                              aria-label="Hapus"
                            >
                              <Trash2 className="size-4" />
                            </button>
                          </div>
                        </Td>
                      )}
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
          </Card>
        </>
      )}

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Hapus Outlet?"
        message={`Yakin ingin menghapus outlet "${deleteTargetOutlet?.name}"? Order yang sudah ada tidak akan terhapus, tapi outlet ini tidak bisa menerima order baru.`}
        confirmLabel="Ya, Hapus"
        variant="danger"
        isLoading={isDeleting}
      />
    </div>
  );
}

function Th({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "center";
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
  align?: "left" | "center";
}) {
  return (
    <td className={`px-4 py-3 text-sm text-neutral-700 text-${align}`}>
      {children}
    </td>
  );
}
