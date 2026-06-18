import { useOutlet } from "react-router";
import Breadcrumbs from "../../components/Breadcrumbs";
import SideBar from "../../components/SideBar";
import logo_home from "../../img/svg/home_menu_icon.svg";
import logo_home_blue from "../../img/svg/home_menu_icon_blue.svg";
import logo_settings from "../../img/svg/settings_menu_icon.svg";
import logo_settings_blue from "../../img/svg/settings_menu_icon_blue.svg";
import { useState } from "react";
import NotificationBell from "../../components/NotificationBell";
import burger_menu from "../../img/svg/burger_menu.svg";

export default function AdminDashboard() {
  const outlet = useOutlet();
  const [minimize, setMinimize] = useState(false);
  const [mobileMenu, setMobileMenu] = useState<boolean>(false);

  return (
    <div className="w-full font-dmsans h-dvh bg-[#FBFDFF] flex">
      <SideBar
        minimize={minimize}
        setMinimize={setMinimize}
        mobilemenu={mobileMenu}
        setMobileMenu={setMobileMenu}
        menuItems={[
          {
            icon: logo_home,
            iconDark: logo_home_blue,
            label: "Dashboard",
            to: "",
          },
          {
            icon: logo_home,
            iconDark: logo_home_blue,
            label: "Attendance",
            to: "attendance-log",
          },
          {
            icon: logo_settings,
            iconDark: logo_settings_blue,
            label: "Settings",
            to: "settings",
          },
        ]}
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
        {outlet || <div>Content</div>}
      </div>
    </div>
  );
}
