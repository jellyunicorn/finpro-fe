import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { axiosInstance } from "../../../lib/axios";
import axios from "axios";
import toast from "react-hot-toast";
import showicon from "../../../img/svg/hide_view.svg";
import hideicon from "../../../img/svg/view2.svg";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  useEffect(() => {
    const checktoken = async () => {
      const token = searchParams.get("token");
      if (!token) {
        console.error("No Verification Token is Found");
        navigate("/login");
        return;
      }
      try {
        await axiosInstance.post(`/user/resettoken?token=${token}`);

        return;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(
            error.response
              ? `${error.response.status} ${error.response.data?.message}`
              : error.message,
          );
          navigate("/dashboard");
        }
      }
    };
    checktoken();
  }, []);

  const handleChangePass = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("The password does not match");
      return;
    }
    try {
      await axiosInstance.patch("/user/changepassword", {
        password: newPassword,
      });
      toast.success("you have successfully changed password");
      navigate("/dashboard/settings");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message)
        console.error(
          error.response
            ? `${error.response.status} ${error.response.data?.message}`
            : error.message,
        );
      }
    }
  };
  const [isHidden, setIsHidden] = useState<boolean>(true);
  return (
    <main className=" flex-1 flex px-10 py-10 flex-col gap-5">
      <div className="flex flex-col">
        <h1 className="text-2xl font-medium text-claundry-blue">Reset Password</h1>
        <p className="text-sm text-neutral-400">
          Change your password confirm to proceed
        </p>
      </div>
      <div className=" rounded-2xl gap-5 flex flex-col max-w-[500px] h-fit w-[50%] bg-white  drop-shadow-lg shadow-black p-10 border-neutral-100 border ">
        <h1 className="text-xl font-medium text-claundry-blue">
          Enter New Password
        </h1>
        <form className="flex flex-col gap-1">
          <div>
            <label htmlFor="newpass">New Password</label>
            <div className="flex gap-5 items-center">
              <input
                type={isHidden? "password":"text"}
                id="newpass"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="border w-full border-neutral-400 rounded-lg px-3 py-1"
              />
              <button 
              type="button"
              onClick={()=>setIsHidden(!isHidden)}>
                {!isHidden && <img src={hideicon} alt="" className="h-6" />}
                {isHidden && <img src={showicon} alt="" className="h-6" />}
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="confirmpass">Confirm Password</label>
            <input
              type={isHidden? "password":"text"}
              id="confirmpass"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border w-full border-neutral-400 rounded-lg px-3 py-1"
            />
          </div>
          <div className="w-full flex justify-end mt-5 gap-2"></div>
        </form>
        <button
          type="button"
          onClick={() => handleChangePass()}
          className="bg-claundry-blue px-5 py-1 rounded-full text-white"
        >
          Confirm Change
        </button>
      </div>
    </main>
  );
}
