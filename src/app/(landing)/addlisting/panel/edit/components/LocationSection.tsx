// import { userState } from "@/redux/slices/userSlice";
// import { Input } from "@nextui-org/react";
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";

// export default function LocationSection({
//   CategoryName,
//   location,
// }: {
//   CategoryName: string;
//   location: string;
// }) {
//   const [value, setValue] = useState<string>();

//   useEffect(() => {
//     if (!location || location.toLocaleLowerCase() === "nan") {
//       const user = useSelector(userState);
//       const location = user.user.location;
//       setValue(location);
//     } else {
//       setValue(location);
//     }
//   }, []);

//   return (
//     <div className="flex flex-col gap-4">
//       <h1 className="text-xl font-semibold">Location</h1>
//       {value && <Input value={value} isDisabled />}
//     </div>
//   );
// }

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
  useEffect(() => {
    if (!location || location.length < 1) {
      setLocationChecked(true);
    }
  }, []);

  useEffect(() => {
    locationChecked === true && setLocation("nan");
    locationChecked === false && setLocation(null);
  }, [locationChecked]);

  return (
    <div>
      <h1 className="text-xl font-semibold">Location</h1>
      <Autocomplete
        isRequired
        size="sm"
        label="Current location"
        className="mt-4 relative"
        isDisabled={locationChecked}
        onInputChange={(e) => {
          setLocation(e);
        }}
        selectedKey={location}
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
    </div>
  );
}
