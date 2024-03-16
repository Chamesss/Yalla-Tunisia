import React from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { cities } from "./cities";

export default function CheckOutBox() {
  return (
    <div className="border border-solid border-black border-opacity-50 rounded-lg p-4">
      <div>
        <p>Delivered to</p>
        <Autocomplete
          defaultItems={cities}
          label="Favorite Animal"
          placeholder="Search an animal"
          className="max-w-xs"
        >
          {(city) => <AutocompleteItem key={city}>{city}</AutocompleteItem>}
        </Autocomplete>
      </div>
    </div>
  );
}
