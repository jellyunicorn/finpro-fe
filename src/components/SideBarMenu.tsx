import { useState } from "react";
import { Link } from "react-router";

type SideBarMenuProps = {
  icon: string;
  iconDark: string;
  label: string;
  minimize: boolean;
  to: string;
  children?: { label: string; to: string }[];
};

export default function SideBarMenu({
  icon,
  iconDark,
  label,
  minimize,
  to,
  children,
}: SideBarMenuProps) {
  const [open, setOpen] = useState(false);
  const hasChildren = children && children.length > 0;

  return (
    <div className="w-full">
      <div className="group rounded-lg relative hover:bg-[#296FDA] h-15 w-full px-5 flex items-center gap-5">
        <Link to={to} className="flex items-center gap-5 flex-1">
          <img src={icon} alt={`${label}-icon`} className="h-5" />
          <img
            src={iconDark}
            alt={`${label}-icon-dark`}
            className="absolute h-5 group-hover:opacity-0"
          />
          {!minimize && (
            <span className="font-dmsans group-hover:text-white font-medium text-[#296FDA] text-lg">
              {label}
            </span>
          )}
        </Link>

        {hasChildren && !minimize && (
          <button
            onClick={() => setOpen(!open)}
            className="ml-auto text-[#296FDA] group-hover:text-white transform transition-transform duration-300 ease-in-out"
          >
            <div
              className={`${open ? "rotate-90" : "rotate-0"} text-lg inline-block transition-transform duration-300`}
            >
              &gt;
            </div>
          </button>
        )}
      </div>

      {open && hasChildren && (
        <div className="flex flex-col">
          {children.map((child, idx) => (
            <Link
              key={idx}
              to={child.to}
              className="group flex items-center gap-4 pl-7
                         text-[#296FDA] font-dmsans text-base rounded-lg
                         hover:bg-[#296FDA] hover:text-white transition-colors"
            >
              <div className="border-l px-6 py-1">{child.label}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
