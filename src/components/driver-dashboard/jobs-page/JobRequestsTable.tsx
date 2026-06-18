import type { DriverJob } from "../../../types/driverJob";
import { JobRow } from "./JobRow";

interface JobRequestsTableProps {
  data?: DriverJob[];
  expandedRow: string | null;
  onAccept: (jobId: string) => void;
  onToggle: (jobId: string) => void;
}

export function JobRequestsTable({
  data,
  expandedRow,
  onAccept,
  onToggle,
}: JobRequestsTableProps) {
  return (
    <table className="hidden md:table w-full text-left rounded-lg overflow-hidden">
      <thead className="bg-[#BAD6F5] text-claundry-blue">
        <tr>
          <th className="p-4">Order ID</th>
          <th className="p-4">Distance</th>
          <th className="p-4">Date & Time</th>
          <th className="p-4">Action</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((item) => (
          <JobRow
            key={item.id}
            item={item}
            isExpanded={expandedRow === item.id}
            onAccept={onAccept}
            onToggle={onToggle}
          />
        ))}
      </tbody>
    </table>
  );
}
