import { cloudvideos } from "../../lib/cloudinary";
import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="w-full relative h-dvh flex md:justify-start justify-center items-center p-5 gap-5 overflow-hidden">
      <Outlet />
      <div className="md:flex flex-1 h-full  relative z-5 items-end hidden ">
        <h2 className="text-6xl lg:text-8xl text-[#D7FFFA]">
          Fresh laundry on time, zero effort.
        </h2>
      </div>
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
