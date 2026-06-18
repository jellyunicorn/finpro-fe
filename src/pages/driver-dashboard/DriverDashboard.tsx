import { useState } from "react";
import { useOutlet } from "react-router";
import Breadcrumbs from "../../components/Breadcrumbs";
import SideBar from "../../components/SideBar";
import logo_home from "../../img/svg/home_menu_icon.svg";
import logo_home_blue from "../../img/svg/home_menu_icon_blue.svg";
import logo_settings from "../../img/svg/settings_menu_icon.svg";
import logo_settings_blue from "../../img/svg/settings_menu_icon_blue.svg";
import logo_deliveries from "../../img/svg/deliveries_logo.svg";
import logo_deliveries_blue from "../../img/svg/deliveries_logo_blue.svg";
import DriverDashboardMain from "./DriverDashboardMain";

export default function DriverDashboard() {
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
      icon: logo_deliveries,
      iconDark: logo_deliveries_blue,
      label: "Deliveries",
      to: "deliveries",
      children: [{ label: "History", to: "deliveries/history" }],
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
        <div className="border-b border-[#BAD6F5] text-neutral-400 font-medium w-full h-16 flex items-center px-10">
          <Breadcrumbs />
        </div>
        {outlet || <DriverDashboardMain />}
      </div>
    </div>
  );
}
