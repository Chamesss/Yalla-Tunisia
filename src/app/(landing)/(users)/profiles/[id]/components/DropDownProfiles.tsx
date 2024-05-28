"use client";
import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import ThreeDots from "@/components/icons/ThreeDots";

export default function DropDownProfiles() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <div className="p-4 border border-default-300 rounded-full cursor-pointer h-fit w-fit hover:opacity-75">
          <ThreeDots />
        </div>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="new">Report</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
