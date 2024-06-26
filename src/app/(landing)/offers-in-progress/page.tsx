import { Divider } from "@nextui-org/react";
import React from "react";
import InProgress from "./components/in-progress";

export default function page() {
  return (
    <div className="px-10 py-3">
      <div>
        <div className="flex flex-row gap-4 items-center overflow-hidden">
          <p className="text-nowrap text-lg font-medium uppercase">
            In progress
          </p>
          <Divider className="w-full" />
        </div>
        <div>
          <InProgress />
        </div>
      </div>
    </div>
  );
}
