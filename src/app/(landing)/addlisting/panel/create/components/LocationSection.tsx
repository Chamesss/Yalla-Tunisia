import { cities } from "@/cities";
import {
  Autocomplete,
  AutocompleteItem,
  Checkbox,
  Divider,
} from "@nextui-org/react";
import { Dispatch, SetStateAction, useEffect } from "react";

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
    <>
      <h1 className="text-xl font-semibold">Location</h1>
      <Autocomplete
        isRequired
        size="sm"
        label="Pick a location"
        className="mt-4 relative"
        isDisabled={locationChecked}
        onInputChange={(e) => {
          setLocation(e);
        }}
        description={
          locationError && (
            <small className="absolute -bottom-2 left-3 text-danger-500">
              enter a valid location
            </small>
          )
        }
      >
        {cities.map((c) => (
          <AutocompleteItem key={c.city} value={c.city}>
            {c.city}
          </AutocompleteItem>
        ))}
      </Autocomplete>
      <p className="my-4 text-center">Or</p>
      <Checkbox
        checked={locationChecked}
        onChange={() => setLocationChecked((prev) => !prev)}
      >
        Pick your current location.
      </Checkbox>
    </>
  );
}
