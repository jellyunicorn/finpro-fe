import logo_home from "../../img/svg/home_menu_icon.svg";
import logo_home_blue from "../../img/svg/home_menu_icon_blue.svg";
import logo_logout from "../../img/svg/logout_logo.svg";
import logo_blue from "../../img/svg/main_logo_blue.svg";
import logo_settings from "../../img/svg/settings_menu_icon.svg";
import logo_settings_blue from "../../img/svg/settings_menu_icon_blue.svg";
import logo_sidebar from "../../img/svg/sidebar_icon.svg";
import SideBarMenu from "./SideBarMenu";

export default function SideBar() {
  return (
    <aside className="flex flex-col w-[20%] max-w-75 min-w-64  justify-between h-full bg-[#BAD6F5]">
      <div className="h-full w-full ">
        <div className=" flex justify-between h-16 border items-center border-[#BAD6F5] p-4  w-full bg-white">
          <img src={logo_blue} alt="" className="h-full max-h-10" />
          <img src={logo_sidebar} alt="" className="max-h-8" />
        </div>
        <nav className="h-full">
          <div className="font-dmsans h-full flex flex-col gap-2 justify-start w-full">
            <SideBarMenu
              icon={logo_home}
              icon_dark={logo_home_blue}
              label="Home"
            />
            <SideBarMenu
              icon={logo_settings}
              icon_dark={logo_settings_blue}
              label="Settings"
            />
          </div>
        </nav>
      </div>
      <div className="h-20 border border-[#BAD6F5] flex p-3 bg-white">
        <button className="hover:bg-black flex  hover:text-white items-center justify-center gap-5 font-dmsans w-full h-full rounded-lg bg-white border-[#BAD6F5] border">
          <img
            src={logo_logout}
            alt="logout-logo"
            className="w-5 mix-blend-difference"
          />
          LOG OUT
        </button>
      </div>
    </aside>
  );
}
