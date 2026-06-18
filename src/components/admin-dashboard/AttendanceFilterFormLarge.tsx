import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  attendanceFilterSchema,
  type AttendanceFilterSchema,
} from "../../schemas/attendanceFilterSchema";

interface Props {
  onSubmit: (data: AttendanceFilterSchema) => void;
  onClear: () => void;
}

export default function AttendanceFilterFormLarge({
  onSubmit,
  onClear,
}: Props) {
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
      className="flex flex-wrap items-center gap-4 mb-6 bg-gray-50 p-4 rounded-lg"
    >
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">From</label>
        <input
          type="date"
          {...register("startDate")}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-claundry-blue focus:border-claundry-blue"
        />
        {errors.startDate && (
          <p className="text-red-500 text-xs">{errors.startDate.message}</p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">To</label>
        <input
          type="date"
          {...register("endDate")}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-claundry-blue focus:border-claundry-blue"
        />
        {errors.endDate && (
          <p className="text-red-500 text-xs">{errors.endDate.message}</p>
        )}
      </div>

      <div className="flex gap-2 ml-auto">
        <button
          type="submit"
          className="bg-claundry-blue hover:bg-blue-700 transition-colors text-white px-5 py-2 rounded-md text-sm"
        >
          Apply
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-colors px-5 py-2 rounded-md text-sm"
        >
          Clear
        </button>
      </div>
    </form>
  );
}
