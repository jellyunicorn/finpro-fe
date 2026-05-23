import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { ArrowLeft, Store } from "lucide-react";
import OutletForm from "./OutletForm";
import Card from "../../../components/admin/ui/Card";
import EmptyState from "../../../components/admin/common/EmptyState";
import Button from "../../../components/admin/ui/Button";
import { getMockOutletById } from "../../../lib/mock-outlets";
import type { OutletFormData } from "./outlet.schema";

export default function OutletEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const outlet = id ? getMockOutletById(id) : null;
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!outlet) {
    return (
      <div className="font-dmsans space-y-4">
        <Link
          to="/admin/outlets"
          className="inline-flex items-center gap-1 text-sm text-[#296FDA] hover:underline"
        >
          <ArrowLeft className="size-4" />
          Back to Outlets
        </Link>
        <Card>
          <EmptyState
            icon={Store}
            title="Outlet tidak ditemukan"
            action={<Button onClick={() => navigate("/admin/outlets")}>Kembali</Button>}
          />
        </Card>
      </div>
    );
  }

  const handleSubmit = async (data: OutletFormData) => {
    setIsSubmitting(true);
    try {
      // TODO: ganti ke real API
      // await outletApi.update(id!, data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Update outlet:", data);
      toast.success(`Outlet "${data.name}" berhasil diupdate!`);
      navigate("/admin/outlets");
    } catch {
      toast.error("Gagal update outlet. Coba lagi.");
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
        <h1 className="text-2xl font-medium text-[#296FDA]">Edit Outlet</h1>
        <p className="text-sm text-neutral-500 mt-1">{outlet.name}</p>
      </div>

      <OutletForm
        initialData={outlet}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/admin/outlets")}
        isSubmitting={isSubmitting}
        submitLabel="Update Outlet"
      />
    </div>
  );
}
