import Location from "@/components/icons/Location";
import { getLocationUserCompute } from "@/helpers/getLocationUserCompute";
import { getUserById } from "@/lib/UserActions/getUser";
import Image from "next/image";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import DropDownProfiles from "./components/DropDownProfiles";
import { Divider } from "@nextui-org/react";
import { getListingsByUserId } from "@/lib/ListingActions/getListingsByUserId";
import ItemsDisplay from "./components/ItemsDisplay";
import { SkeletonLoader } from "@/app/(landing)/addlisting/panel/components/Main";
import CardSkeleton from "@/components/utils/CardSkeleton";
import LocationPicker from "@/app/(landing)/register/components/LocationPicker";
import GeoCart from "./components/GeoCart";
import DisplayStore from "./components/DisplayStore";
import { ExtractDayMonthYear } from "@/helpers/ExtractDayMonthYear";
import { Timestamp } from "firebase/firestore";
import { ExtractDate } from "@/helpers/ExtractDateTimestamp";

export default async function Profiles({ params }: { params: { id: string } }) {
  const user = (await getUserById(params.id)) as userType;
  if (!user) {
    redirect("/forbidden");
  }

  const date = ExtractDate(user.created_at);

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
                <p>{user.seller ? "Seller" : "Visitor"}</p>
              </div>
            </div>
            <DropDownProfiles />
          </div>
          <Divider />
          <div className="w-full flex flex-row flex-1">
            <div className="w-[30%] flex p-8 flex-col space-y-3">
              <h1 className="text-xl font-bold tracking-wide">Info</h1>
              <div>
                <p>{user.username}</p>
                <p>Tel: {user.tel}</p>
                <p>Joined at {date}</p>
              </div>
              <h1 className="text-xl font-bold tracking-wide">Location</h1>
              <div className="w-full px-8">
                <GeoCart activeAreaId={user.activeAreaId} />
              </div>
            </div>
            <Divider orientation="vertical" className="w-[0.05rem]" />
            <div className="flex flex-1 flex-col">
              <div className="flex flex-col p-8 space-y-3">
                <h1 className="text-xl font-bold tracking-wide">Description</h1>
                <blockquote>{user.description}</blockquote>
              </div>
              <Divider />
              {user.seller && (
                <React.Fragment>
                  <div className="flex flex-col p-8 space-y-3">
                    <h1 className="text-xl font-bold tracking-wide">Store</h1>
                    <div>
                      <Suspense fallback={<p>Loading...</p>}>
                        <DisplayStore id={params.id} />
                      </Suspense>
                    </div>
                  </div>
                  <Divider />
                </React.Fragment>
              )}
              <div className="space-y-3 p-8">
                <h1 className="text-xl font-bold tracking-wide">Offers</h1>
                <div className="w-full flex item-center justify-center">
                  <Suspense
                    fallback={
                      <div className="grid grid-cols-3 gap-10 w-fit">
                        {Array(6).fill(<CardSkeleton />)}
                      </div>
                    }
                  >
                    <ItemsDisplay id={params.id} />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
