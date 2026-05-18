import { Link } from "react-router";
import { useNavbarScrollAnimation } from "../../hooks/useNavBarColourChange";
import mainLogoDark from "../../img/svg/main_logo_blue.svg";
import mainLogoWhite from "../../img/svg/main_logo_white.svg";

export default function Navbar() {
  //animations
  useNavbarScrollAnimation();

  return (
        <div className="w-full h-fit fixed z-10 flex justify-center">
            <div className="text-white border border-neutral-50/10 font-dmsans  z-10 inset-x-0 mt-8 mx-10 py-5 rounded-full px-8 w-[35%] transition-all ease-in-out bg-white/10 backdrop-blur-sm ">
              <nav className=" flex justify-between max-h-10 items-center h-6">
                <div className="relative flex ">
                  <img
                    src={mainLogoWhite}
                    alt=""
                    id="logo-white"
                    className="h-6 relative z-1 inset-0"
                  />
                  <img
                    src={mainLogoDark}
                    alt=""
                    id="logo-blue"
                    className="h-6 absolute z-0 inset-0 "
                  />
                </div>
                
                <div className="flex items-center gap-5 ">
<Link to="/user">
                      <span className="hover:underline hover:cursor-pointer animate-text-color">
                        LOGIN
                      </span>
</Link>
                  <button className="hover:cursor-pointer hover:bg-blue-900 ease-in transition-all px-5 py-1 h-full rounded-full bg-[#296FDA]">
                    REGISTER
                  </button>
                </div>
              </nav>
            </div>
        </div>
  );
}
