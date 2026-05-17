import logo_blue from "../../../img/svg/main_logo_blue.svg";

export default function Footer() {
  return (
    <footer className="w-full h-250 relative">
      <section className="absolute flex flex-col gap-10 inset-0 z-2 container mx-auto px-35 py-15">
        <h1 className="text-7xl w-[70%] text-[#004DE5]">
          Clean clothes, happy neighbors, zero hassle — that's the deal
        </h1>
        <div className="flex justify-between">
          <p className="w-100">
            Claundry is an online web app that makes laundry pickup easy and
            convenient. Schedule a pickup, and we'll handle the rest, delivering
            fresh, clean clothes right to your door.
          </p>
          <div className=" flex gap-15">
            <ul className="flex flex-col font-dmsans gap-2 ">
              <span className="font-bold">Get Started</span>
              <li>SIGN UP</li>
              <li>LOGIN</li>
            </ul>
            <ul className="flex flex-col font-dmsans gap-2">
              <span className="font-bold">Company</span>
              <li>CAREERS</li>
              <li>SUPPORT</li>
            </ul>
            <ul className="flex flex-col font-dmsans gap-2">
              <span className="font-bold">Social Network</span>
              <li>INSTAGRAM</li>
              <li>TWITTER/X</li>
              <li>LINKEDIN</li>
            </ul>
            <ul className="flex flex-col font-dmsans gap-2">
              <span className="font-bold">Legal</span>
              <li>PRIVACY POLICY</li>
              <li>TERMS</li>
            </ul>
          </div>
        </div>
        <div className="w-full  font-dmsans flex justify-between items-end text-sm">
          <div>
            <span className="font-bold">PT.CUCI KAIN ANGKASA </span>
            <p>Jl. Jendral Sudirman Kav. 52-53, SCBD, Jakarta Selatan, 12190</p>
          </div>
          <small className="text-[8px]">© 2024 PT.CUCI KAIN ANGKASA . All rights reserved. Unauthorized copying, distribution, or use of this material is prohibited. For legal information, visit our website or contact support.</small>
        </div>
      </section>
      <div className="w-full h-full px-5 pt-5">
        {" "}
        <div className="w-full h-full relative flex flex-col justify-end bg-[#BAD6F5] overflow-hidden rounded-t-[60px] z-1">
          <img
            src={logo_blue}
            alt="blue_logo_claundry"
            className="scale-105 absolute -bottom-5"
          />
        </div>
      </div>
    </footer>
  );
}
