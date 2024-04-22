import { usePlacesWidget } from "react-google-autocomplete";
import { Input } from "@nextui-org/react";
import { Ref, useEffect, useState } from "react";
import Location from "@/components/icons/Location";
import GoogleMapContainer from "./GoogleMapContainer";

type Props = {
  ref: Ref<HTMLInputElement>;
};

export default function LocationPicker() {
  const [lng, setLng] = useState<number>(10.1815);
  const [lat, setLat] = useState<number>(36.8065);

  const { ref }: Props = usePlacesWidget({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    onPlaceSelected: (place) => {
      const lng = place.geometry?.location?.lng();
      const lat = place.geometry?.location?.lat();
      if (lng && lat) {
        setLng(lng);
        setLat(lat);
      }
    },
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

      <GoogleMapContainer lng={lng} lat={lat} />
    </>
  );
}
