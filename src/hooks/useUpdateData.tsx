import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useLoginStore } from "../store/useAppStore";
import { toDateInput } from "../utils/dateconverUtils";
import type { profilepersonalForm } from "../lib/types";

export default function useUpdateData(
  personalForm: profilepersonalForm,
  setPersonalForm: React.Dispatch<React.SetStateAction<profilepersonalForm>>
) {
  const [selectedPicture, setSelectedPicture] = useState<File | null>(null);
  const updateUser = useLoginStore((state) => state.updateUser);

  const { mutate: uploadAvatar, isPending } = useMutation({
    mutationFn: (file?: File) => {
      const form = new FormData();
      if (file) form.append("avatar", file);
      form.append("fullName", personalForm.fullName ?? "");
      form.append("phone", personalForm.phone ?? "");
      form.append("birthDate", personalForm.birthDate ?? "");
      return axiosInstance.patch("/user/update", form);
    },
    onSuccess: (res) => {
      setPersonalForm(() => ({
        id: res.data.id,
        fullName: res.data.fullName,
        phone: res.data.phone,
        birthDate: toDateInput(res.data.birthDate),
        avatar: res.data.avatar,
      }));
      setSelectedPicture(null);
      updateUser({ fullName: res.data.fullName, avatar: res.data.avatar });
      toast.success("Profile Data updated!");
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Upload failed.");
      }
    },
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 1 * 1024 * 1024) {
      toast.error("File size must be under 1MB");
      return;
    }
    setSelectedPicture(file);
    setPersonalForm((prev) => ({ ...prev, avatar: URL.createObjectURL(file) }));
  };

  const handleFileUpload = () => {
    uploadAvatar(selectedPicture ?? undefined);
  };

  return { handleFileSelect, handleFileUpload, isPending };
}
