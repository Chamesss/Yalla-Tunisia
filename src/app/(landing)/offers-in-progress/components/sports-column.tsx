import React from "react";
import Image from "next/image";
import Category from "@/components/icons/Category";
import { getLocationFromId } from "@/helpers/getLocationFromId";
import { Input } from "@nextui-org/react";
import Location from "@/components/icons/Location";

type Props = {
  item: ProductSports;
  transaction: TransactionSport;
};

export default function SportsColumn({ item, transaction }: Props) {
  const totalGroup = transaction.totalGroup;
  const date = transaction.calendar;
  const duration = transaction.duration;
  const price = transaction.amount;

  return (
    <tr className="lg:table-row flex flex-col lg:w-full w-fit items-center justify-center self-center space-y-4 py-8 lg:space-y-0 lg:py-0">
      <td className="lg:w-1/3 w-full max-w-[30rem] lg:max-w-auto px-4 lg:px-0 flex justify-center lg:table-cell">
        <div className="flex lg:flex-row flex-col lg:gap-8 gap-4 my-1">
          <div className="lg:w-[8rem] w-[15rem] h-[15rem] lg:h-[8rem] overflow-hidden relative flex items-center justify-center rounded-md">
            <Image
              src={item.imageUrls[0]}
              width={640}
              height={640}
              alt={`picture-${item.title}`}
              className="w-full rounded-sm object-contain z-10"
              priority={true}
            />
            <Image
              src={item.imageUrls[0]}
              width={640}
              height={640}
              alt={`picture-${item.title}`}
              className="h-full rounded-sm object-cover blur-lg absolute"
              priority={true}
            />
          </div>
          <div className="flex flex-col space-y-1 mt-2 lg:px-0 px-6">
            <p className="capitalize text-lg font-semibold -ml-3">
              {item.title}
            </p>
            <small className="opacity-70 relative">
              <Location className="inline-block absolute top-[10%] -left-[1.15rem]" />{" "}
              {getLocationFromId(item.location)}
            </small>
            <small className="opacity-70 relative">
              <Category className="inline-block text-medium absolute top-[5%] -left-[1.25rem]" />{" "}
              <span className="capitalize">Sports</span>
            </small>
          </div>
        </div>
      </td>
      <td className="lg:w-1/2 max-w-[30rem] lg:max-w-auto w-full px-4 lg:px-0">
        <div className="flex space-y-3 flex-row items-center flex-wrap justify-center lg:justify-start">
          <div className="flex flex-row items-center">
            <div className="inline-block mx-1">
              <Input
                label="Duration"
                value={duration}
                labelPlacement="outside"
                className="w-[4rem]"
                isDisabled
              />
            </div>
            <div className="inline-block mx-1 mb-[0.15rem]">
              <Input
                label="Date"
                value={date}
                labelPlacement="outside"
                className="w-[4rem]"
                isDisabled
              />
            </div>
          </div>
          <div className="sm:inline-block block mx-1">
            <Input
              label="Group Size"
              value={totalGroup.toString()}
              labelPlacement="outside"
              className="w-[4rem]"
              isDisabled
            />
          </div>
        </div>
      </td>
      <td className="lg:w-1/6 max-w-[30rem] lg:max-w-auto w-full px-4 lg:px-0 text-center">
        <p className="font-semibold text-[#309980] text-lg px-3 text-nowrap">
          {price} Dt
        </p>
      </td>
      <td className="lg:w-1/6 max-w-[30rem] lg:max-w-auto w-full px-4 lg:px-0">
        {/* <div className="flex flex-row items-center justify-center gap-2">
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
        </div> */}
      </td>
    </tr>
  );
}
