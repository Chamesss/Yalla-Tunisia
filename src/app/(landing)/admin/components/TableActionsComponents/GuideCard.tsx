import Location from "@/components/icons/Location";
import DateBox from "@/components/utils/DateBox";
import { ExtractDayMonthYear } from "@/helpers/ExtractDayMonthYear";
import { handleCity } from "@/helpers/getLocationNan";
import { Card, CardBody, Chip, Divider, Skeleton } from "@nextui-org/react";
import Image from "next/image";
import React, { Suspense } from "react";

export default function GuideCard({ listing }: { listing: ProductGuides }) {
  return (
    <Card>
      <CardBody>
        <div className="flex flex-col gap-1 p-2">
          <div className="flex flex-row overflow-x-auto gap-2 scrollbar-container">
            {listing.imageUrls.map((image, i) => (
              <Image
                key={i}
                src={image}
                width={128}
                height={128}
                alt={`${listing.title}-picture-${i}`}
              />
            ))}
          </div>
          <Divider className="my-2" />
          <div className="w-full flex flex-row justify-between">
            <h1>{listing.title}</h1>
            <span className="text-success-600">{listing.price} DT</span>
          </div>
          <small className="italic">{listing.description}</small>
          <Divider className="my-2" />
          <h1>
            Duration <small className="italic">({listing.eventType})</small>
          </h1>
          <div className="flex flex-row flex-wrap gap-2">
            {listing.eventType === "OngoingEvent" ? (
              <p>{listing.timing as string}</p>
            ) : (
              <>
                {typeof listing.timing === "object" &&
                  listing.timing.map((item: Date, i: number) => {
                    const result = ExtractDayMonthYear(item);
                    if (result === false)
                      return <p key={i}>Date unavailable</p>;
                    return (
                      <React.Fragment key={i}>
                        <DateBox date={result} />
                      </React.Fragment>
                    );
                  })}
              </>
            )}
            <Divider className="my-2" />
            <div className="flex flex-row items-center flex-wrap gap-2">
              <h1>Languages</h1>
              {listing.languages.map((lang, i) => (
                <React.Fragment key={i}>
                  <Chip color="primary" className="italic text-tiny ">
                    {lang}
                  </Chip>
                </React.Fragment>
              ))}
            </div>
            <Divider className="my-2" />
            <div className="flex flex-row items-center gap-3">
              <h1>Transportation</h1>
              <small className="italic">
                {listing.transportation ? "Yes" : "No"}
              </small>
            </div>
            <Divider className="my-2" />
            <div className="flex flex-row items-center gap-3">
              <h1>Payment method</h1>
              <small className="italic">
                {listing.paymentMethodHourly ? "Hourly" : "Per day"}
              </small>
            </div>
            <Divider className="my-2" />
            <div className="flex flex-row items-center gap-3">
              <h1>Created at</h1>
              {listing.created_at ? (
                <React.Fragment>
                  {(() => {
                    const result = ExtractDayMonthYear(listing.created_at);
                    if (result === false) {
                      return <p>Date unavailable</p>;
                    } else {
                      return <DateBox date={result} />;
                    }
                  })()}
                </React.Fragment>
              ) : (
                <small>Date unavailable</small>
              )}
            </div>
            <Divider className="my-2" />
            <div className="flex flex-row items-center gap-3">
              <h1>Location</h1>
              <Suspense
                fallback={
                  <Skeleton className="rounded-xl opacity-75">
                    <p>Loading</p>
                  </Skeleton>
                }
              >
                <small className="italic flex flex-row items-center gap-1">
                  <Location className="opacity-60" />
                  {handleCity(listing)}
                </small>
              </Suspense>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}