import { Chip } from "@nextui-org/react";
import React from "react";

export default function StatusCell({ status }: { status: boolean }) {
  return (
    <Chip
      className="capitalize"
      color={status === true ? "success" : "danger"}
      size="sm"
      variant="flat"
    >
      {status === true ? "Active" : "Inactive"}
    </Chip>
  );
}
