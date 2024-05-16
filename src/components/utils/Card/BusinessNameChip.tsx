import { Chip } from "@nextui-org/react";
import React from "react";
import SkeletonString from "./SkeletonString";

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
        <Chip className="mt-1" variant="flat" radius="md" size="sm">
          <small>{businessName}</small>
        </Chip>
      ) : (
        <small>Data unavailable</small>
      )}
    </React.Fragment>
  );
}
