import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

type DetailForm = {
  fullName: string;
  email: string;
};

export const useSendResetEmail =  (detailForm:DetailForm) => {
  const sendResetEmail = async () => {
    try {
    await toast.promise(axiosInstance.post("/user/resetemail", detailForm), {
      loading: "Processing..",
      success: "Reset email sent! Check your inbox.",
      error: (err) => err.response?.data?.message || "sending email failed.",
    });
  } catch {}
}
return sendResetEmail
};
