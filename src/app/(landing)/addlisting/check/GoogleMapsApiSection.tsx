"use client";
import React, { useEffect, useState } from "react";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { placesLibrary } from "@/constants/placesLibrairie";
import { Input, Spinner } from "@nextui-org/react";
import Image from "next/image";
import ImagesDisplay from "./ImagesDisplay";
import Location from "@/components/icons/Location";

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const restrictions = { country: "tn" };

export default function GoogleMapsApiSection() {
  const [searchResult, setSearchResult] =
    useState<google.maps.places.Autocomplete>();
  const [images, setImages] = useState<
    google.maps.places.PlacePhoto[] | null | undefined
  >(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: googleMapsApiKey as string,
    libraries: placesLibrary,
  });

  function onLoad(autocomplete: google.maps.places.Autocomplete) {
    setSearchResult(autocomplete);
  }

  function locationSelected() {
    if (searchResult) {
      const place = searchResult.getPlace();
      setImages(place.photos);
    }
  }

  if (!isLoaded) {
    return (
      <div className="w-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-row w-full items-center justify-center gap-2 p-2 bg-gray-100 rounded-xl">
        <Location className="opacity-50" />
        <Autocomplete
          onLoad={onLoad}
          onPlaceChanged={locationSelected}
          restrictions={restrictions}
          className="w-full"
        >
          <input
            type="text"
            className="relative w-full focus:outline-none bg-gray-100"
            placeholder="Enter your store's name"
          />
        </Autocomplete>
      </div>
      {images && (
        <div className="overflow-hidden flex flex-row overflow-x-scroll gap-2 scrollbar-container mt-6">
          <ImagesDisplay
            images={images}
            loading={loading}
            setLoading={setLoading}
          />
        </div>
      )}
      {loading === false && (
        <small className="italic opacity-75">
          *These are the presented images of your store.
        </small>
      )}
    </div>
  );
}
