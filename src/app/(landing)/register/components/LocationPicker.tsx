import { usePlacesWidget } from "react-google-autocomplete";
import { Input } from "@nextui-org/react";
import { Ref } from "react";
import Location from "@/components/icons/Location";

type Props = {
  ref: Ref<HTMLInputElement>;
};

export default function LocationPicker() {
  const { ref }: Props = usePlacesWidget({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    onPlaceSelected: (place) => console.log(place),
    options: {
      componentRestrictions: { country: "tn" },
    },
  });

  return (
    <>
      <Input
        ref={ref}
        type="text"
        variant="underlined"
        className="flex py-3 w-full rounded-md"
        placeholder="Enter your location..."
        size="sm"
        startContent={
          <Location className="text-lg text-default-400 pointer-events-none mr-1" />
        }
      />
    </>
  );
}
