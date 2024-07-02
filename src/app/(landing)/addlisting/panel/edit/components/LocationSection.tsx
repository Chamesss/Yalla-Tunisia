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
      <h1 className="text-xl font-semibold">Emplacement </h1>
      <Autocomplete
        isRequired
        size="sm"
        label="Emplacement actuel"
        className="mt-4 relative"
        isDisabled={locationChecked}
        onInputChange={(e) => {
          setLocation(e);
        }}
        selectedKey={location}
        description={
          locationError && (
            <small className="absolute -bottom-2 left-3 text-danger-500">
              Veuillez entrer une localisation valide
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
      <p className="my-4 text-center">Ou</p>
      <Checkbox
        checked={locationChecked}
        onChange={() => setLocationChecked((prev) => !prev)}
      >
        Sélectionnez votre emplacement actuel.
      </Checkbox>
    </div>
  );
}
