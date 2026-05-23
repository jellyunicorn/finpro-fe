import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Plus, Shirt, Edit, Trash2 } from "lucide-react";
import PageHeader from "../../../components/admin/common/PageHeader";
import Card from "../../../components/admin/ui/Card";
import Button from "../../../components/admin/ui/Button";
import EmptyState from "../../../components/admin/common/EmptyState";
import FilterBar from "../../../components/admin/common/FilterBar";
import Select from "../../../components/admin/ui/Select";
import Pagination from "../../../components/admin/common/Pagination";
import StatusBadge from "../../../components/admin/ui/StatusBadge";
import ConfirmDialog from "../../../components/admin/ui/ConfirmDialog";
import LaundryItemFormModal from "./LaundryItemFormModal";
import { useDebounce } from "../../../hooks/useDebounce";
import { formatDate } from "../../../lib/format";
import { MOCK_LAUNDRY_ITEMS_FULL } from "../../../lib/mock-laundry-items-full";
import type { LaundryItem } from "../../../types/laundry-item.types";

const PER_PAGE = 10;

const STATUS_OPTIONS = [
  { value: "true", label: "Aktif" },
  { value: "false", label: "Tidak Aktif" },
];

export default function LaundryItemList() {
  const [items, setItems] = useState(MOCK_LAUNDRY_ITEMS_FULL);

  const [searchInput, setSearchInput] = useState("");
  const search = useDebounce(searchInput, 400);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [page, setPage] = useState(1);

  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<LaundryItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const filtered = useMemo(() => {
    let result = [...items];

    if (statusFilter !== "") {
      const isActive = statusFilter === "true";
      result = result.filter((i) => i.isActive === isActive);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          (i.description?.toLowerCase().includes(q) ?? false)
      );
    }

    return result;
  }, [items, search, statusFilter]);

  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PER_PAGE));
  const paginatedItems = filtered.slice(
    (page - 1) * PER_PAGE,
    page * PER_PAGE
  );

  const hasFilters = !!search || statusFilter !== "";

  const handleClearFilters = () => {
    setSearchInput("");
    setStatusFilter("");
    setPage(1);
  };

  const handleAdd = () => {
    setEditingItem(null);
    setFormModalOpen(true);
  };

  const handleEdit = (item: LaundryItem) => {
    setEditingItem(item);
    setFormModalOpen(true);
  };

  const handleFormSuccess = (saved: LaundryItem) => {
    setItems((prev) => {
      const existingIdx = prev.findIndex((i) => i.id === saved.id);
      if (existingIdx >= 0) {
        const next = [...prev];
        next[existingIdx] = saved;
        return next;
      }
      return [saved, ...prev];
    });
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      // TODO: ganti ke real API
      // await laundryItemApi.delete(deleteTarget);
      await new Promise((resolve) => setTimeout(resolve, 600));
      setItems((prev) => prev.filter((i) => i.id !== deleteTarget));
      toast.success("Laundry item berhasil dihapus");
      setDeleteTarget(null);
    } catch {
      toast.error("Gagal hapus item");
    } finally {
      setIsDeleting(false);
    }
  };

  const deleteTargetItem = items.find((i) => i.id === deleteTarget);

  return (
    <div className="font-dmsans">
      <PageHeader
        title="Laundry Items"
        description="Master data jenis pakaian untuk laundry"
        action={
          <Button onClick={handleAdd}>
            <Plus className="size-4" />
            Tambah Item
          </Button>
        }
      />

      <FilterBar
        searchValue={searchInput}
        onSearchChange={(v) => {
          setSearchInput(v);
          setPage(1);
        }}
        searchPlaceholder="Cari nama item atau deskripsi..."
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

      {paginatedItems.length === 0 ? (
        <Card>
          <EmptyState
            icon={Shirt}
            title={
              hasFilters
                ? "Tidak ada item sesuai filter"
                : "Belum ada laundry item"
            }
            description={
              hasFilters
                ? "Coba reset filter untuk lihat semua item."
                : "Tambahkan jenis pakaian (kaos, celana, dll) yang dapat di-laundry."
            }
            action={
              !hasFilters ? (
                <Button onClick={handleAdd}>
                  <Plus className="size-4" />
                  Tambah Item
                </Button>
              ) : undefined
            }
          />
        </Card>
      ) : (
        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#BAD6F5]/30 border-b border-[#BAD6F5]">
                <tr>
                  <Th>Nama Item</Th>
                  <Th>Deskripsi</Th>
                  <Th>Status</Th>
                  <Th>Updated</Th>
                  <Th align="center">Aksi</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {paginatedItems.map((item) => (
                  <tr key={item.id} className="hover:bg-neutral-50 transition-colors">
                    <Td>
                      <span className="font-medium text-neutral-800">{item.name}</span>
                    </Td>
                    <Td>
                      <span className="text-sm text-neutral-600">
                        {item.description || (
                          <span className="text-neutral-400 italic">-</span>
                        )}
                      </span>
                    </Td>
                    <Td>
                      {item.isActive ? (
                        <StatusBadge variant="mint">Aktif</StatusBadge>
                      ) : (
                        <StatusBadge variant="neutral">Tidak Aktif</StatusBadge>
                      )}
                    </Td>
                    <Td>
                      <span className="text-xs text-neutral-500">
                        {formatDate(item.updatedAt)}
                      </span>
                    </Td>
                    <Td align="center">
                      <div className="flex items-center gap-1 justify-center">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 rounded-lg text-[#296FDA] hover:bg-[#BAD6F5]/40 hover:cursor-pointer"
                          aria-label="Edit"
                        >
                          <Edit className="size-4" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(item.id)}
                          className="p-2 rounded-lg text-[#F87171] hover:bg-red-50 hover:cursor-pointer"
                          aria-label="Hapus"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
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
        </Card>
      )}

      <LaundryItemFormModal
        isOpen={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        onSuccess={handleFormSuccess}
        editingItem={editingItem}
      />

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Hapus Laundry Item?"
        message={`Yakin ingin menghapus "${deleteTargetItem?.name}"? Order yang sudah pakai item ini tetap valid, tapi item gak akan muncul di Process Order baru.`}
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
