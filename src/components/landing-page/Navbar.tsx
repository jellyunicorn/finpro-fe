import mainLogoWhite from "../../img/svg/main_logo_white.svg";

export default function Navbar() {
  return (
    <div className="text-white border border-neutral-50/10 font-dmsans  z-10 inset-x-0 mt-5 mx-10 py-5 rounded-full px-8 bg-black/10 backdrop-blur-sm fixed">
      <nav className=" flex justify-between  max-h-10 h-8">
        <div>
          <img src={mainLogoWhite} alt="" className="h-full mix-blend-difference" />
        </div>
        <div className="flex gap-10 items-center ">
          <span className="hover:underline mix-blend-difference">ABOUT</span>
          <span className="hover:underline">SERVICES</span>
          <span className="hover:underline">PRICING</span>
        </div>
        <div className="flex items-center gap-5 ">
          <span className="hover:underline">LOGIN</span>
          <button className="hover:bg-blue-900 ease-in transition-all px-5 py-1 h-full rounded-full bg-[#296FDA]">
            REGISTER
          </button>
        </div>
      </nav>
    </div>
  );
}
