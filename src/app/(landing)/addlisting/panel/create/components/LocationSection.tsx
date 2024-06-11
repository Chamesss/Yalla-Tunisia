import { cities } from "@/cities";
import {
  Autocomplete,
  AutocompleteItem,
  Checkbox,
  Divider,
} from "@nextui-org/react";
import { Dispatch, SetStateAction, useEffect } from "react";

type Props = {
  location: string | undefined;
  setLocation: Dispatch<SetStateAction<string | undefined>>;
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
  useEffect(() => {
    locationChecked === true && setLocation("nan");
    locationChecked === false && setLocation(undefined);
  }, [locationChecked]);

  return (
    <div>
      <h1 className="text-xl font-semibold">Location</h1>
      <Autocomplete
        isRequired
        size="sm"
        label="Pick a location"
        className="mt-4 relative"
        isDisabled={locationChecked}
        onSelectionChange={(key) => {
          if (key) {
            setLocation(key.toString());
          } else {
            setLocation(undefined);
          }
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
          <AutocompleteItem key={c.id} value={c.id}>
            {c.city}
          </AutocompleteItem>
        ))}
      </Autocomplete>
      <p className="my-4 text-center">Or</p>
      <Checkbox
        checked={locationChecked}
        onChange={() => setLocationChecked((prev) => !prev)}
        name="locationInherit"
      >
        Pick your current location.
      </Checkbox>
    </div>
  );
}
