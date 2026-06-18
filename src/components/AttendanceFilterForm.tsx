import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  attendanceFilterSchema,
  type AttendanceFilterSchema,
} from "../schemas/attendanceFilterSchema";

interface Props {
  onSubmit: (data: AttendanceFilterSchema) => void;
  onClear: () => void;
}

export default function AttendanceFilterForm({ onSubmit, onClear }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AttendanceFilterSchema>({
    resolver: zodResolver(attendanceFilterSchema),
  });

  const handleClear = () => {
    reset();
    onClear();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-wrap gap-3 mb-4 items-end"
    >
      <div className="flex items-end gap-2">
        <label className="text-xs font-medium text-gray-700 mb-1">
          From
        </label>
        <input
          type="date"
          {...register("startDate")}
          className="border-b border-gray-300 px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-claundry-blue focus:border-claundry-blue"
        />
        {errors.startDate && (
          <p className="text-red-500 text-[10px] mt-1">
            {errors.startDate.message}
          </p>
        )}
      </div>

      <div className="flex items-end gap-2">
        <label className="text-xs font-medium text-gray-700 mb-1">
          to
        </label>
        <input
          type="date"
          {...register("endDate")}
          className="border-b border-gray-300 px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-claundry-blue focus:border-claundry-blue"
        />
        {errors.endDate && (
          <p className="text-red-500 text-[10px] mt-1">
            {errors.endDate.message}
          </p>
        )}
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-claundry-blue hover:bg-blue-700 transition-colors text-white px-3 py-1 rounded text-xs"
        >
          Apply
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-colors px-3 py-1 rounded text-xs"
        >
          Clear
        </button>
      </div>
    </form>
  );
}
