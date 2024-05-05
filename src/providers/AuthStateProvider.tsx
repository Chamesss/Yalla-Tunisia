import { getUserById } from "@/lib/UserActions/getUser";
import revalidateUserdata from "@/lib/revalidateCookiesUserState";
import {
  addUserSession,
  logOutSession,
  userState,
} from "@/redux/slices/userSlice";
import React, { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "@/redux/store";
import getUserFromCookies from "@/lib/getUserFromCookies";

export default function AuthStateProvider({
  children,
}: {
  children: ReactNode;
}) {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const user = await getUserFromCookies();
      if (user === null) {
        dispatch(logOutSession());
      } else {
        if (user.userId && user.user) {
          const userData = (await getUserById(user.userId)) as userType;
          await revalidateUserdata(userData, user.userId);
        }
      }
    })();
  }, []);

  return <>{children}</>;
}
