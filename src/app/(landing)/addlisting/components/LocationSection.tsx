import { cities } from "@/cities";
import { Autocomplete, AutocompleteItem, Checkbox } from "@nextui-org/react";

export default function LocationSection() {
  return (
    <div>
      <h1 className="text-xl font-semibold">Location</h1>
      <Autocomplete
        isRequired
        size="sm"
        label="Pick a location"
        className="mt-4"
      >
        {cities.map((animal) => (
          <AutocompleteItem key={animal.city} value={animal.city}>
            {animal.city}
          </AutocompleteItem>
        ))}
      </Autocomplete>
      <p className="my-4 ml-4">Or</p>
      <Checkbox>Pick current store location.</Checkbox>
    </div>
  );
}
