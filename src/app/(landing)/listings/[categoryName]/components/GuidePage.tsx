import React from "react";
import CarouselImages from "./CarousselImages";
import { Chip, Divider, Tooltip } from "@nextui-org/react";
import CheckOutBox from "./components/CheckOutBox";
import MapScrollable from "./components/MapScrollable";
import InfoSection from "./components/InfoSection";
import CalendarRange from "./components/CalendarRange";

export default async function GuidePage({ res }: { res: ProductSports }) {
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
          <div className="items-start justify-start text-start flex-col flex ">
            <h1 className="text-lg font-semibold text-start">Calendar</h1>
            {res.eventType === "ScheduledEvent" ? (
              <div className="flex w-full justify-center overflow-x-hidden">
                <div className="xs:scale-100 scale-90">
                  <CalendarRange listing={res} />
                </div>
              </div>
            ) : (
              <div className="mt-2">
                <Chip variant="flat" className="text-lg p-4" color="primary">
                  {res.timing as string}
                </Chip>
              </div>
            )}
          </div>
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
