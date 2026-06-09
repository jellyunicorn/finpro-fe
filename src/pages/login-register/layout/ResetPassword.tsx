import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import mainLogo from "../../../img/svg/main_logo_blue.svg";

import { axiosInstance } from "../../../lib/axios";
import axios from "axios";
import toast from "react-hot-toast";
import showicon from "../../../img/svg/hide_view.svg";
import hideicon from "../../../img/svg/view2.svg";
import { Link } from "react-router";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
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
        return ;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(
            error.response
              ? `${error.response.status} ${error.response.data?.message}`
              : error.message,
          );
          navigate("/login");
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
      await axiosInstance.patch(`/user/changepassword?token=${token}`, {
        password: newPassword,
      });
      toast.success("you have successfully changed password");
      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
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
    <main className="w-full md:w-[50%] h-fit md:h-full gap-5 relative z-5 bg-white p-5  md:p-10 lg:p-10 items-center justify-center font-dmsans  rounded-2xl flex flex-col ">
      <Link to="/login">
        {" "}
        <button className="border border-claundry-blue rounded-full px-2 w-20 absolute top-0 left-0 m-8 py-2">
          {" "}
          ← Back{" "}
        </button>
      </Link>
      <div className="flex flex-col w-full items-center">
        <Link to="/login">
          <img src={mainLogo} alt="main-logo-blue" className="h-8" />
        </Link>
      </div>
      <div className="  gap-5 flex flex-col  h-fit w-[70%]  p-10  ">
        <h1 className="text-xl font-medium text-claundry-blue">
          Enter New Password
        </h1>
        <form className="flex flex-col gap-1">
          <div>
            <label htmlFor="newpass">New Password</label>
            <div className="flex gap-5 items-center">
              <input
                type={isHidden ? "password" : "text"}
                id="newpass"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="border w-full border-neutral-400 rounded-lg px-3 py-1"
              />
              <button type="button" onClick={() => setIsHidden(!isHidden)}>
                {!isHidden && <img src={hideicon} alt="" className="h-6" />}
                {isHidden && <img src={showicon} alt="" className="h-6" />}
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="confirmpass">Confirm Password</label>
            <input
              type={isHidden ? "password" : "text"}
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
