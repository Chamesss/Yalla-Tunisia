"use client";
import { useSelector } from "react-redux";
import MainRegister from "./components/Main";
import { userState } from "@/redux/slices/userSlice";
import Forbidden from "@/components/Forbidden";

export default function Main() {
  const user: userInfoType = useSelector(userState);
  return user.isLogged ? <Forbidden /> : <MainRegister />;
}
