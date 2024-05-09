import { Button, Tooltip } from "@nextui-org/react";
import React from "react";

export default function Approve() {
  return (
    <Tooltip color="danger" content="Delete user">
      <span className="text-lg text-danger-500 cursor-pointer active:opacity-50">
        <Button color="primary">Approve</Button>
      </span>
    </Tooltip>
  );
}
