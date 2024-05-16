import { Card, Skeleton } from "@nextui-org/react";
import React from "react";

export default function CardSkeleton() {
  return (
    <Card
      className="w-[140px] xs:w-[165px] sm:w-[170px] md:w-[180px] lg:w-[200px] space-y-3 md:space-y-5 p-1 pb-3"
      radius="lg"
    >
      <Skeleton className="rounded-lg">
        <div className="h-[9.5rem] md:h-[11rem] lg:h-[13rem] rounded-lg bg-default-300"></div>
      </Skeleton>
      <div className="space-y-2 md:space-y-3 flex flex-col px-1 md:pb-2 lg:pb-3 pb-1">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg flex self-end">
          <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
    </Card>
  );
}
