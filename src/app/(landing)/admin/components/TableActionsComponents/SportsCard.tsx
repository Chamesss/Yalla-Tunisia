import Location from "@/components/icons/Location";
import DateBox from "@/components/utils/DateBox";
import { ExtractDayMonthYear } from "@/helpers/ExtractDayMonthYear";
import { handleCity } from "@/helpers/getLocationNan";
import { Card, CardBody, Divider, Skeleton } from "@nextui-org/react";
import Image from "next/image";
import React, { Suspense } from "react";

export default function SportsCard({ listing }: { listing: ProductSports }) {
  return (
    <Card>
      <CardBody>
        <div className="flex flex-col gap-1 p-2">
          <div className="flex flex-row overflow-x-auto gap-2 scrollbar-container">
            {listing.imageUrls.map((image, i) => (
              <Image
                key={i}
                src={image}
                width={580}
                height={580}
                alt={`${listing.title}-picture-${i}`}
                className="w-auto h-[9rem]"
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
          <div className="flex flex-row items-center gap-3">
            <h1>Max group</h1>
            <small className="italic">{listing.grpSize}</small>
          </div>
          <Divider className="my-2" />
          <div className="flex flex-row items-center gap-3">
            <h1>Duration</h1>
            <small className="italic">{listing.duration} hour(s)</small>
          </div>
          <Divider className="my-2" />
          <h1>
            Schedule <small className="italic">({listing.eventType})</small>
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
          <Divider className="my-2" />
          <div>
            <h1>Restrictions</h1>
            {listing.restrictions.map((item, i) => (
              <div>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
