import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import OutletForm from "./OutletForm";
import type { OutletFormData } from "./outlet.schema";

export default function OutletCreate() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: OutletFormData) => {
    setIsSubmitting(true);
    try {
      // TODO: ganti ke real API
      // await outletApi.create(data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Create outlet:", data);
      toast.success(`Outlet "${data.name}" berhasil dibuat!`);
      navigate("/admin/outlets");
    } catch {
      toast.error("Gagal membuat outlet. Coba lagi.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="font-dmsans space-y-4">
      <Link
        to="/admin/outlets"
        className="inline-flex items-center gap-1 text-sm text-[#296FDA] hover:underline"
      >
        <ArrowLeft className="size-4" />
        Back to Outlets
      </Link>

      <div className="mb-4">
        <h1 className="text-2xl font-medium text-[#296FDA]">Create New Outlet</h1>
        <p className="text-sm text-neutral-500 mt-1">
          Tambah cabang outlet baru Claundry
        </p>
      </div>

      <OutletForm
        onSubmit={handleSubmit}
        onCancel={() => navigate("/admin/outlets")}
        isSubmitting={isSubmitting}
        submitLabel="Create Outlet"
      />
    </div>
  );
}
