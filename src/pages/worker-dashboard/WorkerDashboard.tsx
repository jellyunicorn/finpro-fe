import { useState } from "react";
import { useOutlet } from "react-router";
import Breadcrumbs from "../../components/Breadcrumbs";
import NotificationBell from "../../components/NotificationBell";
import SideBar from "../../components/SideBar";
import burger_menu from "../../img/svg/burger_menu.svg";
import logo_home from "../../img/svg/home_menu_icon.svg";
import logo_home_blue from "../../img/svg/home_menu_icon_blue.svg";
import logo_jobs from "../../img/svg/jobs_logo.svg";
import logo_jobs_blue from "../../img/svg/jobs_logo_blue.svg";
import logo_settings from "../../img/svg/settings_menu_icon.svg";
import logo_settings_blue from "../../img/svg/settings_menu_icon_blue.svg";
import WorkerDashboardMain from "./WorkerDashboardMain";

export default function WorkerDashboard() {
  const outlet = useOutlet();
  const [minimize, setMinimize] = useState(false);
  const [mobileMenu, setMobileMenu] = useState<boolean>(false);

  const menuItems = [
    {
      icon: logo_home,
      iconDark: logo_home_blue,
      label: "Dashboard",
      to: "",
    },
    {
      icon: logo_jobs,
      iconDark: logo_jobs_blue,
      label: "Jobs",
      to: "orders",
      children: [{ label: "History", to: "orders/history" }],
    },
    {
      icon: logo_settings,
      iconDark: logo_settings_blue,
      label: "Settings",
      to: "settings",
    },
  ];

  return (
    <div className="w-full font-dmsans h-dvh bg-[#FBFDFF] flex">
      <SideBar
        menuItems={menuItems}
        minimize={minimize}
        setMinimize={setMinimize}
        mobilemenu={mobileMenu}
        setMobileMenu={setMobileMenu}
      />
      <div className="  h-full flex flex-col flex-1">
        <div className="border-b shrink-0 border-[#BAD6F5] relative justify-between  text-neutral-400 font-medium w-full h-16 flex items-center px-4 md:px-10">
          <button
            className="md:hidden z-20 "
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            <img src={burger_menu} alt="" />
          </button>
          <div className="hidden md:block">
            <Breadcrumbs />
          </div>
          <NotificationBell />
        </div>
        {outlet || <WorkerDashboardMain />}
      </div>
    </div>
  );
}
