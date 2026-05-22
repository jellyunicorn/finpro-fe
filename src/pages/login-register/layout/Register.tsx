import { Link, useNavigate } from "react-router";
import appleLogo from "../../../img/svg/apple_logo.svg";
import googleLogo from "../../../img/svg/google_logo.svg";
import mainLogo from "../../../img/svg/main_logo_blue.svg";
import toast from "react-hot-toast";
import { axiosInstance } from "../../../lib/axios";
import { useState } from "react";
import { registerAccountSchema } from "../../../schemas/zodValidationSchema";
import useRegisterGoogle from "../../../hooks/useRegisterGoogle";

type RegisterForm = {
  fullName: string;
  email: string;
};

export default function Register() {
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();
  const [registerForm, setRegisterForm] = useState<RegisterForm>({
    fullName: "",
    email: "",
  });

  const sendVerifyEmail = async () => {
    try {
      await toast.promise(axiosInstance.post("/auth/register", registerForm), {
        loading: "Processing..",
        success: "Verification email sent! Check your inbox.",
        error: (err) => err.response?.data?.message || "Registration failed.",
      });
      
      navigate("/login");
    } catch {}
  };

  const handleRegisterGoogle = useRegisterGoogle();

  return (
    <main className="w-full md:w-[50%] h-full md:h-full  relative z-5 bg-white p-5  items-center justify-center font-dmsans  rounded-2xl flex">
      <div className="max-w-125 justify-between w-full  h-full flex flex-col md:gap-5  items-center ">
        <div></div>
        <div className="w-full flex flex-col  items-center gap-3">
          <Link to="/">
            <img src={mainLogo} alt="main-logo-blue" className="h-8 mb-20" />
          </Link>

          <h1 className="text-3xl mb-5">Create an Account</h1>
          <div className="flex flex-col gap-2 w-full mt-5">
            <button onClick={()=>handleRegisterGoogle()}className="  hover:cursor-pointer border rounded-xl h-12 border-neutral-500 flex items-center justify-center gap-5 text-neutral-500">
              <img src={googleLogo} alt="" className="w-5 " /> Sign Up by Google
            </button>
            {/* <button className="  hover:cursor-pointer border rounded-xl h-12 border-neutral-500 flex items-center justify-center gap-5 text-neutral-500">
              <img src={appleLogo} alt="" className="w-5" /> Sign Up by Apple
            </button> */}
          </div>
          <div className=" w-full flex items-center gap-5">
            <hr className="w-full border-neutral-400" />{" "}
            <span className="text-neutral-400">OR</span>
            <hr className="w-full border-neutral-400" />
          </div>
          <div className="flex flex-col w-full justify-start items-center gap-2  ">
            <div className="flex flex-col w-full gap-1">
              <label htmlFor="name" className="text-neutral-500">
                FULL NAME
              </label>
              <input
                id="name"
                type="text"
                value={registerForm.fullName}
                onChange={(e) => {
                  setRegisterForm({
                    ...registerForm,
                    fullName: e.target.value,
                  });
                  const result = registerAccountSchema.shape.fullName.safeParse(
                    registerForm.fullName,
                  );
                  setNameError(
                    result.success ? "" : result.error.issues[0].message,
                  );
                }}
                className="h-10  border rounded-lg border-neutral-500 px-5"
              />
              {nameError && (
                <small className="text-sm text-red-600">{nameError}</small>
              )}
              <label htmlFor="email" className="text-neutral-500">
                E-MAIL
              </label>
              <input
                id="email"
                type="text"
                value={registerForm.email}
                onChange={(e) => {
                  setRegisterForm({ ...registerForm, email: e.target.value });
                  const result = registerAccountSchema.shape.email.safeParse(
                    registerForm.email,
                  );
                  setEmailError(
                    result.success ? "" : result.error.issues[0].message,
                  );
                }}
                className="h-10  border rounded-lg border-neutral-500 px-5"
              />
              {emailError && (
                <small className="text-sm text-red-600">{emailError}</small>
              )}
            </div>

            <div className="flex flex-col gap-1 w-full mt-8">
              <button
                disabled={!!emailError || !!nameError}
                onClick={sendVerifyEmail}
                className={`border rounded-full text-white py-2 transition-all ease-in ${
                  emailError || nameError
                    ? "bg-neutral-300 cursor-not-allowed"
                    : "bg-[#296FDA] hover:cursor-pointer"
                }`}
              >
                SIGN UP
              </button>
            </div>
            <p className="text-neutral-400">
              Alredy have an account?{" "}
              <Link to="/login">
                <span className="hover:underline text-black hover:text-blue-700">
                  Sign In{" "}
                </span>
              </Link>
              instead.
            </p>
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
