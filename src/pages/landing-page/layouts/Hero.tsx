import { Link } from "react-router";
import { cloudvideos } from "../../../lib/cloudinary";

export default function Hero() {
  return (
    <section
      id="hero"
      className="w-full  relative h-dvh p-5 flex flex-col items-center gap-4 bg-[#BAD6F5]"
    >
      <div className=" relative bg-white w-full h-dvh rounded-[20px] overflow-hidden flex">
        <div className="absolute w-full h-full">
          <div
            aria-label="overlay"
            className="absolute inset-0 w-full h-full bg-black/10 z-1"
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
        <div className="w-full h-full p-10 flex relative z-2 flex-col justify-end">
          {" "}
          <div className="justify-between flex items-center">
            <div className="flex flex-col items-center lg:items-start gap-5 lg:gap-2">
              <h1 className=" text-[#c4fff8] text-5xl text-center md:text-7xl font-medium">
                Fresh Laundy on time, zero effort.
              </h1>
              <p className=" text-[#c4fff8] text-center lg:text-left lg:text-2xl">
                Schedule a pickup, track your order, and get fresh clothes back
                — all via the cloud.
              </p>
              <Link to="/register">
                {" "}
                <button className="h-fit mt-5 hover:bg-white transition-all ease-in hover:text-blue-800 px-20 py-2  text-white border rounded-full border-white">
                  SIGN UP
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
