import { useNavigate } from "react-router";
import appleLogo from "../../../img/svg/apple_logo.svg";
import googleLogo from "../../../img/svg/google_logo.svg";
import mainLogo from "../../../img/svg/main_logo_blue.svg";
import { cloudimages } from "../../../lib/cloudinary";

export default function Login() {
  const navigate = useNavigate();
  return (
    <main className="w-full md:w-[50%] h-fit md:h-full  relative z-5 bg-white p-5  md:p-10 lg:p-10 items-center justify-center font-dmsans  rounded-2xl flex">
      <div className="max-w-125 w-full  h-full flex flex-col md:gap-5 justify-center items-center ">
        <img src={mainLogo} alt="main-logo-blue" className="h-8" />
        <div className="flex flex-col gap-2 w-full mt-5">
          <button className="  hover:cursor-pointer border rounded-xl h-12 border-neutral-500 flex items-center justify-center gap-5 text-neutral-500">
            <img src={googleLogo} alt="" className="w-5 " /> Login by Google
          </button>
          <button className="  hover:cursor-pointer border rounded-xl h-12 border-neutral-500 flex items-center justify-center gap-5 text-neutral-500">
            <img src={appleLogo} alt="" className="w-5" /> Login by Apple
          </button>
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
              className="h-10  border rounded-lg border-neutral-500 px-5"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="pass" className="text-neutral-500">
              PASSWORD
            </label>
            <input
              id="pass"
              type="password"
              className="h-10 border rounded-lg border-neutral-500  px-5"
            />
          </div>
          <div className="flex flex-col gap-1 mt-8">
            <button
              onClick={() => navigate("/user")}
              className="border rounded-full bg-[#296FDA] text-white py-2 hover:cursor-pointer  "
            >
              LOGIN
            </button>
            <button
              onClick={() => navigate("/register")}
              className="border rounded-full border-[#296FDA] text-[#296FDA] py-2 hover:cursor-pointer "
            >
              CREATE A NEW ACCOUNT
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
