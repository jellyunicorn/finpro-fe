import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router";
import { axiosInstance } from "../../../lib/axios";

export default function ReverifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {
    const checktoken = async () => {
      const token = searchParams.get("token");
      if (!token) {
        console.error("No Verification Token is Found");
        navigate("/dashboard/settings");
        return;
      }
      try {
        await axiosInstance.post(`/user/execute-change?token=${token}`);
        toast.success("Email successfully changed!");
        navigate("/dashboard/settings");
        return;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(
            error.response
              ? `${error.response.status} ${error.response.data?.message}`
              : error.message,
          );
          navigate("/dashboard/settings");
        }
      }
    };
    checktoken();
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center">
      Processing...
    </div>
  );
}
