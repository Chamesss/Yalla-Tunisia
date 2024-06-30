import React from "react";
import CarouselImages from "./CarousselImages";
import {
  Calendar,
  Chip,
  Divider,
  RangeCalendar,
  Tooltip,
} from "@nextui-org/react";
import CheckOutBox from "./components/CheckOutBox";
import MapScrollable from "./components/MapScrollable";
import InfoSection from "./components/InfoSection";
import { today, getLocalTimeZone } from "@internationalized/date";
import CalendarRange from "./components/CalendarRange";
import UserAndProducts from "./UserAndProducts";
import getUserFromCookies from "@/lib/getUserFromCookies";

export default async function SportsAndEntertainmentPage({
  res,
  categoryName,
}: {
  res: ProductSports;
  categoryName: string;
}) {
  let showCheckBox = true;
  const user = await getUserFromCookies();
  if (user && user.userId && user.userId === res.userId) {
    showCheckBox = false;
  }
  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col w-full py-4 mb-20 px-8 max-w-[100rem]">
        <div className="flex flex-col w-full lg:flex-row gap-6 relative">
          <div className="flex lg:hidden flex-col w-full">
            <InfoSection data={res} />
          </div>
          <div className="rounded-xl sm:w-1/2 sm:h-1/2 w-fit flex self-center lg:self-auto">
            <div className="flex-1">
              <CarouselImages images={res.imageUrls} />
            </div>
          </div>
          <div className="p-2 w-full">
            <div className="hidden lg:flex flex-col w-full">
              <InfoSection data={res} />
            </div>
            <Divider className="my-4" />
            <div>
              <p className="text-lg font-semibold">Description</p>
              <p className="mt-2">{res.description}</p>
            </div>
            <Divider className="my-4" />

            <div
              className="justify-between items-center flex-row flex w-full"
              id="colorSection"
            >
              <div className="space-y-2 flex-auto">
                <h1 className="text-lg font-semibold">Max Groupe size</h1>
                <p className="text-nowrap">
                  <Chip variant="flat" className="text-lg" color="primary">
                    {res.grpSize} Person(s)
                  </Chip>
                </p>
              </div>
              <Divider
                orientation="vertical"
                className="h-20 mx-4 w-[0.1rem] "
              />
              <div className="space-y-2 flex-1">
                <h1 className="text-lg font-semibold">Duration</h1>
                <Chip
                  variant="flat"
                  color="primary"
                  className="text-lg min-w-10"
                >
                  {res.duration} Hours
                </Chip>
              </div>
            </div>
            <Divider className="my-4" />
            <div className="items-start justify-start text-start flex-col flex overflow-x-hidden">
              <h1 className="text-lg font-semibold text-start">Calendar</h1>
              {res.eventType === "ScheduledEvent" ? (
                <div className="flex w-full justify-center overflow-x-hidden">
                  <div className="xs:scale-100 scale-90">
                    <CalendarRange listing={res} />
                  </div>
                </div>
              ) : (
                <div className="mt-2">
                  <Chip
                    variant="flat"
                    className="md:text-lg p-4"
                    color="primary"
                  >
                    {res.timing as string}
                  </Chip>
                </div>
              )}
            </div>
            {res.restrictions.length > 0 && res.restrictions[0].length > 0 && (
              <Divider className="my-4" />
            )}
            {res.restrictions.length > 0 && res.restrictions[0].length > 0 && (
              <div>
                <h1 className="text-lg font-semibold text-start mb-2">
                  Restrictions
                </h1>
                {res.restrictions.map((r, i) => (
                  <React.Fragment key={i}>
                    <p className="py-2 px-4 bg-default-300 rounded-xl mt-2">
                      {r}
                    </p>
                  </React.Fragment>
                ))}
              </div>
            )}

            {/* <MapScrollable /> */}
          </div>

          {showCheckBox && (
            <div className="w-[100%] lg:max-w-[25rem] max-w-auto p-4">
              <CheckOutBox productId={res.id} categoryName={categoryName} />
            </div>
          )}
          {/* <p className="font-medium">Views: {data.views}</p> */}
        </div>
        <div className="mt-8">
          <UserAndProducts userId={res.userId} section="Sports" />
        </div>
      </div>
    </div>
  );
}
