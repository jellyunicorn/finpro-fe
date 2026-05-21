import hideIcon from "../img/svg/hide_view.svg";
import showIcon from "../img/svg/view.svg";

type hidebtnprops = {
  isHidden: boolean;
  setIsHidden: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function HidePasswordBtn({
  setIsHidden,
  isHidden,
}: hidebtnprops) {
  return (
    <button onClick={() => setIsHidden(!isHidden)}>
      <img src={`${isHidden ? hideIcon : showIcon}`} alt="" className="h-6" />
    </button>
  );
}
