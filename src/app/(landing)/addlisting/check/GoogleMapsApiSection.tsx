"use client";
import React, { useEffect, useState } from "react";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { placesLibrary } from "@/constants/placesLibrairie";
import { Input, Spinner } from "@nextui-org/react";
import Image from "next/image";
import ImagesDisplay from "./ImagesDisplay";

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const restrictions = { country: "tn" };

export default function GoogleMapsApiSection() {
  const [searchResult, setSearchResult] =
    useState<google.maps.places.Autocomplete>();
  const [images, setImages] = useState<any>(null);
  // const [Images, setPlaceHoldedImages] = useState<any>(null);

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

  // useEffect(() => {
  //   if (images === null) return;
  //   const fetchAndProcessImages = async () => {
  //     const temp: any = [];
  //     await Promise.all(
  //       images.map(async (image: any) => {
  //         const url = image.getUrl();
  //         const buffer = await fetch(url).then(async (res) =>
  //           Buffer.from(await res.arrayBuffer())
  //         );
  //         const { base64 } = await getPlaiceholder(Buffer.from(buffer));
  //         temp.push({ base64, img: url });
  //       })
  //     );
  //     console.log(temp);
  //     setPlaceHoldedImages(temp);
  //   };

  //   fetchAndProcessImages();
  // }, [images]);

  // const getImages = async (pattern) => {
  //   const files = glob.sync(pattern);
  //   const images = [];

  //   for (const file of files) {
  //     const src = file.replace("./public", "");
  //     const buffer = await fs.readFile(file);
  //     const plaiceholder = await getPlaiceholder(buffer);
  //     images.push({ ...plaiceholder, img: { src } });
  //   }

  //   return images;
  // };

  if (!isLoaded) {
    return (
      <div className="w-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <Autocomplete
        onLoad={onLoad}
        onPlaceChanged={locationSelected}
        restrictions={restrictions}
      >
        <input
          type="text"
          className="relative"
          placeholder="Customized your placeholder"
        />
      </Autocomplete>
      {images !== null && (
        <div className="overflow-hidden flex flex-row overflow-x-scroll gap-2 scrollbar-container">
          <ImagesDisplay images={images} />
        </div>
      )}
    </div>
  );
}
