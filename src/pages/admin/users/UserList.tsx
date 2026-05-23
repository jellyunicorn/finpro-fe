import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  UserPlus,
  Users as UsersIcon,
  Edit,
  Trash2,
  Mail,
} from "lucide-react";
import PageHeader from "../../../components/admin/common/PageHeader";
import Card from "../../../components/admin/ui/Card";
import Button from "../../../components/admin/ui/Button";
import EmptyState from "../../../components/admin/common/EmptyState";
import FilterBar from "../../../components/admin/common/FilterBar";
import Select from "../../../components/admin/ui/Select";
import Pagination from "../../../components/admin/common/Pagination";
import StatusBadge from "../../../components/admin/ui/StatusBadge";
import ConfirmDialog from "../../../components/admin/ui/ConfirmDialog";
import UserFormModal from "./UserFormModal";
import TempPasswordModal from "./TempPasswordModal";
import { useDebounce } from "../../../hooks/useDebounce";
import { useUser } from "../../../store/auth.store";
import {
  MOCK_USERS_FULL,
  MOCK_OUTLETS_DROPDOWN,
} from "../../../lib/mock-users";
import {
  ROLE_LABELS,
  STATION_LABELS,
  type AppUser,
  type Role,
} from "../../../types/user.types";

const PER_PAGE = 10;

const ROLE_FILTER_OPTIONS = Object.entries(ROLE_LABELS).map(
  ([value, label]) => ({ value, label })
);

const OUTLET_OPTIONS = MOCK_OUTLETS_DROPDOWN.map((o) => ({
  value: o.id,
  label: o.name,
}));

const STATUS_OPTIONS = [
  { value: "true", label: "Aktif" },
  { value: "false", label: "Tidak Aktif" },
];

const ROLE_VARIANT: Record<Role, "info" | "mint" | "peach" | "neutral"> = {
  SUPER_ADMIN: "info",
  OUTLET_ADMIN: "info",
  WORKER: "mint",
  DRIVER: "mint",
  CUSTOMER: "neutral",
};

