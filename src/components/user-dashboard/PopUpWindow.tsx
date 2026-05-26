import React from "react";
import xicon from "../../img/svg/x_icon.svg";
import {
  useSendResetEmail,
  useSendVerifyEmail,
} from "../../hooks/useSendEmail";

type resetpopupProps = {
  triggerfunction: React.Dispatch<React.SetStateAction<boolean>>;
  userdata: {
    fullName: string;
    email: string;
  };
};

export default function ResetEmailPopUp({ triggerfunction, userdata }: resetpopupProps) {
  const handleResetEmail = useSendResetEmail({
    fullName: userdata.fullName,
    email: userdata.email,
  });

  return (
    <div className="w-full h-full flex justify-center items-center bg-neutral-800/40 z-2 absolute inset-0">
      <div className="w-100 h-70 bg-white rounded-xl border-blue-200 p-10 border shadow-lg flex flex-col justify-between pointer-event-none">
        <div className="flex w-full justify-between">
          {" "}
          <h1 className="text-2xl">Reset Password</h1>{" "}
          <button onClick={() => triggerfunction(false)}>
            <img
              src={xicon}
              alt=""
              className="w-6 translate-x-7 -translate-y-7"
            />
          </button>
        </div>
        <p>
          We'll send a password reset link to your registered email. Click the
          button below to proceed{" "}
        </p>
        <button
          onClick={() => handleResetEmail()}
          className="border hover:bg-blue-500 hover:text-white rounded-full border-blue-500 text-blue-500"
        >
          {" "}
          Send Reset Link
        </button>
      </div>
    </div>
  );
}

export function VerifyEmailPopUp({ triggerfunction, userdata }: resetpopupProps) {
  const handleVerifyEmail = useSendVerifyEmail({
    fullName: userdata.fullName,
    email: userdata.email,
  });
  return (
    <div className="w-full h-full flex justify-center items-center bg-neutral-800/40 z-2 absolute inset-0">
      <div className="w-100 h-70 bg-white rounded-xl border-blue-200 p-10 border shadow-lg flex flex-col justify-between pointer-event-none">
        <div className="flex w-full justify-between">
          {" "}
          <h1 className="text-2xl">Verify Email</h1>{" "}
          <button onClick={() => triggerfunction(false)}>
            <img
              src={xicon}
              alt=""
              className="w-6 translate-x-7 -translate-y-7"
            />
          </button>
        </div>
        <p>
          By pressing this button , a verification link will be sent to your
          email , click it to verify and activate this account
        </p>
        <button
          onClick={() => handleVerifyEmail()}
          className="border hover:bg-blue-500 hover:text-white rounded-full border-blue-500 text-blue-500"
        >
          {" "}
          Send Verification Email
        </button>
      </div>
    </div>
  );

 
}
