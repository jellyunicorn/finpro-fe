import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import HidePasswordBtn from "../../../components/HidePasswordBtn";
import mainLogo from "../../../img/svg/main_logo_blue.svg";
import { axiosInstance } from "../../../lib/axios";
import { passwordSchema } from "../../../schemas/zodValidationSchema";
import toast from "react-hot-toast";

type activationForm = {
  fullName: string;
  email: string;
  password?: string;
};

export default function VerifiedPage() {
  const navigate = useNavigate();
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [isHiddenConfirm, setIsHiddenConfirm] = useState<boolean>(true);
  const [registerForm, setRegisterForm] = useState<activationForm>({
    fullName: "",
    email: "",
    password: "",
  });
  const [searchParams] = useSearchParams();
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isPasswordSame, setIsPasswordSame] = useState<boolean>(true);
  const [passwordError, setPasswordError] = useState<string>("");

  useEffect(() => {
    const checktoken = async () => {
      const token = searchParams.get("token");
      if (!token) {
        console.error("No Verification Token is Found");
        navigate("/login");
        return;
      }
      try {
        const res = await axiosInstance.get(`/auth/verifyemail?token=${token}`);
        setRegisterForm((prev) => ({
          ...prev,
          fullName: res.data.fullName,
          email: res.data.email,
        }));
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

  const activateAccount = async () => {
    const createUser = async () =>
      await axiosInstance.post("/auth/createuser", registerForm);
    try {
      await toast.promise(createUser, {
        loading: "Processing..",
        success: "Account has been activated and verified! Please login again",
        error: (err) => err.response?.data?.message || "Registration failed.",
      });
    } catch (error) {}

    navigate("/");
  };
  2;

  return (
    <main className="w-full md:w-[50%] h-full md:h-full  relative z-5 bg-white p-5  items-center justify-center font-dmsans  rounded-2xl flex">
      <div className="max-w-125 justify-between w-full  h-full flex flex-col md:gap-5  items-center ">
        <div></div>
        <div className="w-full flex flex-col  items-center gap-5">
          <Link to="/">
            <img src={mainLogo} alt="main-logo-blue" className="h-8 mb-10" />
          </Link>

          <h1 className="text-3xl">One last step!</h1>
          <p className="text-center text-sm">
            Verify & Activate your account by setting up your first time
            password
          </p>

          <div className="flex flex-col w-full justify-start items-center gap-2  ">
            <div className="flex flex-col w-full gap-1">
              <label htmlFor="fullname" className="text-neutral-500">
                FULL NAME
              </label>
              <div className="w-full h-10 border rounded-lg bg-neutral-200 text-neutral-400 border-neutral-500 flex items-center px-3">
                <input
                  id="fullname"
                  type="string"
                  value={registerForm.fullName}
                  className="w-full focus:outline-none pointer-events-none"
                />
              </div>
              <label htmlFor="email" className="text-neutral-500">
                E-MAIL
              </label>
              <div className="w-full h-10 border bg-neutral-200 text-neutral-400 rounded-lg border-neutral-500 flex items-center px-3">
                <input
                  id="email"
                  value={registerForm.email}
                  type="string"
                  className="w-full focus:outline-none pointer-events-none"
                />
              </div>
              <label htmlFor="pass" className="text-neutral-500">
                PASSWORD
              </label>
              <div
                className={`w-full h-10 border rounded-lg  flex items-center px-3 ${isPasswordSame ? "border-neutral-500" : "border-red-600"}`}
              >
                <input
                  id="pass"
                  type={isHidden ? "password" : "string"}
                  className="w-full focus:outline-none"
                  value={registerForm.password}
                  onChange={(e) => {
                    const newPassword = e.target.value;
                    setRegisterForm((prev) => ({
                      ...prev,
                      password: newPassword,
                    }));
                    setIsPasswordSame(newPassword === confirmPassword);
                    const result =
                      passwordSchema.shape.password.safeParse(newPassword);
                    setPasswordError(
                      result.success ? "" : result.error.issues[0].message,
                    );
                  }}
                />
                <HidePasswordBtn
                  setIsHidden={setIsHidden}
                  isHidden={isHidden}
                />
              </div>
              {passwordError && (
                <small className="text-red-600">{passwordError}</small>
              )}
            </div>
            <div className="flex flex-col  w-full gap-1">
              <label htmlFor="pass" className="text-neutral-500">
                CONFIRM PASSWORD
              </label>
              <div
                className={`w-full h-10 border rounded-lg ${isPasswordSame ? "border-neutral-500" : "border-red-600"} flex items-center px-3`}
              >
                <input
                  id="confirmpass"
                  type={isHiddenConfirm ? "password" : "string"}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setIsPasswordSame(registerForm.password === e.target.value);
                  }}
                  className="w-full focus:outline-none"
                />
                <HidePasswordBtn
                  setIsHidden={setIsHiddenConfirm}
                  isHidden={isHiddenConfirm}
                />
              </div>
            </div>
            {!isPasswordSame && (
              <small
                className={`mt-5 text-red-600 px-5 py-2 bg-red-100 rounded-md `}
              >
                There is a password mismatch, please check your password input
              </small>
            )}
            <div className="flex flex-col gap-1 w-full mt-5">
              <button
                disabled={!isPasswordSame || !!passwordError}
                onClick={activateAccount}
                className={`border rounded-full text-white py-2 transition-all ease-in ${!isPasswordSame || passwordError ? "bg-neutral-300 cursor-not-allowed" : "bg-[#296FDA] hover:cursor-pointer"}`}
              >
                ACTIVATE ACCOUNT
              </button>
            </div>
          </div>
        </div>
        <small className="text-neutral-400">
          By Continuing, you agree to our Terms of Service and Privacy
          Policy{" "}
        </small>
      </div>
    </main>
  );
}
