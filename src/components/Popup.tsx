import closeX from "../img/svg/x_icon.svg";

interface PopupChildren {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Popup({ open, onClose, children }: PopupChildren) {
  return (
    <div
  onClick={onClose}
  className={`fixed z-50 inset-0 flex justify-center items-center backdrop-blur-sm
    transition-opacity duration-300 ease-out
    ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}
>
  <div
    onClick={(e) => e.stopPropagation()}
    className={`bg-white rounded-xl shadow p-6 relative transform transition-all duration-300 ease-out
      ${open ? "translate-y-0 scale-100" : "-translate-y-6 scale-95"}`}
  >
    <button
      className="absolute top-1 right-1 p-2 cursor-pointer"
      onClick={onClose}
    >
      <img src={closeX} alt="Close" className="h-4 w-4" />
    </button>
    {children}
  </div>
</div>

  );
}
