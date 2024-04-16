"use client";
import { userState } from "@/redux/slices/userSlice";
import { useSelector } from "react-redux";
import User from "./User";

export default function Main() {
  const user: userInfoType = useSelector(userState);
  const firstname =
    user.user.firstname[0].toUpperCase() + user.user.firstname.slice(1);
  const lastname =
    user.user.lastname[0].toUpperCase() + user.user.lastname.slice(1);
  const fullName = firstname + " " + lastname;

  return (
    <div className="border border-solid border-black border-opacity-50 rounded-2xl p-4 w-full">
      <User user={user} fullName={fullName} />
    </div>
  );
}
