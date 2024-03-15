"use client";
import React, { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

export default function SelectionMenu() {
  const [open, setIsOpen] = useState(false);
  return (
    <Dropdown onOpenChange={(isOpen: boolean) => setIsOpen(isOpen)}>
      <DropdownTrigger>
        <Button
          variant="bordered"
          className="px-unit-0 rounded-md min-w-unit-5 h-unit-5 items-center justify-center flex outline-none"
        >
          <svg
            className={`h-fit w-fit transform center transition-all ${
              open ? "rotate-180 " : "origin-center"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            width={20}
          >
            <path
              className="translate-y-[3px]"
              fillRule="evenodd"
              d="M10 12l-6-6 1.5-1.5L10 9l4.5-4.5L16 6l-6 6z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="new">New file</DropdownItem>
        <DropdownItem key="copy">Copy link</DropdownItem>
        <DropdownItem key="edit">Edit file</DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger">
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
