import { cloudimages, cloudvideos } from "../../lib/cloudinary";
import mainLogo from "../../img/svg/main_logo_blue.svg";
import appleLogo from "../../img/svg/apple_logo.svg";
import googleLogo from "../../img/svg/google_logo.svg";
import { useNavigate } from "react-router";

export default function Login() {
    const navigate = useNavigate();
  return (
    <div className="w-full relative h-screen flex md:justify-start justify-center items-center p-5 gap-5">
      <main className="w-full md:w-[50%] h-fit md:h-full  relative z-5 bg-white p-5  md:p-10 lg:p-10 items-center justify-center font-dmsans  rounded-2xl flex">
        <div className="max-w-125 w-full  h-full flex flex-col md:gap-5 justify-center items-center ">
          <img src={mainLogo} alt="main-logo-blue" className="h-10" />
          <div className="flex flex-col gap-2 w-full mt-5">
            <button className="  hover:cursor-pointer border rounded-xl h-15 border-neutral-500 flex items-center justify-center gap-5 text-neutral-500">
              <img src={googleLogo} alt="" className="w-5 " /> Login by Google
            </button>
            <button className="  hover:cursor-pointer border rounded-xl h-15 border-neutral-500 flex items-center justify-center gap-5 text-neutral-500">
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
              onClick={()=>navigate("/user")}
              className="border rounded-full bg-[#296FDA] text-white py-2 hover:cursor-pointer  ">
                LOGIN
              </button>
              <button className="border rounded-full border-[#296FDA] text-[#296FDA] py-2 hover:cursor-pointer ">
                REGISTER
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
      <div className="md:flex flex-1 h-full  relative z-5 items-end hidden "><h2 className="text-6xl lg:text-8xl text-[#D7FFFA]">Fresh laundry on time, zero effort.</h2></div>
      <div
        aria-label="overlay"
        className="absolute inset-0 w-full h-full bg-black/20 z-1"
      ></div>
      <video
        autoPlay
        muted
        loop
        playsInline
        src={cloudvideos.heroBackground}
        className="absolute inset-0 w-full h-full object-cover"
      ></video>
    </div>
  );
}
