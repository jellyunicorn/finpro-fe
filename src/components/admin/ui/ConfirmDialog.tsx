import { AlertTriangle } from "lucide-react";
import Modal from "./Modal";
import Button from "./Button";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "primary";
  isLoading?: boolean;
}

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Lanjutkan",
  cancelLabel = "Batal",
  variant = "primary",
  isLoading,
}: ConfirmDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="text-center">
        <div
          className={`mx-auto flex items-center justify-center size-12 rounded-full mb-4 ${
            variant === "danger" ? "bg-red-100" : "bg-[#BAD6F5]/40"
          }`}
        >
          <AlertTriangle
            className={`size-6 ${variant === "danger" ? "text-[#F87171]" : "text-[#296FDA]"}`}
          />
        </div>
        <h3 className="text-lg font-medium text-neutral-800 mb-2">{title}</h3>
        <p className="text-sm text-neutral-500 mb-6">{message}</p>
        <div className="flex gap-3 justify-center">
          <Button variant="outline" size="sm" onClick={onClose} disabled={isLoading}>
            {cancelLabel}
          </Button>
          <Button
            variant={variant}
            size="sm"
            onClick={onConfirm}
            isLoading={isLoading}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
