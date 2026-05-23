import { Outlet } from "react-router";
import AdminSideBar from "./AdminSideBar";
import AdminTopBar from "./AdminTopBar";

export default function AdminLayout() {
  return (
    <div className="w-full font-dmsans h-dvh bg-[#FBFDFF] flex">
      <AdminSideBar />
      <div className="h-full flex flex-col flex-1 overflow-hidden">
        <AdminTopBar />
        <main className="flex-1 overflow-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
