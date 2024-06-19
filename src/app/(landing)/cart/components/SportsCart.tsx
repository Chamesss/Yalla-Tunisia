"use client";
import Category from "@/components/icons/Category";
import TrashBin from "@/components/icons/TrashBin";
import { getLocationFromId } from "@/helpers/getLocationFromId";
import { Button, Input, DatePicker, DateValue } from "@nextui-org/react";
import React, { useState } from "react";
import Image from "next/image";
import Location from "@/components/icons/Location";
import { today, getLocalTimeZone } from "@internationalized/date";
import { calculateIsDateUnavailable } from "./helpers/calculate-is-date-unavailable";

export default function SportsCart({
  item,
}: {
  item: { data: ProductSports; ref: string };
}) {
  const [totalDuration, setTotalDuration] = useState<number | undefined>();
  const [totalGroup, setTotalGroup] = useState<string | undefined>();

  let isDateUnavailable = calculateIsDateUnavailable(
    item.data.eventType,
    //@ts-ignore
    item.data.timing
  );

  return (
    <tr className="hidden sm:table-row">
      <td className="w-1/6">
        <div className="flex flex-row gap-8 my-1">
          <div className="w-[8rem] h-[8rem] overflow-hidden relative flex items-center justify-center rounded-md">
            <Image
              src={item.data.imageUrls[0]}
              width={640}
              height={640}
              alt={`picture-${item.data.title}`}
              className="w-full rounded-sm object-contain z-10"
              priority={true}
            />
            <Image
              src={item.data.imageUrls[0]}
              width={640}
              height={640}
              alt={`picture-${item.data.title}`}
              className="h-full rounded-sm object-cover blur-lg absolute"
              priority={true}
            />
          </div>
          <div className="flex flex-col space-y-1 mt-2">
            <p className="capitalize text-lg font-semibold -ml-3">
              {item.data.title}
            </p>
            <small className="opacity-70 relative">
              <Location className="inline-block absolute top-[10%] -left-[1.15rem]" />{" "}
              {getLocationFromId(item.data.location)}
            </small>
            <small className="opacity-70 relative">
              <Category className="inline-block text-medium absolute top-[5%] -left-[1.25rem]" />{" "}
              <span className="capitalize">{item.ref}</span>
            </small>
          </div>
        </div>
      </td>
      <td className="w-1/2">
        <div className="flex flex-row items-center">
          <div className="inline-block mx-1">
            <Input
              // onChange={(e) => {
              //   if (Number(e.target.value) <= 0) {
              //     setTotalDuration(1);
              //   } else if (
              //     Number(e.target.value) >= Number(item.data.duration)
              //   ) {
              //     setTotalDuration(Number(item.data.duration));
              //   } else setTotalDuration(Number(e.target.value));
              // }}
              placeholder="1"
              label="Duration"
              value={item.data.duration}
              labelPlacement="outside"
              className="w-[4rem]"
              type="number"
              isDisabled
            />
          </div>
          <div className="inline-block mx-1">
            <DatePicker
              label="Calendar"
              aria-label="Calendar"
              labelPlacement="outside"
              isDateUnavailable={isDateUnavailable}
              minValue={today(getLocalTimeZone())}
            />
          </div>
        </div>
      </td>
      <td className="w-1/6">
        <p className="font-semibold text-[#309980] text-lg px-3 text-nowrap">
          {Number(item.data.price)} Dt
        </p>
      </td>
      <td className="w-1/6">
        <div className="flex flex-row items-center gap-2">
          <Button
            color="primary"
            className="!py-0"
            onClick={() => console.log("open checkout modal")}
          >
            Check Out
          </Button>
          <Button
            isIconOnly
            color="danger"
            onClick={() => console.log("delete from cart")}
          >
            <TrashBin />
          </Button>
        </div>
      </td>
    </tr>
  );
}
