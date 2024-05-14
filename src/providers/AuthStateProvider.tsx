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
import { getFavorites } from "@/redux/slices/favoritesSlice";

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
          const response = await fetch(`/api/users/getuser/${user.userId}`);
          const userState = (await response.json()) as userType;
          await revalidateUserdata(userState, user.userId);
          const favoritesRes = await fetch(`/api/favorites`, {
            headers: {
              userId: user.userId,
            },
          });
          const { favorites } = (await favoritesRes.json()) as Favorites;
          dispatch(getFavorites({ favorites: favorites, userId: user.userId }));
        }
      }
    })();
  }, []);

  return <>{children}</>;
}
