import { useLocation, Link } from "react-router";
import { Bell } from "lucide-react";

const routeLabels: Record<string, string> = {
  admin: "Home",
  outlets: "Outlets",
  "laundry-items": "Laundry Items",
  users: "Users",
  orders: "Orders",
  "bypass-requests": "Bypass Requests",
  reports: "Reports",
  sales: "Sales",
  performance: "Performance",
  attendance: "Attendance",
  profile: "Profile",
  create: "Create",
  edit: "Edit",
};

function getLabel(segment: string): string {
  return routeLabels[segment] || segment;
}

export default function AdminTopBar() {
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);

  return (
    <div className="border-b border-[#BAD6F5] w-full h-16 flex items-center justify-between px-10 bg-white">
      {/* Breadcrumb - persis pattern UserDashboard Teru */}
      <nav className="flex items-center gap-2 text-neutral-400 font-medium font-dmsans">
        {segments.map((segment, idx) => {
          const path = "/" + segments.slice(0, idx + 1).join("/");
          const isLast = idx === segments.length - 1;
          return (
            <span key={path} className="flex items-center gap-2">
              {idx > 0 && <span>/</span>}
              {isLast ? (
                <span className="text-[#296FDA]">{getLabel(segment)}</span>
              ) : (
                <Link to={path} className="hover:text-[#296FDA]">
                  {getLabel(segment)}
                </Link>
              )}
            </span>
          );
        })}
        <span className="ml-1">/</span>
      </nav>

      {/* Notif bell */}
      <button
        type="button"
        className="relative rounded-full p-2 text-neutral-500 hover:bg-neutral-100 hover:cursor-pointer"
        aria-label="Notifications"
      >
        <Bell className="size-5" />
        <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-[#F87171]" />
      </button>
    </div>
  );
}
