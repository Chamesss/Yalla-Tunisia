import Category from "@/components/icons/Category";
import TrashBin from "@/components/icons/TrashBin";
import { getLocationFromId } from "@/helpers/getLocationFromId";
import { useDisclosure, Button, DatePicker, Input } from "@nextui-org/react";
import React, { useState } from "react";
import Image from "next/image";
import Location from "@/components/icons/Location";
import { today, getLocalTimeZone } from "@internationalized/date";
import GrpSize from "./GrpSize";
import { calculateIsDateUnavailable } from "./helpers/calculate-is-date-unavailable";
import Link from "next/link";
import CheckOutModal from "./CheckOutModal";

export default function GuideCart({
  item,
}: {
  item: { data: ProductGuides; ref: string };
}) {
  const [totalDuration, setTotalDuration] = useState<number>(1);
  const [totalGroup, setTotalGroup] = useState<number>(1);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  let isDateUnavailable = calculateIsDateUnavailable(
    item.data.eventType,
    //@ts-ignore
    item.data.timing
  );

  return (
    <tr className="lg:table-row flex flex-col w-full items-center space-y-4 py-8 lg:space-y-0 lg:py-0">
      <td className="lg:w-1/3 w-full max-w-[30rem] lg:max-w-auto px-4 lg:px-0">
        <Link
          href={`/listings/${item.ref}/${item.data.id}`}
          className="flex flex-row gap-8 my-1"
        >
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
        </Link>
      </td>
      <td className="lg:w-1/2 w-full max-w-[30rem] lg:max-w-auto px-4 lg:px-0">
        <div className="flex flex-col space-y-3 xs:flex-row items-center">
          <div className="flex flex-row items-center">
            <div className="inline-block mx-1">
              {item.data.paymentMethodHourly ? (
                <Input
                  onChange={(e) => {
                    if (Number(e.target.value) <= 0) {
                      setTotalDuration(1);
                    } else if (Number(e.target.value) >= 8) {
                      setTotalDuration(8);
                    } else setTotalDuration(Number(e.target.value));
                  }}
                  placeholder="1"
                  label={
                    <p className="text-nowrap">
                      Duration <small>(hour)</small>
                    </p>
                  }
                  value={totalDuration.toString()}
                  labelPlacement="outside"
                  className="w-[6rem]"
                  type="number"
                />
              ) : (
                <Input
                  placeholder="1"
                  label={
                    <p className="text-nowrap">
                      Duration <small>(Tour)</small>
                    </p>
                  }
                  value={totalDuration.toString()}
                  labelPlacement="outside"
                  className="w-[6rem]"
                  type="number"
                  isDisabled
                />
              )}
            </div>
            <div className="inline-block mx-1 mb-[0.15rem]">
              <DatePicker
                label="Calendar"
                aria-label="Calendar"
                labelPlacement="outside"
                isDateUnavailable={isDateUnavailable}
                minValue={today(getLocalTimeZone())}
              />
            </div>
          </div>
          <div className="inline-block mx-1">
            <GrpSize setTotalGroup={setTotalGroup} totalGroup={totalGroup} />
          </div>
        </div>
      </td>
      <td className="lg:w-1/6 w-full max-w-[30rem] lg:max-w-auto px-4 lg:px-0 text-center">
        <p className="font-semibold text-[#309980] text-lg px-3 text-nowrap">
          {Number(item.data.price)} Dt
        </p>
      </td>
      <td className="lg:w-1/6 w-full max-w-[30rem] lg:max-w-auto px-4 lg:px-0">
        <div className="flex flex-row items-center justify-center gap-2">
          <Button color="primary" className="!py-0" onClick={onOpen}>
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
      <CheckOutModal
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      />
    </tr>
  );
}
