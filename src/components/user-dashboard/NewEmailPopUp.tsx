import React, { useState } from "react";
import { useSendVerifyEmail } from "../../hooks/useSendEmail";
import xicon from "../../img/svg/x_icon.svg";
import { useChangeEmail } from "../../hooks/useChangeEmail";

type resetpopupProps = {
  triggerfunction: React.Dispatch<React.SetStateAction<boolean>>;
  userdata: {
    fullName: string;
    email: string;
  };
};

export default function NewEmailPopUp({
  triggerfunction,
  userdata,
}: resetpopupProps) {
  const [newEmail, setNewEmail] = useState<string>("");
  const handleChangeEmail = useChangeEmail(newEmail);
  return (
    <div className="w-full h-full flex justify-center items-center bg-neutral-800/40 z-2 absolute inset-0">
      <div className="w-100 h-fit gap-5 bg-white rounded-xl border-blue-200 p-10 border shadow-lg flex flex-col justify-between pointer-event-none">
        <div className="flex flex-col">
          <div className="flex w-full justify-between">
            {" "}
            <h1 className="text-2xl">Enter New Email</h1>{" "}
            <button onClick={() => triggerfunction(false)}>
              <img
                src={xicon}
                alt=""
                className="w-6 translate-x-7 -translate-y-7"
              />
            </button>
          </div>
          <p className="text-neutral-400">
            Enter a new email that you want to use, you will need to reverify
            before we can change your email.
          </p>
        </div>
        <div className="flex flex-col">
          <label htmlFor="newemail">New Email</label>{" "}
          <input
            id="newemail"
            value={newEmail}
            onChange={(e)=>setNewEmail(e.target.value)}
            type="text"
            className="border-neutral-400 border rounded-lg py-1 px-3"
          />
        </div>
        <button
          onClick={() => handleChangeEmail()}
          className="border hover:bg-blue-500 hover:text-white rounded-full border-blue-500 text-blue-500"
        >
          {" "}
          Change Email
        </button>
      </div>
    </div>
  );
}
