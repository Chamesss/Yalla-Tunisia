import Location from "@/components/icons/Location";
import { getLocationUserCompute } from "@/helpers/getLocationUserCompute";
import { getUserById } from "@/lib/UserActions/getUser";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import DropDownProfiles from "./components/DropDownProfiles";
import { Divider } from "@nextui-org/react";

export default async function Profiles({ params }: { params: { id: string } }) {
  const user = (await getUserById(params.id)) as userType;
  if (!user) {
    redirect("/forbidden");
  }

  return (
    <div className="flex flex-1 justify-center">
      <div className="max-w-[100rem] flex flex-1 w-full px-20 py-16">
        <div className="border border-opacity-75 rounded-xl w-full flex flex-1 flex-col">
          <div className="p-8 flex flex-row justify-between">
            <div className="flex flex-row gap-4">
              <Image
                width={1024}
                height={1024}
                src={user.picture}
                alt="profile-picture"
                className="w-20 h-20 rounded-full drop-shadow-sm"
                priority={true}
                quality={100}
              />
              <div>
                <p className="capitalize text-2xl font-semibold">
                  {user.username}.
                </p>
                <p className="flex flex-row gap-2 text-lg text-default-500 items-center">
                  <Location /> {getLocationUserCompute(user.activeAreaId)?.city}
                </p>
              </div>
            </div>
            <DropDownProfiles />
          </div>
          <Divider />
          <div className="w-full flex flex-row flex-1">
            <div className="w-[30%] flex p-8">into</div>
            <Divider orientation="vertical" className="w-[0.05rem]" />
            <div className="flex flex-1 space-y-3 flex-col p-8">
              <h1>Description</h1>
              <blockquote>{user.description}</blockquote>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
