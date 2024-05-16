import React from "react";
import CarouselImages from "./CarousselImages";
import { Divider, Tooltip } from "@nextui-org/react";
import CheckOutBox from "./components/CheckOutBox";
import MapScrollable from "./components/MapScrollable";
import InfoSection from "./components/InfoSection";

export default async function HandmadePage({ res }: { res: ProductHandMade }) {
  return (
    <div className="flex flex-col py-4 mb-20 px-8 ">
      <div className="flex flex-col lg:flex-row  gap-6 relative">
        <div className="flex lg:hidden flex-col w-full">
          <InfoSection data={res} />
        </div>
        <div className="rounded-xl sm:w-1/2 sm:h-1/2 w-fit flex self-center lg:self-auto">
          <div className="flex-1">
            <CarouselImages images={res.imageUrls} />
          </div>
        </div>
        <div className="p-2 w-full overflow-y-auto">
          <div className="hidden lg:flex flex-col w-full">
            <InfoSection data={res} />
          </div>
          <Divider className="my-4" />
          <div>
            <p className="text-lg font-semibold">Description:</p>
            <p className="mt-2">{res.description}</p>
          </div>
          <Divider className="my-4" />
          <div className="flex relative flex-row gap-2 items-center hover:underline cursor-pointer mt-2">
            <div className="relative w-14 h-14">
              {/* <img
                className="relative bg-gray-200 rounded-full"
                src={user.picture}
              /> */}
              {/* {user.trusted && ( */}
              <Tooltip content="Trusted">
                <div className="w-4 h-4 absolute rounded-full bg-[#48b9ff] outline outline-white dark:outline-[#212933] right-0 bottom-0 z-10" />
              </Tooltip>
              {/* )} */}
            </div>
            <div>
              {/* <span>{user.firstname + " " + user.lastname}</span> */}
              {/* <p className="flex flex-row gap-1 text-sm items-center opacity-50">
                <Location /> {user.city[0].name}
              </p> */}
            </div>
          </div>
          <blockquote className="relative p-2 rounded-lg mt-4">
            <p className="text-gray-600 italic text-sm">
              <span className="absolute top-0 left-0 text-xl text-gray-400">
                “
              </span>
              {/* {user.description} Lorem ipsum dolor sit amet consectetur */}
              adipisicing elit. Reiciendis pariatur explicabo vitae incidunt nam
              distinctio iure, inventore, totam tempora nobis quis magnam!
              Aliquam reprehenderit.
              <span className="absolute bottom-0 right-0 text-xl text-gray-400">
                ”
              </span>
            </p>
          </blockquote>
          <MapScrollable />
        </div>

        <div className="w-[75%] p-4">
          <CheckOutBox productId={res.id} />
        </div>
        {/* <p className="font-medium">Views: {data.views}</p> */}
      </div>
      <div id="targetSection" className="mt-28 w-full">
        {/* <MapSection lat={user.lat} lng={user.lng} /> */}
      </div>
    </div>
  );
}
