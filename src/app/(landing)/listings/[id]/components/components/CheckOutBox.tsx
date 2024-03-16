"use client";
import React from "react";
import {
  Autocomplete,
  AutocompleteItem,
  Divider,
  Button,
} from "@nextui-org/react";
import { cities } from "./cities";

export default function CheckOutBox() {
  return (
    <div className="border border-solid border-black border-opacity-10 rounded-lg p-4">
      <div className="flex flex-row items-center">
        <p className="flex-1">Delivered to</p>
        <Autocomplete
          defaultItems={cities}
          placeholder="Location.."
          size="sm"
          className="w-[60%]"
        >
          {(city) => (
            <AutocompleteItem key={city.value}>{city.label}</AutocompleteItem>
          )}
        </Autocomplete>
      </div>
      <Divider className="my-4" />
      <small className="opacity-80">Estimated time between 24h/48h</small>
      <Divider className="my-4" />
      <div className="flex justify-center">
        <Button className="text-md bg-[#48b9ff] text-white dark:bg-[#3d9cd7] px-5 py-2 rounded-full hover:bg-[#41a6e5] dark:hover:bg-[#3688bc]">
          Add to cart
        </Button>
      </div>
    </div>
  );
}
