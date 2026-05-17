import { useNavbarScrollAnimation } from "../../hooks/useNavBarColourChange";
import mainLogoDark from "../../img/svg/main_logo_blue.svg";
import mainLogoWhite from "../../img/svg/main_logo_white.svg";

export default function Navbar() {
  //animations
  useNavbarScrollAnimation();

  return (
    <div className="text-white border border-neutral-50/10 font-dmsans  z-10 inset-x-0 mt-7 mx-10 py-5 rounded-full px-8 bg-white/10 backdrop-blur-sm fixed">
      <nav className=" flex justify-between max-h-10 h-8">
        <div className="relative">
          <img
            src={mainLogoWhite}
            alt=""
            id="logo-white"
            className="h-full relative z-1 inset-0"
          />
          <img
            src={mainLogoDark}
            alt=""
            id="logo-blue"
            className="h-full  absolute z-0 inset-0 "
          />
        </div>
        <div className="flex gap-10 items-center animate-text-color font-bold">
          <span className="hover:underline mix-blend-difference hover:cursor-pointer">
            ABOUT
          </span>
          <span className="hover:underline hover:cursor-pointer">SERVICES</span>
          <span className="hover:underline hover:cursor-pointer">PRICING</span>
        </div>
        <div className="flex items-center gap-5 ">
          <span className="hover:underline hover:cursor-pointer animate-text-color">
            LOGIN
          </span>
          <button className="hover:cursor-pointer hover:bg-blue-900 ease-in transition-all px-5 py-1 h-full rounded-full bg-[#296FDA]">
            REGISTER
          </button>
        </div>
      </nav>
    </div>
  );
}
