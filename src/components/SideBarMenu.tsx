import { Link } from "react-router";

type SideBarMenuProps = {
  icon: string;
  iconDark: string;
  label: string;
  minimize: boolean;
  to: string;
};

export default function SideBarMenu({
  icon,
  iconDark,
  label,
  minimize,
  to,
}: SideBarMenuProps) {
  return (
    <div className="w-full h-15 p-2">
      <Link
        to={to}
        className="group rounded-lg relative hover:bg-[#296FDA] h-15 w-full px-5 flex items-center gap-5"
      >
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
    </div>
  );
}
