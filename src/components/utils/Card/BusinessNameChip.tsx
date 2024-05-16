import { Chip } from "@nextui-org/react";
import React from "react";
import SkeletonString from "./SkeletonString";
import Store from "@/components/icons/Store";

export default function BusinessNameChip({
  businessName,
  loading,
}: {
  businessName: string | null | undefined;
  loading: boolean;
}) {
  return (
    <React.Fragment>
      {loading ? (
        <SkeletonString />
      ) : businessName ? (
        <Chip
          className="mt-1 !truncate w-fit"
          color="primary"
          variant="flat"
          radius="md"
          size="sm"
        >
          <p className="block xs:hidden capitalize italic mt-[0.125rem]">
            <Store className="inline-flex mb-1 text-lg" />{" "}
            {businessName.slice(0, 12)} {businessName.length > 12 && "..."}
          </p>
          <p className="hidden xs:block capitalize italic mt-[0.125rem]">
            <Store className="inline-flex mb-1 text-lg" />{" "}
            {businessName.slice(0, 16)} {businessName.length > 16 && "..."}
          </p>
        </Chip>
      ) : (
        <small>Data unavailable</small>
      )}
    </React.Fragment>
  );
}
