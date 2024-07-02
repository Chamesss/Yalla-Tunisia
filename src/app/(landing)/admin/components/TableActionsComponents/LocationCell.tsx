import { getLocationFromId } from "@/helpers/getLocationFromId";
import { Skeleton } from "@nextui-org/react";
import React, { Suspense } from "react";

type Props = {
  listing: ProductHandMade | ProductGuides | ProductSports;
};

export default function LocationCell({ listing }: Props) {
  return (
    <div className="flex flex-col">
      <p className="text-bold text-sm capitalize text-default-400">
        <Suspense
          fallback={
            <Skeleton className="rounded-xl opacity-75">
              <p>Loading</p>
            </Skeleton>
          }
        >
          {getLocationFromId(listing.location)}
        </Suspense>
      </p>
    </div>
  );
}
