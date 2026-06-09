export default function DetailRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex justify-between items-center">
      <p className="text-neutral-500">{label}</p>
      <p className="text-sm">{value}</p>
    </div>
  );
}
