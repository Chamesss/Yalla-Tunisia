import { Skeleton } from "@nextui-org/react";

export default function SkeletonString() {
  return (
    <Skeleton className="w-2/5 rounded-lg flex self-end">
      <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
    </Skeleton>
  );
}
