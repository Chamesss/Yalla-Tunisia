import React, { useState } from "react";
import Image from "next/image";
import Location from "@/components/icons/Location";
import { getLocationFromId } from "@/helpers/getLocationFromId";
import Category from "@/components/icons/Category";
import { Button, Select, SelectItem, useDisclosure } from "@nextui-org/react";
import { size } from "@/constants/constants";
import Quantity from "./Quantity";
import TrashBin from "@/components/icons/TrashBin";
import Link from "next/link";
import CheckOutModal from "./CheckOutModal";

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
  const [qte, setQte] = useState(1);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
      <td className="lg:w-1/2 max-w-[30rem] lg:max-w-auto w-full px-4 lg:px-0">
        <div className="flex flex-col space-y-3 xs:flex-row items-center">
          <div className="flex flex-row items-center">
            <div className="inline-block mx-1">
              <Select
                onChange={(e) => setSelectedSize(e.target.value)}
                labelPlacement="outside"
                label="Sizes"
                className="w-[5rem]"
                value={selectedSize}
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
                labelPlacement="outside"
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
                  className="absolute w-5 h-5 rounded-full right-[50%] top-[55%]"
                />
              )}
            </div>
          </div>
          <div className="inline-block mx-1">
            <Quantity item={item} setQte={setQte} qte={qte} />
          </div>
        </div>
      </td>
      <td className="lg:w-1/6 max-w-[30rem] lg:max-w-auto w-full px-4 lg:px-0 text-center">
        <p className="font-semibold text-[#309980] text-lg px-3 text-nowrap">
          {Number(item.data.price) * qte} Dt
        </p>
      </td>
      <td className="lg:w-1/6 max-w-[30rem] lg:max-w-auto w-full px-4 lg:px-0">
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
