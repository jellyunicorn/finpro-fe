import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useNavigate } from "react-router";
export const useChangeEmail = (newemail: string) => {
    const navigate = useNavigate();
  const payload = { email: newemail };

  const changeEmail = async () => {
    try {
      await toast.promise(axiosInstance.patch("/user/change-email", payload), {
        loading: "Processing..",
        success: "Verification Email Sent, Please re-verify your complete the change",
        error: (err) =>
          err.response?.data?.message ||
          "Changing Failed,Unknown Error occured.",
      });

      navigate(0);
    } catch {}
  };
  return changeEmail;
};
