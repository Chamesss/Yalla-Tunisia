import { cities } from "@/cities";
import { Autocomplete, AutocompleteItem, Checkbox } from "@nextui-org/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Props = {
  location: string | null;
  setLocation: Dispatch<SetStateAction<string | null>>;
  locationChecked: boolean;
  setLocationChecked: Dispatch<SetStateAction<boolean>>;
  locationError: boolean;
};

export default function LocationSection({
  location,
  setLocation,
  locationChecked,
  setLocationChecked,
  locationError,
}: Props) {
  //user data location is required

  useEffect(() => {
    locationChecked === true && setLocation("Tunis");
    locationChecked === false && setLocation(null);
  }, [locationChecked]);

  return (
    <div>
      <h1 className="text-xl font-semibold">Location</h1>
      <Autocomplete
        isRequired
        size="sm"
        label="Pick a location"
        className="mt-4"
        isDisabled={locationChecked}
        onInputChange={(e) => {
          setLocation(e);
        }}
        description={
          locationError && (
            <small className="text-danger-500">enter valid location</small>
          )
        }
      >
        {cities.map((c) => (
          <AutocompleteItem key={c.city} value={c.city}>
            {c.city}
          </AutocompleteItem>
        ))}
      </Autocomplete>
      <p className="my-4 ml-4">Or</p>
      <Checkbox
        checked={locationChecked}
        onChange={() => setLocationChecked((prev) => !prev)}
      >
        Pick your current location.
      </Checkbox>
    </div>
  );
}
