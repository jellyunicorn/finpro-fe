import { Link, useNavigate } from "react-router";
import appleLogo from "../../../img/svg/apple_logo.svg";
import googleLogo from "../../../img/svg/google_logo.svg";
import mainLogo from "../../../img/svg/main_logo_blue.svg";

export default function Register() {
    const navigate = useNavigate();

  return (
    <main className="w-full md:w-[50%] h-full md:h-full  relative z-5 bg-white p-5  items-center justify-center font-dmsans  rounded-2xl flex">
      <div className="max-w-125 justify-between w-full  h-full flex flex-col md:gap-5  items-center ">
       <div></div>
        <div className="w-full flex flex-col  items-center gap-5">
           <Link to="/"><img src={mainLogo} alt="main-logo-blue" className="h-8 mb-20" /></Link>
          
          <h1 className="text-3xl">Create an Account</h1>
          <div className="flex flex-col gap-2 w-full mt-5">
            <button className="  hover:cursor-pointer border rounded-xl h-12 border-neutral-500 flex items-center justify-center gap-5 text-neutral-500">
              <img src={googleLogo} alt="" className="w-5 " /> Sign Up by Google
            </button>
            <button className="  hover:cursor-pointer border rounded-xl h-12 border-neutral-500 flex items-center justify-center gap-5 text-neutral-500">
              <img src={appleLogo} alt="" className="w-5" /> Sign Up by Apple
            </button>
          </div>
          <span className="text-neutral-500 ">OR</span>
          <div className="flex flex-col w-full justify-start items-center gap-2  ">
            <div className="flex flex-col w-full gap-1">
              <label htmlFor="email" className="text-neutral-500">
                E-MAIL
              </label>
              <input
                id="email"
                type="text"
                className="h-10  border rounded-lg border-neutral-500 px-5"
              />
            </div>
            <div className="flex flex-col  w-full gap-1">
              <label htmlFor="pass" className="text-neutral-500">
                PASSWORD
              </label>
              <input
                id="pass"
                type="password"
                className="h-10 border rounded-lg border-neutral-500  px-5"
              />
            </div>
            <div className="flex flex-col gap-1 w-full mt-8">
              <button
                onClick={() => navigate("/user")}
                className="border rounded-full bg-[#296FDA] text-white py-2 hover:cursor-pointer  "
              >
                SIGN UP
              </button>
            </div>
            <p className="text-neutral-400">Alredy have an account? <Link to="/login"><span className="hover:underline text-black hover:text-blue-700">Sign In </span></Link>instead.</p>
          </div>
        </div>
          <small className="text-neutral-400">By Continuing, you agree to our Terms of Service and Privacy Policy </small>
      </div>
    </main>
  );
}