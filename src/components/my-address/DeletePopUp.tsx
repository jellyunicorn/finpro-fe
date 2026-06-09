type DeletePopUpProps = {
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function DeletePopUp({
  title = "Delete Address",
  description = "This action cannot be undone",
  confirmLabel = "Yes, Delete",
  cancelLabel = "Keep Address",
  onConfirm,
  onCancel,
}: DeletePopUpProps) {
  return (
    <div className="w-full h-full fixed z-3 inset-0 flex justify-center items-center bg-black/20 backdrop-blur-[1px]">
      <div className="w-100 h-40 flex flex-col justify-between p-5 text-center items-start bg-white rounded-lg">
        <h1 className="text-xl text-red-500">{title}</h1>
        <p className="text-neutral-600">{description}</p>
        <div className="flex gap-2 w-full">
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-full border py-2 w-full hover:bg-red-100 border-red-500 text-red-500"
          >
            {confirmLabel}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border py-2 w-full bg-blue-500 text-white"
          >
            {cancelLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
