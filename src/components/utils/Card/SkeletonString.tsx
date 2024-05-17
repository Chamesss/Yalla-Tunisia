import { Skeleton } from "@nextui-org/react";

export default function SkeletonString() {
  return (
    <Skeleton className="rounded-lg flex self-end">
      <div className="rounded-lg bg-default-300">Loading..</div>
    </Skeleton>
  );
}
