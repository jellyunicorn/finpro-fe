import { toReadableDateTime } from "../../utils/dateconverUtils";

export default function TimelineRow({
  label,
  value,
}: {
  label: string;
  value: string | null;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`h-2.5 w-2.5 rounded-full ${value ? "bg-claundry-blue" : "bg-neutral-300"}`}
      />
      <p className="text-neutral-500 w-24">{label}</p>
      <p className="text-sm">{toReadableDateTime(value)}</p>
    </div>
  );
}
