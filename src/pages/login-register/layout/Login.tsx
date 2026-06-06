import { useNavigate } from "react-router";
import useLogin from "../../../hooks/useLogin";
import googleLogo from "../../../img/svg/google_logo.svg";
import mainLogo from "../../../img/svg/main_logo_blue.svg";
import { cloudimages } from "../../../lib/cloudinary";
import useLoginGoogle from "../../../hooks/useLoginGoogle";

export default function Login() {
  const navigate = useNavigate();

  const handleGoogleLogin = useLoginGoogle();
  const { loginForm, setLoginForm, login } = useLogin();
  return (
    <main className="w-full md:w-[50%] h-fit md:h-full  relative z-5 bg-white p-5  md:p-10 lg:p-10 items-center justify-center font-dmsans  rounded-2xl flex">
      <div className="max-w-125 w-full  h-full flex flex-col md:gap-5 justify-center items-center ">
        <img src={mainLogo} alt="main-logo-blue" className="h-8" />
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
          </div>
          <div className="flex flex-col gap-1 mt-4">
            <button
              onClick={login}
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
            <button className="hover:underline">
              Forgot your password? Click here to reset.
            </button>
          </div>
          <div className="w-full  justify-center mt-10 hidden md:flex">
            <img
              src={cloudimages.whoWeAre}
              alt="who-we-are"
              className="w-50 lg:w-60"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
