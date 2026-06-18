import { useFieldArray, useForm } from "react-hook-form";
import {
  OrderItemFormSchema,
  type OrderItemFormValues,
} from "../../schemas/orderItemSchema";
import { zodResolver } from "@hookform/resolvers/zod";

interface FormProps {
  orderItems: OrderItemFormValues;
  onSubmit: (values: OrderItemFormValues) => void;
}

export default function ConfirmItemsForm({ orderItems, onSubmit }: FormProps) {
  const itemsWithoutQuantities: OrderItemFormValues = {
    items: orderItems.items.map((item) => ({
      id: item.id,
      name: item.name,
      quantity: "" as unknown as number,
    })),
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<OrderItemFormValues>({
    defaultValues: itemsWithoutQuantities,
    resolver: zodResolver(OrderItemFormSchema),
  });

  const { fields } = useFieldArray({
    name: "items",
    control,
  });

  const handleFormSubmit = (data: OrderItemFormValues) => {
    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="max-w-md mx-auto px-4 py-6 bg-white rounded-lg space-y-4"
    >
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-center space-x-3">
          <input
            type="hidden"
            {...register(`items.${index}.id` as const)}
            defaultValue={field.id}
          />
          
          <input
            {...register(`items.${index}.name` as const)}
            defaultValue={field.name}
            readOnly
            className="flex-1 px-2 py-1.5 border border-gray-300 rounded-md bg-gray-100 text-gray-700"
          />

          <div className="flex flex-col">
            <input
              type="number"
              {...register(`items.${index}.quantity` as const, {
                valueAsNumber: true,
              })}
              className="w-24 px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.items?.[index]?.quantity && (
              <p className="text-sm text-red-500 mt-1">
                {errors.items[index]?.quantity?.message}
              </p>
            )}
          </div>
        </div>
      ))}

      <button
        type="submit"
        className="w-full py-2 px-4 bg-claundry-blue text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
      >
        Submit
      </button>
    </form>
  );
}
