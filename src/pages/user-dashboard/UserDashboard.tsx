import SideBar from "../../components/landing-page/SideBar"

export default function UserDashboard() {
  return (
    <div className="w-full font-dmsans h-dvh bg-[#FBFDFF] flex">
      <SideBar/>
      <div className="  h-full flex flex-col flex-1">
        <div className="border-b border-[#BAD6F5] text-neutral-400 font-medium w-full h-16 flex items-center px-10"> Home / </div>
        <main className=" flex-1 flex justify-center items-center"> content </main>
      </div>
    </div>
  );
}
