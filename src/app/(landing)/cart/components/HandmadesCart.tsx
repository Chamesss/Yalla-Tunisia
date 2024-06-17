import React from "react";
import Image from "next/image";
import Location from "@/components/icons/Location";
import { getLocationFromId } from "@/helpers/getLocationFromId";
import Category from "@/components/icons/Category";

export default function HandmadesCart({
  item,
}: {
  item: { data: ProductHandMade; ref: string };
}) {
  return (
    <tr className="hidden sm:table-row">
      <td className="w-1/2">
        <div className="flex flex-row gap-3">
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
            <p className="capitalize text-lg font-semibold">
              {item.data.title}
            </p>
            <small className="opacity-70">
              <Location className="inline-block mb-1" />{" "}
              {getLocationFromId(item.data.location)}
            </small>
            <small className="opacity-70">
              <Category className="inline-block text-lg mb-1" />{" "}
              <span className="capitalize">{item.ref}</span>
            </small>
          </div>
        </div>
      </td>
      <td className="w-1/6">{item.data.description}</td>
      <td className="w-1/6">{item.data.price}</td>
      <td className="w-1/6">Action</td>
    </tr>
  );
}
