import React from "react";

export default function ResetPassword() {
  return  <main className=" flex-1 flex px-10 py-10 flex-col gap-5">
        <div className=" rounded-2xl gap-5 flex flex-col min-w-[500px] h-fit w-[50%] bg-white  drop-shadow-lg shadow-black p-10 border-neutral-100 border ">
          <h1 className="text-xl font-medium text-[#296FDA]">
            Reset Password
          </h1>
          
          <div className="w-full flex justify-end gap-2">
            <button className="bg-[#296FDA] px-5 py-1 rounded-full text-white">
              Edit Details
            </button>
            <button className="bg-[#296FDA] px-5 py-1 rounded-full text-white">
              Change Password
            </button>
          </div>
        </div>
      </main>;
}
