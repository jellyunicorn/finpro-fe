import { Link } from "react-router";
import { useNavbarScrollAnimation } from "../../hooks/useNavBarColourChange";
import mainLogoDark from "../../img/svg/main_logo_blue.svg";
import mainLogoWhite from "../../img/svg/main_logo_white.svg";
import { useLoginStore } from "../../store/useAppStore";
import { goToDashboard } from "../../utils/goToDashboard";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import { cloudimages } from "../../lib/cloudinary";

export default function Navbar() {
  //animations
  const [open,setOpen]=useState<boolean>(false)
  useNavbarScrollAnimation();
  const boxRef = useRef(null);

  const { contextSafe } = useGSAP({ scope: boxRef });
  const isMobile = window.matchMedia("(max-width: 1023px)").matches;
  const user = useLoginStore((state) => state.user);

  const onEnter = contextSafe(() => {
    gsap.to(boxRef.current, {
      width: isMobile ? "100%" : "40%",
      height: isMobile ? !user ? "310px": "275px" : "275px",
      paddingTop: "28px",
      borderRadius: "48px",
      duration: 0.4,
      ease: "back.out(2, 0.2)",
    });
    setOpen(true)
  });

  const onLeave = contextSafe(() => {
    gsap.to(boxRef.current, {
      width: isMobile ? "95%" : "35%",
      height: "69px",
      paddingTop: "20px",
      duration: 0.4,
      ease: "back.out(1, 0.1)",
    });
     setOpen(false)
  });

  return (
    <div className="w-full h-fit fixed z-10 flex justify-center">
      <div
        ref={boxRef}
        onClick={open === false ? onEnter : onLeave}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        className="text-white border flex flex-col animate-bg-color h-17 border-neutral-50/50 font-dmsans  z-10 inset-x-0 mt-8 mx-10 py-5 rounded-[50px] px-8 w-[100%] lg:w-[35%]  bg-white/10 backdrop-blur-sm overflow-hidden"
      >
        <nav className=" flex justify-center gap-10 md:justify-between max-h-10 items-center h-6 mb-7">
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
            <div className="hidden md:flex items-center gap-5 ">
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
        <nav className="flex flex-col justify-between  gap-2 mt-3">
          {!user && (
            <div className="flex md:hidden justify-between  w-full items-center gap-5 ">
              <Link to="/login" state={{ from: location.pathname }}>
                <button className="hover:underline w-30 border px-5 py-1 rounded-full hover:cursor-pointer animate-text-color">
                  LOGIN
                </button>
              </Link>
              <Link to="/register">
                <button className="hover:cursor-pointer w-30 hover:bg-blue-900 ease-in transition-all px-5 py-1 h-full  rounded-full bg-claundry-blue">
                  REGISTER
                </button>
              </Link>
            </div>
          )}
         <div className="flex w-full  animate-text-color justify-between">
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
            <div className=" flex w-120 h-full  gap-2 justify-end items-end">
              <img src={cloudimages.navbarillus} className="w-40 md:w-60" alt="" />
            </div>
         </div>
        </nav>
      </div>
    </div>
  );
}
