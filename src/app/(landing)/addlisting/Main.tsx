"use client";
import { useSelector } from "react-redux";
import MainCreateListing from "./components/MainCreateListing";
import { userState } from "@/redux/slices/userSlice";
import Forbidden from "@/components/Forbidden";
import FormService from "./check/FormService";
import { useRouter } from "next/navigation";

export default function Main() {
  const user: userInfoType = useSelector(userState);
  const route = useRouter();
  if (user.isLogged === false) {
    route.replace("/forbidden");
  } else {
    return user.user.isValid ? <MainCreateListing /> : <FormService />;
  }
}
