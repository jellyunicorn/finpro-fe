import { useState } from "react";
import { z } from "zod";
import { Link, useNavigate } from "react-router";
import useLogin from "../../../hooks/auth/useLogin";
import useLoginGoogle from "../../../hooks/auth/useLoginGoogle";
import googleLogo from "../../../img/svg/google_logo.svg";
import mainLogo from "../../../img/svg/main_logo_blue.svg";

const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export default function Login() {
  const navigate = useNavigate();

  const handleGoogleLogin = useLoginGoogle();
  const { loginForm, setLoginForm, login } = useLogin();
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );

  const handleLogin = () => {
    const result = loginSchema.safeParse(loginForm);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      });
      return;
    }
    setErrors({});
    login();
  };
  return (
    <main className="w-full md:w-[50%] h-full md:h-full  overflow-y-auto  relative z-5 bg-white px-10 py-10  md:p-10 lg:p-10 items-center justify-center font-dmsans  rounded-2xl flex">
      <div className="max-w-125 w-full  h-full flex flex-col md:gap-5 justify-between items-center ">
        <Link to="/">
          <img src={mainLogo} alt="main-logo-blue" className="h-8" />
        </Link>

        <div className="w-full flex flex-col gap-2 items-center">
          <div className="flex flex-col gap-2 w-full mt-5">
            <button
              onClick={() => handleGoogleLogin()}
              className="  hover:cursor-pointer border rounded-xl h-12 border-neutral-500 flex items-center justify-center gap-5 text-neutral-500"
            >
              <img src={googleLogo} alt="" className="w-5 " /> Login by Google
            </button>
            {/* <button className="  hover:cursor-pointer border rounded-xl h-12 border-neutral-500 flex items-center justify-center gap-5 text-neutral-500">
                <img src={appleLogo} alt="" className="w-5" /> Login by Apple
              </button> */}
          </div>
          <span className="text-neutral-500 ">OR</span>
          <div className="flex flex-col justify-start gap-2 w-full ">
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-neutral-500">
                E-MAIL
              </label>
              <input
                id="email"
                type="text"
                value={loginForm.email}
                onChange={(e) =>
                  setLoginForm((prev) => ({ ...prev, email: e.target.value }))
                }
                className="h-10  border rounded-lg border-neutral-500 px-5"
              />
              {errors.email && (
                <p className="text-red-500 text-sm bg-red-100 w-full py-1 rounded-md text-center">{errors.email}</p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="pass" className="text-neutral-500">
                PASSWORD
              </label>
              <input
                id="pass"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm((prev) => ({ ...prev, password: e.target.value }))
                }
                type="password"
                className="h-10 border rounded-lg border-neutral-500  px-5"
              />
              {errors.password && (
                <p className="text-red-500 text-sm bg-red-100 w-full py-1 rounded-md text-center">{errors.password}</p>
              )}
            </div>
            <div className="flex flex-col gap-1 mt-4">
              <button
                onClick={handleLogin}
                className="border rounded-full bg-claundry-blue text-white py-2 hover:cursor-pointer  "
              >
                LOGIN
              </button>
              <button
                onClick={() => navigate("/register")}
                className="border rounded-full border-claundry-blue text-claundry-blue py-2 hover:cursor-pointer "
              >
                CREATE A NEW ACCOUNT
              </button>
              <Link to="/resetpass" className="w-full text-center">
                <button className="hover:underline">
                  Forgot your password? Click here to reset.
                </button>
              </Link>
            </div>
          </div>
        </div>

        <small className="text-neutral-400 text-center">
          By Continuing, you agree to our Terms of Service and Privacy
          Policy{" "}
        </small>
      </div>
    </main>
  );
}
