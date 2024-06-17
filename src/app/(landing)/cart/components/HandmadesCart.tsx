import React, { useState } from "react";
import Image from "next/image";
import Location from "@/components/icons/Location";
import { getLocationFromId } from "@/helpers/getLocationFromId";
import Category from "@/components/icons/Category";
import { Select, SelectItem } from "@nextui-org/react";
import { size } from "@/constants/constants";

const negative = "n/a";

export default function HandmadesCart({
  item,
}: {
  item: { data: ProductHandMade; ref: string };
}) {
  const [selectedSize, setSelectedSize] = useState<string | undefined>(() => {
    const index = item.data.sizes.findIndex((i) => typeof i === "string");
    if (index === -1) return negative;
    return undefined;
  });
  const [selectedColor, setSelectedColor] = useState<string | undefined>(() => {
    if (item.data.colors.length <= 1 && item.data.colors[0].length <= 1)
      return negative;
    return undefined;
  });

  return (
    <tr className="hidden sm:table-row">
      <td className="w-1/6">
        <div className="flex flex-row gap-8">
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
        <div className="inline-block mx-1">
          <Select
            onChange={(e) => setSelectedSize(e.target.value)}
            label="Sizes"
            className="w-[5rem]"
            size="sm"
            disabledKeys={[
              typeof item.data.sizes[0] !== "string" ||
              item.data.sizes[0].toLowerCase() !== size[0]
                ? "xs"
                : "",
              typeof item.data.sizes[1] !== "string" ||
              item.data.sizes[1] !== size[1]
                ? "sm"
                : "",
              typeof item.data.sizes[2] !== "string" ||
              item.data.sizes[2] !== size[2]
                ? "md"
                : "",
              typeof item.data.sizes[3] !== "string" ||
              item.data.sizes[3] !== size[3]
                ? "lg"
                : "",
              typeof item.data.sizes[4] !== "string" ||
              item.data.sizes[4] !== size[4]
                ? "xl"
                : "",
              typeof item.data.sizes[5] !== "string" ||
              item.data.sizes[5] !== size[5]
                ? "xxl"
                : "",
            ]}
          >
            {size.map((s, i) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="relative inline-block mx-1">
          <Select
            onChange={(e) => setSelectedColor(e.target.value)}
            label="Colors"
            className="w-[5rem] h-fit relative"
            disabledKeys={[""]}
            size="sm"
          >
            {item.data.colors.map((c) => (
              <SelectItem
                value={c}
                style={{ backgroundColor: c }}
                key={c}
                className=""
              >
                {item.data.colors.length <= 1 && c.length <= 1 ? (
                  negative
                ) : (
                  <div
                    className="w-full flex self-center"
                    style={{ backgroundColor: c }}
                  />
                )}
              </SelectItem>
            ))}
          </Select>
          {selectedColor && selectedColor.length > 0 && (
            <div
              style={{ backgroundColor: selectedColor }}
              className="absolute w-5 h-5 rounded-full right-[52%] top-[50%]"
            />
          )}
        </div>
      </td>
      <td className="w-1/6">{item.data.price}</td>
      <td className="w-1/6">Action</td>
    </tr>
  );
}
