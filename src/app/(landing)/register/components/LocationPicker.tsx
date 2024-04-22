import { usePlacesWidget } from "react-google-autocomplete";
import { Input } from "@nextui-org/react";
import { Ref } from "react";
import Location from "@/components/icons/Location";
import { GoogleMap } from "@react-google-maps/api";

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

  const defaultMapContainerStyle = {
    width: "250px",
    height: "200px",
    borderRadius: "15px 0px 0px 15px",
  };

  //K2's coordinates
  const defaultMapCenter = {
    lat: 36.8065,
    lng: 10.1815,
  };

  //Default zoom level, can be adjusted
  const defaultMapZoom = 18;

  //Map options
  const defaultMapOptions = {
    zoomControl: true,
    tilt: 0,
    gestureHandling: "auto",
  };

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
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        center={defaultMapCenter}
        zoom={defaultMapZoom}
        options={defaultMapOptions}
      />
    </>
  );
}
