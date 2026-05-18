type sidebarmenuprop = {
  icon: string;
  icon_dark: string;
  label: string;
  minimize:boolean;
};

export default function SideBarMenu({
  icon,
  icon_dark,
  label,
  minimize,
}: sidebarmenuprop) {
  return (
    <div className="w-full h-15 p-2">
      <button className="group rounded-lg  relative  hover:bg-[#296FDA] h-15 w-full   px-5 flex items-center gap-5">
        <img src={icon} alt="" className="  h-5" />
        <img
          src={icon_dark}
          alt=""
          className="absolute h-5 group-hover:opacity-0"
        />
{!minimize &&        <span className="font-dmsans group-hover:text-white font-medium text-[#296FDA] text-lg">
          {label}
        </span>}
      </button>
    </div>
  );
}
