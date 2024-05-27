import { getUserById } from "@/lib/UserActions/getUser";
import { redirect } from "next/navigation";
import React from "react";

export default async function Profiles({ params }: { params: { id: string } }) {
  async function getUser() {
    const res = await getUserById(params.id);
    return res;
  }

  const user = (await getUser()) as userType;

  if (user) {
    return <div>Profiles id === {params.id}</div>;
  }

  redirect("/forbidden");
}
