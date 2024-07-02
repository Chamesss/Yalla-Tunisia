import getUserFromCookies from "@/lib/getUserFromCookies";
import { redirect } from "next/navigation";
import { getUserById } from "@/lib/UserActions/getUser";
import React from "react";

import Main from "./components/Main";

export default async function page() {
  const userData = await getUserFromCookies();

  if (!userData) {
    redirect("/forbidden");
  }

  const user = (await getUserById(userData.userId as string)) as userType;
  if (user === undefined || !user) {
    return <p>Quelque chose s&apos;est mal passé.</p>;
  }

  return <Main user={user} />;
}
