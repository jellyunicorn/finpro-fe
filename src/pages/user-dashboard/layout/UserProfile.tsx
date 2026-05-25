import { useLoaderData } from "react-router";
import UserDetails from "../../../components/user-dashboard/UserDetails";
import { toDateInput } from "../../../utils/dateconverUtils";

export default function UserProfile() {
  const profiledata = useLoaderData().userdata;
  return (
    <main className=" flex-1 flex px-10 py-10 flex-col gap-5">
      <div className=" w-full h-fit flex gap-5">
        <img src={profiledata.avatar} referrerPolicy="no-referrer" alt="user-avatar" className="w-15 h-15 rounded-full bg-neutral-400" />
        <div className="flex flex-col  justify-center">
          <h1 className="text-2xl font-medium text-[#296FDA]">{profiledata.fullName}</h1>
          <p className="italic text-neutral-400">{profiledata.role === "USER" ? "MEMBER" : profiledata.role}</p>
        </div>
      </div>
      <div className=" rounded-2xl gap-5 flex flex-col min-w-[500px] h-fit w-[50%] bg-white  drop-shadow-lg shadow-black p-10 border-neutral-100 border ">
        <h1 className="text-xl font-medium text-[#296FDA]">
          Personal Information
        </h1>
        <div className="flex flex-col gap-2">
          <UserDetails title="Full Name" content={profiledata.fullName || "-"} />
          <hr className="border-neutral-200" />
          <UserDetails title="E-Mail" content={profiledata.email || "-"} />
          <hr className="border-neutral-200" />
          <UserDetails title="Phone" content={profiledata.phone || "-"} />
          <hr className="border-neutral-200" />
          <UserDetails title="Birth date" content={toDateInput(profiledata.birthDate) || "-"} />
          <hr className="border-neutral-200" />
          <UserDetails title="Login By" content={profiledata.provider || "-"} />
        </div>
        <div className="w-full flex justify-end gap-2">
        </div>
      </div>
    </main>
  );
}
