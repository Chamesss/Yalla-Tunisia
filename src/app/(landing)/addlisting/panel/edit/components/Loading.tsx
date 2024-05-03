import { Spinner } from "@nextui-org/react";
import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <Spinner />
    </div>
  );
}
