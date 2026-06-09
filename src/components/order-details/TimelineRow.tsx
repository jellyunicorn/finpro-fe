export default function TimelineRow({
  label,
  value,
}: {
  label: string;
  value: string | null | Date;
}) {
  const date = value ? new Date(value) : null;
  const isValid = date !== null && !isNaN(date.getTime());

  const dayMonth = isValid
    ? `${date.getDate()} / ${date.toLocaleString("en-US", { month: "long" })}`
    : null;
  const time = isValid
    ? date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    : "-";

  return (
    <div className="flex items-center gap-3 ">
      <div
        className={`h-2.5 w-4 rounded-full ${isValid ? "bg-claundry-blue" : "bg-neutral-300"}`}
      />
      <p className="text-neutral-500 w-40 whitespace-nowrap">{label}</p>
      <div className="flex gap-5 items-center w-full">
        {dayMonth && (
          <div className="text-sm text-white w-25 justify-center flex bg-claundry-blue px-2 py-1 rounded-full">
            {dayMonth}
          </div>
        )}
        <p className="text-sm">{time}</p>
      </div>
    </div>
  );
}
