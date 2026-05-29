import React from "react";
import { useLoaderData } from "react-router";

type userdata = {
  id: number;
  email: string;
  fullName: string;
  phone: string;
  role: string;
  avatar: string;
  verifiedAt: string;
  provider: string;
  birthDate: string;
};

export default function MainDashboard() {
  const userdata = useLoaderData().userdata as userdata
  const todaysdate = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <main className="bg-[#FBFDFF] p-10">
      <div className="h-50  w-full flex flex-col gap-1 items-center justify-center">
        <p>{todaysdate}</p>
        <h1 className="text-5xl text-[#296FDA]"> Good Morning , {userdata.fullName} !</h1>
      </div>
    </main>
  );
}
