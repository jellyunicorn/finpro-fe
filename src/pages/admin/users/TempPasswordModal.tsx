import { useState } from "react";
import { toast } from "sonner";
import { UserCheck, Lock, Copy, Check } from "lucide-react";
import Modal from "../../../components/admin/ui/Modal";
import Button from "../../../components/admin/ui/Button";
import {
  ROLE_LABELS,
  STATION_LABELS,
  type AppUser,
} from "../../../types/user.types";

interface TempPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: AppUser | null;
  tempPassword: string | null;
}

export default function TempPasswordModal({
  isOpen,
  onClose,
  user,
  tempPassword,
}: TempPasswordModalProps) {
  const [copied, setCopied] = useState(false);

  if (!user || !tempPassword) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(tempPassword);
      setCopied(true);
      toast.success("Password disalin ke clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Gagal copy. Pakai manual.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="text-center">
        {/* Success icon */}
        <div className="mx-auto flex items-center justify-center size-14 rounded-full bg-[#A7F3D0] mb-3">
          <UserCheck className="size-6 text-[#047857]" />
        </div>

        <h3 className="text-lg font-medium text-[#047857] mb-1">
          User Berhasil Dibuat!
        </h3>
        <p className="text-sm text-neutral-700 font-medium">{user.name}</p>
        <p className="text-xs text-neutral-500 mb-4">
          {user.email} · {ROLE_LABELS[user.role]}
          {user.workerStation && ` (${STATION_LABELS[user.workerStation]})`}
        </p>

        {/* Temp password box */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 text-left">
          <p className="text-xs text-red-700 font-medium mb-2 flex items-center gap-1">
            <Lock className="size-3" />
            Password Sementara (sekali tampil!)
          </p>
          <div className="flex items-center justify-between gap-2 mb-2">
            <code className="font-mono text-lg font-semibold text-red-900 tracking-wider select-all">
              {tempPassword}
            </code>
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-white border border-red-200 text-red-700 hover:bg-red-50 hover:cursor-pointer transition-colors"
            >
              {copied ? (
                <>
                  <Check className="size-3" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="size-3" />
                  Copy
                </>
              )}
            </button>
          </div>
          <p className="text-xs text-red-700">
            <strong>Save password ini!</strong> Setelah modal ditutup, password
            gak bisa dilihat lagi. Kirim ke user untuk login pertama, user wajib
            ganti pas first login.
          </p>
        </div>

        <Button onClick={onClose} className="w-full" size="md">
          Selesai
        </Button>
      </div>
    </Modal>
  );
}
