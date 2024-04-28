import React, { useState } from "react";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import { placesLibrary } from "@/constants/placesLibrairie";

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const restrictions = { country: "tn" };

export default function GoogleMapsApiSection() {
  const [searchResult, setSearchResult] =
    useState<google.maps.places.Autocomplete>();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleMapsApiKey as string,
    libraries: placesLibrary,
  });

  function onLoad(autocomplete: google.maps.places.Autocomplete) {
    setSearchResult(autocomplete);
  }

  function locationSelected() {
    if (searchResult) {
      const place = searchResult.getPlace();
      console.log("Search : ", place);
    }
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Autocomplete
        onLoad={onLoad}
        onPlaceChanged={locationSelected}
        restrictions={restrictions}
      >
        <input type="text" placeholder="Search for Tide Information" />
      </Autocomplete>
    </div>
  );
}
