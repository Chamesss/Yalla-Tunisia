"use client";
import { useSelector } from "react-redux";
import Main from "./components/Main";
import { userState } from "@/redux/slices/userSlice";
import Forbidden from "@/components/Forbidden";

export default function page() {
  const user: userInfoType = useSelector(userState);
  return user.isLogged ? <Forbidden /> : <Main />;
}
