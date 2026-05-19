import React, { useState } from "react";
import mainLogo from "../../../img/svg/main_logo_blue.svg";
import { Link } from "react-router";
import HidePasswordBtn from "../../../components/HidePasswordBtn";

export default function VerifiedPage() {
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [isHiddenConfirm, setIsHiddenConfirm] = useState<boolean>(true);

  return (
    <main className="w-full md:w-[50%] h-full md:h-full  relative z-5 bg-white p-5  items-center justify-center font-dmsans  rounded-2xl flex">
      <div className="max-w-125 justify-between w-full  h-full flex flex-col md:gap-5  items-center ">
        <div></div>
        <div className="w-full flex flex-col  items-center gap-5">
          <Link to="/">
            <img src={mainLogo} alt="main-logo-blue" className="h-8 mb-10" />
          </Link>

          <h1 className="text-3xl">Your Email has been verified!</h1>
          <p>set up your first time password</p>

          <div className="flex flex-col w-full justify-start items-center gap-2  ">
            <div className="flex flex-col w-full gap-1">
              <label htmlFor="pass" className="text-neutral-500">
                PASSWORD
              </label>
              <div className="w-full h-10 border rounded-lg border-neutral-500 flex items-center px-5">
                <input
                  id="pass"
                  type={isHidden ? "password" : "string"}
                  className="w-full"
                />
                <HidePasswordBtn
                  setIsHidden={setIsHidden}
                  isHidden={isHidden}
                />
              </div>
            </div>
            <div className="flex flex-col  w-full gap-1">
              <label htmlFor="pass" className="text-neutral-500">
                CONFIRM PASSWORD
              </label>
              <div className="w-full h-10 border rounded-lg border-neutral-500 flex items-center px-5">
                <input
                  id="confirmpass"
                  type={isHiddenConfirm ? "password" : "string"}
                  className="w-full"
                />
                <HidePasswordBtn
                  setIsHidden={setIsHiddenConfirm}
                  isHidden={isHiddenConfirm}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1 w-full mt-8">
              <button className="border rounded-full bg-[#296FDA] text-white py-2 hover:cursor-pointer  ">
                CONFIRM
              </button>
            </div>
          </div>
        </div>
        <small className="text-neutral-400">
          By Continuing, you agree to our Terms of Service and Privacy
          Policy{" "}
        </small>
      </div>
    </main>
  );
}
