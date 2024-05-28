"use client";
import ThreeDots from "@/components/icons/ThreeDots";
import {
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Dropdown,
} from "@nextui-org/react";
import React from "react";

export default function DropDownProfiles() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <div className="p-4 border border-default-300 rounded-full cursor-pointer h-fit w-fit hover:opacity-75">
          <ThreeDots />
        </div>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="new">Delete profile</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
