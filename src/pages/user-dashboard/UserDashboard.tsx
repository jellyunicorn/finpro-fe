import { useOutlet } from "react-router";
import Breadcrumbs from "../../components/Breadcrumbs";
import SideBar from "../../components/SideBar";
import logo_address_blue from "../../img/svg/address_blue.svg";
import logo_address from "../../img/svg/address_white.svg";
import logo_home from "../../img/svg/home_menu_icon.svg";
import logo_home_blue from "../../img/svg/home_menu_icon_blue.svg";
import logo_settings from "../../img/svg/settings_menu_icon.svg";
import logo_settings_blue from "../../img/svg/settings_menu_icon_blue.svg";
import logo_order_blue from "../../img/svg/Order_blue.svg";
import logo_order from "../../img/svg/Order_white.svg";

export default function UserDashboard() {
  const outlet = useOutlet();

  return (
    <div className="w-full font-dmsans  h-dvh bg-[#FBFDFF] flex">
      <div className="h-dvh">
        <SideBar
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
      <div className="h-full flex flex-col relative justify-start flex-1">
        <div className="border-b shrink-0 border-[#BAD6F5]  text-neutral-400 font-medium w-full h-16 flex items-center px-10">
          <Breadcrumbs />
        </div>
        <div className="flex-1 overflow-y-auto"> {outlet || " <MainDashboard/>"}</div>
      </div>
    </div>
  );
}
