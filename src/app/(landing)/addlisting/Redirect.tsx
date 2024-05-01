"use client";
import { useSelector } from "react-redux";
import { userState } from "@/redux/slices/userSlice";
import { useRouter } from "next/navigation";

export default function Redirect() {
  const user: userInfoType = useSelector(userState);
  const route = useRouter();
  if (user.isLogged === false) {
    route.replace("/forbidden");
  } else {
    user.user.isValid === undefined || user.user.isValid === null
      ? route.replace("/addlisting/check")
      : route.replace("/addlisting/panel");
  }
  return void 0;
}

export function redirect() {
  const user: userInfoType = useSelector(userState);
  const route = useRouter();
  if (user.isLogged === false) {
    route.replace("/forbidden");
  } else {
    user.user.isValid === undefined || user.user.isValid === null
      ? route.replace("/addlisting/check")
      : route.replace("/addlisting/panel");
  }
}
