import SideBar from "../../components/landing-page/SideBar"

export default function UserDashboard() {
  return (
    <div className="w-full h-dvh bg-[#FBFDFF] flex">
      <SideBar/>
      <div className="border  h-full flex flex-col flex-1">
        <div className="border w-full h-15 flex items-center px-10"> breadcrumbs</div>
        <main className="border flex-1 flex justify-center items-center"> content </main>
      </div>
    </div>
  );
}
