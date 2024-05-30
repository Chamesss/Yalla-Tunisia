import Location from "@/components/icons/Location";
import { getLocationUserCompute } from "@/helpers/getLocationUserCompute";
import { getUserById } from "@/lib/UserActions/getUser";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import DropDownProfiles from "./components/DropDownProfiles";
import { Card, CardBody, Chip, Divider } from "@nextui-org/react";
import GeoCart from "./components/GeoCart";
import { ExtractDate } from "@/helpers/ExtractDateTimestamp";
import TabsSection from "./components/TabsSection";
import Phone from "@/components/icons/Phone";

export default async function Profiles({ params }: { params: { id: string } }) {
  const user = (await getUserById(params.id)) as userType;
  if (!user) {
    redirect("/forbidden");
  }

  const date = ExtractDate(user.created_at);

  return (
    <div className="flex flex-1 flex-col">
      <div className="max-w-[100rem] flex justify-center flex-col flex-1 w-full px-2 xs:px-4 sm:px-6 md:px-10 lg:px-15 py-16">
        <div className="flex w-full justify-center">
          <div className="lg:w-[90%] w-[100%] relative">
            <Card className="overflow-visible border border-opacity-10 shadow-[0px_0px_30px_-15px_rgba(0,0,0,0.2)]">
              <CardBody className="min-h-[6rem] lg:min-h-[8rem] relative !outline-none !border-none">
                <div className="ml-[6.85rem] sm:ml-[9rem] lg:ml-[16rem]">
                  <h1 className="text-xl lg:text-3xl tracking-wide capitalize opacity-95 flex flex-col w-fit gap-1 lg:gap-2 items-start">
                    <span>{user.username}.</span>
                    <Chip variant="flat" color="primary" className="text-tiny">
                      {user.seller ? "Seller" : "Visitor"}
                    </Chip>
                  </h1>
                </div>
                <div className="absolute top-5 right-5 ">
                  <DropDownProfiles />
                </div>
              </CardBody>
            </Card>
            <div className="absolute -top-6 lg:-top-12 left-4 sm:left-10 lg:left-20 -z-10">
              <Card className="rounded-full border border-opacity-10 shadow-[0_0px_40px_-5px_rgba(0,0,0,0.25)]">
                <CardBody className="block w-[6rem] h-[6rem] lg:h-[10rem] lg:w-[10rem] rounded-full " />
              </Card>
            </div>
            <div className="absolute -top-6 lg:-top-12 left-4 sm:left-10 lg:left-20 w-[6rem] h-[6rem] lg:h-[10rem] lg:w-[10rem] rounded-full bg-white z-10">
              <div className="relative p-1">
                <Image
                  width={1024}
                  height={1024}
                  src={user.picture}
                  alt="profile-picture"
                  className="h-full w-full rounded-full drop-shadow-sm"
                  priority={true}
                  quality={100}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-center mt-10">
          <div className="flex w-[100%] lg:w-[90%] justify-center lg:justify-between flex-col lg:flex-row gap-10">
            <div className="flex flex-col justify-center items-center w-full lg:w-fit gap-4 px-6 py-[0.6rem] overflow-hidden">
              <div className="flex flex-row items-center w-full gap-4">
                <h1 className="text-medium">Intro</h1>
                <Divider />
              </div>
              <div className="px-4 w-full space-y-3 flex flex-col items-start">
                <p className="flex flex-row gap-1 text-medium md:text-medium text-default-500 items-center">
                  <Location className="mb-[0.125rem] text-sm" />{" "}
                  {getLocationUserCompute(user.activeAreaId)?.city}
                </p>
                <p className="flex flex-row gap-1 text-sm md:text-lg text-default-500 items-center">
                  <Phone className="mb-[0.125rem] text-sm" />{" "}
                  <span className="text-sm">
                    +216 <span className="italic">{user.tel}</span>
                  </span>
                </p>
                <p className="font-semibold text-sm text-default-500 ml-0.5">
                  Joined {date}
                </p>
              </div>
              <div className="flex w-full flex-row items-center gap-4">
                <h1 className="text-medium">Location</h1>
                <Divider />
              </div>
              <div className="px-2 lg:px-8 w-[18rem]">
                <GeoCart activeAreaId={user.activeAreaId} />
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-start space-y-3">
              <Card className="shadow-[0px_0px_30px_-15px_rgba(0,0,0,0.2)] border border-opacity-10">
                <CardBody className="px-4 py-4 space-y-4">
                  <h1 className="text-medium">Description</h1>
                  <blockquote className="italic text-default-600">
                    ❝ {user.description} ❞
                  </blockquote>
                </CardBody>
              </Card>
              <div className="w-full">
                <TabsSection id={user.id as string} />
              </div>
            </div>
          </div>
        </div>

        {/* <div className="flex flex-row gap-20 w-full">
          <div className="flex flex-col space-y-3">
            <div className="w-full flex justify-center items-center p-4">
              <Image
                width={1024}
                height={1024}
                src={user.picture}
                alt="profile-picture"
                className="h-[12rem] w-[12rem] rounded-full drop-shadow-sm"
                priority={true}
                quality={100}
              />
            </div>
            <div className="flex flex-row items-center gap-4 overflow-hidden px-4">
              <span>Location</span>
            </div>
            <div className="px-2 lg:px-8 w-[18rem] xs:w-[21rem] md:[18rem]">
              <GeoCart activeAreaId={user.activeAreaId} />
            </div>
          </div>
          <div className="flex flex-1 flex-col space-y-4">
            <div className="flex flex-col space-y-4 w-full px-1">
              <Card>
                <CardBody className="p-4 space-y-4">
                  <div className="w-full flex flex-row justify-between">
                    <div>
                      <User
                        name={user.username}
                        description={user.seller ? "Seller" : "Visitor"}
                        avatarProps={{
                          src: user.picture,
                          size: "lg",
                        }}
                        classNames={{
                          name: "text-xl tracking-wide",
                          base: "gap-4",
                        }}
                      />
                    </div>
                     <div className="flex flex-row gap-6 items-center">
                      <p className="text-3xl font-medium capitalize tracking-wide">
                        {user.username}.
                      </p>
                      <Chip variant="flat" color="primary">
                        {user.seller ? "Seller" : "Visitor"}
                      </Chip>
                    </div> 
                    <DropDownProfiles />
                  </div>
                  <p className="flex flex-row gap-1 text-medium md:text-lg text-default-500 items-center">
                    <Location className="mb-[0.125rem] text-sm" />{" "}
                    {getLocationUserCompute(user.activeAreaId)?.city}
                  </p>

                  <p className="text-opacity-90 italic text-sm">
                    <Chip
                      variant="flat"
                      color="primary"
                      size="md"
                      className="-px-2 mr-2"
                    >
                      <Phone className="inline-block text-lg" />
                    </Chip>
                    +216 {user.tel}
                  </p>
                  <p className="text-sm">
                    Joined at{" "}
                    <span className="font-semibold text-lg text-default-500 ml-2">
                      {date}
                    </span>
                  </p>
                </CardBody>
              </Card>
            </div>
            <div>
              <TabsSection id={user.id as string} />
            </div>
          </div>
        </div> */}

        {/* <div className="border border-opacity-75 rounded-xl w-full flex flex-1 flex-col">
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
              <h1 className="text-xl font-bold tracking-wide">Info</h1>
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
              <h1 className="text-xl font-bold tracking-wide">Location</h1>
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
                <h1 className="text-xl font-bold tracking-wide">Description</h1>
                <blockquote className="italic text-default-600">
                  ❝ {user.description} ❞
                </blockquote>
              </div>
              <Divider />
              {user.seller && (
                <React.Fragment>
                  <div className="flex flex-col p-5 md:p-8 space-y-3">
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
              <div className="space-y-3 p-5 md:p-8">
                <h1 className="text-xl font-bold tracking-wide">Offers</h1>
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
                    <ItemsDisplay id={params.id} />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
