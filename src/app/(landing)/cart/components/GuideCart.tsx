import Category from "@/components/icons/Category";
import TrashBin from "@/components/icons/TrashBin";
import { getLocationFromId } from "@/helpers/getLocationFromId";
import { useDisclosure, Button, DatePicker, Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Location from "@/components/icons/Location";
import { today, getLocalTimeZone, CalendarDate } from "@internationalized/date";
import GrpSize from "./GrpSize";
import { calculateIsDateUnavailable } from "./helpers/calculate-is-date-unavailable";
import Link from "next/link";
import { useLocale } from "@react-aria/i18n";
import CheckOutModalGuide from "./check-out-modal-guide";
import { useDispatch } from "@/redux/store";
import { removeProductFromCart } from "@/redux/slices/cartSlice";

export default function GuideCart({
  item,
}: {
  item: { data: ProductGuides; ref: string };
}) {
  const [totalDuration, setTotalDuration] = useState<number>(1);
  const [totalGroup, setTotalGroup] = useState<number>(1);
  const [selectedDate, setSelectedDate] = React.useState<CalendarDate>();
  const [error, setError] = useState<boolean | undefined>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  let { locale } = useLocale();
  const dispatch = useDispatch();

  useEffect(() => {
    setError(undefined);
  }, [selectedDate, totalGroup]);

  let isDateUnavailable = calculateIsDateUnavailable(
    item.data.eventType,
    //@ts-ignore
    item.data.timing,
    locale
  );

  return (
    <tr className="lg:table-row flex flex-col lg:w-full w-fit items-center justify-center self-center space-y-4 py-8 lg:space-y-0 lg:py-0">
      <td className="lg:w-1/3 w-full max-w-[30rem] lg:max-w-auto px-4 lg:px-0 flex justify-center lg:table-cell">
        <Link
          href={`/listings/${item.ref}/${item.data.id}`}
          className="flex lg:flex-row flex-col lg:gap-8 gap-4 my-1"
        >
          <div className="lg:w-[8rem] w-[15rem] h-[15rem] lg:h-[8rem] overflow-hidden relative flex items-center justify-center rounded-md">
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
          <div className="flex flex-col space-y-1 mt-2 lg:px-0 px-6">
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
        <div className="flex space-y-3 flex-row items-center flex-wrap justify-center lg:justify-start">
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
                value={selectedDate}
                onChange={setSelectedDate}
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
          {Number(item.data.price) * totalDuration} Dt
        </p>
      </td>
      <td className="lg:w-1/6 w-full max-w-[30rem] lg:max-w-auto px-4 lg:px-0">
        <div className="flex flex-row items-center justify-center gap-2">
          <Button
            color="primary"
            className="!py-0 relative overflow-visible"
            onClick={() => {
              if (selectedDate === undefined) {
                setError(true);
                return;
              }
              onOpen();
            }}
          >
            Check Out
            {error && (
              <small className="absolute text-danger -bottom-[50%] right-0 left-0 mx-auto">
                Check info please
              </small>
            )}
          </Button>
          <Button
            isIconOnly
            color="danger"
            onClick={() => dispatch(removeProductFromCart(item.data.id))}
          >
            <TrashBin />
          </Button>
        </div>
      </td>
      <CheckOutModalGuide
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        price={Number(item.data.price) * totalDuration}
        item={item}
        duration={totalDuration}
        totalGroup={totalGroup}
        selectedDate={selectedDate?.toString() || ""}
        hourly={item.data.paymentMethodHourly}
      />
    </tr>
  );
}
