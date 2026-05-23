import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import {
  Home,
  Store,
  Shirt,
  Users,
  Package,
  AlertCircle,
  BarChart3,
  Trophy,
  User,
  LogOut,
  PanelLeftClose,
} from "lucide-react";
import logo_blue from "../../../img/svg/main_logo_blue.svg";
import { useAuthStore, useIsSuperAdmin, useUser } from "../../../store/auth.store";

interface NavItem {
  to: string;
  label: string;
  icon: React.ElementType;
  superAdminOnly?: boolean;
  end?: boolean;
}

const navItems: NavItem[] = [
  { to: "/admin", label: "Dashboard", icon: Home, end: true },
  { to: "/admin/outlets", label: "Outlets", icon: Store },
  { to: "/admin/laundry-items", label: "Laundry Items", icon: Shirt, superAdminOnly: true },
  { to: "/admin/users", label: "Users", icon: Users, superAdminOnly: true },
  { to: "/admin/orders", label: "Orders", icon: Package },
  { to: "/admin/bypass-requests", label: "Bypass Requests", icon: AlertCircle },
  { to: "/admin/reports/sales", label: "Sales Report", icon: BarChart3 },
  { to: "/admin/reports/performance", label: "Performance", icon: Trophy },
  { to: "/admin/profile", label: "Profile", icon: User },
];

export default function AdminSideBar() {
  const [minimize, setMinimize] = useState<boolean>(false);
  const user = useUser();
  const isSuperAdmin = useIsSuperAdmin();
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const filteredNavItems = navItems.filter(
    (item) => !item.superAdminOnly || isSuperAdmin
  );

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside
      className={`flex flex-col ${!minimize ? "w-[20%] max-w-75 min-w-64" : "min-w-20"} transition-all justify-between h-full bg-[#BAD6F5]`}
    >
      <div className="h-full w-full overflow-y-auto">
        {/* Header dengan logo - persis pattern Teru */}
        <div
          className={`flex ${minimize ? "justify-center" : "justify-between"} h-16 border items-center border-[#BAD6F5] p-4 w-full bg-white sticky top-0 z-10`}
        >
          {!minimize && (
            <Link to="/" className="h-full flex items-center">
              <img src={logo_blue} alt="claundry-logo" className="h-full max-h-10" />
            </Link>
          )}
          <button
            onClick={() => setMinimize(!minimize)}
            className={`${minimize && "rotate-180"} w-7 h-7 flex items-center justify-center hover:cursor-pointer`}
          >
            <PanelLeftClose className="w-6 h-6 text-[#296FDA]" />
          </button>
        </div>

        {/* Nav items - sama pattern Teru tapi pake NavLink */}
        <nav className="h-full">
          <div className="font-dmsans h-full flex flex-col gap-2 justify-start w-full py-3">
            {filteredNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.to} className="w-full h-15 p-2">
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      `group rounded-lg relative h-15 w-full px-5 flex items-center gap-5 transition-colors ${
                        isActive
                          ? "bg-[#296FDA] text-white"
                          : "hover:bg-[#296FDA] hover:text-white text-[#296FDA]"
                      }`
                    }
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    {!minimize && (
                      <span className="font-dmsans font-medium text-lg">
                        {item.label}
                      </span>
                    )}
                  </NavLink>
                </div>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Profile + Logout bottom - pattern Teru */}
      <div className="border border-[#BAD6F5] flex flex-col gap-2 p-3 bg-white">
        {!minimize && user && (
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="size-10 shrink-0 overflow-hidden rounded-full bg-[#BAD6F5]">
              {user.profilePhoto ? (
                <img src={user.profilePhoto} alt={user.name} className="size-full object-cover" />
              ) : (
                <div className="flex size-full items-center justify-center text-sm font-bold text-[#296FDA]">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-[#296FDA]">
                {user.name}
              </p>
              <p className="truncate text-xs text-neutral-500">
                {user.role.replace("_", " ")}
              </p>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="hover:bg-black flex hover:text-white items-center justify-center gap-5 font-dmsans w-full h-12 rounded-lg bg-white border-[#BAD6F5] border hover:cursor-pointer"
        >
          <LogOut className="w-5 h-5" />
          {!minimize && <span>LOG OUT</span>}
        </button>
      </div>
    </aside>
  );
}
