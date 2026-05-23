import { Outlet } from "react-router";
import SideBar from "../../components/SideBar";
import logo_home from "../../img/svg/home_menu_icon.svg";
import logo_home_blue from "../../img/svg/home_menu_icon_blue.svg";
import logo_settings from "../../img/svg/settings_menu_icon.svg";
import logo_settings_blue from "../../img/svg/settings_menu_icon_blue.svg";

export default function UserDashboard() {
  return (
    <div className="w-full font-dmsans h-dvh bg-[#FBFDFF] flex">
      <SideBar
        menuItems={[
          {
            icon: logo_home,
            iconDark: logo_home_blue,
            label: "Home",
            to: "",
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
         <Outlet/>
      </div>
    </div>
  );
}
