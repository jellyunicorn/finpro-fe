import { useState } from "react";
import { useOutlet } from "react-router";
import Breadcrumbs from "../../components/Breadcrumbs";
import SideBar from "../../components/SideBar";
import logo_order_blue from "../../img/svg/Order_blue.svg";
import logo_order from "../../img/svg/Order_white.svg";
import logo_address_blue from "../../img/svg/address_blue.svg";
import logo_address from "../../img/svg/address_white.svg";
import burger_menu from "../../img/svg/burger_menu.svg";
import logo_home from "../../img/svg/home_menu_icon.svg";
import logo_home_blue from "../../img/svg/home_menu_icon_blue.svg";
import notification_bell from "../../img/svg/notificationbell.svg";
import logo_settings from "../../img/svg/settings_menu_icon.svg";
import logo_settings_blue from "../../img/svg/settings_menu_icon_blue.svg";

export default function UserDashboard() {
  const outlet = useOutlet();
  const [minimize, setMinimize] = useState<boolean>(false);

  const [openNotification, setOpenNotification] = useState<boolean>(false);
  const [mobileMenu, setMobileMenu] = useState<boolean>(false);
  return (
    <div className="w-full font-dmsans  h-dvh bg-[#FBFDFF] flex">
      <div className="h-dvh  ">
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
              icon: logo_address,
              iconDark: logo_address_blue,
              label: "My Addresses",
              to: "my-addresses",
            },
            {
              icon: logo_order,
              iconDark: logo_order_blue,
              label: "My Orders",
              to: "orders",
            },
            {
              icon: logo_settings,
              iconDark: logo_settings_blue,
              label: "Settings",
              to: "settings",
            },
          ]}
        />
      </div>
      <div className="h-full flex flex-col relative justify-start flex-1 ">
        <div className="border-b shrink-0 border-[#BAD6F5] relative justify-between  text-neutral-400 font-medium w-full h-16 flex items-center px-4 md:px-10">
          <button 
          className="md:hidden z-20 "
          onClick={()=>setMobileMenu(!mobileMenu)}>
            <img src={burger_menu} alt="" />
          </button>
          <div className="hidden md:block">
            <Breadcrumbs />
          </div>
          <button
            onClick={() => setOpenNotification(!openNotification)}
            className="p-2 border rounded-full border-neutral-300"
          >
            <img src={notification_bell} alt="" />
          </button>
        </div>
        <div
          className={`absolute top-14 z-10 -right-6 md:right-0 border border-neutral-300 bg-white shadow-md rounded-lg p-5 mr-8 w-100 h-75
          before:content-[''] before:absolute before:-top-1.5 before:right-6 before:h-3 before:w-3
          before:rotate-45 before:border-l  before:border-t before:border-neutral-300 before:bg-white transition-all   ${openNotification ? "opacity-100 " : "pointer-events-none opacity-0 -translate-y-2"} `}
        >
          test notification
        </div>
        <div className="flex-1 overflow-y-auto">
          {" "}
          {outlet || " <MainDashboard/>"}
        </div>
      </div>
    </div>
  );
}
