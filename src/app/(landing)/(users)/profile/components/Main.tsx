"use client";
import { Button, Chip, Divider } from "@nextui-org/react";
import EditButton from "./EditButton";
import React, { Suspense } from "react";
import CardSkeleton from "@/components/utils/CardSkeleton";
import { ExtractDate } from "@/helpers/ExtractDateTimestamp";
import { getLocationUserCompute } from "@/helpers/getLocationUserCompute";
import DisplayStore from "../../profiles/[id]/components/DisplayStore";
import GeoCart from "../../profiles/[id]/components/GeoCart";
import ItemsDisplay from "../../profiles/[id]/components/ItemsDisplay";
import DropDownProfiles from "./DropDownProfiles";
import Image from "next/image";
import Location from "@/components/icons/Location";

export default function Main({ user }: { user: userType }) {
  const date = ExtractDate(user.created_at);

  return (
    <div className="flex flex-1 justify-center">
      <div className="max-w-[100rem] flex flex-1 w-full px-2 xs:px-4 sm:px-6 md:px-10 lg:px-20 py-16">
        <div className="border border-opacity-75 rounded-xl w-full flex flex-1 flex-col">
          <div className="p-5 md:p-8 flex flex-row justify-between">
            <div className="flex flex-row gap-4">
              <Image
                width={1024}
                height={1024}
                src={user.picture}
                alt="profile-picture"
                className="md:w-20 md:h-20 h-16 w-16 rounded-full drop-shadow-sm"
                priority={true}
                quality={100}
              />
              <div>
                <p className="capitalize text-xl md:text-2xl font-semibold">
                  {user.username}.
                </p>
                <p className="flex flex-row gap-1 text-medium md:text-lg text-default-500 items-center">
                  <Location className="mb-[0.125rem] text-sm" />{" "}
                  {getLocationUserCompute(user.activeAreaId)?.city}
                </p>
                <Chip variant="flat" color="primary">
                  {user.seller ? "Seller" : "Visitor"}
                </Chip>
              </div>
            </div>
            <DropDownProfiles />
          </div>
          <Divider />
          <div className="w-full flex flex-col md:flex-row flex-1">
            <div className="w-[100%] md:w-[30%] flex p-5 md:p-8 flex-col space-y-3">
              <div className="w-full justify-between flex flex-row items-center">
                <h1 className="text-xl font-bold tracking-wide">Info</h1>
                <EditButton />
              </div>
              <div className="px-3 py-2 rounded-lg space-y-1">
                <p className="text-sm">
                  Phone:{" "}
                  <span className="font-semibold text-lg text-default-500 ml-2">
                    {user.tel}
                  </span>
                </p>
                <p className="text-sm">
                  Joined at{" "}
                  <span className="font-semibold text-lg text-default-500 ml-2">
                    {date}
                  </span>
                </p>
              </div>
              <div className="w-full justify-between flex flex-row items-center">
                <h1 className="text-xl font-bold tracking-wide">Location</h1>
                <EditButton />
              </div>
              <div className="flex justify-center">
                <div className="px-2 lg:px-8 w-[18rem] xs:w-[21rem] md:[18rem]">
                  <GeoCart activeAreaId={user.activeAreaId} />
                </div>
              </div>
            </div>
            <Divider
              orientation="vertical"
              className="w-[0.05rem] hidden md:block"
            />
            <div className="flex flex-1 flex-col">
              <div className="flex flex-col p-5 md:p-8 space-y-3">
                <div className="w-full justify-between flex flex-row items-center">
                  <h1 className="text-xl font-bold tracking-wide">
                    Description
                  </h1>
                  <EditButton />
                </div>
                <blockquote className="italic text-default-600">
                  ❝ {user.description} ❞
                </blockquote>
              </div>
              <Divider />
              {user.seller && (
                <React.Fragment>
                  <div className="flex flex-col p-5 md:p-8 space-y-3">
                    <div className="w-full justify-between flex flex-row items-center">
                      <h1 className="text-xl font-bold tracking-wide">Store</h1>
                      <EditButton />
                    </div>
                    <div>
                      <Suspense fallback={<p>Loading...</p>}>
                        <DisplayStore id={user.id as string} />
                      </Suspense>
                    </div>
                  </div>
                  <Divider />
                </React.Fragment>
              )}
              <div className="space-y-3 p-5 md:p-8">
                <div className="w-full justify-between flex flex-row items-center">
                  <h1 className="text-xl font-bold tracking-wide">Info</h1>
                  <Button variant="flat" color="primary">
                    Go to panel
                  </Button>
                </div>
                <div className="w-full flex item-center justify-center">
                  <Suspense
                    fallback={
                      <div className="grid grid-cols-3 gap-10 w-fit">
                        {Array(6).map((_, index) => (
                          <React.Fragment key={index}>
                            <CardSkeleton />
                          </React.Fragment>
                        ))}
                      </div>
                    }
                  >
                    <ItemsDisplay id={user.id as string} />
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
