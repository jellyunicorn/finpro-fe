import { redirect } from "react-router";
import { useLoginStore } from "../store/useAppStore.ts";
import toast from "react-hot-toast";

export const authLoader = (allowedRoutes?: String[]) => {
  return () => {
    const { user } = useLoginStore.getState();

    
    if (!user) {
      toast("Access denied, please Log in to enter")
      return redirect("/login");
    }

     if (user.verifiedAt === null) {
      toast("Access denied, Email has not")
      return redirect("/login");
    }


    if (allowedRoutes && !allowedRoutes.includes(user.role)) {
      return redirect("/");
    }

    return;
  };
};

export const loggedInLoader = () => {
  const { user } = useLoginStore.getState();
  if (user) return redirect("/");
  return null;
};
