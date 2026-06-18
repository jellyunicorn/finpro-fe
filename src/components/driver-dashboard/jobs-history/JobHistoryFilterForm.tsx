import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  jobHistoryFilterSchema,
  type JobHistoryFilterSchema,
} from "../../../schemas/jobHistoryFilterSchema";

interface Props {
  onSubmit: (data: JobHistoryFilterSchema) => void;
  onClear: () => void;
}

export default function JobHistoryFilterForm({ onSubmit, onClear }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<JobHistoryFilterSchema>({
    resolver: zodResolver(jobHistoryFilterSchema),
  });

  const handleClear = () => {
    reset();
    onClear();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-wrap gap-4 mb-6 items-end"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Start Date
        </label>
        <input
          type="date"
          {...register("startDate")}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-claundry-blue focus:border-claundry-blue"
        />
        {errors.startDate && (
          <p className="text-red-500 text-xs">{errors.startDate.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          End Date
        </label>
        <input
          type="date"
          {...register("endDate")}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-claundry-blue focus:border-claundry-blue"
        />
        {errors.endDate && (
          <p className="text-red-500 text-xs">{errors.endDate.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-claundry-blue hover:bg-blue-700 transition-colors text-white px-4 py-1.5 rounded-lg"
      >
        Apply
      </button>
      <button
        type="button"
        onClick={handleClear}
        className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-colors px-4 py-1.5 rounded-lg"
      >
        Clear
      </button>
    </form>
  );
}
