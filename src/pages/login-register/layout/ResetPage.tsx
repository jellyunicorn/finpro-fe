import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import mainLogo from "../../../img/svg/main_logo_blue.svg";
import { zodResolver } from "@hookform/resolvers/zod";

import { Link } from "react-router";

export default function ResetPage() {
  const [resetEmail, setResetEmail] = useState<string>("");

  const resetSchema = z.object({
    email: z.email("Invalid Email Address"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(resetSchema) });
  return (
    <main className="w-full md:w-[50%] h-fit md:h-full  relative z-5 bg-white p-5  md:p-10 lg:p-10 items-center justify-center font-dmsans  rounded-2xl flex">
      <Link to="/login">
        {" "}
        <button className="border border-claundry-blue rounded-full px-2 w-20 absolute top-0 left-0 m-8 py-2">
          {" "}
          ← Back{" "}
        </button>
      </Link>
      <div className="max-w-125 w-full  h-full flex flex-col md:gap-5 justify-center items-center ">
        <Link to="/login">
          <img src={mainLogo} alt="main-logo-blue" className="h-8" />
        </Link>
        <p className="text-center text-neutral-500">
          please input your registered email, we will send you an email to reset
          your password
        </p>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="">Email</label>
          <input
            type="text"
            {...register("email")}
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            className="h-10  border rounded-lg border-neutral-500 px-5"
          />
        </div>
        {errors.email && (
        <p className="text-red-500 text-sm">{errors.email.message}</p>
      )}
        <button className="bg-claundry-blue py-2 rounded-full text-white w-full">
          Send Email
        </button>
      </div>
    </main>
  );
}
