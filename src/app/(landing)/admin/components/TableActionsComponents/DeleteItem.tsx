import TrashBin from "@/components/icons/TrashBin";
import { Tooltip } from "@nextui-org/react";
import React from "react";

export default function DeleteItem() {
  return (
    <Tooltip color="danger" content="Delete user">
      <span className="text-lg text-danger-500 cursor-pointer active:opacity-50">
        <TrashBin />
      </span>
    </Tooltip>
  );
}