export default function UserList() {
  const currentUser = useUser();

  const [users, setUsers] = useState(MOCK_USERS_FULL);

  const [searchInput, setSearchInput] = useState("");
  const search = useDebounce(searchInput, 400);
  const [roleFilter, setRoleFilter] = useState<string>("");
  const [outletFilter, setOutletFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [page, setPage] = useState(1);

  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AppUser | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [tempPasswordUser, setTempPasswordUser] = useState<AppUser | null>(null);
  const [tempPassword, setTempPassword] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = [...users];

    if (roleFilter) result = result.filter((u) => u.role === roleFilter);
    if (outletFilter) result = result.filter((u) => u.outletId === outletFilter);
    if (statusFilter !== "") {
      const isActive = statusFilter === "true";
      result = result.filter((u) => u.isActive === isActive);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (u) =>
          u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
      );
    }

    return result;
  }, [users, search, roleFilter, outletFilter, statusFilter]);

  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PER_PAGE));
  const paginatedUsers = filtered.slice(
    (page - 1) * PER_PAGE,
    page * PER_PAGE
  );

  const hasFilters =
    !!search || !!roleFilter || !!outletFilter || statusFilter !== "";

  const handleClearFilters = () => {
    setSearchInput("");
    setRoleFilter("");
    setOutletFilter("");
    setStatusFilter("");
    setPage(1);
  };

  const handleAdd = () => {
    setEditingUser(null);
    setFormModalOpen(true);
  };

  const handleEdit = (user: AppUser) => {
    setEditingUser(user);
    setFormModalOpen(true);
  };

  const handleFormSuccess = (saved: AppUser, newTempPassword?: string) => {
    setUsers((prev) => {
      const existingIdx = prev.findIndex((u) => u.id === saved.id);
      if (existingIdx >= 0) {
        const next = [...prev];
        next[existingIdx] = saved;
        return next;
      }
      return [saved, ...prev];
    });

    // Kalo create baru, show temp password modal
    if (newTempPassword) {
      setTempPasswordUser(saved);
      setTempPassword(newTempPassword);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      // TODO: ganti ke real API
      // await userApi.delete(deleteTarget);
      await new Promise((resolve) => setTimeout(resolve, 600));
      setUsers((prev) => prev.filter((u) => u.id !== deleteTarget));
      toast.success("User berhasil dihapus");
      setDeleteTarget(null);
    } catch {
      toast.error("Gagal hapus user");
    } finally {
      setIsDeleting(false);
    }
  };

  const deleteTargetUser = users.find((u) => u.id === deleteTarget);

  return (
    <div className="font-dmsans">
      <PageHeader
        title="Users"
        description="Kelola data outlet admin, worker, driver, dan customer"
        action={
          <Button onClick={handleAdd}>
            <UserPlus className="size-4" />
            Tambah User
          </Button>
        }
      />

      <FilterBar
        searchValue={searchInput}
        onSearchChange={(v) => {
          setSearchInput(v);
          setPage(1);
        }}
        searchPlaceholder="Cari nama atau email..."
        hasFilters={hasFilters}
        onClear={handleClearFilters}
      >
        <Select
          value={roleFilter}
          onChange={(e) => {
            setRoleFilter(e.target.value);
            setPage(1);
          }}
          placeholder="Semua Role"
          options={ROLE_FILTER_OPTIONS}
        />
        <Select
          value={outletFilter}
          onChange={(e) => {
            setOutletFilter(e.target.value);
            setPage(1);
          }}
          placeholder="Semua Outlet"
          options={OUTLET_OPTIONS}
        />
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

      {paginatedUsers.length === 0 ? (
        <Card>
          <EmptyState
            icon={UsersIcon}
            title={
              hasFilters ? "Tidak ada user sesuai filter" : "Belum ada user"
            }
            description={
              hasFilters
                ? "Coba reset filter untuk lihat semua user."
                : "Tambahkan user baru untuk mengelola operasi outlet."
            }
            action={
              !hasFilters ? (
                <Button onClick={handleAdd}>
                  <UserPlus className="size-4" />
                  Tambah User
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
                  <Th>Nama</Th>
                  <Th>Email</Th>
                  <Th>Role</Th>
                  <Th>Outlet / Station</Th>
                  <Th>Verified</Th>
                  <Th>Status</Th>
                  <Th align="center">Aksi</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {paginatedUsers.map((user) => {
                  const isSelf = user.id === currentUser?.id;
                  return (
                    <tr
                      key={user.id}
                      className="hover:bg-neutral-50 transition-colors"
                    >
                      <Td>
                        <div className="flex items-center gap-2">
                          <div className="size-8 shrink-0 rounded-full bg-[#BAD6F5] flex items-center justify-center text-xs font-bold text-[#296FDA]">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-medium text-neutral-800">
                            {user.name}
                            {isSelf && (
                              <span className="ml-2 text-xs text-neutral-400 italic">
                                (you)
                              </span>
                            )}
                          </span>
                        </div>
                      </Td>
                      <Td>
                        <span className="text-sm text-neutral-600">
                          {user.email}
                        </span>
                      </Td>
                      <Td>
                        <StatusBadge variant={ROLE_VARIANT[user.role]}>
                          {ROLE_LABELS[user.role]}
                        </StatusBadge>
                      </Td>
                      <Td>
                        {user.outletName ? (
                          <div>
                            <p className="text-sm">{user.outletName}</p>
                            {user.workerStation && (
                              <p className="text-xs text-neutral-500 mt-0.5">
                                Station: {STATION_LABELS[user.workerStation]}
                              </p>
                            )}
                          </div>
                        ) : (
                          <span className="text-xs text-neutral-400 italic">
                            -
                          </span>
                        )}
                      </Td>
                      <Td>
                        {user.isVerified ? (
                          <StatusBadge variant="mint">Verified</StatusBadge>
                        ) : (
                          <StatusBadge variant="coral">Unverified</StatusBadge>
                        )}
                      </Td>
                      <Td>
                        {user.isActive ? (
                          <StatusBadge variant="mint">Aktif</StatusBadge>
                        ) : (
                          <StatusBadge variant="neutral">Tidak Aktif</StatusBadge>
                        )}
                      </Td>
                      <Td align="center">
                        <div className="flex items-center gap-1 justify-center">
                          {!user.isVerified && (
                            <button
                              onClick={() =>
                                toast.info(
                                  `Verifikasi email dikirim ulang ke ${user.email}`
                                )
                              }
                              className="p-2 rounded-lg text-amber-600 hover:bg-amber-50 hover:cursor-pointer"
                              aria-label="Resend verification email"
                              title="Resend verification email"
                            >
                              <Mail className="size-4" />
                            </button>
                          )}
                          <button
                            onClick={() => handleEdit(user)}
                            className="p-2 rounded-lg text-[#296FDA] hover:bg-[#BAD6F5]/40 hover:cursor-pointer"
                            aria-label="Edit"
                          >
                            <Edit className="size-4" />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(user.id)}
                            disabled={isSelf}
                            className="p-2 rounded-lg text-[#F87171] hover:bg-red-50 hover:cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                            aria-label="Hapus"
                            title={
                              isSelf
                                ? "Gak bisa hapus diri sendiri"
                                : "Hapus user"
                            }
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </Td>
                    </tr>
                  );
                })}
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

      <UserFormModal
        isOpen={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        onSuccess={handleFormSuccess}
        editingUser={editingUser}
      />

      <TempPasswordModal
        isOpen={!!tempPassword}
        onClose={() => {
          setTempPassword(null);
          setTempPasswordUser(null);
        }}
        user={tempPasswordUser}
        tempPassword={tempPassword}
      />

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Hapus User?"
        message={`Yakin ingin menghapus user "${deleteTargetUser?.name}"? Order/log historis user tetap valid tapi user gak bisa login lagi.`}
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
