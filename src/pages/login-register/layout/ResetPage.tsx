import { z } from "zod";
import { useForm } from "react-hook-form";
import mainLogo from "../../../img/svg/main_logo_blue.svg";
import { zodResolver } from "@hookform/resolvers/zod";

import { Link } from "react-router";
import { useSendResetEmail } from "../../../hooks/useSendEmail";

const resetSchema = z.object({
  email: z.email("Invalid Email Address"),
});

export default function ResetPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: zodResolver(resetSchema) });

  const sendResetEmail = useSendResetEmail({
    fullName: "",
    email: watch("email") ?? "",
  });

  const onSubmit = () => {
    sendResetEmail();
  };

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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 w-full"
        >
          <div className="flex flex-col">
            <label htmlFor="">Email</label>
            <input
              type="text"
              {...register("email")}
              className="h-10  border rounded-lg border-neutral-500 px-5"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
          <button
            type="submit"
            disabled={!!errors?.email}
            className={`bg-claundry-blue py-2 rounded-full text-white w-full ${errors.email && "bg-neutral-400 pointer-events-none"}`}
          >
            Send Email
          </button>
        </form>
      </div>
    </main>
  );
}
