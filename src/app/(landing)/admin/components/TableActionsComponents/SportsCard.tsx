import DateBox from "@/components/utils/DateBox";
import { ExtractDayMonthYear } from "@/helpers/ExtractDayMonthYear";
import { Card, CardBody, Divider } from "@nextui-org/react";
import { Timestamp } from "firebase/firestore";
import Image from "next/image";
import React from "react";

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
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
