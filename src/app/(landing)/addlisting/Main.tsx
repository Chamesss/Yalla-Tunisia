"use client";
import { useSelector } from "react-redux";
import MainCreateListing from "./components/MainCreateListing";
import { userState } from "@/redux/slices/userSlice";
import Forbidden from "@/components/Forbidden";
import FormService from "./check/FormService";

export default function Main() {
  const user: userInfoType = useSelector(userState);
  if (user.isLogged === false) {
    return <Forbidden />;
  } else {
    return user.user.isValid ? <MainCreateListing /> : <FormService />;
  }
}
