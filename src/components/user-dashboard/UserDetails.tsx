import { useState } from "react";
import showicon from "../../img/svg/view2.svg";
import hideicon from "../../img/svg/hide_view.svg";

type detailprops = {
  title: string;
  content: string;
};

export default function UserDetails({ title, content }: detailprops) {
  const [isHidden, setIsHidden] = useState<boolean>(true);

  return (
    <div>
      <div className=" items-center  grid grid-cols-3">
        <div>
          <h2>{title}</h2>
        </div>
        <div>
          <input
            type={
              title === "Password" ? (isHidden ? "password" : "text") : "text"
            }
            className=" w-full"
            value={content}
            disabled={true}
          />
        </div>
        <div className="flex justify-end">
          {/* show password icon */}
          {title === "Password" && (
            <button onClick={() => setIsHidden(!isHidden)}>
              {isHidden && <img src={hideicon} alt="" className="h-5" />}
              {!isHidden && <img src={showicon} alt="" className="h-5" />}
            </button>
          )}
          {/* check verify or not  icon */}
        </div>
      </div>
    </div>
  );
}
