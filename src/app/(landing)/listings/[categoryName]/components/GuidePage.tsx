import React from "react";
import CarouselImages from "./CarousselImages";
import { Chip, Divider, Tooltip } from "@nextui-org/react";
import CheckOutBox from "./components/CheckOutBox";
import MapScrollable from "./components/MapScrollable";
import InfoSection from "./components/InfoSection";
import CalendarRange from "./components/CalendarRange";
import CheckIcon from "@/components/icons/CheckBoxIcon";
import { checkbox } from "./HandmadePage";
import Success from "@/components/icons/Success";
import IconCancel from "@/components/icons/IconCancel";
import UserAndProducts from "./UserAndProducts";

export default async function GuidePage({ res }: { res: ProductGuides }) {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col py-4 mb-20 px-8 max-w-[100rem]">
        <div className="flex flex-col lg:flex-row  gap-6 relative">
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
              <p className="text-lg font-semibold">Description:</p>
              <p className="mt-2">{res.description}</p>
            </div>
            <Divider className="my-4" />
            <div className="justify-between items-center flex-row flex w-full">
              <div className="space-y-2 flex-auto">
                <h1 className="text-lg font-semibold">Paying method</h1>
                <p>
                  {res.paymentMethodHourly ? (
                    <>
                      <span className="hidden xs:inline-block">
                        Paying&nbsp;
                      </span>
                      <span className="capitalize xs:lowercase">per hour.</span>
                    </>
                  ) : (
                    <>
                      <span className="hidden xs:inline-block">
                        Paying&nbsp;
                      </span>
                      <span className="capitalize xs:lowercase">
                        per entire tour.
                      </span>
                    </>
                  )}
                </p>
              </div>
              <Divider
                orientation="vertical"
                className="h-20 mx-4 w-[0.1rem] "
              />
              <div className="space-y-2 flex-1">
                <h1 className="text-lg font-semibold">Transportation</h1>
                <Chip
                  variant="flat"
                  color={res.transportation ? "primary" : "danger"}
                  className="text-lg min-w-10"
                >
                  {res.transportation ? <Success /> : <IconCancel />}
                </Chip>
              </div>
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
                <div className="mt-2  overflow-x-hidden">
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
            <Divider className="my-4" />
            <div className="flex flex-col space-y-2">
              <h1 className="text-lg font-semibold text-start">Languages</h1>
              <div className="flex flex-row gap-2 flex-wrap">
                {res.languages.map((l, i) => {
                  const styles = checkbox({
                    isSelected: true,
                    isFocusVisible: false,
                  });
                  return (
                    <React.Fragment key={i}>
                      <Chip
                        classNames={{
                          base: styles.base(),
                          content: styles.content(),
                        }}
                        color="primary"
                        startContent={
                          <CheckIcon className="ml-1 text-white hidden xs:inline-block" />
                        }
                        variant="faded"
                        size={"md"}
                        className="pointer-events-none text-tiny px-[0.1rem] sm:px-1"
                      >
                        {l}
                      </Chip>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
            <Divider className="my-4" />
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
          </div>

          <div className="w-[100%] lg:max-w-[25rem] max-w-auto p-4">
            <CheckOutBox productId={res.id} />
          </div>
          {/* <p className="font-medium">Views: {data.views}</p> */}
        </div>
        <div className="mt-8">
          <UserAndProducts userId={res.userId} section="Guides" />
        </div>
      </div>
    </div>
  );
}
