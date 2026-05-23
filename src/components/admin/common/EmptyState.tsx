import { type ReactNode } from "react";
import { Inbox } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ElementType;
  action?: ReactNode;
}

export default function EmptyState({
  title = "Belum ada data",
  description = "Data akan muncul disini setelah ada aksi.",
  icon: Icon = Inbox,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#BAD6F5] bg-white px-6 py-16 text-center font-dmsans">
      <div className="mb-4 rounded-full bg-[#BAD6F5]/40 p-4">
        <Icon className="size-8 text-[#296FDA]" />
      </div>
      <h3 className="text-lg font-medium text-neutral-800">{title}</h3>
      <p className="mt-1 max-w-md text-sm text-neutral-500">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
