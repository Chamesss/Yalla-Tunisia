import React from "react";
import CarouselImages from "./CarousselImages";
import { CheckboxGroup, Chip, Divider, Tooltip, tv } from "@nextui-org/react";
import CheckOutBox from "./components/CheckOutBox";
import MapScrollable from "./components/MapScrollable";
import InfoSection from "./components/InfoSection";
import Title from "@/components/utils/Title";
import { CustomCheckbox } from "@/app/(landing)/addlisting/panel/create/utils/CustomCheckBoxUnselected";
import CheckIcon from "@/components/icons/CheckBoxIcon";
import IconCancel from "@/components/icons/IconCancel";
import UserAndProducts from "./UserAndProducts";

export default async function HandmadePage({ res }: { res: ProductHandMade }) {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col py-4 mb-20 px-2 xs:px-3 sm:px-8 w-auto max-w-[100rem]">
        <div className="flex flex-col lg:flex-row  gap-6 relative">
          <div className="flex lg:hidden flex-col w-full">
            <InfoSection data={res} />
          </div>
          <div className="rounded-xl sm:w-1/2 sm:h-1/2 w-fit flex self-center lg:self-auto">
            <div className="flex-1">
              <CarouselImages images={res.imageUrls} />
            </div>
          </div>
          <div>
            <div className="p-2 w-full overflow-y-auto">
              <div className="hidden lg:flex flex-col w-full">
                <InfoSection data={res} />
              </div>
              <Divider className="my-0 lg:opacity-100 lg:my-4 opacity-0" />
              <div className="-mt-4 lg:mt-0">
                <p className="text-lg font-semibold">Description</p>
                <p className="mt-2 italic opacity-80">{res.description}</p>
              </div>
              <Divider className="my-4" />
            </div>
            <div
              className="px-2 justify-between items-center flex-row flex w-full"
              id="colorSection"
            >
              <div className="space-y-2 flex-auto">
                <h1 className="text-lg font-semibold">Dimensions</h1>
                <p className="text-nowrap">
                  <Chip
                    variant="flat"
                    isDisabled={res.dimensions[0] ? true : false}
                    className="text-lg"
                    color="primary"
                  >
                    {res.dimensions[0] ? res.dimensions[0] : "n/a"}
                  </Chip>{" "}
                  *{" "}
                  <Chip
                    isDisabled={res.dimensions[1] ? true : false}
                    variant="flat"
                    className="text-lg"
                    color="primary"
                  >
                    {res.dimensions[1] ? res.dimensions[1] : "n/a"}
                  </Chip>{" "}
                  (cm)
                </p>
              </div>
              <Divider
                orientation="vertical"
                className="h-20 mx-4 w-[0.1rem] "
              />
              <div className="space-y-2 flex-1">
                <h1 className="text-lg font-semibold">Quantity</h1>
                <Chip
                  variant="flat"
                  color="primary"
                  className="text-lg min-w-10"
                >
                  {res.qte}
                </Chip>
              </div>
            </div>
            <Divider className="my-4" />
            <div className="px-2 space-y-2">
              <h1 className="text-lg font-semibold">Sizes</h1>
              <div className="flex flex-row gap-1 sm:gap-2 items-center">
                {res.sizes.map((s, i) => {
                  const styles = checkbox({
                    isSelected: s !== null,
                    isFocusVisible: false,
                  });
                  return (
                    <Chip
                      key={i}
                      classNames={{
                        base: styles.base(),
                        content: styles.content(),
                      }}
                      color="primary"
                      startContent={
                        s !== null ? (
                          <CheckIcon className="ml-1 text-white hidden xs:inline-block" />
                        ) : (
                          <IconCancel className="text-default-300 text-medium mt-[0.1rem] hidden xs:inline-block" />
                        )
                      }
                      variant="faded"
                      size={`${s !== null ? "lg" : "md"}`}
                      className="pointer-events-none text-tiny px-[0.1rem] sm:px-1"
                    >
                      {Sizes[i]}
                    </Chip>
                  );
                })}
              </div>
            </div>
            <Divider className="my-4" />
            <div className="px-2 space-y-2 flex-1">
              <h1 className="text-lg font-semibold">Colors</h1>
              <div className="flex flex-row gap-2 px-2">
                {res.colors.map((c: string, i) => (
                  <div
                    key={i}
                    style={{ backgroundColor: c }}
                    className="w-10 h-10 rounded-full relative"
                  />
                ))}
              </div>
            </div>
            <Divider className="my-4" />
            <div className="px-2 space-y-2">
              <h1 className="text-lg font-semibold">Materials used</h1>
              <Chip
                variant="flat"
                size="lg"
                color="default"
                className="capitalize"
              >
                {res.materialsUsed}
              </Chip>
            </div>
          </div>
          <div className="w-[100%] lg:max-w-[25rem] max-w-auto p-4">
            <CheckOutBox productId={res.id} />
          </div>
          {/* <p className="font-medium">Views: {data.views}</p> */}
        </div>

        <div className="mt-8">
          <UserAndProducts userId={res.userId} section={"Handmades"} />
        </div>
      </div>
    </div>
  );
}

export const checkbox = tv({
  slots: {
    base: "border-default hover:bg-default-200",
    content: "text-default-500",
  },
  variants: {
    isSelected: {
      true: {
        base: "border-primary bg-primary hover:bg-primary-500 hover:border-primary-500",
        content: "text-primary-foreground pl-1",
      },
    },
    isFocusVisible: {
      true: {
        base: "outline-none ring-2 ring-focus ring-offset-2 ring-offset-background",
      },
    },
  },
});

const Sizes = ["xs", "sm", "md", "lg", "xl", "xxl"];
