import { type Dispatch, type SetStateAction } from "react";
import { Link } from "react-router";
import useLogout from "../hooks/useLogout";
import logo_logout from "../img/svg/logout_logo.svg";
import logo_blue from "../img/svg/main_logo_blue.svg";
import logo_sidebar from "../img/svg/sidebar_icon.svg";
import { useLoginStore } from "../store/useAppStore";
import SideBarMenu from "./SideBarMenu";

type MenuItem = {
  icon: string;
  iconDark: string;
  label: string;
  to: string;
  children?: { label: string; to: string }[];
};

type SideBarProps = {
  minimize:boolean,
  setMinimize:Dispatch<SetStateAction<boolean>>;
  menuItems: MenuItem[];
};

export default function SideBar({
  minimize,
  setMinimize,
  menuItems,
}: SideBarProps) {
  const handleLogout = useLogout();
  const user = useLoginStore((state) => state.user);

  return (
    <aside
      className={`flex flex-col  ${
        !minimize ? "w-[20%] max-w-75 min-w-64" : "min-w-20"
      } transition-all justify-between h-full bg-[#BAD6F5]`}
    >
      <div className="h-full w-full">
        <div
          className={`flex ${
            minimize ? "justify-center" : "justify-between"
          } h-16 border items-center border-[#BAD6F5] p-4 w-full bg-white`}
        >
          {!minimize && (
            <Link to="/" className="h-full flex items-center">
              <img
                src={logo_blue}
                alt="main-logo"
                className="h-full max-h-10"
              />
            </Link>
          )}
          <button
            onClick={() => setMinimize(!minimize)}
            className={`${minimize && "rotate-180"} w-7 h-7  items-center justify-center hidden md:flex hover:cursor-pointer`}
          >
            <img src={logo_sidebar} alt="sidebar-toggle" className="max-h-8" />
          </button>
        </div>

        <nav className="h-full p-2">
          <div className="font-dmsans h-full flex flex-col gap-2 justify-start w-full">
            {menuItems.map((item, idx) => (
              <SideBarMenu
                key={idx}
                icon={item.icon}
                iconDark={item.iconDark}
                label={item.label}
                to={item.to}
                children={item.children}
                minimize={minimize}
              />
            ))}
          </div>
        </nav>
      </div>

      <div className="w-full ">
        <Link to="/dashboard/user-profile">
          <div className="w-fit h-15 hover:cursor-pointer hover:underline flex items-center justify-start px-5 font-medium text-neutral-600 text-md  gap-5">
            <img
              src={user?.avatar}
              referrerPolicy="no-referrer"
              alt=""
              className="w-10 h-10 bg-neutral-300 rounded-full "
            />
            {!minimize && <p>{user?.fullName}</p>}
          </div>
        </Link>

        <div className="h-20 border border-[#BAD6F5] flex p-3 bg-white">
          <button
            onClick={handleLogout}
            className="hover:bg-black flex hover:text-white items-center justify-center gap-5 font-dmsans w-full h-full rounded-lg bg-white border-[#BAD6F5] border"
          >
            <img
              src={logo_logout}
              alt="logout-logo"
              className="w-5 mix-blend-difference"
            />
            {!minimize && <span>LOG OUT</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}
