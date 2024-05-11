import { Chip } from "@nextui-org/react";
import React from "react";

export default function BannedCell({ disabled }: { disabled: boolean }) {
  return (
    <Chip
      className="capitalize"
      color={disabled === true ? "danger" : "success"}
      size="sm"
      variant="flat"
    >
      {disabled === true ? "Banned" : "No"}
    </Chip>
  );
}
