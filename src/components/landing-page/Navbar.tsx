import { Link } from "react-router";
import { useNavbarScrollAnimation } from "../../hooks/useNavBarColourChange";
import mainLogoDark from "../../img/svg/main_logo_blue.svg";
import mainLogoWhite from "../../img/svg/main_logo_white.svg";
import { useLoginStore } from "../../store/useAppStore";
import { goToDashboard } from "../../utils/goToDashboard";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { cloudimages } from "../../lib/cloudinary";

export default function Navbar() {
  //animations
  useNavbarScrollAnimation();
  const boxRef = useRef(null);

  const { contextSafe } = useGSAP({ scope: boxRef });

  const onEnter = contextSafe(() => {
    gsap.to(boxRef.current, {
      width: "50%",
      height: "275px",
      paddingTop: "28px",
      borderRadius: "48px",
      duration: 0.4,
      ease: "back.out(2, 0.2)",
    });
  });

  const onLeave = contextSafe(() => {
    gsap.to(boxRef.current, {
      width: "35%",
      height: "69px",
      paddingTop: "20px",
      duration: 0.4,
      ease: "back.out(1, 0.1)",
    });
  });

  const user = useLoginStore((state) => state.user);

  return (
    <div className="w-full h-fit fixed z-10 flex justify-center">
      <div
        ref={boxRef}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        className="text-white border flex flex-col animate-bg-color h-17 border-neutral-50/50 font-dmsans  z-10 inset-x-0 mt-8 mx-10 py-5 rounded-[50px] px-8 w-[100%] lg:w-[35%]  bg-white/10 backdrop-blur-sm overflow-hidden"
      >
        <nav className=" flex justify-between max-h-10 items-center h-6 mb-7">
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

          {!user && (
            <div className="flex items-center gap-5 ">
              <Link to="/login" state={{ from: location.pathname }}>
                <button className="hover:underline hover:cursor-pointer animate-text-color">
                  LOGIN
                </button>
              </Link>
              <Link to="/register">
                <button className="hover:cursor-pointer hover:bg-blue-900 ease-in transition-all px-5 py-1 h-full rounded-full bg-claundry-blue">
                  REGISTER
                </button>
              </Link>
            </div>
          )}

          {user && (
            <button
              onClick={() => goToDashboard()}
              className="flex items-center gap-2 hover:underline hover:text-blue-300 hover:cursor-pointer animate-text-color"
            >
              <p className="hidden md:block">Hi , {user.fullName} </p>
              <div className="h-8 w-8 rounded-full bg-neutral-200 overflow-hidden">
                <img
                  src={user.avatar}
                  referrerPolicy="no-referrer"
                  alt=""
                  className="object-cover h-full w-full"
                />
              </div>
            </button>
          )}
        </nav>
        <hr className="opacity-15 animate-text-color" />
        <nav className="flex justify-between animate-text-color gap-2 mt-3">
          <div className="flex flex-col gap-2">
            <button className="font-dmsans w-fit hover:underline text-2xl">
              About
            </button>
            <button className="font-dmsans w-fit hover:underline text-2xl">
              Service
            </button>
            <button className="font-dmsans w-fit hover:underline text-2xl">
              Pricing
            </button>
            <button className="font-dmsans w-fit hover:underline text-2xl">
              Career
            </button>
          </div>
          <div className=" w-120 h-full flex gap-2 justify-end items-end">

            <img src={cloudimages.navbarillus} className="w-60" alt="" />
          </div>
        </nav>
      </div>
    </div>
  );
}
